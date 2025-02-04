if(localStorage.getItem("registered") != undefined)
    window.location.href = "selection.html";

document.getElementById("register").addEventListener("submit", (event) =>{
    event.preventDefault();
    if(document.getElementById("username").value !== document.getElementById("username-confirmation").value){
        document.querySelectorAll(".feedback").forEach((p)=>{
            p.textContent = "Username does not match";
            p.classList.remove("hidden");
            p.style.color = "red";
        });
        document.getElementById("register-body").style.borderColor = "red";
    }
    else{
        localStorage.setItem("registered", JSON.stringify(true));
        window.location.href = "selection.html";
    }
});