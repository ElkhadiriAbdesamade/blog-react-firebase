import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from '@firebase/firestore'
import { db } from "../../firebase-config";
import { BsPencilSquare, BsChat } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
const MyBlogs = ({ user }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        console.log(user)
        const blogsCollectionRef = collection(db, "blogs");
        const getBlogs = async () => {
            const q = query(blogsCollectionRef, where("user.email", "==", user.email));
            const data = await getDocs(q);
            setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        };
        getBlogs();
    }, [])
    return (
        <div>
            <div className="mt-20">
                <h1 className="text-5xl font-bold text-center">My Blogs</h1>
                <div className="md:w-8/12 lg:ml-20 mx-auto">
                    <div id="t" className="mt-10 py-4 border-t border-blueGray-200 text-center"></div>

                    <div className="grid  gap-4 lg:grid-cols-2 md:grid-cols-1 mb-52" >
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
                                        {blog.desc.substring(0, 100) + "..."}.
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
            </div>
        </div>
    );
}

export default MyBlogs;