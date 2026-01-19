💬 **Digicoin – Crypto Portfolio Management API**

📌 **Overview**
Digicoin is a FastAPI-based backend application for managing a virtual cryptocurrency portfolio. It allows users to register, authenticate securely using JWT, add funds, trade crypto assets (buy/sell), and view real-time portfolio performance using live prices fetched from the Binance API.

This project is ideal for learning **FastAPI, authentication, SQLAlchemy ORM, and financial logic** in a clean client–server architecture.

---

🔧 **Features**

* User registration & login
* JWT-based authentication (OAuth2 Bearer tokens)
* Add virtual money to wallet
* Buy & sell cryptocurrency assets
* Live crypto prices via Binance API
* Portfolio valuation & performance tracking
* SQLite database with SQLAlchemy ORM
* CORS enabled for frontend integration
* Auto-generated Swagger & ReDoc documentation

---

🚀 **How to Run**

**1️⃣ Create Virtual Environment**

```cmd
python -m venv venv
venv\Scripts\activate
```

**2️⃣ Install Dependencies**

```cmd
pip install fastapi uvicorn sqlalchemy pydantic requests PyJWT
```

**3️⃣ Run the Server**

```cmd
uvicorn main:app --reload
```

Server runs at:
👉 `http://127.0.0.1:8000`

---

📘 **API Documentation**

* Swagger UI: `http://127.0.0.1:8000/docs`

---

💻 **File Descriptions**

**main.py**

* Contains FastAPI app initialization
* API routes for authentication, trading, and portfolio
* JWT token handling
* Binance price integration

**models.py**

* SQLAlchemy ORM models:

  * User
  * Portfolio
  * Asset
  * Transaction
* Defines database relationships

**schemas.py**

* Pydantic models for request validation:

  * UserCreate
  * AddMoney
  * TradeAsset

---

📊 **Core Endpoints**

**Authentication**

* `POST /register` – Create new user
* `POST /login` – Login & receive JWT token

**Wallet**

* `POST /add-money` – Add funds to portfolio

**Trading**

* `POST /buy` – Buy crypto asset
* `POST /sell` – Sell crypto asset

**Portfolio**

* `GET /portfolio` – View assets, value & performance

> All protected routes require:

```
Authorization: Bearer <access_token>
```

---

🛠 **Requirements**

* Python 3.9+
* FastAPI
* SQLAlchemy
* SQLite
* Internet connection (for live crypto prices)

---

⚠️ **Notes**

* Passwords are stored in plain text (not production-ready)
* Prices are fetched from Binance USDT pairs
* Designed for learning, demos, and portfolio projects

---

🔮 **Future Enhancements**
* Frontend integration 
---

📖 **About**
Digicoin is a learning-focused FinTech backend project that simulates a crypto trading platform. It demonstrates real-world concepts like authentication, portfolio accounting, and external API integration using modern Python frameworks.

---

⭐ **Languages**

* Python 
