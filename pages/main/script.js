let hamburger = document.querySelector('.hamburger-menu')
let header = document.getElementById('header')
let navLinks = Array.from(document.querySelectorAll('.nav-link'))
document.addEventListener('DOMContentLoaded', () => {
    hamburger.addEventListener('click', () => {
        header.classList.toggle('mobile')
    })
})

for (let link of navLinks) {
    link.addEventListener('click', () => {
        if (header.classList.contains('mobile')) {
            header.classList.remove('mobile')
        }
    })
}
