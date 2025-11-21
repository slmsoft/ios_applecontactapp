import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="size-12 text-red-500" />
        </div>
        <h2 className="text-slate-900 mb-2">Произошла ошибка</h2>
        <p className="text-slate-600 mb-6">{message}</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="size-5" />
          Повторить попытку
        </motion.button>
      </motion.div>
    </div>
  );
}
