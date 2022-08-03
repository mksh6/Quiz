const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
let currentQuestion = {}; //Object
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []; //Empty Array

let questions = [
  {
    question: "ما هو مكان دفن الامام الحسن العسكري(ع)",
    choice1: "نجف",
    choice2: "سامراء",
    choice3: "كربلاء",
    choice4: "بغداد",
    answer: 2,
  },
  {
    question: "كم حجة حج الرسول(ص)",
    choice1: "1",
    choice2: "2",
    choice3: "5",
    choice4: "6",
    answer: 1,
  },
  {
    question: "كم دامت مدة امامة الامام الكاظم(ع)",
    choice1: "20",
    choice2: "25",
    choice3: "35",
    choice4: "15",
    answer: 3,
  },
  {
    question: "متى ولد الامام زين العابدين(ع)",
    choice1: "41 هجري",
    choice2: "30 هجري",
    choice3: "40 هجري",
    choice4: "3هجري8 ",
    answer: 4,
  },
  {
    question: "متى ولد الامام الحسن (ع)",
    choice1: " 15 رمضان ",
    choice2: "10 رمضان",
    choice3: "5 شعبان",
    choice4: "4 شعبان",
    answer: 1,
  },
  {
    question: "متى ولد امير المؤمنين (ع)",
    choice1: "13 رجب ",
    choice2: "10 رمضان",
    choice3: "5 شعبان",
    choice4: "4 شعبان",
    answer: 1,
  },
  {
    question: "ما هي كنية النبي محمد(ص)",
    choice1: "ابو القاسم",
    choice2: "ابو عبد الله",
    choice3: "ابو الحسن",
    choice4: "ابو جعفر",
    answer: 1,
  },
  {
    question: "ما هي كنية امير المؤمنين(ع)",
    choice1: "ابو القاسم",
    choice2: "ابو عبد الله",
    choice3: "ابو الحسن",
    choice4: "ابو جعفر",
    answer: 3,
  },
  
   /*{
    question: "which animal gives birth standing up?",
    choice1: "Giraffes",
    choice2: "Lemurs",
    choice3: "Lion",
    choice4: "Rhinoceros",
    answer: 1,
  },
  {
    question: "The slowest animal in the world?",
    choice1: "Koala",
    choice2: "Three-toed sloth",
    choice3: "Garden snail",
    choice4: "Giant Tortoise",
    answer: 2,
  },
  {
    question:
      "Which animal has the longest gestation(pregnancy) period of all mammals?",
    choice1: "Beaver",
    choice2: "whale",
    choice3: "Elephants",
    choice4: "Sloth",
    answer: 3,
  },
  {
    question: "what animal is pregnant for the shortest time?",
    choice1: "Opossum",
    choice2: "Dolphin",
    choice3: "sharks",
    choice4: "whale",
    answer: 1,
  },
  {
    question: "which animal has the strongest Bite?",
    choice1: "Crocodile",
    choice2: "Hyena",
    choice3: "Shark",
    choice4: "Jaguar",
    answer: 3,
  },
  {
    question: "Where does the heart of a shrimp located in its body?",
    choice1: "Chest",
    choice2: "Tail",
    choice3: "Head",
    choice4: "Antenna",
    answer: 3,
  },
  {
    question: "what is the loudest animal in the world?",
    choice1: "Gorilla",
    choice2: "Tiger",
    choice3: "Sperm Whale",
    choice4: "Giraffe",
    answer: 3,
  },
  {
    question: "Animal smell up to a million times more sensitive than humans?",
    choice1: "Cow",
    choice2: "Bloodhound",
    choice3: "Horse",
    choice4: "Rhino",
    answer: 2,
  },
  {
    question: "what is the percentage of DNA a chimpanzee shares with human?",
    choice1: "98%",
    choice2: "50%",
    choice3: "20%",
    choice4: "75%",
    answer: 1,
  },
  {
    question: "what is the largest carnivorous animal in the world?",
    choice1: "Crocodile",
    choice2: "Polar Bear",
    choice3: "Elephant",
    choice4: "Hippopotamus",
    answer: 2,
  },*/
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    //localStorage.setItem(key,value);
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  //to not repeat question so splice the question finish
  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    //acceptingAnswers = false;??
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? `correct` : `incorrect`;

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000); //after 1 second
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
startGame();
