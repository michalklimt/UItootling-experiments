// filter.js
var csvArray = [];
var categoryIndex = -1;
var categories = new Set();
var selectedCategory = null; // For tracking the selected category

function loadCSV() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            parseCSV(xhr.responseText);
        }
    };
    xhr.open(
        "GET",
        "Tooling-list.csv", // Make sure the path is correct
        true,
    );
    xhr.send();
}

function parseCSV(csv) {
    var lines = csv.split("\\n");
    var headers = lines[0].split(",");
    categoryIndex = headers.indexOf("Category");
    csvArray = lines.slice(1).map((line) => line.split(","));
    displayCSV(csvArray);
    extractCategories();
    displayTags();
}

function displayCSV(dataArray) {
    var html = "<table border='1'>";
    dataArray.forEach(function (row) {
        html += "<tr>";
        row.forEach(function (cell) {
            html += "<td>" + cell.trim() + "</td>";
        });
        html += "</tr>";
    });
    html += "</table>";
    document.getElementById("csv-data").innerHTML = html;
}

function extractCategories() {
    csvArray.forEach((row) => {
        if (row[categoryIndex]) categories.add(row[categoryIndex].trim());
    });
}

function displayTags() {
    var tagsContainer = document.getElementById("tags-container");
    categories.forEach((category) => {
        var tagButton = document.createElement("button");
        tagButton.textContent = category;
        tagButton.classList.add('category-button');
        tagButton.onclick = function () {
            selectCategory(category);
            filterCategory(category);
        };
        tagsContainer.appendChild(tagButton);
    });
}

function selectCategory(category) {
    selectedCategory = category;
    document.querySelectorAll('.category-button').forEach(button => {
        if (button.textContent === category) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

function filterCategory(category) {
    if (category) {
        var filteredData = csvArray.filter(
            (row) => row[categoryIndex] === category,
        );
        displayCSV(filteredData);
    } else {
        displayCSV(csvArray); // Show all if no category is selected
    }
}

window.onload = loadCSV;
