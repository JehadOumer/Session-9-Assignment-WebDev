const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//random words array
const words= ["earthworm","increased","flow","reimplant","brashier","broider","outhustle","unisexuality","randy","twitted","necrophiliac","quadrivalent","fanner","hydroxyapatite","moating","motorman","gametic","unwarlike","funhouse","independent","cabriolet","teaspoonfuls","distortional","accusation","refrangible","boches","genius","halms","outdebated","lahar","lunger","reformations","translocation","multinational","casita","spookily","identity","lychee","ropedancer","gendarmeries","dartled","shammashim","shuddered","trapes","insurgent","dodecaphonist","glyph","unitizations","tarrinesses","classinesses","superdiplomat","bubblehead"
];

//init word and score anf time
let randomWord,
    score =0,
    time = 10,
    difficulty= localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

    //set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
//focus on text on start
text.focus();
//start counting down
const timeInterval = setInterval(updateTime, 1000);
//generate random word form an array
function getRandomWord(){
    return words[Math.floor(Math.random()* words.length)];
}
//add word to dom
function addWordToDOM(){
    randomWord=getRandomWord();
    word.innerHTML = randomWord;
}

//update score
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}
//update time
function updateTime(){
    time--;
    timeEl.innerHTML= time +'s';
    if(time === 0){
        clearInterval(timeInterval);
        //end game
        gameOver();
    }
}
//game over shw end screen
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;
    endgameEl.style.display = 'flex';
}
addWordToDOM();

//event listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();
        //CLEAR 
        e.target.value = '';
        if(difficulty == 'hard'){
            time +=2;
        }
        else if(difficulty == 'medium'){
            time += 3
        }
        else{
            time += 5;
        }
       
    }
});
//settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//settings select
settingsForm.addEventListener('change', e=> {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
});