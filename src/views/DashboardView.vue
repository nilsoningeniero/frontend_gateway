<template>
  <div class="container">
    <br>
    <h1 class="text-center text-info">Gestión de módulos</h1>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav text-white">
            <li class="nav-item">
              <router-link to="/usuario" class="nav-link">Usuarios</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/marca" class="nav-link">Marcas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/modelo" class="nav-link">Modelos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/persona" class="nav-link">Personas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/vehiculo" class="nav-link">vehiculos</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Busquedas
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><router-link to="/busqueda" class="dropdown-item">Personas-vehículos</router-link></li>
                <li><router-link to="/busqueda" class="dropdown-item">Vehículos-personas</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="margin-left">
          <template v-if="$store.state.auth">
              <span>Usuario en sessión: {{ $store.state.usuario }}</span> | <button @click="logout()">Logout</button>
          </template>
        </div>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'DashboardView',
  components: {
     
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      return this.$router.replace("/login");
    }
  }
  
}
</script>

<style scoped>

.margin-left {
  margin-left: 15%;
}

</style>
