"use strict";

const DESIGN_WIDTH = 3600;
const DESIGN_HEIGHT = 1740;
const CARD_WIDTH = 320;
const CARD_HEIGHT = 213.33;
const ASSET_ROOT = "assets/cartes/";

const cards = [
  { id: "z", file: "01_Z_CO2_Carbonifere.jpg", title: "Le dioxyde de carbone atmosphérique durant le Carbonifère", x: 40, y: 300 },

  { id: "land-photo", file: "02_S_photosynthese_terre.jpg", title: "Photosynthèse et matière organique sur terre", x: 430, y: 70 },
  { id: "land-death", file: "03_O_mort_vegetaux_terrestres.jpg", title: "Mort des végétaux terrestres", x: 830, y: 70 },
  { id: "land-bury", file: "04_L_enfouissement_terre.jpg", title: "Enfouissement sur terre", x: 1230, y: 70 },
  { id: "land-time", file: "05_E_millions_annees_terre.jpg", title: "Des millions d’années sur terre", x: 1630, y: 70 },
  { id: "coal-form", file: "06_I_formation_charbon.jpg", title: "Formation du charbon", x: 2030, y: 70 },
  { id: "coal", file: "07_L_le_charbon.jpg", title: "Le charbon", x: 2430, y: 70 },
  { id: "coal-extract", file: "15_C_extraction_charbon.jpg", title: "Extraction du charbon", x: 2830, y: 70 },
  { id: "y", file: "14_Y_CO2_annees_1800.jpg", title: "Le dioxyde de carbone atmosphérique dans les années 1800", x: 3230, y: 70 },

  { id: "sea-photo", file: "08_O_photosynthese_mer.jpg", title: "Photosynthèse et matière organique en mer", x: 430, y: 510 },
  { id: "sea-death", file: "09_C_mort_phytoplancton.jpg", title: "Mort du phytoplancton", x: 830, y: 510 },
  { id: "sea-bury", file: "10_E_enfouissement_mer.jpg", title: "Enfouissement en mer", x: 1230, y: 510 },
  { id: "sea-time", file: "11_A_millions_annees_mer.jpg", title: "Des millions d’années en mer", x: 1630, y: 510 },
  { id: "oil-form", file: "12_N_formation_petrole_gaz.jpg", title: "Formation du pétrole et du gaz", x: 2030, y: 510 },
  { id: "oil", file: "13_S_petrole_gaz.jpg", title: "Le pétrole et le gaz", x: 2430, y: 510 },
  { id: "oil-extract", file: "16_T_extraction_petrole_gaz.jpg", title: "Extraction du pétrole et du gaz", x: 2830, y: 510 },

  { id: "burn", file: "17_A_combustion.jpg", title: "La combustion", x: 3230, y: 510 },
  { id: "fossil-co2", file: "18_R_carbone_fossile_CO2.jpg", title: "Le carbone fossile devient du CO₂", x: 3230, y: 800 },
  { id: "increase", file: "19_T_augmentation_CO2.jpg", title: "Une augmentation du CO₂ atmosphérique", x: 2830, y: 800 },
  { id: "today", file: "20_E_CO2_aujourdhui.jpg", title: "Le dioxyde de carbone atmosphérique aujourd’hui", x: 2430, y: 800 },
  { id: "reinforce", file: "22_T_renforcement_effet_serre.jpg", title: "Le renforcement de l’effet de serre", x: 2030, y: 800 },
  { id: "climate", file: "23_A_changement_climatique.jpg", title: "Le changement climatique", x: 1630, y: 800 },
  { id: "sea-level", file: "24_G_elevation_niveau_mers.jpg", title: "Élévation du niveau des mers", x: 1230, y: 1120 },
  { id: "ecosystems", file: "25_L_perturbation_ecosystemes.jpg", title: "Perturbation des écosystèmes", x: 1630, y: 1120 },
  { id: "societies", file: "26_P_consequences_societes.jpg", title: "Conséquences pour les sociétés humaines", x: 2030, y: 1120 },
  { id: "energy", file: "27_E_energies_plus_vertes.jpg", title: "Vers des énergies plus vertes ?", x: 1630, y: 1440 }
];

