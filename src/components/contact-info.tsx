import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function ContactInfo() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3">О компании</h3>
          <p className="text-slate-600">
            Мы работаем для вас каждый день, предоставляя качественные услуги 
            и профессиональную поддержку. Наша команда всегда готова помочь 
            и ответить на все ваши вопросы.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="mb-4">Следите за нами</h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={`bg-slate-900 text-white p-3 rounded-lg transition-colors ${social.color}`}
              >
                <social.icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="mb-3">Часто задаваемые вопросы</h3>
          <p className="text-slate-600 mb-3">
            Перед тем как написать нам, посмотрите раздел с часто задаваемыми 
            вопросами - возможно, вы найдете ответ там.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
            Перейти к FAQ →
          </a>
        </div>
      </div>
    </div>
  );
}
