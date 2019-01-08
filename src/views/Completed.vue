<template>
  <div class="packages-conatiner">
    <img class="refresh" src="../assets/img/sign-check-icon.png" alt width="150" @click="refresh()">

    <div class="container">
      <div class="packages_completed">
        <div class="title">Destinatario</div>
        <div class="title">Remitente</div>
        <div class="title">Origen</div>
        <div class="title">Destino</div>
        <div class="title">Fecha</div>
        <div class="title">Teléfono</div>
        <!-- <div class="title edit">Editar</div> -->
      </div>
      <div class="package"  v-for="pkg in packages" v-bind:key="pkg._id" @click="detail(pkg)" v-if="pkg.status==1">
        <div class="data">{{ pkg.destination.name}}</div>
        <div class="data">{{ pkg.sender.name}}</div>
        <div class="data">{{ pkg.data.origin}}</div>
        <div class="data">{{ pkg.data.destination}}</div>
        <div class="data">{{ pkg.createdAt.toLocaleString()}}</div>
        <div class="data">{{ pkg.sender.phone}}</div>
        <!-- <div class="data edit">
          <button @click="deletePkg(pkg._id)">x</button>
        </div> -->
      </div>
    </div>
    <div class="bg-shadow" v-show="isDetailOpen" @click="isDetailOpen=false"></div>
    <div class="modal grid" v-show="isDetailOpen">
      <div class="status"> {{detailed.status==1?"COMPLETO":"EN ESPERA"}}</div>
      <div class="da">ID: {{detailed._id}}</div>
      <div class="da">Fecha de envío: {{detailed.createdAt.toLocaleString()}}</div>
      <div class="data-group">
        <div class="modal-data">Origen: {{detailed.data.origin}}</div>
        <div class="modal-data">Destino: {{detailed.data.destination}}</div>
        <div class="modal-data">Peso: {{detailed.data.origin}}</div>
        <div class="modal-data">Folio: {{detailed.data.fileNumber}}</div>
        <div class="modal-data">tipo de empaque: {{detailed.data.envelope}}</div>
        <div class="modal-data">Contenido: {{detailed.data.content}}</div>
      </div>
      <div class="data-group">
        <div class="modal-data"></div>
        <div class="modal-data">Nombre: {{detailed.sender.name}}</div>
        <div class="modal-data">Teléfono: {{detailed.sender.phone}}</div>
        <div class="modal-data">Dirección: {{detailed.sender.street}}</div>
        <div class="modal-data">Código Postal: {{detailed.sender.postalCode}}</div>
      </div>

      <div class="data-group">
        <div class="modal-data"></div>
        <div class="modal-data">Nombre: {{detailed.destination.name}}</div>
        <div class="modal-data">Teléfono: {{detailed.destination.phone}}</div>
        <div class="modal-data">Dirección: {{detailed.destination.street}}</div>
        <div class="modal-data">Código Postal: {{detailed.destination.postalCode}}</div>
      </div>
      <button class="btn-caution" @click="confirmDeletion()">Eliminar</button>
    </div>

    <!-- <div v-for="pkg in packages" v-bind:key="pkg._id">
      {{ pkg.createdAt}}con id numero {{pkg._id}}
      <button @click="deletePkg(pkg._id)">delete </button>
    </div>-->
  </div>
</template>
<script>
import pakg from "../services/packageService.js";
import pkgServ from "../services/PkgService.js";

export default {
  data() {
    return {
      packages: [],
      isDetailOpen: false,
      detailed: {
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
        },
        createdAt: new Date(),
      }
    };
  },
  async created() {
    this.refresh();
  },
  methods: {
    async refresh() {
      try {
        let pkgs = await pkgServ.getPacks();
        this.packages = pkgs.reverse();
        console.log("all the packages: ", this.packages);
      } catch (error) {}
    },
    async deletePkg(id) {
      try {
        await pkgServ.deletePack(id);
        this.refresh();
      } catch (error) {
        console.log("error");
      }
    },
    detail(pkg) {
      console.log("selected: ", pkg);
      this.isDetailOpen = true;

      this.detailed = pkg;
      console.log(this.detailed);
    },
    detail(pkg) {
      console.log("selected: ", pkg);
      this.isDetailOpen = true;

      this.detailed = pkg;
      console.log(this.detailed);
    },
    confirmDeletion(){
      let isConfirmed= confirm('Está seguro que desea ELIMINAR el paquete con id num:'+ this.detailed._id);
      if(isConfirmed){
        this.deletePkg(this.detailed._id);
        this.isDetailOpen = false
      }
      
    },
  }
};
</script>
<style scoped>
.packages-conatiner {
  /* height: 100% */
}
.packages_completed {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: space-evenly;
}
.title {
  padding: 0.25em;
  font-weight: bold;
  /* border: 1px solid rgba(0, 0, 0, 0.34); */
  border-left: 1.5px solid rgba(0, 0, 0, 0.34);
  border-right: 1.5px solid rgba(0, 0, 0, 0.34);
  border-collapse: separate;
  width: 100%;
}
.package {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: space-evenly;
}

.data {
  overflow: hidden;
  background-color: rgba(102, 102, 102, 0.224);
  border-bottom: 1px solid rgba(112, 112, 112, 0.707);
  border-top: 1px solid rgba(112, 112, 112, 0.707);
  padding: .5em .5em;
  margin: 0.25em 0;
  text-overflow: ellipsis;
  width: 100%;
  cursor: pointer;
}

.edit {
  color: rgb(228, 99, 99);
  cursor: pointer;
}
.refresh {
  cursor: pointer;
}
/* modal */
.modal {
  background: rgba(255, 255, 255, 0.923);
  border-radius: 7px;
  padding: 2em;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 60%;
  max-height: 75%;
  min-width: 8em;
  min-height: 7em;
  overflow-y: scroll;
  
}
.data-group {
  border: 1px solid #7a7a7a;
  margin: .5em;
  text-align: left;

}
.bg-shadow{
  background-color: rgba(10, 5, 44, 0.557);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.modal-data {
  margin-top: .3em;
  padding-left: 1em;
}
.grid {
  display: grid;
}
.btn-caution {
  background-color: #a74045;
  color: white;
  font-weight: bold;
  border: none;
  font-size: 18px;
  padding: 0.5em;
  margin: 1em;
  min-width: 35%;
  max-width: 40%;
  margin: 0 auto;
  cursor: pointer;
}
</style>

