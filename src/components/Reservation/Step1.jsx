import Loading from "@/Common/Loading.jsx";
import StepCompont from "@/Common/StepComponent.jsx";
import { getServices } from "@redux/actions";
import { ArrowBigLeft } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Step1 = ({ setStep, formData, setFormData }) => {
	const dispatch = useDispatch();
	const hasFetched = useRef(false);
	const navigate = useNavigate();
	const services = useSelector((state) => state.services);
	const isLoadingServices = useSelector((state) => state.isLoadingServices);

	useEffect(() => {
		if (!hasFetched.current) {
			dispatch(getServices());
			hasFetched.current = true;
		}
	}, [dispatch]);

	const handleNavigate = () => {
		navigate("/");
	};

	const handleSelect = (id) => {
		setFormData({
			...formData,
			serviceId: id,
			workerId: "",
			date: "",
			startTime: "",
		});
		setStep(2);
	};

	return (
		<StepCompont step={"Elegí un servicio:"} stepSelected="">
			{isLoadingServices ? (
				<Loading loadingText={"Cargando servicios..."} />
			) : (
				<ul className="gap-2 flex flex-col mt-2">
					{services.map((service) => (
						<li
							key={service.id}
							className="cursor-pointer text-white bg-shark-500 text-md font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all"
							onClick={() => handleSelect(service.id)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleSelect(service.id);
								}
							}}
						>
							<h2>
								{service.name} ({service.duration}m)
							</h2>
							<h3 className="tracking-wider">{service.cost}$</h3>
						</li>
					))}
				</ul>
			)}
			<div className="flex flex-col gap-2 justify-between items-center mt-4">
				<button
					type="button"
					onClick={handleNavigate}
					className="cursor-pointer text-white bg-shark-500 text-md font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all flex w-42"
				>
					<ArrowBigLeft />
					<span>Volver al inicio</span>
				</button>
			</div>
		</StepCompont>
	);
};

export default Step1;
