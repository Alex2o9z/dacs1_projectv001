import { Typography } from "@material-tailwind/react";

export const Footer = () => {
	return (
		// <div className="relative bottom-0 w-full mt-8 p-4 min-h-fit text-center border-t">
            // {/* <h1 className="w-full text-3xl font-bold my-4">Hôm Nay Ăn Gì?</h1> */}
            // <h3>2023 © copyright by HomNayAnGi?</h3>
		// </div>
            <>
                  <footer className="flex w-full px-4 mt-8 flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
                        <Typography color="blue-gray" className="font-bold">
                        &copy; 2023 Hôm Nay Ăn Gì?
                        </Typography>
                        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                        <li>
                        <Typography
                              as="a"
                              href="#"
                              color="blue-gray"
                              className="font-normal transition-colors hover:text-deep-orange-500 focus:text-deep-orange-500"
                        >
                              Trợ Giúp
                        </Typography>
                        </li>
                        <li>
                        <Typography
                              as="a"
                              href="#"
                              color="blue-gray"
                              className="font-normal transition-colors hover:text-deep-orange-500 focus:text-deep-orange-500"
                        >
                              Điều Khoản
                        </Typography>
                        </li>
                        <li>
                        <Typography
                              as="a"
                              href="#"
                              color="blue-gray"
                              className="font-normal transition-colors hover:text-deep-orange-500 focus:text-deep-orange-500"
                        >
                              Đóng Góp
                        </Typography>
                        </li>
                        <li>
                        <Typography
                              as="a"
                              href="#"
                              color="blue-gray"
                              className="font-normal transition-colors hover:text-deep-orange-500 focus:text-deep-orange-500"
                        >
                              Liên Hệ
                        </Typography>
                        </li>
                        </ul>
                  </footer>
            </>
      );
};