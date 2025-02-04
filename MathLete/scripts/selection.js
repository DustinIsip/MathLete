if (localStorage.getItem("registered") == undefined){
    window.location.href = "register.html"
}

document.querySelectorAll(".button-container-item").forEach((div) => {
    div.querySelector("button").addEventListener('click', () =>{
        window.location.href = "play.html"
    })
})

if (localStorage.getItem("highScores") == undefined){
    document.querySelectorAll(".operation").forEach((p) => {
        p.textContent += 0
    });
}
else{
    const scores = JSON.parse(localStorage.getItem("highScores"));
    const keys = Object.keys(scores);
    document.querySelectorAll(".operation").forEach((p, i) => {
        p.textContent += scores[keys[i]]
    });
}

function saveSelectedMode(button) {
    localStorage.setItem("mode", button.id)
}

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}