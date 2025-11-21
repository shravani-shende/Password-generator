let lenghtSilder = document.querySelector("#lenghtSilder");
let range = document.querySelector("span");
let button = document.querySelector("button");
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let number = document.querySelector("#numbers");
let symbols = document.querySelector("#symbols")
let passwordArea = document.querySelector(".passwordArea input")
let bar = document.querySelector(".bar");
let label = document.querySelector("#label");
let copyBtn = document.querySelector("#copyButton");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lenghtSilder.addEventListener("input", () => {
    range.innerHTML = lenghtSilder.value;
    console.log(lenghtSilder.value)
})

button.addEventListener("click", generatePassword);

function generatePassword() {
    const length = Number(lenghtSilder.value);
    const uppercaseStatus = uppercase.checked;
    const lowercaseStatus = lowercase.checked;
    const numberStatus = number.checked;
    const symbolStatus = symbols.checked;

    if (!uppercaseStatus && !lowercaseStatus && !numberStatus && !symbolStatus) {
        alert("Please select the options");
        return;
    }

    const password = createPassword(length, uppercaseStatus, lowercaseStatus, numberStatus, symbolStatus);
    console.log(password);
    passwordArea.value = password;
    updateStrengthMeter(password);


}

function createPassword(length, uppercaseStatus, lowercaseStatus, numberStatus, symbolStatus) {
    let allCharacters = "";
    let password = "";
    if (uppercaseStatus) allCharacters += uppercaseLetters;
    if (lowercaseStatus) allCharacters += lowercaseLetters;
    if (numberStatus) allCharacters += numberCharacters;
    if (symbolStatus) allCharacters += symbolCharacters;

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }
    return password;
}

function updateStrengthMeter(password) {
    const passwordLength = password.length;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A_Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

    let strengthScore = 0;
    strengthScore += Math.min(passwordLength * 2, 40);

    if (hasLowercase) strengthScore += 15;
    if (hasUppercase) strengthScore += 15;
    if (hasSymbols) strengthScore += 15;
    if (hasNumber) strengthScore += 15;

    if (passwordLength < 8) {
        strengthScore = Math.min(strengthScore, 40);
    }

    const safeScore = Math.max(5,Math.min(100,strengthScore));
    bar.style.width= safeScore+"%";

    let streghtLabelText = "";
    let barColor ="";

    if(strengthScore<40){
        barColor="#fc8181"
        streghtLabelText='Weak';
    }else if(strengthScore<40){
        barColor="#fbd38d"
        streghtLabelText='Weak';
    }else{
        barColor="#68d391"
        streghtLabelText='Strong';
    }

    bar.style.backgroundColor = barColor;
    label.textContent=streghtLabelText;
    
}

copyBtn.addEventListener("click",()=>{
    if(!passwordArea.value) return;

    navigator.clipboard.writeText(passwordArea.value)
    .then(()=> showCopySuccess()).catch((error)=>console.log("could not copy : ", error));
})

function showCopySuccess(){
    console.log('hoo')
    copyBtn.classList.remove("fa-regular", "fa-copy")
    copyBtn.classList.add("fa-solid","fa-check" )
    copyBtn.style.color="#48bb78";

    setTimeout(()=>{
        copyBtn.classList.remove("fa-solid","fa-check")
        copyBtn.classList.add("fa-regular", "fa-copy" )
        copyBtn.style.color="gray";
    },1500)
}
