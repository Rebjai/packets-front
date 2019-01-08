<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Nuevo Paquete</router-link> |
      <router-link to="/completed">Completas</router-link> |
      <router-link to ="/in_progress">En espera</router-link> |
      <router-link to ="/all">Todos los paquetes</router-link>
      
    </div>
    <router-view/>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  
}
html{
/* background: linear-gradient(135deg, rgba(117,158,115,1) 0%,rgba(169,239,153,1) 24%,rgba(109,147,107,1) 51%,rgba(169,239,153,1) 76%,rgba(117,158,115,1) 100%);  */
 /* background: -webkit-linear-gradient(360deg,#00537E 10%,#3AA17E 360%); background: linear-gradient(360deg,#00537E 10%,#3AA17E 360%);  */
 background: linear-gradient(to bottom, rgba(174,198,207,1) 0%,rgba(119,221,119,1) 100%);
 background-repeat: no-repeat;
}
body{
 /* height: 100%; */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow-y: scroll;
  
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
