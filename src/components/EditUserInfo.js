import { useEffect, useState } from "react"
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from '@firebase/firestore';
import { db, storage } from '../firebase-config';
import {
    ref,
    uploadBytes,
} from "firebase/storage";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import Loading from "./Loading";

const EditUserInfo = ({ user }) => {
    const usersCollectionRef = collection(db, "users");


    const [imageUpload, setImageUpload] = useState(null);
    //

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')
    const [country, setCountry] = useState('')
    const [psw, setPsw] = useState('');
    const [newPsw, setNewPsw] = useState('');
    const [err, setErr] = useState('');
    const [suc, setSuc] = useState('');
    const [countries, setCountries] = useState([])
    const [load, setLoad] = useState(false);
    const changeErrAlert = () => {
        setErr('')
    }
    const changeSucAlert = () => {
        setSuc('')
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

    const updatePersonalInfo = async () => {
        console.log(imageUpload.size);
        setErr('')
        setLoad(true);
        if (firstName === '' || lastName === '' || country === '' || bio === '') {
            setErr('Please Fill All Your Info !!');
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
            const imageRef = ref(storage, `images/${user.id}`);
            await uploadBytes(imageRef, imageUpload).then(() => {
                //alert('image uploaded')
            }).catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        setErr('User doesnt have permission to access the object');
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

        const userDoc = doc(db, "users", user.id);
        const newFields = { firstName: firstName, lastName: lastName, country: country, bio: bio };
        await updateDoc(userDoc, newFields)
        setSuc('Info updated successfully');
        setErr('');
        setLoad(false);
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
        <div>
            <h1 className="text-5xl font-bold text-center">Edit Profile</h1>
            <div className="md:w-8/12 lg:ml-20 mx-auto">
                <div className="mt-10 py-4 border-t border-blueGray-200 text-center">
                    <h1 className="text-2xl font-bold text-left mb-4">Personnel Info</h1>
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
                                value={firstName}
                                onChange={(event) => { setFirstName(event.target.value) }}
                            />
                            <input
                                type="text"
                                className="form-control w-[50%] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(event) => { setLastName(event.target.value) }}
                            />
                        </div>
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
                        <div className="mb-6 w-full">
                            <textarea className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                rows={6}
                                placeholder="About ...."
                                value={bio}
                                onChange={(event) => { setBio(event.target.value) }}>
                            </textarea>
                        </div>
                        <div className="mb-6 w-full">
                            <input type='file' accept="image/*" className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                                onChange={(event) => { setImageUpload(event.target.files[0]) }} />

                        </div>
                        <button onClick={() => { updatePersonalInfo() }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button"
                        >
                            <i className="fa-solid fa-pen mr-2"></i>
                            Edit Info
                        </button>
                    </div>

                    <div className="mt-10 py-4 border-t border-blueGray-200 text-center">
                        <h1 className="text-2xl font-bold text-left mb-4">Change Email Address</h1>
                        <div className="mb-6 w-full">
                            <input
                                type="text"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <button onClick={() => { }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                            <i className="fa-solid fa-pen mr-2"></i>
                            Edit Email
                        </button>
                    </div>
                    <div className="mt-10 py-4 border-t border-blueGray-200 text-center">
                        <h1 className="text-2xl font-bold text-left mb-4">Change Password</h1>
                        <div className="mb-6 w-full">
                            <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Current Password"
                                onChange={(event) => { setPsw(event.target.value) }}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                placeholder="New Password"
                                onChange={(event) => { setNewPsw(event.target.value) }}
                            />
                        </div>
                        <button onClick={() => { }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
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