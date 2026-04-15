import { Phone, MessageCircle } from 'lucide-react';

const contacts = [
  { id: 101, role: "Groom (新郎)", name: "Andrew", phone: "51370762" },
  { id: 102, role: "Bride (新娘)", name: "Christy", phone: "63452001" },
  { id: 1, role: "Bridesmaid (姐妹)", name: "Rainbow Lee", phone: "52446957" },
  { id: 2, role: "Bridesmaid (姐妹)", name: "Anna Chau", phone: "90789287" },
  { id: 3, role: "Bridesmaid (姐妹)", name: "Vicky Tsang", phone: "64436416" },
  { id: 4, role: "Bridesmaid (姐妹)", name: "Emily Li", phone: "51250813" },
  { id: 5, role: "Bridesmaid (姐妹)", name: "Yin Yin", phone: "60649134" },
  { id: 6, role: "Bridesmaid (姐妹)", name: "Dominic Chan", phone: "60536630" },
  { id: 7, role: "Groomsman (兄弟)", name: "Lai Hin", phone: "53187036" },
  { id: 8, role: "Groomsman (兄弟)", name: "Ku Ho", phone: "96851285" },
  { id: 9, role: "Groomsman (兄弟)", name: "JP", phone: "51783305" },
  { id: 10, role: "Groomsman (兄弟)", name: "Wah", phone: "64333604" },
  { id: 11, role: "Groomsman (兄弟)", name: "Kelly", phone: "61044222" },
  { id: 12, role: "Groomsman (兄弟)", name: "Yannie", phone: "54452731" },
  { id: 103, role: "MC", name: "Kaming", phone: "61406561" },
  { id: 104, role: "MC", name: "Sophia", phone: "66507231" },
];

export default function ContactList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-glass-border pb-5">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Vendor & Helper Contacts</h2>
          <p className="text-sm text-text-muted mt-1">Quick access to the 12 helpers and key people.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white/30 p-4 rounded-2xl border border-glass-border flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-accent-gold uppercase tracking-wider mb-1">{contact.role}</p>
              <h3 className="text-[15px] font-medium text-text-main">{contact.name}</h3>
              <p className="text-text-muted text-xs">{contact.phone ? contact.phone.replace(/(\d{4})(\d{4})/, '$1 $2') : 'TBC'}</p>
            </div>
            <div className="flex gap-2">
              {contact.phone && (
                <>
                  <a href={`tel:+852${contact.phone}`} className="p-2 bg-white/40 rounded-full text-text-muted hover:bg-white/60 hover:text-text-main transition-colors">
                    <Phone className="h-4 w-4" />
                  </a>
                  <a href={`https://wa.me/852${contact.phone}`} target="_blank" rel="noreferrer" className="p-2 bg-white/40 rounded-full text-text-muted hover:bg-white/60 hover:text-text-main transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
