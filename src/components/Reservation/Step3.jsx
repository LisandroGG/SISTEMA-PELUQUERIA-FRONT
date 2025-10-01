import { getBloquedDays, getWorkingHoursByWorker } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { useDispatch, useSelector } from "react-redux";
import "react-day-picker/dist/style.css";
import Loading from "@/Common/Loading.jsx";
import StepCompont from "@/Common/StepComponent.jsx";
import { parse } from "date-fns";
import { addMonths, endOfMonth, format, startOfMonth } from "date-fns";
import { ArrowBigLeft } from "lucide-react";

const Step3 = ({ setStep, formData, setFormData }) => {
	const dispatch = useDispatch();
	const hasFetched = useRef(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const services = useSelector((state) => state.services);
	const workers = useSelector((state) => state.workers);

	const today = new Date();
	const blockedDays =
		useSelector((state) => state.bloquedDays?.blockedDays) || [];
	const isLoadingBloquedDays = useSelector(
		(state) => state.isLoadingBloquedDays,
	);
	const workingHoursByDate = useSelector((state) => state.workingHoursByDate);
	const isLoadingWorkingHoursByDate = useSelector(
		(state) => state.isLoadingWorkingHoursByDate,
	);

	useEffect(() => {
		if (!hasFetched.current && formData.workerId && formData.serviceId) {
			dispatch(getBloquedDays(formData.workerId, formData.serviceId));
			hasFetched.current = true;
		}
	}, [dispatch, formData.workerId, formData.serviceId]);

	const handleSelectDate = (date) => {
		if (!date) return;

		const formatted = format(date, "yyyy-MM-dd");
		setSelectedDate(date);
		setFormData({ ...formData, date: formatted, startTime: "" });
		dispatch(
			getWorkingHoursByWorker(formData.workerId, formatted, formData.serviceId),
		);
	};

	const handleSelectHour = (startTime) => {
		setFormData({ ...formData, startTime });
		setStep(4);
	};

	const handleBack = () => {
		setFormData({ ...formData, workerId: "", date: "", startTime: "" });
		setStep(2);
	};

	const blockedDates = blockedDays.map((day) =>
		parse(day, "yyyy-MM-dd", new Date()),
	);

	const disabledDays = [...blockedDates, { before: today }];

	return (
		<StepCompont
			step={"Elegí una fecha y horario:"}
			stepSelected={[
				formData.serviceId &&
					services.find((s) => s.id === formData.serviceId)?.name,
				formData.workerId &&
					workers.find((w) => w.id === formData.workerId)?.name,
			]
				.filter(Boolean)
				.join(" | ")}
		>
			{isLoadingBloquedDays ? (
				<Loading loadingText={"Cargando calendario..."} />
			) : (
				<div className="flex justify-center mt-2">
					<DayPicker
						mode="single"
						disabled={disabledDays}
						locale={es}
						weekStartsOn={0}
						selected={selectedDate}
						onSelect={handleSelectDate}
						startMonth={startOfMonth(new Date())}
						endMonth={endOfMonth(addMonths(new Date(), 1))}
						classNames={{
							disabled: "!text-shark-100",
							today: "!text-black !font-bold",
							day: "font-semibold text-shark-600",
							chevron: "fill-white",
							selected: "!font-bold text-xl !text-shark-500",
							weekday: "text-shark-500 text-md pt-2 pb-1 !font-bold",
							month_caption:
								"flex items-center h-10 font-bold text-lg text-white bg-shark-500 px-3 rounded-t-xl",
							month_grid: "border-2 border-shark-500 border-blue-500",
							month: "shadow-xl",
						}}
					/>
				</div>
			)}

			{selectedDate && (
				<div className="mt-4">
					<h3 className="text-shark-500 font-bold mb-2 text-lg">
						Horarios disponibles:
					</h3>
					{isLoadingWorkingHoursByDate ? (
						<Loading loadingText={"Cargando horarios..."} />
					) : workingHoursByDate?.timeSlots?.length === 0 ? (
						<p>No hay horarios disponibles para esta fecha.</p>
					) : (
						<div className="grid grid-cols-4 md:grid-cols-5 gap-2 ">
							{workingHoursByDate?.timeSlots.map((h) => (
								<button
									key={h.startTime}
									type="button"
									onClick={() => handleSelectHour(h.startTime)}
									className="px-3 py-1 text-white bg-shark-500 font-semibold hover:bg-shark-600 rounded cursor-pointer"
								>
									{h.startTime}
								</button>
							))}
						</div>
					)}
				</div>
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

export default Step3;
