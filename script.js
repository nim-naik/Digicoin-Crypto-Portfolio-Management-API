const API_BASE = "";
let token = localStorage.getItem("token");
document.getElementById("regUsername").value="";
document.getElementById("regPassword").value="";


function showToast(message, success = true) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toast.style.background = success ? "#16a34a" : "#dc2626";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

async function apiCall(endpoint, method = "GET", body = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    });

    if (!res.ok) {
        let errorMessage = "";
        try {
            const errData = await res.json();
            errorMessage = errData.detail || JSON.stringify(errData);
        } catch (e) {
            errorMessage = await res.text();
        }

        showToast(errorMessage, false); 
        throw new Error(errorMessage);
    }

    return res.json();
}

async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    if(username != "" && password != ""){
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
    });

    if (!res.ok) {
        showToast("Login failed", false);
        return;
    }

    const data = await res.json();
    token = data.access_token;
    localStorage.setItem("token", token);

    hideModals();
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("portfolioSection").classList.remove("hidden");
    document.getElementById("logoutBtn").classList.remove("hidden");
    showToast("Login successful");
    loadPortfolio();
   
}
    else{
        showToast("Please enter username and passowrd");
    }
}

async function register() {
    
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    if(username != "" && password != ""){
    await apiCall("/register", "POST", { username, password });
    hideModals();
    showToast("Registered successfully. Please login.");
    username.value="";
    password.value="";
    }
    else{
        showToast("Please enter username and passowrd");
        username.value="";
        password.value="";
    }
} 

function logout() {
    localStorage.removeItem("token");
    token = null;
    document.getElementById("portfolioSection").classList.add("hidden");
    document.getElementById("authSection").classList.remove("hidden");
    document.getElementById("logoutBtn").classList.add("hidden");
    document.getElementById("loginUsername").value="";
    document.getElementById("loginPassword").value="";
    document.getElementById("regUsername").value="";
    document.getElementById("regPassword").value="";
    showToast("Logged out");
}

async function loadPortfolio() {
    const portfolio = await apiCall("/portfolio");

    document.getElementById("totalAddedMoney").textContent =
        `$${portfolio.total_added_money.toFixed(2)}`;

    document.getElementById("availableMoney").textContent =
        `$${portfolio.available_money.toFixed(2)}`;

    document.getElementById("portfolioValue").textContent =
        `$${portfolio.total_value.toFixed(2)}`;

    const profit = portfolio.performance_abs;
    const profitEl = document.getElementById("totalProfit");
    profitEl.textContent =
        `${profit >= 0 ? "+" : "-"}$${Math.abs(profit).toFixed(2)}`;
    profitEl.style.color = profit >= 0 ? "#4ade80" : "#ef4444";

    const tbody = document.querySelector("#assetsTable tbody");
    tbody.innerHTML = "";

    if (portfolio.assets.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="color:#9ca3af;"> You don't own any crypto yet. Start by buying assets.
                </td>
            </tr>`;
    } else {
        portfolio.assets.forEach(a => {
            const row = tbody.insertRow();
            
            
            const pnlAbs = a.performance_abs; // Absolute $
            const pnlRel = a.performance_rel; // Relative %
            const color = pnlAbs >= 0 ? "#4ade80" : "#ef4444";
            const sign = pnlAbs >= 0 ? "+" : "-";

            row.innerHTML = `
                <td>${a.symbol}</td>
                <td>${a.quantity}</td>
                <td>$${a.current_price.toFixed(2)}</td>
                <td>$${a.total_value.toFixed(2)}</td>
                <td style="color: ${color}; font-weight: bold;">
                    ${sign}$${Math.abs(pnlAbs).toFixed(2)}
                </td>`;
        });
    }

    const ttbody = document.querySelector("#transactionsTable tbody");
    ttbody.innerHTML = "";

    portfolio.transactions.forEach(tx => {
        const row = ttbody.insertRow();
        row.innerHTML = `
            <td>${tx.symbol}</td>
            <td>${Number(tx.quantity).toFixed(8)}</td>
            <td>$${tx.price.toFixed(2)}</td>
            <td>${tx.type}</td>
            <td>${new Date(tx.timestamp).toLocaleString()}</td>`;
    });
}

async function addMoney() {
    const amount = parseFloat(document.getElementById("addAmount").value);
    if (!amount || amount <= 0) {
        showToast("Enter valid amount", false);
        return;
    }

    await apiCall("/add-money", "POST", { amount });
    hideModals();
    showToast("Money added successfully");
    loadPortfolio();
}

async function trade(type) {
    const symbol = (
        type === "buy"
            ? document.getElementById("buySymbol").value
            : document.getElementById("sellSymbol").value
    ).toUpperCase();

    const quantity = parseFloat(
        type === "buy"
            ? document.getElementById("buyQuantity").value
            : document.getElementById("sellQuantity").value
    );

    if (!symbol || !quantity || quantity <= 0) {
        showToast("Enter valid symbol and quantity", false);
        return;
    }

    if (type === "sell") {
        if (!confirm("Are you sure you want to sell this asset?")) return;
    }

    const endpoint = type === "buy" ? "/buy" : "/sell";

    await apiCall(endpoint, "POST", { symbol, quantity });

    hideModals();
    showToast(`${type.toUpperCase()} successful`);
    loadPortfolio();
}

function showModal(id) {
    hideModals();
    document.getElementById(id).style.display = "block";
}

function hideModals() {
    document.querySelectorAll(".modal").forEach(m => (m.style.display = "none"));
}

if (token) {
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("portfolioSection").classList.remove("hidden");
    loadPortfolio();
}

setInterval(() => {
    if (token) {
        loadPortfolio();
    }
}, 10000);



function newFunctionality(){
   alert("New functionality is coming up.");
}

function checkAuth() {
    token = localStorage.getItem("token");

    if (token) {
        document.getElementById("authSection").classList.add("hidden");
        document.getElementById("portfolioSection").classList.remove("hidden");
        document.getElementById("logoutBtn").classList.remove("hidden");
        loadPortfolio();
    } else {
        document.getElementById("authSection").classList.remove("hidden");
        document.getElementById("portfolioSection").classList.add("hidden");
        document.getElementById("logoutBtn").classList.add("hidden");
    }
}

window.addEventListener("load", checkAuth);

async function toSearch(){
   
   var symbolToSearch = prompt("Enter the name of cryptocurrency to search (in small letters).")
   var targetUrl =`https://api.coingecko.com/api/v3/coins/${symbolToSearch}`; 

   if(symbolToSearch != "" ){
    if(symbolToSearch !== null){
      try {
        const response = await fetch(targetUrl);

        if (response.ok) {
            window.open(`https://www.coingecko.com/en/coins/${symbolToSearch}`, "_blank");
        } else if (response.status === 404){
            alert(`Sorry, symbol "${symbolToSearch}" was not found.`);
        }
        else{
            alert(`System is facing some issues. Please try after sometime`);
        }
    } catch (e) {
        showToast(`Unable to verify symbol. Please check your connection.`, false); // Network issues or cors blocks.
    }
   }
}
   else{
     alert("Please enter symbol");
   }
}
