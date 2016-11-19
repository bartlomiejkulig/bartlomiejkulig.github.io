var button = document.getElementById("hamburger");
var header = document.getElementById("page-header");
button.addEventListener("click", function() {
  header.classList.toggle("hamburger-opened");
},false);
