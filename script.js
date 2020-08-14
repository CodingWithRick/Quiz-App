const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the real name Iron Man?',
    answers: [
        { text: 'Chris Hemsworth', correct: false },
        { text: 'Chris Evans', correct: false },
        { text: 'Robert Downey Jr.', correct: true },
        { text: 'Rowan Atkinson', correct: false }
    ]
  },
  {
    question: 'Who is the Captain America?',
    answers: [
      { text: 'Chris Hemsworth', correct: false },
      { text: 'Chris Evans', correct: true },
      { text: 'Robert Downey Jr.', correct: false },
      { text: 'Rowan Atkinson', correct: false }
    ]
  },
  {
    question: 'What is the hammer of Thor called?',
    answers: [
      { text: 'Neolneer', correct: true},
      { text: 'Storm Breaker', correct: false },
      { text: 'RedWing', correct: false },
      { text: 'Jarvis', correct: false }
    ]
  },
  {
    question: 'What is the symbol of copyright?',
    answers: [
      { text: '℗', correct: false },
      { text: '©', correct: true },
      { text: '®', correct: false },
      { text: '™', correct: false }
    ]
  }
]