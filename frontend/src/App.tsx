import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Layout = lazy(() => import('./components/Layout'))
const Loader = lazy(() => import('./components/Loader'))
const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/collection" element={<Collection />}/>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App