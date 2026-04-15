import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

class Vehiculo {
    constructor(placa, marca, modelo) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
    }
}

class Almacen {
    constructor() {
        this.vehiculos = [];
    }

    agregar(vehiculo) {
        this.vehiculos.push(vehiculo);
    };

    listar() {
        return this.vehiculos;
    };

    buscar(placa) {
        for(let i = 0; i < this.vehiculos.length; i++) {
            if(this.vehiculos[i].placa = placa) {
                return this.vehiculos[i];
            }
        }

        return null;
    }

    eliminar(placa) {
        let temp = null;
        
        for(let i = 0; i < this.vehiculos.length; i++) {
            if(this.vehiculos[i].placa = placa) {
                temp = this.vehiculos[i];
                this.vehiculos.splice(i, 1);
                return temp;
            }
        }

        return null;
    }
}

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});