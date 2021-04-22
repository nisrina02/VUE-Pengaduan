<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <!-- <div class="navbar-brand brand-logo"> -->
                  <!-- <img src="assets/img/logo.svg"> -->
                <!-- </div> -->
                <h1 aling="center">Formulir Registrasi</h1>
                <h6 class="font-weight-light">Registrasi untuk mengelola data pengaduan masyarakat.</h6>
                <form v-on:submit.prevent="register" class="pt-3" method="post" action="#">
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class=" text-primary"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-lg border-left-0" id="nik" v-model="nik" name="nik" placeholder="Masukkan NIK" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class=" text-primary"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-lg border-left-0" id="nama" v-model="nama" name="nama" placeholder="Masukkan Nama Lengkap" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class=" text-primary"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-lg border-left-0" id="username" v-model="username" name="username" placeholder="Masukkan Username" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class=" text-primary"></i>
                      </span>
                    </div>
                    <input type="password" class="form-control form-control-lg border-left-0" name="password" id="password" v-model="password" placeholder="Masukkan Password" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-telephone-outline text-primary"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-lg border-left-0" id="telp" v-model="telp" name="telp" placeholder="Masukkan Nomor Telepon" required>
                  </div>
                </div>
                <div class="my-3">
                  <input type="submit" name="submit" class="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn" value="SIMPAN">
                </div>
                <div class="my-3">
                  <input type="reset" name="reset" class="btn btn-block btn-warning btn-lg font-weight-medium auth-form-btn" value="BATAL">
                </div>
              </form> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>

</template>
<script>

export default {
  name: 'register',
  data(){
    return{
      nik: '',
      nama: '',
      username: '',
      password: '',
      telp: '',
    }
  },
  methods: {
    register: function(){
      let data = {
        nik: this.nik,
        nama: this.nama,
        username: this.username,
        password: this.password,
        telp: this.telp
      };
      this.$store.dispatch("register", data)
      .then(response => {
        console.log(response)
        this.$router.push({
          name: 'login'
        })
      }).catch(error => {
        this.errors = error.response.data.errors
      })
    }
  }
}
</script>