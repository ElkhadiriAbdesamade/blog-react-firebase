
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Trending = () => {


    return (
        <section className='pt-12 pb-0 max-w-[1320px] mx-auto '>
            <div className='container'>
                <div className='flex justify-center mb-12'>
                    <div className='text-center'>
                        <h2 className='font-bold text-[40px]'>Trending</h2>
                    </div>
                </div>
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
                        <SwiperSlide>
                            <div className="grid md:grid-flow-col dark:bg-[#50577A] p-8">
                                <div className="inline-grid md:mr-8 ">
                                    <a href="/">
                                        <img src="https://preview.colorlib.com/theme/magdesign/images/post_lg_2.jpg" alt="Img" className="rounded-xl shadow-xl dark:shadow-xl dark:shadow-slate-500" />
                                    </a>
                                </div>
                                <div className="self-center text-[14px] inline-grid ">
                                    <div className="mb-4 text-left" >
                                        <a className="font-bold text-[#222] dark:text-white" href="/">Business</a>,&nbsp;
                                        <a className="font-bold text-[#222] dark:text-white" href="/">Travel</a>&nbsp;<span className="text-[#999]">—</span>&nbsp;
                                        <span className="text-[#999] dark:text-white">July 2, 2020</span>
                                    </div>
                                    <h2 className='font-bold text-[40px] text-left leading-[1.2] mb-2'><a href="/">Your most unhappy customers are your greatest source of learning.</a></h2>
                                    <p className="text-left text-[#999] mb-4 dark:text-white">
                                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                                    </p>
                                    <a href="/" className="flex items-center">
                                    <div className="flex-grow-0 flex-shrink-0 basis-11 mr-[10px]">
                                        <img className="max-w-full rounded-full" src="https://preview.colorlib.com/theme/magdesign/images/person_1.jpg" alt="Img"/>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <strong>Sergy Campbell</strong>
                                        <span>CEO and Founder</span>
                                    </div>
                                </a>
                                </div>
                                
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="grid md:grid-flow-col dark:bg-[#50577A] p-8">
                                <div className="inline-grid md:mr-8 ">
                                    <a href="/">
                                        <img src="https://preview.colorlib.com/theme/magdesign/images/post_lg_2.jpg" alt="Img" className="rounded-xl shadow-xl dark:shadow-xl dark:shadow-slate-500" />
                                    </a>
                                </div>
                                <div className="self-center text-[14px] inline-grid ">
                                    <div className="mb-4 text-left" >
                                        <a className="font-bold text-[#222] dark:text-white" href="/">Business</a>,&nbsp;
                                        <a className="font-bold text-[#222] dark:text-white" href="/">Travel</a>&nbsp;<span className="text-[#999]">—</span>&nbsp;
                                        <span className="text-[#999] dark:text-white">July 2, 2020</span>
                                    </div>
                                    <h2 className='font-bold text-[40px] text-left leading-[1.2] mb-2'><a href="/">Your most unhappy customers are your greatest source of learning.</a></h2>
                                    <p className="text-left text-[#999] mb-4 dark:text-white">
                                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                                    </p>
                                    <a href="/" className="flex items-center">
                                    <div className="flex-grow-0 flex-shrink-0 basis-11 mr-[10px]">
                                        <img className="max-w-full rounded-full" src="https://preview.colorlib.com/theme/magdesign/images/person_1.jpg" alt="Img"/>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <strong>Sergy Campbell</strong>
                                        <span>CEO and Founder</span>
                                    </div>
                                </a>
                                </div>
                                
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="grid md:grid-flow-col dark:bg-[#50577A] p-8">
                                <div className="inline-grid md:mr-8 ">
                                    <a href="/">
                                        <img src="https://preview.colorlib.com/theme/magdesign/images/post_lg_2.jpg" alt="Img" className="rounded-xl shadow-xl dark:shadow-xl dark:shadow-slate-500" />
                                    </a>
                                </div>
                                <div className="self-center text-[14px] inline-grid ">
                                    <div className="mb-4 text-left" >
                                        <a className="font-bold text-[#222] dark:text-white" href="/">Business</a>,&nbsp;
                                        <a className="font-bold text-[#222] dark:text-white" href="/">Travel</a>&nbsp;<span className="text-[#999]">—</span>&nbsp;
                                        <span className="text-[#999] dark:text-white">July 2, 2020</span>
                                    </div>
                                    <h2 className='font-bold text-[40px] text-left leading-[1.2] mb-2'><a href="/">Your most unhappy customers are your greatest source of learning.</a></h2>
                                    <p className="text-left text-[#999] mb-4 dark:text-white">
                                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                                    </p>
                                    <a href="/" className="flex items-center">
                                    <div className="flex-grow-0 flex-shrink-0 basis-11 mr-[10px]">
                                        <img className="max-w-full rounded-full" src="https://preview.colorlib.com/theme/magdesign/images/person_1.jpg" alt="Img"/>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <strong>Sergy Campbell</strong>
                                        <span>CEO and Founder</span>
                                    </div>
                                </a>
                                </div>
                                
                            </div>
                        </SwiperSlide>

                    </Swiper>

                </div>

            </div>
        </section>
    );
}

export default Trending;