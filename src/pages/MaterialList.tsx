import { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

const ROOMS = ["出門房", "入門房", "外影", "GBR Reception", "證婚", "新娘隨身", "新郎隨身"];
const BAGS = ["Bag A", "Bag B", "Bag C", "Bag D"];

const initialMaterials = [
  { id: 1, name: "敬茶用品 (茶具, 跪墊, 紅棗等)", room: "出門房", bag: "Bag A", status: "Pending" },
  { id: 2, name: "金器 (龍鳯鈪, 花鏈, 戒指)", room: "出門房", bag: "Bag A", status: "Pending" },
  { id: 3, name: "結婚戒指一對, 求婚戒指", room: "證婚", bag: "新娘隨身", status: "Pending" },
  { id: 4, name: "開門利是, 兄弟利是", room: "入門房", bag: "Bag B", status: "Pending" },
  { id: 5, name: "花球 (真花, 假花)", room: "外影", bag: "Bag C", status: "Pending" },
  { id: 6, name: "簽到簿, 人情袋, 文具", room: "GBR Reception", bag: "Bag D", status: "Pending" },
];

export default function MaterialList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setMaterials([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, 'materials'),
      (snapshot) => {
        const materialData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        materialData.sort((a: any, b: any) => {
          if (a.originalId && b.originalId) return a.originalId - b.originalId;
          return a.name.localeCompare(b.name);
        });
        
        setMaterials(materialData);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'materials');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'materials', id), {
        status: currentStatus === 'Pending' ? 'Packed' : 'Pending'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `materials/${id}`);
    }
  };

  const initializeData = async () => {
    if (!user) return;
    setInitializing(true);
    try {
      for (const item of initialMaterials) {
        await setDoc(doc(db, 'materials', item.id.toString()), {
          name: item.name,
          room: item.room,
          bag: item.bag,
          status: item.status,
          originalId: item.id
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'materials');
    } finally {
      setInitializing(false);
    }
  };

  const filteredMaterials = materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.bag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-text-muted">Please sign in to view and manage materials.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-glass-border pb-5">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Material Inventory</h2>
          <p className="text-sm text-text-muted mt-1">Track items by room and bag.</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="https://docs.google.com/spreadsheets/d/1cF_MZC4Mf3OsOr_SznX7nvs2UH2jzF1Xh4FDiW8Mv30/edit?gid=40134156#gid=40134156" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/40 hover:bg-white/60 border border-glass-border px-4 py-2 rounded-xl text-sm font-medium text-text-main transition-colors shadow-sm"
          >
            <span>物資表</span>
            <ExternalLink size={14} className="text-accent-gold" />
          </a>
          <button className="bg-accent-gold text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent-gold/90 transition-colors shadow-sm hidden sm:block">
            Add Item
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search materials, rooms, or bags..." 
            className="w-full pl-10 pr-4 py-2 bg-white/40 border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-main placeholder:text-text-muted"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center px-4 py-2 border border-glass-border rounded-lg bg-white/40 text-text-main hover:bg-white/60 transition-colors">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {ROOMS.map(room => (
          <span key={room} className="px-2 py-1 bg-white/40 border border-glass-border rounded-md text-[11px] text-text-muted cursor-pointer hover:bg-white/60">
            {room}
          </span>
        ))}
      </div>

      <div className="bg-white/30 border border-glass-border rounded-2xl p-5">
        <h3 className="text-[11px] uppercase tracking-widest text-accent-gold mb-4">All Materials</h3>
        
        {loading ? (
          <div className="text-center py-8 text-text-muted">Loading materials...</div>
        ) : materials.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-muted mb-4">No materials found in the database.</p>
            <button 
              onClick={initializeData}
              disabled={initializing}
              className="px-4 py-2 bg-accent-gold text-white rounded-lg hover:bg-accent-gold/90 transition-colors disabled:opacity-50"
            >
              {initializing ? 'Initializing...' : 'Load Initial Material List'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMaterials.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-glass-border/50 pb-3 last:border-0 last:pb-0">
                <div>
                  <span className="text-[13px] font-medium text-text-main block mb-1">{item.name}</span>
                  <div className="flex gap-1">
                    <span className="inline-block px-2 py-1 rounded-md bg-black/5 text-[11px] text-text-muted">
                      #{item.room}
                    </span>
                    <span className="inline-block px-2 py-1 rounded-md bg-black/5 text-[11px] text-text-muted">
                      #{item.bag}
                    </span>
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => toggleStatus(item.id, item.status)}
                    className={`inline-block px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${item.status === 'Packed' ? 'bg-[#e6ffed] text-[#155724]' : 'bg-[#fff3cd] text-[#856404]'}`}
                  >
                    {item.status}
                  </button>
                </div>
              </div>
            ))}
            {filteredMaterials.length === 0 && (
              <div className="text-center py-4 text-sm text-text-muted">No materials found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
