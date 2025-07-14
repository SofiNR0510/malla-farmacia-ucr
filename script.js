document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  // Recolectar IDs de materias ya desbloqueadas (sin requisitos)
  const desbloqueadas = new Set();
  materias.forEach(materia => {
    if (!materia.dataset.requisitos) {
      desbloqueadas.add(materia.dataset.id);
    }
  });

  materias.forEach(materia => {
    const requisitos = materia.dataset.requisitos?.split(",") || [];

    const cumpleRequisitos = requisitos.every(req => desbloqueadas.has(req));
    if (cumpleRequisitos) {
      materia.classList.remove("bloqueada");
    }
  });
});
