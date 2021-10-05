while (true) { // On load: FIXME
    // In the future, this will be split by chapter
    let verbs = require("data/verbs.json"); // FIXME

    // Get a random question
    let current = verbs[Math.floor(Math.random() * verbs.length)];

    // Reset and repopulate the form
    let inputs = document.querySelectorAll("input[type=radio]");
    inputs.forEach(item => {item.checked = false});
    document.getElementById("verb") = current.verb;

    // Wait until button is submitted
    button = document.getElementById("check");
    button.addEventListener("click", check(current))

    // Perhaps: restructure to use the check button as the trigger?
}

function check(current) {
    // Transform submission into a JSON structure for easy comparison
    let answers = { // TODO: Catch empty values
        "verb": document.getElementById("verb").textContent,
        "person": document.querySelector("input[name='person']:checked").value,
        "number": document.querySelector("input[name='number']:checked").value,
        "tense": document.querySelector("input[name='tense']:checked").value,
        "voice": document.querySelector("input[name='voice']:checked").value,
        "mood": document.querySelector("input[name='mood']:checked").value
    };

    // Check if the answers are right and flash the thumbs up / down symbol
    // (if the constructed JSON structure matches the original)
    if (current == answers) {
        // Consider flashing the background green / red too
        document.getElementById("correct").style.display = 'block';
        setTimeout(document.getElementById("correct").style.display = 'none', 1000);
    }
    else {
        document.getElementById("incorrect").style.display = 'block';
        setTimeout(document.getElementById("incorrect").style.display = 'none', 1000);
    }
}
