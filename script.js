document.getElementById("route-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const waypointsInput = document.getElementById("waypoints").value;
  
    if (start && end) {
      calculateRoute(start, end, waypointsInput);
    } else {
      alert("Por favor, preencha os campos de partida e destino.");
    }
  });
  
  function calculateRoute(start, end, waypointsInput) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: -23.5505, lng: -46.6333 }, // Centro inicial (São Paulo)
    });
  
    directionsRenderer.setMap(map);
  
    const waypoints = waypointsInput
      .split(",")
      .map((address) => ({ location: address.trim(), stopover: true }));
  
    directionsService.route(
      {
        origin: start,
        destination: end,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
  
          // Exibe a rota otimizada
          const route = result.routes[0];
          const summaryPanel = document.getElementById("summary");
          summaryPanel.innerHTML = "<h2>Resumo da Rota:</h2>";
  
          route.legs.forEach((leg, index) => {
            summaryPanel.innerHTML += `<p><strong>Rota ${index + 1}:</strong> 
            De ${leg.start_address} para ${leg.end_address}<br>
            <strong>Distância:</strong> ${leg.distance.text}<br>
            <strong>Duração:</strong> ${leg.duration.text}</p>`;
          });
        } else {
          alert("Erro ao calcular a rota: " + status);
        }
      }
    );
  }
