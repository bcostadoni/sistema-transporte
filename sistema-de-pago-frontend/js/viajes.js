document.addEventListener("DOMContentLoaded", () => {
  const usuarioGuardado = localStorage.getItem("usuario");
  if (!usuarioGuardado) return;

  const usuario = JSON.parse(usuarioGuardado);
  const idUsuario = usuario.idUsuario;

  fetch("http://localhost:8080/viajes/traer/usuario/" + idUsuario)
    .then((res) => {
      if (!res.ok) throw new Error("No se pudieron cargar los viajes");
      return res.json();
    })
    .then((viajes) => {
      const grilla = document.getElementById("grilla-viajes");
      if (viajes.length === 0) {
        grilla.innerHTML = "<p>No tenés viajes registrados.</p>";
        return;
      }

          // Crear la tabla
      const table = document.createElement("table");
      table.className = "viaje-tabla"; // Podés usar esta clase para aplicar estilos con CSS

      // Crear el encabezado de la tabla
      table.innerHTML = `
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Método de Pago</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      // Referencia al cuerpo de la tabla
      const tbody = table.querySelector("tbody");

      // Llenar la tabla con los viajes
      viajes.forEach((viaje) => {
        const fila = document.createElement("tr");

        const fecha = new Date(viaje.fechaHora).toLocaleString("es-AR");
        const monto = `$${viaje.monto.toFixed(2)}`;
        const origen = viaje.estacionOrigen?.ubicacion || "Desconocido";
        const destino = viaje.estacionDestino?.ubicacion || "Desconocido";
        const metodo = viaje.metodoDePago
          ? `${viaje.metodoDePago.tipo} - ${viaje.metodoDePago.proveedor}`
          : "Desconocido";

        fila.innerHTML = `
          <td>${viaje.id}</td>
          <td>${fecha}</td>
          <td>${monto}</td>
          <td>${origen}</td>
          <td>${destino}</td>
          <td>${metodo}</td>
        `;

        tbody.appendChild(fila);
      });

      // Limpiar la grilla y agregar la tabla
      grilla.innerHTML = "";
      grilla.appendChild(table);
    })
    .catch((error) => {
      console.error("Error al cargar viajes:", error);
      document.getElementById("grilla-viajes").innerHTML =
        "<p>Error al cargar los viajes.</p>";
    });
});
