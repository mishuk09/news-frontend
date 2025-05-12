import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./pages/Navbar"
import BlogDetails from "./pages/BlogDetails"
import ChildHome from "./pages/ChildHome"
import Footer from "./pages/Footer"


function App() {

  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={<ChildHome />} />
        <Route path='/product/:id' element={<BlogDetails />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
