import { logDOM } from "@testing-library/react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where , addDoc,updateDoc,doc,deleteDoc} from '@firebase/firestore'
import { BsPencilSquare, BsChat } from 'react-icons/bs';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { db } from "../firebase-config";

const Post = ({ blogs, user }) => {

   
    
    useEffect(() => {
        console.log(blogs);
       
        //console.log(blogLikes);
    }, [blogs]);
    return (
        <section className='pt-12 pb-0 max-w-[1320px] mx-auto '>
            <div className='container'>
                <div className='flex justify-center mb-12'>
                    <div className='text-center'>
                        <h2 className='font-bold text-[40px]'>Posts</h2>
                    </div>
                </div>

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
                                        {blog.category.map((cat) => (
                                            <span className="font-bold text-[#222] dark:text-white" href="/" key={cat}>{cat},&nbsp;</span>
                                        ))}
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
                                    {blog.desc.substring(0,100)+"..."}.
                                </p>
                                <div className="flex">
                                    <a href={`/Author/${blog.user.id}`} className="flex items-center">
                                        <div className="flex-grow-0 flex-shrink-0 basis-11 mr-[10px]">
                                            <img className="img max-w-full rounded-full" src={`${blog.user.coverUrl}`} alt="Img" />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <strong>{blog.user.firstName} {blog.user.lastName}</strong>
                                            <span>{blog.user.email}</span>
                                        </div>
                                    </a>
                                    {user && blog.user.id === user.id && <div className="flex">
                                        <a href={`updateBlog/${blog.id}`} className="text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 " title="Edit">
                                            <BsPencilSquare size={30} />
                                            <span className="sr-only">Edit</span>
                                        </a>
                                        <a href="/" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 " title="Delete">
                                            <FaTrashAlt size={30} />
                                            <span className="sr-only">Delete</span>
                                        </a>
                                    </div>}
                                </div>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Post;