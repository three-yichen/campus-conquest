const ITEMS = [
  "早八",
  "逃课",
  "图书馆自习",
  "食堂高峰排队",
  "抢课失败",
  "抢课成功",
  "小组作业背锅",
  "凌晨赶 ddl",
  "期末周极限求生",
  "绩点焦虑发作",
  "奖学金申请",
  "社团活动",
  "学生会/组织工作",
  "参加竞赛",
  "实习",
  "考研/保研焦虑",
  "论文格式大战",
  "课堂展示硬撑",
  "答辩",
  "宿舍夜聊",
  "校园恋爱",
  "操场散步",
  "校医院开药",
  "体测渡劫",
  "军训",
  "打印店赛博救命",
  "校园卡丢失",
  "外卖进校",
  "讲座签到速通",
  "毕业照"
];

const LEVELS = [
  { value: 0, label: "没经历" },
  { value: 1, label: "浅尝一下" },
  { value: 2, label: "正在经历" },
  { value: 3, label: "深度体验" },
  { value: 4, label: "刻进 DNA" }
];

const TITLE_RULES = [
  { min: 0, title: "大学新手村" },
  { min: 20, title: "校园观察员" },
  { min: 40, title: "普通大学生" },
  { min: 60, title: "期末周幸存者" },
  { min: 80, title: "大学生活制霸者" },
  { min: 95, title: "校园传说" }
];

const TAG_RULES = [
  { tag: "ddl追逐者", items: ["凌晨赶 ddl", "期末周极限求生", "小组作业背锅"], minScore: 7 },
  { tag: "图书馆游民", items: ["图书馆自习", "论文格式大战", "课堂展示硬撑"], minScore: 7 },
  { tag: "绩点焦虑体", items: ["绩点焦虑发作", "奖学金申请", "考研/保研焦虑"], minScore: 7 },
  { tag: "校园活动家", items: ["社团活动", "学生会/组织工作", "讲座签到速通"], minScore: 7 },
  { tag: "青春叙事主角", items: ["宿舍夜聊", "校园恋爱", "操场散步"], minScore: 7 },
  { tag: "生存技能点满", items: ["校医院开药", "校园卡丢失", "打印店赛博救命", "外卖进校"], minScore: 9 },
  { tag: "卷王预备役", items: ["参加竞赛", "实习", "奖学金申请"], minScore: 7 }
];

const MAP_AREAS = [
  {
    name: "校门广场",
    items: ["军训", "早八", "抢课失败", "抢课成功"]
  },
  {
    name: "教学楼",
    items: ["课堂展示硬撑", "期末周极限求生", "小组作业背锅", "答辩", "凌晨赶 ddl"]
  },
  {
    name: "图书馆",
    items: ["图书馆自习", "论文格式大战", "绩点焦虑发作", "考研/保研焦虑"]
  },
  {
    name: "食堂生活区",
    items: ["食堂高峰排队", "外卖进校", "打印店赛博救命", "校园卡丢失"]
  },
  {
    name: "宿舍区",
    items: ["宿舍夜聊", "逃课", "校园恋爱"]
  },
  {
    name: "诗与远方",
    items: ["体测渡劫", "操场散步", "实习", "参加竞赛", "毕业照"]
  },
  {
    name: "支线任务",
    items: ["社团活动", "学生会/组织工作", "奖学金申请", "讲座签到速通", "校医院开药"]
  }
];

