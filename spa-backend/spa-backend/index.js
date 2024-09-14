document.addEventListener('DOMContentLoaded', function() {
  const comentarios = document.querySelectorAll('.comentario');
  let index = 0;

  // Función para cambiar comentario
  function mostrarComentario() {
    // Ocultar el comentario actual
    comentarios[index].classList.remove('active');

    // Cambiar al siguiente comentario
    index = (index + 1) % comentarios.length;

    // Mostrar el nuevo comentario
    comentarios[index].classList.add('active');
  }

  // Mostrar el primer comentario inicialmente
  comentarios[index].classList.add('active');

  // Cambiar comentario cada 3 segundos
  setInterval(mostrarComentario, 3000);
});
