const popupEvent = document.querySelector('.button_popup');
const popupDim = document.querySelector('.popup_dim');
const popupWrap = document.querySelector('.popup_wrap');
const popupClose = document.querySelector('.popup_close');


popupEvent.addEventListener('click', function(event){
    popupDim.style.display = "block";
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
        popupWrap.style.display = "block";
    },100);
});

popupDim.addEventListener('click', function(event){
    document.body.style.overflowY = "auto";
    popupWrap.style.display = "none";
    setTimeout(() => {
        popupDim.style.display = "none";
    },100);
});

popupClose.addEventListener('click', function(event){
    document.body.style.overflowY = "auto";
    popupWrap.style.display = "none";
    setTimeout(() => {
        popupDim.style.display = "none";
    },100);
});