"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuCheck, LuX } from "react-icons/lu";
import { toast } from "react-toastify";
import { validate as isValidUUID } from "uuid";

import { Loader, Progress } from "@/components";
import { Card } from "@/interfaces/card.interface";
import api from "@/services/api";

interface ReviewSession {
  cards: Card[];
  currentIndex: number;
  showAnswer: boolean;
  completed: boolean;
}

export default function ReviewPage() {
  const { deckId } = useParams();
  const router = useRouter();

  const [isLoadingCards, setIsLoadingCards] = useState<boolean>(true);
  const [sessionReview, setSessionReview] = useState<ReviewSession>({
    cards: [],
    currentIndex: 0,
    showAnswer: false,
    completed: false,
  });
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  useEffect(() => {
    const fetchCardsForReview = async () => {
      setIsLoadingCards(true);

      if (!isValidUUID(deckId)) {
        router.push("/flashcards");
        return;
      }

      try {
        const { data } = await api.get(`/cards/review?deckId=${deckId}`);
        setSessionReview((prev) => ({ ...prev, cards: data.cards }));
      } catch (error) {
        console.error("[Review] - Error fetching cards: ", error);
        router.push("/flashcards");
      } finally {
        setIsLoadingCards(false);
      }
    };

    fetchCardsForReview();
  }, [deckId, router]);

  const currentCard = sessionReview.cards[sessionReview.currentIndex];

  const handleReview = async (isCorrect: boolean) => {
    if (!currentCard || isReviewing) return;

    setIsReviewing(true);

    try {
      await api.post(`/cards/${currentCard.id}/review`, { isCorrect });

      const nextIndex = sessionReview.currentIndex + 1;
      if (nextIndex >= sessionReview.cards.length) {
        setSessionReview((prev) => ({ ...prev, completed: true }));
        return;
      }

      setSessionReview((prev) => ({
        ...prev,
        currentIndex: nextIndex,
        showAnswer: false,
      }));
    } catch (error) {
      console.error("[Review] - Error reviewing card: ", error);
      toast.error("Error reviewing card");
    } finally {
      setIsReviewing(false);
    }
  };

  if (isLoadingCards) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  if (sessionReview.completed) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6 flex flex-col gap-2">
            <div className="w-14 h-14 text-2xl mb-2 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              🎉
            </div>
            <h2 className="font-bold text-gray-800 text-lg">
              Congratulations!
            </h2>
            <p className="text-gray-600 text-sm">
              You have completed the reviews.
            </p>
          </div>

          <Link
            href="/flashcards"
            className="w-full flex items-center justify-center text-sm bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Decks
          </Link>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              There are no cards available for review.
            </p>
            <Link
              href="/flashcards"
              className="w-full flex items-center justify-center text-sm bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/flashcards"
            className="text-gray-600 hover:text-gray-800 text-sm flex items-center cursor-pointer"
          >
            <LuArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Card {sessionReview.currentIndex + 1} /{" "}
              {sessionReview.cards.length}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <Progress
              currentIndex={sessionReview.currentIndex}
              total={sessionReview.cards.length}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm min-h-[400px] flex flex-col">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Question
              </h3>
              <p className="text-gray-900 leading-relaxed break-all">
                {currentCard.front}
              </p>
            </div>
          </div>

          {sessionReview.showAnswer && (
            <div className="border-t border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Answer
              </h3>
              <p className="text-gray-900 leading-relaxed break-all text-center mt-2 mb-6">
                {currentCard.back}
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleReview(false)}
                  disabled={isReviewing}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm"
                >
                  {isReviewing ? (
                    <Loader color="white" size={5} className="mr-2" />
                  ) : (
                    <LuX className="w-5 h-5 mr-2" />
                  )}
                  Incorrect
                </button>

                <button
                  onClick={() => handleReview(true)}
                  disabled={isReviewing}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm"
                >
                  {isReviewing ? (
                    <Loader color="white" size={5} className="mr-2" />
                  ) : (
                    <LuCheck className="w-5 h-5 mr-2" />
                  )}
                  Correct
                </button>
              </div>
            </div>
          )}

          {!sessionReview.showAnswer && (
            <div className="p-8 border-t border-gray-200">
              <button
                onClick={() =>
                  setSessionReview((prev) => ({ ...prev, showAnswer: true }))
                }
                className="w-full text-sm bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Show Answer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
