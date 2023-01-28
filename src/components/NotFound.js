

import { useState } from 'react';


const NotFound = () => {

    const [seconds, setSeconds] = useState(1)


    setInterval(() => {
        setSeconds(seconds + 1)
        if (seconds >= 7) {
            window.location.replace('/')
        }
    }, 1000)

    return (

        <section className=" font-burtons w-[100%]">
            <div className="text-center flex flex-col items-center">
                <h1 className="text-8xl">404</h1>

                <h3 className="h2">
                    Look like you&apos;re lost
                </h3>

                <p>the page you are looking for not avaible!</p>

                <a href="/" className="text-white px-[20px] py-[10px] bg-[#39ac31] my-[20px] w-[10%] rounded-md hover:scale-110 ease-in-out duration-700 shadow-lg">Go to Home {seconds}s</a>
                <img src="/404.gif" alt='404' className='text-center inline rounded-xl mb-5 shadow-xl' />
            </div>

        </section>

    );
}

export default NotFound;