<template>
    <div>
        <br>
        <h1 class="text-center text-info">Gestión registros de vehículos</h1>
        <br><br>
        <button class="btn btn-success mx-2" @click="nuevo">Nuevo vehículo</button>
        <button class="btn btn-block btn-primary" @click="home">Regresar a modulos</button>
        <br><br>
        <div>
            <table class="table table-hover">
  ...           <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Año</th>
                    <th scope="col">Color</th>
                    <th scope="col">Persona</th>
                    <th scope="col">Fec. registro</th>
                    <th scope="col">Dir. ubicacion</th>
                    <th scope="col">Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vehiculos in listavehiculos" :key="vehiculos.id" 
                        @click="editar(vehiculos.id)" data-toggle="tooltip" data-placement="right" title="Click para editar">
                        <th scope="row">{{ vehiculos.id }}</th>
                        <td>{{ vehiculos.placa }}</td>
                        <td>{{ vehiculos.nom_marca }}</td>
                        <td>{{ vehiculos.nom_modelo }}</td>
                        <td>{{ vehiculos.ano }}</td>
                        <td>{{ vehiculos.color }}</td>
                        <td>{{ vehiculos.Persona }}</td>
                        <td>{{ vehiculos.fecha_registro }}</td>
                        <td>{{ vehiculos.dir_ubicacion }}</td>
                        <td>{{ vehiculos.ciudad }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VehiculoView',
    data() {
        return {
            listavehiculos: [],
        }
        
    },
    mounted() {
        this.listarVehiculos();
    },
    methods: {
        listarVehiculos() {
            axios.get("/api/vehiculos")
            .then( data => {
                this.listavehiculos = data.data
            })
            .catch( error => {
                console.log(error)
            })
        },
        nuevo() {
            this.$router.replace({ name: 'nuevoVehiculo' });
        },
        editar(id) {
            console.log(id)
            this.$router.replace("/vehiculo/" + id);
        },
        home(){
            this.$router.replace("/dashboard");
        }
    },
    created () {
        this.listarVehiculos();
    }
}
</script>

<style scoped>

</style>