let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina++;
    CargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
      pagina--;
      CargarPeliculas();
    }
  });

const CargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=f1cf7e540cb099c09a357b2df5454f84&language=es-GT&page=${pagina}`
    );
    const datos = await respuesta.json();

    if (respuesta.status === 200) {
      let peliculas = "";
      datos.results.forEach((pelicula) => {
        return (peliculas =
          peliculas +
          `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" />
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `);
      });
      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 404) {
      console.error("La pelicula no existe");
    } else {
      console.error("Eres alienigena o un robot");
    }
  } catch (error) {
    console.error(error);
  }
};

CargarPeliculas();
