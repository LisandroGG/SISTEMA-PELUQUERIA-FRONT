import React, { useState, useEffect, useRef } from "react";
import { Pencil, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getWorkingHours, createWorkingHour, editCustomWorkingHour, deleteCustomWorkingHour } from "../../redux/actions";
import ErrorMessage from "../Common/ErrorMessage";
import Loading from "../Common/Loading";
import Modal from "../Common/Modal";

const Hours = () => {
        const dispatch = useDispatch();
        const executed = useRef(false);
        const workingHours = useSelector((state) => state.workingHours);
        const isLoadingWorkingHours = useSelector((state) => state.isLoadingWorkingHours);
        const [modalOpen, setModalOpen] = useState(false);
        const [error, setError] = useState("");
        

    return (
        <section className="max-w-7xl mx-auto p-4 md:px-8 lg:px-4 px-5">
            <div className="">
				<button type="button" className="">
					Crear nuevo horario
				</button>
			</div>
        </section>
    )
};

export default Hours;