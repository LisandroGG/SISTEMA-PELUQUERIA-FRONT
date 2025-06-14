import React from "react";
import Modal from "@/Common/Modal";
import { format, isValid } from "date-fns";
import { es } from "date-fns/locale";

const DeleteCustomModal = ({ isOpen, onClose, hour, onDelete }) => {
  let formattedDate = hour?.dayOfWeek;
  const parsed = new Date(`${hour?.dayOfWeek}T12:00:00`);
  if (isValid(parsed)) {
    formattedDate = format(parsed, "EEEE dd/MM/yyyy", { locale: es });
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar horario">
      <p className="text-gray-700">
        ¿Estás seguro de que querés eliminar el horario de{" "}
        <strong>{formattedDate}</strong> desde{" "}
        <strong>{hour?.startTime.slice(0, 5)}</strong> hasta{" "}
        <strong>{hour?.endTime.slice(0, 5)}</strong>?
      </p>

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => onDelete(hour?.id)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
};

export default DeleteCustomModal;