const form = document.getElementById('quiz-form');
const resultsDiv = document.getElementById('quiz-results');

const questions = [
  {
    question: 'What is the capital of France?',
    correctAnswer: 'paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    correctAnswer: 'mars',
  },
  {
    question: 'What is the largest mammal in the world?',
    correctAnswer: 'blue-whale',
  },
];

form.addEventListener('submit', (e) => {
  e.preventDefault()

  let score = 0

  questions.map((item, index) => {
    const itemName = `q${index + 1}`
    const selectAnswer = document.querySelector(`input[name="${itemName}"]:checked`)
    
    if(selectAnswer){
      if(selectAnswer.value === questions[index].correctAnswer){
        score += 1
      }
    }
  })

  const totalQuest = questions?.length
  const scoreFinal = Math.floor((score / totalQuest) * 100)

  const scoreViewElement = document.getElementById('score')
  scoreViewElement.textContent = `Score kamu ${scoreFinal} %`

  const result = document.getElementById('quiz-results');
  result.style.display = 'block'
})