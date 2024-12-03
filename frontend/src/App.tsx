import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
const Layout = lazy(() => import('./components/Layout'))
const Loader = lazy(() => import('./components/Loader'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))
const Profile = lazy(() => import('./pages/Profile'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const UpdatePasswordPage = lazy(() => import('./pages/UpdatePasswordPage'))
const UpdateProfilePage = lazy(() => import('./pages/UpdateProfilePage'))
const Cart = lazy(() => import('./pages/Cart'))
const Shipping = lazy(() => import('./pages/Shipping'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Orders = lazy(() => import('./pages/Orders'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
      <Toaster  position="top-right" />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/collection" element={<Collection />}/>
            <Route path="/collection/:id" element={<ProductDetails />}/>
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }/>
            <Route path="/shipping" element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }/>
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }/>
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }/>
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }/>
            <Route path="/profile/update-password" element={
              <ProtectedRoute>
                <UpdatePasswordPage />
              </ProtectedRoute>
            }/>

            <Route path="/profile/update-profile" element={
              <ProtectedRoute>
                <UpdateProfilePage />
              </ProtectedRoute>
            }/>
          </Route>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App