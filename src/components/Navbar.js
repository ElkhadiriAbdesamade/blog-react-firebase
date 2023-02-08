import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { HiViewGrid, HiLogout } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { auth, storage } from '../firebase-config';
import { signOut } from "firebase/auth";
import { Button, Dropdown } from 'flowbite-react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useLocation } from 'react-router-dom'

const Navbar = ({ darkMode, setDarkMode, user }) => {


    const imagesListRef = ref(storage, "images/");
    const [imageUrl, setImageUrl] = useState('');

    const [showNav, setShowNav] = useState(false);
    //const [email, setEmail] = useState('');

    const toggelNav = () => {
        setShowNav(!showNav);
    }

    const [year, setYear] = useState('');
    const location = useLocation();
    const logOut = () => {

        signOut(auth).then(() => {
            sessionStorage.setItem('email', "");
            window.location.replace('/');
        }).catch((error) => {
            console.log(error);
        });

    }
    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                if (item.name === user.id) {
                    getDownloadURL(item).then((url) => {
                        setImageUrl(url);
                    });
                }
            });

        });


        console.log(location.pathname);

        setYear(new Date().getFullYear());
    }, [user])

    return (
        <nav className="py-3 dark:bg-[#404258] border-b-[1px] dark:border-[#50577A] shadow-xl dark:shadow-xl dark:shadow-slate-500 dark:text-white">
            <div id='top' className='absolute top-[-50px]'>

            </div>
            <div className="container">
                <div className="">
                    <div className="row">
                        <div className="col-md-6 text-center order-1 order-md-2 mb-3 mb-md-0">
                            <a href="/" className="text-3xl text-black dark:text-white font-bold  relative m-0 uppercase decoration-transparent">Blog Page</a>
                            {user && user.role}
                        </div>
                        <div className="order-3 col-md-3 order-md-1">
                            <div className="input-group rounded">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <span className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3 text-end order-2 order-md-3 mb-3 mb-md-0">
                            <div className="flex items-center">
                                <ul className="list-unstyled relative m-0 me-auto flex items-center">
                                    {!user && <li>
                                        <Button href='/sign_in' gradientMonochrome="info" className='mr-4'>
                                            <a className="dark:text-white inline-block"><span className=""><i className="fa-solid fa-right-to-bracket mr-1"></i></span>SignIn</a>
                                        </Button>
                                    </li>}
                                    {!user && <li>
                                        <Button href="/sign_up" gradientMonochrome="cyan">
                                            <a className="dark:text-white inline-block "><span className=""><i className="fa-solid fa-user-plus mr-1"></i></span>SignUp</a>
                                        </Button>
                                    </li>}
                                    {user &&
                                       
                                        <div>
                                            <Dropdown label="Menu" className={darkMode ? 'bg' : 'bg_l'}>
                                                <Dropdown.Header>
                                                    <div className='flex items-center'>
                                                        <span className="block text-sm  text-left ">
                                                            {user.firstName} {user.lastName}
                                                        </span>
                                                    </div>
                                                    <span className="block text-sm font-medium truncate  text-left">
                                                        {user.email}
                                                    </span>
                                                </Dropdown.Header>
                                                <a href="/myProfile" >
                                                    <Dropdown.Item icon={HiViewGrid} >
                                                        Profile
                                                    </Dropdown.Item>
                                                </a>
                                                <Dropdown.Item icon={HiLogout} onClick={() => logOut()} >
                                                    Sign out
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </div>
                                    }


                                </ul>
                                {!darkMode && <BsMoonStarsFill onClick={() => { setDarkMode(!darkMode) }} size={25} className='text-black cursor-pointer ml-4 text-xl' />}
                                {darkMode && <BsFillSunFill onClick={() => { setDarkMode(!darkMode) }} size={25} className='text-white cursor-pointer ml-4 text-xl' />}
                                <FiMenu size={40} className='cursor-pointer ml-2' onClick={toggelNav} />

                            </div>
                        </div>
                    </div>
                </div>
                <div aria-label="Breadcrumb" className='flex absolute py-4 z-50'>
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <a href={location.pathname} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{location.pathname}</a>
                            </div>
                        </li>
                        {/* <li aria-current="page">
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Flowbite</span>
                            </div>
                        </li> */}
                    </ol>
                </div>
            </div>
            <div className={!showNav ? "bg-black h-screen text-white py-5 px-4 fixed top-0 right-[-100%] z-[100] w-full ease-in-out duration-1000"
                : "bg-black h-screen text-white py-5 px-4 fixed top-0 right-0 w-[350px] z-[100] ease-in-out duration-1000 opacity-90"}>
                <div className='flex flex-row-reverse justify-between items-center'>
                    <IoIosClose size={50} className='cursor-pointer' onClick={toggelNav} />
                </div>
                <div className='pt-2'>
                    <ul className='flex flex-col gap-10 '>
                        <li className='text-2xl font-bold cursor-pointer'><Link className='hover:text-gray-400' to="/" onClick={toggelNav}>
                            <i className="fa-solid fa-home mr-4"></i>
                            Home</Link></li>
                        {user && <li className='text-2xl font-bold cursor-pointer'>
                            <Link className='hover:text-gray-400' to="/myProfile" onClick={toggelNav}>
                                <i className="fa-solid fa-address-card mr-4"></i>
                                My Profile</Link></li>
                        }
                        <div className="btn-group ">
                            <a className="nav-link dropdown-toggle text-white text-2xl font-bold cursor-pointer pl-0" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-list-dropdown mr-4"></i>
                                Categories
                            </a>
                            <ul className="dropdown-menu w-full" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/">Travel</a></li>
                                <li><a className="dropdown-item" href="/">Food</a></li>
                                <li><a className="dropdown-item" href="/">Technology</a></li>
                                <li><a className="dropdown-item" href="/">Business</a></li>
                            </ul>
                        </div>
                        {!user && <li className='text-2xl font-bold cursor-pointer '>
                            <Link onClick={toggelNav} className='hover:text-gray-400' to="/sign_in">Sign In</Link>
                        </li>}
                        {!user && <li className='text-2xl font-bold cursor-pointer'>
                            <Link onClick={toggelNav} className='hover:text-gray-400' to="/sign_up">Sign Up</Link>
                        </li>}

                        {user &&
                            <button onClick={() => logOut()} className='hover:text-gray-400 text-2xl font-bold'>Log Out</button>
                        }
                        <div className='absolute bottom-0 right-0 m-2'>
                            <div className="mb-3 text-center">
                                <p>Copyright © {year} All rights reserved | Made with 💗 by &nbsp;
                                    <a href="https://abdo-dev.vercel.app" rel="noreferrer" target="_blank" className='text-[#F79918] hover:scale-125 ease-in-out duration-500 hover:text-gray-400'>ABDO_DEV</a>
                                </p>
                            </div>

                        </div>
                    </ul>
                </div>

            </div>

        </nav>
    );
}

export default Navbar;