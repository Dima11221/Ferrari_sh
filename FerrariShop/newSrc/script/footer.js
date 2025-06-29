const socialCard = document.getElementById('socialCard');
function updateClasses() {
    if (window.innerWidth <= 768) {
        myElement.classList.remove('specificity-card');
    }
}


let coll = document.getElementsByClassName('btn-detail-toggle');
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function() {
        this.classList.toggle('act');

        let card = this.parentElement;
        let openCard = this.firstElementChild;
        let closeCard = this.lastElementChild;
        let content = this.nextElementSibling;


        openCard.classList.toggle('open-module');
        closeCard.classList.toggle('close-module');
        content.classList.toggle('cards-text');
        card.classList.toggle('benefit-cards');
    })
}