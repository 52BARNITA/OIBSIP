/* ------ Register Logic ------- */
function register(){
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if(username === "" || password === ""){
        alert("Please fill all the fields")
        return;
    }

    const user = {
        username: username,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful! Please login");
    window.location.href = "index.html";
}

/* ------ Login Page Logic ------- */
function login(){
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if(!savedUser){
        alert("No user found. Please register first");
        return;
    }
const errorMsg = document.getElementById("errorMsg");

    if(username === savedUser.username && password === savedUser.password){
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    }else{
        errorMsg.innerText = "Invalid username or password ⚠️";
    }
}

function logout(){
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}
if (window.location.pathname.includes("dashboard.html")) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "index.html";
  }
}

const passwordInput = document.getElementById("loginPassword");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", ()=>{
    if(passwordInput.type === "password"){
        passwordInput.type = "text";
        togglePassword.textContent = "🔒";
    }else{
        passwordInput.type = "password";
        togglePassword.textContent = "👁️";
    }
});