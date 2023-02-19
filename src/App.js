import { useEffect, useState } from "react";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Post from "./components/blog/Post";
import Trending from "./components/blog/Trending";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NotFound from "./components/NotFound";
import { collection, getDocs, query, where } from '@firebase/firestore'
import { auth, db } from '../src/firebase-config';
import UserProfile from "./components/user/UserProfile";
import LoadingPage from "./components/LoadingPage";
import BlogDetails from "./components/blog/BlogDetails";
import EditBlog from "./components/blog/EditBlog";
import SearchBlog from "./components/blog/SearchBlog";



function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState();
  const [load, setLoad] = useState(true);

 
  const [blogs, setBlogs] = useState([]);

  const changeDark = () => {
    setDarkMode(!darkMode);
    //localStorage.setItem('darkMode',!darkMode);
  }





  const currentUser = auth.currentUser;

  useEffect(() => {
   
    if (currentUser !== null) {
      const usersCollectionRef = collection(db, "users");
      const getRole = async () => {

        const q = query(usersCollectionRef, where("email", "==", currentUser.email));
        const data = await getDocs(q);
        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]);
      };
      
      getRole();
    }

    const blogsCollectionRef = collection(db, "blogs");
    const getBlogs = async () => {
      const data = await getDocs(blogsCollectionRef);
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      setLoad(false)
    };
    getBlogs();
   
  }, [currentUser]);
  return (
    <div className={darkMode ? 'dark text-white ease-in-out duration-1000 ' : 'ease-in-out duration-1000 '}>
      <Router>
      {load ? <LoadingPage/> : 
        <div className="dark:bg-[#474E68]">
          <Navbar darkMode={darkMode} setDarkMode={changeDark} user={user} />
          <Routes>
            <Route path='/' element={[<Trending key={'t'} />, <Post key={'p'} blogs={blogs} user={user}/>]} />
            
            <Route path="/search/:elm" element={<SearchBlog user={user}/>} />
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
