import { useState } from "react";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Trending from "./components/Trending";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const changeDark = () => {
    setDarkMode(!darkMode);

  }
  return (
    <div className={darkMode ? 'dark text-white ease-in-out duration-1000 ' : 'ease-in-out duration-1000 '}>
      <Router>

        <div className="dark:bg-[#474E68]">
          <Navbar darkMode={darkMode} setDarkMode={changeDark} />


          <Routes>
            <Route path='/' element={[<Trending key={'t'}/>, <Post key={'p'}/>]} />
            <Route path='/sign_in' element={<SignIn />} />
            <Route path='/sign_up' element={<SignUp />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          
          <Footer />
          <BackToTop />
        </div>


      </Router>
    </div>
  );
}

export default App;
