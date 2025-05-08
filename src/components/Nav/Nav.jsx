import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ user, handleLogout }) => {
    return (
        <header>
        <nav>
            <ul className="flex gap-4 justify-between">
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                {user?.role === "admin" ? (
                    <li>
                        <Link to="/admin">
                            <span className="text-white p-1 rounded-lg font-semibold transition-all bg-gray-500">
                                Panel de administrador
                            </span>
                        </Link>
                    </li>
                ) : (
                    ""
                )}
                {user ? (
                    <li>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-white p-1 rounded-lg font-semibold transition-all bg-gray-500"
                        >
                            Cerrar sesion
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">
                            <span className="text-white p-1 rounded-lg font-semibold transition-all bg-gray-500">
                                Iniciar Sesion
                            </span>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    </header>
    );
};

export default Nav;