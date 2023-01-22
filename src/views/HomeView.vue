<template>

    <div class="container">
      <h1 class="text-center text-info">Pagina principal alquiler de autos</h1>
      <nav class="navbar-nav navbar-center" role="navigation">
        <div class="navbar-header">
          <router-link to="/alquiler">Alquiler de vehículo</router-link> |
          <router-link to="/login">Iniciar sessión</router-link>
        </div>
      </nav>
      <div class="center-img">
        <img src="@/assets/auto.jpg" id="icon" alt="Auto" />
      </div>
      <router-view/>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {

  }
  
}
</script>

<style scoped>

.navbar-nav.navbar-center {
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
    background-color: #e3f2fd;
    margin-top: 5%;
}

.center-img {
  position: absolute;
    left: 50%;
    transform: translatex(-50%);
    margin-top: 15%;
}

.navbar-header {
  font-size: x-large;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>