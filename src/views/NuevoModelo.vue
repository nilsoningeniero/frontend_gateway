<template>
    <div class="container">
        <br>
        <h2 class="text-center text-info">Crear registro de modelo - vehículo</h2>
        <form class="form-horizontal">
            <div class="form-group col-sm-6 left">
                <label for="marca">Marca del vehiculo</label><br>
                <select v-model="modelos.marca_id" id="marca_id" name="marca_id" required>
                    <option v-for="option in options" :key="option.id" v-bind:value="option.id">
                        {{ option.nom_marca }}
                    </option>
                </select>
                <span>Selected: {{ modelos.marca_id }}</span>
            </div>
            <div class="form-group col-sm-6 left">
                <label for="nom_modelo">Nombre del modelo del vehiculo</label>
                <input type="text" class="form-control" id="nom_modelo" name="nom_modelo" required
                    placeholder="Ingrese nombre del modelo..." v-model="modelos.nom_modelo">
            </div>
            <br><br>
            <button class="btn btn-primary mx-4" @click="guardar()">Guardar</button>
            <button class="btn btn-danger" @click="salir()">Cancelar</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'NuevoModelo',
    data() {
        return {
            modeloid: 0,
            modelos: {
                id: 0,
                marca_id: 0,
                nom_modelo: ''
            },
            options: [{}]
        }
        
    },
    methods: {
        guardar() {
            axios.post("/api/modelos", this.modelos)
                .then( resp => {
                    console.log(resp)
                })
                .catch( error => {
                    console.log(error)
                })
            this.$router.replace("/modelo");
        },
        salir() {
            this.$router.replace("/modelo");
        },
        cargarMarcas() {
            axios.get("/api/marcas")
                .then( data => {
                    this.options = data.data
                    console.log(this.options)
                })
                .catch( error => {
                    console.log(error)
                })
        },
    },
    created () {
        this.cargarMarcas();
    }
}
</script>

<style scoped>
    .left {
        text-align: left;
    }
</style>