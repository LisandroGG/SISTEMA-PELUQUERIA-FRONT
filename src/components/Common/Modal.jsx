import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
	const modalRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				onClose();
			}
		};

		const handleEscape = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [onClose]);
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				className="bg-white rounded-lg shadow-lg relative p-6 w-[90%] max-w-xl mt-18 lg:mt-0 max-h-[80vh] overflow-y-auto animate-fadeIn"
				ref={modalRef}
			>
				{title && (
					<h1 className="text-3xl font-semibold mb-4 text-center font-chivo capitalize">
						{title}
					</h1>
				)}
				{children}
			</div>
		</div>
	);
};

export default Modal;
