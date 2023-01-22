<template>
    <div class="container">
        <br>
        <h2 class="text-center text-info">Editar registro de usuario</h2>
        <form class="form-horizontal">
            <div class="form-group col-sm-6 left">
                <label for="name">Nombre de usuario</label>
                <input type="hidden" class="form-control" id="id" name="id" value="0" v-model="usuarios.id">
                <input type="text" class="form-control" id="name" name="name" required
                    placeholder="Nombre de usuario..." v-model="usuarios.name">
            </div>
            <div class="form-group col-sm-6 left">
                <label for="email">E-mail</label>
                <input type="text" class="form-control" id="email" name="email" required
                    placeholder="E-mail..." v-model="usuarios.email">
            </div>
            <div class="form-group col-sm-6 left">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" required
                    placeholder="Password..." v-model="usuarios.password">
            </div>
            
            <br><br>
            <button class="btn btn-primary mx-4" @click="actualizar()">Actualizar</button>
            <button class="btn btn-danger mx-4" @click="eliminar(usuarios.id)">Eliminar</button>
            <button class="btn btn-success mx-4" @click="salir()">Salir</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'EditarUser',
    data() {
        return {
            userid: 0,
            usuarios: {
                id: 0,
                name: '',
                email: '',
                password: ''
            }
        }
        
    },
    mounted() {
        this.cargandoDatos();
    },
    methods: {
        cargandoDatos() {
            this.userid = this.$route.params.id;
            console.log(this.userid)
            axios.get("/api/users/" + this.userid)
                .then( resp => {
                    this.usuarios = resp.data
                    //console.log(this.usuarios)
                })
                .catch( error => {
                    console.log(error)
                })
        },
        actualizar() {
            axios.put("/api/users/" + this.userid, this.usuarios)
                .then( resp => {
                    console.log(resp)
                })
                .catch( error => {
                    console.log(error)
                })
            this.$router.replace("/usuario");
        },
        eliminar(id) {
            axios.delete("/api/users/" + id)
                .then( resp => {
                    console.log(resp)
                })
                .catch( error => {
                    console.log(error)
                })
            this.$router.replace("/usuario");
        },
        salir() {
            this.$router.replace("/usuario");
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