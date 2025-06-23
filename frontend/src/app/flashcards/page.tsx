"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LuFile, LuPlus } from "react-icons/lu";
import { toast } from "react-toastify";

import { Loader } from "@/components";
import { Deck } from "@/interfaces/deck.interface";
import api from "@/services/api";

export default function Flashcards() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoadingDecks, setIsLoadingDecks] = useState<boolean>(true);

  const HEADERS = [
    { id: "deck", label: "Deck", align: "left" },
    { id: "new", label: "New", align: "center" },
    { id: "review", label: "Review", align: "center" },
  ];

  const fetchDecks = async () => {
    setIsLoadingDecks(true);

    try {
      const { data } = await api.get("/decks");
      setDecks(data.decks);
    } catch (error) {
      console.error("[Deck] - Error fetching decks: ", error);
      toast.error("Error fetching decks");
    } finally {
      setIsLoadingDecks(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  if (isLoadingDecks) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-3 gap-3 py-3 px-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          {HEADERS.map(({ id, label, align }) => (
            <div
              key={id}
              className={`text-gray-700 text-sm font-bold ${
                align === "center" ? "text-center" : ""
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {decks.length === 0 && !isLoadingDecks && (
          <div className="py-8 text-center">
            <div className="text-gray-400 mb-3">
              <LuFile className="w-10 h-10 mx-auto" />
            </div>
            <p className="text-gray-600 text-sm">There are no decks.</p>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {decks.map(({ id, name, stats }) => (
            <Link
              key={id}
              href={`/flashcards/${id}/review`}
              className={`grid grid-cols-3 gap-4 py-3 px-4 cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-center">
                <span className="text-gray-800">{name}</span>
              </div>

              <div className="text-center">
                <span className="text-blue-600">{stats.new}</span>
              </div>

              <div className="text-center">
                <span className="text-green-600">{stats.review}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 flex gap-4 justify-center">
        <button className="cursor-pointer text-sm flex items-center gap-2 px-4 py-2 text-blue-600 border-blue-600 border bg-white hover:text-white hover:bg-blue-700 rounded-lg font-bold transition-all duration-300">
          <LuPlus className="w-4 h-4" />
          Adicionar Deck
        </button>

        {decks.length < 0 && (
          <button className="cursor-pointer text-sm flex items-center gap-2 px-4 py-2 text-white bg-blue-600 border-blue-600 border hover:bg-blue-700 rounded-lg font-bold transition-all duration-300">
            <LuPlus className="w-4 h-4" />
            Adicionar Card
          </button>
        )}
      </div>
    </div>
  );
}
