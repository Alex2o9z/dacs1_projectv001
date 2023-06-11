import { React } from "react";

export const Hero = () => {
	return (
		<div className='max-w-full mx-auto p-4'>
            <div className='max-h-[500px] relative'>
                {/* Overlay */}
                <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
                    <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'><span className='text-[#ff611d]'>Những</span> Công thức</h1>
                    <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>Món ngon <span className='text-[#ff611d]'>tuyệt vời!</span></h1>
                    <div className="px-4 pt-4">
                        <button className='px-4 py-3 bg-[#ff611d] text-white text-2xl rounded-md'>Khám phá ngay</button>
                    </div>
                </div>
                <img className='w-full max-h-[500px] object-cover' src='https://images.pexels.com/photos/13354566/pexels-photo-13354566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='overlay'/>
            </div>
        </div>
    );
};