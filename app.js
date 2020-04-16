let $textBody = document.querySelector('.text-body')
let $currentInput
let text = $textBody.innerText
let wordsArray = text.split(' ')
let wordCount = 0
let correctWords = 0
let errorWords = 0
let wordIndex=0
let currentInputWord
let totalWords = 0
function fillWords(category){
  fetch(`http://localhost:9000/challenge_texts/${category}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    wordCount = 0;
    wordsArray = data.body.split(' ')
    totalWords = wordsArray.length
    console.log(totalWords)
    $textBody.innerHTML = '';
    
    wordsArray.forEach(word => {
      $textBody.innerHTML = $textBody.innerHTML+` <span id='word-${wordIndex}'>${word}</span>`
      wordIndex++
    })
    wordIndex=0;
  });
  $currentInput = document.querySelector('.input-area')
  $currentInput.value =''
  $currentInput.focus()
}

//gameFunctions
function processCurrentText() {
  //defines the new variables

  let newCharacter = $currentInput.value.charAt($currentInput.value.length-1);
  currentInputWord = wordsArray[wordCount];
  //checks if space was added
  if(wordCount === totalWords-1){
    finishGame()
  }
  if(newCharacter === " "){
    checkWord($currentInput.value.slice(0,-1))
  }
  if(newCharacter==="\n"){
    checkWord($currentInput.value.slice(0,-1))
  }
}
function finishGame(){
  console.log('finished')
}
function checkWord(word){
  updateWordCount(currentInputWord === word)
  $currentInput.value = ""
}
function updateWordCount(condition){
  let id = wordCount.toString()

  const wordOnPage = document.querySelector(`#word-${id}`)
  if(condition === true){
    console.log('correct')
    wordOnPage.className="correct-word"
    wordCount ++;
    correctWords ++;
  }
  else{
    wordOnPage.className="incorrect-word"
    wordCount ++;
    correctWords++
  }
}