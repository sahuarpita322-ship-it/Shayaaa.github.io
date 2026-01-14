// npm install ws express jsonwebtoken cors
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");

const SECRET = "SAHAYA_SECURE_KEY"; // keep secret
const app = express();
app.use(cors());
app.use(express.json());

// Generate token for ambulance driver (admin only)
app.post("/driver/login", (req, res) => {
  const { driverId, password } = req.body;

  if (password !== "driver123") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "driver", driverId }, SECRET, { expiresIn: "6h" });
  res.json({ token });
});

// WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
let ambulanceStatus = {};

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      // 🔐 Verify driver token
      const decoded = jwt.verify(data.token, SECRET);
      if (decoded.role !== "driver") return;

      ambulanceStatus = {
        lat: data.lat,
        lng: data.lng,
        distance: data.distance,
        eta: data.eta
      };

      // Broadcast to all users
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(ambulanceStatus));
        }
      });

    } catch (err) {
      console.log("Unauthorized update blocked");
    }
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));