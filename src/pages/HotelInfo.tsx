export default function HotelInfo() {
  const roomData = [
    {
      room: "出門房",
      roomType: "Suite Sea View Balcony (with breakfast)",
      roomNumber: "2107",
      date: "24/4-25/4 (1 night)",
      guests: "Christy, Christy 媽媽",
      keyCards: 6,
      ownerName: "Christy 媽媽, Yannie x2, Rainbow, Vicky, Dominic",
      note: "最後交曬比Yannie (出門房), Kelly (入門房)"
    },
    {
      room: "入門房",
      roomType: "Suite Terrace Access (with breakfast)",
      roomNumber: "2003",
      date: "24/4-25/4 (1 night)",
      guests: "Andrew, Andrew 爸爸媽媽",
      keyCards: 6,
      ownerName: "Andrew 媽媽, Andrew爸爸, Andrew (兄弟), Yannie, Kelly, Vicky",
      note: "最後交曬比Yannie (出門房), Kelly (入門房)"
    },
    {
      room: "Room A",
      roomType: "Premium Balcony",
      roomNumber: "2101",
      date: "24/4-26/4 (2 nights)",
      guests: "Rainbow, TC",
      keyCards: 6,
      ownerName: "Christy 媽媽, Yinyin, Dominic, Vicky, Rainbow, TC",
      note: "最後交曬比Rainbow"
    },
    {
      room: "Room B",
      roomType: "Standard",
      roomNumber: "2103",
      date: "24/4-26/4 (2 nights)",
      guests: "1st: Christy 爸爸, Dominic\n2nd: Christy, Andrew",
      keyCards: 6,
      ownerName: "Christy 爸爸, Andrew (兄弟), Yannie, Dominic, Emily, Anna",
      note: "最後交曬比Andrew"
    }
  ];

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-end border-b border-glass-border pb-5 shrink-0">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Hotel Room Info</h2>
          <p className="text-sm text-text-muted mt-1">Room assignments and logistics details.</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto min-h-0 bg-white/40 border border-glass-border rounded-2xl">
        <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
          <thead className="bg-black/5 text-text-muted border-b border-glass-border">
            <tr>
              <th className="px-5 py-4 font-medium min-w-[100px]">房間 Room</th>
              <th className="px-5 py-4 font-medium min-w-[160px]">房型 Room type</th>
              <th className="px-5 py-4 font-medium min-w-[100px]">Room no.</th>
              <th className="px-5 py-4 font-medium min-w-[140px]">日期 Dates</th>
              <th className="px-5 py-4 font-medium min-w-[160px]">住客 Guests</th>
              <th className="px-5 py-4 font-medium whitespace-nowrap">房卡數量 Keys</th>
              <th className="px-5 py-4 font-medium min-w-[200px]">Owner's name</th>
              <th className="px-5 py-4 font-medium min-w-[180px]">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border/50">
            {roomData.map((row, index) => (
              <tr key={index} className="hover:bg-white/50 transition-colors">
                <td className="px-5 py-4 font-medium text-text-main">{row.room}</td>
                <td className="px-5 py-4 text-text-muted text-[13px]">{row.roomType}</td>
                <td className="px-5 py-4 text-text-muted">{row.roomNumber || "-"}</td>
                <td className="px-5 py-4 text-text-muted text-[13px]">{row.date}</td>
                <td className="px-5 py-4 text-text-main text-[13px] whitespace-pre-line">{row.guests}</td>
                <td className="px-5 py-4 text-center text-accent-gold font-medium">{row.keyCards}</td>
                <td className="px-5 py-4 text-text-muted text-[12px] leading-relaxed">{row.ownerName}</td>
                <td className="px-5 py-4 text-text-muted text-[12px]">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
