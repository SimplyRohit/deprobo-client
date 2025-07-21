import { icons } from "@/lib/types";

export default function Footer() {
  return (
    <footer className="m500:text-sm  z-30 md:px-4 px-2 py-5 text-center font-base text-black flex items-center justify-between">
      <h1 className="text-4xl ml-1 font-black text-white">Deprobo</h1>
      <span className="hidden md:block text-white">
        Make the Blockchain and Decentralized Finance accessible to everyone.
      </span>
      <div className="flex justify-center gap-2">
        {icons.map(({ Icon, className }, index) => (
          <button
            key={index}
            className="inline-flex shadow-shadow items-center text-text justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white dark:bg-darkBg dark:text-darkText border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none h-10 w-10"
          >
            <Icon className={`lucide ${className}`} />
          </button>
        ))}
      </div>
    </footer>
  );
}
