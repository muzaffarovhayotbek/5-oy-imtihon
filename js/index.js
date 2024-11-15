// JavaScript to handle form submission and display saved data

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const logoInput = document.getElementById('logo');
  const manageInput = document.getElementById('manage');
  const fullstackInput = document.getElementById('fullstack');
  const timeSelect = document.getElementById('time');
  const workSelect = document.getElementById('work');
  const locationSelect = document.querySelector('.fromlocation');
  const savedCards = document.querySelector('.card');
  const deleteButton = document.querySelector('.delete-bnt');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    saveCard();
  });

  deleteButton.addEventListener('click', () => {
    localStorage.clear();
    displaySavedCards();
  });

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
  if (manage.value.trim().length < 5) {
    alert('Kompaniya nomi xato');
    isValid = false;
  }
  if (fullstack.value.trim().length < 5) {
    alert('Lavozim xato');
    isValid = false;
  }

  // If validation fails, do not submit
  if (!isValid) return;

  function displaySavedCards() {
    const savedCard = JSON.parse(localStorage.getItem('card'));
    if (savedCard) {
      savedCards.innerHTML = `
        <div class="card-img">
          <img src="${savedCard.logo}" alt="Logo" />
        </div>
        <div class="card-titles">
          <h2>${savedCard.manage}</h2>
          <h2>${savedCard.fullstack}</h2>
          <h2>${savedCard.time}</h2>
        </div>
        <div class="btn">
          <button class="card-first-btn">Saqlash</button>
        </div>
      `;
    }
  }

  displaySavedCards();
});
