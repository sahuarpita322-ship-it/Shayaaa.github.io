const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  document.getElementById("status").innerHTML = `
    🚑 Ambulance Distance: <b>${data.distance}</b><br>
    ⏱ ETA: <b>${data.eta}</b>
  `;
};