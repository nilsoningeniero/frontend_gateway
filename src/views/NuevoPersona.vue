<template>
    <div class="container">
        <br>
        <h2 class="text-center text-info">Crear registro de persona</h2>
        <form class="form-horizontal">
            <div class="form-group col-sm-6 left">
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
            <button class="btn btn-primary mx-4" @click="guardar()">Guardar</button>
            <button class="btn btn-danger" @click="salir()">Cancelar</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
    name: 'NuevoPersona',
    data() {
        return {
            Personas: {
                id: 0,
                tipo_documento: '',
                documento: '',
                nombres: '',
                apellidos: '',
                direccion: '',
                telefono: '',
                email: '',
            },
            options: [
                { text: 'Cédula de ciudadania', value: 'CC' },
                { text: 'Cédula de extranjeria', value: 'CE' },
                { text: 'Pasaporte', value: 'PP' }
            ]
        }
        
    },
    methods: {
        guardar() {
            axios.post("/api/personas", this.Personas)
                .then( () => {
                    Swal.fire(
                        'Nuevo registro',
                        'Registro guardado exitosamente!',
                        'success'
                    )
                })
                .catch( error => {
                    console.log(error.response.data.msg)
                    Swal.fire('Error', error.response.data.msg, 'error' )
                })
            this.$router.replace("/persona");
        },
        salir() {
            this.$router.replace("/persona");
        }
    }
}
</script>

<style scoped>
    .left {
        text-align: left;
    }
</style>