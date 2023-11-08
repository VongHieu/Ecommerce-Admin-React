import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/users/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AddInfoUserPage = lazy(() => import('src/pages/users/user-add'));
export const CategoryPage = lazy(() => import('src/pages/categories/categories'));
export const ProductCategoryPage = lazy(() =>
  import('src/pages/product-categories/product-categories')
);
export const PromotionPage = lazy(() => import('src/pages/promotions/promotions'));
export const ProductAddPage = lazy(() => import('src/pages/products/add'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'user/new', element: <AddInfoUserPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'product-category', element: <ProductCategoryPage /> },
        { path: 'promotion', element: <PromotionPage /> },
        { path: 'products/new', element: <ProductAddPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
