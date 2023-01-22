import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios';

axios.defaults.withCredentials=true;

Vue.use(Vuex);

export default new Vuex.Store({
    
    state:{
        usuario: null,
        auth: false
    },
    mutations: {
        SET_USUARIO(state, user) {
            state.usuario = user;
            state.auth = Boolean(user);
        }
    },
    actions: {
        async login( { dispatch }, credenciales) {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('api/login', credenciales)
                .then(res => {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
                })
                .catch(error => {
                    console.log(error.response.data)
                    Swal.fire('Error', error.response.data.msg, 'error' )
                    return this.$router.replace("/login")
                });
                return dispatch("getUsuario");
        },
        async logout( { dispatch }) {
            await axios.get('api/logout');
            return dispatch("getUsuario");
        },
        getUsuario( {commit} ) {
            axios
                .get("api/user-profile")
                .then(res => {
                    commit('SET_USUARIO', res.data.data.name)
                })
                .catch( () => {
                    commit('SET_USUARIO', null)
                });

        }
    }
    
})