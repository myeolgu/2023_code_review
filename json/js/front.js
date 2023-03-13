const story = {
    init() {
        this.jsonResponse()
        this.bannerSwiper()
    },
    // json 패치
    jsonResponse() {
        fetch('./js/board.json')
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
        tempForm: `<li class="swiper-slide js_active js_card_total">
            <a href="#" class="card_item" data-userid="id0">
                <div class="user_img"><img src="./images/total.png" alt="" ></div>
                <p class="user_name">전체</p>
            </a>
        </li>`,
        userWrap: document.querySelector('.user_select_wrap .swiper-wrapper'),
        newId : {},

        init() {
            story.insertHtml(this.userWrap, this.tempForm)
            this.generateSwiper('.card_swiper')
            this.clickCardIcon()
        },
        /**
         * 스와이퍼 옵션 설정 및 생성
         * @param {String[] | String} all 스와이퍼 할 요소
         */
        generateSwiper(all) {
            const swiperAll = document.querySelectorAll(all)

            swiperAll.forEach(swiper => {
                const card_swiper = new Swiper(swiper, {
                    slidesPerView: 3.5,
                    spaceBetween: 5,
                    slidesOffsetAfter : 20,
                    slidesOffsetBefore : 20,
                    freeMode: true,
                    slideToClickedSlide :true,
                });
            })
        },
        /**
         * html 템플릿에 데이터 넣는 기능
         * @param {Object} data json 데이터 셋
         */
        tempHtml(data) {
            // 유저 아이디 같으면 유저 선택 카드 생성X
            if(!this.newId[data.id]){
                this.newId[data.id] = 1

                this.tempForm += `
                <li class="swiper-slide">
			    	<a href="#" class="card_item" data-userid="id${data.id}">
                        <div class="user_img"><img src=${data.profile} alt="" ></div>
			    	    <p class="user_name">${data.userNm}</p>
                    </a>
			    </li>
                `
            }
        },
        /**
         * 카드 클릭 이벤트
         */
        clickCardIcon(){
            const cardIcon = document.querySelectorAll('.card_swiper .swiper-slide')

            cardIcon.forEach(el=>{
                el.addEventListener("click",()=>{
                    this.filterCard(el)
                    this.filterBoard()
                })
            })
        },
        /**
         * 유저 카드 클릭했을 때의 이벤트.
         * 전체아이콘 클릭하면 나머지 모두 비활성화.
         * 각각의 아이콘 클릭하면 전체아이콘 비활성화되고 토글.
         * 모든 아이콘이 비활성화이면 전체아이콘 활성화.
         * @param {String} el 각각의 카드
         */
        filterCard(el){
            const cardIconTotal = document.querySelector('.card_swiper .swiper-slide.js_card_total')

            if(el === cardIconTotal){
                const cardActive = document.querySelectorAll('.card_swiper .swiper-slide.js_active')
                story.removeClass(cardActive, "js_active")
                story.addClass(el, "js_active")
            }else{
                if(story.containsClass(cardIconTotal, 'js_active')){
                    story.removeClass(cardIconTotal, "js_active")
                }

                el.classList.toggle('js_active')

                const cardActive = document.querySelectorAll('.card_swiper .swiper-slide.js_active')
                if(!cardActive.length){
                    story.addClass(cardIconTotal, "js_active")
                }
            }
        },
        /**
         * 스토리보드 필터
         */
        filterBoard(){
            const boardAll = document.querySelectorAll('.board_item')

            // active, disable인 카드 가져오기
            const activeCard = document.querySelectorAll('.card_swiper .swiper-slide.js_active .card_item')
            const disableCard = document.querySelectorAll('.card_swiper .swiper-slide:not(.js_active) .card_item')

            // 각각의 카드 id 추출
            const disableId = [...disableCard].map(el=> el.dataset.userid)
            const activeId = [...activeCard].map(el=> el.dataset.userid)

            // disable id를 가진 board disable 추가
            disableId.forEach(id=>{
                const matchBoard = document.querySelectorAll(`.board_item[data-userid=${id}]`)
                story.addClass(matchBoard, 'disable')
            })

            // active id를 가진 board disable 제거
            activeId.forEach(id=>{
                // 전체아이콘이면 모두 disable제거
                if(id === "id0"){
                    story.removeClass(boardAll, 'disable')
                }else{
                    const matchBoard = document.querySelectorAll(`.board_item[data-userid=${id}]`)
                    story.removeClass(matchBoard, 'disable')
                }
            })
        }
    },

    /******** 스토리 리스트 ********/
    board: {
        tempForm: "",
        boardWrap: document.querySelector('.board_wrap'),

        init() {
            story.insertHtml(this.boardWrap, this.tempForm)
            this.generateSwiper('.board_swiper')

            // 각각의 board마다 적용
            const boardAll = document.querySelectorAll('.board_item')
            boardAll.forEach(el=>{
                this.clickSubIcon(el)
                this.clickEditIcon(el)
                this.makeMoreBtn(el)
                this.clickMoreBtn(el)
            })
        },
        /**
         * 스와이퍼 옵션 설정 및 생성
         * @param {String[] | String} all 스와이퍼 할 요소
         */
        generateSwiper(all) {
            const swiperAll = document.querySelectorAll(all)

            swiperAll.forEach(swiper => {
                const board_swiper = new Swiper(swiper, {
                    slidesPerView: "auto",
                    pagination: {
                        el: `.swiper-pagination`,
                    },
                });
            })
        },
        /**
         * html 템플릿에 데이터 넣는 기능
         * @param {Object} data json 데이터 셋
         */
        tempHtml(data) {
            this.tempForm += `
            <div class="board_item" data-userid="id${data.id}">
				<div class="board_cont inner">
                    <div class="writer_row">
						<div class="profile"><img src=${data.profile} alt=""></div>
						<span class="nickname">${data.userNm}</span>
                        <div class="editor">
                            <button type="button"><span class="hide_txt">편집버튼</span></button>
                            <ul class="edit_icon">
						    	<li class="edit_list modify"><a href="#">수정하기</a></li>
						    	<li class="edit_list delete"><a href="#">삭제하기</a></li>
						    </ul>
                        </div>
					</div>
					<div class="img_area_row">
						<div class="swiper board_swiper">
							<div class="swiper-wrapper">
								${this.tempSwiper(data.image)}
							</div>
							<div class="swiper-pagination"></div>
						</div>
					</div>
					<div class="text_area_row">
						<p class="txt">${data.text}</p>
                        <div class="tag_wrap">
                            ${!!this.tempTag(data.tag)? this.tempTag(data.tag) : ""}
                            <button type="button" class="btn_more_tag">더보기</button>
                        </div>
					</div>
					<div class="icon_area_row">
						<button type="button" class="icon_heart">999</button>
						<button type="button" class="icon_comment">999</button>
						<button type="button" class="icon_sub">구독하기</button>
					</div>
				</div>
            </div>
            `
        },
        /**
         * 스와이퍼의 슬라이드 템플릿
         * @param {Object} data json 데이터 셋
         * @returns 모든 슬라이드 문자열로 반환
         */
        tempSwiper(data) {
            let slide = ""

            for (i of data) {
                slide += `<div class="swiper-slide"><img src=${i} alt=""></div>`
            }

            return slide
        },
        /**
         * 태그 템플릿
         * @param {Object} data json 데이터 셋
         * @returns 모든 태그 문자열로 반환
         */
        tempTag(data) {
            if(data.length){
                let tag = ""

                for (i of data) {
                    tag += `<a href="#" class="tag_list">${i}</a>`
                }

                return `<p class="tag_box">${tag}</p>`
            }
        },
        /**
         * 구독버튼 클릭 이벤트
         * @param {String} target 해당되는 board
         */
        clickSubIcon(target){
            const subIcon = target.querySelector('.icon_sub')

            subIcon.addEventListener("click",()=>{
                subIcon.classList.toggle('js_active')
                subIcon.textContent = story.containsClass(subIcon, 'js_active') ? "구독중" : "구독하기"
            })
        },
        /**
         * 글 편집 아이콘 이벤트
         * @param {String} target 해당되는 board
         */
        clickEditIcon(target){
            const editIcon = target.querySelector('.editor')

            editIcon.addEventListener("click",(e)=>{
                editIcon.classList.toggle('js_active')
                e.stopPropagation()
            })

            document.addEventListener("click",()=>{
                story.removeClass(editIcon, 'js_active')
            })
        },
        /**
         * 태그 더보기 태그 생성
         * @param {String} target 해당되는 board
         */
        makeMoreBtn(target){
            const textArea = target.querySelector('.tag_box')
            const tagAll = target.querySelectorAll('.tag_list')

            if(!textArea) return

            // 태그의 width 계산
            const textAreaWidth = textArea.offsetWidth
            const tagAllWidth = [...tagAll].map(el=> el.offsetWidth).reduce((a,b)=> a+b,0)

            if(textAreaWidth > tagAllWidth){
                const moreBtn = target.querySelector('.btn_more_tag')
                story.addClass(moreBtn, 'disable')
            }
        },
        /**
         * 태그 더보기 클릭 이벤트
         * @param {String} target 해당되는 board
         */
        clickMoreBtn(target){
            const moreBtn = target.querySelector('.btn_more_tag')

            if(!moreBtn) return
            moreBtn.addEventListener('click',()=>{
                const tagWrap = target.querySelector('.text_area_row')
                story.addClass(tagWrap, 'js_active')
            })
        }
    },

    /**
     * 상단 프로모션 스와이퍼
     */
    bannerSwiper() {
        const adBannerSwiper = new Swiper(".banner_swiper", {
            pagination: {
                el: ".banner_swiper .swiper-pagination",
                // dynamicBullets: true,
            },
        });
    },

    /**
     * 버튼 dom 만드는 기능
     * @param {*} classNm 만들 dom 클래스 이름
     * @param {*} text 텍스트
     * @param {*} parent 붙여넣을 부모요소
     */
    makeButtonDom(classNm, text, parent){
        const divDom = document.createElement('button')
        divDom.type = "button"
        divDom.className = classNm
        divDom.textContent = text

        parent.append(divDom)
    },

    /**
     * 내용을 html에 삽입
     * @param {String} html 삽입할 위치
     * @param {Any} contents 삽입할 내용
     */
    insertHtml(html, contents) {
        html.innerHTML = contents
    },

    /**
     * 클래스를 제거하는 기능
     * @param {String | String[]} el 돔 요소
     * @param {String} classNm 제거할 클래스 이름
     */
    removeClass(el, classNm){
        if (el == null) return

        if (el.length == undefined) {
            el.classList.remove(classNm)
        } else {
            el.forEach(el => {
                el.classList.remove(classNm)
            });
        }
    },

    /**
     * 클래스를 추가하는 기능
     * @param {String | String[]} el 돔 요소
     * @param {String} classNm 추가할 클래스 이름
     */
    addClass(el, classNm){
        if (el == null) return

        if (el.length == undefined) {
            el.classList.add(classNm)
        } else {
            el.forEach(el => {
                el.classList.add(classNm)
            });
        }
    },

    /**
     * 클래스가 있는지 확인하는 기능
     * @param {String} el 돔 요소
     * @param {String} classNm 확인할 클래스 이름
     * @returns 클래스가 있으면 true
     */
    containsClass(el, classNm){
        return el.classList.contains(classNm)
    }
}