const edges = [
  ["z", "land-photo"], ["z", "sea-photo"],
  ["land-photo", "land-death"], ["land-death", "land-bury"], ["land-bury", "land-time"], ["land-time", "coal-form"], ["coal-form", "coal"],
  ["sea-photo", "sea-death"], ["sea-death", "sea-bury"], ["sea-bury", "sea-time"], ["sea-time", "oil-form"], ["oil-form", "oil"],
  ["coal", "coal-extract"], ["coal-extract", "y"],
  ["oil", "oil-extract"],
  ["y", "burn"], ["oil-extract", "burn"],
  ["burn", "fossil-co2"], ["fossil-co2", "increase"], ["increase", "today"],
  ["today", "reinforce"], ["reinforce", "climate"],
  ["climate", "sea-level"], ["climate", "ecosystems"], ["climate", "societies"],
  ["sea-level", "energy", true], ["ecosystems", "energy", true], ["societies", "energy", true]
];

const revealOrder = [
  "z",
  "land-photo", "land-death", "land-bury", "land-time", "coal-form", "coal", "coal-extract", "y",
  "sea-photo", "sea-death", "sea-bury", "sea-time", "oil-form", "oil",
  "oil-extract", "burn", "fossil-co2", "increase", "today",
  "reinforce", "climate", "sea-level", "ecosystems", "societies", "energy"
];

const canvas = document.querySelector("#frescoCanvas");
const canvasShell = document.querySelector("#canvasShell");
const viewport = document.querySelector("#viewport");
const arrows = document.querySelector("#arrows");
const progressText = document.querySelector("#progressText");
const nextButton = document.querySelector("#nextButton");
const previousButton = document.querySelector("#previousButton");
const cover = document.querySelector("#cover");
const dialog = document.querySelector("#cardDialog");
const dialogImage = document.querySelector("#dialogImage");

const cardElements = new Map();
const arrowElements = [];
let revealed = 0;
let zoom = .82;

function cardCenter(id) {
  const card = cards.find(item => item.id === id);
  return { x: card.x + CARD_WIDTH / 2, y: card.y + CARD_HEIGHT / 2 };
}

function edgePath(fromId, toId) {
  const a = cardCenter(fromId);
  const b = cardCenter(toId);
  const vertical = Math.abs(b.y - a.y) > Math.abs(b.x - a.x);
  if (vertical) {
    const startY = a.y + (b.y >= a.y ? CARD_HEIGHT / 2 : -CARD_HEIGHT / 2);
    const endY = b.y + (b.y >= a.y ? -CARD_HEIGHT / 2 - 10 : CARD_HEIGHT / 2 + 10);
    const midY = (startY + endY) / 2;
    return `M ${a.x} ${startY} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${endY}`;
  }
  const startX = a.x + (b.x >= a.x ? CARD_WIDTH / 2 : -CARD_WIDTH / 2);
  const endX = b.x + (b.x >= a.x ? -CARD_WIDTH / 2 - 10 : CARD_WIDTH / 2 + 10);
  const midX = (startX + endX) / 2;
  return `M ${startX} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${endX} ${b.y}`;
}

function buildFresco() {
  cards.forEach(card => {
    const node = document.createElement("article");
    node.className = "card-node";
    node.dataset.id = card.id;
    node.style.left = `${card.x}px`;
    node.style.top = `${card.y}px`;
    node.innerHTML = `<img src="${ASSET_ROOT + card.file}" alt="${card.title.replaceAll('"', '&quot;')}">`;
    node.addEventListener("click", event => {
      event.stopPropagation();
      dialogImage.src = ASSET_ROOT + card.file;
      dialogImage.alt = card.title;
      dialog.showModal();
    });
    canvas.appendChild(node);
    cardElements.set(card.id, node);
  });

  edges.forEach(([from, to, response]) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", edgePath(from, to));
    path.setAttribute("class", `arrow-path${response ? " response" : ""}`);
    arrows.appendChild(path);
    arrowElements.push({ from, to, path });
  });
}

