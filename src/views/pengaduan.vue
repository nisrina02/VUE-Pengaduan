<template>
  <div class="container-fluid page-body-wrapper">
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><h1>Data Pengaduan</h1></p>
              <div class="table-responsive">
                <b-table striped hover :items="pengaduan" :fields="fields">
                  <!--<template v-slot:cell(role)="data">
                    <b-badge variant="warning">{{ data.item.role }}</b-badge>
                  </template>-->
                  <template v-slot:cell(Aksi)="data">
                    <b-button size="sm" variant="warning" v-on:click="AddTanggapan" v-b-modal.modalTanggapan><i class="mdi mdi-file-document-box-outline btn-icon-prepend"></i> Tanggapan</b-button>&nbsp;
                    <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalStatus><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
                  </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination">
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal 
      id="modalStatus"
      @ok="SaveEdit"
    >
      <template v-slot:modal-title>
        Update Status Pengaduan
      </template>
        <form ref="form">
          <div class="form-group">
          <label for="id_pengaduan" class="form-label"><h4><strong>id_pengaduan</strong></h4></label>
            <b-form-input  v-model="id_pengaduan" name="id_pengaduan" placeholder="Ubah id_pengaduan"></b-form-input>
            <label for="status" class="form-label"><h4><strong>Status</strong></h4></label>
            <b-form-input type="text" v-model="status" name="status" placeholder="Ubah Status"></b-form-input>
          </div>
        </form>
    </b-modal>

    <b-modal 
      id="modalTanggapan"
      @ok="SaveTanggapan"
    >
      <template v-slot:modal-title>
        Tulis Tanggapan
      </template>
        <form ref="form">
          <div class="form-group">
            <label for="id_pengaduan" class="form-label"><h4><strong>ID Pengaduan</strong></h4></label>
            <b-form-input v-model="id_pengaduan"></b-form-input>
          </div>
          <div class="form-group">
            <label for="tgl_tanggapan" class="form-label"><h4><strong>Tanggal Tanggapan</strong></h4></label>
            <b-form-input type="date" v-model="tgl_tanggapan"></b-form-input>
          </div>
          <div class="form-group">
            <label for="isi_tanggapan" class="form-label"><h4><strong>Tanggapan</strong></h4></label>
            <b-form-textarea type="text" v-model="isi_tanggapan" placeholder="Tulis Laporan"></b-form-textarea>
          </div>
        </form>
    </b-modal>

  </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id_pengaduan: "",
      id_tanggapan : "",
      tgl_tanggapan: "",
      isi_tanggapan: "",
      id_petugas: "",
      isi_laporan:"",
      foto: "",
      tgl_pengaduan: "",
      status:"",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      tanggapan: "",
      fields: ["tgl_pengaduan", "isi_laporan", "foto", "status", "Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.tanggapan = response.data.data.tanggapan;
          this.user = response.data.data.user;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        } 
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },


    Edit : function(item){
      this.action = "update";
      this.id_pengaduan = item.id_pengaduan;
      this.status = item.status;
    },

    AddTanggapan: function(){
      this.action = "insert";
      this.id_pengaduan = "";
      this.isi_tanggapan = "";
    },
    
    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id_pengaduan", this.id_pengaduan);
        form.append("tgl_tanggapan", this.tgl_tanggapan);
        form.append("isi_tanggapan", this.isi_tanggapan);
        
        this.axios.post("/pengaduan/tanggapan/", + this.id_pengaduan, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    },

    SaveTanggapan : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id_pengaduan", this.id_pengaduan);
        form.append("isi_tanggapan", this.isi_tanggapan);
        
        this.axios.post("/pengaduan/tanggapan/" + this.id_pengaduan, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },

        SaveEdit : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "update"){
        let form = new FormData();
        form.append("id_pengaduan", this.id_pengaduan);
        form.append("status", this.status);
        
        this.axios.post("/pengaduan/status/" + this.id_pengaduan, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          this.message = response.data.message;
          this.$bvToast.show("message");
          this.getData();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>