import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeftCircle, AiOutlineRightCircle, AiOutlineHome, AiOutlineProject } from "react-icons/ai";
import { BiFoodMenu, BiAtom } from "react-icons/bi";
import { useState } from "react";

export const Sidebar = () => {
	const navigate = useNavigate();
	const [nav, setNav] = useState(false);
	const handleNav = () => {
		setNav(!nav);
	}

      return (
            <div className="sideBar text-white w-fit">
			<div className={!nav ? "sticky z-50 top-0 h-screen w-[180px] bg-[#ff611d] ease-in-out duration-300" : "relative h-screen bg-[#ff611d] ease-in-out duration-300"}>
                        <div onClick={handleNav} className="pt-2 w-full flex justify-center">
                              {!nav ? <AiOutlineLeftCircle size={40}/> : <AiOutlineRightCircle size={40}/>}
                        </div>
				<ul className="pt-4 uppercase">
					<li className="p-4 border-b">
                                    <Link to="/home">
                                          <div className="flex items-center">
                                                <AiOutlineHome size={25} className="mr-2"/>
                                                <span className={!nav ? "block" : "hidden"}>Trang chủ</span>
                                          </div>
                                    </Link>
                              </li>
					<li className="p-4 border-b">
                                    <Link to="/recipes-list">
                                          <div className="flex items-center">
                                                <BiFoodMenu size={25} className="mr-2"/>
                                                <span className={!nav ? "block" : "hidden"}>Công thức</span>
                                          </div>
                                    </Link>
                              </li>
                              <li className="p-4 border-b">
                                    <Link to="/projects-list">
                                          <div className="flex items-center">
                                                <AiOutlineProject size={25} className="mr-2"/>
                                                <span className={!nav ? "block" : "hidden"}>Dự án</span>
                                          </div>
                                    </Link>
                              </li>
                              <li className="p-4 border-b">
                                    <Link to="/ingredients-list">
                                          <div className="flex items-center">
                                                <BiAtom size={25} className="mr-2"/>
                                                <span className={!nav ? "block" : "hidden"}>Nguyên liệu</span>
                                          </div>
                                    </Link>
                              </li>
				</ul>
			</div>
            </div>
      );
};