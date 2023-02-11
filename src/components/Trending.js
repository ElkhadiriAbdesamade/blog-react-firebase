
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { collection, getDocs, query,limit } from '@firebase/firestore'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { Alert } from "flowbite-react";

const Trending = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const blogsCollectionRef = collection(db, "blogs");
        const getBlogs = async () => {
            const q = query(blogsCollectionRef, limit(4));
            const data = await getDocs(q);
            setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        };
        getBlogs();
    }, [])

    return (
        <section className='pt-12 pb-0 max-w-[1320px] mx-auto '>
            <div className='container'>
                <div className='flex justify-center mb-12'>
                    <div className='text-center'>
                        <h2 className='font-bold text-[40px]'>Trending</h2>
                    </div>
                </div>
                {blogs.length===0 && <div className=" py-10 px-10 mx-auto" >
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
                <div className='flex'>

                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper rounded-xl mb-10"
                    >
                        {blogs.map((blog) => (
                            <SwiperSlide key={blog.id}>
                                <div className="grid md:grid-flow-col dark:bg-[#50577A] p-8">
                                    <div className="inline-grid md:mr-8 ">
                                        <a href="/">
                                            <img src={`${blog.blogImg}`} style={{height:"400px !important"}} alt="Img" className="w-[400px] rounded-xl shadow-xl dark:shadow-xl dark:shadow-slate-500" />
                                        </a>
                                    </div>
                                    <div className="self-center text-[14px] inline-grid ">
                                        <div className="mb-4 text-left " >
                                            {blog.category.map((cat) => (
                                                <span className="font-bold text-[#222] dark:text-white" key={cat}>{cat},&nbsp;</span>
                                            ))}
                                            &nbsp;<span className="text-[#999]">—</span>&nbsp;
                                            <span className="text-[#999] dark:text-white">{blog.date_creation}</span>
                                        </div>
                                        <h2 className='font-bold text-[40px] text-left leading-[1.2] mb-2'><a href={`/blogDetails/${blog.id}`}>{blog.title}.</a></h2>
                                        <p className="text-left text-[#999] mb-4 dark:text-white">
                                        {blog.desc.substring(0,100)+"..."}.
                                        </p>
                                        <div className="flex">
                                    <a href={`/Author/${blog.user.id}`} className="flex items-center">
                                        <div className="h-11 flex-grow-0 flex-shrink-0 basis-11 mr-[10px]">
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
                                    
                                </div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>

                </div>

            </div>
        </section>
    );
}

export default Trending;