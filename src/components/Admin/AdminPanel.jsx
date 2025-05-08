import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminPanel = () => {
	const admin = useSelector((state) => state.user);

	return (
		<div className="flex flex-col min-h-screen">
			<AdminNav admin={admin} />
			<main className="p-6">
				<section>
					<Outlet />
				</section>
			</main>
		</div>
	);
};

export default AdminPanel;