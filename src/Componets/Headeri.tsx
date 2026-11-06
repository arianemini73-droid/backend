import { useState } from "react";
import { Link } from "react-router-dom";
import meny from '../assets/image/meny.png'
import icone from '../assets/image/icone.png'

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="relative flex justify-between items-center py-5 px-6 md:px-10 bg-[#203846]">

            {/* LOGO */}
            <div className="icone cursor-pointer">
                <Link to='/'>
                <h1 className="font-bold text-2xl px-2 text-white">
                    <img src={icone} alt="" className="w-[45px]!" />
                </h1>
                </Link>
            </div>


            {/* DESKTOP MENU */}
            <nav className="hidden md:block">
                <ul className="flex gap-6 text-[18px]">

                    <Link
                        className="text-[#F3C646] hover:opacity-75 transition"
                        to="/"
                    >
                        <li>Home</li>
                    </Link>

                    <Link
                        className="text-[#F3C646] hover:opacity-75 transition"
                        to="/sherbimet"
                    >
                        <li>Sherbimet</li>
                    </Link>

                    <Link
                        className="text-[#F3C646] hover:opacity-75 transition"
                        to="/app"
                    >
                        <li>Aplikacionet</li>
                    </Link>

                    <Link
                        className="text-[#F3C646] hover:opacity-75 transition"
                        to="/about"
                    >
                        <li>Rreth meje</li>
                    </Link>

                    <Link
                        className="text-[#F3C646] hover:opacity-75 transition"
                        to="/kontakt"
                    >
                        <li>Kontakti</li>
                    </Link>

                </ul>
            </nav>


            {/* ADMIN DESKTOP */}
            <div className="hidden md:block bg-[#95E96F] px-4 py-2 font-bold">
                <Link to='/login'>
                <button>
                    Admini
                </button>
                </Link>
            </div>


            {/* HAMBURGER - TABLET / MOBILE */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
            >
                <img
                    src={meny}
                    alt="Menu"
                    className="w-8 h-8"
                />
            </button>


            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#203846] border-t border-gray-800 md:hidden z-50">

                    <nav className="px-6 py-5">

                        <ul className="flex flex-col gap-5 text-[18px]">

                            <Link
                                onClick={() => setMenuOpen(false)}
                                className="text-[#F3C646] hover:opacity-75 transition"
                                to="/"
                            >
                                <li>Home</li>
                            </Link>

                            <Link
                                onClick={() => setMenuOpen(false)}
                                className="text-[#F3C646] hover:opacity-75 transition"
                                to="/sherbimet"
                            >
                                <li>Sherbimet</li>
                            </Link>

                            <Link
                                onClick={() => setMenuOpen(false)}
                                className="text-[#F3C646] hover:opacity-75 transition"
                                to="/app"
                            >
                                <li>Aplikacionet</li>
                            </Link>

                            <Link
                                onClick={() => setMenuOpen(false)}
                                className="text-[#F3C646] hover:opacity-75 transition"
                                to="/about"
                            >
                                <li>Rreth meje</li>
                            </Link>

                            <Link
                                onClick={() => setMenuOpen(false)}
                                className="text-[#F3C646] hover:opacity-75 transition"
                                to="/kontakt"
                            >
                                <li>Kontakti</li>
                            </Link>

                            
                            <li>
                                <Link to='/login'>
                                    <button>
                                        Admini
                                    </button>
                                </Link>
                            </li>

                        </ul>

                    </nav>

                </div>
            )}

        </header>
    );
}

export default Header;

