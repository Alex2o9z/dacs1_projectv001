import { React } from "react";

export const HeadlineCards = () => {
	return (
		<div className="p-4 grid md:grid-cols-4 gap-4">
            {/* Card */}
            <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full px-2 py-4 bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl">Card Title</p>
                    <p>Desciption</p>
                    <button className="p-2 rounded-xl border-white bg-white text-black absolute bottom-4">See more</button>
                </div>
                <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://images.pexels.com/photos/821403/pexels-photo-821403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Heaadline Card img"/>
            </div>

            {/* Card */}
            <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full px-2 py-4 bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl">Card Title</p>
                    <p>Desciption</p>
                    <button className="p-2 rounded-xl border-white bg-white text-black absolute bottom-4">See more</button>
                </div>
                <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://images.pexels.com/photos/821403/pexels-photo-821403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Heaadline Card img"/>
            </div>

            {/* Card */}
            <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full px-2 py-4 bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl">Card Title</p>
                    <p>Desciption</p>
                    <button className="p-2 rounded-xl border-white bg-white text-black absolute bottom-4">See more</button>
                </div>
                <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://images.pexels.com/photos/821403/pexels-photo-821403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Heaadline Card img"/>
            </div>

            {/* Card */}
            <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full px-2 py-4 bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl">Card Title</p>
                    <p>Desciption</p>
                    <button className="p-2 rounded-xl border-white bg-white text-black absolute bottom-4">See more</button>
                </div>
                <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://images.pexels.com/photos/821403/pexels-photo-821403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Heaadline Card img"/>
            </div>
		</div>
    );
};