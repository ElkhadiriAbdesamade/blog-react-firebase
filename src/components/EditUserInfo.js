import { useEffect, useState } from "react"
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from '@firebase/firestore';
import { db, storage, auth } from '../firebase-config';
import {
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import Loading from "./Loading";
import { updateEmail, updatePassword } from "firebase/auth";

const EditUserInfo = ({ user }) => {
    const usersCollectionRef = collection(db, "users");


    const [imageUpload, setImageUpload] = useState(null);
    const [image, setImage] = useState('');


    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
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


    const [countries, setCountries] = useState([])
    
    const changeErrAlert = () => {
        setErrProfile('')
        setErrEmail('')
        setErrPsw('')
    }
    const changeSucAlert = () => {
        setSucProfile('')
        setSucEmail('')
        setSucPsw('')
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

    const update_Email = () => {
        setErrEmail('');
        setSucEmail('');
        setLoadEmail(true);
        if (email === "") {
            setErrEmail('Please Fill in your email !!');
            setLoadEmail(false);
            return;
        }
        const user = auth.currentUser;
        console.log(user);
        //reauthenticateWithCredential(auth.currentUser,auth)
        updateEmail(user, email).then(() => {
            // Profile updated!
            setSucEmail('Email updated!');
            setErrEmail('');
            setLoadEmail(false);
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

    const update_psw = () => {
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
            setSucPsw('Password updated!');
            setErrPsw('');
            setLoadPsw(false);
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

    const updatePersonalInfo = async () => {
        setErrProfile('')
        let coverUrl;
        setLoadProfile(true);
        if (firstName === '' || lastName === '' || country === '' || bio === '') {
            setErrProfile('Please Fill All Your Info !!');
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
                coverUrl=downloadURL;
                console.log('Download URL', downloadURL)
              }).catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        setErrProfile('User don`t have permission to access the object');
                        setSucProfile('');
                        setLoadProfile(false);
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        setErrProfile('User canceled the upload');
                        setSucProfile('');
                        setLoadProfile(false);
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        setErrProfile('Unknown error occurred, inspect error.serverResponse');
                        setSucProfile('');
                        setLoadProfile(false);
                        break;
                }
            });
        }

        const userDoc = doc(db, "users", user.id);
        const newFields = { firstName: firstName, lastName: lastName,coverUrl:coverUrl, country: country, bio: bio };
        await updateDoc(userDoc, newFields)
        setSucProfile('Info updated successfully');
        setErrProfile('');
        setLoadProfile(false);
        window.location.replace('/myProfile')
    };

    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setBio(user.bio)
        setCountry(user.country)
        get_Countries();
    }, [])

    return (
        <div className="mt-8">
            <h1 className="text-5xl font-bold text-center">Edit Profile</h1>
            <div className="md:w-8/12 lg:ml-20 mx-auto">
                <div className="mt-10 py-4 border-t border-blueGray-200 text-center">
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
                                <label htmlFor="">First Name :</label>
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
                                <label htmlFor="">Last Name :</label>
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
                            <label htmlFor="">Country :</label>
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
                        </div>
                        <div className="flex flex-col items-start w-full
                            ">
                            <label htmlFor="">your Bio :</label>
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
                            <label htmlFor="">Profile Image :</label>
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
                        <button onClick={() => { updatePersonalInfo() }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button"
                        >
                            <i className="fa-solid fa-pen mr-2"></i>
                            Edit Info
                        </button>
                    </div>

                    <div className="mt-10 py-4 border-t border-blueGray-200 text-center">
                        <h1 className="text-2xl font-bold text-left mb-4">Change Email Address</h1>
                        <div>
                            {errEmail && <ErrorAlert msg={errEmail} setErr={changeErrAlert} />}
                            {sucEmail && <SuccessAlert msg={sucEmail} setSuc={changeSucAlert} />}
                            {loadEmail && <Loading />}
                        </div>
                        <div className="mb-6 w-full">
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
                        <div className="mb-6 w-full">
                            <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="New Password"
                                onChange={(event) => { setPsw(event.target.value) }}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                placeholder="Confirme Password"
                                onChange={(event) => { setConfPsw(event.target.value) }}
                            />
                        </div>
                        <button onClick={() => { update_psw()}} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                            <i className="fa-solid fa-pen mr-2"></i>
                            Edit Password
                        </button>
                    </div>




                </div>
            </div>
        </div>
    );
}

export default EditUserInfo;