const Menu = [
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard'
  },
  {divider: true},
  {header: '프라이빗 소통 공간'},
  {
    title: 'Fans\' Questions',
    group: 'apps',
    name: 'recommended QA',
    icon: 'chat_bubble',
    href: '/recommendedQA'
  },
  // {
  //   title: 'Chatting LOG',
  //   group: 'apps',
  //   name: 'chattinglog',
  //   icon: 'dashboard',
  //   // href: '/dashboard'
  // },
  {divider: true},
  {header: '챗봇 관리'},
  {
    title: 'Automatic Q&A',
    group: 'apps',
    icon: 'chat_bubble',
    name: 'automaticQA',
    href: '/automaticQA'
  },
  {
    title: 'Predefined Q&A',
    group: 'apps',
    name: 'predefinedQA',
    icon: 'chat_bubble',
    href: '/predefinedQA'
  },
  {
    title: 'Custom Q&A',
    group: 'apps',
    name: 'customQA',
    icon: 'chat_bubble',
    href: '/customQA'
  },
  // {divider: true},
  // {header: 'Chatting gwanli'},
  // {
  //   title: 'Spam protection',
  //   group: 'apps',
  //   icon: 'chat_bubble',
  //   name: 'spamprotection',
  //   // href: ''
  // },
  {divider: true},
  // {header: '참고하자 김민재'},
  // {
  //   title: 'Widgets',
  //   group: 'widgets',
  //   component: 'widgets',
  //   icon: 'widgets',
  //   items: [
  //     {name: 'social', title: 'Social', href: '/widgets/social'},
  //     {name: 'statistic', title: 'Statistic', badge: 'new', href: '/widgets/statistic'},
  //     {name: 'chart', title: 'Chart', href: '/widgets/chart'},
  //     {name: 'list', title: 'List', href: '/widgets/list'},
  //   ]
  // },
  // {
  //   title: 'General',
  //   group: 'components',
  //   component: 'components',
  //   icon: 'tune',
  //   items: [
  //     {name: 'alerts', title: 'Alerts', href: '/general/alerts'},
  //     {name: 'avatars', title: 'Avatars', href: '/general/avatars'},
  //     {name: 'badges', title: 'Badges', href: '/general/badges'},
  //     {name: 'buttons', title: 'Buttons', href: '/general/buttons'},
  //     {name: 'cards', title: 'Cards', href: '/general/cards'},
  //     {name: 'carousels', title: 'Carousels', href: '/general/carousels'},
  //     {name: 'chips', title: 'Chips', href: '/general/chips'},
  //     {name: 'dialogs', title: 'Dialogs', href: '/general/dialogs'},
  //     {name: 'icons', title: 'Icons', href: '/general/icons'},
  //     {name: 'tables', title: 'Data Tables', href: '/general/tables'},
  //     {name: 'parallax', title: 'Parallax  image', href: '/general/parallax'},
  //     {name: 'snackbar', title: 'Snackbar', href: '/general/snackbar'},
  //     {name: 'progress', title: 'Progress', href: '/general/progress'},
  //     {name: 'slider', title: 'Slider', href: '/general/sliders'},
  //     {name: 'tooltip', title: 'Tooltip', href: '/general/tooltips'},
  //     {name: 'pagination', title: 'Pagination', href: '/general/pagination'},
  //     {name: 'typography', title: 'Typography', href: '/general/typography'},
  //     {name: 'color', title: 'Color', href: '/general/colors'},
  //
  //   ]
  // },
  // {
  //   title: 'Pickers',
  //   group: 'pickers',
  //   component: 'picker',
  //   icon: 'filter_vintage',
  //   items: [
  //     {name: 'timepicker', title: 'Timepicker', href: '/pickers/timepicker'},
  //     {name: 'datepicker', title: 'Datepicker', href: '/pickers/datepicker'},
  //
  //   ]
  // },
  // {
  //   title: 'Forms & Controls',
  //   group: 'forms',
  //   component: 'forms',
  //   icon: 'edit',
  //   items: [
  //     {name: 'basic', title: 'General', href: '/forms/basic-forms'},
  //     {name: 'selects', title: 'Selects', badge: 'new', href: '/forms/selects'},
  //     {name: 'selection-controls', title: 'Selection Controls', href: '/forms/selection-controls'},
  //     {name: 'text-fields', title: 'Text Fields', href: '/forms/text-fields'},
  //     {name: 'steppers', title: 'Steppers', href: '/forms/steppers'},
  //     {name: 'editors', title: 'Editors', href: '/forms/editors'},
  //   ]
  // }


];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
