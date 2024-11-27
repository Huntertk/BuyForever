import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
const Layout = lazy(() => import('./components/Layout'))
const Loader = lazy(() => import('./components/Loader'))
const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
      <Toaster  position="top-right" />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/collection" element={<Collection />}/>
          </Route>
            <Route path="/login" element={<Login />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App