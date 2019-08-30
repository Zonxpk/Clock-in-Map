import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
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
    title: 'Sale',
    icon: 'shopping-cart-outline',
    link: '/pages/sale',
  },
  {
    title: 'Check In',
<<<<<<< HEAD
    icon: 'camera-outline',
=======
    icon: 'shopping-cart-outline',
>>>>>>> ce60ce6f577d916d308691b95029189391f2d9f1
    link: '/pages/checkin',
  },
];
