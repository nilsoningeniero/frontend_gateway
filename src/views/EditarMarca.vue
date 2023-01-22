<template>
    <div class="container">
        <br>
        <h2 class="text-center text-info">Editar registro de marca - vehículo</h2>
        <form class="form-horizontal">
            <div class="form-group col-sm-6 left">
                <label for="marca">Nombre de la marca de vehiculo</label>
                <input type="hidden" class="form-control" id="id" name="id" value="0" v-model="marcas.id">
                <input type="text" class="form-control" id="marca" name="marca" required
                    placeholder="Nombre de la marca..." v-model="marcas.nom_marca">
            </div>
            <br><br>
            <button class="btn btn-primary mx-4" @click="actualizar()">Actualizar</button>
            <button class="btn btn-danger mx-4" @click="eliminar(marcas.id)">Eliminar</button>
            <button class="btn btn-success mx-4" @click="salir()">Salir</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'EditarMarca',
    data() {
        return {
            marcaid: 0,
            marcas: {
                id: 0,
                nom_marca: ''
            }
        }
        
    },
    mounted() {
        this.cargandoDatos();
    },
    methods: {
        cargandoDatos() {
            this.marcaid = this.$route.params.id;
            axios.get("/api/marcas/" + this.marcaid)
                .then( data => {
                    this.marcas = data.data
                    console.log(this.marcas)
                })
                .catch( error => {
                    console.log(error)
                })
        },
        actualizar() {
            axios.put("/api/marcas/" + this.marcaid, this.marcas)
                .then( resp => {
                    console.log(resp)
                })
                .catch( error => {
                    console.log(error)
                })
            this.$router.replace("/marca");
        },
        eliminar(id) {
            axios.delete("/api/marcas/" + id)
                .then( resp => {
                    console.log(resp)
                })
                .catch( error => {
                    console.log(error)
                })
            this.$router.replace("/marca");
        },
        salir() {
            this.$router.replace("/marca");
        }
    },
    created () {
        this.cargandoDatos();
    }
}
</script>

<style scoped>
    .left {
        text-align: left;
    }
</style>