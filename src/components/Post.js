
import { useEffect, useState } from "react";
import { doc, deleteDoc } from '@firebase/firestore'
import { BsPencilSquare, BsChat } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { db } from "../firebase-config";


import { Alert, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi'



const Post = ({ blogs, user }) => {

    const [showModal, setShowModal] = useState(false);
    const [deletedBlogId, setDeletedBlogId] = useState();

    const deleteBlog = async () => {
        const blogDoc = doc(db, "blogs", deletedBlogId);
        await deleteDoc(blogDoc);
        window.location.replace('/')
    }
    useEffect(() => {

    }, [blogs]);
    return (
        <section className='pt-12 pb-0 max-w-[1320px] mx-auto '>
            <div className='container'>
                <div className='flex justify-center mb-12'>
                    <div className='text-center'>
                        <h2 className='font-bold text-[40px]'>Posts</h2>
                    </div>
                </div>

                {blogs.length === 0 && <div className="mb-52 py-10 px-10 mx-auto" >
                    <Alert
                        color="warning"
                        withBorderAccent={true}
                    >
                        <span>
                            <span className="font-medium">
                                Info alert!
                            </span>
                            {' '}<h1 className="text-3xl">There is no Blog at the moment.</h1>
                        </span>
                    </Alert>
                </div>}

                <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 mb-52" >
                    {blogs.map((blog) => (
                        <div className="grid  p-1 rounded-xl shadow-lg pb-4 px-2" key={blog.id}>
                            <div className="mb-4">
                                <a href={`/blogDetails/${blog.id}`}>
                                    <img src={`${blog.blogImg}`} alt="Img" className="rounded-xl shadow-xl md:h-52 w-full dark:shadow-xl dark:shadow-slate-500 hover:scale-105 ease-in-out duration-700 object-cover" />
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
                                <div className="flex justify-between">
                                    <a href={`/Author/${blog.user.id}`} className="flex items-center">
                                        <div className="flex-grow-0 flex-shrink-0 basis-11 mr-[10px]">
                                            {!blog.user.coverUrl ? <img alt="..." src={`https://api.dicebear.com/5.x/initials/svg?seed=${blog.user.firstName}"&backgroundColor=F79918`}
                                                className="h-11 max-w-full rounded-full" />
                                                :
                                                <img className="h-11 max-w-full rounded-full" src={`${blog.user.coverUrl}`} alt="Img" />
                                            }

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
                                        <button onClick={() => { setShowModal(true); setDeletedBlogId(blog.id) }} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 " title="Delete">
                                            <FaTrashAlt size={30} />
                                            <span className="sr-only">Delete</span>
                                        </button>
                                    </div>}
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
           

            </div>
            <div>

                <Modal
                    show={showModal}
                    size="md"
                    popup={true}
                    onClick={() => { setShowModal(false) }}
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className=" mx-auto mb-4 h-14 w-14 text-gray-400 " />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                                Are you sure you want to delete this Blog?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="failure"
                                    onClick={() => { deleteBlog() }}
                                >

                                    Yes, I'm sure
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={() => { setShowModal(false) }}
                                >
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>

        </section>
    );
}

export default Post;