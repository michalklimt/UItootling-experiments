// script.js
      document.addEventListener("DOMContentLoaded", () => {
        fetch(
          "https://michalklimt.github.io/UItootling-experiments/Tooling-list.csv"
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
          document.querySelectorAll('#sidebar input[type="checkbox"]:checked')
        ).map((checkbox) => checkbox.id);

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
