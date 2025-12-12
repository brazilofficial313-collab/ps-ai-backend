// index.js - PS AI Tool hotfix backend (paste this file in repo root)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Module routes (we will send each module file next)
const mount = (path) => {
  try {
    app.use(path, require(__dirname + path + '.js'));
  } catch (e) {
    // if file not present yet, return placeholder route
    app.use(path, (req, res, next) => {
      if (req.path === '/' || req.path === '') return res.json({ route: path, status: 'not-installed-yet' });
      next();
    });
  }
};

mount('/modules/auth/auth.routes');
mount('/modules/users/users.routes');
mount('/modules/wallet/wallet.routes');
mount('/modules/payment/qr/qr.routes');
mount('/modules/payment/crypto/crypto.routes');
mount('/modules/affiliate/affiliate.routes');
mount('/modules/verification/verify.routes');
mount('/modules/admin/admin.routes');

app.get('/', (req, res) => res.json({ ok: true, app: 'PS AI Tool - Hotfix Backend' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
