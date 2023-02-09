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
import { auth, db } from '../src/firebase-config';
import UserProfile from "./components/UserProfile";
import LoadingPage from "./components/LodingPage";
import BlogDetails from "./components/blog/BlogDetails";
import EditBlog from "./components/blog/EditBlog";


function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState();
  const [load,setLoad]=useState(true);
  const [blogs, setBlogs] = useState([]);

  const changeDark = () => {
    setDarkMode(!darkMode);
    //localStorage.setItem('darkMode',!darkMode);
  }




  const currentUser = auth.currentUser;
  //const u = useRef();

  useEffect(() => {
    //let email = sessionStorage.getItem("email")
    
    console.log(currentUser);
    if (currentUser !== null) {
      const usersCollectionRef = collection(db, "users");
      const getRole = async () => {

        const q = query(usersCollectionRef, where("email", "==", currentUser.email));
        const data = await getDocs(q);
        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]);
       
        setLoad(false);
      };
      getRole();
    }else{
      setLoad(false);
    }

    const blogsCollectionRef = collection(db, "blogs");
    const getBlogs = async () => {
      const data = await getDocs(blogsCollectionRef);
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      
    };
    getBlogs();
    
    // setRole(localStorage.getItem('role'));
  
  }, [currentUser]);
  return (
    <div className={darkMode ? 'dark text-white ease-in-out duration-1000 ' : 'ease-in-out duration-1000 '}>
      <Router>
      {load ? <LoadingPage/> : 
        <div className="dark:bg-[#474E68]">
          <Navbar darkMode={darkMode} setDarkMode={changeDark} user={user} />
          <Routes>
            <Route path='/' element={[<Trending key={'t'} />, <Post key={'p'} blogs={blogs} user={user}/>]} />
            <Route path="/Author/:id" element={<UserProfile darkMode={darkMode}/>} />
            <Route path="/Profile" element={<UserProfile darkMode={darkMode} user={user}/>} />
            <Route path="/blogDetails/:id" element={<BlogDetails darkMode={darkMode} user={user}/>} />
            <Route path="/updateBlog/:id" element={<EditBlog darkMode={darkMode} user={user}/>} />

            <Route path='/sign_in' element={<SignIn user={user}/>} />
            <Route path='/sign_up' element={<SignUp user={user}/>} />
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
