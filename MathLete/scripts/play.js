if (localStorage.getItem("registered") == undefined){
    window.location.href = "register.html"
}

let highScores = JSON.parse(localStorage.getItem("highScores")) 
    || {"addition": 0, "subtraction": 0, "multiplication": 0, "division": 0};
let score = 0;
let mode = localStorage.getItem("mode");
let operation = "";
let number_range = 11;
let timeLeft = 15;
let play = true;
let timer;

switch (mode) {
    case "addition":
        operation = "+";
        break;
    case "subtraction":
        operation = "-";
        break;
    case "multiplication":
        operation = "*";
        break
    case "division":
        operation = "/";
        break;
}

function update(button){
    startTimer()
    let first_digit = generateRandomNumber(number_range);
    first_digit = generateRandomNumber(4) % 2 === 0 ? -first_digit : first_digit;

    let second_digit = generateRandomNumber(number_range);
    second_digit = (mode === "subtraction") ? second_digit : 
        generateRandomNumber(4) % 2 === 0 ? -second_digit : second_digit;

    button && updateScore(button);
    if(play){
        updateHeadings(first_digit, second_digit);
        updateButtons(first_digit, second_digit);
        updateDifficulty();
    }
}

function updateButtons(first_digit, second_digit){
    let correctIndex = generateRandomNumber(4);
    let correctAnswer = eval(`${first_digit} ${operation} ${second_digit}`)
    correctAnswer = (mode === "division") ? Math.round(correctAnswer * 100) / 100 : correctAnswer
    document.querySelectorAll(".button").forEach((button, i) =>{
        button.classList.remove("correct")
        let randomNumber = 
            (mode === "multiplication") ? generateRandomNumber(number_range*10)
            : (mode === "division") ? generateRandomFloat(number_range) 
            : generateRandomNumber(number_range);
        randomNumber = (generateRandomNumber(3) % 2 === 0 ? -randomNumber : randomNumber)
        
        const number = (i === correctIndex) 
            ? correctAnswer
            : randomNumber;
        if(i === correctIndex || randomNumber === correctAnswer)
            button.classList.add("correct")
        button.textContent = number
    });
}

function updateHeadings(first_digit, second_digit){
    document.getElementById("highscore").textContent = highScores[mode];
    document.getElementById("current-score").textContent = score;
    document.getElementById("question").textContent = `${first_digit}${operation}${second_digit}`;
}

function updateScore(button){
    if(button.classList.contains("correct")){
        score++
    }
    else{
        stopGame()
    }

    if(score > highScores[mode])
        highScores[mode] = score
}

function updateDifficulty(){
    if(score%15===0 && score !== 0 && score <= 61){
        number_range *= 10
    }
}

function generateRandomNumber(range){
    return Math.floor(Math.random() * range);
}

function generateRandomFloat(range){
    return Math.round((Math.random() * range) * 100) / 100
}

function startTimer(){
    timeLeft = 15;
    document.getElementById("countdown").textContent = timeLeft;
    if(timer){
        clearInterval(timer)
    }

    timer = setInterval(() => {
        timeLeft -= 1;
        if(timeLeft === 0){
            stopGame()
        }
        document.getElementById("countdown").textContent = timeLeft;
    }, 1000)
}

function stopGame(){
    play = false;
    clearInterval(timer)
    document.getElementById("play-again").classList.remove("hidden")
    document.querySelectorAll(".button").forEach((button) => button.disabled = true)
    document.getElementById("play-body").style.borderColor = "red";
}

function restartGame() {
    play = true;
    score = 0;
    number_range = 11;
    
    document.querySelectorAll(".button").forEach((button) => button.disabled = false)
    document.getElementById("play-again").classList.add("hidden")
    document.getElementById("play-body").style.borderColor = "#D9C3A1";
    update()
}

window.addEventListener("beforeunload", (event) => {
    localStorage.setItem("highScores", JSON.stringify(highScores))
    event.preventDefault();
});

startTimer()
update()