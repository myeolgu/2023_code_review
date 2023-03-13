const menubox = document.querySelectorAll('.gnb_menu li');
const dropmenu = document.querySelector('.header_dropbox');
const header = document.getElementById('header');

console.dir(menubox);

menubox.forEach(e =>
    e.addEventListener("mouseover", () => {
        // dropmenu.style.display = "block";
        // header.style.backgroundColor = "white";
        dropmenu.classList.add('active');
        setTimeout(() => {

        },100)
    })
)

dropmenu.addEventListener("mouseleave", function() {
    dropmenu.classList.remove('active');
    setTimeout(() => {

    },1000)

})