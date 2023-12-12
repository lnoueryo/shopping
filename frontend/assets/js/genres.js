import { mdiPencilRuler } from '@mdi/js';
import { mdiXml } from '@mdi/js';
// import { mdiSourceBranchCheck } from '@mdi/js';
import { mdiLinux } from '@mdi/js';
import { mdiMemory } from '@mdi/js';
import { mdiLan } from '@mdi/js';
import { mdiSecurity } from '@mdi/js';
import { mdiDatabase } from '@mdi/js';
import { mdiServerNetwork } from '@mdi/js';
// import { mdiWeatherCloudy } from '@mdi/js';

export const genreData = [
  {
    id: '001005003003',
    title: 'Design',
    icon: mdiPencilRuler,
  },
  {
    id: '001005005',
    title: 'Programming',
    icon: mdiXml,
  },
  // {
  //   id: 3, // インターネット入門　001005002001
  //   title: 'Development',
  //   to: 'development',
  //   icon: mdiSourceBranchCheck,
  // },
  {
    id: '001005007',
    title: 'OS',
    icon: mdiLinux,
  },
  {
    id: '001005001',
    title: 'Hardware',
    icon: mdiMemory,
  },
  {
    id: '001005004',
    title: 'Network',
    icon: mdiLan,
  },
  {
    id: '001005003001',
    title: 'Security',
    icon: mdiSecurity,
  },
  {
    id: '001005006011', // dbase 001005006008
    title: 'Database',
    icon: mdiDatabase,
  },
  {
    id: '001005003010',
    title: 'System',
    icon: mdiServerNetwork,
  },
  // {
  //   id: 10,
  //   title: 'Cloud',
  //   to: 'cloud',
  //   icon: mdiWeatherCloudy,
  // },
];
