import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Layout = lazy(() => import('./components/Layout'))
const Home = lazy(() => import('./pages/Home'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading.....</h1>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App