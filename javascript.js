const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const userExamData = JSON.parse(localStorage.getItem('userExamData'));
const popupInfo = document.querySelector('.popup-info');
const main = document.querySelector('.main');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
const resultBox = document.querySelector('.result-box');
const regPage = document.querySelector('.r-p');
const forgotPassword = document.querySelector('.forgot-password');
const navBar = document.querySelector('.navbar');
//  to check if you get the data from other js files
console.log(userInfo.username);
console.log(userInfo.password);
console.log(userExamData[1].correct);
// defines initial values and runs initial functions
window.onload = resetQuiz;
//  runs a function for each defined 'click' action
document.addEventListener("click", function (event) {
    const target = event.target;
    // exiting quiz guide
    if (target.classList.contains('exit-btn')) {
        exitGuide();
    }
    // opening quiz guide
    if (target.classList.contains('start-btn')) {
        openGuide();
    }
    // shows questions
    if (target.classList.contains('continue-btn')) {
        toggleQuizSection(true);
    }
    // restarts the quiz
    if (target.classList.contains('tryAgain-btn')) {
        toggleQuizSection(true);
    }
    // goes to home page
    if (target.classList.contains('goHome-btn')) {
        toggleQuizSection(false);
    }
    // moving on to the next question
    if (target.classList.contains('next-btn')) {
        if (questionCount < questions.length - 1) {
            questionCount++;
            showQuestions(questionCount);
            questionNumb++;
            questionCounter(questionNumb);

            nextBtn.classList.remove('active');
        } else {
            showResultBox();
        }
    }
    // opens main page
    if (target.classList.contains('login-btn')) {
        event.preventDefault();
        if (checkLogin()) {
            regPage.classList.add('active');
            navBar.classList.add('active');
        }
    }
    // shows admin username and password when clicked on forgot password
    if (target.classList.contains('forgot-password')) {
        event.preventDefault();
        alert("username: 'admin', password: '1234'");
    }
});
//  prevents def and checks login
document.querySelector('.registration-page form').addEventListener('submit', function (event) {
    event.preventDefault();
    checkLogin();
});
//  little animation for 'forgot password?' changes text
forgotPassword.addEventListener('mouseover', () => {
    setTimeout(() => {
        forgotPassword.innerHTML = "Try to remember&nbsp;<i class='bx bxs-cool' style='font-size: 1vw; vertical-align: middle;'></i>";
    }, 100);
});
forgotPassword.addEventListener('mouseout', () => {
    setTimeout(() => {
        forgotPassword.innerHTML = "Forgot password?";
    }, 300);
});
// seletcs all text elements
document.addEventListener("selectionchange", function () {
    var selectedText = window.getSelection().toString();
    if (selectedText) {
        document.body.classList.add("text-selected");
    } else {
        document.body.classList.remove("text-selected");
    }
});
// function for repeated actions
function resetQuiz() {
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
// opens guide
function openGuide() {
    popupInfo.classList.add('active');
    main.classList.add('active');
}
// closes guide
function exitGuide() {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
//  starts quiz or ends quiz and goes to home page
function toggleQuizSection(active) {
    if (active) {
        quizSection.classList.add('active');
        quizBox.classList.add('active');
        nextBtn.classList.remove('active');
        resultBox.classList.remove('active');
        exitGuide();
        resetQuiz();
    } else {
        quizSection.classList.remove('active');
        nextBtn.classList.remove('active');
        resultBox.classList.remove('active');
        resetQuiz();
    }
}
// getting questions and options from array 
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}
// option selection interactions
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore++;
        headerScore();
    } else {
        answer.classList.add('incorrect');

        // if answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }
    // if user has selected, disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}
// question counter
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}
// actively showing score
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
// result box functions
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (Math.floor((userScore / questions.length) * 100));
    let speed = 20;
    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#517b9d ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
// saves user information
function saveUserInfo(username, password) {
    // stores user information as a JavaScript object
    userInfo.username = username;
    userInfo.password = password;
    // saves it to localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}
// checks whether login is successful or not
function checkLogin() {
    var usernameInput = document.querySelector('.username').value;
    var passwordInput = document.querySelector('.password').value;
    if (usernameInput === "" && passwordInput === "") {
        alert("Username and Password needed!");
        return false;
    } else {
        if (userInfo) {
            // compares login information with information in localStorage
            if (usernameInput === userInfo.username && passwordInput === userInfo.password) {
                return true;
            }
        }
        alert("Incorrect Username or Password!");
        return false;
    }
}
// updates the user's exam data
function updateUserExamData(numb, correct, userAnswer) {
    userExamData[numb] = { correct, userAnswer };
    localStorage.setItem('userExamData', JSON.stringify(userExamData));
}
function getUserExamData() {
    return userExamData;
}
// stores the options that the user marked during exam
function saveUserAnswer(username, numb, userAnswer) {
    const userData = JSON.parse(localStorage.getItem(username)) || { answers: {}, themes: {} };
    userData.answers[numb] = userAnswer;
    const questionTheme = getQuestionTheme(numb);
    if (!userData.themes[questionTheme]) {
        userData.themes[questionTheme] = { total: 0, correct: 0 };
    }
    userData.themes[questionTheme].total++;
    localStorage.setItem(username, JSON.stringify(userData));
}
// saves the questions that the user made mistakes after the exam
function saveIncorrectQuestions(username, incorrectQuestions) {
    const userData = JSON.parse(localStorage.getItem(username)) || { incorrectQuestions: [] };
    userData.incorrectQuestions = incorrectQuestions;
    localStorage.setItem(username, JSON.stringify(userData));
}
// stores the theme of the questions the user answered correctly
function saveCorrectThemes(username, theme) {
    const userData = JSON.parse(localStorage.getItem(username)) || { correctThemes: {} };
    if (!userData.correctThemes[theme]) {
        userData.correctThemes[theme] = 0;
    }
    userData.correctThemes[theme]++;
    localStorage.setItem(username, JSON.stringify(userData));
}

// EXAMPLE
// saveUserAnswer("ahmet123", "question1", "A");
// saveIncorrectQuestions("ahmet123", ["question2", "question5"]);
// saveCorrectThemes("ahmet123", "animal");
// analyzeUserExam("ahmet123");

// checks whether register is successful or not
// function checkRegister() {
//     var usernameInput  = document.querySelector('.username').value;
//     var passwordInput  = document.querySelector('.password').value;

//     if (usernameInput === "" || passwordInput === "") {
//         alert("Username and Password needed!");
//         return false;
//     } else {
//         // saves user information to localStorage
//         saveUserInfo(usernameInput, passwordInput);
//         return true;
//     }
// }