import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'example',
    icon: 'shopping-cart-outline',
    link: '/pages/example-nd',
  },
  {
    title: 'User',
    icon: 'shopping-cart-outline',
    link: '/pages/user',
  },
  {
    title: 'Person Log',
    icon: 'person-outline',
    link: '/pages/person-log',
  },
];
