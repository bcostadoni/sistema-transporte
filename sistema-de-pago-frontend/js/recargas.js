document.addEventListener("DOMContentLoaded", function () {
  const usuarioGuardado = localStorage.getItem("usuario");
  console.log("usuario guardado en localStorage:", usuarioGuardado);

  if (!usuarioGuardado) {
    window.location.href = "login.html"; // Asegurate que esta ruta sea correcta
    return;
  }

  const usuario = JSON.parse(usuarioGuardado);
  const idUsuario = usuario.idUsuario;

  let saldoActual = 0;

  fetch("http://localhost:8080/usuarios/traer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idUsuario }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la información del usuario");
      }
      return response.json();
    })
    .then((usuario) => {
      saldoActual = usuario.saldo;
      document.getElementById("saldo-actual").innerText = saldoActual;
      document.getElementById("saldo-nuevo").innerText = saldoActual;
    })
    .catch((error) => {
      console.error("Error al cargar usuario:", error);
      alert("Error al cargar la información del usuario");
    });

  const inputMonto = document.getElementById("monto-recarga");

  inputMonto.addEventListener("input", () => {
    const monto = parseFloat(inputMonto.value) || 0;
    document.getElementById("saldo-nuevo").innerText = saldoActual + monto;
  });

  document.getElementById("btn-recargar").addEventListener("click", () => {
    const monto = parseFloat(inputMonto.value);
    if (monto > 0) {
      // Lógica para recargar saldo al backend (opcional)
      // Por ahora solo actualizamos el saldo mostrado
      saldoActual += monto;
      alert(`Recarga exitosa. Nuevo saldo: $${saldoActual}`);
      document.getElementById("saldo-actual").innerText = saldoActual;
      document.getElementById("saldo-nuevo").innerText = saldoActual;
      inputMonto.value = "";
    } else {
      alert("Ingrese un monto válido");
    }
  });
});
