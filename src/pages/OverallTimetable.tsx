import { useState } from 'react';
import { ChevronDown, ChevronUp, Package, Users, UserPlus, ExternalLink } from 'lucide-react';

type ScheduleItem = {
  id: string;
  category?: string;
  time: string;
  event: string;
  groomsmen: string;
  bridesmaids: string;
  materials: string;
};

const scheduleData: ScheduleItem[] = [
  {
    id: "1",
    category: "準備 - WM hotel",
    time: "06:00",
    event: "",
    groomsmen: "",
    bridesmaids: "[Christy] 化妝\n[Christy爸爸] 05:50 接Christy媽媽去RmB\n[Dominic] 05:50 到大堂等化妝師 (帶去出門房/RmA/RmB)",
    materials: "化妝師尾數+利是\n紅色睡衣+拖鞋"
  },
  {
    id: "2",
    time: "06:00-06:45",
    event: "",
    groomsmen: "",
    bridesmaids: "[Dominic, Christy 媽媽] 化妝 (Rm A/ Rm B)\n[Rainbow/ TC] order 姐妹早餐 (Christy, Dominic, Rainbow, TC, Vicky, Anna, Yinyin: 三人餐x2, 一人餐x1)\n[Dominic] 06:35 比卡Yannie 去 Rm B/ 比卡Kelly去入門房",
    materials: ""
  },
  {
    id: "3",
    time: "06:45-07:30",
    event: "",
    groomsmen: "",
    bridesmaids: "[Rainbow, Yannie] 化妝+戴手花 (Rm A/ Rm B)\n[Christy 爸爸媽媽] 媽媽化妝後到WM cafe\n07:20 [Vicky+Yinyin]去Rm A, 比卡[Anna]去Rm B (Anna先將個人物品比Vicky擺Rm A) (卡係Vicky到)",
    materials: "姐妹手花x5\n襟花x1 (Dominic)\nChristy爸媽襟花x 2"
  },
  {
    id: "4",
    time: "07:30-08:15",
    event: "",
    groomsmen: "",
    bridesmaids: "[Vicky, Anna] 化妝+戴手花 (Rm A/ Rm B)\n[Christy 爸爸媽媽] 酒店早餐 (7:00-8:30)\n[Rainbow + Dominic] 準備敬茶物資+煲水+清洗 (出門房), 早餐\n[Rainbow, TC] 化妝後到出門房\n[Emily] 08:10到RmB, 個人物品先放 RmB\n[Yannie] 化妝後到入門房",
    materials: "敬茶物資：茶具, 跪墊, 托盤, 紅棗, 蓮子, 暖水壺, 紅茶"
  },
  {
    id: "5",
    time: "08:15-09:00",
    event: "[Christy] 化妝 (出門房)\n[Christy媽媽, 姐妹] 化妝 (Rm A, Rm B)",
    groomsmen: "",
    bridesmaids: "[Yinyin, Emily] 化妝+戴手花 (Rm A/ Rm B)\n[Dominic] 預備玩新郎物資\n[Rainbow, Christy mama] 準備金器比攝影師影相 (出門房)\n[Vicky, Anna] 到出門房準備物品俾攝影師影, 早餐",
    materials: "金器(女家爸媽：龍鳳鈪一對, 花鏈一條, 戒指一隻(for Andrew)\n攝影物品：請帖x 2, 結婚戒指一對, 求婚戒指, 白色婚鞋, 頭紗, 花球(真花), 褂, 褂鞋, 褂扇"
  },
  {
    id: "6",
    category: "女家集合",
    time: "09:05-10:15",
    event: "[Christy, Christy's family, 姐妹] 影換褂相 (出門房)",
    groomsmen: "",
    bridesmaids: "[Yinyin, Emily]到出門房 (fast!!!)\n[Christy] 派姐妹利是\n[Christy爸爸媽媽] 幫Christy著上身+心底話\n[姐妹] 幫Christy著下身+心底話",
    materials: ""
  },
  {
    id: "7",
    category: "男家集合",
    time: "07:00-07:30",
    event: "[Andrew, Kelly, Yannie (女家)] 化妝",
    groomsmen: "[Andrew] 化妝",
    bridesmaids: "",
    materials: "Andrew藍色西裝\n新郎襟花\n兄弟襟花x 6"
  },
  {
    id: "8",
    time: "07:30-08:15",
    event: "",
    groomsmen: "[Kelly] 化妝\n[Andrew, Yannie] 預備迎親物品，敬茶用品 (入門房)",
    bridesmaids: "",
    materials: "紅色花球\n開門利是\n兄弟利是"
  },
  {
    id: "9",
    time: "08:15-08:30",
    event: "[Andrew 媽媽] 化妝：08:15-09:00",
    groomsmen: "[Andrew] order兄弟早餐 (要9am到)",
    bridesmaids: "",
    materials: ""
  },
  {
    id: "10",
    time: "08:30-09:00",
    event: "[Andrew, 兄弟] 合照\n[Andrew 媽媽] 08:15-09:00 化妝\n[Andrew 爸爸媽媽] 酒店早餐 (9:00am-10:00am)，之後12pm前執定行李",
    groomsmen: "[Andrew] 比攝影師利是\n\n影完相：\n***Yannie比出門房卡攝影師***",
    bridesmaids: "",
    materials: "攝影師利是\nAndrew爸媽襟花"
  },
  {
    id: "11",
    time: "09:00-10:00",
    event: "休息+早餐 (Rm B), 之後Call room service (清理+換床單)",
    groomsmen: "[Andrew, 兄弟] 早餐 (Rm B)",
    bridesmaids: "",
    materials: ""
  },
  {
    id: "12",
    category: "接新娘",
    time: "10:15",
    event: "到達女家房 (Yannie有出門房卡)",
    groomsmen: "[Andrew] 比開門利是",
    bridesmaids: "[Vicky, Rainbow] 攔門花球",
    materials: "開門利是\n花球 攔門花球"
  },
  {
    id: "13",
    time: "10:15-10:35",
    event: "玩新郎 (大動作啲)",
    groomsmen: "一齊玩",
    bridesmaids: "[Dominic, Emily] Hold遊戲",
    materials: "遊戲物資"
  },
  {
    id: "14",
    time: "10:35-11:00",
    event: "[Andrew] 愛的宣言 (直接對話)",
    groomsmen: "",
    bridesmaids: "媽媽帶Christy出閣",
    materials: ""
  },
  {
    id: "15",
    category: "女家敬茶",
    time: "11:00-11:15",
    event: "敬茶 [Christy 爸爸媽媽]\n家庭合照+金器合照",
    groomsmen: "",
    bridesmaids: "[Anna] 備茶+添茶/放紅棗蓮子\n[Vicky] 拎托盤+上鏡遞茶\n[Yinyin] 戴金器\n[Rainbow] 影金器+貼label\n[Emily] 記錄利是+袋利是\n[2p1v Ching] 講吉利說話\n[Dominic] 企sofa旁邊",
    materials: "敬茶用品\nLabel\n金器袋\n利是袋\nParents: 金器+利是\n膠紙"
  },
  {
    id: "16",
    category: "出門",
    time: "11:15-12:00",
    event: "出門+兄弟姊妹團合照+灑米",
    groomsmen: "",
    bridesmaids: "[Anna] 拎紅傘\n[兄弟姐妹] 撒米",
    materials: "花球\n紅傘\n米"
  },
  {
    id: "17",
    category: "男家敬茶",
    time: "12:00-12:30",
    event: "敬茶 [Andrew 爸爸媽媽+澳洲親戚]\n(Christy parents可到RmB休息)",
    groomsmen: "[Lai Hin, Wah] 協助Andrew\n[JP] 到白鬚餐廳攞定位：16人\n[Ku Ho, Kelly, Yannie, Dominic] 兄弟姐妹團合照後到出門房幫助還原\n[Dominic]（出門房）幫Christy & Aqua買外賣到Rm A",
    bridesmaids: "[Anna] 備茶+添茶/放紅棗蓮子\n[Vicky] 拎托盤+上鏡遞茶\n[Yinyin] 戴金器\n[Rainbow] 影金器+貼label\n[Emily] 記錄利是+袋利是\n[2p1v Ching] 講吉利說話",
    materials: "敬茶用品\nLabel\n金器袋\n利是袋"
  },
  {
    id: "18",
    category: "收拾",
    time: "12:30-13:00",
    event: "收拾房間",
    groomsmen: "",
    bridesmaids: "[Rainbow] 保管金器+幫手除金器 (金器鎖於Rainbow房夾萬)\n[Yinyin] 幫手除金器\n[Emily] 保管利是(朝早利是鎖於Rainbow房夾萬)\n[Vicky, Anna, Wah, Lai Hin] 清理入門房\n[Kelly, Yannie] 收集房卡+Check Out兩間房 (出門房, 入門房)",
    materials: "房卡x 2"
  },
  {
    id: "19",
    category: "午餐",
    time: "13:00-14:30",
    event: "[兄弟姐妹, 攝影師 Lunch]",
    groomsmen: "WM 白鬚餐廳",
    bridesmaids: "",
    materials: ""
  },
  {
    id: "20",
    category: "換衫補妝",
    time: "13:00-14:30",
    event: "[兄弟姐妹] 14:00-14:30\n[Christy] 13:00-14:30\n[Andrew] 14:00-14:30",
    groomsmen: "[兄弟] 到RmB預備外影物資 esp bump氣球\n[Emily, Kelly] 帶兄弟姐妹到酒店Lobby集合等外影，time keeper\n[Andrew, Dominic help] 食飯後返好個樣",
    bridesmaids: "[姐妹] 自行補妝\n到Rainbow房補妝/換外影婚紗\n[Christy+Aqua] 補妝/ 換婚紗",
    materials: "Andrew藍色西裝\nChristy緞面魚尾裙, 求婚戒指"
  },
  {
    id: "21",
    category: "外影",
    time: "14:30-16:00",
    event: "[Christy, Andrew, 兄弟姐妹]",
    groomsmen: "",
    bridesmaids: "外影+拋花球\n[Yinyin] Keep真花球\n[Andrew's parents, Relatives] 可於Rm B休息+換裙\n[Christy's parents] 可於Rm A 休息+換衫",
    materials: "真花球\n假花球\n紅色心心帶\n泡泡槍\n數字氣球"
  },
  {
    id: "22",
    category: "婚禮前準備",
    time: "16:00-17:50",
    event: "[Christy] 換婚紗/化妝/換髮型\n[Andrew] 換西裝(燕尾)",
    groomsmen: "",
    bridesmaids: "[Kelly, Yannie] 跟進Deco+收貨\n[Vicky, Anna, Emily] 接待處佈置(新人自備物品)\n[Rainbow, TC] 鎖金器入新娘房夾萬, 預備證婚物品\n[yinyin] 攞真花花球去新娘房, 預備證婚物品\n[Dominic] 去馬鞍山接Elaine/換晚宴西裝\n可到麻雀房(兄弟)/新娘房(姐妹)休息 (4:30pm開放)",
    materials: "自備物品：Dudu + Ruru, 有字鏡, 人樣燈, 立體相(Christy to Andrew禮物), 紙相機(Andrew to Christy禮物), 油畫+ 2本prewedding相簿(比deco公司)\n接待處物品：文具(兄弟姐妹用筆, 簽到marker, 原子筆for賓客寫人情封), Guest list, 簽到簿(酒店預備), 人情袋, label for貼人情封, reception close牌, 未派嘅帖\n證婚物品：真花花球, 誓詞卡, 結婚證書套, 結婚戒指, 簽名羽毛筆\nChristy婚紗+頭紗(未加尾), 戴求婚戒指\nAndrew燕尾西裝"
  },
  {
    id: "23",
    category: "晚宴 - WM hotel Grand Ballroom",
    time: "17:50-18:30",
    event: "[Dominic+elaine, Andrew, Andrew 爸爸媽媽, Christy爸爸媽媽] 門口迎賓\n[Christy, Christy爸爸媽媽(18: 15)] 到新娘房預備\n[Andrew] 律師到後帶律師到新娘房對身份證",
    groomsmen: "[Andrew] 比利是職員\n[Lai Hin] 協助新郎, 律師到後帶Andrew爸爸到新娘房門外對身份證\n[Kelly, Yannie] (17:50-18:15) 迎賓枱\n[Wah, KuHo] (18:15-18:35) 迎賓枱\n[JP] 確認相/ 影片/ 音樂冇問題，播迎賓playlist\n[Lai Hin] 企台邊陪Andrew",
    bridesmaids: "[Rainbow] 協助新娘\n[Vicky, Anna] (17:50-18:15) 迎賓枱\n[Emily, Yinyin] (18:15-18:35) 迎賓枱 6:35pm 安排收檔，擺close牌，放dudu+ruru 於新娘房\nEmily keep住人情袋\n[Rainbow] 企台邊+遞戒指",
    materials: "律師利是\n人情袋\n收集人情：如果利是封冇名，請寫返/貼返落個封到"
  },
  {
    id: "24",
    category: "行禮",
    time: "18:45-19:15",
    event: "[Christy and 爸爸] 進場\n[Andrew] 台上\n[Lawyer] 註冊\n[Sophia& Ka Ming] 主持註冊儀式",
    groomsmen: "Christy入Ballroom門口後關門 -> Christy行到台上時[Emily, KuHo] 可以開門，然後請新到賓客在Ballroom後方觀禮，簽紙時[Emily, KuHo] 安排他們就坐\n[JP] 音樂",
    bridesmaids: "",
    materials: "人情袋"
  },
  {
    id: "25",
    category: "切蛋糕",
    time: "19:15-19:25",
    event: "兄弟姊妹合照\n[Sophia & Ka Ming] 主持切蛋糕儀式\n[Bonnie] 安排切餅後serve cream cake",
    groomsmen: "",
    bridesmaids: "",
    materials: "假蛋糕+真蛋糕(酒店提供)"
  },
  {
    id: "26",
    category: "換衫準備",
    time: "19:25-19:40",
    event: "[Christy] 補妝、除頭紗\n[Andrew] 準備進場",
    groomsmen: "19:15-19:20 [兄弟姐妹] 註冊後到台上合照 (Emily先將人情袋比Christy媽媽)",
    bridesmaids: "",
    materials: ""
  },
  {
    id: "27",
    category: "成長片段",
    time: "19:30-19:40",
    event: "播放成長片段\n[Sophia & Ka Ming] 介紹相識經過",
    groomsmen: "19:20-19:35 Emily, KuHo 到門外迎賓, Emily之後將人情袋鎖新娘房夾萬",
    bridesmaids: "",
    materials: "人情袋"
  },
  {
    id: "28",
    category: "進場",
    time: "19:45-20:10",
    event: "[Christy & Andrew] 進場\n[Sophia & Ka Ming] 主持交杯+祝酒+kiss+新人致謝",
    groomsmen: "[JP] 音樂",
    bridesmaids: "",
    materials: "人情袋"
  },
  {
    id: "29",
    category: "開席",
    time: "20:10",
    event: "[Sophia & Ka Ming] 宣佈起菜",
    groomsmen: "",
    bridesmaids: "",
    materials: ""
  },
  {
    id: "30",
    category: "拍照",
    time: "20:20-21:00",
    event: "第一道菜後：按影相次序合照\n[Sophia/Kaming 輪流] 在台上安排影相次序：而家邊d人上台+叫定下一組係台邊預備+再下一組係邊圍",
    groomsmen: "[Dominic, Elaine] (行埋去) 幫手係台下叫定親戚/男家父母朋友預備影相 (1-9)",
    bridesmaids: "",
    materials: "影相次序List"
  },
  {
    id: "31",
    category: "換衫",
    time: "21:00-21:35",
    event: "[Christy] 換敬酒裙+補妝+換髮型\n[Andrew] 換藍色西裝",
    groomsmen: "",
    bridesmaids: "[Rainbow, Vicky] 戴金器",
    materials: "金器\n敬酒裙\n紅繩"
  },
  {
    id: "32",
    category: "補敬茶",
    time: "21:35-21:50",
    event: "[Christy, Andrew] 攞茶杯，簡單敬茶",
    groomsmen: "",
    bridesmaids: "[Vicky] +/-協助戴金器\n[Rainbow] mark金器\n[Emily] 收利是",
    materials: "人情袋 (袋仔)"
  },
  {
    id: "33",
    category: "早拍晚播",
    time: "21:50-22:00",
    event: "所有兄弟姐妹",
    groomsmen: "",
    bridesmaids: "",
    materials: ""
  },
  {
    id: "34",
    category: "敬酒",
    time: "22:00-22:30",
    event: "[所有兄弟姐妹, 爸爸媽媽, Christy細佬&Elaine]",
    groomsmen: "",
    bridesmaids: "",
    materials: ""
  },
  {
    id: "35",
    category: "送客",
    time: "22:45-23:15",
    event: "",
    groomsmen: "",
    bridesmaids: "",
    materials: ""
  }
];

