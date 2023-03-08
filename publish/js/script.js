const menubox = document.querySelectorAll('.gnb_menu li');
// const menubox_list = menubox.map().pop();

console.log(menubox);


const dropmenu = document.querySelector('.header_dropbox');
const header = document.getElementById('header');


console.dir(menubox);

menubox.forEach(el =>
    el.addEventListener("mouseover", () => {
        dropmenu.style.height = "430px";
        header.style.backgroundColor = "white";
    })
)

dropmenu.addEventListener("mouseleave", function() {
    header.style.backgroundColor = "";
    dropmenu.style.height = "0";
})