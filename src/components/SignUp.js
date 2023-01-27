import { useEffect, useState } from "react";

const SignUp = () => {

    const [countries, setCountries] = useState([])


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
        get_Countries()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <section className="h-screen">

            <div className="container px-6 py-12 h-full">
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
                        <form>

                            <div className="mb-6 flex gap-2">
                                <input
                                    type="text"
                                    className="form-control w-[50%] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    className="form-control w-[50%] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                />
                            </div>
                          
                            <div className="mb-6">
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                {countries.map((count) => {
                                        return <option key={count.name} value={count.name}>{count.name}
                                        </option>
                                    })}
                                </select>
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Confirm Password"
                                />
                            </div>



                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-[#F79918] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#F79950] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light">
                                Sign Up
                            </button>

                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
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

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;