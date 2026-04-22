import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { scheduleData } from './OverallTimetable';

const helpers = [
  "Rainbow", "Anna", "Vicky", "Emily", "Yin Yin", "Dominic",
  "Lai Hin", "Ku Ho", "JP", "Wah", "Kelly", "Yannie"
];

const originalHelperTasks: Record<string, { time?: string, task: string }[]> = {
  "Rainbow": [
    { task: "房卡 Rm A，出門房" },
    { time: "06:45-07:30", task: "Rm A化妝" },
    { time: "07:30-08:15", task: "Rm A到出門房，洗水杯，煲水 (先在 Rm A 問 Vicky 攞煲水水壺)，食早餐" },
    { time: "08:15-09:00", task: "預備金器比攝影師影相 with Christy 媽媽" },
    { time: "09:00-10:15", task: "女家影相/儀式" },
    { time: "10:15-11:00", task: "迎親" },
    { time: "11:00-11:15", task: "女家敬茶：mark金器" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-12:30", task: "男家敬茶：mark金器" },
    { time: "12:30-13:00", task: "RmA 幫 Christy 除金器，點齊後鎖 Rm A夾萬/行李箱 (with Emily)" },
    { time: "13:00-14:30", task: "lunch (外賣到幫我攞上黎 thx ~)" }
  ],
  "Dominic": [
    { task: "房卡 Rm A (早上後比 Rainbow), Rm B, 出門房" },
    { time: "05:45", task: "RmB -> 大堂接化妝師到出門房 / Rm A / Rm B -> Rm A 化妝" },
    { time: "06:00-06:25", task: "化妝" },
    { time: "06:35", task: "到大堂等 Yannie, Kelly: 比卡 Yannie 去 Rm B, 比卡 Kelly 去入門房" },
    { time: "06:45-07:30", task: "出門房預備玩新郎物資 (先放衣櫃內)" },
    { time: "07:30-08:15", task: "出門房洗水杯，煲水 (1 暖水壺 for 女家，1暖水壺 for 男家)，食早餐" },
    { time: "08:15-08:45", task: "幫手擺位 for 攝影師影相 (with Rainbow, Anna and Vicky)" },
    { time: "09:00-10:15", task: "女家影相/儀式" },
    { time: "10:15-11:00", task: "迎親 *帶 game*" },
    { time: "11:00-11:15", task: "女家敬茶：企爸爸媽媽旁邊" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-13:00", task: "到出門房幫手清潔 + 還原 *Christy 家人物品放 Rm A*" },
    { time: "13:00-14:30", task: "lunch with parents" }
  ],
  "Yin Yin": [
    { task: "房卡 Rm A (外影攞花球後比 Rainbow)，出門房" },
    { task: "25/4 ***先問 Vicky 攞房卡" },
    { time: "07:20", task: "到出門房食早餐" },
    { time: "08:15-09:00", task: "Rm A化妝，個人物品擺 Rm A" },
    { time: "09:00", task: "立刻到出門房!!!!!!!!" },
    { time: "09:00-10:15", task: "女家影相/儀式" },
    { time: "10:15-11:00", task: "迎親" },
    { time: "11:00-11:15", task: "女家敬茶：幫手戴金器" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-12:30", task: "男家敬茶：幫手戴金器" },
    { time: "12:30-13:00", task: "休息" },
    { time: "13:00-14:30", task: "lunch" }
  ],
  "Vicky": [
    { task: "房卡 Rm A，Rm B，出門房，入門房" },
    { task: "24/4 攞自己 / Anna/ Yinyin房卡" },
    { time: "07:20", task: "到 Rm A，個人物品擺 Rm A" },
    { time: "07:30-08:15", task: "Rm A化妝" },
    { time: "08:15-09:00", task: "到出門房 預備物品比攝影師影 + 食早餐" },
    { time: "09:00-10:15", task: "女家影相/儀式" },
    { time: "10:15-11:00", task: "迎親" },
    { time: "11:00-11:15", task: "女家敬茶：上鏡遞茶杯" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-12:30", task: "男家敬茶：上鏡遞茶杯" },
    { time: "12:30-13:00", task: "清理入門房裝飾 (with LaiHin，Wah，Anna)" },
    { time: "13:00-14:30", task: "lunch" }
  ],
  "Anna": [
    { task: "房卡 Rm B，出門房" },
    { task: "25/4 ***先問 Vicky 攞房卡，將個人物品比 Vicky" },
    { time: "07:20", task: "到 Rm B" },
    { time: "07:30-08:15", task: "Rm B化妝" },
    { time: "08:15-09:00", task: "到出門房 預備物品比攝影師影 + 食早餐" },
    { time: "09:00-10:15", task: "女家影相/儀式" },
    { time: "10:15-11:00", task: "迎親" },
    { time: "11:00-11:15", task: "女家敬茶：係每隻杯滿定暖水 + 茶，make sure每杯有 2粒蓮子 2粒紅棗 total 4隻瓦杯，將茶遞比 Vicky" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-12:30", task: "男家敬茶：total 4隻瓦杯-> 2隻紙杯->2隻紙杯，將茶遞比 Vicky" },
    { time: "12:30-13:00", task: "清理入門房裝飾 (with LaiHin，Wah，Vicky)" },
    { time: "13:00-14:30", task: "lunch" }
  ],
  "Yannie": [
    { task: "房卡 Rm B，出門房，入門房" },
    { time: "06:35", task: "Arrive with Kelly, 大堂搵 Dominic攞房卡" },
    { time: "06:45-07:30", task: "Rm B化妝，個人物品 (&Kelly 物品) 放 Rm B" },
    { time: "07:30-08:00", task: "到入門房預備迎親物品，敬茶用品 with Andrew (洗杯，放蓮子紅棗，暖水由女家預備)" },
    { time: "08:00", task: "等齊所有兄弟 (except Kelly)，帶佢地將所有個人物品放 Rm B (***事先通知 Anna***) 如果房入面唔方便，盡量唔好比男仔入去" },
    { time: "08:20", task: "帶兄弟去大堂準備影相" },
    { time: "08:30-09:00", task: "影相" },
    { time: "09:00-10:00", task: "Rm B早餐，之後 call Room service 換床單/清潔" },
    { time: "10:00-10:15", task: "Andrew+ 兄弟到出門房迎親" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-13:00", task: "到出門房幫手清潔 + 還原 with Kelly and KuHo (問 room service借吸塵機) *Christy 家人物品放 Rm A* 最後收集出入門2間房房卡 +Check out (with Kelly)" },
    { time: "13:00-14:30", task: "lunch" }
  ],
  "Kelly": [
    { task: "房卡 RmB，入門房" },
    { time: "06:35", task: "Arrive with Yannie, 大堂搵 Dominic攞房卡, 個人物品交比 Yannie擺 Rm B, 然後先在大堂休息" },
    { time: "06:55", task: "帶化妝師到入門房" },
    { time: "07:00-07:30", task: "幫我偷拍 Andrew化妝!!!" },
    { time: "07:30-08:15", task: "入門房化妝" },
    { time: "08:20", task: "到大堂準備影相" },
    { time: "08:30-09:00", task: "影相" },
    { time: "09:00-10:00", task: "Rm B早餐，之後 call Room service 換床單/清潔" },
    { time: "10:00-10:15", task: "Andrew+ 兄弟到出門房迎親" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-13:00", task: "到出門房幫手清潔 + 還原 with Yannie and KuHo (問 room service借吸塵機) *Christy 家人物品放 Rm A* 最後收集出入門2間房房卡 +Check out (with Yannie)" },
    { time: "13:00-14:30", task: "lunch" }
  ],
  "Lai Hin": [
    { task: "其他兄弟：" },
    { time: "07:30", task: "Foodpanda外賣/攞早餐" },
    { time: "08:00", task: "酒店大堂集合，搵 Yannie後將個人物品擺 Rm B" },
    { time: "08:20", task: "到大堂準備影相" },
    { time: "08:30-09:00", task: "影相" },
    { time: "09:00-10:00", task: "Rm B早餐，之後 call Room service 換床單/清潔" },
    { time: "10:00-10:15", task: "Andrew+ 兄弟到出門房迎親" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-12:30", task: "跟埋 Andrew去入門房 (with Wah)" },
    { time: "12:30-13:00", task: "清理入門房裝飾 (with Wah, Anna and Vicky) *Andrew 家人物品放 Rm B*" },
    { time: "13:00-14:00", task: "lunch" },
    { time: "14:00-14:20", task: "到 RmB 預備外影物資" }
  ],
  "Ku Ho": [
    { task: "其他兄弟：" },
    { time: "07:30", task: "Foodpanda外賣/攞早餐" },
    { time: "08:00", task: "酒店大堂集合，搵 Yannie後將個人物品擺 Rm B" },
    { time: "08:20", task: "到大堂準備影相" },
    { time: "08:30-09:00", task: "影相" },
    { time: "09:00-10:00", task: "Rm B早餐，之後 call Room service 換床單/清潔" },
    { time: "10:00-10:15", task: "Andrew+ 兄弟到出門房迎親" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-13:00", task: "到出門房幫手清潔 + 還原 with Yannie and Kelly (問 room service借吸塵機)" },
    { time: "13:00-14:00", task: "lunch" },
    { time: "14:00-14:20", task: "到 RmB 預備外影物資" }
  ],
  "JP": [
    { task: "其他兄弟：" },
    { time: "07:30", task: "Foodpanda外賣/攞早餐" },
    { time: "08:00", task: "酒店大堂集合，搵 Yannie後將個人物品擺 Rm B" },
    { time: "08:20", task: "到大堂準備影相" },
    { time: "08:30-09:00", task: "影相" },
    { time: "09:00-10:00", task: "Rm B早餐，之後 call Room service 換床單/清潔" },
    { time: "10:00-10:15", task: "Andrew+ 兄弟到出門房迎親" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-13:00", task: "到白鬚餐廳攞位 (兄弟 6人 +Andrew+ 姐妹 5 人 +TC+ 攝影師 3 人 = 16)" },
    { time: "13:00-14:00", task: "lunch" },
    { time: "14:00-14:20", task: "到 RmB 預備外影物資" }
  ],
  "Wah": [
    { task: "其他兄弟：" },
    { time: "07:30", task: "Foodpanda外賣/攞早餐" },
    { time: "08:00", task: "酒店大堂集合，搵 Yannie後將個人物品擺 Rm B" },
    { time: "08:20", task: "到大堂準備影相" },
    { time: "08:30-09:00", task: "影相" },
    { time: "09:00-10:00", task: "Rm B早餐，之後 call Room service 換床單/清潔" },
    { time: "10:00-10:15", task: "Andrew+ 兄弟到出門房迎親" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-12:30", task: "跟埋 Andrew去入門房 (with LaiHin)" },
    { time: "12:30-13:00", task: "清理入門房裝飾 (with LaiHin, Anna and Vicky) *Andrew 家人物品放 Rm B*" },
    { time: "13:00-14:00", task: "lunch" },
    { time: "14:00-14:20", task: "到 RmB 預備外影物資" }
  ],
  "Emily": [
    { task: "房卡 Rm B，出門房" },
    { task: "24/4 晚先攞定房卡" },
    { time: "08:10", task: "到 Rm B, 物品先放 Rm B" },
    { time: "08:15-09:00", task: "Rm B化妝" },
    { time: "09:00", task: "立刻到出門房!!!!!!!!" },
    { time: "09:00-10:15", task: "女家影相/儀式" },
    { time: "10:15-11:00", task: "迎親 *帶 game*" },
    { time: "11:00-11:15", task: "女家敬茶：利是寫名 if needed，攞人情袋" },
    { time: "11:15-12:00", task: "影出門相" },
    { time: "12:00-12:30", task: "男家敬茶：利是寫名 if needed，攞人情袋" },
    { time: "12:30-13:00", task: "RmA 幫 Christy除金器，將人情袋鎖 Rm A夾萬/行李箱" },
    { time: "13:00-14:30", task: "lunch" }
  ]
};

// Helper function to extract master timetable tasks for a specific person
const getExtractedTasksForHelper = (helperName: string) => {
  let searchNames: string[] = [helperName];
  if (helperName === "Yin Yin") searchNames = ["Yinyin", "Yin Yin"];
  if (helperName === "Ku Ho") searchNames = ["Ku Ho", "KuHo"];
  if (helperName === "Lai Hin") searchNames = ["Lai Hin", "LaiHin"];

  const derivedTasks: { time?: string, task: string, source: "master" }[] = [];

  scheduleData.forEach(item => {
    const time = item.time;
    
    // Check lines in event, groomsmen, and bridesmaids
    const checkAndAdd = (text: string, sourceType: string) => {
      if (!text) return;
      const lines = text.split('\n');
      lines.forEach(line => {
        const hasMatch = searchNames.some(name => line.toLowerCase().includes(name.toLowerCase()));
        if (hasMatch) {
          // If there's a category, we can optionally prefix it
          let prefix = "";
          if (item.category && !line.includes(item.category)) {
            prefix = `[${item.category}] `;
          }
          derivedTasks.push({
            time: time,
            task: `${prefix}${line.trim()}`,
            source: "master"
          });
        }
      });
    };

    checkAndAdd(item.event, 'event');
    checkAndAdd(item.groomsmen, 'groomsmen');
    checkAndAdd(item.bridesmaids, 'bridesmaids');
  });

  return derivedTasks;
};

export default function HelperTimetable() {
  const [selectedHelper, setSelectedHelper] = useState(helpers[0]);
  const [isOriginalExpanded, setIsOriginalExpanded] = useState(false);
  const [isExtractedExpanded, setIsExtractedExpanded] = useState(true);

  const originalTasks = originalHelperTasks[selectedHelper] || [];
  const extractedTasks = getExtractedTasksForHelper(selectedHelper);

  // Combine and sort by time loosely if possible, or just append the master tasks at the end or in their own section.
  // Given we want to preserve both, let's show them in two sections or merged. Let's merge them but label the source.

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-glass-border pb-5">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Helper Tasks</h2>
          <p className="text-sm text-text-muted mt-1">Personalized schedules for each helper.</p>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 space-x-2">
        {helpers.map(helper => (
          <button
            key={helper}
            onClick={() => setSelectedHelper(helper)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedHelper === helper 
                ? 'bg-white/60 text-text-main shadow-[0_4px_12px_rgba(0,0,0,0.03)]' 
                : 'bg-white/30 text-text-muted border border-glass-border hover:bg-white/40'
            }`}
          >
            {helper}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {/* Original Tasks */}
        <div className="bg-white/30 border border-glass-border rounded-2xl overflow-hidden">
          <button 
            onClick={() => setIsOriginalExpanded(!isOriginalExpanded)}
            className="w-full flex items-center justify-between p-6 hover:bg-white/10 transition-colors text-left"
          >
            <h3 className="text-[11px] uppercase tracking-widest text-accent-gold m-0">Original Assigned Tasks</h3>
            {isOriginalExpanded ? <ChevronUp className="w-5 h-5 text-accent-gold" /> : <ChevronDown className="w-5 h-5 text-accent-gold" />}
          </button>
          
          {isOriginalExpanded && (
            <div className="px-6 pb-6 pt-0 border-t border-glass-border/20 mt-2 pt-4">
              {originalTasks.length > 0 ? (
                <div className="space-y-4">
                  {originalTasks.map((task, index) => (
                    <div key={index} className="flex gap-3 items-start pb-4 border-b border-glass-border/50 last:border-0 last:pb-0">
                      {task.time ? (
                        <div className="w-20 shrink-0 text-xs font-mono text-text-muted pt-1">
                          {task.time}
                        </div>
                      ) : (
                        <div className="w-20 shrink-0 text-xs font-medium text-accent-gold pt-1">
                          Note
                        </div>
                      )}
                      <div className="text-[14px] text-text-main leading-relaxed">
                        {task.task}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-text-muted text-sm">
                  <p>No original tasks found.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Master Timetable Extracted Tasks */}
        <div className="bg-white/30 border border-glass-border rounded-2xl overflow-hidden">
          <button 
            onClick={() => setIsExtractedExpanded(!isExtractedExpanded)}
            className="w-full flex items-center justify-between p-6 hover:bg-white/10 transition-colors text-left"
          >
            <h3 className="text-[11px] uppercase tracking-widest text-accent-gold m-0">Tasks Extracted from Overall Timetable</h3>
            {isExtractedExpanded ? <ChevronUp className="w-5 h-5 text-accent-gold" /> : <ChevronDown className="w-5 h-5 text-accent-gold" />}
          </button>
          
          {isExtractedExpanded && (
            <div className="px-6 pb-6 pt-0 border-t border-glass-border/20 mt-2 pt-4">
              {extractedTasks.length > 0 ? (
                <div className="space-y-4">
                  {extractedTasks.map((task, index) => (
                    <div key={index} className="flex gap-3 items-start pb-4 border-b border-glass-border/50 last:border-0 last:pb-0">
                      <div className="w-20 shrink-0 text-xs font-mono text-text-muted pt-1">
                        {task.time || "Anytime"}
                      </div>
                      <div className="text-[14px] text-text-main leading-relaxed">
                        {task.task}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-text-muted text-sm">
                  <p>No tasks found in the Overall Timetable.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
