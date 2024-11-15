const wrapper = document.querySelector('#wrapper');
const form = document.querySelector('form');
const fields = document.querySelectorAll('.field');
const time = document.querySelector('#time');
const button = document.querySelector('.button');
const manage = document.querySelector('#manage');
const fullstack = document.querySelector('#fullstack');
const checkboxes = document.querySelectorAll('.tag input[type="checkbox"]');
const location = document.querySelector('#location');
const card = document.querySelector('.card');
const typeofwork = document.querySelector('#typeofwork');
const tagNew = document.querySelector('#tagNew');
const fromlocation = document.querySelector('.fromlocation');
const deletebnt = document.querySelector('.delete-bnt');
const work = document.querySelector('#work');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      checkboxes.forEach((cb) => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
    }
  });
});


function createBlock(data) {
  return `
    <div class="card-img">
      <img src="${data.imageSrc}" alt="Company Image">
    </div>
    <div class="card-titles">
      <h2>${data.companyName}</h2>
      <div class="card-buttons">
      <button class="card-first-btn">${data.tagNew}</button>
        <div class="card-titles-title">
          <h2>${data.button}</h2>
        </div>
        <div class="checkboxs">
          <ul class="ul">
            <li>${data.time}</li>
            <li>${data.work}</li>
            <li>${data.fromlocation}</li>
          </ul> 
          </div>
          </div>
          </div>
          `;
}
function validate(field) {
  const value = field.value.trim();

  if (value.length < 5 || !value.startsWith("https://")) {
    alert(`${field.name || field.id} Logotip URL manzili hato. URL manzil "https://" bilan boshlanishi kerak.`);
    return false;
  }

  return true;
}


function getDataFromLocalStorage() {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    let isValid = true;

    fields.forEach(function (field) {
      if (!validate(field)) {
        isValid = false;
      }
    });

    if (manage.value.trim().length < 5) {
      alert('Kompaniya nomi xato');
      isValid = false;
    }
    if (fullstack.value.trim().length < 5) {
      alert('Lavozim xato');
      isValid = false;
    }

    if (!isValid) return;

    const data = {
      imageSrc: 'https://picsum.photos/200',
      companyName: manage.value,
      tagNew: tagNew.value,
      button: fullstack.value,
      time: time.value,
      work: work.value,
      fromlocation: fromlocation.value,
    };

    const dataFromLocalStorage = getDataFromLocalStorage();
    dataFromLocalStorage.push(data);
    localStorage.setItem('datas', JSON.stringify(dataFromLocalStorage));

    const blockHTML = createBlock(data);
    card.insertAdjacentHTML('beforeend', blockHTML);

    resetForm();
  });
  return JSON.parse(localStorage.getItem('datas')) || [];
}

document.addEventListener('DOMContentLoaded', function () {
  const savedData = getDataFromLocalStorage();
  savedData.forEach(function (data) {
    const blockHTML = createBlock(data);
    card.innerHTML += blockHTML;
  });
});



function resetForm() {
  fields.forEach((field) => (field.value = ''));
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  time.value = 'Tanlang';
  typeofwork.value = 'Tanlang';
  fromlocation.value = 'Tanlang';
}

deletebnt.addEventListener('click', function (event) {
  let isDelete = confirm("Rostan ham barcha ma'lumotlarni ochirmoqchimisiz?");
  if (isDelete) {
    resetForm();
    localStorage.removeItem('datas');
    card.innerHTML = '';
  }
});
