const seccion = document.getElementById("box-cardsUpcoming");

const checkboxesdiv = document.getElementById('categorySearch')

const categories = data.events.map(events => events.category) // Creo el array de categorías a partir de los eventos en "data"

const categoriesSinRepetidos = new Set(categories) // Creo un set para eliminar los elementos duplicados del array de categorías

const arrayCategoriesSinRepetidos = Array.from(categoriesSinRepetidos) // Convierto el set nuevamente a un array para tener disponible los métodos de array

pintarCheckbox(arrayCategoriesSinRepetidos, checkboxesdiv) // Creo los checkboxes dinámicamente en función del array de categorías

function crearCheck(category) { // Función para crear un checkbox con una categoría dada
  const div = document.createElement('DIV') // Crear un elemento <div>

  const input = document.createElement('INPUT') // Crear un elemento <input>
  input.type = "checkbox"
  input.className = "form-check-input"
  input.value = category
  input.id = `${category}-check` // Asignar un id único al checkbox
  input.name = "category"

  const label = document.createElement('LABEL') // Crear un elemento <label>
  label.className = "form-check-label"
  label.setAttribute('for', `${category}-check`) // Establecer el atributo "for" del label para asociarlo con el checkbox
  label.textContent = category

  div.appendChild(input) // Agregar el checkbox al div
  div.appendChild(label) // Agregar el label al div

  return div // Devolver el div creado
}

function pintarCheckbox(categories, elemento) { // Función para agregar los checkboxes al DOM
  const fragment = document.createDocumentFragment() // Crear un fragmento de documento para agregar los checkboxes

  for (const category of categories) {
    const div = crearCheck(category) // Crear un checkbox para cada categoría
    fragment.appendChild(div) // Agregar el checkbox al fragmento
  }
  elemento.appendChild(fragment) // Agregar el fragmento al elemento especificado
}

function crearPlantilla(event){
    return `<div class="card mb-3" style="width: 17rem;">
    <img src="${event.image}" class="card-img-top" alt="${event.name}">
    <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <p>Price: $${event.price}</p>
        <a href="../pages/details.html?id=${event._id}" class="btn btn-primary">Details</a>
    </div>
</div>`
}

function imprimirDatos(array){
    seccion.innerHTML = '';
    let template = ""

    for(let event of array){
        if(event.date < data.currentDate){    
            template += crearPlantilla(event)
        }
    }
    seccion.innerHTML += template
}
imprimirDatos(data.events, seccion)

const checkboxes = checkboxesdiv.querySelectorAll(`input[type="checkbox"]`)

let searchInput = document.getElementById("search-input");

function filtrarCartas(){
    let categoriasSeleccionada = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked){
            categoriasSeleccionada.push(checkbox.labels[0].innerText)
        }
    })

    let searchQuery = searchInput.value.toLowerCase().trim();

    if (categoriasSeleccionada.length > 0 || searchQuery !== ``) {
        let filteredEvents = data.events.filter((event) => {
            let categoryNameMatch = categoriasSeleccionada.length === 0 || categoriasSeleccionada.includes(event.category);
            let nameMatch = event.name.toLocaleLowerCase().includes(searchQuery);
            let descriptionMatch = event.description.toLocaleLowerCase().includes(searchQuery);
            return categoryNameMatch && (nameMatch || descriptionMatch);
        });
        imprimirDatos(filteredEvents);
    } else {
        imprimirDatos(data.events);
    }
}

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filtrarCartas);
});

searchInput.addEventListener(`keyup`, filtrarCartas);

window.addEventListener(`load`, () => {
    console.log(`Window loaded. Rendering all events.`);
    imprimirDatos(data.events);
});