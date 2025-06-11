import React from "react";
import Modal from "../../../Common/Modal";
import { format, isValid } from "date-fns";
import { es } from "date-fns/locale";

const EditCustomModal = ({
  isOpen,
  onClose,
  hour,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  onSubmit,
}) => {
    let formattedDate = hour?.dayOfWeek;
  const parsed = new Date(`${hour?.dayOfWeek}T12:00:00`);
  if (isValid(parsed)) {
    formattedDate = format(parsed, "EEEE dd/MM/yyyy", { locale: es });
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Editar horario de ${formattedDate}`}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <p className="capitalize">{formattedDate}:</p>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-1 rounded"
          />
          <span>-</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-1 rounded"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCustomModal;