import { useEffect, useState } from "react"
import { collection, getDocs, updateDoc, doc, deleteDoc, query, where } from '@firebase/firestore';
import { db, storage, auth } from '../firebase-config';
import { deleteUser, signOut } from 'firebase/auth';

import {
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import Loading from "./Loading";
import { updateEmail, updatePassword } from "firebase/auth";
import { Link } from "react-scroll";


const EditUserInfo = ({ user }) => {
   


    const [imageUpload, setImageUpload] = useState(null);
    const [image, setImage] = useState('');



    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profession, setProfession] = useState('')
    const [education, setEducation] = useState('')
    const [bio, setBio] = useState('')
    const [country, setCountry] = useState('');

    const [psw, setPsw] = useState('');
    const [confPsw, setConfPsw] = useState('');
    //user Info
    const [errProfile, setErrProfile] = useState('');
    const [sucProfile, setSucProfile] = useState('');
    const [loadProfile, setLoadProfile] = useState(false);
    //email
    const [errEmail, setErrEmail] = useState('');
    const [sucEmail, setSucEmail] = useState('');
    const [loadEmail, setLoadEmail] = useState(false);
    //psw
    const [errPsw, setErrPsw] = useState('');
    const [sucPsw, setSucPsw] = useState('');
    const [loadPsw, setLoadPsw] = useState(false);
    //delete
    const [errDel, setErrDel] = useState('');
    const [sucDel, setSucDel] = useState('');
    const [loadDel, setLoadDel] = useState(false);
    const [msgConfirmation, setMsgConfirmation] = useState(false);

    const [countries, setCountries] = useState([])

    const changeErrAlert = () => {
        setErrProfile('')
        setErrEmail('')
        setErrPsw('')
        setErrDel('')
    }
    const changeSucAlert = () => {
        setSucProfile('')
        setSucEmail('')
        setSucPsw('')
        setSucDel('')
    }

    const handleChangeImage = (e) => {
        e.preventDefault();
        setImage(URL.createObjectURL(e.target.files[0]))
        console.log(image);
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

    const update_Email =async () => {
        setErrEmail('');
        setSucEmail('');
        setLoadEmail(true);
        if (email === "") {
            setErrEmail('Please Fill in your email !!');
            setLoadEmail(false);
            return;
        }
        const userDoc = doc(db, "users", id);
        const newFields = { email: email}
        await updateDoc(userDoc, newFields)
       

        const user = auth.currentUser;
        console.log(user);
        //reauthenticateWithCredential(auth.currentUser,auth)
        updateEmail(user, email).then(() => {
            // Profile updated!
            setSucEmail('Email updated successfully');
            setErrEmail('');
            setLoadEmail(false);
            window.location.replace('/Profile')
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
            setSucEmail('');
            setLoadEmail(false);
            console.log(error);
            setErrEmail('Error');

        });
    }

    const update_psw = async () => {
        setErrPsw('');
        setSucPsw('');
        setLoadPsw(true);
        if (psw === "" || confPsw === "") {
            setSucPsw('');
            setErrPsw('Please Fill in the password !!');
            setLoadPsw(false);
            return;
        }

        if (psw !== confPsw) {
            setSucPsw('');
            setLoadPsw(false);
            setErrPsw("password and password Confirmation don`t match !!");
            return;
        }

        
        const user = auth.currentUser;
        console.log(user);
        //reauthenticateWithCredential(auth.currentUser,auth)
        updatePassword(user, psw).then(() => {
            // Profile updated!
            setSucPsw('Password updated successfully');
            setErrPsw('');
            setLoadPsw(false);
            window.location.replace('/Profile')
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
            setSucPsw('');
            setLoadPsw(false);
            console.log(error);
            setErrPsw('error');

        });
    }

    const updatePersonalInfo =async () => {
        setErrProfile('')
        let coverUrl = '';
        setLoadProfile(true);
        console.log(firstName+'/'+ lastName+'/'+ country+'/'+ profession+'/'+ education+'/'+bio);
        if (firstName === '' || lastName === '' || country === '' || bio === '' || profession === '' || education === '') {
            setErrProfile('Please Fill in All Your Info !!');
            setLoadProfile(false);
            return;
        }
        if (imageUpload !== null) {
            if (imageUpload.size > 2097152) {
                setErrProfile('Please choose Image With size Less then 2MB !!');
                setSucProfile('');
                setLoadProfile(false);
                return;
            }
            //alert('image')
            console.log(imageUpload);
            const imageRef = ref(storage, `images/usersCover/${user.id}`);
            await uploadBytes(imageRef, imageUpload).then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
                .then(downloadURL => {
                    coverUrl = downloadURL;
                    console.log('Download URL', downloadURL)
                }).catch(() => {
                    setErrProfile('Error while uploading image');
                    setSucProfile('');
                    setLoadProfile(false);
                    return;
                });
        }
        let newFields;
        if (coverUrl !== '') {
            newFields = { firstName: firstName, lastName: lastName, profession: profession, education: education, coverUrl: coverUrl, country: country, bio: bio };
        }
        else {
            newFields = { firstName: firstName, lastName: lastName, country: country, profession: profession, education: education, bio: bio };
        }

        const userDoc = doc(db, "users", user.id);

        await updateDoc(userDoc, newFields)
        setSucProfile('Info updated successfully');
        setErrProfile('');
        setLoadProfile(false);
        window.location.replace('/Profile')
    };

    const delete_account = async () => {
        setErrDel('')
        setSucDel('');
        setLoadDel(true);
        //delete user Info from fireStore
       
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);

        ////////////////delete user Blogs///////////////////////
        const blogsCollectionRef = collection(db, "blogs");
        const q = query(blogsCollectionRef, where("user.email", "==", email));
        const data = await getDocs(q);
        const userBlogs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        for (let i = 0; i < userBlogs.length; i++) {
            const elementId = userBlogs[i].id;
            console.log(elementId);
            const blogDoc = doc(db, "blogs", elementId);
            await deleteDoc(blogDoc);
        }

        ///////////////delete user Account from fireBase Authentication/////////////
        const user = auth.currentUser;
        await deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            console.log(error);
            setErrDel('error ');
            setSucDel('');
            setLoadDel(false);
            return;
        });

        await signOut(auth).then(() => {
            sessionStorage.setItem('email', "");
        }).catch((error) => {
            console.log(error);
            setErrDel('error ');
            setSucDel('');
            setLoadDel(false);
            return;
        });


        setErrDel('');
        setLoadDel(false);
        setSucDel('Account Deleted successfully');
        
        window.location.replace('/')

    }

    useEffect(() => {
       
        setId(user.id)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setBio(user.bio)
        setCountry(user.country)
        setEducation(user.education)
        setProfession(user.profession)
        setImage(user.coverUrl)
        get_Countries();
    }, [])

    return (
        <div className="mt-24">
            <h1 className="text-5xl font-bold text-center">Edit Profile</h1>
            <div className="md:w-8/12 lg:ml-20 mx-auto">
                <div id="t" className="mt-10 py-4 border-t border-blueGray-200 text-center">
                    <h1 className="text-2xl font-bold text-left mb-4">Personnel Info</h1>
                    <div>
                        {errProfile && <ErrorAlert msg={errProfile} setErr={changeErrAlert} />}
                        {sucProfile && <SuccessAlert msg={sucProfile} setSuc={changeSucAlert} />}
                        {loadProfile && <Loading />}
                    </div>
                    <div className="flex items-center flex-col">
                        <div className="mb-6 flex gap-2 w-full">
                            <div className="flex flex-col items-start w-full
                            ">
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">First Name :</h3>
                                <input
                                    type="text"
                                    className="form-control  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(event) => { setFirstName(event.target.value) }}
                                />
                            </div>
                            <div className="flex flex-col items-start w-full
                            ">
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Last Name :</h3>
                                <input
                                    type="text"
                                    className="form-control  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(event) => { setLastName(event.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start w-full
                            ">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Country :</h3>
                            <div className="mb-6 w-full">
                                <select id="countries" className="bg-gray-50 border px-4 border-gray-300 text-black rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(event) => { setCountry(event.target.value) }}>
                                    <option defaultValue>{country}</option>
                                    {countries.map((count) => {
                                        return <option key={count.name} value={count.name}>{count.name}
                                        </option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="mb-6 flex flex-col items-start w-full">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Profession :</h3>
                            <input
                                type="text"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Profession"
                                value={profession}
                                onChange={(event) => { setProfession(event.target.value) }}
                            />
                        </div>
                        <div className="mb-6 flex flex-col items-start w-full">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Education :</h3>
                            <select className="bg-gray-50 border border-gray-300 text-black rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5"
                                onChange={(event) => { setEducation(event.target.value) }}>
                                {education ? <option selected={true}>{education}</option> :
                                    <option defaultValue>Choose your Education</option>}
                                
                                <option value='Master Degree'>Master Degree</option>
                                <option value='License Degree'>License Degree</option>
                                <option value='Bachelor Degree'>Bachelor</option>
                            </select>


                        </div>
                        <div className="flex flex-col items-start w-full
                            ">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">your Bio :</h3>
                            <div className="mb-6 w-full">
                                <textarea className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    rows={6}
                                    placeholder="About ...."
                                    value={bio}
                                    onChange={(event) => { setBio(event.target.value) }}>
                                </textarea>
                            </div>
                        </div>
                        {/* <img src={image} className="img shadow-xl align-middle 
                                                w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-none" alt="img" /> */}
                        <div className="flex flex-col items-start w-full
                            ">
                            {/* <label htmlFor="">Profile Image :</label>
                            <div className="mb-6 w-full">
                                <input type='file' accept="image/*" className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                                    onChange={(event) => { setImageUpload(event.target.files[0]); handleChangeImage(event) }} />

                            </div> */}
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Profile Image :</h3>
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
                        </div>
                        <Link to="t" spy={true} offset={50} duration={200} onClick={() => { updatePersonalInfo() }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button"
                        >
                            <i className="fa-solid fa-pen mr-2"></i>
                            Edit Info
                        </Link>
                    </div>

                    <div className="mt-10 py-4 border-t border-blueGray-200 text-center">
                        <h1 className="text-2xl font-bold text-left mb-4">Change Email Address</h1>
                        <div>
                            {errEmail && <ErrorAlert msg={errEmail} setErr={changeErrAlert} />}
                            {sucEmail && <SuccessAlert msg={sucEmail} setSuc={changeSucAlert} />}
                            {loadEmail && <Loading />}
                        </div>
                        <div className="mb-6 flex flex-col items-start w-full">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Email address :</h3>
                            <input
                                type="text"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <button onClick={() => { update_Email() }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                            <i className="fa-solid fa-pen mr-2"></i>
                            Edit Email
                        </button>
                    </div>
                    <div className="mt-10 py-4 border-t border-blueGray-200 text-center">
                        <h1 className="text-2xl font-bold text-left mb-4">Change Password</h1>
                        <div>
                            {errPsw && <ErrorAlert msg={errPsw} setErr={changeErrAlert} />}
                            {sucPsw && <SuccessAlert msg={sucPsw} setSuc={changeSucAlert} />}
                            {loadPsw && <Loading />}
                        </div>
                        <div className="mb-6 flex flex-col items-start w-full">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Password :</h3>
                            <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="New Password"
                                onChange={(event) => { setPsw(event.target.value) }}
                            />
                        </div>
                        <div className="mb-6 flex flex-col items-start w-full">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Confirm Password :</h3>
                            <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                placeholder="Confirm Password"
                                onChange={(event) => { setConfPsw(event.target.value) }}
                            />
                        </div>
                        <button onClick={() => { update_psw() }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                            <i className="fa-solid fa-pen mr-2"></i>
                            Edit Password
                        </button>
                    </div>
                    <div className="mt-10 py-4 border-t border-blueGray-200 text-center bg-red-400 rounded-lg p-4">
                        <h1 className="text-2xl font-bold text-left mb-4">Delete Account</h1>
                        <div>
                            {errDel && <ErrorAlert msg={errDel} setErr={changeErrAlert} />}
                            {sucDel && <SuccessAlert msg={sucDel} setSuc={changeSucAlert} />}
                            {loadDel && <Loading />}
                        </div>
                        {msgConfirmation && <div className="text-center pt-4 lg:px-4 mb-4">
                            <div className="p-2 bg-red-500 items-center text-indigo-100 leading-none rounded-full inline-flex w-75" role="alert">
                                <span className="flex rounded-full bg-red-700 uppercase px-2 py-1 text-xs font-bold mr-3">Confirmation</span>
                                <span className="font-semibold mr-2 text-left flex-auto">
                                    Are you sure !!
                                </span>
                                <button onClick={() => { delete_account() }} className="bg-red-700 active:bg-red-800 uppercase text-white font-bold hover:shadow-md shadow text-sm px-2 py-2 rounded-full outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                    yes
                                </button>
                                <button onClick={() => { setMsgConfirmation(false) }} className="bg-green-700 active:bg-green-800 uppercase text-white font-bold hover:shadow-md shadow text-sm px-2 py-2 rounded-full outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                    No
                                </button>
                            </div>
                        </div>
                        }
                        <button onClick={() => { setMsgConfirmation(true) }} className="bg-red-500 active:bg-red-700 uppercase text-white font-bold hover:shadow-md shadow text-2xl px-4 py-4 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 w-full" type="button">
                            <i className="fa-solid fa-trash mr-2"></i>
                            Delete Account
                        </button>
                    </div>



                </div>
            </div>
        </div>
    );
}

export default EditUserInfo;