export default function OverallTimetable() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-glass-border pb-5 shrink-0">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Master Timetable</h2>
          <p className="text-sm text-text-muted mt-1">25/4 流程 - WM Hotel</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="https://docs.google.com/spreadsheets/d/1cF_MZC4Mf3OsOr_SznX7nvs2UH2jzF1Xh4FDiW8Mv30/edit?gid=0#gid=0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/40 hover:bg-white/60 border border-glass-border px-4 py-2 rounded-xl text-sm font-medium text-text-main transition-colors shadow-sm"
          >
            <span>婚禮 Rundown</span>
            <ExternalLink size={14} className="text-accent-gold" />
          </a>
          <div className="text-xs bg-accent-gold text-white px-3 py-1 rounded-full uppercase tracking-widest shadow-sm hidden sm:block">
            Live
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white/30 border border-glass-border rounded-2xl p-2 md:p-5">
        <div className="space-y-2">
          {scheduleData.map((item) => {
            const isExpanded = expandedItems[item.id];
            
            return (
              <div key={item.id} className="flex flex-col">
                {item.category && (
                  <div className="mt-4 mb-2 first:mt-0">
                    <h3 className="text-[11px] uppercase tracking-widest text-accent-gold font-semibold px-2">
                      {item.category}
                    </h3>
                  </div>
                )}
                
                <div 
                  className={`bg-white/40 border border-glass-border rounded-xl transition-all duration-200 overflow-hidden ${isExpanded ? 'shadow-md' : 'hover:bg-white/60'}`}
                >
                  <button 
                    onClick={() => toggleExpand(item.id)}
                    className="w-full text-left p-4 flex items-start gap-4 focus:outline-none"
                  >
                    <div className="font-bold w-14 shrink-0 text-accent-gold text-sm pt-0.5">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <div className="text-[14px] text-text-main font-medium whitespace-pre-wrap leading-relaxed">
                        {item.event || "準備 / 休息"}
                      </div>
                    </div>
                    <div className="shrink-0 text-text-muted pt-0.5">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-glass-border/50 bg-white/20">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Groomsmen Tasks */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            <Users size={14} className="text-blue-500/70" />
                            兄弟 (Groomsmen)
                          </div>
                          <div className="text-[13px] text-text-main whitespace-pre-wrap leading-relaxed bg-white/40 p-3 rounded-lg min-h-[60px]">
                            {item.groomsmen || <span className="text-text-muted italic">No specific tasks</span>}
                          </div>
                        </div>

                        {/* Bridesmaids Tasks */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            <UserPlus size={14} className="text-pink-500/70" />
                            姊妹 (Bridesmaids)
                          </div>
                          <div className="text-[13px] text-text-main whitespace-pre-wrap leading-relaxed bg-white/40 p-3 rounded-lg min-h-[60px]">
                            {item.bridesmaids || <span className="text-text-muted italic">No specific tasks</span>}
                          </div>
                        </div>

                        {/* Materials */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            <Package size={14} className="text-accent-gold" />
                            物資 (Materials)
                          </div>
                          <div className="text-[13px] text-text-main whitespace-pre-wrap leading-relaxed bg-white/40 p-3 rounded-lg min-h-[60px]">
                            {item.materials || <span className="text-text-muted italic">No materials needed</span>}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
