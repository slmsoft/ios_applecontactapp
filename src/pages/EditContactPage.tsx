import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateContact, fetchContactById } from "../store/contactsSlice";
import { Input } from "../components/ui/input";
import { X, Check, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export function EditContactPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contactId, setContactId] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id);
      setContactId(numericId);
      setIsLoading(true);
      dispatch(fetchContactById(numericId))
        .unwrap()
        .then((contact) => {
          setFormData({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          });
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Ошибка загрузки контакта");
          navigate("/");
        });
    }
  }, [id, dispatch, navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(
        updateContact({ ...formData, id: contactId })
      ).unwrap();
      toast.success("Контакт обновлён");
      navigate("/");
    } catch (error) {
      toast.error("Ошибка при обновлении контакта");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "";
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 bg-white rounded-full animate-pulse" />
            <div className="h-10 w-20 bg-white rounded-full animate-pulse" />
          </div>
          
          {/* Avatar skeleton */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-white/50 backdrop-blur-sm animate-pulse mb-4" />
            <div className="h-6 w-40 bg-white/50 rounded-lg animate-pulse" />
          </div>

          {/* Form skeleton */}
          <div className="space-y-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-4 space-y-4 animate-pulse">
              <div className="h-12 bg-slate-100 rounded-xl" />
              <div className="h-px bg-slate-200" />
              <div className="h-12 bg-slate-100 rounded-xl" />
              <div className="h-px bg-slate-200" />
              <div className="h-12 bg-slate-100 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            disabled={isSubmitting}
            className="w-10 h-10 rounded-full bg-white shadow-sm hover:bg-slate-50 flex items-center justify-center transition-colors"
          >
            <X className="size-5 text-slate-700" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-6 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Check className="size-4" />
            <span>{isSubmitting ? "Сохранение..." : "Готово"}</span>
          </motion.button>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getAvatarColor(contactId)} flex items-center justify-center text-white shadow-xl mb-4 ring-4 ring-white/30`}>
            <span className="text-5xl">{getInitials(formData.name)}</span>
          </div>
          <button className="text-blue-500 hover:text-blue-600 transition-colors">
            Добавить фото
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Personal Info Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm overflow-hidden">
            {/* Name Field */}
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Имя"
                  className="border-0 bg-transparent px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 pl-1">{errors.name}</p>
              )}
            </div>

            {/* Company Field */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Компания"
                  className="border-0 bg-transparent px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm overflow-hidden">
            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                  <Phone className="size-3 text-white" />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-blue-500 text-sm">сотовый</span>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Телефон"
                    className="border-0 bg-transparent px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1 pl-9">{errors.phone}</p>
              )}
            </div>
            
            <div className="border-t border-slate-100 px-4 py-3">
              <button className="flex items-center gap-3 text-blue-500 hover:text-blue-600">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xl leading-none">+</span>
                </div>
                <span>добавить телефон</span>
              </button>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm overflow-hidden">
            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Mail className="size-3 text-white" />
                </div>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border-0 bg-transparent px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 pl-9">{errors.email}</p>
              )}
            </div>

            <div className="border-t border-slate-100 px-4 py-3">
              <button className="flex items-center gap-3 text-blue-500 hover:text-blue-600">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xl leading-none">+</span>
                </div>
                <span>добавить e-mail</span>
              </button>
            </div>
          </div>

          {/* Notes Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm overflow-hidden">
            <div className="px-4 py-3">
              <button className="flex items-center gap-3 text-blue-500 hover:text-blue-600 w-full">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xl leading-none">+</span>
                </div>
                <span>добавить местоимения</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}