const upcomingHtml = document.getElementById ("upComingEvents")
const pastHtml = document.getElementById ("pastEvents")
const cardsHtmlIndex = document.getElementById ("box-cardsIndex")
const cardsHtmlupComing = document.getElementById ("box-cardsUpcoming")
const cardsHtmlPast = document.getElementById ("box-cardsPast")

const currentDate = data.currentDate //llamando a la fecha actual de la Data.js
const cartasTotales = data.events //llamando a todas las cartas del Data.js

if (upcomingHtml) {
    imprimirDatos(cartasTotales, cardsHtmlupComing, "futuros") //
} else if (pastHtml) {
    imprimirDatos(cartasTotales, cardsHtmlPast, "pasados")
} else {
    imprimirDatos(cartasTotales, cardsHtmlIndex, "todos") //al finalizar la condicional, si no está en Up o Past deja las 14 datos completos
}

function cargarDatos(objeto) {
    return `<div class="card mb-3" style="width: 17rem;">
    <img src="${objeto.image}" class="card-img-top" alt="${objeto.name}">
    <div class="card-body">
        <h5 class="card-title">${objeto.name}</h5>
        <p class="card-text">${objeto.description}</p>
        <p>Price: $${objeto.price}</p>
        <a href="./assets/pages/details.html" class="btn btn-primary">Details</a>
    </div>
</div>`
} //estoy seleccionando las propiedades del array que necesito que modifique.

function imprimirDatos(arrayCards, cardsHtmlIndex, identificador) {
    let template = "" 
    for (let event of arrayCards) {
        if (identificador === "futuros") { //carga todos los datos de fechas mayores a la actual(current.date)
            if (event.date >= currentDate) {
                template += cargarDatos(event)
            }
        } else if (identificador === "pasados") { //carga todos los datos de fechas menores a la actual(current.date)
            if (event.date < currentDate) {
                template += cargarDatos(event)
            }
        } else { //ya si no es ninguna de las anteriores, cargará los datos sin distincion de fechas.
            template += cargarDatos(event)
        }
    }
     console.log(template)
    cardsHtmlIndex.innerHTML = template //éste metodo cambia el contenido del elemento HTML
}

