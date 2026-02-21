
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
app.post("/dispatch", (req, res) => {

  const { lat, lng } = req.body;

  let scored = ambulances
    .filter(a => a.available)
    .map(a => {
      const distance = calculateDistance(lat, lng, a.lat, a.lng);
      const score = distance - (a.rating * 0.5);
      return { ...a, distance, score };
    });

  scored.sort((a, b) => a.score - b.score);
  const selected = scored.slice(0, 3);
  app.get("/active", (req, res) => {
  if (!activeEmergency) {
    return res.json({ message: "No active emergency" });
  }

  res.json(activeEmergency);
});

  // 🔥 ADD THIS HERE
  activeEmergency = {
    userLocation: { lat, lng },
    assignedAmbulance: null
  };
  console.log("Active Emergency Created:", activeEmergency);

  res.json({
    message: "Top ambulances selected",
    selected
  });

});

let ambulances = [
  {
    id: 1,
    name: "Ambulance A",
    lat: 20.2961,
    lng: 85.8245,
    rating: 4.5,
    available: true
  },
  {
    id: 2,
    name: "Ambulance B",
    lat: 20.3000,
    lng: 85.8200,
    rating: 4.2,
    available: true
  }
];
let activeEmergency = null;
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// WebSocket server
const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const wss = new WebSocket.Server({ server });
let ambulanceStatus = {};

wss.on("connection", (ws) => {

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      // ===============================
      // 1️⃣ DRIVER LOCATION UPDATE
      // ===============================
      if (data.type === "locationUpdate") {

  const decoded = jwt.verify(data.token, SECRET);
  if (decoded.role !== "driver") return;

  const response = {
    type: "locationUpdate",
    ambulanceId: decoded.id,
    lat: data.lat,
    lng: data.lng,
    rating: data.rating,
    eta: data.eta,
    distance: data.distance
  };

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(response));
    }
  });
}

      // ===============================
      // 2️⃣ EMERGENCY REQUEST FROM USER
      // ===============================
      if (data.type === "emergency") {

        const response = {
          type: "emergency",
          lat: data.lat,
          lng: data.lng
        };

        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(response));
          }
        });
      }

    } catch (err) {
      console.log("Unauthorized update blocked");
    }
  });

});
app.listen(3000, () => console.log("Server running on port 3000"));
