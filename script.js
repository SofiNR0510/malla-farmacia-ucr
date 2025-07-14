document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");
  const aprobadas = new Set(JSON.parse(localStorage.getItem("materiasAprobadas") || "[]"));

  function actualizarEstado() {
    materias.forEach(materia => {
      const id = materia.dataset.id;
      const requisitos = materia.dataset.requisitos?.split(",") || [];

      const desbloqueada = requisitos.every(req => aprobadas.has(req));

      if (desbloqueada) {
        materia.classList.remove("bloqueada");
        materia.querySelector(".aprobar-btn").disabled = false;
      } else {
        materia.classList.add("bloqueada");
        materia.querySelector(".aprobar-btn").disabled = true;
      }

      if (aprobadas.has(id)) {
        materia.classList.add("aprobada");
        materia.querySelector(".aprobar-btn").textContent = "Aprobada";
        materia.querySelector(".aprobar-btn").disabled = true;
      }
    });
  }

  materias.forEach(materia => {
    const id = materia.dataset.id;
    const btn = materia.querySelector(".aprobar-btn");
    btn.addEventListener("click", () => {
      aprobadas.add(id);
      localStorage.setItem("materiasAprobadas", JSON.stringify([...aprobadas]));
      actualizarEstado();
    });
  });

  actualizarEstado();
});
