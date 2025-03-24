document.addEventListener("DOMContentLoaded", function () {
    const favoritesList = JSON.parse(localStorage.getItem('favoriteArticles')) || [];
    const favoritesListElement = document.getElementById('favorites-list');

    // Якщо в обраному немає статей, показуємо повідомлення
    if (favoritesList.length === 0) {
        favoritesListElement.innerHTML = '<p>Немає обраних статей.</p>';
    } else {
        // Додаємо кожну статтю до списку
        favoritesList.forEach(function(article) {
            const articleElement = document.createElement('article');
            articleElement.classList.add('article-card');

            articleElement.innerHTML = `
        <a href="${article.url}">
          <img src="${article.image}" alt="${article.title}">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
        </a>
        <button class="remove-btn">Видалити</button>
      `;

            // Кнопка для видалення статті з обраного
            const removeButton = articleElement.querySelector('.remove-btn');
            removeButton.addEventListener('click', function() {
                removeFromFavorites(article.title);
                articleElement.remove(); // Видаляємо статтю зі списку на сторінці
            });

            favoritesListElement.appendChild(articleElement);
        });
    }

    // Функція для видалення статті з обраного
    function removeFromFavorites(articleTitle) {
        const updatedFavorites = favoritesList.filter(function(article) {
            return article.title !== articleTitle;
        });
        localStorage.setItem('favoriteArticles', JSON.stringify(updatedFavorites));
    }
});
