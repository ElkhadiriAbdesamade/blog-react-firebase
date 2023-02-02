import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { auth } from '../firebase-config';
import { signOut } from "firebase/auth";
const Navbar = ({ darkMode, setDarkMode, role }) => {

    const [showNav, setShowNav] = useState(false);
    const [email, setEmail] = useState('');

    const toggelNav = () => {
        setShowNav(!showNav);
    }

    const [year, setYear] = useState('');

    const logOut = () => {

        signOut(auth).then(() => {
            sessionStorage.setItem('email', "");
            window.location.replace('/');
        }).catch((error) => {
            console.log(error);
        });

    }
    useEffect(() => {
        setEmail(sessionStorage.getItem('email'))
        setYear(new Date().getFullYear());
    }, [])

    return (
        <nav className="py-3 dark:bg-[#404258] border-b-[1px] dark:border-[#50577A] shadow-xl dark:shadow-xl dark:shadow-slate-500 dark:text-white">
            <div id='top' className='absolute top-[-50px]'>

            </div>
            <div className="container">
                <div className="">
                    <div className="row">
                        <div className="col-md-6 text-center order-1 order-md-2 mb-3 mb-md-0">
                            <a href="/" className="text-3xl text-black dark:text-white font-bold  relative m-0 uppercase decoration-transparent">Blog Page</a>
                            {role}
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
                                    {!email && <li><a href="/sign_in" className="dark:text-white inline-block px-[10px] py-[5px]"><span className=""><i className="fa-solid fa-right-to-bracket"></i></span></a></li>}
                                    {!email && <li><a href="/sign_up" className="dark:text-white inline-block px-[10px] py-[5px]"><span className=""><i className="fa-solid fa-user-plus"></i></span></a></li>}
                                    {email && <li><button onClick={() => logOut()} className="dark:text-white inline-block px-[10px] py-[5px]"><span className=""><i className="fa-solid fa-right-from-bracket mr-1"></i></span>LogOut</button></li>}


                                </ul>
                                {!darkMode && <BsMoonStarsFill onClick={() => { setDarkMode(!darkMode) }} size={25} className='text-black cursor-pointer ml-4 text-xl' />}
                                {darkMode && <BsFillSunFill onClick={() => { setDarkMode(!darkMode) }} size={25} className='text-white cursor-pointer ml-4 text-xl' />}
                                <FiMenu size={40} className='cursor-pointer ml-2' onClick={toggelNav} />

                            </div>
                        </div>
                    </div>
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
                             {email &&<li className='text-2xl font-bold cursor-pointer'>
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
                        {!email && <li className='text-2xl font-bold cursor-pointer '>
                            <Link onClick={toggelNav} className='hover:text-gray-400' to="/sign_in">Sign In</Link>
                        </li>}
                        {!email && <li className='text-2xl font-bold cursor-pointer'>
                            <Link onClick={toggelNav} className='hover:text-gray-400' to="/sign_up">Sign Up</Link>
                        </li>}
                       
                        {email &&
                            <button onClick={() => logOut()} className='hover:text-gray-400 text-2xl font-bold'>Log Out</button>
                        }
                        <div className='absolute bottom-0 right-0 m-2'>
                            <div className="mb-3 text-center">
                                <p>Copyright © {year} All rights reserved | Made with 💗 by &nbsp;
                                    <a href="https://abdo-dev.vercel.app" rel="noreferrer" target="_blank" className='text-[#F79918] hover:scale-125 ease-in-out duration-500 hover:text-gray-400'>ABDO_DEV</a>
                                </p>
                            </div>
                            <div className="mb-8 text-center">
                                <a href="/" className="m-2 hover:text-gray-400">Terms &amp; Conditions</a>/&nbsp;
                                <a href="/" className="m-2 hover:text-gray-400">Privacy Policy</a>
                            </div>
                        </div>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;