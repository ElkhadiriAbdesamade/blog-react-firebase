import { logDOM } from "@testing-library/react";
import { useEffect } from "react";

const Post = ({ blogs,user }) => {

    useEffect(() => {
        console.log(blogs);

        // setRole(localStorage.getItem('role'));

    }, []);
    return (
        <section className='pt-12 pb-0 max-w-[1320px] mx-auto '>
            <div className='container'>
                <div className='flex justify-center mb-12'>
                    <div className='text-center'>
                        <h2 className='font-bold text-[40px]'>Posts</h2>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-2 md:grid-rows-3 mb-52" >
                    {blogs.map((blog) => (
                        <div className="grid  p-1 rounded-xl shadow-lg pb-4 px-2" key={blog.id}>
                            <div className="mb-4">
                                <a href={`/blogDetails/${blog.id}`}>
                                    <img src={`${blog.blogImg}`} alt="Img" className="rounded-xl shadow-xl dark:shadow-xl dark:shadow-slate-500 hover:scale-110 ease-in-out duration-700" />
                                </a>
                            </div>
                            <div className="self-center text-[14px]">
                                <div className="mb-4 text-left" >
                                    {blog.category.map((cat) => (
                                        <a className="font-bold text-[#222] dark:text-white" href="/" key={cat}>{cat},&nbsp;</a>
                                    ))}

                                    {/* <a className="font-bold text-[#222] dark:text-white" href="/">Travel</a> */}

                                    &nbsp;<span className="text-[#999]">—</span>&nbsp;
                                    <span className="text-[#999] dark:text-white">{blog.date_creation}</span>
                                </div>
                                <h2 className='font-bold text-[18px] text-left leading-[1.2] mb-2'><a href="/">{blog.title}.</a></h2>
                                <p className="text-left text-[#999] mb-4 dark:text-white">
                                    {blog.desc}.
                                </p>
                                <div className="flex">
                                    <a href="/" className="flex items-center">
                                        <div className="flex-grow-0 flex-shrink-0 basis-11 mr-[10px]">
                                            <img className="max-w-full rounded-full" src={`${blog.user.coverUrl}`} alt="Img" />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <strong>{blog.user.firstName} {blog.user.lastName}</strong>
                                            <span>{blog.user.email}</span>
                                        </div>
                                    </a>
                                    {user && blog.user.id===user.id && <div className="flex">
                                        <a href={`updateBlog/${blog.id}`} className="text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 ">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Icon description</span>
                                        </a>
                                        <a  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 ">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Icon description</span>
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