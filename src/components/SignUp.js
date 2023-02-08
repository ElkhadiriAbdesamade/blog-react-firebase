import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from '@firebase/firestore'
import { auth, db } from '../firebase-config';
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import Loading from "./Loading";



const SignUp = () => {

    const [countries, setCountries] = useState([])
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [country, setCountry] = useState('')
    const [psw, setPsw] = useState('');
    const [pswConfirmation, setPswConfirmation] = useState('');
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
    const usersCollectionRef = collection(db, "users");
    let user = { email: email, firstName: firstName, lastName: lastName, country: country,user_name:userName, bio: '', role: "user" }
    const addUser = async () => {
        await addDoc(usersCollectionRef, user);
    };

    
   
    const handleSignUp = async () => {
        setLoad(true);
        setErr('');
        if (user.email === "" || user.firstName === "" || user.lastName === "" ||user.user_name === "" || user.country === "" || user.email === "" || psw === "" || pswConfirmation === "") {
            setSuc('');
            setErr('Please Fill In All your information !!');
            setLoad(false);
            return;
        }
        if (psw !== pswConfirmation) {
            setSuc('');
            setLoad(false);
            setErr('password and password Confirmation dont match !!');
            return;
        }

         //Check if user_Name Exist
        const q = query(usersCollectionRef, where("user_name", "==", userName));
        const data = await getDocs(q);
        const userN=data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        console.log(userN);
        if (userN !== undefined) {
            setSuc('');
            setLoad(false);
            setErr('User Name already Exist !!');
            return;
        }
        addUser();
        createUserWithEmailAndPassword(auth, email, psw)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setSuc('Signed in ');
                setErr('');
                setLoad(false);
                sessionStorage.setItem('email', email)
                window.location.replace('/sign_in')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + '/' + errorMessage);
                setSuc('');
                setLoad(false);
                setErr(error.code);
                // ..
            });
        console.log(user);

       

    }


    const get_Countries = () => {
        fetch('country.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setCountries(myJson)
            });
    }
    useEffect(() => {
        if (sessionStorage.getItem('email') !== null && sessionStorage.getItem('email') !== "") {
            navigate('/');
        }
        get_Countries()
    }, [navigate])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <section className="">

            <div className="container px-6 py-12 lg:h-screen">
                <h1 className="text-5xl font-bold text-center">Sign Up</h1>

                <div className="flex justify-center items-center flex-wrap mt-20 g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src=" https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
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

                            <div className="mb-6 flex gap-2 w-full">
                                <input
                                    type="text"
                                    className="form-control w-[50%] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="First Name"
                                    onChange={(event) => { setFirstName(event.target.value) }}
                                />
                                <input
                                    type="text"
                                    className="form-control w-[50%] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Last Name"
                                    onChange={(event) => { setLastName(event.target.value) }}
                                />
                            </div>
                            <div className="mb-6 w-full">
                                <input
                                    type="email"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                    onChange={(event) => { setEmail(event.target.value) }}
                                />
                            </div>
                            <div className="mb-6 w-full">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="User Name"
                                    onChange={(event) => { setUserName(event.target.value) }}
                                />
                            </div>

                            <div className="mb-6 w-full">
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(event) => { setCountry(event.target.value) }}>
                                    <option defaultValue>choose your country</option>
                                    {countries.map((count) => {
                                        return <option key={count.name} value={count.name}>{count.name}
                                        </option>
                                    })}
                                </select>
                            </div>

                            <div className="mb-6 w-full">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    onChange={(event) => { setPsw(event.target.value) }}
                                />
                            </div>
                            <div className="mb-6 w-full">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                    placeholder="Confirm Password"
                                    onChange={(event) => { setPswConfirmation(event.target.value) }}
                                />
                            </div>



                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-[#F79918] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#F79950] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={() => { handleSignUp() }}>
                                Sign Up
                            </button>

                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5 w-full"
                            >
                                <p className="text-center font-semibold mx-4 mb-0 dark:text-white">OR</p>
                            </div>

                            <a
                                className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-[#fa2b2b]"

                                href="/"
                                role="button"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >

                                <span className="mr-4"><i className="fa-brands fa-google"></i></span>Continue with Google
                            </a>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5 w-full"
                            >
                                <p className="text-center font-semibold mx-4 mb-0 dark:text-white">you already have an account ?</p>
                            </div>
                            <a
                                type="submit"
                                className="inline-block px-7 py-3 bg-[#F79918] text-white font-medium text-sm leading-snug uppercase w-[50%] rounded shadow-md hover:bg-[#F79950] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out text-center"
                                data-mdb-ripple="true"
                                href="/sign_in"
                                data-mdb-ripple-color="light">
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;