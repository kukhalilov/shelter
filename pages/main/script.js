let hamburger = document.querySelector('.hamburger-menu');
let header = document.getElementById('header');
let navLinks = Array.from(document.querySelectorAll('.nav-link'));
let navLinksContainer = document.querySelector('.nav-links');

document.addEventListener('DOMContentLoaded', () => {
  if (!header.classList.contains('mobile')) {
    document.querySelector('#start .wrapper').style.zIndex = '1111111';
  }
  hamburger.addEventListener('click', () => {
    header.classList.toggle('mobile');
    if (header.classList.contains('mobile')) {
      document.querySelector('#start .wrapper').style.zIndex = '1';
    }
    document.body.classList.toggle('only-nav');
    navLinksContainer.style.transition = 'transform 0.5s ease';
  });
});

for (let link of navLinks) {
  link.addEventListener('click', () => {
    if (header.classList.contains('mobile')) {
      header.classList.remove('mobile');
      document.body.classList.remove('only-nav');
      document.querySelector('#start .wrapper').style.zIndex = '1111111';
    }
  });
}

document.addEventListener('click', function (event) {
  if (
    !hamburger.contains(event.target) &&
    !navLinksContainer.contains(event.target) &&
    header.classList.contains('mobile')
  ) {
    header.classList.remove('mobile');
    document.body.classList.remove('only-nav');
    setTimeout(() => {
      document.querySelector('#start .wrapper').style.zIndex = '1111111';
    }, 500);
  }
});

function handleResize() {
  let width = window.innerWidth;
  if (width < 768) {
    navLinksContainer.style.transition = 'none';
    document.querySelector('#start .wrapper').style.zIndex = '1111111';
  } else if (width >= 768) {
    navLinksContainer.style.transition = 'none';
    header.classList.remove('mobile');
    document.body.classList.remove('only-nav');
  }
}

window.addEventListener('resize', handleResize);

fetch('../../pets.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let cards = [];
    let cardsBlock = document.querySelector('.cards');
    data.forEach((el) => {
      let card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `<img
                src="${el.img}"
                alt="pet ${el.name}"
              />
              <h4>${el.name}</h4>
              <button class="btn">
                <span>Learn more</span>
              </button>`;
      cards.push(card);
    });
    let arrowBTns = document.querySelectorAll('.arrow');
    arrowBTns.forEach((btn) => {
      btn.addEventListener('click', () => {
        let fragment = document.createDocumentFragment();
        while (fragment.children.length < 3) {
          let child = cards[Math.floor(Math.random() * 8)];
          if (
            cardsBlock.children[0].children[1].textContent !==
              child.children[1].textContent &&
            cardsBlock.children[1].children[1].textContent !==
              child.children[1].textContent &&
            cardsBlock.children[2].children[1].textContent !==
              child.children[1].textContent
          ) {
            fragment.appendChild(child);
          }
        }
        if (btn.children[0].classList.contains('arrow-right')) {
          cardsBlock.classList.add('slide-left');
          setTimeout(() => {
            cardsBlock.innerHTML = '';
            cardsBlock.classList.remove('slide-left');
            cardsBlock.style.transition = 'none';
            cardsBlock.classList.add('slide-left-from-right');
            setTimeout(() => {
              cardsBlock.style.transition = 'all 0.5s ease';
              cardsBlock.classList.remove('slide-left-from-right');
            }, 100);
            cardsBlock.appendChild(fragment);
          }, 100);
        }
        if (btn.children[0].classList.contains('arrow-left')) {
          cardsBlock.classList.add('slide-right');
          setTimeout(() => {
            cardsBlock.innerHTML = '';
            cardsBlock.classList.remove('slide-right');
            cardsBlock.style.transition = 'none';
            cardsBlock.classList.add('slide-right-from-left');
            setTimeout(() => {
              cardsBlock.style.transition = 'all 0.5s ease';
              cardsBlock.classList.remove('slide-right-from-left');
            }, 100);
            cardsBlock.appendChild(fragment);
          }, 100);
        }
        createModal(cardsBlock, data);
      });
    });
    createModal(cardsBlock, data);
  });

function createModal(block, arr) {
  Array.from(block.children).forEach((cardItem) => {
    cardItem.addEventListener('click', () => {
      let modal = document.createElement('div');
      modal.id = 'modal-window';
      let petInfo = arr.find(
        (el) => el.name === cardItem.children[1].textContent
      );
      modal.innerHTML = `<div id="modal-box" class="modal-box">
      <div id="modal-content" class="modal-content">
        <div class="modal-img">
          <img src="${petInfo.img}" alt="pet ${petInfo.name}">
        </div>
        <div class="modal-text">
          <h3>${petInfo.name}</h3>
          <h4>${petInfo.type} - ${petInfo.breed}</h4>
          <p>${petInfo.description}</p>
          <ul class="pet-info-list">
            <li><span class="dot"></span><span><b>Age:</b> ${petInfo.age}</span></li>
            <li><span class="dot"></span><span><b>Inoculations:</b> ${petInfo.inoculations}</span></li>
            <li><span class="dot"></span><span><b>Diseases:</b> ${petInfo.diseases}</span></li>
            <li><span class="dot"></span><span><b>Parasites:</b> ${petInfo.parasites}</span></li>
          </ul>
        </div>
      </div>
      <div class="modal-close"><span>&times;</span></div>
    </div>`;
      document.getElementById('modal-window')?.remove();
      document.body.appendChild(modal);
      document.documentElement.classList.add('has-modal');
      let modalContent = document.getElementById('modal-content');
      modalContent.addEventListener('mouseover', () => {
        modalContent.parentElement.parentElement.classList.add(
          'notHoveredOver'
        );
      });
      modalContent.addEventListener('mouseleave', () => {
        modalContent.parentElement.parentElement.classList.remove(
          'notHoveredOver'
        );
      });
      setTimeout(() => {
        window.addEventListener(
          'click',
          (event) => {
            if (
              document.body.contains(document.getElementById('modal-window'))
            ) {
              if (
                !document.getElementById('modal-content').contains(event.target)
              ) {
                document.body.removeChild(
                  document.getElementById('modal-window')
                );
                document.documentElement.classList.remove('has-modal');
              }
            }
          },
          200
        );
      });
    });
  });
}
