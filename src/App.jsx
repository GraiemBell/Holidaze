import React, { Suspense, lazy, useContext } from 'react';
import Layout from './Layout/index';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './auth/context/Context';
import { ClockLoader } from 'react-spinners';

const Homepage = lazy(() => import('./pages/home/HomePage'));
const DetailPage = lazy(() => import('./pages/specific/DetailPage'));
const SignIn = lazy(() => import('./pages/signIn/SignIn'));
const SignUp = lazy(() => import('./pages/register/RegisterUser'));
const Venues = lazy(() => import('./pages/venues/Venues'));
const UserProfile = lazy(() => import('./pages/userProfile/Profile'));
const PageNotFound = lazy(() => import('./pages/pageNotfound/ErrorPage'));

function App() {
  const { state } = useContext(AuthContext);
  return (
    <Suspense
      fallback={
        <div className="font-bold text-2xl flex items-center justify-center">
          <ClockLoader color="#6E7A55" size={80} />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<DetailPage />} />
          <Route
            path="/signIn"
            element={
              state.isAuthenticated ? <Navigate to="/profile" /> : <SignIn />
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              state.isAuthenticated ? (
                <UserProfile />
              ) : (
                <Navigate to="/signIn" />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
