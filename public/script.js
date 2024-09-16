function viewDetails(name) {
  console.log(name);
}
function popmodal(name) {
  console.log(name);
  let item = document.getElementById("applymodal");
  item.style.display = "block";
}
function closemodal() {
  let item = document.getElementById("applymodal");
  item.style.display = "none";
}
