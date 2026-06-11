const track = document.getElementById("track");
const slides = document.querySelectorAll(".slide");

let index = 0;

function update() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector(".next").onclick = () => {
  index = (index + 1) % slides.length;
  update();
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  update();
};

setInterval(() => {
  index = (index + 1) % slides.length;
  update();
}, 5000);

/* FAQ */
document.querySelectorAll(".faq-item button").forEach(btn => {
  btn.onclick = () => {
    const p = btn.nextElementSibling;
    p.style.display = p.style.display === "block" ? "none" : "block";
  };
});

/* QUIZ */
const quiz = [
  {
    q: "O que é agro sustentável?",
    options: ["Destruir o meio ambiente", "Produção equilibrada", "Só máquinas"],
    a: 1
  },
  {
    q: "Qual ajuda o meio ambiente?",
    options: ["Queimada", "Energia solar", "Desmatamento"],
    a: 1
  },
  {
    q: "Tecnologia no agro serve para:",
    options: ["Melhorar produção", "Poluir", "Parar produção"],
    a: 0
  }
];

let i = 0;
let score = 0;

const question = document.getElementById("quiz-question");
const options = document.getElementById("quiz-options");
const feedback = document.getElementById("quiz-feedback");
const scoreEl = document.getElementById("quiz-score");

function load() {
  const q = quiz[i];

  question.textContent = q.q;
  options.innerHTML = "";
  feedback.textContent = "";

  q.options.forEach((op, idx) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.classList.add("quiz-option");

    btn.onclick = () => {
      if (idx === q.a) {
        btn.classList.add("correct");
        feedback.textContent = "✔ Correto!";
        score++;
      } else {
        btn.classList.add("wrong");
        feedback.textContent = "❌ Errado!";
      }

      scoreEl.textContent = `Pontuação: ${score}`;
    };

    options.appendChild(btn);
  });
}

document.getElementById("next-question").onclick = () => {
  i++;

  if (i >= quiz.length) {
    question.textContent = "Fim do quiz!";
    options.innerHTML = "";
    feedback.textContent = `Você fez ${score} de ${quiz.length}`;
    return;
  }

  load();
};

load();

/* IA FAZENDEIRO 🤠 */
const iaToggle = document.getElementById("ia-toggle");
const iaChat = document.getElementById("ia-chat");
const iaSend = document.getElementById("ia-send");
const iaInput = document.getElementById("ia-input");
const iaMessages = document.getElementById("ia-messages");

iaToggle.onclick = () => iaChat.classList.toggle("hidden");

iaSend.onclick = send;

iaInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") send();
});

function send() {
  const text = iaInput.value.trim();
  if (!text) return;

  add(text, "user");

  setTimeout(() => {
    add(resposta(text.toLowerCase()), "bot");
  }, 500);

  iaInput.value = "";
}

function add(text, type) {
  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.textContent = text;

  iaMessages.appendChild(div);
  iaMessages.scrollTop = iaMessages.scrollHeight;
}

function resposta(msg) {
  if (msg.includes("água")) return "Água é essencial no agro 🌊";
  if (msg.includes("solo")) return "Solo saudável garante produção 🌱";
  if (msg.includes("tecnologia")) return "Tecnologia melhora a produção 🚜";
  if (msg.includes("energia")) return "Energia solar ajuda o meio ambiente ☀️";
  if (msg.includes("meio ambiente")) return "Preservar o meio ambiente é essencial 🌎";
  if (msg.includes("agro")) return "Agro sustentável une produção e natureza 🌱";

  return "🤠 Posso falar sobre água, solo, tecnologia, energia e meio ambiente!";
}