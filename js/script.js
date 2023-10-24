// Kelas aktif jadi ada
const navbarNav = document.querySelector('.navbar-nav');

//kectika dokumen di klik
document.querySelector('#hamburger-menu').onclick = () =>{
    navbarNav.classList.toggle('active');
};

//pas diklik di luar dia hilang
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click' , function(e){
    if(!hamburger.contains(e.target)&& !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});