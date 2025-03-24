document.addEventListener("DOMContentLoaded", function () {
    const newResumeBtn = document.getElementById('newResumeBtn');
    const uploadResumeBtn = document.getElementById('uploadResumeBtn');
    const newResumeModal = document.getElementById('newResumeModal');
    const uploadResumeModal = document.getElementById('uploadResumeModal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const resumeContainer = document.getElementById('resumeContainer');

    // Мапування професій на людські назви
    const professionMapping = {
        developer: "Розробник",
        designer: "Дизайнер",
        manager: "Менеджер",
        marketing: "Маркетинг",
        sales: "Продажі",
        support: "Підтримка",
        finance: "Фінанси",
        hr: "HR"
    };

    // Функція для закриття модального вікна
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Відкриваємо модальне вікно для створення нового резюме
    newResumeBtn.addEventListener('click', () => {
        newResumeModal.style.display = 'block';
    });

    // Відкриваємо модальне вікно для завантаження резюме з файлу
    uploadResumeBtn.addEventListener('click', () => {
        uploadResumeModal.style.display = 'block';
    });

    // Закриваємо модальні вікна
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(newResumeModal);
            closeModal(uploadResumeModal);
        });
    });

    // Закриваємо модальне вікно, якщо користувач клікне поза вікном
    window.addEventListener('click', (event) => {
        if (event.target === newResumeModal) {
            closeModal(newResumeModal);
        }
        if (event.target === uploadResumeModal) {
            closeModal(uploadResumeModal);
        }
    });

    // Збереження резюме в localStorage
    function saveResumesToLocal(resumes) {
        localStorage.setItem('resumes', JSON.stringify(resumes));
    }

    // Завантажуємо всі резюме з localStorage
    function loadResumesFromLocal() {
        const storedResumes = localStorage.getItem('resumes');
        return storedResumes ? JSON.parse(storedResumes) : [];
    }

    // Функція для додавання нового резюме
    const newResumeForm = document.getElementById('newResumeForm');
    newResumeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const profession = document.getElementById('profession').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;

        const newResume = {
            profession: profession,
            experience: experience,
            skills: skills,
            datePosted: new Date().toLocaleDateString(),
            id: new Date().getTime() // унікальний ID для кожного резюме
        };

        const resumes = loadResumesFromLocal();
        resumes.push(newResume);
        saveResumesToLocal(resumes);

        renderResumes();  // Перерисовуємо всі резюме після додавання
        closeModal(newResumeModal);
    });

    // Завантажуємо резюме з файлу
    const uploadFileBtn = document.getElementById('uploadFileBtn');
    uploadFileBtn.addEventListener('click', () => {
        const fileInput = document.getElementById('resumeFile');
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            alert(`Завантажено резюме: ${file.name}`);
            closeModal(uploadResumeModal);
        } else {
            alert('Будь ласка, виберіть файл для завантаження');
        }
    });

    // Функція для рендерингу резюме
    function renderResumes() {
        resumeContainer.innerHTML = ''; // Очищаємо контейнер перед рендерингом
        const resumes = loadResumesFromLocal();

        resumes.forEach(resume => {
            const resumeCard = document.createElement('div');
            resumeCard.classList.add('resume-card');
            resumeCard.dataset.id = resume.id;  // Додаємо ID до кожної картки резюме
            const professionName = professionMapping[resume.profession] || resume.profession;
            resumeCard.innerHTML = `
                <div class="resume-header">
                    <h2>${professionName}</h2>
                    <span class="tag standard">Нове резюме</span>
                </div>
                <p class="meta">Розміщено ${resume.datePosted} · <a href="#" class="job-link">Підібрати вакансії</a> · <a href="#" class="details-btn">Ще</a> · <a href="#" class="delete-btn">Видалити</a></p>
                <div class="resume-footer">
                    <span class="views">0 покази</span>
                </div>
                <div class="details-container" style="display:none;">
                    <p>Детальна інформація: ${resume.experience}, ${resume.skills}</p>
                </div>
            `;
            resumeContainer.appendChild(resumeCard);
        });

        // Додаємо функціонал для кнопки "Ще"
        const detailsButtons = document.querySelectorAll(".details-btn");
        detailsButtons.forEach(button => {
            button.addEventListener("click", function (event) {
                event.preventDefault(); // Запобігаємо переходу за лінком
                const detailsContainer = this.closest('.resume-card').querySelector('.details-container');
                detailsContainer.style.display = detailsContainer.style.display === "none" ? "block" : "none";
            });
        });

        // Функціонал для кнопки "Підібрати вакансії"
        const jobLinks = document.querySelectorAll(".job-link");
        jobLinks.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Запобігаємо переходу за лінком
                const profession = this.closest('.resume-card').querySelector('h2').textContent;
                window.location.href = `vacancies.html?industry=${encodeURIComponent(profession)}`;
            });
        });

        // Функціонал для кнопки "Видалити"
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function (event) {
                event.preventDefault(); // Запобігаємо переходу за лінком
                const resumeCard = this.closest('.resume-card');
                const resumeId = resumeCard.dataset.id;

                let resumes = loadResumesFromLocal();
                resumes = resumes.filter(resume => resume.id !== parseInt(resumeId));
                saveResumesToLocal(resumes);

                resumeCard.remove();  // Видаляємо картку з екрану
            });
        });
    }

    // Завантажуємо резюме після завантаження сторінки
    renderResumes();
});
