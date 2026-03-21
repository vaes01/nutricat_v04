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
    english: "PT-BR",
    portuguese: "English",
    copyResult: "Copy Result",
    downloadImage: "Download / Share",
    shareText: "Share this calculator with other cat owners 🐱",
    seoContent: `
<h2>How Much Should I Feed My Cat?</h2>
<p>The amount of food a cat needs depends mainly on body weight, activity level, and the energy density of the food. Most adult cats require between 40–50 calories per kilogram of body weight per day, but this can vary.</p>
<p>Our NutriCat calculator estimates daily calorie needs using the Resting Energy Requirement (RER) formula used in veterinary nutrition.</p>
<h3>Cat Calorie Formula</h3>
<p><strong>RER = 70 × (body weight in kg)<sup>0.75</sup></strong></p>
<p>This value is multiplied by a factor depending on the cat’s life stage (neutered adult, kitten, weight loss, etc.).</p>
<h3>How Many Meals Should a Cat Eat Per Day?</h3>
<p>Most cats do best when their daily food portion is divided into two or three meals per day. Feeding multiple small meals helps maintain stable energy levels and prevent overeating.</p>
<h3>Wet Food vs Dry Food</h3>
<p>Dry cat food usually contains 3500–4200 kcal/kg, while wet food has fewer calories. Check the food packaging for exact calorie information.</p>
<h3>Important Note</h3>
<p>This calculator provides an estimate based on veterinary nutrition guidelines. Individual cats may vary. Consult your veterinarian for personalized advice.</p>`,
    faqContent: `
<h2>Cat Feeding FAQ</h2>
<h3>How much food should a cat eat per day?</h3>
<p>Most adult cats need about 40–50 calories per kilogram of body weight per day.</p>
<h3>How many times per day should I feed my cat?</h3>
<p>Divide the daily food amount into two or three meals per day.</p>
<h3>How many grams of dry food should a cat eat?</h3>
<p>This depends on the calorie density of the food. Use the calculator above.</p>
<h3>Can I mix wet and dry food?</h3>
<p>Yes. Ensure total daily calories stay within recommended intake.</p>
`,
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
    seoContent: `
<h2>Quanto devo alimentar meu gato?</h2>
<p>A quantidade de alimento que um gato precisa depende principalmente do peso corporal, nível de atividade e densidade energética do alimento. A maioria dos gatos adultos precisa entre 40–50 calorias por quilograma de peso corporal por dia, mas isso pode variar.</p>
<p>Nosso calculador NutriCat estima as necessidades calóricas diárias usando a fórmula de Requisito Energético de Repouso (RER) utilizada na nutrição veterinária.</p>
<h3>Fórmula de Calorias para Gatos</h3>
<p><strong>RER = 70 × (peso corporal em kg)<sup>0.75</sup></strong></p>
<p>Esse valor é multiplicado por um fator dependendo do estágio de vida do gato (adulto castrado, filhote, perda de peso etc.).</p>
<h3>Quantas refeições por dia?</h3>
<p>A maioria dos gatos se sai melhor quando sua porção diária de alimento é dividida em duas ou três refeições por dia. Alimentar várias pequenas refeições ajuda a manter níveis de energia estáveis e evita excessos.</p>
<h3>Ração seca vs úmida</h3>
<p>Rações secas geralmente contêm 3500–4200 kcal/kg, enquanto ração úmida tem menos calorias. Verifique a embalagem do alimento para informações exatas.</p>
<h3>Nota importante</h3>
<p>Esta calculadora fornece uma estimativa com base nas diretrizes de nutrição veterinária. Gatos individuais podem variar. Consulte seu veterinário para aconselhamento personalizado.</p>`,
    faqContent: `
<h2>Perguntas Frequentes</h2>
<h3>Quanto alimento um gato deve comer por dia?</h3>
<p>A maioria dos gatos adultos precisa de cerca de 40–50 calorias por quilograma de peso corporal por dia.</p>
<h3>Quantas vezes por dia devo alimentar meu gato?</h3>
<p>Divida a quantidade diária de alimento em duas ou três refeições por dia.</p>
<h3>Quantos gramas de ração seca um gato deve comer?</h3>
<p>Depende da densidade calórica do alimento. Use o calculador acima.</p>
<h3>Posso misturar ração úmida e seca?</h3>
<p>Sim. Certifique-se de que as calorias diárias totais fiquem dentro da ingestão recomendada.</p>
`,
    shareMessage: "Divida em 2–3 refeições por dia"
  }
};

let currentLang = localStorage.getItem("lang") || "pt";

