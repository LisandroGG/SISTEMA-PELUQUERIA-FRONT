import React from "react";
import Modal from "@/Common/Modal";
import { X } from "lucide-react";
import ErrorMessage from "@/Common/ErrorMessage";

const CreateDisableDayModal = ({
    isOpen,
    onClose,
    onSubmit,
    disableDayData,
    onChange,
    workerName,
    error,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Deshabilitar día de: ${workerName}`}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
            >
                <X />
            </button>
        <div className="space-y-4 mt-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Fecha:</label>
          <input
            name="day"
            type="date"
            value={disableDayData.day}
            onChange={onChange}
          />
        </div>

        <ErrorMessage message={error} />

        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Deshabilitar día
        </button>
      </div>
        </Modal>
    )
}

export default CreateDisableDayModal;