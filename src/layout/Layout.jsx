import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GenresTabs from "../components/GenresTabs";



export default function Layout() {

    const location = useLocation();

    const isAuthPage = location.pathname === "/register" || location.pathname === "/login";

    return (
        <div className="text-center">
            <Header />


            {!isAuthPage && (
                <div className="my-10">
                    <h1 className="text-gray-200 mb-[50px] text-3xl font-mono font-bold">Il mondo del gaming a portata di tastiera</h1>
                    <GenresTabs />
                </div>
            )}
            <div className="grid grid-cols-10 gap-4 px-4">
                <div className="col-span-10">
                    <Outlet />
                </div>


            </div>
            <Footer />
        </div>
    )
};