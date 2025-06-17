// frontend/js/login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/usuarios/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const usuario = await response.json();
      localStorage.setItem("usuario", JSON.stringify(usuario));
      alert("Bienvenido, " + usuario.nombre);
      window.location.href = "home.html";
    } else {
      document.getElementById("mensaje").innerText = "Credenciales incorrectas.";
    }
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    document.getElementById("mensaje").innerText = "Error del servidor.";
  }
});
