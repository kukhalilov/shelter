let hamburger = document.querySelector('.hamburger-menu');
let header = document.getElementById('header');
let navLinks = Array.from(document.querySelectorAll('.nav-link'));
let navLinksContainer = document.querySelector('.nav-links');
let navbar = document.querySelector('.navbar');
let firstBtn = document.querySelector('.btn-first');
let prevBtn = document.querySelector('.btn-prev');
let pageBtn = document.querySelector('.btn-page span');
let nextBtn = document.querySelector('.btn-next');
let lastBtn = document.querySelector('.btn-last');
let cardsBlock = document.querySelector('.cards');

document.addEventListener('DOMContentLoaded', () => {
  hamburger.addEventListener('click', () => {
    header.classList.toggle('mobile');
    document.body.classList.toggle('only-nav');
    navLinksContainer.style.transition = 'transform 0.5s ease';
  });
});

for (let link of navLinks) {
  link.addEventListener('click', () => {
    if (header.classList.contains('mobile')) {
      header.classList.remove('mobile');
      document.body.classList.remove('only-nav');
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
  }
});

function handleResize() {
  let width = window.innerWidth;
  if (width < 768) {
    navLinksContainer.style.transition = 'none';
  } else if (width >= 768) {
    navLinksContainer.style.transition = 'none';
    header.classList.remove('mobile');
    document.body.classList.remove('only-nav');
  }
}

fetch('../../pets.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let cards = [];
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
    createModal(cardsBlock, data);
    let cardsDesktop = [
      cards[4],
      cards[0],
      cards[2],
      cards[1],
      cards[5],
      cards[7],
      cards[3],
      cards[6],
    ];
    let petsCardsDesktop = [
      ...cardsDesktop,
      ...shuffleArray(cardsDesktop),
      ...shuffleArray(cardsDesktop),
      ...shuffleArray(cardsDesktop),
      ...shuffleArray(cardsDesktop),
      ...shuffleArray(cardsDesktop),
    ];
    let cardsTablet = [
      cards[4],
      cards[0],
      cards[2],
      cards[1],
      cards[5],
      cards[7],
    ];
    let petsCardsTablet = [
      ...cardsTablet,
      ...shuffleArray(cardsTablet),
      ...shuffleArray(cardsTablet),
      ...shuffleArray(cardsTablet),
      ...shuffleArray(cardsTablet),
      ...shuffleArray(cardsTablet),
      ...shuffleArray(cardsTablet),
      ...shuffleArray(cardsTablet),
    ];
    let cardsMobile = [
      cards[4],
      cards[0],
      cards[2],
      cards[1],
      cards[5],
      cards[7],
    ];
    let petsCardsMobile = [
      ...cardsMobile,
      ...shuffleArray(cardsMobile),
      ...shuffleArray(cardsMobile),
      ...shuffleArray(cardsMobile),
      ...shuffleArray(cardsMobile),
      ...shuffleArray(cardsMobile),
      ...shuffleArray(cardsMobile),
      ...shuffleArray(cardsMobile),
    ];

    let desktopPages = splitToChunks(petsCardsDesktop, 6);
    let tabletPages = splitToChunks(petsCardsTablet, 8);
    let mobilePages = splitToChunks(petsCardsMobile, 16);

    let pages;

    window.addEventListener('DOMContentLoaded', handlePages);
    window.addEventListener('load', handlePages);
    window.addEventListener('resize', () => {
      handlePages();
      handleResize();
    });

    function handlePages() {
      if (window.innerWidth >= 1280) {
        pages = desktopPages;
        if (
          Number(pageBtn.textContent) < 6 &&
          Number(pageBtn.textContent) > 1
        ) {
          nextBtn.removeAttribute('disabled');
          lastBtn.removeAttribute('disabled');
        } else if (Number(pageBtn.textContent) === 6) {
          nextBtn.setAttribute('disabled', 'true');
          lastBtn.setAttribute('disabled', 'true');
        } else if (Number(pageBtn.textContent) > 6) {
          pageBtn.textContent = 1;
          prevBtn.setAttribute('disabled', 'true');
          firstBtn.setAttribute('disabled', 'true');
          nextBtn.removeAttribute('disabled');
          lastBtn.removeAttribute('disabled');
        }
        cardsBlock.innerHTML = '';
        pages[Number(pageBtn.textContent) - 1].forEach((card) => {
          cardsBlock.appendChild(card);
        });
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        pages = tabletPages;
        if (
          Number(pageBtn.textContent) < 8 &&
          Number(pageBtn.textContent) > 1
        ) {
          nextBtn.removeAttribute('disabled');
          lastBtn.removeAttribute('disabled');
        } else if (Number(pageBtn.textContent) === 8) {
          nextBtn.setAttribute('disabled', 'true');
          lastBtn.setAttribute('disabled', 'true');
        } else if (Number(pageBtn.textContent) > 8) {
          pageBtn.textContent = 1;
          prevBtn.setAttribute('disabled', 'true');
          firstBtn.setAttribute('disabled', 'true');
          nextBtn.removeAttribute('disabled');
          lastBtn.removeAttribute('disabled');
        }
        cardsBlock.innerHTML = '';
        pages[Number(pageBtn.textContent) - 1].forEach((card) => {
          cardsBlock.appendChild(card);
        });
      } else if (window.innerWidth < 768) {
        pages = mobilePages;
        if (
          Number(pageBtn.textContent) < 16 &&
          Number(pageBtn.textContent) > 1
        ) {
          nextBtn.removeAttribute('disabled');
          lastBtn.removeAttribute('disabled');
        }
      }
    }

    handlePages();

    nextBtn.addEventListener('click', () => {
      if (Number(pageBtn.textContent) < pages.length) {
        firstBtn.removeAttribute('disabled');
        prevBtn.removeAttribute('disabled');
        pageBtn.textContent = Number(pageBtn.textContent) + 1;
        cardsBlock.innerHTML = '';
        pages[Number(pageBtn.textContent) - 1].forEach((card) => {
          cardsBlock.appendChild(card);
        });
        createModal(cardsBlock, data);
      }
      if (Number(pageBtn.textContent) === pages.length) {
        nextBtn.setAttribute('disabled', 'true');
        lastBtn.setAttribute('disabled', 'true');
      }
    });

    prevBtn.addEventListener('click', () => {
      if (Number(pageBtn.textContent) > 1) {
        nextBtn.removeAttribute('disabled');
        lastBtn.removeAttribute('disabled');
        pageBtn.textContent = Number(pageBtn.textContent) - 1;
        cardsBlock.innerHTML = '';
        pages[Number(pageBtn.textContent) - 1].forEach((card) => {
          cardsBlock.appendChild(card);
        });
        createModal(cardsBlock, data);
      }
      if (Number(pageBtn.textContent) === 1) {
        prevBtn.setAttribute('disabled', 'true');
        firstBtn.setAttribute('disabled', 'true');
      }
    });

    lastBtn.addEventListener('click', () => {
      pageBtn.textContent = pages.length;
      cardsBlock.innerHTML = '';
      pages[Number(pageBtn.textContent) - 1].forEach((card) => {
        cardsBlock.appendChild(card);
      });
      createModal(cardsBlock, data);
      nextBtn.setAttribute('disabled', 'true');
      lastBtn.setAttribute('disabled', 'true');
      firstBtn.removeAttribute('disabled');
      prevBtn.removeAttribute('disabled');
    });

    firstBtn.addEventListener('click', () => {
      pageBtn.textContent = 1;
      cardsBlock.innerHTML = '';
      pages[Number(pageBtn.textContent) - 1].forEach((card) => {
        cardsBlock.appendChild(card);
      });
      createModal(cardsBlock, data);
      prevBtn.setAttribute('disabled', 'true');
      firstBtn.setAttribute('disabled', 'true');
      nextBtn.removeAttribute('disabled');
      lastBtn.removeAttribute('disabled');
    });
  });

function splitToChunks(array, parts) {
  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
