import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { fileURLToPath } from 'url';
import { Storage } from '@google-cloud/storage';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const releasesDir = path.join(__dirname, 'screenshots');
const getVersions = () => {
  const currentVersion = process.env.GITHUB_REF_NAME.replace('release-', '');
  const releaseFolders = fs.readdirSync(releasesDir).filter((folder: string) => folder.startsWith('release-'));
  const sortedVersions = releaseFolders.map((folder: string) => folder.replace('release-', ''))
                                        .filter((version: string) => semver.valid(version))
                                        .sort(semver.rcompare);
  const currentVersionIndex = sortedVersions.indexOf(currentVersion);
  const previousVersion = currentVersionIndex >= 0 && sortedVersions[currentVersionIndex + 1];
  // const previousVersion = currentVersionIndex > 0 ? sortedVersions[currentVersionIndex - 1] : null;

  return { currentVersion, previousVersion }
}

const { currentVersion, previousVersion } = getVersions()
if (!previousVersion) test.skip();
const currentVersionDir = path.join(releasesDir, `release-${currentVersion}`);
// const previousVersionDir = path.join(releasesDir, `release-${previousVersion}`);
const currentVersionDiffDir = path.join(currentVersionDir, 'diff')
const getAllImagePaths = async(directory: string) => {

  let paths: string[] = [];
  const recurseDir = async(dir: string) => {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });
    for await (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await recurseDir(fullPath);
      } else if (file.isFile() && /\.(png|jpg|jpeg)$/i.test(file.name)) {
        paths.push(fullPath);
      }
    }
  }

  await recurseDir(directory);
  return paths;
}
const deleteFilesInDirectory = async(dirPath: string) => {
  try {
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        // ディレクトリの場合は再帰的に削除を行うか、スキップする
        console.log(`Skipping directory: ${filePath}`);
      } else {
        // ファイルの場合は削除
        await fs.promises.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`Error deleting files in directory: ${dirPath}`, error);
  }
}
await deleteFilesInDirectory(currentVersionDiffDir);
const currentVersionImagePaths = await getAllImagePaths(currentVersionDir);

interface IFileManager {
  getPreviousVersionImagePath: (currentVersionImagePath: string) => void
  readCurrentVersionImage: () => ArrayBuffer
  readPreviousVersionImage: () => ArrayBuffer
  hasPreviousVersionImage: () => boolean;
  saveNewImage: () => voiid
  saveDiffImage: () => voiid
}
const localFileManager: IFileManager = {
  currentVersionImagePath: '',
  previousVersionImagePath: '',
  getPreviousVersionImagePath: (currentVersionImagePath: string) => {
    localFileManager.currentVersionImagePath = currentVersionImagePath;
    localFileManager.previousVersionImagePath = currentVersionImagePath.replace(`release-${currentVersion}`, `release-${previousVersion}`);
  },
  readCurrentVersionImage: () => fs.readFileSync(localFileManager.currentVersionImagePath),
  readPreviousVersionImage: () => fs.readFileSync(localFileManager.previousVersionImagePath),
  hasPreviousVersionImage: () => fs.existsSync(localFileManager.previousVersionImagePath),
  saveNewImage: () => {
    const filename = localFileManager.currentVersionImagePath.replace(currentVersionDir, '').replace('.png', '').replace(/^\//, '').replace(/\//g, '-');
    const diffPath = path.join(currentVersionDiffDir, `${filename}-new.png`);
    fs.writeFileSync(diffPath, currentVersionImageBuffer);
  },
  saveDiffImage: (diff) => {
    const filename = localFileManager.currentVersionImagePath.replace(currentVersionDir, '').replace('.png', '').replace(/^\//, '').replace(/\//g, '-');
    const diffPath = path.join(currentVersionDiffDir, `${filename}.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }
}

const keyFilename = process.env.GCP_SA_KEY;
const bucketName = process.env.BUCKET_NAME;
const storage = new Storage({keyFilename});
const GCSFileManager: IFileManager = {
  currentVersionImagePath: '',
  previousVersionImagePath: '',
  getPreviousVersionImagePath: (currentVersionImagePath: string) => {
    GCSFileManager.currentVersionImagePath = currentVersionImagePath;
    GCSFileManager.previousVersionImagePath = currentVersionImagePath.replace(`release-${currentVersion}`, `release-${previousVersion}`).replace(releasesDir, '');
  },
  readCurrentVersionImage: () => fs.readFileSync(GCSFileManager.currentVersionImagePath),
  readPreviousVersionImage: async() => {
    if (!bucketName) return;
    const [imageBuffer] = await storage.bucket(bucketName).file(path).download();
    return imageBuffer;
  },
  hasPreviousVersionImage: async() => await storage.bucket(bucketName).file(GCSFileManager.previousVersionImagePath).exists()[0],
  saveNewImage: () => {
    const filename = GCSFileManager.currentVersionImagePath.replace(currentVersionDir, '').replace('.png', '').replace(/^\//, '').replace(/\//g, '-');
    const diffPath = path.join(currentVersionDiffDir, `${filename}-new.png`);
    fs.writeFileSync(diffPath, currentVersionImageBuffer);
  },
  saveDiffImage: (diff) => {
    const filename = GCSFileManager.currentVersionImagePath.replace(currentVersionDir, '').replace('.png', '').replace(/^\//, '').replace(/\//g, '-');
    const diffPath = path.join(currentVersionDiffDir, `${filename}.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }
}
const fileManager = process.env.GCP_SA_KEY ? GCSFileManager : localFileManager;
test.describe('Comparison', async() => {
  const THRESHOLD = 1500;
  // test.beforeEach(async ({ page }) => {
  //   await page.on('console', msg => {
  //     console.log(`Browser console: ${msg.text()}`);
  //   });
  // });
  for (const currentVersionImagePath of currentVersionImagePaths) {
    test(currentVersionImagePath, () => {
      fileManager.getPreviousVersionImagePath(currentVersionImagePath);
      const currentVersionImageBuffer = fileManager.readCurrentVersionImage()

      if (!fileManager.hasPreviousVersionImage()) {
        return fileManager.saveNewImage();
      }
      const previousVersionImageBuffer = fileManager.readPreviousVersionImage();

      const currentVersionImage = PNG.sync.read(currentVersionImageBuffer);
      const previousVersionImage = PNG.sync.read(previousVersionImageBuffer);

      const {width, height} = currentVersionImage;
      const diff = new PNG({width, height});

      const numDiffPixels = pixelmatch(
        currentVersionImage.data,
        previousVersionImage.data,
        diff.data,
        width,
        height,
        {threshold: 0.1}
        // { threshold: 0.1, diffColor: [255, 0, 0] }
      );

      if (numDiffPixels > THRESHOLD) {
        console.log(`Number of different pixels: ${numDiffPixels}`);
        return fileManager.saveDiffImage(diff)
      }

      // expect(numDiffPixels).toBeLessThanOrEqual(THRESHOLD);
      // console.log(`Number of different pixels: ${numDiffPixels}`);
      // fs.writeFileSync('diff.png', PNG.sync.write(diff));
    })
  }
});