const weightInput = document.getElementById("weight");
const weightRange = document.getElementById("weightRange");
const typeSelect = document.getElementById("type");
const foodSelect = document.getElementById("foodSelect");
const foodEnergyInput = document.getElementById("foodEnergy");
const foodRange = document.getElementById("foodRange");
const resultDiv = document.getElementById("result");
const langToggle = document.getElementById("langToggle");
const darkToggle = document.getElementById("darkToggle");
const darkModeLabel = document.getElementById("darkModeLabel");
const langLabel = document.getElementById("langLabel");

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
  document.getElementById("seoContent").innerHTML = t.seoContent;
  document.getElementById("faqContent").innerHTML = t.faqContent;

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
  if(isNaN(weight)||weight<=0||isNaN(foodEnergy)||foodEnergy<=0){
    resultDiv.innerHTML=t.fillFields;
    return;
  }
  const RER=70*Math.pow(weight,0.75);
  const calories=RER*multiplier;
  const grams=(calories/foodEnergy)*1000;
  resultDiv.innerHTML=`<strong>${calories.toFixed(0)} ${t.kcalDay}</strong><br>≈ <strong>${grams.toFixed(0)} ${t.gramsDay}</strong>`;
}

// Event Listeners
foodSelect.addEventListener("change", function(){
  if(this.value==="custom"||this.value===""){ localStorage.removeItem("lastFood"); return; }
  const selectedFood=foods.find(f=>f.id==this.value); if(!selectedFood) return;
  foodEnergyInput.value=selectedFood.energy; foodRange.value=selectedFood.energy;
  localStorage.setItem("lastFood",selectedFood.id); recalculate();
});

foodSelect.addEventListener("change", function(){

  gtag('event', 'select_food', {
    event_category: 'interaction',
    event_label: this.value
  });

});

weightInput.addEventListener("input",()=>{weightRange.value=weightInput.value; recalculate();});
weightRange.addEventListener("input",()=>{weightInput.value=weightRange.value; recalculate();});
function setCustomFoodIfManualChange(){ if(foodSelect.value!=="custom"){foodSelect.value="custom"; localStorage.removeItem("lastFood");} };
foodEnergyInput.addEventListener("input",()=>{foodRange.value=foodEnergyInput.value; setCustomFoodIfManualChange(); recalculate();});
foodRange.addEventListener("input",()=>{foodEnergyInput.value=foodRange.value; setCustomFoodIfManualChange(); recalculate();});
typeSelect.addEventListener("change",recalculate);

langToggle.addEventListener("change",function(){
  currentLang=this.checked?"en":"pt";
  localStorage.setItem("lang",currentLang);
  applyLanguage(); updateToggleLabels(); recalculate();
});

darkToggle.addEventListener("change",function(){
  document.body.classList.toggle("dark",this.checked);
  localStorage.setItem("darkMode",this.checked);
  updateToggleLabels();
});

function updateToggleLabels(){
  const t=translations[currentLang];
  darkModeLabel.innerText=darkToggle.checked?t.lightMode:t.darkMode;
  langLabel.innerText=langToggle.checked?t.english:t.portuguese;
}

window.addEventListener("load",()=>{
  darkToggle.checked = localStorage.getItem("darkMode")==="true";
  langToggle.checked = currentLang==="en";
  applyLanguage();
  updateToggleLabels();
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

downloadBtn.addEventListener("click",()=>{
  const weightVal=parseFloat(weightInput.value)||0;
  const mult=parseFloat(typeSelect.value)||1;
  const energy=parseFloat(foodEnergyInput.value)||1;
  const calories=Math.round(70*Math.pow(weightVal,0.75)*mult);
  const grams=Math.round((calories/energy)*1000);
  drawShareImage(calories,grams);
  const link=document.createElement("a");
  link.download="NutriCat_Result.png";
  link.href=canvas.toDataURL();
  link.click();
});


downloadBtn.addEventListener("click", () => {

  if (typeof gtag !== "undefined") {
    gtag('event', 'download_image', {
      event_category: 'engagement',
      event_label: 'share_image'
    });
  }

  const weightVal=parseFloat(weightInput.value)||0;
  const mult=parseFloat(typeSelect.value)||1;
  const energy=parseFloat(foodEnergyInput.value)||1;
  const calories=Math.round(70*Math.pow(weightVal,0.75)*mult);
  const grams=Math.round((calories/energy)*1000);

  drawShareImage(calories,grams);

  const link=document.createElement("a");
  link.download="NutriCat_Result.png";
  link.href=canvas.toDataURL();
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

    btn.innerText = "Thanks! 🐱";
  });
});