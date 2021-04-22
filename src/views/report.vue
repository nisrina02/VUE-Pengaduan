<template>
  <div id="poin">
    <div class="content-wrapper">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><h1>Report Data Pengaduan</h1></p>
              <div class="table-responsive">
                <div class="dropdown-divider"></div>
                <b-table striped hover :items="pengaduan" :fields="fields">
                </b-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data : function(){
    return {
      search: "",
      tgl_pengaduan: "",
      isi_laporan: "",
      nama: "",
      status: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      fields: ["tgl_pengaduan", "isi_laporan", "nama", "status"],
    }
  },
  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/pengaduan/report/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.pengaduan;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan seluruh masyarakat."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },
    searching : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      let form = new FormData();
      form.append("find", this.search);
      this.axios.post("/poin_siswa/" + this.perPage + "/" + offset, form, conf)
      .then(response => {
          if(response.data.status == 1){
            this.$bvToast.hide("loadingToast");
            this.data_poin = response.data.poin;
            this.rows = response.data.count;
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Gagal menampilkan data poin pelanggaran semua siswa."
            this.$bvToast.show("message");
            this.$router.push({name: "login"})
          }
      })
      .catch(error => {
          console.log(error);
      });
    },
    Detail: function(item){
        let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
        this.axios.get("/poin_siswa/" + item.id, conf)
        .then(response => {
            this.detail_poin = response.data.detail
        })
    }
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>