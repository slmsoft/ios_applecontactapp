import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchContacts, setSearchQuery } from "../store/contactsSlice";
import { SearchBar } from "../components/SearchBar";
import { ContactCard } from "../components/ContactCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { EmptyState } from "../components/EmptyState";
import { ErrorMessage } from "../components/ErrorMessage";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

export function ContactsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { filteredContacts, searchQuery, loading, error } = useSelector(
    (state: RootState) => state.contacts
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleAddContact = () => {
    navigate("/add");
  };

  if (loading && filteredContacts.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => dispatch(fetchContacts())} />;
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-slate-900">Контакты</h1>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddContact}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="size-5" />
                <span className="hidden sm:inline">Добавить</span>
              </motion.button>
            </div>
            <SearchBar value={searchQuery} onChange={handleSearch} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 pt-4">
        <div className="max-w-2xl mx-auto">
          {filteredContacts.length === 0 ? (
            <EmptyState searchQuery={searchQuery} onAddContact={handleAddContact} />
          ) : (
            <div className="space-y-1.5 sm:space-y-3">
              {filteredContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}