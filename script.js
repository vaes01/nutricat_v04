const translations = {
  en: {
    hero: "How much should I feed my cat?",
    weightLabel: "Cat Weight (kg)",
    typeLabel: "Cat Type",
    productLabel: "Select food product",
    foodLabel: "Food Energy (kcal/kg)",
    disclaimer: "This calculator provides an estimate based on the 2021 AAHA Nutrition and Weight Management Guidelines for Dogs and Cats. Always consult your veterinarian.",
    fillFields: "Please fill in all fields.",
    kcalDay: "kcal/day",
    gramsDay: "grams/day",
    selectFood: "-- Select food --",
    customFood: "Custom",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    copyResult: "Copy Result",
    downloadImage: "Download / Share",
    shareText: "Share this calculator with other cat owners 🐱",
    shareMessage: "Divide into 2–3 meals per day"
  },
  pt: {
    hero: "Quanto devo alimentar meu gato?",
    weightLabel: "Peso do gato (kg)",
    typeLabel: "Tipo de gato",
    productLabel: "Selecionar alimento",
    foodLabel: "Energia do alimento (kcal/kg)",
    disclaimer: "Esta calculadora fornece uma estimativa com base nas diretrizes do 2021 AAHA Nutrition and Weight Management Guidelines for Dogs and Cats. Consulte sempre seu veterinário.",
    fillFields: "Por favor, preencha todos os campos.",
    kcalDay: "kcal/dia",
    gramsDay: "gramas/dia",
    selectFood: "-- Escolher alimento --",
    customFood: "Personalizado",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",
    english: "PT-BR",
    portuguese: "English",
    copyResult: "Copiar resultado",
    downloadImage: "Baixar / Compartilhar",
    shareText: "Compartilhe esta calculadora com outros donos de gatos 🐱",
    shareMessage: "Divida em 2–3 refeições por dia"
  }
};

let currentLang = localStorage.getItem("lang") || "en";

const weightInput = document.getElementById("weight");
const weightRange = document.getElementById("weightRange");
const typeSelect = document.getElementById("type");
const foodSelect = document.getElementById("foodSelect");
const foodEnergyInput = document.getElementById("foodEnergy");
const foodRange = document.getElementById("foodRange");
const resultDiv = document.getElementById("result");
// const langToggle = document.getElementById("langToggle");
const darkToggle = document.getElementById("darkToggle");
const darkModeLabel = document.getElementById("darkModeLabel");
// const langLabel = document.getElementById("langLabel");

function applyLanguage() {
  const t = translations[currentLang];
  document.getElementById("hero").innerText = t.hero;
  document.getElementById("weightLabel").innerText = t.weightLabel;
  document.getElementById("typeLabel").innerText = t.typeLabel;
  document.getElementById("productLabel").innerText = t.productLabel;
  document.getElementById("foodLabel").innerText = t.foodLabel;
  document.getElementById("disclaimer").innerText = t.disclaimer;
  document.getElementById("copyResult").innerText = t.copyResult;
  document.getElementById("downloadImage").innerText = t.downloadImage;
  document.getElementById("shareText").innerText = t.shareText;
 

  weightInput.placeholder = currentLang==="en"?"e.g. 4.5":"ex: 4,5";
  document.querySelectorAll("#type option").forEach(opt=>{opt.textContent=opt.getAttribute(`data-${currentLang}`)});
  populateFoodList();
}

function populateFoodList() {
  const t = translations[currentLang];
  const selectedId = foodSelect.value;
  foodSelect.innerHTML = "";
  const defaultOption=document.createElement("option");
  defaultOption.value=""; defaultOption.textContent=t.selectFood;
  foodSelect.appendChild(defaultOption);
  const customOption=document.createElement("option");
  customOption.value="custom"; customOption.textContent=t.customFood;
  foodSelect.appendChild(customOption);
  foods.forEach(food=>{
    const option=document.createElement("option");
    option.value=food.id;
    option.textContent=`${food.brand[currentLang]} - ${food.name[currentLang]}`;
    foodSelect.appendChild(option);
  });
  if(selectedId) foodSelect.value=selectedId;
}

function recalculate() {
  const t = translations[currentLang];

  let weight=parseFloat(weightInput.value.replace(',','.'));

  let multiplier=parseFloat(typeSelect.value);
  let foodEnergy=parseFloat(foodEnergyInput.value);

  if (!weight || weight <= 0 || !foodEnergy || foodEnergy <= 0) {
  resultDiv.innerHTML = t.fillFields;
  return;
}

  
  const RER=70*Math.pow(weight,0.75);
  const calories=RER*multiplier;
  const grams=(calories/foodEnergy)*1000;
  resultDiv.innerHTML=`<strong>${calories.toFixed(0)} ${t.kcalDay}</strong><br>≈ <strong>${grams.toFixed(0)} ${t.gramsDay}</strong>`;
}

