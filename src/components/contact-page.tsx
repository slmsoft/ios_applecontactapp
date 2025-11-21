import { ContactForm } from "./contact-form";
import { ContactInfo } from "./contact-info";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-4">Свяжитесь с нами</h1>
          <p className="text-center text-slate-300 max-w-2xl mx-auto">
            Мы всегда рады ответить на ваши вопросы и помочь вам. Свяжитесь с нами любым удобным способом.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6">Отправить сообщение</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="mb-6">Контактная информация</h2>
            <ContactInfo />
            
            {/* Quick Contact Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Phone className="size-5 text-blue-600" />
                  </div>
                  <h3>Телефон</h3>
                </div>
                <p className="text-slate-600">+7 (495) 123-45-67</p>
                <p className="text-slate-600">+7 (800) 555-35-35</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Mail className="size-5 text-green-600" />
                  </div>
                  <h3>Email</h3>
                </div>
                <p className="text-slate-600">info@company.ru</p>
                <p className="text-slate-600">support@company.ru</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MapPin className="size-5 text-purple-600" />
                  </div>
                  <h3>Адрес</h3>
                </div>
                <p className="text-slate-600">
                  Москва, ул. Примерная, д. 10
                  <br />
                  офис 501
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="size-5 text-orange-600" />
                  </div>
                  <h3>Режим работы</h3>
                </div>
                <p className="text-slate-600">Пн-Пт: 9:00 - 18:00</p>
                <p className="text-slate-600">Сб-Вс: Выходной</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="mb-6">Наше местоположение</h2>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.4170113277773!2d37.61716431592303!3d55.75582998055679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQstCw!5e0!3m2!1sru!2sru!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
