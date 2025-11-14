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
import { Helmet } from "react-helmet"



const CategoryPage = () => {
  const { category } = useParams();
  return <LatestNews category={category || "সর্বশেষ"} />;
};

function App() {

  return (
    <>
      <Helmet>
        <title>বাংলা রিপোর্টস – নির্ভরযোগ্য বাংলা নিউজ পোর্টাল</title>
        <meta
          name="description"
          content="আপনার বাংলা নিউজ হাব – রাজনীতি, খেলা, বিনোদন, প্রযুক্তি ও অর্থনীতিসহ বাংলাদেশের এবং বিশ্বের সব গুরুত্বপূর্ণ খবর বিশ্লেষণসহ পড়ুন।"
        />
        <link rel="canonical" href="https://www.banglareports.com" />
        <meta httpEquiv="Content-Language" content="bn" />
        <meta property="og:title" content="বাংলা রিপোর্টস – নির্ভরযোগ্য বাংলা নিউজ পোর্টাল" />
        <meta
          property="og:description"
          content="আপনার বাংলা নিউজ হাব – রাজনীতি, খেলা, বিনোদন, প্রযুক্তি ও অর্থনীতিসহ বাংলাদেশের এবং বিশ্বের সব গুরুত্বপূর্ণ খবর বিশ্লেষণসহ পড়ুন।"
        />
        <meta property="og:url" content="https://www.banglareports.com" />
        <meta property="og:type" content="website" />
      </Helmet>

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
