import {
	Calendar,
	Clock,
	Contact,
	LogOutIcon,
	Menu,
	Scissors,
	X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminNav = ({ handleLogout }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const closeMenu = () => setMenuOpen(false);

	const logoutAndClose = () => {
		handleLogout();
		closeMenu();
	};
	const navItems = [
		{
			to: "/admin",
			label: "Turnos",
			icon: <Calendar className="w-5 h-5" />,
		},
		{
			to: "/admin/services",
			label: "Servicios",
			icon: <Scissors className="w-5 h-5" />,
		},
		{
			to: "/admin/workers",
			label: "Personal",
			icon: <Contact className="w-5 h-5" />,
		},
		{
			to: "/admin/hours",
			label: "Horarios",
			icon: <Clock className="w-5 h-5" />,
		},
	];

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [menuOpen]);
	return (
		<>
			<header className="bg-shark-500 text-white shadow-md w-full z-50 fixed top-0 left-0 right-0">
				<div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:px-8 lg:px-4">
					<Link to="/" className="flex items-center gap-2 z-50">
						<img
							src="assets/logo.webp"
							alt="logo"
							className="rounded-full w-10 h-10"
						/>
					</Link>

					<button
						onClick={toggleMenu}
						className="lg:hidden text-white z-50"
						type="button"
					>
						{menuOpen ? <X /> : <Menu />}
					</button>

					<nav className="hidden lg:flex items-center">
						<ul className="flex gap-6 items-center">
							{navItems.map(({ to, label, icon }) => (
								<li key={to}>
									<Link
										to={to}
										className="flex gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
									>
										{icon}
										{label}
									</Link>
								</li>
							))}
							<li>
								<button
									type="button"
									onClick={logoutAndClose}
									className="flex cursor-pointer gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
								>
									<LogOutIcon className="w-5 h-5" />
									Cerrar sesión
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{menuOpen && (
				<div
					className="fixed inset-0 z-40 pt-20 px-6"
					onClick={closeMenu}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") closeMenu();
					}}
				>
					<nav className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm pt-20 px-6 z-40">
						<ul className="flex flex-col gap-4 bg-shark-500 p-4 rounded-xl shadow-lg text-white">
							{navItems.map(({ to, label, icon }) => (
								<li key={to}>
									<Link
										to={to}
										onClick={closeMenu}
										className="flex gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
									>
										{icon}
										{label}
									</Link>
								</li>
							))}
							<li>
								<button
									type="button"
									onClick={logoutAndClose}
									className="flex w-full cursor-pointer gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
								>
									<LogOutIcon className="w-5 h-5" />
									Cerrar sesión
								</button>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</>
	);
};

export default AdminNav;
