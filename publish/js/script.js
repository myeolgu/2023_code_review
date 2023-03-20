const menubox = document.querySelectorAll('.gnb_menu li');
const dropmenu = document.querySelector('.header_dropbox');
const header = document.getElementById('header');

menubox.forEach(e =>
    e.addEventListener("mouseover", () => {
        dropmenu.style.display = "block";
        setTimeout(() => {
            header.classList.add('active');
        },100)
    })
)

dropmenu.addEventListener("mouseleave", function() {
    header.classList.remove('active');
    setTimeout(() => {
        dropmenu.style.display = "none";
    },500)
})