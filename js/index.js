document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const logoInput = document.getElementById('logo');
  const manageInput = document.getElementById('manage');
  const fullstackInput = document.getElementById('fullstack');
  const timeSelect = document.getElementById('time');
  const workSelect = document.getElementById('work');
  const locationSelect = document.querySelector('.fromlocation');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const savedCards = document.querySelector('.card');
  const deleteButton = document.querySelector('.delete-bnt');
  const cardbutton = document.querySelector('.card-button');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validate()) {
      saveCard();
    }
  });

  deleteButton.addEventListener('click', () => {
    if (confirm("Hamma ma'lumotlarni o'chirishni istaysizmi?")) {
      localStorage.clear();
      savedCards.innerHTML = '';
    }
  });

  function validate() {
    if (
      !logoInput.value ||
      !manageInput.value ||
      !fullstackInput.value ||
      timeSelect.value === 'Tanlang' ||
      workSelect.value === 'Tanlang' ||
      locationSelect.value === 'Tanlang'
    ) {
      alert("Barcha maydonlarni to'ldirish zarur!");
      return false;
    }
    return true;
  }

  function saveCard() {
    const card = {
      logo: logoInput.value,
      manage: manageInput.value,
      fullstack: fullstackInput.value,
      time: timeSelect.value,
      work: workSelect.value,
      location: locationSelect.value,
    };

    localStorage.setItem('card', JSON.stringify(card));
    displaySavedCards();
  }

  function displaySavedCards() {
    const savedCard = JSON.parse(localStorage.getItem('card'));
    if (savedCard) {
      savedCards.innerHTML = `
        <div class="card-img">
          <img src="${savedCard.logo}" alt="Logo" />
        </div>
        <div class="card-titles">
          <h2>${savedCard.manage}</h2>
          <h3>${savedCard.fullstack}</h3>
         <ul>
          <li>${savedCard.time}</li>
          <li>${savedCard.work}</li>
          <li>${savedCard.location}</li>
         </ul>
        </div>
      
      `;
    }
  }

  displaySavedCards();
});
