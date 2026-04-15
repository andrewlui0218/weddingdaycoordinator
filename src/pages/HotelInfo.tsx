export default function HotelInfo() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-glass-border pb-5">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Hotel & Floorplan</h2>
          <p className="text-sm text-text-muted mt-1">Room details and logistics.</p>
        </div>
      </div>

      <div className="bg-white/30 border border-glass-border rounded-2xl p-8 text-center flex flex-col justify-center items-center">
        <div className="max-w-md mx-auto space-y-4">
          <h3 className="text-sm font-medium text-text-main mb-2">Awaiting Details</h3>
          <p className="text-xs text-text-muted">
            You mentioned details for the hotel room information will be given later. 
            Once you have them, let me know and I will structure them beautifully here!
          </p>
        </div>
      </div>
    </div>
  );
}
