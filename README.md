# WebTech Bookstore
---
## English
### Project Background
In recent years, there has been a significant evolution in web technologies, requiring engineers and programmers to constantly update their knowledge. Aiming to cater to this market need, this project seeks to provide a specialized bookstore to assist engineers in their learning journey.

### Objective:
Provide web engineers, programmers, and technicians with the latest books and resources to enhance their learning and expertise.

### Target Users:
- Web developers ranging from beginners to experts
- Those eager to learn new technologies and frameworks.

### Key Features

1. Search books by keywords or categories.
2. Review and rate books.
3. Participate in community forums and Q&A sections
4. Search books based on reviews or web development skill levels
5. Bookmark your favorite books

### Tech Stack
- **Frontend**: Nuxt.js
- **Backend**: Django
- **Database**: MYSQL
- **Containerization**: Docker

### Install Guide
#### Frontend
1. ```$ docker-compose up -d``` to start a container
#### Backend
1. ```$ docker-compose up -d``` to start a container
2. ```$ docker-compose exec api-server poetry run python manage.py migrate``` to migrate

### Install Library
#### Frontend
    $ docker-compose exec backend-for-frontend pnpm install ${library}
#### Backend
    $ docker-compose exec api-server poetry add ${library}

### Directory Structure
**./backend**: This is where the backend part is located.
**./documents**: Documents created during the design phase are placed here.
**./frontend**: This is where the frontend part is located.

---

## 日本語
### プロジェクトの背景
近年、Web技術の進化が著しく、エンジニアやプログラマーは常に最新の知識を身につける必要がある。この市場のニーズを満たすため、特化したブックストアを提供することで、エンジニアの学びの一助となることを目指す。

### 目的
Web系エンジニア、プログラマー、そして技術者向けの最新の書籍とリソースを一元的に提供することで、彼らの学習と専門知識の向上をサポートする。

### ターゲットユーザー
- 初心者から上級者までのWeb系エンジニア
- 新しい技術やフレームワークを学びたいと考えるエンジニア

### 主要な機能
1. キーワードやカテゴリー別での検索機能
2. 書籍のレビューや評価機能
3. コミュニティフォーラムやQ&Aセクション
4. レビューやエンジニアのレベル別の書籍検索
5. ブックマーク機能

### 使用技術
- **フロントエンド**: Nuxt.js
- **バックエンド**: Python+Django
- **データベース**: MYSQL

### インストールガイド
#### Frontend
1. `.env`ファイルを作成
    ##### 環境変数
    - **RAKUTEN_APP_ID:** 楽天APIのID
    - **RAKUTEN_API_ENDPOINT:** 楽天BookAPIのエンドポイント

2. ```$ docker-compose up -d``` コンテナを立ち上げる

#### Backend
1. ```$ docker-compose up -d``` コンテナを立ち上げる
2. ```$ docker-compose exec api-server poetry run python manage.py migrate``` マイグレート

### ライブラリーインストール
#### Frontend
    $ docker-compose exec backend-for-frontend pnpm install ${library}
#### Backend
    docker-compose exec api-server poetry add ${library}

### ディレクトリ構成
**./backend**: バックエンド部分が配置されている。
**./documents**: 設計時に作成したドキュメントが配置されている。
**./frontend**: フロントエンド部分が配置されている。
**./infrastracture**: システムのインフラに関連する部分が配置されている。