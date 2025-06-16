import { es } from "date-fns/locale";
import React from "react";
import { DayPicker } from "react-day-picker";

const SimpleDatePicker = ({ selectedDate, onSelectDate }) => {
	return (
		<DayPicker
			mode="single"
			selected={selectedDate}
			onSelect={onSelectDate}
			locale={es}
			weekStartsOn={0}
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
	);
};

export default SimpleDatePicker;
