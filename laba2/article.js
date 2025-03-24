document.addEventListener("DOMContentLoaded", function () {
    // Лічильник лайків
    let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0; // Зчитуємо з localStorage

    // Виводимо кількість лайків на сторінку
    document.getElementById('like-count').textContent = likeCount;

    // Обробник для кнопки "Лайк"
    document.querySelector('.like-btn').addEventListener('click', function() {
        likeCount++;
        document.getElementById('like-count').textContent = likeCount; // Оновлюємо лічильник на сторінці
        localStorage.setItem('likeCount', likeCount); // Зберігаємо нову кількість лайків в localStorage
        alert('Дякуємо за лайк!');
    });

    // Обробник для кнопки "Додати в обране"
    const favoriteButton = document.querySelector('.favorite-btn');
    const articleTitle = document.querySelector('h1').textContent; // Заголовок статті
    const articleUrl = window.location.href; // Поточна URL-адреса статті
    const articleImage = document.querySelector('img').src; // URL картинки статті
    const articleDescription = document.querySelector('p').textContent; // Короткий опис статті

    // Перевіряємо, чи стаття вже в обраному
    const favoriteArticles = JSON.parse(localStorage.getItem('favoriteArticles')) || [];
    const isAlreadyFavorite = favoriteArticles.some(article => article.title === articleTitle);

    // Показуємо повідомлення, якщо стаття вже в обраному
    if (isAlreadyFavorite) {
        const favoriteMessage = document.createElement('p');
        favoriteMessage.textContent = 'Цю статтю вже додано в обране.';
        document.querySelector('main').appendChild(favoriteMessage);
    }

    // Додавання статті в обране
    favoriteButton.addEventListener('click', function() {
        if (!isAlreadyFavorite) {
            const newArticle = {
                title: articleTitle,
                url: articleUrl,
                image: articleImage,
                description: articleDescription
            };
            favoriteArticles.push(newArticle);
            localStorage.setItem('favoriteArticles', JSON.stringify(favoriteArticles));
            alert('Статтю додано в обране!');
        } else {
            alert('Цю статтю вже додано в обране.');
        }
    });

    // Виведення коментарів, збережених в localStorage
    const commentList = document.querySelector('.comments-list');
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];

    savedComments.forEach(function(comment, index) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p><strong>Ви:</strong> ${comment.text}</p>
            <button class="delete-comment" data-index="${index}">Видалити</button>
        `;
        commentList.appendChild(commentElement);
    });

    // Обробка додавання коментаря
    const commentForm = document.querySelector('.comment-form');
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки
        const commentText = document.querySelector('#comment').value; // Текст коментаря
        if (commentText.trim() !== "") { // Перевірка, щоб коментар не був порожнім
            const newComment = {
                text: commentText
            };

            savedComments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(savedComments));

            // Додаємо новий коментар до списку
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <p><strong>Ви:</strong> ${commentText}</p>
                <button class="delete-comment" data-index="${savedComments.length - 1}">Видалити</button>
            `;
            commentList.appendChild(commentElement);
            document.querySelector('#comment').value = ''; // Очищаємо поле коментаря
        } else {
            alert('Будь ласка, введіть текст коментаря.');
        }
    });

    // Обробка видалення коментаря
    commentList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-comment')) {
            const index = event.target.getAttribute('data-index');
            savedComments.splice(index, 1); // Видаляємо коментар з масиву
            localStorage.setItem('comments', JSON.stringify(savedComments)); // Оновлюємо localStorage
            event.target.parentElement.remove(); // Видаляємо коментар з DOM
        }
    });
});
