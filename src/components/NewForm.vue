<template>
  
  <div class="container">
    <form action="submit" v-on:submit.prevent="sendNewPackage(sendPackage)">
    <!-- input for 
    destinatario, remitente, dirección del remitente, dirección del destinatario, fecha
    empaque, contenido, peso, folio, origen, destino 
    -->
    <div class="direction-data">
      <div></div>
      <strong class="title">Datos de Envío</strong>
      
      <!-- <label class="package-date">Fecha de envío<input type="date"  v-model="sendPackage.dateSent"></label> -->
      <div class="data-group">
        <label class="dirdata name">Remitente<input required type="text" id="senderName" name="name" placeholder="Nombre del remitente" v-model="sendPackage.sender.name"></label>
        <label for="senderPhone">Teléfono:<input  type="tel" id="senderPhone" name="phone"
       pattern="[0-9]{10}"
       placeholder="10 dígitos"
       required v-model="sendPackage.sender.phone">
        </label>      
        <label class="dirdata street">Calle<input required id="senderStreet" type="text" placeholder="Calle del remitente" v-model="sendPackage.sender.street"></label>
        <label class="dirdata street-number">Número<input required id="senderStreetNumber" type="number" v-model="sendPackage.sender.streetNumber" placeholder="Número de casa"></label>
        <label class="dirdata area">Colonia<input required id="senderStreetArea" type="text"  placeholder="Colonia" v-model="sendPackage.sender.streetArea"></label>
        <label class="dirdata postal-code">Código Postal<input required id="senderPostalCode" type="text"  placeholder="Código Postal" v-model="sendPackage.sender.postalCode"></label>
      </div>

      <div class="data-group">
        <label class="dirdata name">Destinatario<input required id="destName" type="text"  placeholder="Nombre del destinatario" v-model="sendPackage.destination.name"></label>
        <label for="phone">Teléfono:
          <input type="tel" id="destPhone" name="phone"
       pattern="[0-9]{10}"
       placeholder="10 dígitos"
       required v-model="sendPackage.destination.phone">
        </label>
      <label class="dirdata street">Calle<input required id="destStreet" type="text"  placeholder="Calle del destinatario" v-model="sendPackage.destination.street"></label>
      <label class="dirdata street-number">Número<input required id="destStreetNumber" type="number" v-model="sendPackage.destination.streetNumber" placeholder="Número de casa"></label>
      <label class="dirdata area">Colonia<input required id="destStreetArea" type="text"  placeholder="Colonia" v-model="sendPackage.destination.streetArea" ></label>
      <label class="dirdata postal-code">Código Postal<input required id="destPostalCode" type="text"  placeholder="Código Postal" v-model="sendPackage.destination.postalCode"></label>
    </div>
      
    </div>
    <div class="package-data">
      <strong class = "title">Datos del Paquete</strong>
      <label class="dirdata">Origen<input required type="text"  placeholder="Origen" v-model="sendPackage.data.origin"></label>
      <label class="dirdata">Destino<input required type="text"  placeholder="Destino" v-model="sendPackage.data.destination"></label> 
      <label class="dirdata">Peso (gr)<input required type="number" placeholder="Peso del paquete" v-model="sendPackage.data.weight"></label> 
      <label class="dirdata">Folio<input disabled type="text"  placeholder="El folio es autogenerado" v-model="sendPackage.data.fileNumber"></label> 
      <label class="dirdata" for="envelope-select">Tipo de empaque:
        <select required id="envelope-select"  v-model="sendPackage.data.envelope">
          <optgroup label="Cajas">
            <option>Caja Chica</option>
            <option>Caja Mediana</option>
            <option>Caja Grande</option>
          </optgroup>
          <optgroup label="Sobres">
            <option>Sobre Chico</option>
            <option>Sobre Mediano</option>
            <option>Sobre Grande</option>
          </optgroup>
        </select>
      </label>
      <label class="dirdata">Contenido<input required type="text"  placeholder="Contenido del paquete" v-model="sendPackage.data.content"></label> 
      <div class="spacer"></div>
      <button class="btn-send">Guardar</button>
    </div>

    
  </form>
  <div class="modal" v-if="message">
    <div class="modal-title">
      Su paquete ha sido registrado exitosamente!
    </div>
    <div class="modal-content">
      El paquete de <span class="red">{{sendPackage.sender.name}}</span> ha sido registrado satisfactoriamente con folio <span class="red">#{{nF}}</span> 

    </div>
    <button class="btn-send" @click="showModal()"> OK </button>
  </div>

  </div>
</template>

<script>
import pakg from "../services/PkgService.js";

export default {
  data() {
    return {
      nF: 0,
      sendPackage: {
        sender: {
          name: "",
          street: "",
          streetNumber: "",
          streetArea: "",
          postalCode: "",
          phone: ""
        },
        destination: {
          name: "",
          street: "",
          streetNumber: "",
          streetArea: "",
          postalCode: "",
          phone: ""
        },
        data: {
          origin: "",
          destination: "",
          weight: "",
          fileNumber: "",
          envelope: "",
          content: ""
        }
      },
      message: false,
    };
  },
  methods:{
    sendNewPackage: async function(pkg) {
      
      console.log('pkg',pkg);
      let res = await pakg.createPack(pkg);
      this.nF = res.data.count
      this.showModal()


    },
    showModal: function(){
      this.message = !this.message
    }
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  color: #fff;
}
input {
  margin-left: 1em;
  color: #6b6b6b;
  border-radius: 8px;
  opacity: .6;
}
select {
  color: #6b6b6b;
  border-radius: 8px;
  opacity: .6;
  margin-left: 1em;
}
.direction-data {
  display: flex;
  flex-flow: column;
  background-color: rgba(0, 0, 0, 0.412);
  width: 80%;
  margin: 0 auto;
  border: 1px solid rgb(141, 141, 141);
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
  opacity: .9;
}
.data-group {
  display: grid;
  grid-template-areas:
    "nom st stn"
    "num ar pc";
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 1em;
  width: 100%;
  margin: 1.5em auto;
}
/* grid areas data group*/
.name {
  grid-area: nom;
}
.telephone {
  grid-area: num;
}
.street {
  grid-area: st;
}
.street-number {
  grid-area: stn;
}
.area {
  grid-area: ar;
}
.postal-code {
  grid-area: pc;
}

.dirdata {
  display: flex;
  flex-flow: column nowrap;
}
.package-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  border: 1px solid rgb(141, 141, 141);
  width: 80%;
  padding: 1em;
  border-radius: 10px;
  row-gap: 1em;
  grid-template-areas: "packageT packageT packageT";
  margin-bottom: 1em;
  background-color: rgba(0, 0, 0, 0.412);
  opacity: .9;
}
.title {
  grid-area: packageT;
}
.package-date {
  grid-area: date-send;
  margin-top: 2em;
}
.btn-send {
  background-color: rgb(69, 167, 64);
  color: white;
  font-weight: bold;
  border: none;
  font-size: 18px;
  padding: 0.5em;
  margin: 1em;
}
.btn-send:hover {
  cursor: pointer;
  
}
.red{
  color: rgb(189, 32, 32)
}
/* modal */
.modal{
  background: rgba(255, 255, 255, 0.723);
  border-radius: 7px;
  padding: 2em;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 40%;
  max-height: 45%;
  min-width: 8em;
  min-height: 7em;
}
.modal-title{
  color: rgb(69, 167, 64);
  font-weight: 900;
  padding: 1em;
}
.modal-content{
  color: rgb(0, 0, 0);
  font-weight: 700;
  padding: 1em;
}

</style>
