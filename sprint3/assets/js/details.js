const contenedor = document.getElementById("contenedorDetails")

const params = new URLSearchParams (location.search)

const id = params.get ("id")

const idEncontrado = data.events.find (event => event._id == id)

contenedor.innerHTML = `<div>
<img src="${idEncontrado.image}" alt="${idEncontrado.name}">
</div>
<div>
<h5>${idEncontrado.name}</h5>
<p>${idEncontrado.description}</p>
<ul>
    <li>Category : ${idEncontrado.category}</li>
    <li>Place : ${idEncontrado.place}</li>
    <li>Capacity : ${idEncontrado.capacity}</li>
    <li>Price : $${idEncontrado.price}</li>
</ul>
</div>
</div>`