const STORAGE_KEY = "campus-conquest-state";
const THEME_STORAGE_KEY = "campus-conquest-theme";
const FOOTER_TEXT = "不是所有人都能绩点制霸，但每个人都可以期末周幸存。";
const DEFAULT_PERSONALITY_TAG = "普通大学生";
const DOMINATED_LEVEL = 3;
const MAX_PERSONALITY_TAGS = 3;
const EMPTY_DOMINATED_TEXT = "还在新手村探索中";
const EMPTY_WEAKEST_AREA_TEXT = "还没正式开图";
const SHARE_IMAGE_FILE_NAME = "campus-conquest-report.png";
const SHARE_TITLE = "大学生制霸";
const COPY_SHARE_TITLE = "我的大学生制霸报告";
const SHARE_SUBTITLE = "一张图看看我的大学副本进度。";
const MAX_LEVEL = Math.max(...LEVELS.map((level) => level.value));
const MAX_SCORE = ITEMS.length * MAX_LEVEL;
const THEMES = [
  {
    id: "butter",
    name: "期末周奶黄",
    bg: "#f6f0dd",
    paper: "#fffaf0",
    ink: "#27312d",
    muted: "#64695d",
    accent: "#c86d3a",
    accentSoft: "#ecd48d",
    button: "#49694f",
    tag: "#f4e6b6"
  },
  {
    id: "mint",
    name: "操场薄荷绿",
    bg: "#edf4e8",
    paper: "#fbfdf7",
    ink: "#20322c",
    muted: "#5d7167",
    accent: "#d26647",
    accentSoft: "#cfe3b8",
    button: "#3f7158",
    tag: "#dbeed7"
  },
  {
    id: "latte",
    name: "图书馆拿铁",
    bg: "#f3eadf",
    paper: "#fff9f2",
    ink: "#352a25",
    muted: "#76665e",
    accent: "#b86a45",
    accentSoft: "#e7cfaf",
    button: "#6a584c",
    tag: "#efe1ce"
  },
  {
    id: "night",
    name: "宿舍夜谈蓝",
    bg: "#e9eef4",
    paper: "#fbfcff",
    ink: "#243043",
    muted: "#61708a",
    accent: "#cf7054",
    accentSoft: "#d8e0ef",
    button: "#445f87",
    tag: "#dde7f7"
  },
  {
    id: "tomato",
    name: "青春番茄红",
    bg: "#f7ebe4",
    paper: "#fffaf5",
    ink: "#352721",
    muted: "#7a655d",
    accent: "#cf5a3b",
    accentSoft: "#f0c6a1",
    button: "#9c5842",
    tag: "#f6dfd0"
  },
  {
    id: "sage",
    name: "打印店灰绿",
    bg: "#eef0e7",
    paper: "#fcfcf7",
    ink: "#2b312c",
    muted: "#697068",
    accent: "#b86f4f",
    accentSoft: "#d9decf",
    button: "#56695d",
    tag: "#e3e7d7"
  }
];
const ITEM_INDEX_MAP = ITEMS.reduce((map, item, index) => {
  map[item] = index;
  return map;
}, {});

let selectedLevels = Array(ITEMS.length).fill(0);
let expandedAreaName = null;
let currentTheme = THEMES[0];

function getItemIndex(item) {
  return Object.prototype.hasOwnProperty.call(ITEM_INDEX_MAP, item) ? ITEM_INDEX_MAP[item] : -1;
}

function getLevelByValue(value) {
  return LEVELS.find((level) => level.value === value) || LEVELS[0];
}

function getThemeById(themeId) {
  return THEMES.find((theme) => theme.id === themeId) || null;
}

function pickRandomTheme(excludedId) {
  const availableThemes = THEMES.filter((theme) => theme.id !== excludedId);
  const themePool = availableThemes.length > 0 ? availableThemes : THEMES;
  const themeIndex = Math.floor(Math.random() * themePool.length);
  return themePool[themeIndex];
}

function applyTheme(theme) {
  currentTheme = theme;

  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--theme-bg", theme.bg);
  rootStyle.setProperty("--theme-paper", theme.paper);
  rootStyle.setProperty("--theme-ink", theme.ink);
  rootStyle.setProperty("--theme-muted", theme.muted);
  rootStyle.setProperty("--theme-accent", theme.accent);
  rootStyle.setProperty("--theme-accent-soft", theme.accentSoft);
  rootStyle.setProperty("--theme-button", theme.button);
  rootStyle.setProperty("--theme-tag", theme.tag);
  rootStyle.setProperty("--theme-line", "color-mix(in srgb, var(--theme-ink) 16%, transparent)");
  rootStyle.setProperty("--theme-panel", "color-mix(in srgb, var(--theme-paper) 92%, white 8%)");
  rootStyle.setProperty("--theme-panel-strong", "color-mix(in srgb, var(--theme-paper) 98%, white 2%)");

  const sharePosterTheme = document.getElementById("sharePosterTheme");

  if (sharePosterTheme) {
    sharePosterTheme.textContent = `今日皮肤：${theme.name}`;
  }
}

