import ReservationsModal from "@/Reservation/ReservationsModal.jsx";
import {
	Calendar,
	LogInIcon,
	LogOutIcon,
	Menu,
	Scissors,
	ShieldCheck,
	X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = ({ user, handleLogout }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
		closeMenu();
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
		setModalOpen(false);
	};
	const closeMenu = () => setMenuOpen(false);

	const logoutAndClose = () => {
		handleLogout();
		closeMenu();
	};

	const navItems = [
		{
			to: "/reservations",
			label: "Nuevo turno",
			icon: <Scissors className="w-5 h-5" />,
			action: null,
		},
		{
			label: "Mis turnos",
			icon: <Calendar className="w-5 h-5" />,
			action: openModal,
		},
		user?.role === "admin" && {
			to: "/admin",
			label: "Panel del admin",
			icon: <ShieldCheck className="w-5 h-5" />,
			action: null,
		},
	].filter(Boolean);

	useEffect(() => {
		if (menuOpen || modalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [menuOpen, modalOpen]);

	return (
		<>
			<header className="bg-shark-500 text-white shadow-xl w-full z-50 fixed top-0 left-0 right-0">
				<div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:px-8 lg:px-4">
					<Link to="/" className="flex items-center gap-2 z-50">
						<img
							src="assets/logo.webp"
							alt="logo"
							className="rounded-full w-10 h-10"
						/>
						<span className="text-lg font-bold hidden sm:inline font-chivo">
							AF Peluquería
						</span>
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
							{navItems.map(({ to, label, icon, action }) => (
								<li key={label}>
									{action ? (
										<button
											type="button"
											onClick={action}
											className="hover:scale-105 cursor-pointer flex gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
										>
											{icon}
											{label}
										</button>
									) : (
										<Link
											to={to}
											className="hover:scale-105 cursor-pointer flex gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
										>
											{icon}
											{label}
										</Link>
									)}
								</li>
							))}
							<li>
								{user ? (
									<button
										type="button"
										onClick={logoutAndClose}
										className="hover:scale-105 flex cursor-pointer gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
									>
										<LogOutIcon className="w-5 h-5" />
										Cerrar sesión
									</button>
								) : (
									<Link
										to="/login"
										className="hover:scale-105 flex cursor-pointer gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
									>
										<LogInIcon className="w-5 h-5" />
										Iniciar sesión
									</Link>
								)}
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
							{navItems.map(({ to, label, icon, action }) => (
								<li key={label}>
									{action ? (
										<button
											type="button"
											onClick={action}
											className="hover:scale-105 flex cursor-pointer w-full gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
										>
											{icon}
											{label}
										</button>
									) : (
										<Link
											to={to}
											className="hover:scale-105 flex cursor-pointer w-full gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
										>
											{icon}
											{label}
										</Link>
									)}
								</li>
							))}
							<li>
								{user ? (
									<button
										type="button"
										onClick={logoutAndClose}
										className="hover:scale-105 flex w-full cursor-pointer gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
									>
										<LogOutIcon className="w-5 h-5" />
										Cerrar sesión
									</button>
								) : (
									<Link
										to="/login"
										className="hover:scale-105 flex w-full cursor-pointer gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-semibold"
									>
										<LogInIcon className="w-5 h-5" />
										Iniciar sesión
									</Link>
								)}
							</li>
						</ul>
					</nav>
				</div>
			)}
			<ReservationsModal isOpen={modalOpen} onClose={closeModal} user={user} />
		</>
	);
};

export default Nav;
