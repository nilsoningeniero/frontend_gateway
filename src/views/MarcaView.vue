<template>
    <div class="container">
        <br>
        <h1 class="text-center text-info">Gestión registros de marcas de vehículos</h1>
        <br><br>
        <button class="btn btn-success mx-2" @click="nuevo">Nueva marca</button>
        <button class="btn btn-block btn-primary mx-2" @click="home">Regresar a modulos</button>
        <br><br>
        <div>
            <table class="table table-hover">
  ...           <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre de la marca</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="marcas in listamarcas" :key="marcas.id" 
                        @click="editar(marcas.id)" data-toggle="tooltip" data-placement="right" title="Click para editar">
                        <th scope="row">{{ marcas.id }}</th>
                        <td>{{ marcas.nom_marca }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MarcaView',
    data() {
        return {
            listamarcas: [],
        }
        
    },
    mounted() {
        this.listarMarcas();
    },
    methods: {
        listarMarcas() {
            axios.get("/api/marcas")
            .then( data => {
                this.listamarcas = data.data
            })
            .catch( error => {
                console.log(error)
            })
        },
        nuevo() {
            this.$router.replace({ name: 'nuevaMarca' });
        },
        editar(id) {
            console.log(id)
            this.$router.replace("/marca/" + id);
        },
        home(){
            this.$router.replace("/dashboard");
        }
    },
    created () {
        this.listarMarcas();
    }
}
</script>

<style scoped>

</style>