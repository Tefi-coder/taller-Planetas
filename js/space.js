let botonBusqueda = document.getElementById("btnBuscar");
let barraBuscar = document.getElementById("inputBuscar");
let contenedor = document.getElementById("contenedor");

document.addEventListener("DOMContentLoaded", () => {
  botonBusqueda.addEventListener("click", () => {
    let busqueda = barraBuscar.value.trim(); 

    if (busqueda) {
      let url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(busqueda)}`;
      // encodeURIComponent se usa para que si el usuario al hacer la busqueda //
      //utiliza caracteres especiales o espacios en la busqueda esta sea de igual manera correcta //

      // Realiza el fetch
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
         resultadoBusqueda(data.collection.items); // Llama a la función con los resultados//
        })
        .catch((error) => {
          console.error("Error al buscar", error);
        });
    }
  });

  function resultadoBusqueda(busqueda) { 
    // Vacia el contenedor
    contenedor.innerHTML = '';
    
    // Se verifica si no hay resultados en el array busqueda
    if (busqueda.length === 0) { 
      // Indica que no hubo resultado
      contenedor.innerHTML = 'No se encontraron resultados';
      // Termina la ejecución de la función si no hay resultados //
      return;
    }

    let fila = '<div class="row">'; 

    busqueda.forEach(busqueda => {
      let { title, description, date_created } = busqueda.data[0];
      let imagen = busqueda.links ? busqueda.links[0].href : 'https://via.placeholder.com/150';
  
      // tarjeta con Bootstrap //
      let tarjeta = `
          <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
              <div class="card h-100">
                  <img src="${imagen}" class="card-img-top" alt="${title}">
                  <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${description}</p>
                      <button class="btn btn-outline-primary ver-mas">Leer más</button>
                      <p class="d-none card-text descripcion-completa">${description}</p>
                      <button class="btn btn-outline-warning agregar-favoritos">Agregar a Favoritos</button>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item"><small class="text-body-secondary">Publicado el: ${new Date(date_created).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</small></li>
                  </ul>
              </div>
          </div>
      `;
  
      fila += tarjeta;
    });
    
    fila += '</div>'; 
    contenedor.innerHTML = fila;
    

   

}});
