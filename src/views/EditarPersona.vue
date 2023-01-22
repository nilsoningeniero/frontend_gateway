<template>
    <div class="container">
        <br>
        <h2 class="text-center text-info">Editar registro de persona</h2>
        <form class="form-horizontal">
            <div class="form-group col-sm-6 left">
                <input type="hidden" class="form-control" id="id" name="id" value="0" v-model="Personas.id">
                <label for="marca">Tipo de documento</label><br>
                <select v-model="Personas.tipo_documento" required>
                    <option v-for="option in options" :key="option.value" v-bind:value="option.value">
                        {{ option.text }}
                    </option>
                </select>
                <span>Selected: {{ Personas.tipo_documento }}</span>
            </div>
            <div class="form-group col-sm-6 left">
                <label for="documento">Documento</label>
                <input type="text" class="form-control" id="documento" name="documento" required
                    placeholder="Ingrese # documento..." v-model="Personas.documento">
            </div>
            <div class="form-group col-sm-6 left">
                <label for="nombres">Nombres</label>
                <input type="text" class="form-control" id="nombres" name="nombres" required
                    placeholder="Ingrese los nombres..." v-model="Personas.nombres">
            </div>
            <div class="form-group col-sm-6 left">
                <label for="apellidos">Apellidos</label>
                <input type="text" class="form-control" id="apellidos" name="apellidos" required
                    placeholder="Ingrese los apellidos..." v-model="Personas.apellidos">
            </div>
            <div class="form-group col-sm-6 left">
                <label for="direccion">Dirección</label>
                <input type="text" class="form-control" id="direccion" name="direccion" required
                    placeholder="Ingrese la dirección..." v-model="Personas.direccion">
            </div>
            <div class="form-group col-sm-6 left">
                <label for="telefono">Teléfono</label>
                <input type="text" class="form-control" id="telefono" name="telefono" required
                    placeholder="Ingrese # teléfono..." v-model="Personas.telefono">
            </div>
            <div class="form-group col-sm-6 left">
                <label for="email">E-mail</label>
                <input type="email" class="form-control" id="email" name="email" required
                    placeholder="Ingrese el e-mail..." v-model="Personas.email">
            </div>
            <br><br>
            <button class="btn btn-primary mx-4" @click="actualizar()">Actualizar</button>
            <button class="btn btn-danger mx-4" @click="eliminar(Personas.id)">Eliminar</button>
            <button class="btn btn-success mx-4" @click="salir()">Salir</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
    name: 'EditarPersona',
    data() {
        return {
            propitarioid: 0,
            Personas: {
                id: 0,
                tipo_documento: '',
                documento: '',
                nombres: '',
                apellidos: '',
                direccion: '',
                telefono: '',
                email: ''
            },
            options: [
                { text: 'Cédula de ciudadania', value: 'CC' },
                { text: 'Cédula de extranjeria', value: 'CE' },
                { text: 'Pasaporte', value: 'PP' }
            ]
        }
        
    },
    mounted() {
        this.cargandoDatos();
    },
    methods: {
        cargandoDatos() {
            this.propitarioid = this.$route.params.id;
            axios.get("/api/personas/" + this.propitarioid)
                .then( data => {
                    this.Personas = data.data
                    console.log(this.Personas)
                })
                .catch( error => {
                    console.log(error)
                })
        },
        actualizar() {
            axios.put("/api/personas/" + this.propitarioid, this.Personas)
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
            this.$router.replace("/persona");
        },
        eliminar(id) {
            axios.delete("/api/personas/" + id)
                .then( () => {
                    Swal.fire(
                        'Eliminar registro',
                        'Registro eliminado exitosamente!',
                        'success'
                    )
                })
                .catch( () => {
                    Swal.fire(
                        'Error',
                        'El Registro NO pudo ser eliminado exitosamente!',
                        'error'
                    )
                })
            this.$router.replace("/persona");
        },
        salir() {
            this.$router.replace("/persona");
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