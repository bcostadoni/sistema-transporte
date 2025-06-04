document.getElementById("registroForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    email: form.email.value,
    password: form.password.value,
    tipo_documento: form.tipo_documento.value,
    numero_documento: form.numero_documento.value
  };

  fetch("http://localhost:8080/usuarios/crear", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then((response) => {
    if (response.ok) {
        // Redireccionar al login
        window.location.href = "login.html";
    } else {
        document.getElementById("mensaje").textContent = "Error al registrar usuario.";
    }
    });
});
