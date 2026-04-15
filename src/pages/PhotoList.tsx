import { useState } from 'react';

interface PhotoItem {
  id: number;
  guest: string;
}

const initialPhotos: PhotoItem[] = [
  { id: 1, guest: "新郎父母" },
  { id: 2, guest: "新郎呂氏親戚 (table 1)" },
  { id: 3, guest: "新郎張氏親戚 (table 3)" },
  { id: 4, guest: "新郎許氏親戚 (table 6)" },
  { id: 5, guest: "新郎馮氏親戚 (table 9)" },
  { id: 6, guest: "雙方家人" },
  { id: 7, guest: "新娘家人" },
  { id: 8, guest: "新娘親戚 (table 2)" },
  { id: 9, guest: "新郎父母朋友 (table 10)" },
  { id: 10, guest: "兄弟姐妹團" },
  { id: 11, guest: "新郎AHNH PHYSIO同事 (Table 16)" },
  { id: 12, guest: "新郎AHNH PHYSIO同事 (Table 20)" },
  { id: 13, guest: "新郎AHNH PHYSIO同事 (Table 21)" },
  { id: 14, guest: "新郎AHNH PHYSIO同事 (Table 22)" },
  { id: 15, guest: "新郎大學同學 (table 15)" },
  { id: 16, guest: "新郎中學同學 (table 13)" },
  { id: 17, guest: "新娘AHNH F2同事 (Table 8)" },
  { id: 18, guest: "新娘AHNH F2同事 (Table 11)" },
  { id: 19, guest: "新娘AHNH F2同事 (Table 12)" },
  { id: 20, guest: "新娘AHNH F2同事(Flora, Rainbow and husband) (table 5)" },
  { id: 21, guest: "新娘大學同學 (table 5)" },
  { id: 22, guest: "新娘中學同學 (table 18)" },
  { id: 23, guest: "自由合照" },
];

export default function PhotoList() {
  const [photos] = useState<PhotoItem[]>(initialPhotos);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-glass-border pb-5 shrink-0">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Photo List</h2>
          <p className="text-sm text-text-muted mt-1">Checklist for group photos.</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-white/30 border border-glass-border rounded-2xl">
        <div className="overflow-y-auto p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="py-3 px-4 text-[11px] uppercase tracking-widest text-accent-gold font-semibold w-16 text-center">No.</th>
                <th className="py-3 px-4 text-[11px] uppercase tracking-widest text-accent-gold font-semibold">Guest</th>
              </tr>
            </thead>
            <tbody>
              {photos.map((photo) => (
                <tr 
                  key={photo.id} 
                  className="border-b border-glass-border/50 last:border-0 transition-colors hover:bg-white/40"
                >
                  <td className="py-3 px-4 text-sm font-mono text-text-muted text-center">
                    {photo.id}
                  </td>
                  <td className="py-3 px-4 text-[15px] text-text-main font-medium">
                    {photo.guest}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
