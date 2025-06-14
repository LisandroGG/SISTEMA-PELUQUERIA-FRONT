import { ArrowBigLeft } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkersByService } from "@redux/actions";
import Loading from "@/Common/Loading.jsx";
import StepCompont from "@/Common/StepComponent.jsx";

const Step2 = ({ setStep, formData, setFormData }) => {
	const dispatch = useDispatch();
	const hasFetched = useRef(false);
	const workers = useSelector((state) => state.workers);
	const services = useSelector((state) => state.services);
	const isLoadingWorkers = useSelector((state) => state.isLoadingWorkers);

	useEffect(() => {
		if (!hasFetched.current && formData.serviceId) {
			dispatch(getWorkersByService(formData.serviceId));
			hasFetched.current = true;
		}
	}, [dispatch, formData.serviceId]);

	const handleSelect = (id) => {
		setFormData({ ...formData, workerId: id, date: "", startTime: "" });
		setStep(3);
	};

	const handleBack = () => {
		setFormData({ ...formData, serviceId: "", workerId: "" });
		setStep(1);
	};
	return (
		<StepCompont
			step={"Elegí un peluquero:"}
			stepSelected={
				formData.serviceId
					? services.find((s) => s.id === formData.serviceId)?.name
					: ""
			}
		>
			{isLoadingWorkers ? (
				<Loading loadingText={"Cargando Peluqueros..."} />
			) : workers.length === 0 ? (
				<p>No hay peluqueros disponibles para este servicio.</p>
			) : (
				<ul className="gap-2 flex flex-col mt-2">
					{workers.map((worker) => (
						<li
							key={worker.id}
							className="cursor-pointer text-white bg-shark-500 text-md font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all flex gap-1"
							onClick={() => handleSelect(worker.id)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleSelect(worker.id);
								}
							}}
						>
							{worker.name}
						</li>
					))}
				</ul>
			)}
			<div className="flex flex-col gap-2 justify-between items-center mt-4">
				<button
					onClick={handleBack}
					className="cursor-pointer text-white bg-shark-500 text-md font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all flex w-60"
					type="button"
				>
					<ArrowBigLeft />
					<span>Volver al paso anterior</span>
				</button>
			</div>
		</StepCompont>
	);
};

export default Step2;
