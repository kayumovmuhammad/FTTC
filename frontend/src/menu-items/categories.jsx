// // assets
// import CheckroomIcon from '@mui/icons-material/Checkroom';
// import LaptopIcon from '@mui/icons-material/Laptop';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// // ==============================|| MENU ITEMS - DASHBOARD ||============================== //

// const categories = {
//   id: 'group-categories',
//   title: 'Категории',
//   type: 'group',
//   children: [
//     {
//       id: 'plastic',
//       title: 'Пластик',
//       type: 'item',
//       url: '/categories/plastic',
//       icon: LaptopIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'papers',
//       title: 'Одежда',
//       type: 'item',
//       url: '/categories/papers',
//       icon: CheckroomIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'glasses',
//       title: 'Стекло',
//       type: 'item',
//       url: '/categories/glasses',
//       icon: CheckroomIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'metal',
//       title: 'Метал',
//       type: 'item',
//       url: '/categories/metal',
//       icon: CheckroomIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'construction',
//       title: 'Строительный мусор',
//       type: 'item',
//       url: '/categories/construction',
//       icon: CheckroomIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'technical',
//       title: 'Техника',
//       type: 'item',
//       url: '/categories/technical',
//       icon: LaptopIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'organic',
//       title: 'Органические отходы',
//       type: 'item',
//       url: '/categories/organic',
//       icon: CheckroomIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'others',
//       title: 'Другие',
//       type: 'item',
//       url: '/categories/others',
//       icon: MoreHorizIcon,
//       breadcrumbs: false
//     }
//   ]
// };

// export default categories;
// MUI Icons version
import CheckroomIcon from '@mui/icons-material/Checkroom'; // для одежды - правильная иконка
import RecyclingIcon from '@mui/icons-material/Recycling'; // для пластика - более подходящая
import LocalBarIcon from '@mui/icons-material/LocalBar'; // для стекла - бутылка/стакан
import BuildIcon from '@mui/icons-material/Build'; // для металла - инструменты/металлические предметы
import ConstructionIcon from '@mui/icons-material/Construction'; // для строительного мусора - правильная
import ComputerIcon from '@mui/icons-material/Computer'; // для техники - компьютер
import GrassIcon from '@mui/icons-material/Grass';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // для других - правильная

// Альтернативный вариант с Lucide React
// import { Shirt, Recycle, Wine, Wrench, HardHat, Monitor, Leaf, MoreHorizontal } from 'lucide-react';

const categories = {
  id: 'group-categories',
  title: 'Категории',
  type: 'group',
  children: [
    {
      id: 'plastic',
      title: 'Пластик',
      type: 'item',
      url: '/categories/plastic',
      icon: RecyclingIcon, // Иконка переработки - идеально для пластика
      breadcrumbs: false
    },
    {
      id: 'papers',
      title: 'Одежда',
      type: 'item',
      url: '/categories/papers',
      icon: CheckroomIcon, // Уже правильная иконка для одежды
      breadcrumbs: false
    },
    {
      id: 'glasses',
      title: 'Стекло',
      type: 'item',
      url: '/categories/glasses',
      icon: LocalBarIcon, // Бутылка/стакан - лучше для стекла
      breadcrumbs: false
    },
    {
      id: 'metal',
      title: 'Метал',
      type: 'item',
      url: '/categories/metal',
      icon: BuildIcon, // Инструменты - хорошо ассоциируются с металлом
      breadcrumbs: false
    },
    {
      id: 'construction',
      title: 'Строительный мусор',
      type: 'item',
      url: '/categories/construction',
      icon: ConstructionIcon, // Уже правильная иконка
      breadcrumbs: false
    },
    {
      id: 'technical',
      title: 'Техника',
      type: 'item',
      url: '/categories/technical',
      icon: ComputerIcon,
      breadcrumbs: false
    },
    {
      id: 'organic',
      title: 'Органические отходы',
      type: 'item',
      url: '/categories/organic',
      icon: GrassIcon,
      breadcrumbs: false
    },
    {
      id: 'others',
      title: 'Другие',
      type: 'item',
      url: '/categories/others',
      icon: MoreHorizIcon,
      breadcrumbs: false
    }
  ]
};

export default categories;
