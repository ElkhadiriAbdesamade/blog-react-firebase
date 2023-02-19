import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from '@firebase/firestore'
import { db } from "../../firebase-config";
import Disqus from "disqus-react"
import LoadingPage from "../LoadingPage";
const BlogDetails = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState('');
    
    const disqusShortname = "http-localhost-3000-4eq1x2maft";
    let disqusConfig;
 
    useEffect(() => {
        console.log(id);

        const blogsCollectionRef = collection(db, "blogs");
        const getBlog = async () => {

            const q = query(blogsCollectionRef, where('__name__', "==", id));
            const data = await getDocs(q);
            setBlog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]);
            

            if (data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]===undefined) {
                window.location.replace('/');
            }
            disqusConfig = {
                url: "http://localhost:3000",
                identifier: id,
                title: data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].title
            }

        };
        getBlog();
       
    }, []);
    return (
        <div className="">
            {blog ?
                <main className="pt-8 pb-16 lg:pt-16 lg:pb-24">
                    <div className="flex flex-col gap-[100px] justify-between px-4 mx-auto max-w-screen-xl ">
                        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                            <header className="mb-4 lg:mb-6 not-format">
                                <address className="flex items-center mb-6 not-italic">
                                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                        <img className="mr-4 w-32 h-32 rounded-full" src={`${blog.user.coverUrl}`} />
                                        <div>
                                            <a href="#" rel="author" className="text-2xl font-bold text-gray-900 dark:text-white">{blog.user.firstName} {blog.user.lastName}</a>
                                            <p className="text-base font-light">{blog.user.profession}</p>

                                        </div>
                                    </div>
                                </address>
                                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog.title}.</h1>

                                <div className="mb-4 text-left" >
                                    {blog.category.map((cat) => (
                                        <a className="font-bold text-[#222] dark:text-white" href="/" key={cat}>{cat},&nbsp;</a>
                                    ))}
                                    &nbsp;<span className="text-[#999]">—</span>&nbsp;
                                    <span className="text-[#999] dark:text-white">{blog.date_creation}</span>
                                </div>
                            </header>
                            <figure>
                                <img src={`${blog.blogImg}`} alt="" className="rounded-xl mt-4 mb-6" />
                            </figure>
                            <p className="lead">
                                {blog.desc}.
                            </p>
                           
                        </article>
                        <div id="comments" className="">
                            {blog && <Disqus.DiscussionEmbed
                                shortname={disqusShortname}
                                config={disqusConfig}
                            />}
                        </div>

                    </div>
                </main> :
                <LoadingPage/>
            }

        </div>
    );
}

export default BlogDetails;