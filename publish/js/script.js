const menubox = document.querySelectorAll('.gnb_menu li [data-id]');
const dropmenu = document.querySelector('.header_dropbox');
const header = document.getElementById('header');

menubox.forEach(e =>
    e.addEventListener("mouseover", () => {
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