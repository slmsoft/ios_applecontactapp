import { motion } from "motion/react";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4 border-4 border-slate-200 border-t-blue-500 rounded-full"
        />
        <p className="text-slate-600">Загрузка контактов...</p>
      </div>
    </div>
  );
}
