'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <a
      href={`https://wa.me/${waNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-7 right-7 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle size={24} color="white" />
    </a>
  );
}
