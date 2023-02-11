import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../../firebase-config";
import ErrorAlert from "../ErrorAlert";
import Loading from "../Loading";
import SuccessAlert from "../SuccessAlert";

import { collection, addDoc} from '@firebase/firestore'
import {  useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import uuid from 'react-uuid';


const AddBlog = ({ user }) => {

    const [image, setImage] = useState('');



    const navigate=useNavigate();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    //const [user, setUser] = useState([]);
    const [category, setCategory] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);

    //const [user, setEmail] = useState('');

    const [err, setErr] = useState('');
    const [suc, setSuc] = useState('');
    const [load, setLoad] = useState(false);
    const changeErrAlert = () => {
        setErr('')
    }
    const changeSucAlert = () => {
        setSuc('')
    }

    const handleChangeImage = (e) => {
        e.preventDefault();
        setImage(URL.createObjectURL(e.target.files[0]))
        console.log(image);
    }

    const addBlog = async () => {
        setErr('')
        let coverUrl;
        setLoad(true);
        if (title === '' || desc === '' || category === [] || imageUpload === null) {
            setErr('Please Fill All Blog Info !!');
            setLoad(false);
            return;
        }
        if (imageUpload !== null) {
            if (imageUpload.size > 2097152) {
                setErr('Please choose Image With size Less then 2MB !!');
                setSuc('');
                setLoad(false);
                return;
            }
            //alert('image')
            console.log(imageUpload);
            const imageRef = ref(storage, `images/Blog/${uuid()}`);
            await uploadBytes(imageRef, imageUpload).then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
                .then(downloadURL => {
                    coverUrl = downloadURL;
                    console.log('Download URL', downloadURL)
                }).catch((error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            setErr('User don`t have permission to access the object');
                            setSuc('');
                            setLoad(false);
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            setErr('User canceled the upload');
                            setSuc('');
                            setLoad(false);
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            setErr('Unknown error occurred, inspect error.serverResponse');
                            setSuc('');
                            setLoad(false);
                            break;
                    }
                });
        }

        //get current date 
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        const blogsCollectionRef = collection(db, "blogs");
        let blog = { title: title, desc: desc, category: category,blogImg:coverUrl, date_creation: currentDate, user: user }

        console.log(blog);

        await addDoc(blogsCollectionRef, blog);



        setSuc('Blog Added successfully');
        setErr('');
        setLoad(false);
        window.location.replace('/')
    }

    function arrayRemove(arr, value) {
        setCategory(arr.filter((geeks) => {
            return geeks !== value;
        }));
    }

    useEffect(() => {
       //console.log(user);
    }, [])

    return (
        <div className="mt-24">
            <h1 className="text-5xl font-bold text-center">Add Blog</h1>
            <div className="md:w-8/12 lg:ml-20 mx-auto">
                <div id="t" className="mt-10 py-4 border-t border-blueGray-200 text-center">
                    <h1 className="text-2xl font-bold text-left mb-4">Blog Info</h1>
                    <div>
                        {err && <ErrorAlert  msg={err} setErr={changeErrAlert} />}
                        {suc && <SuccessAlert msg={suc} setSuc={changeSucAlert} />}
                        {load && <Loading />}
                    </div>
                    <div className="flex items-center flex-col">

                        <div className="flex flex-col items-start w-full mb-6">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Blog Title :</h3>
                            <input
                                type="text"
                                className="form-control  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Blog Title"
                                onChange={(event) => { setTitle(event.target.value) }}
                            />
                        </div>
                        {/* <div className="flex flex-col items-start w-full">
                            <label htmlFor="">Last Name :</label>
                            <input
                                type="text"
                                className="form-control  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(event) => { setLastName(event.target.value) }}
                            />
                        </div> */}

                        {/* <div className="flex flex-col items-start w-full
                            ">
                            <label htmlFor="">Blog Category :</label>
                            <div className="mb-6 w-full">
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-black rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(event) => { setCountry(event.target.value) }}>
                                    <option defaultValue>{country}</option>
                                    {countries.map((count) => {
                                        return <option key={count.name} value={count.name}>{count.name}
                                        </option>
                                    })}
                                </select>
                            </div>
                        </div> */}
                        <div className="flex flex-col items-start w-full">

                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Blog Description :</h3>
                            <div className="mb-6 w-full">
                                <textarea className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    rows={6}
                                    placeholder="Blog Description..."

                                    onChange={(event) => { setDesc(event.target.value) }}>
                                </textarea>
                            </div>
                        </div>
                        {/* //MultiSelect Dropdown */}
                        <div className="flex flex-col items-start w-full mb-6">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Categories :</h3>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                    <div className="flex items-center pl-3 hover:bg-slate-200 ">
                                        <input id="Travel-checkbox-list" type="checkbox" value="Travel" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 "
                                            onChange={(event) => { event.target.checked ? setCategory(category.concat(event.target.value)) : arrayRemove(category, event.target.value) }} />
                                        <label htmlFor="Travel-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Travel</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                    <div className="flex items-center pl-3 hover:bg-slate-200">
                                        <input id="Food-checkbox-list" type="checkbox" value="Food" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 "
                                            onChange={(event) => { event.target.checked ? setCategory(category.concat(event.target.value)) : arrayRemove(category, event.target.value) }} />
                                        <label htmlFor="Food-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Food</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                    <div className="flex items-center pl-3 hover:bg-slate-200">
                                        <input id="Technology-checkbox-list" type="checkbox" value="Technology" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 "
                                            onChange={(event) => { event.target.checked ? setCategory(category.concat(event.target.value)) : arrayRemove(category, event.target.value) }} />
                                        <label htmlFor="Technology-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Technology</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                    <div className="flex items-center pl-3 hover:bg-slate-200">
                                        <input id="Business-checkbox-list" type="checkbox" value="Business" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 "
                                            onChange={(event) => { event.target.checked ? setCategory(category.concat(event.target.value)) : arrayRemove(category, event.target.value) }} />
                                        <label htmlFor="Business-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Business</label>
                                    </div>
                                </li>

                            </ul>



                        </div>
                        {/* ///////////////// */}
                        < div className="flex flex-col items-start w-full">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Blog Image :</h3>
                            <div className="flex items-center justify-center w-full pb-4">
                                <label style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundRepeat: "no-repeat"
                                }}
                                    htmlFor="dropzone-file" className="flex flex-col bg-contain bg-center items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or GIF (MAX. 2Mb)</p>
                                    </div>
                                    <input onChange={(event) => { setImageUpload(event.target.files[0]); handleChangeImage(event) }}

                                        id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div >

                        <Link to="t" spy={true} offset={50} duration={200} onClick={() => { addBlog() }} className="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button"
                        >
                            <i className="fa-solid fa-pen mr-2"></i>
                            Add Blog
                        </Link>
                    </div >
                </div >
            </div >
        </div >
    );
}

export default AddBlog;
