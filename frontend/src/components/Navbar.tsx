import Link from "next/link";

export const Navbar = () => {
  const NAVBAR_ITEMS = [
    { id: "home", label: "Home", href: "/" },
    { id: "flashcards", label: "Flashcards", href: "/flashcards" },
    { id: "leitura", label: "Leitura", href: "/leitura" },
  ];

  return (
    <div className="mt-6 flex justify-center items-center">
      <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm">
        {NAVBAR_ITEMS.map(({ id, label, href }, index) => {
          const isFirst = index === 0;
          const isLast = index === NAVBAR_ITEMS.length - 1;

          return (
            <Link
              key={id}
              href={href}
              className={`cursor-pointer font-bold px-6 py-3 text-sm text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:bg-gray-50 transition-colors ${
                isFirst ? "rounded-l-lg" : ""
              } ${isLast ? "rounded-r-lg" : "border-r border-gray-200"}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
