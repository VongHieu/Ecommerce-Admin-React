import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'category',
    path: '/category',
    icon: icon('ic_analytics'),
  },
  {
    title: 'product category',
    path: '/product-category',
    icon: icon('ic_lock'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'promotion',
    path: '/promotion',
    icon: icon('ic_cart'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'logout',
    path: '/logout',
    icon: icon('ic_lock'),
  },

  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
