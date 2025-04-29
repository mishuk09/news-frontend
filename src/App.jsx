import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./pages/Navbar"
import BlogDetails from "./pages/BlogDetails"


function App() {

  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<BlogDetails />} />
      </Routes>

    </>
  )
}

export default App
