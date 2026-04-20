'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat({ waNumber }: { waNumber?: string }) {
  const number = waNumber || '6285771826637';

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-7 right-7 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle size={24} color="white" />
    </a>
  );
}
