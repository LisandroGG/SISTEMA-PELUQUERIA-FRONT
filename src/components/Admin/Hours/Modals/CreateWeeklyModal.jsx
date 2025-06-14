import React from "react";
import Modal from "@/Common/Modal";
import { X } from "lucide-react";
import HourBlockForm from "../HourBlockForm";
import ErrorMessage from "@/Common/ErrorMessage";

const CreateWeeklyModal = ({
  isOpen,
  onClose,
  workerName,
  blocks,
  onAddBlock,
  onRemoveBlock,
  onChangeBlock,
  onSubmit,
  error,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Crear horarios de: ${workerName}`}>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
      >
        <X />
      </button>
      <HourBlockForm
        blocks={blocks}
        onAdd={onAddBlock}
        onRemove={onRemoveBlock}
        onChange={onChangeBlock}
      />
      <ErrorMessage message={error} />
      <div className="mt-4">
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Crear horarios
        </button>
      </div>
    </Modal>
  );
};

export default CreateWeeklyModal;