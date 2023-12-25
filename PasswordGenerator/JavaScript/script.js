let slider = document.querySelector(".pass-length input"),
generateBtn = document.querySelector(".generate-btn"),
options = document.querySelectorAll(".option input"),
passwordInput = document.querySelector(".input-box input"),
passwordIndicator = document.querySelector(".pass-indicator"),
copyIcon = document.querySelector(".input-box span");

let characters = { // object of letter, numbers & symbols.
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~?=_-"
};

let generatePassword = () => {
    let staticPassword = "",
    passLength = slider.value,
    randomPassword = "",
    excludeDuplicate = false;
    
    options.forEach(option => { // looping through each option's checkbox;
        if(option.checked){ // if checkBox is checked
            // if checkbox id isn't exc-duplicate and spaces.
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                // adding particular key value from character object to staticPassword;
                staticPassword += characters[option.id];
            } else if(option.id === "spaces"){
                // adding space at the beginning and end of staticPassword
                staticPassword += `     ${staticPassword}    `
            } else{ // else passing true value to excludeDuplicate
                excludeDuplicate = true;
            };
        };
    });

    for(let i = 0; i < passLength; i++){
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){ // ternary operator
            /* if randomPassword doesn't contains the current random character or randomChar is equal 
            to " " the add random character to randomPassword else decrement i by -1 */
            !randomPassword.includes(randomChar) || randomChar === " " ? randomPassword += randomChar : i--;  
        } else{ // add random character to randomPassword.
            randomPassword += randomChar
        };
    };

    passwordInput.value = randomPassword; // showing the password in input.
};

let updatePasswordIndicator = () => {
    /*
    if slider value is less than 8 characters then pass "weak" as passwordIndicator id
    else if slider value is less than 16 then pass "medium" as id 
    else pass "strong" as id. 
    */
    passwordIndicator.id = slider.value <= 8 ? "weak" : slider.value <= 16 ? "medium" : "strong";
};

let updateSlider = () => {
    document.querySelector(".pass-length span").innerText = slider.value; // passing slider value as counter text.
    generatePassword();
    updatePasswordIndicator();
};
updateSlider();

let copyPassword = () => { // the password will copy to the system clipboard
    navigator.clipboard.writeText(passwordInput.value);
    let icon = copyIcon.querySelector('i');
    icon.classList.replace('fa-regular', "fa-solid");
    icon.classList.replace('fa-copy', "fa-check");
    setTimeout(() => { // after 1500 ms changing the icon from check to copy 
        icon.classList.replace('fa-solid', "fa-regular");
        icon.classList.replace('fa-check', "fa-copy");
    }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
slider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);