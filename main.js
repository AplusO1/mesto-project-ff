(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function o(e){e.classList.toggle("card__like-button_is-active")}function r(e){e.remove()}var c=document.querySelector(".profile__title"),p=document.querySelector(".profile__edit-button"),u=document.querySelector(".popup_type_edit"),d=document.querySelector(".profile__description"),i=document.querySelector(".profile__add-button"),a=document.querySelectorAll(".popup"),s=document.forms["new-place"],l=document.forms["edit-profile"],_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".places__list"),y=document.querySelector(".popup_type_image"),f=l.querySelector(".popup__input_type_name"),v=l.querySelector(".popup__input_type_description"),k=s.querySelector(".popup__input_type_card-name"),q=s.querySelector(".popup__input_type_url"),S=y.querySelector(".popup__image"),g=y.querySelector(".popup__caption");function L(t){S.src=t.link,S.alt=t.name,g.textContent=t.name,e(y)}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"append",n=function(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__image"),p=r.querySelector(".card__title"),u=r.querySelector(".card__delete-button"),d=r.querySelector(".card__like-button");return c.src=e.link,c.alt=e.name,p.textContent=e.name,u.addEventListener("click",(function(){t(r)})),d.addEventListener("click",(function(){n(d)})),c.addEventListener("click",(function(){o(e)})),r}(e,r,o,L);m[t](n)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){h(e)})),p.addEventListener("click",(function(){f.value=c.textContent,v.value=d.textContent,e(u)})),a.forEach((function(e){e.addEventListener("mousedown",(function(n){(n.target.classList.contains("popup_is-opened")||n.target.classList.contains("popup__close"))&&t(e)}))})),l.addEventListener("submit",(function(e){e.preventDefault(),c.textContent=f.value,d.textContent=v.value,t(u)})),i.addEventListener("click",(function(){e(_)})),s.addEventListener("submit",(function(e){e.preventDefault(),h({name:k.value,link:q.value},"prepend"),s.reset(),t(_)}))})();