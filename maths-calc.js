// JS MathsCalc trainer code

/*Operating variables*/ 
let operator = ["-", "/", "*", "+", "%"];
let operatorSelection; // for easy mode
let operatorRndmSelection; // store randomly selected operator
let operand1;
let operand2;
let sum; // hold answer to current formula  
/*Current Stats*/
let timer = document.querySelector('.timer');
let progress = document.querySelector('.progress');
let progressCount = 5; // set counter for progess - used to increment progress bar by five each successful answer
let questionCount = 0;
let score = 0;
/*displays and inputs*/
let answer = document.querySelector('.submit-answer');
let input = document.querySelector('#user-input');
let q_count = document.querySelector('.q-count');
let a_count = document.querySelector('.a-count');
/* Once details are entered and use hits enter*/
document.getElementById('submit').addEventListener('click', (e) => { /*when form submit pressed do below */
e.preventDefault(); /*stop submit button resfreshing page */
let name = document.getElementById('name').value;
let selection = document.getElementById('difficulty');
if (name === "") {
    alert("Please Enter You're Name Below");
    return;
} else if (selection.selectedIndex == 1) {
    selection = "Easy";
    easy();
} else if (selection.selectedIndex == 2) {
    selection = "Hard"; // need to address animation duration 
    hard();
} else if (selection.selectedIndex == 3) {
    selection = "Expert"; // need to address animation duration 
    expert();
} else if (selection.selectedIndex == 0){
    alert("Please Choose A Difficulty Setting");
    return;
}





/*Hide control panel once user has selected options */    
document.querySelector('.choose-options').style.display = "none";
document.querySelector('.user-selections').innerText = "NAME: " + name + " | " + "DIFFICULTY: " + selection;
})



function easy() {
    //first check if question count has surpassed 10 - if so, session is finished
    if (questionCount >= 100) {
        alert("game over");
        return;
    } else {
        questionCount++;
        input.value = null; // ensure input is cleared every time
        input.focus(); //focus input field for quick typing
        q_count.innerText = "Question: " + questionCount; // assign question number
        a_count.innerText = "Score: " + score; // asign score number
        timer.style.animationName = "timer-width"; // start timer with CSS - smoother transition
        // create formula
        operand1 = Math.floor(Math.random() * 12 + 1); // operand1 value - easy mode,  max value = 12
        operand2 = Math.floor(Math.random() * 12 + 1); // operand2 value
        operatorSelection = operator.slice(1, 5) // get an easier selection of the array of operators 
        operatorRndmSelection = Math.floor(Math.random() * operatorSelection.length); // randomly select from this new array
       
        /*WORK OUT QUESTION, DISPLAY QUESTION TO USER - Easy Mode Should not consist of difficult divisions etc ensure largest operand first */
        if (operand1 < operand2) {
            sum = eval(operand2 + operator[operatorRndmSelection] + operand1); // Agreeable to use eval() in this instance as input is from a known source
            if (operator[operatorRndmSelection] == "/") { // if we're deviding, answer to be no more than 2 decimal places long, and should be rounded
                sum = sum.toFixed(2);
            }
            document.querySelector('.question-display').innerText = operand2 + " " + operator[operatorRndmSelection] + " " + operand1 + "Anwser: " + sum;
        } else {
            sum = eval(operand1 + operator[operatorRndmSelection] + operand2); 
            if (operator[operatorRndmSelection] == "/") {
                sum = sum.toFixed(2);
            }
            document.querySelector('.question-display').innerText = operand1 + " " + operator[operatorRndmSelection] + " " + operand2 + "Anwser: " + sum;
        }

        


        // is the animation ended? reset the animation property no null for now        
        let timeOut = setTimeout(() => { /* Call the function again after ... seconds + 100ms to allow animation event listener to fire*/
             //increment question count per iteration so user knows which question they are on
            progressCount += 5; // add five to progress bar
            progress.style.width = progressCount + "%"; // assign new width to progress bar
            score--;
            easy();
        }, 6000);

        /* DECIDE IS user input == SUM of formula - if so add 1 to progress bar */
        answer.addEventListener('click', () => {
            clearTimeout(timeOut); // as soon as user click button clear timeout
            if (Number(input.value.trim()) == sum) { // if the trimmed version of the answer is equal to the sum of the displayed formula
                progressCount += 5; // add five to progress bar
                progress.style.width = progressCount + "%"; // assign new width to progress bar
                score++; //increase score
                timer.style.animationName = null; // reset animation
                easy(); // finally, call function again for new question
            } else if (Number(input.value.trim()) != sum || input.value == "") {
                console.log('wrong');
                progressCount += 5; // add five to progress bar
                progress.style.width = progressCount + "%"; // assign new width to progress bar
                score--; //decrease score
                timer.style.animationName = null; // reset animation
                easy(); // finally, call function again for new question
            }
        }) 
        
        /* Once the animation has ended - reset animationName property */
        timer.addEventListener('animationend', () => {
            timer.style.animationName = null;
        });
    }
}

easy();

function hard() {

}

function expert() {
    alert("im exp");
}

