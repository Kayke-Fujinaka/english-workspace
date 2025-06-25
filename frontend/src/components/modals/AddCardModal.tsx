"use client";

import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { toast } from "react-toastify";

import { Deck } from "@/interfaces/deck.interface";
import api from "@/services/api";
import { Loader } from "../Loader";
import { Modal } from "./Modal";

interface AddCardModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCardAdded: () => void;
  decks: Deck[];
}

export function AddCardModal({
  isOpen,
  onRequestClose,
  onCardAdded,
  decks,
}: AddCardModalProps) {
  const [selectedDeckId, setSelectedDeckId] = useState<string>("");
  const [front, setFront] = useState<string>("");
  const [back, setBack] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDeckId) {
      toast.error("Please select a deck");
      return;
    }

    if (!front.trim()) {
      toast.error("Card front text is required");
      return;
    }

    if (!back.trim()) {
      toast.error("Card back text is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post(`/cards/${selectedDeckId}`, {
        front: front.trim(),
        back: back.trim(),
      });
      toast.success("Card created successfully!");
      resetForm();
      onCardAdded();
      onRequestClose();
    } catch (error) {
      console.error("[AddCardModal] - Error creating card:", error);
      toast.error("Error creating card");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedDeckId("");
    setFront("");
    setBack("");
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onRequestClose();
    }
  };

  const isFormValid = selectedDeckId && front.trim() && back.trim();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      title="Adicionar Card"
      size="md"
      disableClose={isSubmitting}
      closeOnOverlayClick={!isSubmitting}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="deckSelect"
            className="block font-medium text-gray-700 mb-2"
          >
            Selecionar Deck
          </label>
          <select
            id="deckSelect"
            value={selectedDeckId}
            onChange={(e) => setSelectedDeckId(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Selecione um deck...</option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="cardFront"
            className="block font-medium text-gray-700 mb-2"
          >
            Frente do Card
          </label>
          <textarea
            id="cardFront"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Digite o texto da frente do card..."
            disabled={isSubmitting}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="cardBack"
            className="block font-medium text-gray-700 mb-2"
          >
            Verso do Card
          </label>
          <textarea
            id="cardBack"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Digite o texto do verso do card..."
            disabled={isSubmitting}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>

        <div className="flex gap-3 justify-end pt-4">
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
            disabled={isSubmitting || !isFormValid}
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
                Create Card
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
} 