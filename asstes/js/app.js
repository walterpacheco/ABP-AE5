
// URL base de la API
const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

// Función para buscar categorías por ID
async function buscarCategoriasPorId(idCategory) {
    try {
        // Realizar la solicitud a la API
        const respuesta = await fetch(apiUrl);
        if (!respuesta.ok) {
            throw new Error('Error en la solicitud');
        }

        const datos = await respuesta.json();
        const categorias = datos.categories;

        // Filtrar las categorías por idCategory
        const categoria = categorias.find(cat => cat.idCategory === idCategory);

        if (categoria) {
            mostrarCategoria(categoria);
        } else {
            mostrarError('Categoría no encontrada.');
        }
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        mostrarError('Error al obtener las categorías.');
    }
}

// Función para mostrar la categoría en el DOM
function mostrarCategoria(categoria) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
        <div class="card" style="width: auto;">
        <img src="${categoria.strCategoryThumb}" alt="${categoria.strCategory}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Categoría: ${categoria.strCategory}</h5>
            <p class="card-text">${categoria.strCategoryDescription}</p>
            <a href="#recipeForm" class="btn btn-primary">Busca otra receta</a>
        </div>
</div>
    `;
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `<p id="error">${mensaje}</p>`;
}

// Manejo del formulario
document.getElementById('recipeForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const idCategory = document.getElementById('categoryId').value.trim();

    // Validación adicional de la entrada (debe ser numérica)
    if (isNaN(idCategory) || idCategory === "") {
        mostrarError('Por favor, ingrese un ID de categoría válido.');
    } else {
        buscarCategoriasPorId(idCategory);
    }
});
