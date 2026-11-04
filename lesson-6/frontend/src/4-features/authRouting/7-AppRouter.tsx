import { NotFoundPage } from '2-pages/NotFound';
import { SignUp } from '2-pages/SignUp/SignUp';
import { Header } from '3-widgets/Header';
import { loginUrl, profileUrl, publicUrl, signUpUrl } from '6-shared/config/urls';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { Bounce, ToastContainer } from 'react-toastify';
import { AuthProvider } from './1-AuthContext';
import { ProtectedRoute } from './3-ProtectedRoute';
import { LoginPage } from './4-LoginPage';
import { ProfilePage } from './5-ProfilePage';
import { PublicPage } from './6-PublicPage';

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
                        <SignUp />
                    </div>
                </>
            }
        />
    );
};

const profileRouteNode = () => {
    {
        /* Защищённые маршруты */
    }
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