function saveTheme(themeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch (error) {
    setCopyStatus("当前浏览器无法保存主题皮肤。");
  }
}

function initializeTheme() {
  let theme = null;

  try {
    theme = getThemeById(localStorage.getItem(THEME_STORAGE_KEY));
  } catch (error) {
    theme = null;
  }

  if (!theme) {
    theme = pickRandomTheme();
    saveTheme(theme.id);
  }

  applyTheme(theme);
}

function switchTheme() {
  const nextTheme = pickRandomTheme(currentTheme ? currentTheme.id : "");
  applyTheme(nextTheme);
  saveTheme(nextTheme.id);
  setCopyStatus(`已切换为「${nextTheme.name}」皮肤。`);
}

function renderItems() {
  const grid = document.getElementById("itemsGrid");

  grid.innerHTML = ITEMS.map((item, index) => {
    const currentValue = selectedLevels[index];
    const currentLevel = getLevelByValue(currentValue);

    return `
      <article class="item-card" data-index="${index}">
        <div class="item-card__head">
          <h3>${item}</h3>
          <span class="item-level-text" id="itemLevelText${index}">${currentLevel.label}</span>
        </div>
        <div class="level-options" role="radiogroup" aria-label="${item}">
          ${LEVELS.map((level) => {
            const isSelected = level.value === currentValue;

            return `
              <button
                class="level-button${isSelected ? " is-selected" : ""}"
                type="button"
                data-index="${index}"
                data-value="${level.value}"
                aria-pressed="${isSelected}"
                aria-label="${item}：${level.label}"
                title="${item}：${level.label}"
              >
                <span class="level-number">${level.value}</span>
              </button>
            `;
          }).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function getCurrentResult() {
  const totalScore = selectedLevels.reduce((sum, value) => sum + value, 0);
  const rate = MAX_SCORE === 0 ? 0 : Math.round((totalScore / MAX_SCORE) * 100);
  const checkedCount = selectedLevels.filter((value) => value > 0).length;

  return {
    totalScore,
    rate,
    checkedCount,
    title: getTitleByRate(rate)
  };
}

function getTitleByRate(rate) {
  return TITLE_RULES.reduce((matchedTitle, rule) => {
    return rate >= rule.min ? rule.title : matchedTitle;
  }, TITLE_RULES[0].title);
}

function getPersonalityTags() {
  return TAG_RULES.map((rule, index) => {
    const score = rule.items.reduce((sum, item) => {
      const itemIndex = getItemIndex(item);
      return sum + (itemIndex === -1 ? 0 : selectedLevels[itemIndex]);
    }, 0);

    return {
      tag: rule.tag,
      score,
      index,
      minScore: rule.minScore
    };
  })
    .filter((matchedRule) => matchedRule.score >= matchedRule.minScore)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, MAX_PERSONALITY_TAGS)
    .map((matchedRule) => matchedRule.tag);
}

function getDominatedItemsText() {
  const dominatedItems = ITEMS.filter((_, index) => selectedLevels[index] >= DOMINATED_LEVEL);
  const previewCount = 6;

  if (dominatedItems.length === 0) {
    return EMPTY_DOMINATED_TEXT;
  }

  if (dominatedItems.length > previewCount) {
    return `${dominatedItems.slice(0, previewCount).join("、")} 等 ${dominatedItems.length} 项`;
  }

  return dominatedItems.join("、");
}

function getPersonalityTagsText() {
  const tags = getPersonalityTags();
  return tags.length > 0 ? tags.join(" / ") : DEFAULT_PERSONALITY_TAG;
}

function getAreaStatus(rate) {
  if (rate === 0) {
    return "未探索";
  }

  if (rate < 25) {
    return "刚开图";
  }

  if (rate < 50) {
    return "探索中";
  }

  if (rate < 75) {
    return "接近制霸";
  }

  return "已制霸";
}

function getAreaTone(rate) {
  if (rate === 0) {
    return "empty";
  }

  if (rate <= 24) {
    return "low";
  }

  if (rate <= 49) {
    return "mid";
  }

  if (rate <= 74) {
    return "high";
  }

  return "peak";
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };

    return entities[character] || character;
  });
}

function getExportTheme() {
  const theme = currentTheme || THEMES[0];

  return {
    paper: theme.paper || "#fffaf0",
    ink: theme.ink || "#1f3131",
    muted: theme.muted || "#5d6b67",
    accent: theme.accent || "#d45a3c",
    button: theme.button || "#355d42",
    tag: theme.tag || "#f4efc8",
    themeName: theme.name || ""
  };
}

function getExportMapColor(tone) {
  const colorMap = {
    empty: "#d8d4ca",
    low: "#efe2a2",
    mid: "#e6bb64",
    high: "#92b98c",
    peak: "#4f7a4e"
  };

  return colorMap[tone] || colorMap.empty;
}

function getItemVisualState(item) {
  const itemIndex = getItemIndex(item);
  const level = itemIndex === -1 ? 0 : selectedLevels[itemIndex];

  if (level <= 0) {
    return {
      level: 0,
      state: "locked",
      label: "未点亮"
    };
  }

  if (level <= 2) {
    return {
      level,
      state: "explored",
      label: "已探索"
    };
  }

  return {
    level,
    state: "dominated",
    label: "已制霸"
  };
}

function getAreaStats() {
  return MAP_AREAS.map((area, index) => {
    const totalScore = area.items.reduce((sum, item) => {
      const itemIndex = getItemIndex(item);
      return sum + (itemIndex === -1 ? 0 : selectedLevels[itemIndex]);
    }, 0);
    const maxScore = area.items.length * MAX_LEVEL;
    const rate = maxScore === 0 ? 0 : Math.round((totalScore / maxScore) * 100);
    const clearedCount = area.items.reduce((count, item) => {
      const itemIndex = getItemIndex(item);
      return count + (itemIndex !== -1 && selectedLevels[itemIndex] > 0 ? 1 : 0);
    }, 0);

    return {
      ...area,
      index,
      totalScore,
      maxScore,
      rate,
      clearedCount,
      status: getAreaStatus(rate),
      tone: getAreaTone(rate)
    };
  });
}

function getStrongestArea() {
  const strongestArea = getAreaStats().reduce((bestArea, area) => {
    if (!bestArea) {
      return area;
    }

    if (area.rate > bestArea.rate) {
      return area;
    }

    if (area.rate === bestArea.rate && area.totalScore > bestArea.totalScore) {
      return area;
    }

    return bestArea;
  }, null);

  if (!strongestArea || strongestArea.rate === 0) {
    return null;
  }

  return strongestArea;
}

function getWeakestArea() {
  const weakestArea = getAreaStats().reduce((worstArea, area) => {
    if (!worstArea) {
      return area;
    }

    if (area.rate < worstArea.rate) {
      return area;
    }

    if (area.rate === worstArea.rate && area.totalScore < worstArea.totalScore) {
      return area;
    }

    return worstArea;
  }, null);

  if (!weakestArea || weakestArea.rate === 100) {
    return null;
  }

  return weakestArea;
}

function getPreferredExpandedAreaName(areaStats) {
  if (expandedAreaName === "") {
    return "";
  }

  if (expandedAreaName && areaStats.some((area) => area.name === expandedAreaName)) {
    return expandedAreaName;
  }

  const strongestArea = getStrongestArea();

  if (strongestArea) {
    return strongestArea.name;
  }

  return areaStats[0] ? areaStats[0].name : "";
}

function renderAreaChips(items) {
  return items.map((item) => {
    const itemState = getItemVisualState(item);
    const levelLabel = getLevelByValue(itemState.level).label;

    return `
      <li class="campus-chip campus-chip--${itemState.state}" title="${item} · ${levelLabel}">
        <span class="campus-chip__dot" aria-hidden="true"></span>
        <span class="campus-chip__name">${item}</span>
      </li>
    `;
  }).join("");
}

function renderCampusNode(area, strongestArea) {
  const isStrongest = strongestArea && strongestArea.name === area.name;

  return `
    <article class="campus-node campus-node--${area.index + 1}${isStrongest ? " is-strongest" : ""}" data-tone="${area.tone}">
      <div class="campus-node__topline">
        <span class="campus-node__badge">区域 ${area.index + 1}</span>
        <span class="campus-node__rate">${area.rate}%</span>
      </div>
      <h3>${area.name}</h3>
      <p class="campus-node__meta">${area.clearedCount}/${area.items.length} 项已点亮</p>
      <div class="campus-node__progress" aria-label="${area.status}">
        <span style="width: ${area.rate}%"></span>
      </div>
      <p class="campus-node__status">${area.status}</p>
    </article>
  `;
}

function renderMiniNode(area, strongestArea) {
  const isStrongest = strongestArea && strongestArea.name === area.name;

  return `
    <article class="mini-route-node mini-route-node--${area.index + 1}${isStrongest ? " is-strongest" : ""}" data-tone="${area.tone}">
      <strong>${area.name}</strong>
      <span>${area.rate}%</span>
    </article>
  `;
}

function renderCampusMap() {
  const mapAreas = document.getElementById("mapAreas");

  if (!mapAreas) {
    return;
  }

  const areaStats = getAreaStats();
  const strongestArea = getStrongestArea();

  mapAreas.innerHTML = `
    <div class="campus-map__frame">
      <div class="campus-map__grid">
        ${areaStats.map((area) => renderCampusNode(area, strongestArea)).join("")}
      </div>
    </div>
  `;
}

function updateCampusMap() {
  renderCampusMap();
}

function renderAreaDetails() {
  const areaDetails = document.getElementById("areaDetails");

  if (!areaDetails) {
    return;
  }

  const areaStats = getAreaStats();
  const expandedName = getPreferredExpandedAreaName(areaStats);

  areaDetails.innerHTML = `
    <div class="section-head section-head--stacked area-details__head">
      <h3>区域详情</h3>
      <p class="section-subtitle">点击展开查看每个区域的具体项目。</p>
    </div>
    <div class="area-details__grid">
      ${areaStats.map((area) => `
        <details class="area-detail-card area-detail-card--${area.tone}" data-area-name="${area.name}"${area.name === expandedName ? " open" : ""}>
          <summary class="area-detail-card__summary">
            <span class="area-detail-card__lead">
              <span class="area-detail-card__dot" aria-hidden="true"></span>
              <span class="area-detail-card__name">${area.name}</span>
            </span>
            <span class="area-detail-card__stats">
              <span class="area-detail-card__status">${area.status}</span>
              <span class="area-detail-card__count">${area.clearedCount}/${area.items.length}</span>
              <span class="area-detail-card__rate">${area.rate}%</span>
              <span class="area-detail-card__chevron" aria-hidden="true"></span>
            </span>
          </summary>
          <ul class="area-detail-card__chips">
            ${renderAreaChips(area.items)}
          </ul>
        </details>
      `).join("")}
    </div>
  `;

  areaDetails.querySelectorAll(".area-detail-card").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        expandedAreaName = detail.dataset.areaName || "";

        areaDetails.querySelectorAll(".area-detail-card[open]").forEach((openDetail) => {
          if (openDetail !== detail) {
            openDetail.open = false;
          }
        });

        return;
      }

      if ((detail.dataset.areaName || "") === expandedAreaName) {
        expandedAreaName = "";
      }
    });
  });
}

function updateAreaDetails() {
  renderAreaDetails();
}

function updateShareCard() {
  const shareCardRate = document.getElementById("shareCardRate");
  const shareCardTitle = document.getElementById("shareCardTitle");
  const shareCardTags = document.getElementById("shareCardTags");
  const shareCardStrongestArea = document.getElementById("shareCardStrongestArea");
  const shareCardWeakestArea = document.getElementById("shareCardWeakestArea");
  const sharePosterMeta = document.getElementById("sharePosterMeta");

  if (!shareCardRate || !shareCardTitle || !shareCardTags || !shareCardStrongestArea || !shareCardWeakestArea || !sharePosterMeta) {
    return;
  }

  const result = getCurrentResult();
  const tags = getPersonalityTags();
  const displayTags = tags.length > 0 ? tags : [DEFAULT_PERSONALITY_TAG];
  const strongestArea = getStrongestArea();
  const weakestArea = getWeakestArea();
  const shareTitle = document.getElementById("shareTitle");
  const shareSubtitle = document.querySelector(".share-poster__subtitle");

  shareCardRate.textContent = `${result.rate}%`;
  shareCardTitle.textContent = result.title;
  if (shareTitle) {
    shareTitle.textContent = SHARE_TITLE;
  }
  if (shareSubtitle) {
    shareSubtitle.textContent = SHARE_SUBTITLE;
  }
  shareCardStrongestArea.textContent = strongestArea
    ? `${strongestArea.name} ${strongestArea.rate}%`
    : "还在新手村入口";
  shareCardWeakestArea.textContent = weakestArea
    ? `${weakestArea.name} ${weakestArea.rate}%`
    : EMPTY_WEAKEST_AREA_TEXT;
  shareCardTags.innerHTML = "";
  sharePosterMeta.textContent = `${result.checkedCount}/${ITEMS.length} 项已点亮`;

  displayTags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "share-tag";
    tagElement.textContent = tag;
    shareCardTags.appendChild(tagElement);
  });
}

function updateShareMiniCampusMap() {
  const shareMiniMap = document.getElementById("shareMiniMap");

  if (!shareMiniMap) {
    return;
  }

  const areaStats = getAreaStats();
  const strongestArea = getStrongestArea();

  shareMiniMap.innerHTML = `
    <div class="share-mini-map__frame">
      <div class="share-mini-map__grid">
        ${areaStats.map((area) => renderMiniNode(area, strongestArea)).join("")}
      </div>
    </div>
  `;
}

function updateResult() {
  const result = getCurrentResult();

  document.getElementById("scoreValue").textContent = result.totalScore;
  document.getElementById("maxScoreValue").textContent = MAX_SCORE;
  document.getElementById("checkedValue").textContent = `${result.checkedCount}/${ITEMS.length}`;
  document.getElementById("rateValue").textContent = `${result.rate}%`;
  document.getElementById("titleValue").textContent = result.title;
  document.getElementById("progressFill").style.width = `${result.rate}%`;
  updateCampusMap();
  updateAreaDetails();
  updateShareCard();
  updateShareMiniCampusMap();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedLevels));
  } catch (error) {
    setCopyStatus("当前浏览器无法保存本地进度。");
  }
}

function loadState() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return Array(ITEMS.length).fill(0);
    }

    const parsedValue = JSON.parse(savedValue);

    if (!Array.isArray(parsedValue)) {
      return Array(ITEMS.length).fill(0);
    }

    return ITEMS.map((_, index) => {
      const value = Number(parsedValue[index]);
      return LEVELS.some((level) => level.value === value) ? value : 0;
    });
  } catch (error) {
    return Array(ITEMS.length).fill(0);
  }
}

function resetState() {
  selectedLevels = Array(ITEMS.length).fill(0);
  expandedAreaName = null;
  renderItems();
  updateResult();
  saveState();
  setCopyStatus("已重新生成空白版本。");
}

function copyShareText() {
  const rate = document.getElementById("rateValue").textContent;
  const title = document.getElementById("titleValue").textContent;
  const strongestArea = getStrongestArea();
  const weakestArea = getWeakestArea();
  const strongestAreaText = strongestArea
    ? `${strongestArea.name} ${strongestArea.rate}%`
    : "还在新手村入口";
  const weakestAreaText = weakestArea
    ? `${weakestArea.name} ${weakestArea.rate}%`
    : EMPTY_WEAKEST_AREA_TEXT;
  const shareText = `${COPY_SHARE_TITLE}\n制霸率：${rate}\n称号：${title}\n人格标签：${getPersonalityTagsText()}\n最强副本：${strongestAreaText}\n待通关副本：${weakestAreaText}\n深度体验项目：${getDominatedItemsText()}\n今日皮肤：${currentTheme.name}\n${FOOTER_TEXT}`;

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopyStatus("文案已复制，可以去分享了。");
      })
      .catch(() => {
        copyShareTextFallback(
          shareText,
          "文案已复制，可以去分享了。",
          "自动复制失败，请手动复制弹窗中的文案。"
        );
      });
    return;
  }

  copyShareTextFallback(
    shareText,
    "文案已复制，可以去分享了。",
    "当前浏览器不支持 Clipboard API，请手动复制弹窗中的文案。"
  );
}

function copyShareTextFallback(text, successMessage, failureMessage) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(textarea);

  if (copied) {
    setCopyStatus(successMessage);
    return;
  }

  setCopyStatus(failureMessage);
  window.prompt("请手动复制：", text);
}

function createExportPoster() {
  const exportTheme = getExportTheme();
  const result = getCurrentResult();
  const strongestArea = getStrongestArea();
  const weakestArea = getWeakestArea();
  const areaStats = getAreaStats();
  const displayTags = getPersonalityTags();
  const tags = displayTags.length > 0 ? displayTags : [DEFAULT_PERSONALITY_TAG];
  const strongestAreaText = strongestArea
    ? `${strongestArea.name} ${strongestArea.rate}%`
    : "还在新手村入口";
  const weakestAreaText = weakestArea
    ? `${weakestArea.name} ${weakestArea.rate}%`
    : EMPTY_WEAKEST_AREA_TEXT;
  const exportPoster = document.createElement("div");

  exportPoster.className = "export-poster";
  exportPoster.setAttribute("aria-hidden", "true");
  exportPoster.style.position = "fixed";
  exportPoster.style.left = "-9999px";
  exportPoster.style.top = "0";
  exportPoster.style.width = "720px";
  exportPoster.style.boxSizing = "border-box";
  exportPoster.style.padding = "36px";
  exportPoster.style.background = exportTheme.paper;
  exportPoster.style.color = exportTheme.ink;
  exportPoster.style.fontFamily = "\"PingFang SC\", \"Microsoft YaHei\", sans-serif";
  exportPoster.style.lineHeight = "1.4";

  exportPoster.innerHTML = `
    <div style="border:1px solid ${exportTheme.muted}; padding:32px; background:${exportTheme.paper}; box-sizing:border-box;">
      <div style="margin-bottom:24px;">
        <p style="margin:0 0 8px; font-size:14px; letter-spacing:1.8px; text-transform:uppercase; color:${exportTheme.muted};">CAMPUS LIFE REPORT</p>
        <h1 style="margin:0; font-size:36px; line-height:1.15; color:${exportTheme.ink};">${escapeHtml(SHARE_TITLE)}</h1>
        <p style="margin:10px 0 0; font-size:16px; color:${exportTheme.muted};">${escapeHtml(SHARE_SUBTITLE)}</p>
      </div>
      <div style="display:grid; grid-template-columns:1.1fr 0.9fr; gap:16px; margin-bottom:20px;">
        <div style="border:1px solid ${exportTheme.muted}; padding:20px; background:${exportTheme.paper};">
          <p style="margin:0 0 8px; font-size:13px; color:${exportTheme.muted};">制霸率</p>
          <p style="margin:0; font-size:52px; line-height:1; color:${exportTheme.accent}; font-weight:700;">${result.rate}%</p>
          <p style="margin:12px 0 0; font-size:15px; color:${exportTheme.ink};">${result.checkedCount}/${ITEMS.length} 项已点亮</p>
        </div>
        <div style="border:1px solid ${exportTheme.muted}; padding:20px; background:${exportTheme.tag};">
          <p style="margin:0 0 8px; font-size:13px; color:${exportTheme.muted};">称号</p>
          <p style="margin:0; font-size:28px; line-height:1.2; color:${exportTheme.ink}; font-weight:700;">${escapeHtml(result.title)}</p>
        </div>
      </div>
      <div style="margin-bottom:20px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
          <h2 style="margin:0; font-size:20px; color:${exportTheme.ink};">大学生活版图</h2>
          <p style="margin:0; font-size:12px; color:${exportTheme.muted};">7 区进度总览</p>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:10px;">
          ${areaStats.map((area) => {
            const isStrongest = strongestArea && strongestArea.name === area.name;
            const borderColor = isStrongest ? "#d45a3c" : exportTheme.muted;
            const badgeHtml = isStrongest
              ? `<span style="display:inline-block; margin-top:6px; padding:2px 6px; font-size:11px; line-height:1.2; color:#ffffff; background:#d45a3c;">最强</span>`
              : "";

            return `
              <div style="min-height:92px; box-sizing:border-box; border:2px solid ${borderColor}; padding:10px; background:${getExportMapColor(area.tone)}; color:${area.tone === "peak" ? "#ffffff" : exportTheme.ink};">
                <div style="font-size:15px; font-weight:700;">${escapeHtml(area.name)}</div>
                <div style="margin-top:8px; font-size:24px; font-weight:700;">${area.rate}%</div>
                ${badgeHtml}
              </div>
            `;
          }).join("")}
        </div>
      </div>
      <div style="margin-bottom:20px;">
        <h2 style="margin:0 0 10px; font-size:20px; color:${exportTheme.ink};">人格标签</h2>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          ${tags.map((tag) => `
            <span style="display:inline-block; padding:7px 12px; border:1px solid ${exportTheme.muted}; background:${exportTheme.tag}; color:${exportTheme.ink}; font-size:14px;">
              ${escapeHtml(tag)}
            </span>
          `).join("")}
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
        <div style="border:1px solid ${exportTheme.muted}; padding:16px;">
          <p style="margin:0 0 6px; font-size:13px; color:${exportTheme.muted};">最强副本</p>
          <p style="margin:0; font-size:22px; line-height:1.3; color:${exportTheme.ink}; font-weight:700;">${escapeHtml(strongestAreaText)}</p>
        </div>
        <div style="border:1px solid ${exportTheme.muted}; padding:16px;">
          <p style="margin:0 0 6px; font-size:13px; color:${exportTheme.muted};">待通关副本</p>
          <p style="margin:0; font-size:22px; line-height:1.3; color:${exportTheme.ink}; font-weight:700;">${escapeHtml(weakestAreaText)}</p>
        </div>
      </div>
      <p style="margin:0 0 18px; font-size:12px; color:${exportTheme.muted}; text-align:right;">
        今日皮肤：<span style="color:${exportTheme.ink}; font-weight:700;">${escapeHtml(exportTheme.themeName)}</span>
      </p>
      <p style="margin:0; padding-top:16px; border-top:1px solid ${exportTheme.muted}; font-size:14px; color:${exportTheme.muted};">
        ${escapeHtml(FOOTER_TEXT)}
      </p>
    </div>
  `;

  return exportPoster;
}

function downloadShareImage() {
  if (typeof window.html2canvas !== "function") {
    setCopyStatus("本地 html2canvas 未加载，请放置 vendor/html2canvas.min.js；当前可长按或截图保存分享卡片。");
    return;
  }

  setCopyStatus("正在生成海报...");
  const exportPoster = createExportPoster();
  document.body.appendChild(exportPoster);

  window.html2canvas(exportPoster, {
    backgroundColor: currentTheme && currentTheme.paper ? currentTheme.paper : "#fffaf0",
    scale: 2,
    useCORS: false,
    allowTaint: true,
    logging: true,
    foreignObjectRendering: false
  })
    .then((canvas) => {
      try {
        const imageDataUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imageDataUrl;
        downloadLink.download = SHARE_IMAGE_FILE_NAME;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setCopyStatus("海报已保存。");
      } catch (error) {
        console.error("Export download failed:", error);
        console.error(error);
        setCopyStatus("生成海报失败，请查看控制台错误，或截图保存。");
      }
    })
    .catch((error) => {
      console.error("html2canvas export poster failed:", error);
      console.error(error);
      setCopyStatus("生成海报失败，请查看控制台错误，或截图保存。");
    })
    .finally(() => {
      exportPoster.remove();
    });
}

function updateItemSelection(index, value) {
  selectedLevels[index] = value;

  const card = document.querySelector(`.item-card[data-index="${index}"]`);
  const levelText = document.getElementById(`itemLevelText${index}`);

  if (!card || !levelText) {
    return;
  }

  levelText.textContent = getLevelByValue(value).label;

  card.querySelectorAll(".level-button").forEach((button) => {
    const isSelected = Number(button.dataset.value) === value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function setCopyStatus(message) {
  document.getElementById("copyStatus").textContent = message;
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  selectedLevels = loadState();
  renderItems();
  renderCampusMap();
  renderAreaDetails();
  updateResult();

  document.getElementById("itemsGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".level-button");

    if (!button) {
      return;
    }

    const index = Number(button.dataset.index);
    const value = Number(button.dataset.value);

    updateItemSelection(index, value);
    updateResult();
    saveState();
    setCopyStatus("");
  });

  document.getElementById("resetButton").addEventListener("click", resetState);
  document.getElementById("copyButton").addEventListener("click", copyShareText);
  document.getElementById("downloadButton").addEventListener("click", downloadShareImage);
  document.getElementById("themeButton").addEventListener("click", switchTheme);
});
