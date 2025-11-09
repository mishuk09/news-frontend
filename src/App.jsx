import { Route, Routes, useParams } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./pages/Navbar"
import BlogDetails from "./pages/BlogDetails"
import ChildHome from "./pages/ChildHome"
import Footer from "./pages/Footer"
import ResultPool from "./components/PoolResult/ResultPool"
import SingleDecision from "./pages/singleDecision"
import LatestNews from "./components/LatestNews/LatestNews"
import FrontNewsDetails from "./pages/FrontNewsDetails"
import SemiFrontNewsDetails from "./pages/SemiFrontNewsDetails"



const CategoryPage = () => {
  const { category } = useParams();
  return <LatestNews category={category || "সর্বশেষ"} />;
};

function App() {

  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={<ChildHome />} />
        <Route path='/pool-result' element={<ResultPool />} />
        <Route path='/news/:id' element={<BlogDetails />} />
        <Route path='/front-news/:id' element={<FrontNewsDetails />} />
        <Route path='/semi-front-news/:id' element={<SemiFrontNewsDetails />} />
        <Route path='/decision/:id' element={<SingleDecision />} />

        {/* Sub Section */}
        {/* <Route path='/latest-news' element={<LatestNews />} /> */}
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
