<template>
    <div>
        <br>
        <h1 class="text-center text-info">Gestión registros de personas</h1>
        <br><br>
        <button class="btn btn-success mx-2" @click="nuevo">Nueva persona</button>
        <button class="btn btn-block btn-primary mx-2" @click="home">Regresar a modulos</button>
        <br><br>
        <div>
            <table class="table table-hover">
  ...           <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Tipo documento</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Nombres del Persona</th>
                    <th scope="col">Apellidos del Persona</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="Personas in listaPersonas" :key="Personas.id"
                         @click="editar(Personas.id)" data-toggle="tooltip" data-placement="right" title="Click para editar">
                        <th scope="row">{{ Personas.id }}</th>
                        <td>{{ Personas.tipo_documento }}</td>
                        <td>{{ Personas.documento }}</td>
                        <td>{{ Personas.nombres }}</td>
                        <td>{{ Personas.apellidos }}</td>
                        <td>{{ Personas.direccion }}</td>
                        <td>{{ Personas.telefono }}</td>
                        <td>{{ Personas.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'PersonaView',
    data() {
        return {
            listaPersonas: [],
        }
        
    },
    mounted() {
        this.listarPersonas();
    },
    methods: {
        listarPersonas() {
            axios.get("/api/personas")
            .then( data => {
                this.listaPersonas = data.data
            })
            .catch( error => {
                console.log(error)
            })
        },
        nuevo() {
            this.$router.replace({ name: 'nuevoPersona' });
        },
        editar(id) {
            console.log(id)
            this.$router.replace("/persona/" + id);
        },
        home(){
            this.$router.replace("/dashboard");
        }
    },
    created () {
        this.listarPersonas();
    }
}
</script>

<style scoped>

</style>