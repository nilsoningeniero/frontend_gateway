<template>
    <div class="container">
        <br>
        <h2 class="text-center text-info">Crear registro de marca - vehículo</h2>
        <form class="form-horizontal">
            <div class="form-group col-sm-6 left">
                <label for="marca">Nombre de la marca de vehiculo</label>
                <input type="hidden" class="form-control" id="id" name="id" v-model="marcas.id">
                <input type="text" class="form-control" id="marca" name="marca" required
                    placeholder="Nombre de la marca..." v-model="marcas.nom_marca">
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
    name: "NuevaMarca",

    data() {
        return {
            marcas: {
                id: 0,
                nom_marca: ''
            }
        }
    },
    methods: {
        guardar() {
            axios.post("/api/marcas", this.marcas)
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
    }
}
</script>

<style scoped>

</style>