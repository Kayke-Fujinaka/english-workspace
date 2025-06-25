"use client";

import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { toast } from "react-toastify";

import api from "@/services/api";
import { Loader } from "../Loader";
import { Modal } from "./Modal";

interface AddDeckModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onDeckAdded: () => void;
}

export function AddDeckModal({
  isOpen,
  onRequestClose,
  onDeckAdded,
}: AddDeckModalProps) {
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("O nome do deck é obrigatório");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/decks", { name: name.trim() });
      toast.success("Deck criado com sucesso!");
      setName("");
      onDeckAdded();
      onRequestClose();
    } catch (error) {
      console.error("[AddDeckModal] - Error creating deck:", error);
      toast.error("Error creating deck");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName("");
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      title="Adicionar Deck"
      size="sm"
      disableClose={isSubmitting}
      closeOnOverlayClick={!isSubmitting}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="deckName"
            className="block font-medium text-gray-700 mb-2"
          >
            Nome do Deck
          </label>
          <input
            id="deckName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do deck..."
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            autoFocus
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2 px-4 py-2 text-white bg-gray-400 hover:bg-gray-500 rounded-lg font-bold transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader color="white" size={4} />
                Creating...
              </>
            ) : (
              <>
                <LuPlus className="w-4 h-4" />
                Create Deck
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
