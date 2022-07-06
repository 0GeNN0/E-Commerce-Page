// HEADER HEADER HEADER HEADER HEADER HEADER HEADER HEADER
const menuIcon = document.getElementById('menu');
const closeIcon = document.getElementById('close');
const hiddenMenu = document.querySelector('.toggle');
const headerListItem = document.querySelectorAll('.list-item');


// Add active class to the selected element
const addActiveClass = (list, element) => {
  list.forEach(item => item.classList.remove('active'));
  element.classList.add('active');
};

addActiveClass(headerListItem, headerListItem[2]);

headerListItem.forEach(li => {
  li.addEventListener('click', () => {
    addActiveClass(headerListItem, li);
  });
});

// Show the menu when the menu icon clicked
menuIcon.addEventListener('click', () => {
  hiddenMenu.classList.add('render');
});

// Hide the menu when the close icon clicked
closeIcon.addEventListener('click', () => {
  hiddenMenu.classList.remove('render');
});

// END HEADER END HEADER END HEADER 

// MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN

// START PHOTOS SECTION 
const renderPhoto = document.querySelector('.render-image');
const directFatherOfImg = document.querySelectorAll('.img');

// POP-UP Staff
// Modal div
const modal = document.querySelector('.modal');
// The close icon
const modalCloseIcon = document.querySelector('#modal-close-icon');
// The images to slide between
const modalSlides = document.querySelectorAll('.pop-up');
// The image under the big one 
const modalThumbnails = document.querySelectorAll('.modal-list-img');
// Button to slide between images
const modalBtns = document.querySelectorAll('.modal-btn');

// close the modal when click on the close icon
modalCloseIcon.addEventListener('click', () => {
  modal.classList.remove('display-mode');
});

let index = 0;

const handleSlideOnModal = (n = 0) => {
  // render the first image when reach the last
  if (n > modalSlides.length - 1) { index = 0; }
  // render the last image when reach the first
  if (n < 0) { index = modalSlides.length - 1; }


  modalSlides.forEach(slide => slide.style.display = 'none');
  modalThumbnails.forEach(thum => thum.classList.remove('active'));
  modalSlides[index].style.display = 'block';
  modalThumbnails[index].classList.add('active');
};

modalThumbnails.forEach((thum, i) => {
  thum.addEventListener('click', () => {
    index = i;
    handleSlideOnModal();
  });
});

modalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.id === 'prev-arrow') {
      index--;
      handleSlideOnModal(index);
    } else {
      index++;
      handleSlideOnModal(index);
    }
  });
});

const createImg = (i) => {
  const imgEl = document.createElement('img');
  index = i - 1;
  imgEl.className = 'on-stage';
  imgEl.setAttribute('src', `./images/image-product-${i}.jpg`);
  // display the modal when click on the big image
  imgEl.addEventListener('click', () => {
    modal.classList.add('display-mode');
    handleSlideOnModal();
  });

  return imgEl;
};



renderPhoto.appendChild(createImg(1));
directFatherOfImg[0].classList.add('active');

directFatherOfImg.forEach((element, i) => {
  element.children[0].addEventListener('click', () => {
    // add active class to the selected element
    directFatherOfImg.forEach(ele => ele.classList.remove('active'));
    element.classList.add('active');

    // render the image in the selected div
    renderPhoto.innerHTML = '';
    renderPhoto.appendChild(createImg(i + 1));
  });
});

// Handle the slider in smal screens
const slider = document.querySelector('.image-slider');
const slideImages = document.querySelectorAll('.image-slider img');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

// get the width of image so when translate the other comes
const distanceToMove = window.innerWidth;
// make a count to multiply the distance every time button clicked
let counter = 1;


// Always render the first image in the show
slider.style.transform = `translateX(${-distanceToMove * counter}px)`;

nextBtn.addEventListener('click', () => {
  if (counter >= slideImages.length - 1) return;
  slider.style.transition = 'transform .5s ease-in-out';
  counter++;
  slider.style.transform = `translateX(${-distanceToMove * counter}px)`;
});

prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  slider.style.transition = 'transform .5s ease-in-out';
  counter--;
  slider.style.transform = `translateX(${-distanceToMove * counter}px)`;
});

// when reach the first image in the HTML Element bring the img next to it directly without transition
slider.addEventListener('transitionend', () => {
  if (slideImages[counter].id === 'last-one') {
    slider.style.transition = 'none';
    counter = slideImages.length - 2;
    slider.style.transform = `translateX(${-distanceToMove * counter}px)`;
  }
});

slider.addEventListener('transitionend', () => {
  if (slideImages[counter].id === 'first-one') {
    slider.style.transition = 'none';
    counter = slideImages.length - counter;
    slider.style.transform = `translateX(${-distanceToMove * counter}px)`;
  }
});

// END PHOTOS SECTION

// START ASIDE SECTION 
const amountEl = document.getElementById('amount');
const handleAmountBtns = document.querySelectorAll('.svg');
const smallEl = document.querySelector('small');
const cart = document.querySelector('.cart-items');
const buyBtn = document.querySelector('#buy');

cart.textContent = 'Your cart is empty.';

let amount = 0;
amountEl.textContent = amount;

handleAmountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.id === 'minus') {
      if (amount > 0) {
        amount--;
        amountEl.textContent = amount;
        smallEl.textContent = amount;
      }
    } else {
      amount++;
      amountEl.textContent = amount;
      smallEl.textContent = amount;
    }
  });
});

buyBtn.addEventListener('click', () => {
  if (amount > 0) {
    smallEl.className = 'shown';

    const parent = document.createElement('div');
    const containerDiv = document.createElement('div');
    const productImage = document.createElement('img');
    const text = document.createElement('div');
    const heading = document.createElement('h4');
    const priceInDetails = document.createElement('p');
    const totalPrice = document.createElement('span');
    const removeIcon = document.createElement('img');
    const btnDiv = document.createElement('div');
    const btn = document.createElement('button');

    //img
    productImage.setAttribute('src', './images/image-product-1-thumbnail.jpg');
    productImage.className = 'thumbnails';

    //heading
    heading.textContent = 'Fall Limited Edition Sneakers';
    heading.className = 'item-header';

    // priceInDetails
    priceInDetails.textContent = `$125.00 x ${amount} `;
    priceInDetails.className = 'price-in-details';

    // totalPrice
    let totalPriceNumber = amount * 125;
    totalPrice.textContent = ` $${totalPriceNumber}.00`;
    priceInDetails.appendChild(totalPrice);

    // text
    text.className = 'text';
    text.appendChild(heading);
    text.appendChild(priceInDetails);

    // removeIcon
    removeIcon.setAttribute('src', './images/icon-delete.svg');
    removeIcon.id = 'remove-icon';
    removeIcon.addEventListener('click', () => {
      cart.textContent = 'Your cart is empty.';
      amount = 0;
      amountEl.textContent = amount;
      smallEl.textContent = amount;
      smallEl.className = '';
    });


    // Append all children in their parent
    containerDiv.className = 'container-div';
    containerDiv.appendChild(productImage);
    containerDiv.appendChild(text);
    containerDiv.appendChild(removeIcon);

    // btn
    btn.textContent = 'Checkout';
    btn.className = 'checkout';

    // btnDiv
    btnDiv.className = 'checkout-div';
    btnDiv.appendChild(btn);

    // final display
    parent.appendChild(containerDiv);
    parent.appendChild(btnDiv);
    cart.textContent = '';
    cart.appendChild(parent);
  }
});
// END ASIDE SECTION

// MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN MAIN