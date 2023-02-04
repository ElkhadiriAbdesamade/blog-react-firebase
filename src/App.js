import { useEffect, useState } from "react";
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
import { collection, getDocs, query, where } from '@firebase/firestore'
import { db } from '../src/firebase-config';
import UserProfile from "./components/UserProfile";
import LoadingPage from "./components/LodingPage";

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState();
  const [load,setLoad]=useState(true);

  const changeDark = () => {
    setDarkMode(!darkMode);
    //localStorage.setItem('darkMode',!darkMode);
  }





  //const u = useRef();

  useEffect(() => {
    let email = sessionStorage.getItem("email")
    if (email !== "") {
      const usersCollectionRef = collection(db, "users");
      const getRole = async () => {

        const q = query(usersCollectionRef, where("email", "==", email));
        const data = await getDocs(q);
        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]);
        setLoad(false);
      };
      getRole();
    }else{
      setLoad(false);
    }
    
    // setRole(localStorage.getItem('role'));
  }, []);
  return (
    <div className={darkMode ? 'dark text-white ease-in-out duration-1000 ' : 'ease-in-out duration-1000 '}>
      <Router>
      {load ? <LoadingPage/> : 
        <div className="dark:bg-[#474E68]">
          <Navbar darkMode={darkMode} setDarkMode={changeDark} user={user} />
          <Routes>
            <Route path='/' element={[<Trending key={'t'} />, <Post key={'p'} />]} />
            <Route path="/myProfile" element={<UserProfile darkMode={darkMode} />} />
            <Route path='/sign_in' element={<SignIn />} />
            <Route path='/sign_up' element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

          <Footer />
          <BackToTop />
        </div>
      }

      </Router>
    </div>
  );
}

export default App;
