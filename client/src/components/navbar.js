import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

export const Navbar = () => {
	const [cookie, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();
	const logout = () => {
		setCookies( "access_token", "");
		window.localStorage.removeItem("userID");
    navigate("/auth");
	};
	const [nav, setNav] = useState(true);
	const handleNav = () => {
		setNav(!nav);
	}

	return (
		<div className="navBar sticky z-50 top-0 flex justify-between items-center max-w-1240px mx-auto px-4 min-h-fit bg-white">
			<h1 className="w-full text-3xl font-bold my-4 text-[#ff611d]">Hôm Nay Ăn Gì?</h1>
			
			{/* Desktop view */}
			<ul className="min-w-fit hidden items-center md:flex">
				<li className="p-4 min-w-fit">
					<div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[300px] lg:w-[400px]">
						<AiOutlineSearch size={20} />
						<input className="bg-transparent p-2 w-full focus:outline-none" type="text" placeholder="Tìm kiếm..." />
					</div>
				</li>
				<li className="p-4 min-w-fit"><Link to="/home"> Trang chủ</Link></li>
				{/* <li className="p-4 min-w-fit"><Link to="/create-recipe"> Tạo công thức</Link></li> */}
				{!cookie.access_token ? (<li className="p-4 min-w-fit"><Link to="/auth"> Đăng nhập / Đăng kí</Link></li>) : (
					<>
					<li className="p-4 min-w-fit"><Link to="/saved-recipes"> Công thức đã lưu</Link></li>
					<li className="p-4 min-w-fit"><button onClick={logout}>Đăng xuất </button></li>
					</>
				)}
			</ul>

			{/* Mobile view */}
			<div onClick={handleNav} className="block md:hidden">
				{!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
			</div>
			<div className={!nav ? "fixed left-0 top-0 w-[60%] h-full bg-white shadow-sm ease-in-out duration-500" : "fixed left-[-100%] top-0  w-[60%] h-full bg-white shadow-sm ease-in-out duration-500"}>
				<h1 className="w-full text-3xl font-bold m-4 text-[#ff611d]">Hôm Nay Ăn Gì?</h1>
				<ul className="pt-12 uppercase">
					<li className="p-4 border-b">
						<div className="bg-gray-200 rounded-full flex items-center px-2 w-full">
							<AiOutlineSearch size={20} />
							<input className="bg-transparent p-2 w-full focus:outline-none" type="text" placeholder="Tìm kiếm..." />
						</div>
					</li>
					<li className="p-4 border-b border-600"><Link to="/home"> Trang chủ</Link></li>
					{/* <li className="p-4 border-b"><Link to="/create-recipe"> Tạo công thức</Link></li> */}
					{!cookie.access_token ? (<li className="p-4"><Link to="/auth"> Đăng nhập / Đăng kí</Link></li>) : (
						<>
						<li className="p-4 border-b"><Link to="/saved-recipes"> Công thức đã lưu</Link></li>
						<li className="p-4"><button onClick={logout}>Đăng xuất </button></li>
						</>
					)}
				</ul>
			</div>
		</div>
    );
};