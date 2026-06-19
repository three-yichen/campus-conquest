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
  { value: 0, label: "没体验" },
  { value: 1, label: "体验过" },
  { value: 2, label: "熟练" },
  { value: 3, label: "痛苦精通" },
  { value: 4, label: "已经麻木" }
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
    name: "新手村",
    items: ["军训", "早八", "食堂高峰排队", "抢课失败", "抢课成功"]
  },
  {
    name: "主线副本",
    items: ["图书馆自习", "小组作业背锅", "凌晨赶 ddl", "期末周极限求生", "绩点焦虑发作", "论文格式大战", "课堂展示硬撑", "答辩"]
  },
  {
    name: "支线副本",
    items: ["社团活动", "学生会/组织工作", "讲座签到速通", "参加竞赛", "奖学金申请"]
  },
  {
    name: "生存副本",
    items: ["校医院开药", "体测渡劫", "打印店赛博救命", "校园卡丢失", "外卖进校"]
  },
  {
    name: "青春副本",
    items: ["逃课", "宿舍夜聊", "校园恋爱", "操场散步", "实习", "考研/保研焦虑", "毕业照"]
  }
];

const STORAGE_KEY = "campus-conquest-state";
const FOOTER_TEXT = "不是所有人都能绩点制霸，但每个人都可以期末周幸存。";
const DEFAULT_PERSONALITY_TAG = "普通大学生";
const DOMINATED_LEVEL = 3;
const MAX_DOMINATED_ITEMS = 8;
const MAX_PERSONALITY_TAGS = 3;
const EMPTY_DOMINATED_TEXT = "还在新手村探索中";
const SHARE_IMAGE_FILE_NAME = "campus-conquest-report.png";
const MAX_LEVEL = Math.max(...LEVELS.map((level) => level.value));
const MAX_SCORE = ITEMS.length * MAX_LEVEL;

