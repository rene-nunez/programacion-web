const btnAgregar = document.getElementById("btnAgregar");
const btnListar = document.getElementById("btnListar");
const btnBuscar = document.getElementById("btnBuscar");

const lista = document.getElementById("lista");

const API_URL = "/vehiculos";

btnAgregar.addEventListener("click", () => {
    const placa = document.getElementById("placa").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;

    if(placa && marca && modelo) {
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ placa, marca, modelo })
        })
        .then(res => res.json())
        .then(data => console.log(data.res))
    } else {
        console.warn("Completar todos los campos.");
    }
});

btnListar.addEventListener("click", () => {
    fetch(API_URL)
        .then(res => res.json())
        .then(vehiculos => {
            lista.innerHTML = "<ul>";

            if(!vehiculos.length) {
                lista.innerHTML = "<p>No hay vehículos en el almácen</p>"
                return;
            }

            vehiculos.forEach(vehiculo => {
                lista.innerHTML += `<ul>Placa: ${vehiculo.placa}, Marca: ${vehiculo.marca}, Modelo: ${vehiculo.modelo} <button type="button" onclick="eliminar(${vehiculo.placa})">Eliminar</button></ul>`
            });
        })
})

btnBuscar.addEventListener("click", () => {
    const placa = document.getElementById("placa").value;

    if(!placa) {
        console.warn("Ingresar una placa válida");
        return;
    }

    fetch(`${API_URL}/${placa}`)
        .then(res => res.json())
        .then(data => console.log(data))
})

window.eliminar = (placa) => {
    fetch(`${API_URL}/${placa}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.res);
    })
}