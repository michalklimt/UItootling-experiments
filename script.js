// script.js
      document.addEventListener("DOMContentLoaded", () => {
        fetch(
          "https://michalklimt.github.io/UItootling-experiments/Tooling-list-1.csv"
        )
          .then((response) => response.text())
          .then((data) => {
            let rows = data.split("\n");
            rows.forEach((row, index) => {
              if (index === 0 || row.trim() === "") return; // Skip header or empty row
              let columns = row.split(",");
              createCard(columns);
            });
            updateCounter();
          });

        document
          .querySelectorAll('#sidebar input[type="checkbox"]')
          .forEach((checkbox) => {
            checkbox.addEventListener("change", filterCards);
          });
      });

      function createCard(data) {
        let cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.dataset.category = data[2]; // Předpokládáme, že kategorie je ve sloupci 2
        cardDiv.innerHTML = `
                <a href="${data[10]}" target="_blank" style="text-decoration: none; color: inherit;">
                    <h1>${data[0]}</h1>
                    <p>${data[9]}</p>
                    <div class="label">${data[2]}</div>
                    <div class="label">${data[4]}</div>
                </a>
            `;
        document.getElementById("card-container").appendChild(cardDiv);
      }

      function filterCards() {
        let selectedCategories = Array.from(
          document.querySelectorAll('#sidebar input[type="checkbox"]:checked, #generated-filters input[type="checkbox"]:checked')
        ).map((checkbox) => checkbox.id.replace('-modal', '')); // Remove '-modal' from the ID

        document.querySelectorAll(".card").forEach((card) => {
          if (
            selectedCategories.length === 0 ||
            selectedCategories.includes(card.dataset.category)
          ) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
        updateCounter();
      }

      function updateCounter() {
        let visibleCards = document.querySelectorAll(".card").length;
        let displayedCards = Array.from(
          document.querySelectorAll(".card")
        ).filter((card) => card.style.display !== "none").length;
        let counterText = displayedCards === 1 ? "nástroj" : "nástrojů";
        document.getElementById(
          "counter"
        ).textContent = `nalezeno ${displayedCards} ${counterText}`;
      }



// Tohle otevírá mobilní modál
      document.querySelector('.filter-button').addEventListener('click', function() {
        document.querySelector('.modal').style.transform = 'translateX(0)';
        document.querySelector('.overlay').style.display = 'block';
    });
    
document.querySelectorAll('.modal .close, .modal #show-results, .overlay').forEach(element => {
  element.addEventListener('click', function() {
      document.querySelector('.modal').style.transform = 'translateX(100%)';
      document.querySelector('.overlay').style.display = 'none';
    });      
    });



// Tohle vypisuje filtry do mobilního modálu
function populateModalWithFilters() {
  var filtersContainer = document.querySelector('#sidebar');
  var generatedFiltersContainer = document.querySelector('#generated-filters');

  filtersContainer.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox, index) {
      var clone = checkbox.cloneNode(true);
      var label = document.createElement('label');

      // Generate a unique ID for each checkbox
      var newId = checkbox.id + '-modal';
      clone.id = newId;
      label.setAttribute('for', newId); // Link label to the cloned checkbox

      label.innerHTML = checkbox.nextElementSibling.innerHTML; // Assumes label follows checkbox

      // Clone the class attribute if it exists
      if (checkbox.className) {
          clone.className = checkbox.className;
      }

      // Clone class of the label if it exists
      if (checkbox.nextElementSibling.className) {
          label.className = checkbox.nextElementSibling.className;
      }

      clone.addEventListener("change", filterCards);

      generatedFiltersContainer.appendChild(clone);
      generatedFiltersContainer.appendChild(label);
      generatedFiltersContainer.appendChild(document.createElement('br'));
  });
}

populateModalWithFilters();


    
