document.getElementById("mostrarFormulario").addEventListener("click", function(event) {
    event.preventDefault();
    let formulario = document.getElementById("formulario");
    formulario.classList.toggle("hidden");
});
