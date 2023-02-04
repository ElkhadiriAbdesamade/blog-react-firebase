import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import Loading from "./Loading";


const SignIn = () => {


    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [err, setErr] = useState('');
    const [suc, setSuc] = useState('');
    const [load, setLoad] = useState(false);
    const changeErrAlert = () => {
        setErr('')
    }
    const changeSucAlert = () => {
        setSuc('')
    }
    const navigate = useNavigate();
    const handleResetPsw = () => {
        setLoad(true);
        setErr('');
        if (email === "") {
            setErr('Please give an Email Address !!');
            setLoad(false);
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErr('');
                setSuc('Password reset email sent!');
                setLoad(false);
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                //const errorMessage = error.message;
                setErr(errorCode)
                setSuc('');
                setLoad(false);
            });
    }
    const handleSignIn = () => {
        setLoad(true);
        setErr('');
        if (email === "" || psw === "") {
            setSuc('');
            setLoad(false);
            setErr('Please Fill In Email and password !!');
            return;
        }
        signInWithEmailAndPassword(auth, email, psw)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                sessionStorage.setItem('email', email)
                window.location.replace('/');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                //const errorMessage = error.message;
                setErr(errorCode);
                setSuc('');
                setLoad(false);
            });

    }
    useEffect(() => {
        console.log(sessionStorage.getItem('email'));
        if (sessionStorage.getItem('email') !== null && sessionStorage.getItem('email') !== "") {
            navigate('/');
        }
        const keyDownHandler = event => {
            console.log('User pressed: ', event.key);
      
            if (event.key === 'Enter') {
              event.preventDefault();
      
              // 👇️ your logic here
              handleSignIn();
            }
          };
      
          document.addEventListener('keydown', keyDownHandler);
      
          return () => {
            document.removeEventListener('keydown', keyDownHandler);
          };
    }, [navigate])
    return (

        <section className="md:h-screen">

            <div className="container px-6 py-12 h-full">
                <h1 className="text-5xl font-bold text-center">Sign In</h1>

                <div className="flex justify-center items-center flex-wrap mt-20 g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="img"
                        />
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <div>
                            {err && <ErrorAlert msg={err} setErr={changeErrAlert} />}
                            {suc && <SuccessAlert msg={suc} setSuc={changeSucAlert} />}
                            {load && <Loading />}
                        </div>

                        <div className="flex items-center flex-col">

                            <div className="mb-6 w-full">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                    onChange={(event) => { setEmail(event.target.value) }}
                                />
                            </div>
                            <div className="mb-6 w-full">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    onChange={(event) => { setPsw(event.target.value) }}
                                />
                            </div>

                            <div className="flex justify-between items-center mb-6 w-full">
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"
                                        className="  h-4 w-4 border border-gray-300 rounded-sm bg-white mt-1 float-left mr-2 cursor-pointer" />
                                    <label className="form-check-label inline-block text-gray-800 dark:text-white">Remember me</label>
                                </div>
                                <button className="text-[#F79918] hover:text-[#F79950] duration-200 transition ease-in-out"
                                    onClick={() => { handleResetPsw() }}>
                                    Forgot password?</button>
                            </div>


                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-[#F79918] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#F79950] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={() => { handleSignIn() }}>
                                Sign in
                            </button>

                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5 w-full"
                            >
                                <p className="text-center font-semibold mx-4 mb-0 dark:text-white">OR</p>
                            </div>

                            <button
                                className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-[#fa2b2b]"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >

                                <span className="mr-4"><i className="fa-brands fa-google"></i></span>Continue with Google
                            </button>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5 w-full"
                            >
                                <p className="text-center font-semibold mx-4 mb-0 dark:text-white">you don't have an account ?</p>
                            </div>
                            <a
                                type="submit"
                                className="inline-block px-7 py-3 bg-[#F79918] text-white font-medium text-sm leading-snug uppercase w-[50%] rounded shadow-md hover:bg-[#F79950] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out text-center"
                                data-mdb-ripple="true"
                                href="/sign_up"
                                data-mdb-ripple-color="light"

                            >
                                Sign Up
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignIn;
