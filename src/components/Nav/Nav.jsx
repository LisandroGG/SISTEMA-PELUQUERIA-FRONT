import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogInIcon, LogOutIcon } from "lucide-react";

const Nav = ({ user, handleLogout }) => {
	const [menuOpen, setMenuOpen ] = useState(false)

	const handleToggle = () => setMenuOpen(!menuOpen);
	const handleClose = () => setMenuOpen(false);

	return (
		<header>
			<nav className="bg-shark-500 text-white font-bold p-2 shadow-xl">
				<ul className="flex gap-4 justify-between items-center">
					<li>
						<Link to="/"><img src="assets/logo.webp" className="rounded-full w-12 h-12"/></Link>
					</li>
					{user?.role === "admin" ? (
						<li>
							<Link to="/admin">
								<span className="">
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
								className=""
							>
								Cerrar sesion
							</button>
						</li>
					) : (
						<li>
							<Link to="/login">
								<span className="">
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
