import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { Bounce, ToastContainer } from 'react-toastify';
import { lazy } from 'react';
// динамический импорт, страницы в отдельных чанках
import { Header } from '3-widgets/Header';
import { loginUrl, profileUrl, publicUrl, signUpUrl } from '6-shared/config/urls';
import { AuthProvider } from './1-AuthContext';
import { ProtectedRoute } from './3-ProtectedRoute';

const LoginPage = lazy(() => import('./4-LoginPage').then((m) => ({ default: m.LoginPage })));
const ProfilePage = lazy(() => import('./5-ProfilePage').then((m) => ({ default: m.ProfilePage })));
const PublicPage = lazy(() => import('./6-PublicPage').then((m) => ({ default: m.PublicPage })));
const SignUpPage = lazy(() => import('2-pages/SignUp/SignUp').then((m) => ({ default: m.SignUp })));
const NotFoundPage = lazy(() => import('2-pages/NotFound/NotFound').then((m) => ({ default: m.NotFound })));

const MainLayout = () => (
    <>
        <Header />
        <div style={{ padding: '2rem' }}>
            <Outlet />
        </div>
    </>
);

const loginRouteNode = () => {
    return (
        <Route
            path={loginUrl}
            element={
                <>
                    <Header />
                    <div style={{ padding: '2rem' }}>
                        <LoginPage />
                    </div>
                </>
            }
        />
    );
};

const publicRouteNode = () => {
    return (
        <Route
            path={publicUrl}
            element={
                <>
                    <Header />
                    <div style={{ padding: '2rem' }}>
                        <PublicPage />
                    </div>
                </>
            }
        />
    );
};

const signUpRouteNode = () => {
    return (
        <Route
            path={signUpUrl}
            element={
                <>
                    <Header />
                    <div style={{ padding: '2rem' }}>
                        <SignUpPage />
                    </div>
                </>
            }
        />
    );
};

const profileRouteNode = () => {
    return (
        <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
                <Route index element={<Navigate to={profileUrl} replace />} />
                <Route path={profileUrl} element={<ProfilePage />} />
            </Route>
        </Route>
    );
};

const notFoundNode = () => <Route path="*" element={<NotFoundPage />} />;

const getTostComponent = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
        />
    );
};

export const AppRouter = () => (
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                {loginRouteNode()}
                {publicRouteNode()}
                {signUpRouteNode()}
                {profileRouteNode()}
                {notFoundNode()}
            </Routes>
            {getTostComponent()}
        </AuthProvider>
    </BrowserRouter>
);