// Event Listeners
foodSelect.addEventListener("change", function () {

  if (this.value === "custom" || this.value === "") {
    localStorage.removeItem("lastFood");
  } else {
    const selectedFood = foods.find(f => f.id == this.value);
    if (selectedFood) {
      foodEnergyInput.value = selectedFood.energy;
      foodRange.value = selectedFood.energy;
      localStorage.setItem("lastFood", selectedFood.id);
    }

    if (typeof gtag !== "undefined") {
      gtag('event', 'select_food', {
        event_category: 'interaction',
        event_label: this.value
      });
    }
  }

  recalculate();
});

weightInput.addEventListener("input",()=>{weightRange.value=weightInput.value; recalculate();});
weightRange.addEventListener("input",()=>{weightInput.value=weightRange.value; recalculate();});
function setCustomFoodIfManualChange(){ if(foodSelect.value!=="custom"){foodSelect.value="custom"; localStorage.removeItem("lastFood");} };
foodEnergyInput.addEventListener("input",()=>{foodRange.value=foodEnergyInput.value; setCustomFoodIfManualChange(); recalculate();});
foodRange.addEventListener("input",()=>{foodEnergyInput.value=foodRange.value; setCustomFoodIfManualChange(); recalculate();});
typeSelect.addEventListener("change",recalculate);



darkToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark", this.checked);
  localStorage.setItem("darkMode", this.checked);

  const t = translations[currentLang];
  darkModeLabel.innerText = this.checked ? t.lightMode : t.darkMode;
});

window.addEventListener("load",()=>{
  darkToggle.checked = localStorage.getItem("darkMode")==="true";
  applyLanguage();
  const lastFood = localStorage.getItem("lastFood");
  if(lastFood) foodSelect.value=lastFood;
  recalculate();
});

// Copy & Share
const copyButton=document.getElementById("copyResult");

copyButton.addEventListener("click", async () => {
  const text = resultDiv.innerText;

  if (!text || text.trim() === "") {
    alert("Nothing to copy yet.");
    return;
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    if (typeof gtag !== "undefined") {
      gtag('event', 'copy_result', {
        event_category: 'engagement',
        event_label: 'copy_button'
      });
    }

    copyButton.innerText = "Copied ✓";

    setTimeout(() => {
      copyButton.innerText = translations[currentLang].copyResult;
    }, 2000);

  } catch (err) {
    console.error("Copy failed:", err);
    alert("Copy failed. Please copy manually.");
  }
});





const canvas=document.getElementById("shareCanvas");
const ctx=canvas.getContext("2d");
const downloadBtn=document.getElementById("downloadImage");

function drawShareImage(calories, grams){
  const t = translations[currentLang];
  canvas.style.display="block";
  ctx.fillStyle="#ffe6f0"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#ff2e8a"; ctx.font="bold 20px Arial"; ctx.fillText("🐱 NutriCat",20,40);
  ctx.fillStyle="#333"; ctx.font="16px Arial";
  ctx.fillText(`${t.hero}`,20,70);
  ctx.fillText(`${calories} ${t.kcalDay}`,20,100);
  ctx.fillText(`≈ ${grams} ${t.gramsDay}`,20,130);
  ctx.fillText(t.shareMessage,20,160);
}

downloadBtn.addEventListener("click", () => {
  if (typeof gtag !== "undefined") {
    gtag('event', 'download_image', {
      event_category: 'engagement',
      event_label: 'share_image'
    });
  }

  const weightVal = parseFloat(weightInput.value) || 0;
  const mult = parseFloat(typeSelect.value) || 1;
  const energy = parseFloat(foodEnergyInput.value) || 1;

  const calories = Math.round(70 * Math.pow(weightVal, 0.75) * mult);
  const grams = Math.round((calories / energy) * 1000);

  drawShareImage(calories, grams);

  const link = document.createElement("a");
  link.download = "NutriCat_Result.png";
  link.href = canvas.toDataURL();
  link.click();
});

// track answers

document.querySelectorAll(".feedback-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    const answer = btn.getAttribute("data-answer");

    gtag('event', 'feedback_answer', {
      event_category: 'feedback',
      event_label: answer
    });

    const originalText = btn.innerText;

    btn.innerText = "Thanks! 🐱";

    setTimeout(() => {
      btn.innerText = originalText;
    }, 2000);
  });
});