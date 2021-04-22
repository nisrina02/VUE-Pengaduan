<template>
    <div class="container-scroller">
    <!-- partial:partials/_horizontal-navbar.html -->
    <div class="horizontal-menu">
      <nav class="navbar top-navbar col-lg-12 col-12 p-0">
        <div class="nav-top flex-grow-1">
          <div class="container d-flex flex-row h-100 align-items-center">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a class="navbar-brand brand-logo" href="index.html"><strong>Ayo Mengadu!!!</strong></a>
            </div>
            <div class="widget-header icontext">
              <div class="text">
              <div class="nav-link dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                    Hello
                </a>
                <div class="dropdown-menu">
                      <span @click="logout" class="dropdown-item"><i class="mdi mdi-logout text-primary"></i>Logout</span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav class="bottom-navbar">
        <div class="container">
          <ul class="nav page-navigation">
            <li class="nav-item">
              <a class="nav-link" href="/home">
                <i class="mdi mdi-view-dashboard-outline menu-icon"></i>
                <span class="menu-title">Beranda</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/petugas">
                <i class="mdi mdi-account-settings menu-icon"></i>
                <span class="menu-title">Data Petugas</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pengaduan">
                <i class="mdi mdi-file-document-box-outline menu-icon"></i>
                <span class="menu-title">Data Pengaduan</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/masyarakat" class="nav-link">
                <i class="mdi mdi-account-settings menu-icon"></i>
                <span class="menu-title">Data Masyarakat</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/pengaduan_masyarakat" class="nav-link">
                <i class="mdi mdi-puzzle-outline menu-icon"></i>
                <span class="menu-title">Buat Pengaduan</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/report" class="nav-link">
                <i class="mdi mdi-file-document-box-outline menu-icon"></i>
                <span class="menu-title">Report</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods:{
      logout:function(){
          let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
          let form = new FormData();
          this.axios.post('/logout', form, conf).then(response => {
            if (response.data.logged === false || response.data.status === 0) {
                this.$store.commit('logout')
                localStorage.removeItem("Authorization")
                this.$router.push({name: 'login'})
            }
          }).catch(error => {

        });
      },
  },
}
</script>