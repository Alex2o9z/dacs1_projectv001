import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfo } from '../hooks/useGetUserInfo.js';
import { AiOutlineSearch } from "react-icons/ai";

export const Navbar = () => {
	const [cookie, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();
	const userInfo = useGetUserInfo();
	const logout = () => {
		setCookies( "access_token", "");
		window.localStorage.removeItem("userID");
		window.localStorage.removeItem("imageUrl");
		window.localStorage.removeItem("userName");
    	navigate("/auth");
	};

	return (
		<div className="navBar sticky z-50 top-0 flex justify-between items-center max-w-1240px mx-auto px-4 min-h-fit bg-white border-b">
			<h1 className="text-3xl font-bold my-4 text-[#ff611d]">Hôm Nay Ăn Gì?</h1>
			<ul className="min-w-fit hidden items-center md:flex">
				<li className="p-4 min-w-fit">
					<div className="bg-gray-200 rounded-lg flex items-center px-2 w-[200px] sm:w-[300px] lg:w-[400px]">
						<AiOutlineSearch size={20} />
						<input className="bg-transparent p-2 w-full focus:outline-none" type="text" placeholder="Tìm kiếm..." />
					</div>
				</li>
				{!cookie.access_token ? (
					<li className="p-4 min-w-fit">
						<Link to="/auth"> Đăng nhập</Link>
					</li>
				) : (
					<>
						<li className="p-4 min-w-fit">
							<button onClick={logout} className="p-2 border rounded flex items-center" title={userInfo.userName}>
								<img src={
										userInfo.imageUrl == undefined ? userInfo.imageUrl : "https://res.cloudinary.com/dmwazuhqx/image/upload/v1686578949/dacn1/146-1468843_profile-icon-orange-png-transparent-png_jkvsa0.png"
									} alt={userInfo.userName} className="h-5"/>
								<span className="ml-2">
									Đăng xuất
								</span>
							</button>
						</li>
					</>
				)}
			</ul>
		</div>
    );
};