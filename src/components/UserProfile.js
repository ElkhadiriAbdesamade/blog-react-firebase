import { collection, getDocs, query, where,getCountFromServer } from '@firebase/firestore'
import { useEffect, useState } from 'react';
import EditUserInfo from './EditUserInfo';

import { db, storage } from '../firebase-config';
import {
    ref,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { Button } from 'react-scroll';
import AddBlog from './blog/AddBlog';
import { useParams } from 'react-router-dom';
import LoadingPage from './LodingPage';
import MyBlogs from './blog/MyBlogs';

const UserProfile = ({ darkMode, user }) => {

    //const imagesListRef = ref(storage, "images/");
    const [imageUrl, setImageUrl] = useState('');
    const [author, setAuthor] = useState();
    const [edit, setEdit] = useState(false);
    const [addBlog, setAddBlog] = useState(false);
    const [showBlogs, setShowBlogs] = useState(false);


    const [blogCount, setBlogCount] = useState();
    const { id } = useParams()


    useEffect(() => {
        const usersCollectionRef = collection(db, "users");
        const blogsCollectionRef = collection(db, "blogs");
        if (user) {
            setImageUrl(user.coverUrl)
            console.log(user);
            //get count of blogs by user email
            const getCount = async () => {
            const q2 = query(blogsCollectionRef, where("user.email", "==", user.email));
            const data2 = await getCountFromServer(q2);
            setBlogCount(data2.data().count);
            }
            getCount();
        }

        if (id) {
           
            const getUser = async () => {

                const q = query(usersCollectionRef, where("__name__", "==", id));
                const data = await getDocs(q);
                var u = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
                setAuthor(u);
                setImageUrl(u.coverUrl)

                //get count of blogs by user email
                const q2 = query(blogsCollectionRef, where("user.email", "==", u.email));
                const data2 = await getCountFromServer(q2);
                setBlogCount(data2.data().count);

            }
            getUser();


        }
        // let email = sessionStorage.getItem("email")

        // if (email !== "") {
        //     const usersCollectionRef = collection(db, "users");
        //     const getUser = async () => {

        //         const q = query(usersCollectionRef, where("email", "==", email));
        //         const data = await getDocs(q);
        //         var u = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
        //         setUser(u);
        //         setImageUrl(u.coverUrl)

        //         // listAll(imagesListRef).then((response) => {
        //         //     response.items.forEach((item) => {
        //         //         if (item.name === u.id) {
        //         //             getDownloadURL(item).then((url) => {
        //         //                 setImageUrl(url);
        //         //             });
        //         //         }
        //         //     });

        //         // });
        //     };
        //     getUser();
        // }

    }, [user]);

    return (
        <div>
           
            <div>
             <section className="relative block h-500-px">
                {!darkMode ? <div className="absolute sectionCover dark:sectionCover_dark top-0 w-full h-full bg-center bg-cover">
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div> :
                    <div className="absolute sectionCover_dark top-0 w-full h-full bg-center bg-cover">
                        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                    </div>}
                <div className="s top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="dark:text-[#474E68] text-[#fff] fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>

            <section className="relative py-16   dark:bg-[#474E68]">
                <div className="container mx-auto px-4 ">
                    <div className="bg-slate-50 relative flex flex-col min-w-0 break-words dark:bg-[#6B728E] w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap items-center gap-4 justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    {<div className="relative scale-[180%] md:scale-[130%] lg:scale-150">
                                        {!imageUrl ? <img alt="..." src={user && `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}"&backgroundColor=F79918`}
                                            className="shadow-xl rounded-full  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16  max-w-150-px" />
                                            :
                                            <img alt="..." src={imageUrl && `${imageUrl}`}
                                                className="rounded-full sectionCover bg-center bg-cover shadow-2xl align-middle 
                                                w-[100px] h-[100px] md:w-[200px] md:h-[200px] border-none" />
                                        }
                                    </div>}

                                    {/* <div className="img_holder">
                                       
                                    </div> */}
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 lg:mt-0 md:mt-8 mt-4 text-center">

                                        {user &&
                                            <div>{!addBlog ? <button onClick={() => { setAddBlog(!addBlog); setEdit(false);setShowBlogs(false) }} className="bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                <i className="fa-solid fa-add mr-2"></i>
                                                Add Blog
                                            </button>
                                                :
                                                <button onClick={() => { setAddBlog(false) }} className="bg-red-400 active:bg-red-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded-full outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all ml-4 duration-150" type="button">
                                                    <i className="fa-solid fa-close scale-150"></i>
                                                </button>
                                            }
                                                {!edit ? <button onClick={() => { setEdit(!edit); setAddBlog(false);setShowBlogs(false) }} className="bg-[#F79918] active:bg-[#c47a12] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 ml-4 mb-1 ease-linear transition-all duration-150" type="button">
                                                    <i className="fa-solid fa-pen mr-2"></i>
                                                    Edit Profile
                                                </button>
                                                    :
                                                    <button onClick={() => { setEdit(false) }} className="bg-red-400 active:bg-red-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded-full outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all ml-4 duration-150" type="button">
                                                        <i className="fa-solid fa-close scale-150"></i>
                                                    </button>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center lg:py-4 lg:pt-4">
                                        {user && <div  onClick={() => { setShowBlogs(!showBlogs); setEdit(false);setAddBlog(false) }} className="mr-4 p-3 text-center cursor-pointer shadow-lg rounded-lg">
                                            <span className="text-2xl font-bold block uppercase tracking-wide text-blueGray-600 dark:text-[#fff]">{blogCount}</span><span className="text-2xl text-blueGray-400 dark:text-gray-300">Blogs</span>
                                        </div>}
                                        {author && <div className="mr-4 p-3 text-center  shadow-lg rounded-lg">
                                            <span className="text-2xl font-bold block uppercase tracking-wide text-blueGray-600 dark:text-[#fff]">{blogCount}</span><span className="text-2xl text-blueGray-400 dark:text-gray-300">Blogs</span>
                                        </div>}

                                      
                                    </div>
                                </div>
                            </div>
                            <div className="text-center lg:mt-12">
                                {addBlog && < AddBlog user={user} darkMode={darkMode} />}
                                {edit && < EditUserInfo user={user} />}
                                {showBlogs && < MyBlogs user={user} />}
                                {!edit && !addBlog && !showBlogs &&
                                    <div>
                                        <div>
                                            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2 dark:text-[#fff]">
                                                {author && author.firstName} {author && author.lastName}
                                                {user && user.firstName} {user && user.lastName}
                                            </h3>
                                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase dark:text-[#fff]">
                                                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400 dark:text-gray-300" ></i>
                                                {author && author.country}
                                                {user && user.country}
                                            </div>
                                            <div className="mb-2 text-blueGray-600 mt-10 dark:text-[#fff]">
                                                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400 dark:text-gray-300"></i>
                                                {author && author.profession}
                                                {user && user.profession}
                                            </div>
                                            <div className="mb-2 text-blueGray-600 dark:text-[#fff]">
                                                <i className="fas fa-university mr-2 text-lg text-blueGray-400 dark:text-gray-300"></i>
                                                {author && author.education}
                                                {user && user.education}
                                            </div>
                                        </div>

                                        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                            <div className="flex flex-wrap justify-center">
                                                <div className="w-full lg:w-9/12 px-4">
                                                    About
                                                    {user && user.bio ? <p className="mb-4 text-lg leading-relaxed text-blueGray-700 dark:text-[#fff]">
                                                        {user.bio}
                                                    </p>
                                                        :
                                                        <p>....</p>
                                                    }
                                                    {author && author.bio ? <p className="mb-4 text-lg leading-relaxed text-blueGray-700 dark:text-[#fff]">
                                                        {author.bio}
                                                    </p>
                                                        :
                                                        <p>....</p>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
            
        </div>
    );
}

export default UserProfile;