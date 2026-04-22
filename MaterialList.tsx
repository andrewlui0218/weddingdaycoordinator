import { useState, useEffect } from 'react';
import { Package, Search, ExternalLink, RefreshCw, Edit2, X, MapPin } from 'lucide-react';
import { collection, onSnapshot, doc, setDoc, updateDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

interface Material {
  id: string;
  name: string;
  room: string;
  bag: string;
  status: 'Pending' | 'Packed';
}

const BAG_STORAGE: Record<string, string> = {
  "黑色大袋A": "出門房",
  "黑色大袋B": "出門房",
  "黑色大袋C (迎親物品)": "入門房",
  "灰白大袋": "出門房",
  "紅色大袋A": "入門房",
  "紅色大袋B": "Room B",
  "紅色大袋B (外影袋)": "Room B",
  "絲花膠盒": "入門房"
};

const BAGS = [
  "黑色大袋A", "黑色大袋B", "灰白大袋", "紅色大袋A", "紅色大袋B", "紅色大袋B (外影袋)",
  "絲花膠盒", "其餘物品", "黑色大袋C (迎親物品)", "回禮茶啡袋", "Christy隨身袋", "Andrew 隨身袋"
];

const LOCATIONS = [
  "出門房", "入門房", "Room A", "Room B", "Reception", "證婚", "TBC"
];

const initialMaterials = [
  { name: "攔門花球", bag: "黑色大袋A", room: "出門房" },
  { name: "新郎GAME物資", bag: "黑色大袋A", room: "出門房" },
  { name: "喜字裝飾（出門房）", bag: "黑色大袋B", room: "出門房" },
  { name: "窗貼（出門房）", bag: "黑色大袋B", room: "出門房" },
  { name: "閃片, 假花瓣", bag: "黑色大袋B", room: "出門房" },
  { name: "文具", bag: "黑色大袋B", room: "出門房" },
  { name: "AA膠, Bluetack, 皺紋膠紙", bag: "黑色大袋B", room: "出門房" },
  { name: "拖板", bag: "黑色大袋B", room: "出門房" },
  { name: "垃圾膠袋", bag: "黑色大袋B", room: "出門房" },
  { name: "金器袋", bag: "黑色大袋B", room: "出門房" },
  { name: "金器label", bag: "黑色大袋B", room: "出門房" },
  { name: "利是袋", bag: "黑色大袋B", room: "出門房" },
  { name: "利是label", bag: "黑色大袋B", room: "出門房" },
  { name: "婚鞋", bag: "黑色大袋B", room: "出門房" },
  { name: "姐妹個人物品袋 (紅白藍)", bag: "黑色大袋B", room: "出門房" },
  { name: "針線盒", bag: "黑色大袋B", room: "出門房" },
  { name: "紅睡衣", bag: "灰白大袋", room: "出門房" },
  { name: "紅拖鞋", bag: "灰白大袋", room: "出門房" },
  { name: "紅棗, 蓮子", bag: "灰白大袋", room: "出門房" },
  { name: "掛扇", bag: "灰白大袋", room: "出門房" },
  { name: "掛鞋", bag: "灰白大袋", room: "出門房" },
  { name: "帖x2", bag: "灰白大袋", room: "出門房" },
  { name: "米", bag: "灰白大袋", room: "出門房" },
  { name: "姐妹, Elaine手花", bag: "灰白大袋", room: "出門房" },
  { name: "Christy爸媽, Dominic襟花", bag: "灰白大袋", room: "出門房" },
  { name: "蒸氣燙斗", bag: "灰白大袋", room: "出門房" },
  { name: "大喜字 1set", bag: "灰白大袋", room: "出門房" },
  { name: "Christy 便服", bag: "灰白大袋", room: "出門房" },
  { name: "比姐妹嘅糖", bag: "灰白大袋", room: "出門房" },
  { name: "暖水壺", bag: "灰白大袋", room: "出門房" },
  { name: "房卡袋", bag: "灰白大袋", room: "出門房" },
  { name: "窗貼", bag: "紅色大袋A", room: "入門房" },
  { name: "文具 (AA膠, Bluetack, 皺紋膠紙)", bag: "紅色大袋A", room: "入門房" },
  { name: "喜字裝飾", bag: "紅色大袋A", room: "入門房" },
  { name: "垃圾膠袋", bag: "紅色大袋A", room: "入門房" },
  { name: "新郎皮鞋", bag: "紅色大袋A", room: "入門房" },
  { name: "跪墊", bag: "紅色大袋A", room: "入門房" },
  { name: "陶瓷敬茶套裝", bag: "紅色大袋A", room: "入門房" },
  { name: "敬茶紙杯", bag: "紅色大袋A", room: "入門房" },
  { name: "紅棗, 蓮子 (女家)", bag: "紅色大袋A", room: "入門房" },
  { name: "黑襪", bag: "紅色大袋A", room: "入門房" },
  { name: "紙巾", bag: "紅色大袋A", room: "入門房" },
  { name: "垃圾袋", bag: "紅色大袋A", room: "入門房" },
  { name: "兄弟個人物品袋", bag: "紅色大袋B", room: "Room B" },
  { name: "有字鏡", bag: "紅色大袋B", room: "Room B" },
  { name: "人樣燈x2", bag: "紅色大袋B", room: "Room B" },
  { name: "尿袋 for 人樣燈", bag: "紅色大袋B", room: "Room B" },
  { name: "Christy 手工木相框", bag: "紅色大袋B", room: "Room B" },
  { name: "紙相機", bag: "紅色大袋B", room: "Room B" },
  { name: "文具(兄弟姊妹用筆, 簽到marker, 原子筆for賓客寫人情封)", bag: "紅色大袋B", room: "Reception" },
  { name: "圓形刺繡", bag: "紅色大袋B", room: "Room B" },
  { name: "Guest list (兄弟姊妹用)", bag: "紅色大袋B", room: "Reception" },
  { name: "誓詞卡", bag: "紅色大袋B", room: "證婚" },
  { name: "結婚證書套", bag: "紅色大袋B", room: "證婚" },
  { name: "簽名羽毛筆", bag: "紅色大袋B", room: "證婚" },
  { name: "未派嘅帖", bag: "紅色大袋B", room: "Reception" },
  { name: "後備利是封", bag: "紅色大袋B", room: "Room B" },
  { name: "心心帶", bag: "紅色大袋B (外影袋)", room: "Room B" },
  { name: "數字&花花氣球+bump", bag: "紅色大袋B (外影袋)", room: "Room B" },
  { name: "泡泡水", bag: "紅色大袋B (外影袋)", room: "Room B" },
  { name: "吹泡泡", bag: "紅色大袋B (外影袋)", room: "Room B" },
  { name: "泡泡槍 (Vicky 24/4 放)", bag: "紅色大袋B (外影袋)", room: "Room B" },
  { name: "紅色/粉紅色假花球", bag: "絲花膠盒", room: "入門房" },
  { name: "兄弟襟花", bag: "絲花膠盒", room: "入門房" },
  { name: "Andrew爸媽, Andrew襟花", bag: "絲花膠盒", room: "入門房" },
  { name: "Christy婚紗 (花花)", bag: "其餘物品", room: "TBC" },
  { name: "Christy婚紗 (Mermaid)", bag: "其餘物品", room: "TBC" },
  { name: "Christy晚裝", bag: "其餘物品", room: "TBC" },
  { name: "Christy頭紗", bag: "其餘物品", room: "TBC" },
  { name: "Andrew西裝x2", bag: "其餘物品", room: "TBC" },
  { name: "媽媽裙x2", bag: "其餘物品", room: "TBC" },
  { name: "MMHK相簿", bag: "其餘物品", room: "Reception" },
  { name: "MMHK油畫", bag: "其餘物品", room: "Reception" },
  { name: "紅傘", bag: "其餘物品", room: "出門房" },
  { name: "金器+人情Gip", bag: "其餘物品", room: "TBC" },
  { name: "真花花球", bag: "其餘物品", room: "TBC" },
  { name: "Christy個人物品袋 (Vicky)", bag: "其餘物品", room: "TBC" },
  { name: "Andrew個人物品袋", bag: "其餘物品", room: "TBC" },
  { name: "結婚戒指", bag: "其餘物品", room: "證婚" },
  { name: "花花x7", bag: "黑色大袋C (迎親物品)", room: "入門房" },
  { name: "扇", bag: "黑色大袋C (迎親物品)", room: "入門房" },
  { name: "眼鏡", bag: "黑色大袋C (迎親物品)", room: "入門房" },
  { name: "開門利是x2", bag: "黑色大袋C (迎親物品)", room: "入門房" },
  { name: "17袋+後備", bag: "回禮茶啡袋", room: "TBC" },
  { name: "nude bra", bag: "Christy隨身袋", room: "TBC" },
  { name: "針線包", bag: "Christy隨身袋", room: "TBC" },
  { name: "雙面膠紙", bag: "Christy隨身袋", room: "TBC" },
  { name: "後備con", bag: "Christy隨身袋", room: "TBC" },
  { name: "身份證 (Christy)", bag: "Christy隨身袋", room: "TBC" },
  { name: "牙縫刷", bag: "Christy隨身袋", room: "TBC" },
  { name: "濕紙巾", bag: "Christy隨身袋", room: "TBC" },
  { name: "化妝師利是", bag: "Christy隨身袋", room: "TBC" },
  { name: "姐妹利是", bag: "Christy隨身袋", room: "TBC" },
  { name: "身份證 (Andrew)", bag: "Andrew 隨身袋", room: "TBC" },
  { name: "牙縫刷 (Andrew)", bag: "Andrew 隨身袋", room: "TBC" },
  { name: "兄弟利是", bag: "Andrew 隨身袋", room: "TBC" },
  { name: "MC利是", bag: "Andrew 隨身袋", room: "TBC" },
  { name: "律師利是", bag: "Andrew 隨身袋", room: "TBC" },
  { name: "攝影師利是", bag: "Andrew 隨身袋", room: "TBC" },
  { name: "WM staff利是", bag: "Andrew 隨身袋", room: "TBC" }
].map((item, index) => ({ id: `m_${index + 1}`, ...item, status: "Pending" as const }));

export default function MaterialList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'bag' | 'location'>('list');
  const [editingItem, setEditingItem] = useState<Material | null>(null);

  const { user } = useAuth();
  const canEdit = !!user;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'materials'),
      (snapshot) => {
        const materialData: Material[] = [];
        snapshot.forEach((doc) => {
          materialData.push({ id: doc.id, ...doc.data() } as Material);
        });
        setMaterials(materialData);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'materials');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const initializeData = async () => {
    if (!canEdit) {
      alert("Please sign in with the passcode first to perform this action.");
      return;
    }
    const confirmReset = window.confirm("This will erase current materials and reset to the master list. Are you sure?");
    if (!confirmReset) return;

    setInitializing(true);
    try {
      // Delete old items first
      const snapshot = await getDocs(collection(db, 'materials'));
      for (const d of snapshot.docs) {
        await deleteDoc(d.ref);
      }
      
      // Add standard items
      for (const item of initialMaterials) {
        await setDoc(doc(db, 'materials', item.id), {
          name: item.name,
          room: item.room,
          bag: item.bag,
          status: item.status
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'materials');
    } finally {
      setInitializing(false);
    }
  };

  const toggleStatus = async (materialId: string, currentStatus: string) => {
    if (!canEdit) {
      alert("Please sign in (passcode: 2504) to edit.");
      return;
    }
    const newStatus = currentStatus === 'Pending' ? 'Packed' : 'Pending';
    try {
      await updateDoc(doc(db, 'materials', materialId), {
        status: newStatus
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `materials/${materialId}`);
    }
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit || !editingItem) return;
    try {
      await updateDoc(doc(db, 'materials', editingItem.id), {
        bag: editingItem.bag,
        room: editingItem.room
      });
      setEditingItem(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `materials/${editingItem.id}`);
    }
  };

  const filteredMaterials = materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.bag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByBag = BAGS.reduce((acc, bag) => {
    acc[bag] = filteredMaterials.filter(m => m.bag === bag);
    return acc;
  }, {} as Record<string, Material[]>);

  const groupedByLocation = LOCATIONS.reduce((acc, loc) => {
    acc[loc] = filteredMaterials.filter(m => m.room === loc);
    return acc;
  }, {} as Record<string, Material[]>);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-glass-border pb-5 shrink-0 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Material List</h2>
          <p className="text-sm text-text-muted mt-1">Track and manage all wedding materials across bags and locations.</p>
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
          {canEdit && (
            <button
              onClick={initializeData}
              disabled={initializing}
              className="flex items-center gap-2 px-4 py-2 bg-accent-gold text-white rounded-xl hover:bg-accent-gold/90 transition-colors disabled:opacity-50 shadow-sm text-sm font-medium"
            >
              <RefreshCw size={14} className={initializing ? "animate-spin" : ""} />
              {initializing ? 'Resetting...' : 'Reset System Database'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search materials, bags, or rooms..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/40 border border-glass-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-main placeholder:text-text-muted shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex bg-white/40 border border-glass-border rounded-xl p-1 shrink-0 overflow-x-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'list' ? 'bg-white shadow-sm text-accent-gold' : 'text-text-muted hover:text-text-main'}`}
          >
            All Items
          </button>
          <button
            onClick={() => setViewMode('bag')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'bag' ? 'bg-white shadow-sm text-accent-gold' : 'text-text-muted hover:text-text-main'}`}
          >
            By Bag (袋)
          </button>
          <button
            onClick={() => setViewMode('location')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'location' ? 'bg-white shadow-sm text-accent-gold' : 'text-text-muted hover:text-text-main'}`}
          >
            By Location (位置)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-white/30 border border-glass-border rounded-2xl">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-text-muted"><Package className="animate-pulse mr-2" size={18}/> Loading...</div>
        ) : viewMode === 'list' ? (
          <div className="overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 text-text-muted border-b border-glass-border sticky top-0 backdrop-blur-md z-10">
                <tr>
                  <th className="px-6 py-3 font-medium">Item</th>
                  <th className="px-6 py-3 font-medium hidden md:table-cell">Bag</th>
                  <th className="px-6 py-3 font-medium hidden md:table-cell">Location</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border/50">
                {filteredMaterials.map((item) => (
                  <tr key={item.id} className="hover:bg-white/40 transition-colors group">
                    <td className="px-6 py-3">
                      <span className="font-medium text-text-main block">{item.name}</span>
                      <div className="md:hidden mt-1 flex flex-wrap gap-1">
                        <span className="inline-block px-1.5 py-0.5 rounded bg-black/5 text-[10px] text-text-muted">#{item.bag}</span>
                        <span className="inline-block px-1.5 py-0.5 rounded bg-black/5 text-[10px] text-text-muted">#{item.room}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-text-muted hidden md:table-cell">{item.bag}</td>
                    <td className="px-6 py-3 text-text-muted hidden md:table-cell">{item.room}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canEdit && (
                          <button 
                            onClick={() => setEditingItem(item)}
                            className="p-1.5 text-text-muted hover:text-accent-gold rounded-lg hover:bg-white/60 transition-all opacity-0 group-hover:opacity-100"
                            title="Edit Tags"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => toggleStatus(item.id, item.status)}
                          className={`inline-block px-3 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer w-20 text-center ${item.status === 'Packed' ? 'bg-[#e6ffed] text-[#155724] border border-[#c3e6cb]' : 'bg-[#fff3cd] text-[#856404] border border-[#ffeeba]'}`}
                        >
                          {item.status}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-y-auto p-4 md:p-6 bg-glass-bg/50">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {(viewMode === 'bag' ? BAGS : LOCATIONS).map(groupName => {
                const isBagView = viewMode === 'bag';
                const itemsInGroup = isBagView ? groupedByBag[groupName] : groupedByLocation[groupName];
                
                if (!itemsInGroup || itemsInGroup.length === 0) return null;

                return (
                  <div key={groupName} className="break-inside-avoid bg-white/70 border border-glass-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-[14px] font-bold text-accent-gold mb-1 border-b border-glass-border/50 pb-2">
                      {groupName}
                    </h3>
                    
                    {isBagView && BAG_STORAGE[groupName] && (
                      <div className="flex items-center gap-1.5 text-[11px] text-text-muted mb-3 mt-2 bg-black/5 px-2 py-1 rounded w-fit">
                        <MapPin size={10} />
                        <span className="font-medium tracking-wide">24/4 儲存位置: {BAG_STORAGE[groupName]}</span>
                      </div>
                    )}

                    <ul className="space-y-3 mt-4">
                      {itemsInGroup.map(item => (
                        <li key={item.id} className="group flex justify-between items-start gap-2">
                          <div>
                            <span className={`text-[13px] font-medium ${item.status === 'Packed' ? 'text-text-muted line-through opacity-70' : 'text-text-main'}`}>
                              {item.name}
                            </span>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-[10px] text-text-muted">
                                {isBagView ? `Location: ${item.room}` : `Bag: ${item.bag}`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 shrink-0">
                            {canEdit && (
                              <button 
                                onClick={() => setEditingItem(item)}
                                className="p-1 text-text-muted hover:text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Edit2 size={12} />
                              </button>
                            )}
                            <button 
                              onClick={() => toggleStatus(item.id, item.status)}
                              className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center cursor-pointer transition-colors ${item.status === 'Packed' ? 'bg-accent-gold border-accent-gold' : 'bg-transparent border-glass-border hover:border-accent-gold/50'}`}
                            >
                              {item.status === 'Packed' && <div className="w-2 h-2 bg-white rounded-sm" />}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-xl border border-glass-border">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-serif text-text-main">Edit Item Tags</h3>
              <button 
                onClick={() => setEditingItem(null)}
                className="text-text-muted hover:text-text-main p-1 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={saveEdit}>
              <div className="mb-4">
                <label className="block text-[11px] uppercase tracking-wider font-medium text-text-muted mb-1.5 ml-1">Item Name</label>
                <div className="px-4 py-3 bg-black/5 border border-glass-border rounded-xl text-text-main text-sm">
                  {editingItem.name}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] uppercase tracking-wider font-medium text-text-muted mb-1.5 ml-1">Which Bag?</label>
                <select 
                  value={editingItem.bag}
                  onChange={(e) => setEditingItem({...editingItem, bag: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-main text-sm appearance-none shadow-sm"
                >
                  {BAGS.map(bag => (
                    <option key={bag} value={bag}>{bag}</option>
                  ))}
                  {!BAGS.includes(editingItem.bag) && <option value={editingItem.bag}>{editingItem.bag} (Custom)</option>}
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-[11px] uppercase tracking-wider font-medium text-text-muted mb-1.5 ml-1">Which Location?</label>
                <select 
                  value={editingItem.room}
                  onChange={(e) => setEditingItem({...editingItem, room: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-main text-sm appearance-none shadow-sm"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                  {!LOCATIONS.includes(editingItem.room) && <option value={editingItem.room}>{editingItem.room} (Custom)</option>}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-3 text-sm font-medium text-text-muted bg-white border border-glass-border hover:bg-black/5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium bg-accent-gold text-white rounded-xl hover:bg-accent-gold/90 shadow-sm transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
