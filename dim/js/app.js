const popupEvent = document.querySelectorAll('.button_popup');
const popupDim = document.querySelector('.popup_dim');
const popupClose = document.querySelectorAll('.popup_close');

const togglePopup = (el, state) => {
    const popupCall = el.dataset.call
    const popupNm = document.querySelector(`[data-popup=${popupCall}]`)
    if (state === "open") {
        popupDim.style.display = "block";
        document.body.style.overflowY = "hidden";
        popupNm.classList.add('pop_active');
        setTimeout(function() {
            popupNm.style.marginTop = 0;
            popupNm.style.opacity = 1;
        }, 100);
    } else if (state === "close") {
        popupDim.style.display = "none";
        popupNm.style.marginTop = "100px";
        popupNm.style.opacity = 0;
        document.body.style.overflowY = "auto";
        setTimeout(() => {
            popupNm.classList.remove('pop_active');
        },1000);
    }
}

popupEvent.forEach(popup => {
    popup.addEventListener("click", () => {
        togglePopup(popup, "open");
    })

    popupDim.addEventListener('click', () => {
        togglePopup(popup, "close");
    })

    popupClose.forEach (el => {
        el.addEventListener('click', () => {
            togglePopup(popup, "close");
        })
    })
})
