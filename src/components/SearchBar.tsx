import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="size-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск контактов..."
        className="w-full pl-12 pr-12 py-3 bg-slate-100 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <div className="bg-slate-300 hover:bg-slate-400 rounded-full p-1 transition-colors">
              <X className="size-4 text-white" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