let selectedLevels = Array(ITEMS.length).fill(0);

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
              >
                <span class="level-number">${level.value}</span>
                <span class="level-label">${level.label}</span>
              </button>
            `;
          }).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function updateResult() {
  const result = getCurrentResult();

  document.getElementById("scoreValue").textContent = result.totalScore;
  document.getElementById("maxScoreValue").textContent = MAX_SCORE;
  document.getElementById("checkedValue").textContent = `${result.checkedCount}/${ITEMS.length}`;
  document.getElementById("rateValue").textContent = `${result.rate}%`;
  document.getElementById("titleValue").textContent = result.title;
  document.getElementById("progressFill").style.width = `${result.rate}%`;
  updateMapAreas();
  updateShareCard();
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
      const itemIndex = ITEMS.indexOf(item);
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

function getDominatedItems(limit = MAX_DOMINATED_ITEMS) {
  return ITEMS.filter((_, index) => selectedLevels[index] >= DOMINATED_LEVEL)
    .slice(0, limit);
}

function getDominatedItemsText() {
  const dominatedItems = getDominatedItems();

  if (dominatedItems.length === 0) {
    return EMPTY_DOMINATED_TEXT;
  }

  const dominatedCount = selectedLevels.filter((value) => value >= DOMINATED_LEVEL).length;
  const suffix = dominatedCount > MAX_DOMINATED_ITEMS ? "……" : "";

  return `${dominatedItems.join("、")}${suffix}`;
}

function getPersonalityTagsText() {
  const tags = getPersonalityTags();
  return tags.length > 0 ? tags.join(" / ") : DEFAULT_PERSONALITY_TAG;
}

function getAreaStatus(rate) {
  if (rate < 30) {
    return "未探索";
  }

  if (rate < 60) {
    return "探索中";
  }

  if (rate < 90) {
    return "接近制霸";
  }

  return "已制霸";
}

function getAreaStats() {
  return MAP_AREAS.map((area, index) => {
    const totalScore = area.items.reduce((sum, item) => {
      const itemIndex = ITEMS.indexOf(item);
      return sum + (itemIndex === -1 ? 0 : selectedLevels[itemIndex]);
    }, 0);
    const maxScore = area.items.length * MAX_LEVEL;
    const rate = maxScore === 0 ? 0 : Math.round((totalScore / maxScore) * 100);
    const clearedCount = area.items.reduce((count, item) => {
      const itemIndex = ITEMS.indexOf(item);
      return count + (itemIndex !== -1 && selectedLevels[itemIndex] > 0 ? 1 : 0);
    }, 0);

    return {
      ...area,
      index,
      totalScore,
      maxScore,
      rate,
      clearedCount,
      status: getAreaStatus(rate)
    };
  });
}

function getStrongestArea() {
  const areaStats = getAreaStats();
  const strongestArea = areaStats.reduce((bestArea, area) => {
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

function renderMapAreas() {
  const mapAreas = document.getElementById("mapAreas");

  if (!mapAreas) {
    return;
  }

  mapAreas.innerHTML = getAreaStats().map((area) => {
    const itemTags = area.items.map((item) => `<li>${item}</li>`).join("");

    return `
      <article class="map-area-card map-area-card--${area.index + 1}" data-area-index="${area.index}">
        <div class="map-area-card__path" aria-hidden="true">
          <span class="map-area-card__step">${String(area.index + 1).padStart(2, "0")}</span>
          <span class="map-area-card__arrow">→</span>
        </div>
        <div class="map-area-card__head">
          <div>
            <p class="map-area-card__eyebrow">Campus Route ${area.index + 1}</p>
            <h3>${area.name}</h3>
          </div>
          <span class="map-area-card__status" id="mapAreaStatus${area.index}">${area.status}</span>
        </div>
        <dl class="map-area-card__meta">
          <div>
            <dt>区域完成率</dt>
            <dd id="mapAreaRate${area.index}">${area.rate}%</dd>
          </div>
          <div>
            <dt>已激活项目</dt>
            <dd id="mapAreaChecked${area.index}">${area.clearedCount}/${area.items.length}</dd>
          </div>
        </dl>
        <ul class="map-area-card__items">
          ${itemTags}
        </ul>
      </article>
    `;
  }).join("");
}

function updateMapAreas() {
  getAreaStats().forEach((area) => {
    const areaCard = document.querySelector(`.map-area-card[data-area-index="${area.index}"]`);
    const rateElement = document.getElementById(`mapAreaRate${area.index}`);
    const checkedElement = document.getElementById(`mapAreaChecked${area.index}`);
    const statusElement = document.getElementById(`mapAreaStatus${area.index}`);

    if (!areaCard || !rateElement || !checkedElement || !statusElement) {
      return;
    }

    areaCard.dataset.state = area.status;
    rateElement.textContent = `${area.rate}%`;
    checkedElement.textContent = `${area.clearedCount}/${area.items.length}`;
    statusElement.textContent = area.status;
  });
}

function updateShareCard() {
  const shareCardRate = document.getElementById("shareCardRate");
  const shareCardTitle = document.getElementById("shareCardTitle");
  const shareCardTags = document.getElementById("shareCardTags");
  const shareCardStrongestArea = document.getElementById("shareCardStrongestArea");
  const shareCardItems = document.getElementById("shareCardItems");
  const shareCardItemsMore = document.getElementById("shareCardItemsMore");

  if (!shareCardRate || !shareCardTitle || !shareCardTags || !shareCardStrongestArea || !shareCardItems || !shareCardItemsMore) {
    return;
  }

  const result = getCurrentResult();
  const tags = getPersonalityTags();
  const displayTags = tags.length > 0 ? tags : [DEFAULT_PERSONALITY_TAG];
  const dominatedItems = getDominatedItems();
  const dominatedCount = selectedLevels.filter((value) => value >= DOMINATED_LEVEL).length;
  const strongestArea = getStrongestArea();

  shareCardRate.textContent = `${result.rate}%`;
  shareCardTitle.textContent = result.title;
  shareCardStrongestArea.textContent = strongestArea
    ? `${strongestArea.name} ${strongestArea.rate}%`
    : "还在新手村入口";
  shareCardTags.innerHTML = "";
  shareCardItems.innerHTML = "";

  displayTags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "share-tag";
    tagElement.textContent = tag;
    shareCardTags.appendChild(tagElement);
  });

  if (dominatedItems.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "share-items-list__empty";
    emptyItem.textContent = EMPTY_DOMINATED_TEXT;
    shareCardItems.appendChild(emptyItem);
  } else {
    dominatedItems.forEach((item) => {
      const itemElement = document.createElement("li");
      itemElement.textContent = item;
      shareCardItems.appendChild(itemElement);
    });
  }

  shareCardItemsMore.textContent = dominatedCount > MAX_DOMINATED_ITEMS
    ? `还有 ${dominatedCount - MAX_DOMINATED_ITEMS} 项也已制霸`
    : "";
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
  renderItems();
  updateResult();
  saveState();
  setCopyStatus("已重置所有项目。");
}

function copyShareText() {
  const rate = document.getElementById("rateValue").textContent;
  const title = document.getElementById("titleValue").textContent;
  const strongestArea = getStrongestArea();
  const strongestAreaText = strongestArea
    ? `${strongestArea.name} ${strongestArea.rate}%`
    : "还在新手村入口";
  const shareText = `我的大学生制霸率是 ${rate}，称号是「${title}」。\n我的大学人格：${getPersonalityTagsText()}\n最强副本：${strongestAreaText}\n已制霸项目：${getDominatedItemsText()}\n${FOOTER_TEXT}`;

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopyStatus("已复制分享文案。");
      })
      .catch(() => {
        copyShareTextFallback(
          shareText,
          "已使用兼容方式复制分享文案。",
          "自动复制失败，请手动复制弹窗中的文案。"
        );
      });
    return;
  }

  copyShareTextFallback(
    shareText,
    "当前浏览器不支持 Clipboard API，已使用兼容方式复制。",
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

function downloadShareImage() {
  const sharePoster = document.querySelector(".share-poster");

  if (!sharePoster) {
    setCopyStatus("未找到分享卡片，暂时无法导出图片。");
    return;
  }

  if (typeof window.html2canvas !== "function") {
    setCopyStatus("本地 html2canvas 未加载，请放置 vendor/html2canvas.min.js；当前可长按或截图保存分享卡片。");
    return;
  }

  setCopyStatus("正在生成分享图...");

  window.html2canvas(sharePoster, {
    backgroundColor: null,
    scale: Math.max(window.devicePixelRatio || 1, 2),
    useCORS: false
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
        setCopyStatus(`已下载分享图：${SHARE_IMAGE_FILE_NAME}`);
      } catch (error) {
        setCopyStatus("下载失败，请长按或截图保存分享卡片。");
      }
    })
    .catch(() => {
      setCopyStatus("生成分享图失败，请长按或截图保存分享卡片。");
    });
}

function getLevelByValue(value) {
  return LEVELS.find((level) => level.value === value) || LEVELS[0];
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
  selectedLevels = loadState();
  renderItems();
  renderMapAreas();
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
});
