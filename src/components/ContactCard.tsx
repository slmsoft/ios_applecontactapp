import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteContact } from "../store/contactsSlice";
import { Contact } from "../types/contact";
import { Mail, Phone, Trash2, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { motion, useMotionValue, useTransform, PanInfo } from "motion/react";

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const x = useMotionValue(0);
  
  // Red line width grows as you swipe left (use absolute value)
  const redLineWidth = useTransform(x, (value) => Math.abs(Math.min(value, 0)));

  const handleCardClick = () => {
    if (!isDeleting) {
      navigate(`/edit/${contact.id}`);
    }
  };

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const threshold = -80;
    
    // If swiped left beyond threshold - delete immediately
    if (info.offset.x < threshold) {
      setIsDeleting(true);
      
      // Animate further left before deleting
      await new Promise(resolve => {
        x.set(-200);
        setTimeout(resolve, 200);
      });
      
      // Delete contact
      try {
        await dispatch(deleteContact(contact.id)).unwrap();
        toast.success("Контакт удалён");
      } catch (error) {
        toast.error("Ошибка при удалении контакта");
        // Reset if error
        setIsDeleting(false);
        x.set(0);
      }
    } else {
      // Swipe back to normal
      x.set(0);
    }
  };

  const getInitials = (name: string) => {
    const words = name.split(" ");
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      "bg-slate-400",
      "bg-blue-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-green-400",
      "bg-orange-400",
      "bg-red-400",
      "bg-indigo-400",
      "bg-teal-400",
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="relative overflow-hidden" style={{ borderRadius: '20px' }}>
      {/* Red delete line - grows from right side when swiping left */}
      <motion.div 
        style={{ 
          width: redLineWidth,
        }}
        className="absolute right-0 top-0 bottom-0 bg-red-500 flex items-center justify-center"
      >
        <Trash2 className="size-7 text-white" />
      </motion.div>

      {/* White card that slides left */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onClick={handleCardClick}
        whileTap={{ scale: isDeleting ? 1 : 0.98 }}
        className="bg-white shadow-sm border border-slate-200/50 overflow-hidden cursor-pointer relative"
        style={{ borderRadius: '20px' }}
      >
        <div className="p-2 sm:p-4 flex items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 rounded-full ${getAvatarColor(
              contact.id
            )} flex items-center justify-center text-white shadow-md`}
          >
            <span className="text-sm sm:text-xl">{getInitials(contact.name)}</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-slate-900 truncate mb-0.5 sm:mb-1">{contact.name}</h3>
            <div className="space-y-0 sm:space-y-0.5">
              <div className="flex items-center gap-2 text-slate-500">
                <Phone className="size-3 sm:size-3.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm truncate">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail className="size-3 sm:size-3.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm truncate">{contact.email}</span>
              </div>
            </div>
          </div>

          {/* Chevron */}
          <div className="flex-shrink-0">
            <ChevronRight className="size-4 sm:size-5 text-slate-300" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}