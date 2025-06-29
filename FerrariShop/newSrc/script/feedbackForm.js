const openCallback = () => {
    const callbackForm = document.querySelector('.callback_form_js');
    const btnsCallback = document.querySelectorAll('.btn_callback_js');
    btnsCallback.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (callbackForm.classList.contains("callback_visible")) {
                callbackForm.classList.remove("callback_visible");
                callbackForm.addEventListener('transitionend', (e) => {
                    callbackForm.style.display = "none";
                }, {once: true});
            } else {
                callbackForm.style.display = "grid";
                requestAnimationFrame(() => {
                    callbackForm.classList.add("callback_visible");
                })
            }
        })
    })
}

document.getElementById('scroll_to_button').addEventListener('click', () => {
    document.getElementById('target').scrollIntoView({behavior: 'smooth'});
})