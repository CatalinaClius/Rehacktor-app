import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";

export default function Footer() {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
        alert("Signed out");
        navigate("/");
    };

    return (
        <footer className="bg-gray-800 py-6 mt-10">

            <ul className="flex justify-center flex-wrap gap-6 border-b pb-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                <li>
                    <Link to="/" className="hover:text-gray-800">
                        Home
                    </Link>
                </li>

                <li>
                    <button
                        onClick={() => {
                            if (session) {
                                navigate("/profile");
                            } else {
                                navigate("/login");
                            }
                        }}
                        className="hover:text-gray-800 focus:outline-none"
                    >
                        Profile
                    </button>
                </li>

                <li>
                    <Link to="/settings" className="hover:text-gray-800">
                        Settings
                    </Link>
                </li>

                {session ? (
                    <>
                        <li>
                            <Link to="/account" className="hover:text-gray-800">
                                Account
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={signOut}
                                className="hover:text-gray-800 focus:outline-none"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/register" className="hover:text-gray-800">
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-gray-800">
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            <p className="text-center text-gray-400 text-sm">© 2025 Rehacktor, Inc</p>
        </footer>
    );
}
