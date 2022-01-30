export const showAlert = (type, msg, time = 3) => {
    
    // hideAlert()
    console.log("in alert");
    const markUp = `<div class=" allert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markUp);
    window.setTimeout(hideAlert, time * 1000);
}

export const hideAlert = () => {
    const el = document.querySelector('.allert');
    if (el) {
        el.parentElement.removeChild(el);
    }
}