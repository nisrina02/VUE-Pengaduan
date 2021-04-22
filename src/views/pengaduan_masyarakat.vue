<template>
  <div class="container-fluid page-body-wrapper">
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><h1>Data Pengaduan</h1></p>
              <p class="card-description float-right">
                <b-button variant="success" v-b-modal.modalPengaduan v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Buat Pengaduan</b-button>
              </p>
              <div class="table-responsive">
                <b-table striped hover :items="pengaduan" :fields="fields">
                  <!--<template v-slot:cell(role)="data">
                    <b-badge variant="warning">{{ data.item.role }}</b-badge>
                  </template>-->
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
      id="modalPengaduan"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Tulis Pengaduan Anda
      </template>
        <form ref="form">
          <div class="form-group">
            <label for="tgl_pengaduan" class="form-label"><h4><strong>Tanggal Pengaduan</strong></h4></label>
            <b-form-input type="date" v-model="tgl_pengaduan"></b-form-input>
          </div>
          <div class="form-group">
            <label for="isi_laporan" class="form-label"><h4><strong>Isi Laporan</strong></h4></label>
            <b-form-textarea type="text" v-model="isi_laporan" placeholder="Tulis Laporan"></b-form-textarea>
          </div>
          <div class="form-group">
            <label for="foto" class="form-label"><h4><strong>Foto</strong></h4></label>
            <b-form-input type="text" v-model="foto" placeholder="Sertakan Foto"></b-form-input>
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
      id_user: "",
      tgl_pengaduan: "",
      isi_laporan: "",
      foto: "",
      status: "",
      isi_tanggapan: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      tanggapan:"",
      detail_pengaduan: [],
      fields: ["tgl_pengaduan", "isi_laporan", "foto", "status", "tanggapan.isi_tanggapan"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/masyarakat/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.tanggapan = response.data.data.pengaduan[0].tanggapan;
          this.user = response.data.data.pengaduan[0].user;
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

    Add : function(){
      this.action = "insert";
      this.tgl_pengaduan = "";
      this.id_user = "";
      this.isi_laporan = ""; 
      this.foto = ""; 
      this.status = ""; 
    },

    Edit : function(item){
      this.action = "";
      this.id_pengaduan = item.id_pengaduan;
      this.status = item.status;
    },
    
    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id_pengaduan", this.id_pengaduan);
        form.append("tgl_pengaduan", this.tgl_pengaduan);
        form.append("isi_laporan", this.isi_laporan);
        form.append("foto", this.foto);
        
        this.axios.post("/masyarakat/pengaduan", form, conf)
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
      } else {
        let form = {
          id_pengaduan : this.id_pengaduan,
          status : this.status,

        }
        this.axios.post("/pengaduan/status/" + this.id_pengaduan, form, conf)
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

    Drop : function(id){
      let conf = { headers: { "Authorization" : "Bearer " + this.key} };
      if(confirm('Apakah anda yakin ingin menghapus data ini?')){
        this.$bvToast.show("loadingToast");
        this.axios.delete("/petugas/" + id, conf)
        .then(response => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
  },
  Detail: function(){
    let conf = {headers: {"Authorization" : 'bearer' + this.key} };
    this.axios.get("pengaduan/tanggapan/" + this.id, conf)
    .then(response => {
      this.detail_pengaduan = response.data.data.detail
    })
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>