import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../../firebase-config";
import ErrorAlert from "../Alerts/ErrorAlert";
import Loading from "../Alerts/Loading";
import SuccessAlert from "../Alerts/SuccessAlert";

import { collection, updateDoc,doc, getDocs, query, where } from '@firebase/firestore'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-scroll";
import uuid from 'react-uuid';


const EditBlog = ({ user }) => {
    const { id } = useParams()
    //const [blog, setBlog] = useState();

    const [image, setImage] = useState('');

    const [blogId, setBlogId] = useState('');



    const [arrayCat, setArrayCat] = useState(['Travel', 'Food', 'Technology', 'Business'])


    const navigate = useNavigate();

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
   

    const updateBlog = async () => {
        console.log(category);
        setErr('')
        let coverUrl='';
        setLoad(true);
        if (title === '' || desc === '' || category === []) {
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
                    coverUrl=downloadURL;
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

        let blog;
        if (coverUrl !=='') {
            blog = { title: title, desc: desc, category: category, blogImg: coverUrl }
        }else{
            blog = { title: title, desc: desc, category: category }
        }

        const blogDoc = doc(db, "blogs", blogId); 
        await updateDoc(blogDoc, blog)

        setSuc('Blog Updated successfully');
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
        console.log(id);

        const blogsCollectionRef = collection(db, "blogs");
        const getBlog = async () => {

            const q = query(blogsCollectionRef, where('__name__', "==", id));
            const data = await getDocs(q);
            setBlogId(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].id);
            setTitle(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].title);
            setDesc(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].desc);
            setCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].category);
            setImage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].blogImg);
            
        };
        getBlog();
        console.log(category);

    }, [])

    return (
        <div>

            <div className="mt-8 px-8">
                <h1 className="text-5xl font-bold text-center">Edit Blog</h1>
                <div className="md:w-8/12 lg:ml-20 mx-auto">
                    <div id="t" className="mt-10 py-4 border-t border-blueGray-200 text-center">
                        <h1 className="text-2xl font-bold text-left mb-4">Blog Info</h1>
                        <div>
                            {err && <ErrorAlert msg={err} setErr={changeErrAlert} />}
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
                                    value={title}
                                    onChange={(event) => { setTitle(event.target.value) }}
                                />
                            </div>

                            <div className="flex flex-col items-start w-full">

                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Blog Description :</h3>
                                <div className="mb-6 w-full">
                                    <textarea className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        rows={6}
                                        placeholder="Blog Description..."
                                        value={desc}
                                        onChange={(event) => { setDesc(event.target.value) }}>
                                    </textarea>
                                </div>
                            </div>
                            <div className="flex flex-col items-start w-full mb-6">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Categories :</h3>
                           
                            <select className="bg-gray-50 border border-gray-300 text-black rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5"
                                onChange={(event) => { setCategory(event.target.value) }}>
                                 <option defaultValue={true}>{category}</option>
                                  
                                
                                <option value='Food'>Food</option>
                                <option value='Travel'>Travel</option>
                                <option value='Technology'>Technology</option>
                                <option value='Business'>Business</option>
                            </select>


                    
                           


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

                            <Link to="t" spy={true} offset={50} duration={200} onClick={() => { updateBlog() }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button"
                            >
                                <i className="fa-solid fa-pen mr-2"></i>
                                Update Blog
                            </Link>
                        </div >
                    </div >
                </div >
            </div >


        </div>
    );
}

export default EditBlog;
