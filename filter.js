// filter.js
document.addEventListener("DOMContentLoaded", function() {
    var csvArray = [];
    var categoryIndex = -1;
    var categories = new Set();
    var selectedCategory = null;

    function loadCSV() {
        fetch('https://michalklimt.github.io/UItootling-experiments/Tooling-list.csv')
            .then(response => response.text())
            .then(data => parseCSV(data))
            .catch(error => console.error('Error fetching CSV:', error));
    }

    function parseCSV(csv) {
        var lines = csv.split("\n");
        var headers = lines[0].split(",");
        categoryIndex = headers.indexOf("Category");
        csvArray = lines.slice(1).map(line => line.split(","));
        displayCSV(csvArray);
        extractCategories();
        displayTags();
    }

    function displayCSV(dataArray) {
        var html = "<table><thead><tr>";
        dataArray[0].forEach(header => {
            html += "<th>" + header + "</th>";
        });
        html += "</tr></thead><tbody>";
        dataArray.slice(1).forEach(row => {
            html += "<tr>";
            row.forEach(cell => {
                html += "<td>" + cell + "</td>";
            });
            html += "</tr>";
        });
        html += "</tbody></table>";
        document.getElementById("csv-data").innerHTML = html;
    }

    function extractCategories() {
        csvArray.forEach(row => {
            if (row[categoryIndex]) categories.add(row[categoryIndex].trim());
        });
    }

    function displayTags() {
        var tagsContainer = document.getElementById("tags-container");
        categories.forEach(category => {
            var tagButton = document.createElement("button");
            tagButton.textContent = category;
            tagButton.addEventListener('click', function() {
                selectCategory(category);
                filterCategory(category);
            });
            tagsContainer.appendChild(tagButton);
        });
    }

    function selectCategory(category) {
        selectedCategory = category;
        document.querySelectorAll('button').forEach(button => {
            button.classList.toggle('selected', button.textContent === category);
        });
    }

    function filterCategory(category) {
        var filteredData = csvArray.filter(row => row[categoryIndex] === category);
        displayCSV(filteredData);
    }

    loadCSV();
});
