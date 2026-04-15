import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppFloat() {
  const phoneNumber = "919696933327"; // 👈 apna number (country code ke sath, + nahi)
  const message = "Hi, I want to know more about your services";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      style={{
        background: "linear-gradient(135deg, #25D366, #1ebe5d)",
      }}
    >
      <FaWhatsapp className="text-white text-2xl" />
    </a>
  );
}