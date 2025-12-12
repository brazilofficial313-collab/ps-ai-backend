const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- AUTH API ---
app.post('/api/auth/login', (req, res) => {
  const jwt = require('jsonwebtoken');
  const token = jwt.sign(
    { user: "demo" },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );
  res.json({ success: true, token });
});

// --- USERS ---
app.get('/api/users', (req, res) => {
  res.json({ users: [], message: "users working" });
});

// --- WALLET ---
app.get('/api/wallet/balance', (req, res) => {
  res.json({ balance: 0, currency: "PKR" });
});

// --- QR PAYMENT ---
app.post('/api/payment/qr/generate', (req, res) => {
  res.json({
    qr_id: "QR" + Date.now(),
    amount: req.body.amount || 0,
    status: "generated"
  });
});

// --- CRYPTO PAYMENT ---
app.post('/api/payment/crypto/request', (req, res) => {
  res.json({
    reference: "CR" + Date.now(),
    wallet: "TRX_FAKE_ADDRESS",
    status: "awaiting_payment"
  });
});

// --- AFFILIATE ---
app.get('/api/affiliate', (req, res) => {
  res.json({ referrals: [], earnings: 0 });
});

// --- VERIFICATION ---
app.post('/api/verify/upload', (req, res) => {
  res.json({ success: true, message: "documents uploaded" });
});

// --- ADMIN ---
app.get('/api/admin', (req, res) => {
  res.json({ admin: true, status: "panel active" });
});

// --- ROOT ---
app.get('/', (req, res) => {
  res.json({ ok: true, message: "PS AI Backend Running" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("BACKEND RUNNING ON PORT", PORT));
