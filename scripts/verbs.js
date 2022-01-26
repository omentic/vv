"use strict";

import {verbs} from "./verbs-list.js";

let counter = 0;
document.addEventListener("load", reset());

// Runs on load and after flashing solution
function reset() {
    // Get a random question
    let current = verbs[Math.floor(Math.random() * verbs.length)]; // This is the best way to pick a random integer...

    // Reset and repopulate the form
    let inputs = document.querySelectorAll("input[type=radio]");
    inputs.forEach(item => { item.checked = false; });
    document.getElementById("verb").innerHTML = current.verb;

    // Wait until button is submitted
    let button = document.getElementById("check");
    button.addEventListener("click", check);
}

function check() {
    // There's got to be a better way to do this...
    let current = {"null":"null"}
    verbs.forEach(verb => { if (verb["verb"] == document.getElementById("verb").textContent) current = verb; });
    console.log(current);

    // A terrible hack to catch null values.
    let answers = {"null":"null"}
    if (!(document.querySelector("input[name='person']:checked") === null
    || document.querySelector("input[name='number']:checked") === null
    || document.querySelector("input[name='tense']:checked") === null
    || document.querySelector("input[name='voice']:checked") === null
    || document.querySelector("input[name='mood']:checked") === null)) {
        answers = {
            // Transform submission into a JSON structure for "easy" comparison
            "verb": document.getElementById("verb").textContent,
            "person": document.querySelector("input[name='person']:checked").value,
            "number": document.querySelector("input[name='number']:checked").value,
            "tense": document.querySelector("input[name='tense']:checked").value,
            "voice": document.querySelector("input[name='voice']:checked").value,
            "mood": document.querySelector("input[name='mood']:checked").value
        };
    }

    console.log(current);
    console.log(answers);

    // Check if the answers are right and flash the thumbs up / down symbol
    // (if the constructed JSON structure matches the original)
    if (JSON.stringify(current) === JSON.stringify(answers)) { // So, neither == or === checks for object equality
        console.log("correct");
        counter += 1;
        document.getElementById("correct").style.display = "block";
        document.body.style.backgroundColor = "#B5E9AB";
        setTimeout(function() { document.getElementById("correct").style.display = "none"; document.body.style.backgroundColor = "beige"; }, 1000);
    }
    else {
        console.log("incorrect");
        counter = 0;
        document.getElementById("incorrect").style.display = "block";
        document.body.style.backgroundColor = "#F3B1B3";
        setTimeout(function() { document.getElementById("incorrect").style.display = "none"; document.body.style.backgroundColor = "beige"; }, 1000);
    }

    if (counter >= 20) {
        document.body.style.backgroundImage = "url(https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/22/1345642863334/pilate-film-008.jpg?width=620&quality=85&auto=format&fit=max&s=e283a7fd64787fee400c20ce7983d4b9)";
        document.body.style.backgroundSize = "cover";
    }

    reset();
}
