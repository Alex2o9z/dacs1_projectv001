import { Link } from "react-router-dom";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube, AiOutlineTwitter } from "react-icons/ai";

export const Footer = () => {
	return (
		<div className="bottom-0 max-w-1240px mx-auto mt-8 p-4 min-h-fit border-t">
            <h1 className="w-full text-3xl font-bold my-4">Hôm Nay Ăn Gì?</h1>
            <div className="flex justify-between ">
                <div>
                    <div className="flex">
                        <Link to="https://facebook.com/"><AiOutlineFacebook className="mr-4" size={30}/></Link>
                        <Link to="https://www.instagram.com/"><AiOutlineInstagram className="mr-4" size={30}/></Link>
                        <Link to="https://www.youtube.com/"><AiOutlineYoutube className="mr-4" size={30}/></Link>
                        <Link to="https://twitter.com/"><AiOutlineTwitter className="mr-4" size={30}/></Link>
                    </div>
                    <div className="my-4">
                        <h3>2023 © copyright by Homnayangi?</h3>
                    </div>
                </div>
                <div className="flex">
                    <ul className="min-w-fit mx-4">
                        <li className="px-4 min-w-fit"><Link to="/home"> Home</Link></li>
                        <li className="px-4 min-w-fit"><Link to="/home"> Recipes</Link></li>
                        <li className="px-4 min-w-fit"><Link to="/home"> Ingredients</Link></li>
                    </ul>
                    <ul className="min-w-fit mx-4">
                        <li className="px-4 min-w-fit"><Link to="/home"> About Us</Link></li>
                        <li className="px-4 min-w-fit"><Link to="/home"> Contact</Link></li>
                    </ul>
                </div>
            </div>
		</div>
    );
};