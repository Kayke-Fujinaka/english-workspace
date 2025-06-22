export const Navbar = () => {
  const NAVBAR_ITEMS = [
    { id: "home", label: "Home" },
    { id: "flashcards", label: "Flashcards" },
    { id: "leitura", label: "Leitura" },
  ];

  return (
    <div className="mt-6 flex justify-center items-center">
      <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm">
        {NAVBAR_ITEMS.map(({ id, label }, index) => {
          const isFirst = index === 0;
          const isLast = index === NAVBAR_ITEMS.length - 1;

          return (
            <button
              key={id}
              className={`cursor-pointer px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:bg-gray-50 transition-colors ${
                isFirst ? "rounded-l-lg" : ""
              } ${isLast ? "rounded-r-lg" : "border-r border-gray-200"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
