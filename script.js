let map;
let marker;
let timer;
let warningTimer;
let timeLeft;

function initMap(lat, lon) {
  map = L.map('map').setView([lat, lon], 15);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  ).addTo(map);

  marker = L.marker([lat, lon]).addTo(map);
}

function startJourney() {

  let minutes =
    document.getElementById("time").value;

  timeLeft = minutes * 60;

  navigator.geolocation.watchPosition(position => {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    if (!map) {
      initMap(lat, lon);
    }

    marker.setLatLng([lat, lon]);
    map.setView([lat, lon]);

  });

  timer = setInterval(() => {

    timeLeft--;

    document.getElementById("timer").innerText =
      "Time Left: " + timeLeft + " sec";

    if (timeLeft <= 0) {
      clearInterval(timer);
      startWarning();
    }

  }, 1000);
}

function startWarning() {

  let warning = 30;

  warningTimer = setInterval(() => {

    warning--;

    document.getElementById("timer").innerText =
      "⚠ Respond in: " + warning;

    if (warning <= 0) {
      clearInterval(warningTimer);
      sendEmergency();
    }

  }, 1000);
}

function stopJourney() {
  clearInterval(timer);
  clearInterval(warningTimer);
  document.getElementById("timer").innerText =
    "Trip Ended Safely ✅";
}

function sendEmergency() {

  alert("🚨 Emergency Alert Triggered!");

  navigator.geolocation.getCurrentPosition(position => {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let link =
      `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}`;

    console.log("Send this to contacts:", link);

  });
}
