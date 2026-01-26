 💸 Digicoin – Crypto Portfolio Management API

📌 Overview
Digicoin is a FastAPI-based backend application for managing a virtual cryptocurrency portfolio. It enables users to register, authenticate using JWT, add funds, buy/sell crypto assets, and track portfolio performance using live prices fetched from the Binance API.

This project demonstrates a complete client–server backend architecture with authentication, database persistence, and external API integration.

🔧 Features

User registration & login

JWT-based authentication (OAuth2 Bearer)

Add virtual money to wallet

Buy and sell cryptocurrency assets

Live price fetching from Binance API

Portfolio valuation and profit/loss calculation

SQLite database with SQLAlchemy ORM

Swagger & ReDoc auto-generated API docs

CORS enabled for frontend integration

🚀 How to Run

1️⃣ Create Virtual Environment

python -m venv venv
venv\Scripts\activate


2️⃣ Install Dependencies

pip install fastapi uvicorn sqlalchemy pydantic requests PyJWT


3️⃣ Run the Server

uvicorn main:app --reload


Server will start at:

http://127.0.0.1:8000


📘 API Documentation

Swagger UI

http://127.0.0.1:8000/docs


ReDoc

http://127.0.0.1:8000/redoc


💻 Project Structure

backend/
│
├── main.py          # FastAPI app & routes
├── models.py        # SQLAlchemy models
├── schemas.py       # Pydantic schemas
├── crypto_portfolio.db
└── README.md


🔐 Authentication Example

Login Request

POST /login
Content-Type: application/x-www-form-urlencoded

username=nimisha
password=1234


Response

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}


Use Token in Headers

Authorization: Bearer <access_token>


💰 Add Money Example

POST /add-money
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 5000
}


📈 Buy Asset Example

POST /buy
Authorization: Bearer <token>
Content-Type: application/json

{
  "symbol": "BTC",
  "quantity": 0.01
}


📉 Sell Asset Example

POST /sell
Authorization: Bearer <token>
Content-Type: application/json

{
  "symbol": "BTC",
  "quantity": 0.005
}


📊 Portfolio Response Example

{
  "total_added_money": 5000,
  "available_money": 3200,
  "total_value": 5400,
  "performance_abs": 400,
  "performance_rel": 8.0,
  "assets": [
    {
      "symbol": "BTC",
      "quantity": 0.005,
      "current_price": 65000,
      "total_value": 325,
      "avg_purchase_price": 60000,
      "performance_abs": 25,
      "performance_rel": 8.33
    }
  ]
}


🛠 Requirements

Python 3.9+

FastAPI

SQLAlchemy

SQLite

Internet connection (Binance API)

⚠️ Notes

Passwords are stored in plain text (not production-ready)

Uses Binance USDT trading pairs

Intended for learning and portfolio demonstration

🔮 Future Enhancements

Password hashing (bcrypt)

Transaction history endpoint

Angular / React frontend
