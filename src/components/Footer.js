import { useEffect, useState } from "react";


const Footer = () => {

    const [year, setYear] = useState('');

  

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className='pb-0 max-w-[1320px] mx-auto'>
            <div className="flex flex-col items-center">
                <div className="mb-8">
                    <ul className="list-unstyled relative m-0 me-auto flex items-center gap-2">
                        <li><a href="/" className="dark:text-slate-700 bg-slate-300 rounded-xl inline-block px-[15px] py-[10px] hover:bg-[#F79918] hover:text-white ease-in-out duration-500"><span className=""><i className="fa-brands fa-twitter"></i></span></a></li>
                        <li><a href="/" className="dark:text-slate-700 bg-slate-300 rounded-xl inline-block px-[15px] py-[10px] hover:bg-[#F79918] hover:text-white ease-in-out duration-500"><span className=""><i className="fa-brands fa-facebook-f"></i></span></a></li>
                        <li><a href="/" className="dark:text-slate-700 bg-slate-300 rounded-xl inline-block px-[15px] py-[10px] hover:bg-[#F79918] hover:text-white ease-in-out duration-500"><span className=""><i className="fa-brands fa-instagram"></i></span></a></li>

                    </ul>
                </div>
                <div className="mb-3 text-center">
                    <p>Copyright © {year} All rights reserved | Made with 💗 by &nbsp;
                        <a href="https://abdo-dev.vercel.app" rel="noreferrer" target="_blank" className='text-[#F79918] hover:scale-110 ease-in-out duration-500'>ABDO_DEV</a>
                    </p>
                </div>
                <div className="mb-8 text-center">
                    <a href="/" className="m-2">Terms &amp; Conditions</a>/&nbsp;
                    <a href="/" className="m-2">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;