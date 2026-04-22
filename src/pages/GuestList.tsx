import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

const initialGuests = [
  { id: "g_1", name: "Andrew", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_2", name: "Christy", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_3", name: "呂寶釗", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_4", name: "張柔珍", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_5", name: "呂寶銓", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_6", name: "戚培華", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_7", name: "呂寶銀", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_8", name: "鄧錦珍", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_9", name: "呂寶鍵", table: "Table 1 (主家席 男家)", attended: false, giftReceived: false },
  { id: "g_10", name: "陳國雄", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_11", name: "盧瑞芬", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_12", name: "陳逸樺", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_13", name: "謝潔玲", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_14", name: "陳念芝", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_15", name: "霍偉成", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_16", name: "霍羲庭", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_17", name: "陳國明", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_18", name: "葉允嫦", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_19", name: "陳康佑", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_20", name: "陳康傑", table: "Table 2 (主家席 女家)", attended: false, giftReceived: false },
  { id: "g_21", name: "許坤媖", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_22", name: "Warni", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_23", name: "張嘉傑", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_24", name: "張文庭", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_25", name: "張加偉", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_26", name: "葉蘭英", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_27", name: "張肇熙", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_28", name: "張慧珍", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_29", name: "葉樹培", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_30", name: "蔣嘉麟", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_31", name: "張荃珍", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_32", name: "蔣卓姿", table: "Table 3 (男家 東頭邨張氏)", attended: false, giftReceived: false },
  { id: "g_33", name: "Vanessa Yeung", table: "Table 5 (新娘大學同學+同事)", attended: false, giftReceived: false },
  { id: "g_34", name: "Cherry Wong", table: "Table 5 (新娘大學同學+同事)", attended: false, giftReceived: false },
  { id: "g_35", name: "Gigi She", table: "Table 5 (新娘大學同學+同事)", attended: false, giftReceived: false },
  { id: "g_36", name: "Rainbow Lee", table: "Table 5 (新娘大學同學+同事)", attended: false, giftReceived: false },
  { id: "g_37", name: "TC Yeung", table: "Table 5 (新娘大學同學+同事)", attended: false, giftReceived: false },
  { id: "g_38", name: "Flora Tse", table: "Table 5 (新娘大學同學+同事)", attended: false, giftReceived: false },
  { id: "g_39", name: "Andy Yee", table: "Table 5 (新娘大學同學+同事)", attended: false, giftReceived: false },
  { id: "g_40", name: "Terry Tam", table: "Table 5 (新娘大學同學+同事)", attended: false, giftReceived: false },
  { id: "g_41", name: "蘇炳林", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_42", name: "二家姨", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_43", name: "蘇婉儀", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_44", name: "蘇婉儀朋友", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_45", name: "許觀發", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_46", name: "鄧婉玲", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_47", name: "許美英", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_48", name: "許少英", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_49", name: "許容昌", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_50", name: "關壁儀", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_51", name: "張子穎", table: "Table 6 (男家 許氏)", attended: false, giftReceived: false },
  { id: "g_52", name: "Chow Nok Hei", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_53", name: "Vincy Yau", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_54", name: "Wong Yuen Yu", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_55", name: "Wong Ka Wing", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_56", name: "Yip Chun Yin", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_57", name: "Kelly Lee", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_58", name: "Chan Yin Tung", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_59", name: "Lam Hoi Ki", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_60", name: "Anna Chau", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_61", name: "Vicky Tsang", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_62", name: "Emily Li", table: "Table 8 (新娘中學同學)", attended: false, giftReceived: false },
  { id: "g_63", name: "馮正良", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_64", name: "李秀蓮", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_65", name: "馮向遠", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_66", name: "馮向遠太太", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_67", name: "馮芷琳", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_68", name: "鄧偉輝", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_69", name: "郭麗璇", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_70", name: "陳嵐", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_71", name: "蔡漢樑", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_72", name: "戴謙寶", table: "Table 9 (男家 馮氏)", attended: false, giftReceived: false },
  { id: "g_73", name: "梁秋信", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_74", name: "吳堅", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_75", name: "鍾家耀", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_76", name: "Fanny Lo", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_77", name: "吳偉榮", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_78", name: "楊俊芳", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_79", name: "黃健偉", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_80", name: "黃太太", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_81", name: "許雪娟", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_82", name: "劉雪明", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_83", name: "鄺以德", table: "Table 10 (男家 朋友)", attended: false, giftReceived: false },
  { id: "g_84", name: "Mr Ken Ching", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_85", name: "Ms Carmen Lo", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_86", name: "Mr KW Chak", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_87", name: "Ms Chan", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_88", name: "Ms Li", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_89", name: "Toby Lee", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_90", name: "Fion Wong", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_91", name: "Lam Fei", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_92", name: "娥姐", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_93", name: "曉芳", table: "Table 11 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_94", name: "Bernice Liu", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_95", name: "Yinyin Pun", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_96", name: "Lee Pui Lam", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_97", name: "Hailey Leung", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_98", name: "Christine Chiu", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_99", name: "Karen Ng", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_100", name: "Joanne Choi", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_101", name: "Lau Cheuk Wing", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_102", name: "Cathy Yau", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_103", name: "Jessie Wong", table: "Table 12 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_104", name: "Kuho", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_105", name: "呀樺", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_106", name: "黎軒", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_107", name: "精平", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_108", name: "Ben", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_109", name: "呀平", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_110", name: "勤", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_111", name: "達明", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_112", name: "志永", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_113", name: "呀鍵", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_114", name: "大師", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_115", name: "梁參", table: "Table 13 (新郎中同)", attended: false, giftReceived: false },
  { id: "g_116", name: "Alan", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_117", name: "Cyrus", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_118", name: "Elvis", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_119", name: "Joanne", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_120", name: "Keung", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_121", name: "Poonlam", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_122", name: "Tung", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_123", name: "Andrew Wong", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_124", name: "Pat", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_125", name: "Ashley", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_126", name: "Jessica Yeung", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_127", name: "Allie", table: "Table 15 (新郎大學同學)", attended: false, giftReceived: false },
  { id: "g_128", name: "Anthony Lau", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_129", name: "Leo Cheung", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_130", name: "Michelle Hui", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_131", name: "Eric Chan", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_132", name: "Elaine", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_133", name: "Simon", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_134", name: "Jack", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_135", name: "Waterie", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_136", name: "Wing", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_137", name: "Karen Lo", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_138", name: "Angel", table: "Table 16 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_139", name: "Emily Wong", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_140", name: "Hebe Wai", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_141", name: "Wong Mei Ting", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_142", name: "Jasmine Chan", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_143", name: "Miu Chan", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_144", name: "Bertha Leung", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_145", name: "Hidy Tang", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_146", name: "Joey Cheng", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_147", name: "Marie Ho", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_148", name: "Lam Ka Ki", table: "Table 18 (新娘同事)", attended: false, giftReceived: false },
  { id: "g_149", name: "Jessie Ma", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_150", name: "Agnes Chan", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_151", name: "Stephy", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_152", name: "Leon", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_153", name: "Henry", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_154", name: "Jamie Ng", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_155", name: "George", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_156", name: "Richard", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_157", name: "Wilson", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_158", name: "Dara", table: "Table 19 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_159", name: "Yannie", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_160", name: "Kelly Yeung", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_161", name: "Jamie Ip", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_162", name: "Arthur", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_163", name: "Hiu Ying", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_164", name: "Michelle Chan", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_165", name: "Thomas Chan", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_166", name: "Chelsea", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_167", name: "Sin Yan", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_168", name: "Denise", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_169", name: "Sophia", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_170", name: "Kaming", table: "Table 20 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_171", name: "Kelvin", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_172", name: "Frankie", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_173", name: "William", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_174", name: "Ken", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_175", name: "T Yip", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_176", name: "Eric Chang", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_177", name: "Yuen Ching", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_178", name: "Annie", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_179", name: "Cedric", table: "Table 21 (新郎同事)", attended: false, giftReceived: false },
  { id: "g_180", name: "Kelly Li", table: "Table 21 (新郎同事)", attended: false, giftReceived: false }
];

const carparkGuests = [
  { name: "Leo Cheung", table: "16", side: "男家" },
  { name: "Ken Ching", table: "11", side: "女家" },
  { name: "KW Chak", table: "11", side: "女家" },
  { name: "Toby Lee", table: "11", side: "女家" },
  { name: "Suet Li", table: "11", side: "女家" },
  { name: "Andy Yee", table: "5", side: "女家" },
  { name: "Marie Ho", table: "8", side: "女家" },
  { name: "Arthur Ip", table: "20", side: "男家" },
  { name: "Kevin Pang", table: "21", side: "男家" },
  { name: "Wilson", table: "19", side: "男家" },
  { name: "張文庭", table: "3", side: "男家" },
  { name: "Eric Chan", table: "16", side: "男家" },
  { name: "Michelle Hui", table: "16", side: "男家" },
  { name: "Thomas Chan", table: "20", side: "男家" },
  { name: "Cyrus", table: "15", side: "男家" },
  { name: "Elvis", table: "15", side: "男家" },
  { name: "Yuen ching", table: "21", side: "男家" },
  { name: "Agnes Chan", table: "19", side: "男家" },
  { name: "Jack", table: "16", side: "男家" },
  { name: "Anthony", table: "16", side: "男家" },
  { name: "鄧偉輝", table: "9", side: "男家" },
  { name: "鍾家耀", table: "10", side: "男家" },
  { name: "劉雪明", table: "10", side: "男家" },
  { name: "黃健偉", table: "10", side: "男家" },
  { name: "鄺以德", table: "10", side: "男家" },
  { name: "Henry", table: "19", side: "男家" },
  { name: "Terry", table: "5", side: "男家" },
  { name: "Jessie", table: "19", side: "男家" },
  { name: "Simon Chan (Lawyer)", table: "/", side: "/" },
  { name: "Elaine", table: "16", side: "男家" }
];

export default function GuestList() {
  const [guests] = useState(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'table' | 'carpark'>('list');

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.table.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group guests by table for the overview
  const tables = guests.reduce((acc, guest) => {
    if (!acc[guest.table]) acc[guest.table] = [];
    acc[guest.table].push(guest);
    return acc;
  }, {} as Record<string, typeof guests>);

  // Sort tables by number
  const sortedTables = Object.keys(tables).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-glass-border pb-5 shrink-0">
        <div>
          <h2 className="text-3xl font-serif font-normal text-text-main">Guest List</h2>
          <p className="text-sm text-text-muted mt-1">View all guests and their table assignments.</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="https://docs.google.com/spreadsheets/d/1cF_MZC4Mf3OsOr_SznX7nvs2UH2jzF1Xh4FDiW8Mv30/edit?gid=70055430#gid=70055430" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/40 hover:bg-white/60 border border-glass-border px-4 py-2 rounded-xl text-sm font-medium text-text-main transition-colors shadow-sm"
          >
            <span>Guest List</span>
            <ExternalLink size={14} className="text-accent-gold" />
          </a>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search guests by name or table..." 
            className="w-full pl-10 pr-4 py-3 bg-white/40 border border-glass-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-main placeholder:text-text-muted shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex bg-white/40 border border-glass-border rounded-xl p-1 shrink-0 overflow-x-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'list' ? 'bg-white shadow-sm text-accent-gold' : 'text-text-muted hover:text-text-main'}`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'table' ? 'bg-white shadow-sm text-accent-gold' : 'text-text-muted hover:text-text-main'}`}
          >
            Table Overview
          </button>
          <button
            onClick={() => setViewMode('carpark')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'carpark' ? 'bg-white shadow-sm text-accent-gold' : 'text-text-muted hover:text-text-main'}`}
          >
            Carpark List
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-white/30 border border-glass-border rounded-2xl">
        {viewMode === 'list' ? (
          <div className="overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 text-text-muted border-b border-glass-border sticky top-0 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-3 font-medium">Guest Name</th>
                  <th className="px-6 py-3 font-medium">Table</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border/50">
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-main">{guest.name}</td>
                    <td className="px-6 py-4 text-text-muted">{guest.table}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-y-auto p-4 md:p-6">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {sortedTables.map(tableName => (
                <div key={tableName} className="break-inside-avoid bg-white/50 border border-glass-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-[13px] font-bold text-accent-gold mb-3 border-b border-glass-border/50 pb-2 uppercase tracking-wider">
                    {tableName}
                  </h3>
                  <ul className="space-y-2">
                    {tables[tableName].map(g => (
                      <li key={g.id} className="text-[14px] text-text-main flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/40"></span>
                        {g.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 text-text-muted border-b border-glass-border sticky top-0 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Table</th>
                  <th className="px-6 py-3 font-medium">Side</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border/50">
                {carparkGuests.map((guest, idx) => (
                  <tr key={idx} className="hover:bg-white/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-main">{guest.name}</td>
                    <td className="px-6 py-4 text-text-muted">{guest.table}</td>
                    <td className="px-6 py-4 text-text-muted">
                      <span className={`px-2 py-1 rounded-md text-xs ${guest.side === '男家' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                        {guest.side}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
