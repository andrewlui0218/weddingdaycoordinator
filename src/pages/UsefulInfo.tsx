import { Phone, MessageCircle } from 'lucide-react';

export default function UsefulInfo() {
  const vendors = [
    { role: "Photographer", name: "KelvinShot 呀政", phone: "64364777" },
    { role: "MUA", name: "MissAqua", phone: "97105240" },
    { role: "Venue Coordinator (WM Hotel)", name: "Bonnie Yau", phone: "56940346" },
    { role: "Deco", name: "Mygiftdecoration", phone: "34887933" },
    { role: "Celebrant", name: "Mr. Simon Chan", phone: "91821736" },
    { role: "PhotoBooth", name: "Giggles", phone: "97655608" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-glass-border pb-5">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Useful Information</h2>
          <p className="text-sm text-text-muted mt-1">Floor plans, decoration previews, and vendor contacts.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* 1. Vendor Contacts */}
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

        {/* 2. Floor Plan */}
        <div className="bg-white/30 border border-glass-border rounded-2xl p-5">
          <h3 className="text-[11px] uppercase tracking-widest text-accent-gold mb-4">Floor Plan (Grand Ball Room)</h3>
          <div className="bg-white/40 rounded-xl flex items-center justify-center text-text-muted border border-glass-border overflow-hidden relative group">
            <img 
              src={`${import.meta.env.BASE_URL}floor-plan.jpg`} 
              alt="Grand Ballroom Floor Plan" 
              className="w-full h-auto object-contain max-h-[600px]"
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

        {/* 3. Decoration Previews */}
        <div className="bg-white/30 border border-glass-border rounded-2xl p-5">
          <h3 className="text-[11px] uppercase tracking-widest text-accent-gold mb-4">Decoration Previews (CA Simulation)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/40 rounded-xl flex items-center justify-center text-text-muted border border-glass-border overflow-hidden relative">
              <img 
                src={`${import.meta.env.BASE_URL}deco-sim-1.jpg`} 
                alt="Decoration Simulation 1" 
                className="w-full h-auto object-contain max-h-[400px]"
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
                src={`${import.meta.env.BASE_URL}deco-sim-2.jpg`} 
                alt="Decoration Simulation 2" 
                className="w-full h-auto object-contain max-h-[400px]"
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
                src={`${import.meta.env.BASE_URL}deco-sim-3.jpg`} 
                alt="Decoration Simulation 3" 
                className="w-full h-auto object-contain max-h-[400px]"
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

        {/* 4. Decoration Detail */}
        <div className="bg-white/30 border border-glass-border rounded-2xl p-5">
          <h3 className="text-[11px] uppercase tracking-widest text-accent-gold mb-4">Decoration Detail</h3>
          <div className="text-[13px] text-text-main space-y-4">
            <div>
              <p className="font-semibold text-sm flex justify-between">
                <span>Wedding Decoration Deluxe Package:</span>
                <span className="font-normal text-text-muted">(2025 Nov Expo promotion)</span>
              </p>
              <ul className="mt-2 space-y-1.5 text-text-muted">
                <li>• 8 x 16 尺 3 層布料 + 半噴畫背景板</li>
                <li>• 新人名牌 (專人設計)</li>
                <li>• 迎賓枱連飾物佈置 1 張 (12尺內)</li>
                <li>• 蛋糕枱佈置 1 張</li>
                <li>• 證婚枱佈置 1 張</li>
                <li>• 油畫架佈置 1 個</li>
                <li>• 座地舞台射燈 4 支</li>
                <li>• 主舞台 花柱 2 對</li>
                <li>• 主舞台地花 4 組</li>
                <li>• 主舞台白色長毛地毯 (全台)</li>
              </ul>
            </div>
            
            <div>
              <p className="font-semibold text-sm">Extra item</p>
              <ul className="mt-2 space-y-1.5 text-text-muted">
                <li>• 背景板加大 10 x 20 尺</li>
                <li>• 相簿枱連飾物佈置</li>
                <li>• March-in 30ft 長毛地毯</li>
                <li>• March-in 地花 3 對</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-glass-border/50 text-text-muted">
              <p>免起架費, 運輸, 安裝及清拆費用</p>
            </div>
          </div>
        </div>

        {/* 5. Photobooth Detail */}
        <div className="bg-white/30 border border-glass-border rounded-2xl p-5">
          <h3 className="text-[11px] uppercase tracking-widest text-accent-gold mb-4">Photobooth Detail</h3>
          <div className="text-[13px] text-text-main space-y-3">
            <p className="font-semibold text-sm">Giggles Photo Booth Mar Flash Sale / <span className="text-[#3b82f6]">SLENDER BOOTH</span></p>
            <ul className="list-disc pl-4 space-y-1.5 text-text-muted">
              <li>2 hours service</li>
              <li>1 Photo Booth</li>
              <li>Unlimited shooting (Photo & Boomerang)</li>
              <li>Unlimited printing 2"x6"</li>
              <li>Instant QR code download</li>
              <li>Fun props</li>
              <li>Designed frame (Select from library) / Qty: 1</li>
              <li>Card sleeves</li>
              <li>On ground crew</li>
              <li>Return all soft copies (within 5-7 working days)</li>
              <li>Client to cover 2-way transportation (Claim with receipts)</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
