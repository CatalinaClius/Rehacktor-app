import React, { useContext } from "react";
import Searchbar from './Searchbar';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@heroui/react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/sessionContext";
import { useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert('Signed out');
        navigate('/');
    };

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = ["Profile"];

    return (
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="bg-gray-800">
            <NavbarContent justify="start" className="max-w-32">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden"
                />
                <NavbarBrand>
                    <a href="/" className="font-bold font-serif text-2xl text-yellow-500">Rehacktor</a>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex gap-6 flex-1 pe-10" justify="center">
                <NavbarItem>
                    <button
                        onClick={() => {
                            if (session) {
                                navigate("/profile");
                            } else {
                                navigate("/login");
                            }
                        }}
                        className="text-gray-200"
                    >
                        Profile
                    </button>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-gray-200" href="#">
                        Settings
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="center" className="flex me-8">
                <Searchbar />
                <NavbarItem className="hidden md:flex">
                    {session ? (
                        <>
                            <Button as={Link} href="/account" color="default" variant="bordered" className="ms-3 text-gray-200">Account</Button>
                            <Button onClick={signOut} color="default" variant="bordered" className="ms-3 text-gray-200">Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button as={Link} color="default" href="/register" variant="bordered" className="ms-3 text-gray-200">
                                Sign Up
                            </Button>
                            <Button as={Link} color="default" href="/login" variant="bordered" className="ms-3 text-gray-200">
                                Login
                            </Button>
                        </>
                    )}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-gray-800">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Button
                            onClick={() => {
                                if (item === "Profile") {
                                    if (session) {
                                        navigate("/profile");
                                    } else {
                                        navigate("/login");
                                    }
                                    setIsMenuOpen(false);
                                }
                            }}
                            className="text-gray-200 w-full text-left"
                            variant="light"
                        >
                            {item}
                        </Button>
                    </NavbarMenuItem>
                ))}
                <hr className="my-4" />

                {session ? (
                    <>
                        <Button as={Link} href="/account" color="default" variant="bordered" className="ms-3 text-gray-200">Account</Button>
                        <Button onClick={signOut} color="default" variant="bordered" className="ms-3 text-gray-200">Logout</Button>
                    </>
                ) : (
                    <>
                        <Button as={Link} color="default" href="/register" variant="bordered" className="ms-3 text-gray-200">
                            Sign Up
                        </Button>
                        <Button as={Link} color="default" href="/login" variant="bordered" className="ms-3 text-gray-200">
                            Login
                        </Button>
                    </>
                )}
            </NavbarMenu>
        </Navbar>
    );
}
