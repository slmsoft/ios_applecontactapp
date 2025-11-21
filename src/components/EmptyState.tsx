import { UserPlus, Search } from "lucide-react";
import { motion } from "motion/react";

interface EmptyStateProps {
  searchQuery: string;
  onAddContact: () => void;
}

export function EmptyState({ searchQuery, onAddContact }: EmptyStateProps) {
  if (searchQuery) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <Search className="size-12 text-slate-400" />
        </div>
        <h2 className="text-slate-900 mb-2">Ничего не найдено</h2>
        <p className="text-slate-600 text-center max-w-md">
          Не удалось найти контакты, соответствующие запросу "{searchQuery}"
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
        <UserPlus className="size-12 text-white" />
      </div>
      <h2 className="text-slate-900 mb-2">Нет контактов</h2>
      <p className="text-slate-600 text-center max-w-md mb-6">
        У вас пока нет сохранённых контактов. Добавьте первый контакт, чтобы
        начать.
      </p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAddContact}
        className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        Добавить контакт
      </motion.button>
    </motion.div>
  );
}
