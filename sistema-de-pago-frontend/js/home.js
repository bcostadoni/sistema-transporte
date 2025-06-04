document.addEventListener("DOMContentLoaded", function () {
  const usuarioGuardado = localStorage.getItem("usuario");
  console.log("usuario guardado en localStorage:", usuarioGuardado);

  if (!usuarioGuardado) {
    window.location.href = "login.html";
    return;
  }

  const usuario = JSON.parse(usuarioGuardado);
  const idUsuario = usuario.id;

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
      document.getElementById("nombre-usuario").innerText = `${usuario.nombre} ${usuario.apellido}`;
      document.getElementById("saldo-usuario").innerText = usuario.saldo;
    })
    .catch((error) => {
      console.error("Error al cargar usuario:", error);
      alert("Error al cargar la información del usuario");
    });

  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
  });
});