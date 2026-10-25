import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Visit from './pages/Visit'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="visit" element={<Visit />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
