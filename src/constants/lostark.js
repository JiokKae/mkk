export const CLASS_LOCALE = {
	warrior: { kr: "전사" },
	destroyer: { kr: "디스트로이어" },
	berserker: { kr: "버서커" },
	warlord: { kr: "워로드" },
	holyknight: { kr: "홀리나이트" },
	fighter: { kr: "무도가(여)" },
	soulmaster: { kr: "기공사" },
	force_master: { kr: "기공사" },
	battlemaster: { kr: "배틀마스터" },
	battle_master: { kr: "배틀마스터" },
	striker: { kr: "스트라이커" },
	battle_master_male: { kr: "스트라이커" },
	infighter: { kr: "인파이터" },
	lancemaster: { kr: "창술사" },
	gunslinger: { kr: "건슬링어" },
	devil_hunter_female: { kr: "건슬링어" },
	devilhunter: { kr: "데빌헌터" },
	devil_hunter: { kr: "데빌헌터" },
	blaster: { kr: "블래스터" },
	scouter: { kr: "스카우터" },
	hawkeye: { kr: "호크아이" },
	bard: { kr: "바드" },
	summoner: { kr: "서머너" },
	sorceress: { kr: "소서리스" },
	elemental_master: { kr: "소서리스" },
	arcana: { kr: "아르카나" },
	demonic: { kr: "데모닉" },
	reaper: { kr: "리퍼" },
	blade: { kr: "블레이드" },
	artist: { kr: "도화가" },
	yinyangshi: { kr: "도화가" },
	weather_artist: { kr: "기상술사" },
};

export const classLocale = (enClass, locale) => {
	if (enClass === "") {
		return "???";
	}
	if (CLASS_LOCALE.hasOwnProperty(enClass) === false) {
		return enClass;
	}
	return CLASS_LOCALE[enClass][locale];
};
