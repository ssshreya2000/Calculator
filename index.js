// Html elements
const screenResultEL= document.querySelector(".screen-2");
const operand1El= document.querySelector(".op1");
const operand2El= document.querySelector(".op2");
const operatorEl= document.querySelector(".opr");
const clearBtn=document.querySelector(".clear");

//variable declaration

let result="";
let operation="";
let operand1="";
let operand2="";
let operator;
let currentoperand=1;

//query selector

const screenOperationTextEl= document.querySelector(".screen-1-operation");

//btn selector

const keysBtn= document.querySelector(".keypad");

//display functions
//display operations on screen-1
//multipleOperationInd is there when more than 1 operations are being performed

const displayOperation= (multipleOperationInd=0)=>{
    if(multipleOperationInd==1){
        console.log("This", result);
        operand1El.textContent=result;
    }
    else if(multipleOperationInd==0 && currentoperand==1){
        operand1El.textContent=operand1
    }
    if(operator){
        operatorEl.textContent = operator;
    }
    if(currentoperand==2){
        operand2El.textContent=operand2;
    }
};

//displayInput
//display screen-2 result

const displayResult = (ip) => {
    if(!ip){
        screenResultEL.textContent =0;
        return;
    }
    console.log(ip);
    screenResultEL.textContent = ip;
};

const handleMultipleOperatiion = (op)=> {
    let multipleOperationInd=1;
    operand1= result;
    operand2="";
    opeartor= op.textContent;
    displayOperation(multipleOperationInd);
    result="";
    currentoperand=2;
    displayResult(result);
};

//assign operator

const assignOperator = (op) => {
    if(op.textContent === "=") {
        calculate();
        displayResult(result);
        return;
    }
    if(result!=="") {
        handleMultipleOperatiion(op);
        return;
    }
    operator = op.textContent;
    displayOperation();
    currentoperand =2;
};

//assign operand

const assignOperand = (input) => {
    if(currentoperand===1){
        operand1= operand1 + input.textContent;
        operation= operation + input.textContent;
        console.log(operand1, operation);

        displayOperation();
        displayResult(operand2);
    }

    if(currentoperand ==2) {
        operand2 = operand2 + input.textContent;
        operation = operation + input.textContent;
        displayOperation();
        displayResult(operand2);
    }
};

//reset screen

const clearScreen = () => {
    result = "";
    operation = "";
    operand1 = "";
    operand2= "";
    operator = "";
    currentOperand =1;
    operand1El.textContent = "";
    operand2El.textContent ="";
    operatorEl.textContent = "";
    displayResult(0);

};

// basic mathematical functions

const add = (operand1, operand2) => {
    let op1 = Number(operand1);
    let op2 = Number(operand2);

    return op1+op2;

};

const subtract = (operand1, operand2) => {
    let op1 = Number(operand1);
    let op2 =  Number(operand2);

    return op1-op2;
};

const multiply = (operand1, operand2) => {
    let op1 = Number(operand1);
    let op2 =  Number(operand2);

    return op1*op2;
};

const divide = (operand1, operand2) => {
    let op1 = Number(operand1);
    let op2 =  Number(operand2);

    return op1/op2;
};

//calculate-perform operations

const calculate = () => {
    switch(operator) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "*":
            result = multiply(operand1, operand2);
            break;
        case "/":
            result = divide(operand1, operand2);
            break;
        default:
            console.log("Default");

    }
};

//delete a digit

const deleteDigit = () => 
{
    if(currentoperand ==1) 
    {
        let modifiedStr =  screenResultEL.textContent.slice(
            0,
            screenResultEL.textContent.length-1
        );
        displayResult(modifiedStr);
        operand2 = modifiedStr;
        displayOperation();
    

    } else {
        console.log(screenResultEL.textContent);
        let modifiedStr = screenResultEL.textContent.slice(0, screenResultEL.textContent.length-1);
        displayResult(modifiedStr);
        operand2 = modifiedStr;
        displayOperation();

    }
    return;
};

//check input if didgit or operation

const handleInput = (currInput, source, type) => {
    if (source == "keyboard" && type == "operand") {
      const obj = { textContent: currInput };
      assignOperand(obj);
      return;
    }
    if (source == "keyboard" && type == "operator") {
      const obj = { textContent: currInput };
      assignOperator(obj);
      return;
    }

    const currentElement = currInput.target;
    const clickedElementClass = Array.from(currentElement.classList);
    if (clickedElementClass.includes("delete")) {
      deleteDigit();
      return;
    }
    if (clickedElementClass.includes("clear")) {
        clearScreen();
        return;
      }
      if (currentElement.dataset.value == "operator") {
        assignOperator(currentElement);
      } else {
        assignOperand(currentElement);
      }
    };
    
    // Key Press
    const btnClickHandler = (e) => {
      //This is to make sure no events are fired upon clikcing the space between the keys.
      if (e.target.classList[0] === "keypad") {
        return;
      }
      handleInput(e);
    };
    
    // Event Listeners
    keysBtn.addEventListener("click", btnClickHandler);
    window.addEventListener("keydown", (e) => {
      if (e.key.match(/[0-9]/g)) {
        handleInput(e.key, "keyboard", "operand");
        // console.log(e);
      }
      if (e.key.match(/[+*-/]/g)) {
        handleInput(e.key, "keyboard", "operator");
      }
      if (e.key == "Enter") {
        handleInput("=", "keyboard", "operator");
      }
    });





























