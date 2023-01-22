<template>
    <div class="container">
        <br>
        <h2 class="text-center text-info">Crear registro de usuario</h2>
        <form class="form-horizontal">
            <div class="form-group col-sm-6 left">
                <label for="name">Nombre de usuario</label>
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
            <div class="form-group col-sm-6 left">
                <label for="password">Confirmar Password</label>
                <input type="password" class="form-control" id="conf_password" name="conf_password" required
                    placeholder="Confirmar password..." v-model="conf_password">
                    <div class="form-group" v-if="validacion">
                        <span class="colorTexto">{{ msg }}</span>
                    </div>
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
    name: 'NuevoUser',
    data() {
        return {
            conf_password: '',
            usuarios: {
                id: 0,
                name: '',
                email: '',
                password: ''
            },
            msg:'',
            validacion: false
        }
        
    },
    methods: {
        guardar() {
            if ((this.conf_password !== this.usuarios.password)) {
                this.validacion = true
                this.msg = 'Contraseñas no coinciden...!'
            }else{
                this.validacion = false
                this.msg = ''
                axios.post("/api/users", this.usuarios)
                    .then( resp => {
                        console.log(resp)
                    })
                    .catch( error => {
                        console.log(error)
                    })
                this.$router.replace("/usuario");
            }
            
        },
        salir() {
            this.$router.replace("/usuario");
        }
    }
}
</script>

<style scoped>
    .left {
        text-align: left;
    }
    .colorTexto {
        color: red;
    }
</style>