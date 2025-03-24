document.addEventListener("DOMContentLoaded", function () {
    const jobHistoryContainer = document.querySelector(".history-container");

    const jobHistory = JSON.parse(localStorage.getItem('jobHistory')) || [];

    jobHistory.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.classList.add("job-card-history");

        jobCard.innerHTML = `
            <div class="job-header">
                <h2>${job.position} - ${job.company}</h2>
                ${job.appliedDate ? `<span class="applied-tag">Вакансію подано ${job.appliedDate}</span>` : ''}
            </div>
            <p class="meta">Дата подачі: ${job.appliedDate ? job.appliedDate : "Ще не подано"} · <a href="${job.link}">Деталі вакансії</a></p>
            <button class="apply-history-btn" ${job.appliedDate ? 'disabled' : ''}>Подати заяву</button>
        `;

        const applyBtn = jobCard.querySelector(".apply-history-btn");

        if (job.appliedDate) {
            applyBtn.style.display = "none";  // Якщо заявка вже подана, кнопка не відображається
        }

        applyBtn.addEventListener("click", () => {
            const currentDate = new Date().toLocaleDateString();
            job.appliedDate = currentDate;
            localStorage.setItem('jobHistory', JSON.stringify(jobHistory));

            // Оновлюємо текст і деактивуємо кнопку
            applyBtn.textContent = "Заявка подана";
            applyBtn.disabled = true;
            applyBtn.style.display = "none";  // Ховаємо кнопку після подачі заявки

            // Оновлюємо повідомлення про подану заявку
            const appliedTag = jobCard.querySelector(".applied-tag");
            appliedTag.textContent = `Вакансію подано ${job.appliedDate}`;
        });

        jobHistoryContainer.appendChild(jobCard);
    });
});
