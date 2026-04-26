## 💸 DIGIcoin – Full-Stack Crypto Portfolio Tracker

**DIGIcoin** is a comprehensive full-stack application that allows users to manage a virtual cryptocurrency portfolio using real-time market data. The system integrates a **FastAPI** backend with a **Vanilla JavaScript** frontend to provide a seamless tracking experience.

---

### 🔧 Key Features

* **User Authentication**: Secure registration and login system utilizing **JWT (OAuth2 Bearer)** tokens for session management.
* **Virtual Wallet**: Users can add virtual USD to their account to simulate trading without financial risk.
* **Real-Time Trading**: Supports buying and selling crypto assets with live price fetching via the **Binance API**.
* **Performance Analytics**: Automatic calculation of total portfolio value, absolute profit/loss, and percentage returns.
* **Market Research**: Integrated search tool that verifies asset availability through the **CoinGecko API** and links to detailed market pages.
* **Transaction Logging**: Maintains a detailed history of all trades, including timestamps, asset quantities, and execution prices.

---

### 💻 Project Structure

| File | Description |
| :--- | :--- |
| `main.py` | Core FastAPI application containing API routes and business logic. |
| `models.py` | SQLAlchemy database models for Users, Portfolios, Assets, and Transactions. |
| `schemas.py` | Pydantic models for data validation and request/response structures. |
| `index.html` | Responsive UI structure featuring trading modals and dashboard sections. |
| `script.js` | Frontend logic for API communication, UI updates, and token management. |
| `style.css` | Custom dark-themed styling and responsive layout configurations. |

---

### 🚀 Getting Started

#### 1. Backend Configuration
1.  **Environment Setup**: Create and activate a Python virtual environment.
2.  **Dependencies**: Install required packages: `fastapi`, `uvicorn`, `sqlalchemy`, `pydantic`, `requests`, and `PyJWT`.
3.  **Launch**: Run the server using `uvicorn main:app --reload` to start the backend at `http://127.0.0.1:8000`.

#### 2. Frontend Configuration
* Open `index.html` directly in a browser or serve it via a local web server.
* Ensure the backend is running to allow the frontend to authenticate and fetch live data.

---

### 📘 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Create a new user account and initialize a portfolio. |
| `POST` | `/login` | Authenticate user and receive a JWT access token. |
| `POST` | `/add-money`| Deposit virtual funds into the user's available balance. |
| `POST` | `/buy` | Purchase a crypto asset using live Binance ticker prices. |
| `POST` | `/sell` | Sell a portion or all of a held asset back into virtual USD. |
| `GET` | `/portfolio` | Retrieve current holdings, total value, and performance metrics. |

---

### ⚠️ Important Notes
* **Security**: Passwords are currently stored in plain text; for production, implement hashing (e.g., bcrypt).
* **Trading Pairs**: The system defaults to **USDT** pairs on Binance (e.g., "BTC" queries "BTCUSDT").
* **Development**: The backend is configured with **CORS** enabled to allow requests from any origin.

---

🔮 Future Roadmap
* **Secure Password Hashing**: Implement passlib with bcrypt to replace plain-text storage and protect user credentials from database leaks.

* **Interactive Analytics**: Integrate Chart.js to provide users with visual historical data and asset distribution breakdowns.

* **Environment Variables**: Move the SECRET_KEY into a .env file to prevent sensitive configuration data from being exposed in the source code.

* **Token Expiry**: Add expiration timestamps to JWT tokens to minimize the impact of potential session hijacking.
