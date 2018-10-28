export function showPopup() {

    document.querySelector('.popupWrapper').style.display = 'block'
    disableScroll()
}

export function hidePopup() {
    document.querySelector('.popupWrapper').style.display = 'none'
    enableScroll()
}

function disableScroll() {
    document.querySelector('body').classList.add('stop-scrolling')
}

function enableScroll() {
    document.querySelector('body').classList.remove('stop-scrolling')
}