function setZoom(nextZoom) {
  zoom = Math.max(.22, Math.min(1.45, nextZoom));
  canvas.style.transform = `scale(${zoom})`;
  canvasShell.style.width = `${DESIGN_WIDTH * zoom}px`;
  canvasShell.style.height = `${DESIGN_HEIGHT * zoom}px`;
}

function visibleIds() { return new Set(revealOrder.slice(0, revealed)); }

function renderState({ focus = true } = {}) {
  const visible = visibleIds();
  cardElements.forEach((node, id) => node.classList.toggle("visible", visible.has(id)));
  arrowElements.forEach(({ from, to, path }) => path.classList.toggle("visible", visible.has(from) && visible.has(to)));
  progressText.textContent = `${revealed} carte${revealed > 1 ? "s" : ""} sur ${revealOrder.length}`;
  previousButton.disabled = revealed === 0;
  nextButton.disabled = revealed === revealOrder.length;
  nextButton.textContent = revealed === revealOrder.length ? "Fresque complète" : "Carte suivante";
  if (focus && revealed > 0) focusCard(revealOrder[revealed - 1]);
}

function focusCard(id) {
  const card = cards.find(item => item.id === id);
  const left = (card.x + CARD_WIDTH / 2) * zoom - viewport.clientWidth / 2 + 44;
  const top = (card.y + CARD_HEIGHT / 2) * zoom - viewport.clientHeight / 2 + 44;
  viewport.scrollTo({ left: Math.max(0, left), top: Math.max(0, top), behavior: "smooth" });
}

function revealNext() {
  if (revealed >= revealOrder.length) return;
  revealed += 1;
  renderState();
}

function revealPrevious() {
  if (revealed <= 0) return;
  revealed -= 1;
  renderState();
}

function showOverview() {
  const scaleX = (viewport.clientWidth - 90) / DESIGN_WIDTH;
  const scaleY = (viewport.clientHeight - 90) / DESIGN_HEIGHT;
  setZoom(Math.min(scaleX, scaleY));
  viewport.scrollTo({ left: 0, top: 0, behavior: "smooth" });
}

document.querySelector("#startButton").addEventListener("click", () => {
  cover.classList.add("hidden");
  if (revealed === 0) revealNext();
});
nextButton.addEventListener("click", revealNext);
previousButton.addEventListener("click", revealPrevious);
document.querySelector("#overviewButton").addEventListener("click", showOverview);
document.querySelector("#resetButton").addEventListener("click", () => {
  revealed = 0;
  setZoom(.82);
  renderState({ focus: false });
  viewport.scrollTo({ left: 0, top: 0 });
  cover.classList.remove("hidden");
});
document.querySelector("#fullscreenButton").addEventListener("click", async () => {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
  else await document.exitFullscreen();
});
document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  const outsideImage = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outsideImage || event.target === dialog) dialog.close();
});
viewport.addEventListener("click", event => { if (event.target === viewport || event.target === canvas || event.target === canvasShell) revealNext(); });

document.addEventListener("keydown", event => {
  if (dialog.open) {
    if (event.key === "Escape") dialog.close();
    return;
  }
  if ([" ", "ArrowRight", "Enter"].includes(event.key)) {
    event.preventDefault();
    if (!cover.classList.contains("hidden")) {
      cover.classList.add("hidden");
      if (revealed === 0) revealNext();
    } else revealNext();
  }
  if (event.key === "ArrowLeft") revealPrevious();
});

buildFresco();
setZoom(zoom);
renderState({ focus: false });

