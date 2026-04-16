import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(_dirname, "public")));
const PORT = process.env.PORT || 3000;

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
        if(!this.buscar(vehiculo.placa)) {
            this.vehiculos.push(vehiculo);
            return true;
        } else {
            return false;
        }
    };

    listar() {
        return this.vehiculos;
    };

    buscar(placa) {
        for(let i = 0; i < this.vehiculos.length; i++) {
            if(this.vehiculos[i].placa === placa) {
                return this.vehiculos[i];
            }
        }

        return null;
    }

    eliminar(placa) {
        let temp = null;
        
        for(let i = 0; i < this.vehiculos.length; i++) {
            if(this.vehiculos[i].placa === placa) {
                temp = this.vehiculos[i];
                this.vehiculos.splice(i, 1);
                return temp;
            }
        }

        return null;
    }
}

const almacen = new Almacen();

// ENDPOINTS

// Agregar
app.post("/vehiculos/", (req, res) => {
    let status = almacen.agregar(new Vehiculo(req.body.placa, req.body.marca, req.body.modelo));
    
    if(status) {
        res.status(201).json({"res": "vehículo agregado exitosamente"});
    } else {
        res.status(400).json({"res": "placa ya registrada"});
    }
})

// Listar
app.get("/vehiculos", (req, res) => {
    res.json(almacen.listar());
});

// Buscar
app.get("/vehiculos/:placa", (req, res) => {
    let busqueda = almacen.buscar(req.params.placa)
    if(busqueda) {
        res.json(busqueda)
    } else {
        res.status(404).json({"res": "vehículo no encontrado"})
    }
})

// Eliminar
app.delete("/vehiculos/:placa", (req, res) => {
    if(almacen.eliminar(req.params.placa)) {
        res.json({"res": "vehículo eliminado"});
    } else {
        res.status(404).json({"res": "vehículo no encontrado"})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});