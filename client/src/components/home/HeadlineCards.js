import { React } from "react";

export const HeadlineCards = () => {
	return (
		<div className="p-4 grid md:grid-cols-4 gap-4">
            {/* Card */}
            <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full px-2 py-4 bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl">Món khai vị</p>
                    <p>Tươi mát, hòa quyện hương vị.</p>
                    <button className="p-2 rounded-xl border-white bg-white text-black absolute bottom-4">Xem thêm</button>
                </div>
                <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://galacenter.com.vn/wp-content/uploads/2022/07/Bia-moi-1519.2-x-700-2.jpg" alt="Heaadline Card img"/>
            </div>

            {/* Card */}
            <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full px-2 py-4 bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl">Món chính</p>
                    <p>Tuyệt vời, hòa quyện hương vị tuyệt hảo.</p>
                    <button className="p-2 rounded-xl border-white bg-white text-black absolute bottom-4">Xem thêm</button>
                </div>
                <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://ngon.online/wp-content/uploads/2019/01/dui-ga-tay-xong-khoi-1.jpg" alt="Heaadline Card img"/>
            </div>

            {/* Card */}
            <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full px-2 py-4 bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl">Tráng miệng</p>
                    <p>Ngọt ngào, hoàn hảo để kết thúc bữa ăn</p>
                    <button className="p-2 rounded-xl border-white bg-white text-black absolute bottom-4">Xem thêm</button>
                </div>
                <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://suckhoedoisong.qltns.mediacdn.vn/Images/phamhiep/2016/08/09/1_11.jpg" alt="Heaadline Card img"/>
            </div>

            {/* Card */}
            <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full px-2 py-4 bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl">Nước giải khát</p>
                    <p>Nước giải khát tươi mát, thỏa lòng cơn khát</p>
                    <button className="p-2 rounded-xl border-white bg-white text-black absolute bottom-4">Xem thêm</button>
                </div>
                <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://mqflavor.com/wp-content/uploads/2018/08/huong-trai-cay-tong-hop-1-1.jpg" alt="Heaadline Card img"/>
            </div>
		</div>
    );
};