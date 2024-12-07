document.addEventListener("DOMContentLoaded", filterProducts);

function filterProducts() {
    const budgetSelect = document.getElementById("budget-select");
    const selectedBudget = budgetSelect.value;
    const produitsList = document.getElementById("produits-list");
    const iaButtonContainer = document.getElementById("ia-button-container");

    produitsList.innerHTML = ""; // Réinitialise la liste
    iaButtonContainer.classList.add("hidden"); // Cache le bouton IA par défaut

    fetch("data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur réseau : " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            let productsFound = false;

            data.categories.forEach((category) => {
                if (!selectedBudget || category.budget === parseInt(selectedBudget)) {
                    category.produits.forEach((product) => {
                        // Crée un élément pour chaque produit
                        const productDiv = document.createElement("div");
                        productDiv.className =
                            "border p-4 rounded bg-j shadow hover:shadow-lg transition-shadow";
                        productDiv.innerHTML = `
                            <img src="${product.image}" alt="${product.titre}" class="w-full h-32 object-cover rounded-md mb-2">
                            <h3 class="text-lg font-bold">${product.titre}</h3>
                            <p class="text-sm text-gray-600">${product.description}</p>
                        `;
                        produitsList.appendChild(productDiv);
                        productsFound = true;
                    });
                }
            });

            if (productsFound) {
                iaButtonContainer.classList.remove("hidden");
            } else {
                produitsList.innerHTML =
                    '<p class="text-gray-500 text-center">Aucun produit trouvé pour ce budget.</p>';
            }
        })
        .catch((error) => {
            console.error("Erreur lors du chargement des données :", error);
            produitsList.innerHTML =
                '<p class="text-red-500 text-center">Erreur de chargement des produits.</p>';
        });
}
