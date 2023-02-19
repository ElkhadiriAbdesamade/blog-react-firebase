

import { collection, getDocs, query, where } from '@firebase/firestore'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { BsChat } from 'react-icons/bs';
import { db } from '../../firebase-config';
import { Alert } from 'flowbite-react';
import LoadingPage from '../LoadingPage';


const SearchBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const { elm } = useParams()
    useEffect(() => {

        const blogsCollectionRef = collection(db, "blogs");

        if (elm === 'Food' || elm === 'Travel' || elm === 'Technology' || elm === 'Business') {
            const getBlogsByCat = async () => {
                const q = query(blogsCollectionRef, where("category", "==", elm));
                const data = await getDocs(q);
                setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                console.log(elm);
            };
            getBlogsByCat();
            return;
        }else{
            const getBlogs = async () => {
                const q = query(blogsCollectionRef, where("title", ">=", elm),where("title", "<=", elm + "\uf8ff"));
                const data = await getDocs(q);
                setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                console.log(elm);
            };
            getBlogs();
        }
       
       
    }, [])

    return (
        <section className='pt-12 pb-0 max-w-[1320px] mx-auto '>
            {!blogs ? <LoadingPage/>:<div className='container'>
                <div className='flex justify-center mb-12'>
                    <div className='text-center'>
                        <h2 className='font-bold text-[40px]'>Search Result</h2>
                    </div>
                </div>

                {blogs.length === 0 && <div className="mb-52 py-10 px-10 mx-auto" >
                    <Alert
                        color="info"
                        withBorderAccent={true}
                    >
                        <span>
                            <span className="font-medium">
                                Info alert!
                            </span>
                            {' '}<h1 className="text-3xl">No Result Found.</h1>
                        </span>
                    </Alert>
                </div>}

                <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 mb-52" >
                    {blogs.map((blog) => (
                        <div className="grid  p-1 rounded-xl shadow-lg pb-4 px-2" key={blog.id}>
                            <div className="mb-4">
                                <a href={`/blogDetails/${blog.id}`}>
                                    <img src={`${blog.blogImg}`} alt="Img" className="rounded-xl shadow-xl md:h-52 w-full dark:shadow-xl dark:shadow-slate-500 hover:scale-105 ease-in-out duration-700" />
                                </a>
                            </div>
                            <div className="self-center text-[14px]">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="mb-4 text-left " >
                                    <span className="font-bold text-[#222] dark:text-white">{blog.category}&nbsp;</span>
                                        &nbsp;<span className="text-[#999]">—</span>&nbsp;
                                        <span className="text-[#999] dark:text-white">{blog.date_creation}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex gap-3">


                                            <a href={`/blogDetails/${blog.id}`}>
                                                <BsChat size={30} title="comments" className="hover:text-slate-400 cursor-pointer" />
                                            </a>
                                        </div>

                                    </div>
                                </div>

                                <h2 className='font-bold text-[18px] text-left leading-[1.2] mb-2'><a href={`/blogDetails/${blog.id}`}>{blog.title}.</a></h2>
                                <p className="text-left text-[#999] mb-4 dark:text-white">
                                    {blog.desc.substring(0, 100) + "..."}.
                                </p>
                                <div className="flex justify-between">
                                    <a href={`/Author/${blog.user.id}`} className="flex items-center">
                                        <div className="flex-grow-0 flex-shrink-0 basis-11 mr-[10px]">
                                            <img className="h-11 max-w-full rounded-full" src={`${blog.user.coverUrl}`} alt="Img" />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <strong>{blog.user.firstName} {blog.user.lastName}</strong>
                                            <span>{blog.user.email}</span>
                                        </div>
                                    </a>
                                   
                                </div>

                            </div>
                        </div>
                    ))}

                </div>

            </div>}
        </section>
    );
}

export default SearchBlog;