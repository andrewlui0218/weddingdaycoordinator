import { Phone, MessageCircle } from 'lucide-react';

export default function UsefulInfo() {
  const vendors = [
    { role: "Photographer", name: "KelvinShot 呀政", phone: "64364777" },
    { role: "MUA", name: "MissAqua", phone: "97105240" },
    { role: "Venue Coordinator (WM Hotel)", name: "Bonnie Yau", phone: "56940346" },
    { role: "Deco", name: "Mygiftdecoration", phone: "34887933" },
    { role: "Celebrant", name: "Mr. Simon Chan", phone: "91821736" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-glass-border pb-5">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Useful Information</h2>
          <p className="text-sm text-text-muted mt-1">Floor plans, decoration previews, and vendor contacts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white/30 border border-glass-border rounded-2xl p-5">
            <h3 className="text-[11px] uppercase tracking-widest text-accent-gold mb-4">Floor Plan (Grand Ball Room)</h3>
            <div className="bg-white/40 rounded-xl flex items-center justify-center text-text-muted border border-glass-border overflow-hidden relative group">
              <img 
                src="/floor-plan.jpg" 
                alt="Grand Ballroom Floor Plan" 
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/40 aspect-video">
                <p className="text-sm font-medium text-text-main">Floor Plan Image</p>
                <p className="text-xs text-text-muted mt-1">Please ensure floor-plan.jpg is in the public folder.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/30 border border-glass-border rounded-2xl p-5">
            <h3 className="text-[11px] uppercase tracking-widest text-accent-gold mb-4">Vendor Contacts</h3>
            <ul className="space-y-3 text-[13px]">
              {vendors.map((vendor, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-glass-border/50 last:border-0">
                  <div className="mb-2 sm:mb-0">
                    <span className="font-medium text-text-main block">{vendor.role}</span>
                    <span className="text-text-muted">{vendor.name}</span>
                  </div>
                  {vendor.phone ? (
                    <div className="flex items-center gap-3">
                      <span className="text-text-muted text-xs font-mono">{vendor.phone.replace(/(\d{4})(\d{4})/, '$1 $2')}</span>
                      <div className="flex gap-1">
                        <a href={`tel:+852${vendor.phone}`} className="p-1.5 bg-white/40 rounded-full text-text-muted hover:bg-white/60 hover:text-text-main transition-colors">
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                        <a href={`https://wa.me/852${vendor.phone}`} target="_blank" rel="noreferrer" className="p-1.5 bg-white/40 rounded-full text-text-muted hover:bg-white/60 hover:text-text-main transition-colors">
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <span className="text-text-muted text-xs italic">TBC</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white/30 border border-glass-border rounded-2xl p-5">
          <h3 className="text-[11px] uppercase tracking-widest text-accent-gold mb-4">Decoration Previews (CA Simulation)</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/40 rounded-xl flex items-center justify-center text-text-muted border border-glass-border overflow-hidden relative">
              <img 
                src="/deco-sim-1.jpg" 
                alt="Decoration Simulation 1" 
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/40 aspect-video">
                <p className="text-sm font-medium text-text-main">Simulation 1</p>
                <p className="text-xs text-text-muted mt-1">Ensure deco-sim-1.jpg is in public folder</p>
              </div>
            </div>
            <div className="bg-white/40 rounded-xl flex items-center justify-center text-text-muted border border-glass-border overflow-hidden relative">
              <img 
                src="/deco-sim-2.jpg" 
                alt="Decoration Simulation 2" 
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/40 aspect-video">
                <p className="text-sm font-medium text-text-main">Simulation 2</p>
                <p className="text-xs text-text-muted mt-1">Ensure deco-sim-2.jpg is in public folder</p>
              </div>
            </div>
            <div className="bg-white/40 rounded-xl flex items-center justify-center text-text-muted border border-glass-border overflow-hidden relative">
              <img 
                src="/deco-sim-3.jpg" 
                alt="Decoration Simulation 3" 
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/40 aspect-video">
                <p className="text-sm font-medium text-text-main">Simulation 3</p>
                <p className="text-xs text-text-muted mt-1">Ensure deco-sim-3.jpg is in public folder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
