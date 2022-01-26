"use strict";

// In the future, this will be split by chapter.
// loading JSON from a file is apparently a non-trivial task. XMLHttpRequest? holy shit
let verbs = [
    {
        "verb": "curro",
        "person": "first",
        "number": "singular",
        "tense": "present",
        "voice": "active",
        "mood": "indicative"
    },
    {
        "verb": "curris",
        "person": "second",
        "number": "singular",
        "tense": "present",
        "voice": "active",
        "mood": "indicative"
    },
    {
        "verb": "currit",
        "person": "third",
        "number": "singular",
        "tense": "present",
        "voice": "active",
        "mood": "indicative"
    },
    {
        "verb": "currimus",
        "person": "first",
        "number": "plural",
        "tense": "present",
        "voice": "active",
        "mood": "indicative"
    },
    {
        "verb": "curritis",
        "person": "second",
        "number": "plural",
        "tense": "present",
        "voice": "active",
        "mood": "indicative"
    },
    {
        "verb": "currunt",
        "person": "third",
        "number": "plural",
        "tense": "present",
        "voice": "active",
        "mood": "indicative"
    }
];

document.addEventListener("load", reset());

// Runs on load and after flashing solution
function reset() {
    // Get a random question
    let current = verbs[Math.floor(Math.random() * verbs.length)]; // Yeah, so, this is the best way to pick a random integer...

    // Reset and repopulate the form
    let inputs = document.querySelectorAll("input[type=radio]");
    inputs.forEach(item => {item.checked = false}); // Delicious. Finally, some good fucking code.
    document.getElementById("verb").innerHTML = current.verb;

    // Wait until button is submitted
    let button = document.getElementById("check");
    button.addEventListener("click", check);
}

function check() {
    console.log("running check");

    // I miss every other language.
    // There's got to be a better way to do this...
    let current = {"null":"null"}
    verbs.forEach(verb => {if (verb["verb"] == document.getElementById("verb").textContent) current = verb;});
    console.log(current);

    // A terrible hack to catch null values.
    let answers = {"null":"null"}
    if (!(document.querySelector("input[name='person']:checked") === null
    || document.querySelector("input[name='number']:checked") === null
    || document.querySelector("input[name='tense']:checked") === null
    || document.querySelector("input[name='voice']:checked") === null
    || document.querySelector("input[name='mood']:checked") === null)) {
        answers = {
            // Transform submission into a JSON structure for "easy" comparison // oh, if only i knew
            "verb": document.getElementById("verb").textContent,
            "person": document.querySelector("input[name='person']:checked").value,
            "number": document.querySelector("input[name='number']:checked").value,
            "tense": document.querySelector("input[name='tense']:checked").value,
            "voice": document.querySelector("input[name='voice']:checked").value,
            "mood": document.querySelector("input[name='mood']:checked").value
        };
    }

    // Check if the answers are right and flash the thumbs up / down symbol
    // (if the constructed JSON structure matches the original)
    console.log(current);
    console.log(answers);
    if (JSON.stringify(current) === JSON.stringify(answers)) { // So, apparently, neither == or === checks for object equality
        console.log("correct");
        // Consider flashing the background green / red too
        document.getElementById("correct").style.display = "block";
        setTimeout(function() { document.getElementById("correct").style.display = "none"; }, 1000);
    }
    else {
        console.log("incorrect");
        document.getElementById("incorrect").style.display = "block";
        // It took me around an hour to find out I had to wrap my function in function(){}
        setTimeout(function() { document.getElementById("incorrect").style.display = "none"; }, 1000);
    }

    reset();
}
