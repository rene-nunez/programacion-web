class Producto {
    constructor(codigo, nombre, cantidad, costo, categoria) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.categoria = categoria;
    }
}

class Inventario {
    constructor() {
        this.productos = new Map();
    }

    agregarProducto(producto) {
        if(this.productos.has(producto.codigo)) {
            return false;
        } else {
            this.productos.set(producto.codigo, producto)
            return true;
        }
    }
}

let inventario = new Inventario();

const buttonAdd = document.getElementById("buttonAdd");

buttonAdd.addEventListener("click", ()=> {
    let codigo = document.getElementById("inputCodigo").value;
    let nombre = document.getElementById("inputNombre").value;
    let cantidad = parseInt(document.getElementById("inputCantidad").value);
    let costo = parseFloat(document.getElementById("inputCosto").value) ;
    let categoria = document.getElementById("inputCategoria").value;

    // Validación
    if (isNaN(codigo) || codigo <= 0) {
        return mostrarNotificacion("Código inválido", "error");
    }
    if (!nombre) {
        return mostrarNotificacion("Nombre inválido", "error");
    }
    if (isNaN(cantidad) || cantidad < 1) {
        return mostrarNotificacion("Cantidad inválida", "error");
    }
    if (isNaN(costo) || costo < 1) {
        return mostrarNotificacion("Costo inválido", "error");
    }
    if (!categoria) {
        return mostrarNotificacion("Categoria inválida", "error");
    }
    
    let producto = new Producto(codigo, nombre, cantidad, costo, categoria);
    
    if(!inventario.agregarProducto(producto)) {
        mostrarNotificacion("Producto ya existe", "error");
    
    } else {
        inventario.productos.forEach((valor, clave) => {
            console.log(clave, valor); // mostrar el inventario en consola
        });

        mostrarNotificacion("Producto agregado", "exito");
    }
});

function mostrarNotificacion(mensaje, tipo) {
    const contenedor = document.getElementById("notificaciones");
    const notif = document.createElement("div");

    notif.classList.add("notificacion", tipo);
    notif.textContent = mensaje;
    contenedor.appendChild(notif);

    setTimeout(() => notif.classList.add("show"), 10);

    setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => contenedor.removeChild(notif), 500);
    }, 3000);
}