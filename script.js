const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
    // calling initGame function, so the game restart

    initGame();
  }, 1000);
};

const initGame = () => {
  // calling initTimer function with passing 30 as maxTime value

  initTimer(30);
  //getting random object from words
  let randomObj = words[Math.floor(Math.random() * words.length)];
  //splitting each letter of random words
  let wordArray = randomObj.word.split("");

  for (let i = wordArray.length - 1; i > 0; i--) {
    //getting random number
    let j = Math.floor(Math.random() * (i + 1));
    // shuffling and swiping wordArray letters randomly

    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  //passing shuffled word as word text
  wordText.innerText = wordArray.join("");
  // passing random object hint as hint text
  hintText.innerText = randomObj.hint;
  //passing random word to correctWord
  correctWord = randomObj.word.toLocaleLowerCase();
  //making inputfield empty
  inputField.value = "";
  //setting input maxlength attr value to word length
  inputField.setAttribute("maxlength", correctWord.length);
  //   console.log(randomObj);
  //   console.log(wordArray, randomObj.word);
};

initGame();

const checkWord = () => {
  //getting user value
  let userWord = inputField.value.toLocaleLowerCase();
  // if user didn't enter anything

  if (!userWord) return alert("Please Enter a word check");
  //   console.log(userWord);
  // if user word doesn't matched with the correct word

  if (userWord !== correctWord)
    return alert(`Oops! ${userWord} is not a correct word`);
  //  if above two if conditions are failed then show congrats alert because user word is correct

  alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
