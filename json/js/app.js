// const popupEvent = document.querySelectorAll('.button_popup');
// const popupDim = document.querySelector('.popup_dim');
// const popupClose = document.querySelectorAll('.popup_close');

// const togglePopup = (el, state) => {
//     const popupCall = el.dataset.call
//     const popupNm = document.querySelector(`[data-popup=${popupCall}]`)
//     if (state === "open") {
//         popupDim.style.display = "block";
//         document.body.style.overflowY = "hidden";
//         popupNm.classList.add('pop_active');
//         setTimeout(function() {
//             popupNm.style.marginTop = 0;
//             popupNm.style.opacity = 1;
//         }, 100);
//     } else if (state === "close") {
//         popupDim.style.display = "none";
//         popupNm.style.marginTop = "100px";
//         popupNm.style.opacity = 0;
//         document.body.style.overflowY = "auto";
//         setTimeout(() => {
//             popupNm.classList.remove('pop_active');
//         },1000);
//     }
// }

// popupEvent.forEach(popup => {
//     popup.addEventListener("click", () => {
//         togglePopup(popup, "open");
//     })

//     popupDim.addEventListener('click', () => {
//         togglePopup(popup, "close");
//     })

//     popupClose.forEach (el => {
//         el.addEventListener('click', () => {
//             togglePopup(popup, "close");
//         })
//     })
// })





const story = {
    init() {
        this.jsonResponse()
    },
    // json 패치
    jsonResponse() {
        fetch('./js/dim.json')
            .then(response => response.json())
            .then(json => {
                for (i of json) {
                    this.tempAll(i)
                }
                this.board.init()
                this.selectUser.init()
            })
    },

     /**
     * 전체적인 html 템플릿 생성
     * @param {*} data 데이터 셋
     */
     tempAll(data) {
        this.board.tempHtml(data)
        this.selectUser.tempHtml(data)
    },

    /******** 유저 선택 카드 ********/
    selectUser: {
        tempForm:
        `<li>
        <div class="popup_box_inner">
            <h3>"성장하는 회사와 같이 성장하고 있습니다"</h3>
            <dt>LG Chem에 합류하게 된 계기는 무엇인가요?</dt>
            <dl>리테일 강자로서 이마트몰, 신세계몰, 하우디 등 다양한 상품을 고객에게 제공하고 있기 때문에 방대한 양의 데이터를 보유하고 있다는 것이 가장 큰 매력 포인트였어요. 또한 신세계 그룹의 복지가 누릴 수 있는 것도 장점으로 느껴졌습니다.</dl>
        </div>
        </li>`
        ,
        userWrap: document.querySelector('.popup_header_inner'),
        newId : {},

        init() {
            story.insertHtml(this.userWrap, this.tempForm)
        },
    }
}