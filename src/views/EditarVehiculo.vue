<template>
    <div class="container">
        <br>
        <h2 class="text-center text-info">Editar registro de vehículo</h2>
        <form class="form-horizontal">
            <div class="row">
                <div class="form-group col-sm-6 left">
                    <input type="hidden" class="form-control" id="id" name="id" value="0" v-model="vehiculos.id">
                    <label for="placa">Documento</label>
                    <input type="text" class="form-control" id="placa" name="placa" required
                        placeholder="Ingrese # placa..." v-model="vehiculos.placa">
                </div>
                <div class="form-group col-sm-6 left">
                    <label for="marca">Marca</label><br>
                    <select v-model="vehiculos.marca_id" id="marca_id" name="marca_id" required
                        @change="cargarModeloSiMarca(vehiculos.marca_id)">
                        <option v-for="option in optionsMarcas" :key="option.id" v-bind:value="option.id">
                            {{ option.nom_marca }}
                        </option>
                    </select>
                    <span>Selected: {{ vehiculos.marca_id }}</span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6 left">
                    <label for="modelo">Modelo</label><br>
                    <select v-model="vehiculos.modelo_id" id="modelo_id" name="modelo_id" required>
                        <option v-for="option in optionsModelos" :key="option.id" v-bind:value="option.id">
                            {{ option.nom_modelo }}
                        </option>
                    </select>
                    <span>Selected: {{ vehiculos.modelo_id }}</span>
                </div>
                <div class="form-group col-sm-6 left">
                    <label for="ano">Año</label>
                    <input type="text" class="form-control" id="ano" name="ano" required
                        placeholder="Ingrese el año..." v-model="vehiculos.ano">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6 left">
                    <label for="color">Color</label>
                    <input type="text" class="form-control" id="color" name="color" required
                        placeholder="Ingrese el color..." v-model="vehiculos.color">
                </div>
                <!-- <div class="form-group col-sm-6 left">
                    <label for="persona">Persona</label><br>
                    <select v-model="vehiculos.persona_id" id="persona_id" name="persona_id" required>
                        <option v-for="option in optionsPersonas" :key="option.id" v-bind:value="option.id">
                            {{ option.nombres }} {{ option.apellidos }}
                        </option>
                    </select>
                    <span>Selected: {{ vehiculos.persona_id }}</span>
                </div> -->
            </div>
            <div class="row">
                <div class="form-group col-sm-6 left">
                    <label for="observaciones">Observaciones</label>
                    <textarea class="form-control" v-model="vehiculos.observaciones" id="observaciones" 
                        name="observaciones" required rows="3"></textarea>
                </div>
                <div class="form-group col-sm-6 left">
                    <label for="fecha_registro">Fecha registro</label>
                    <input type="date" class="form-control" id="fecha_registro" name="fecha_registro" 
                        required v-model="vehiculos.fecha_registro">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6 left">
                    <label for="dir_ubicacion">Dirección ubicación</label>
                    <input type="text" class="form-control" id="dir_ubicacion" name="dir_ubicacion" required
                        v-model="vehiculos.dir_ubicacion">
                </div>
                <div class="form-group col-sm-6 left">
                    <label for="ciudad">Ciudad</label>
                    <select class="form-control" id="ciudad" name="ciudad" required v-model="vehiculos.ciudad">
                        <option v-for="obj_ciudad in ciudades" :value="obj_ciudad.nombre" :key="obj_ciudad.nombre">{{ obj_ciudad.nombre }}</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6 left">
                    <label for="coordenadas_lon">Coordenadas ( Longitud )</label>
                    <input type="text" class="form-control" id="coordenadas_lon" name="coordenadas_lon" required
                        placeholder="Ingrese las coordenas ubicacion vehic. Long..." v-model="vehiculos.coordenadas_lon">
                </div>
                <div class="form-group col-sm-6 left">
                    <label for="coordenadas_lat">Coordenadas ( Latitud )</label>
                    <input type="text" class="form-control" id="coordenadas_lat" name="coordenadas_lat" required
                        placeholder="Ingrese las coordenas ubicacion vehic. Lati.." v-model="vehiculos.coordenadas_lat">
                </div>
            </div>

            <br><br>
            <button class="btn btn-primary mx-4" @click="actualizar()">Actualizar</button>
            <button class="btn btn-danger mx-4" @click="eliminar(vehiculos.id)">Eliminar</button>
            <button class="btn btn-success mx-4" @click="salir()">Salir</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
    name: 'EditarVehiculo',
    data() {
        return {
            vehiculoid: 0,
            vehiculos: {
                id: 0,
                placa: '',
                nom_marca: '',
                nom_modelo: '',
                ano: '',
                color: '',
                persona_id: '',
                observaciones: '',
                fecha_registro: '',
                dir_ubicacion: '',
                ciudad: '',
                coordenadas_lon: '',
                coordenadas_lat: ''
            },
            optionsMarcas: [
                {  }
            ],
            optionsModelos: [
                {  }
            ],
            optionsPersonas: [
                {  }
            ],
            modelos: [{}],
            marca_id: 0,
            ciudades: [
                {
                    nombre: 'Ayapel,CORDOBA'
                },
                {
                    nombre: 'Buenavista,CORDOBA'
                },
                {
                    nombre: 'Canalete,CORDOBA'
                },
                {
                    nombre: 'Cereté,CORDOBA'
                },
                {
                    nombre: 'Chimá,CORDOBA'
                },
                {
                    nombre: 'Chinú,CORDOBA'
                },
                {
                    nombre: 'Ciénaga De Oro,CORDOBA'
                },
                {
                    nombre: 'Cotorra,CORDOBA'
                },
                {
                    nombre: 'La Apartada,CORDOBA'
                },
                {
                    nombre: 'Lorica,CORDOBA'
                },
                {
                    nombre: 'Los Córdobas,CORDOBA'
                },
                {
                    nombre: 'Momil,CORDOBA'
                },
                {
                    nombre: 'Montelíbano,CORDOBA'
                },
                {
                    nombre: 'Montería,CORDOBA'
                },
                {
                    nombre: 'Moñitos,CORDOBA'
                },
                {
                    nombre: 'Planeta Rica,CORDOBA'
                },
                {
                    nombre: 'Pueblo Nuevo,CORDOBA'
                },
                {
                    nombre: 'Puerto Escondido,CORDOBA'
                },
                {
                    nombre: 'Puerto Libertador,CORDOBA'
                },
                {
                    nombre: 'Purísima,CORDOBA'
                },
                {
                    nombre: 'Sahagún,CORDOBA'
                },
                {
                    nombre: 'San Andrés Sotavento,CORDOBA'
                },
                {
                    nombre: 'San Antero,CORDOBA'
                },
                {
                    nombre: 'San Bernardo Del Viento,CORDOBA'
                },
                {
                    nombre: 'San Carlos,CORDOBA'
                },
                {
                    nombre: 'San Pelayo,CORDOBA'
                },
                {
                    nombre: 'Tierralta,CORDOBA'
                },
                {
                    nombre: 'Valencia,CORDOBA'
                }
            ]
        }
        
    },
    mounted() {
        this.cargandoDatos();
    },
    methods: {
        cargandoDatos() {
            this.vehiculoid = this.$route.params.id;
            axios.get("/api/vehiculos/" + this.vehiculoid)
                .then( data => {
                    this.vehiculos = data.data
                    console.log(this.vehiculos)
                })
                .catch( error => {
                    console.log(error)
                })
        },
        actualizar() {
            axios.put("/api/vehiculos/" + this.vehiculoid, this.vehiculos)
                .then( () => {
                    Swal.fire(
                        'Actualizar registro',
                        'Registro actualizado exitosamente!',
                        'success'
                    )
                })
                .catch( error => {
                    console.log(error)
                })
            this.$router.replace("/vehiculo");
        },
        eliminar(id) {
            axios.delete("/api/vehiculos/" + id)
                .then( resp => {
                    console.log(resp)
                })
                .catch( error => {
                    console.log(error)
                })
            this.$router.replace("/vehiculo");
        },
        salir() {
            this.$router.replace("/vehiculo");
        },
        cargarMarcas() {
            axios.get("/api/marcas")
                .then( data => {
                    this.optionsMarcas = data.data
                    console.log(this.optionsMarcas)
                })
                .catch( error => {
                    console.log(error)
                })
        },
        cargarModelos() {
            axios.get("/api/modelos")
                .then( data => {
                    this.optionsModelos = data.data
                    console.log(this.optionsModelos)
                })
                .catch( error => {
                    console.log(error)
                })
        },
        cargarModeloSiMarca(id) {
            axios.get("/api/modelos")
                .then( data => {
                    this.modelos = data.data
                    this.optionsModelos = this.modelos.filter((modelo) => modelo.marca_id == id);
                    console.log(this.optionsModelos)
                })
                .catch( error => {
                    console.log(error)
                })
        },
        // cargarPersonas() {
        //     axios.get("/api/personas")
        //         .then( data => {
        //             this.optionsPersonas = data.data
        //             console.log(this.optionsPersonas)
        //         })
        //         .catch( error => {
        //             console.log(error)
        //         })
        // },
    },
    created () {
        this.cargandoDatos();
        this.cargarMarcas();
        this.cargarModelos();
        // this.cargarPersonas();
    }
}
</script>

<style scoped>
    .left {
        text-align: left;
    }
</style>