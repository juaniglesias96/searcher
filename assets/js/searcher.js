

let loadproductJSON = () => {
    let myURL = `https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json`;

    fetch(myURL)
        .then(response => response.json())
        .then(result => {
            /* Callback por éxito: Procese el result */
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                let { name, type, price, src } = element;

                let template =
                    `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                        <div class="card card-blog card-plain">
                            <div class="card-header p-0 mt-n4 mx-3">
                                <a class="d-block shadow-xl border-radius-xl">
                                    <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                                </a>
                            </div>
                            <div class="card-body p-3">
                                <p class="mb-0 text-sm">${type}</p>
                                <a href="javascript:;">
                                    <h5>${name}</h5>
                                </a>
                                <p class="mb-4 text-sm">
                                    <b>Price: </b> $ ${price}
                                </p>
                            </div>
                        </div>
                    </div>`;

                let resultHTML= document.getElementById("templateproducts")

                resultHTML.innerHTML+=template
            }
        })
        .catch(error => {
            /* Callback por fallo: Procese el error */
            console.log(error);
        });
}

loadproductJSON();


let loadproductXML = () => {
    let URL = 'https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml';

    fetch(URL)
        .then(response => response.text()) // Convert response to text
        .then(xmlText => {
            // Parse XML text to XML document
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            // Process XML document
            let products = xmlDoc.getElementsByTagName('product');
            let resultHTML = document.getElementById('template-products');

            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                let name = product.getElementsByTagName('name')[0].textContent;
                let type = product.getElementsByTagName('type')[0].textContent;
                let price = product.getElementsByTagName('price')[0].textContent;
                let src = product.getElementsByTagName('src')[0].textContent;

                // Generate HTML template
                let template =
                    `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                        <div class="card card-blog card-plain">
                            <div class="card-header p-0 mt-n4 mx-3">
                                <a class="d-block shadow-xl border-radius-xl">
                                    <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                                </a>
                            </div>
                            <div class="card-body p-3">
                                <p class="mb-0 text-sm">${type}</p>
                                <a href="javascript:;">
                                    <h5>${name}</h5>
                                </a>
                                <p class="mb-4 text-sm">
                                    <b>Price: </b> $ ${price}
                                </p>
                            </div>
                        </div>
                    </div>`;

                // Convert template to DOM elements and append to resultHTML
                let parser = new DOMParser();
                let templateDoc = parser.parseFromString(template, 'text/html');
                resultHTML.appendChild(templateDoc.body.firstChild);
            }
        })
        .catch(error => {
            // Callback por fallo: Procese el error
            console.log(error);
        });
}

loadproductXML();

// Función para filtrar productos
function filterProducts() {
    console.log("Filtering products...");
    const searchText = document.getElementById("text").value.trim().toLowerCase();
    const products = document.querySelectorAll(".col-xl-3");

    products.forEach(product => {
        const productName = product.querySelector("h5").innerText.trim().toLowerCase();
        const productType = product.querySelector(".text-sm").innerText.trim().toLowerCase();

        if (productName.includes(searchText) || productType.includes(searchText)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Esperar a que el DOM esté completamente cargado antes de llamar a filterProducts
document.addEventListener('DOMContentLoaded', function() {
    filterProducts();
});


// Función para filtrar productos
function filterProducts() {
    console.log("Filtrando productos..."); // Agregar console.log de prueba
    const searchText = document.getElementById("text").value.trim().toLowerCase();
    const products = document.querySelectorAll(".col-xl-3");

    products.forEach(product => {
        const productName = product.querySelector("h5").innerText.trim().toLowerCase();
        const productType = product.querySelector(".text-sm").innerText.trim().toLowerCase();

        if (productName.includes(searchText) || productType.includes(searchText)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Esperar a que el DOM esté completamente cargado antes de llamar a filterProducts
document.addEventListener('DOMContentLoaded', function() {
    filterProducts();

    // Llamar a la función filterProducts cuando se haga clic en el botón de filtro
    document.getElementById('filter').addEventListener('click', filterProducts);
});
