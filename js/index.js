document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const logoInput = document.getElementById('logo');
  const manageInput = document.getElementById('manage');
  const fullstackInput = document.getElementById('fullstack');
  const timeSelect = document.getElementById('time');
  const workSelect = document.getElementById('work');
  const locationSelect = document.querySelector('.fromlocation');
  const checkboxes = document.querySelectorAll('#forms input[type="checkbox"]');
  const savedCards = document.querySelector('.card');
  const deleteButton = document.querySelector('.delete-bnt');
  const cardbutton = document.querySelector('.card-button');

  // Submit event listener
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
    const skills = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        skills.push(checkbox.nextElementSibling.textContent);
      }
    });

    const card = {
      logo: logoInput.value,
      manage: manageInput.value,
      fullstack: fullstackInput.value,
      time: timeSelect.value,
      work: workSelect.value,
      location: locationSelect.value,
      skills: skills.join(', ') || 'No skills selected',
    };

    let cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));

    displaySavedCards();
  }

  function displaySavedCards() {
    const savedCardsArray = JSON.parse(localStorage.getItem('cards')) || [];
    savedCards.innerHTML = '';
    savedCardsArray.forEach(savedCard => {
      savedCards.innerHTML += `
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
          <button class="button-btn">${savedCard.skills}</button>
          <button class="clear-card">Clear card</button>
        </div>
      `;
    });

    const clearCards = document.querySelectorAll('.clear-card');
    clearCards.forEach(clear => {
      clear.addEventListener('click', function () {
        let isClear = confirm("Rostan ham cardni o'chirmoqchimisiz?");
        if (isClear) {
          let cards = JSON.parse(localStorage.getItem('cards')) || [];
          const cardIndex = Array.from(clearCards).indexOf(clear);
          cards.splice(cardIndex, 1);
          localStorage.setItem('cards', JSON.stringify(cards));
          displaySavedCards();
        }
      });
    });
  }

  displaySavedCards();
});
