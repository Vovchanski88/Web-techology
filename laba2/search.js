document.addEventListener("DOMContentLoaded", function () {
    const vacancies = [
        {
            company: "SoftServe",
            city: "Київ",
            position: "Frontend Developer",
            requirements: "HTML, CSS, JavaScript, React",
            salary: 3000,
            date: "2025-03-20",
            logo: "https://info.softserveinc.com/hubfs/logo/softserve-logo-big.png",
            link: "job-detail-1.html"
        },
        {
            company: "Luxoft",
            city: "Львів",
            position: "Backend Developer",
            requirements: "Java, Spring, SQL",
            salary: 4000,
            date: "2025-03-18",
            logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/LUXOFT_DXC_logo.svg",
            link: "job-detail-2.html"
        },
        {
            company: "Miratech",
            city: "Одеса",
            position: "UI/UX Designer",
            requirements: "Figma, Sketch, Adobe XD",
            salary: 2500,
            date: "2025-03-15",
            logo: "https://chamber.ua/wp-content/uploads/2020/01/miratech.png",
            link: "job-detail-3.html"
        },
        {
            company: "DataArt",
            city: "Харків",
            position: "Data Analyst",
            requirements: "SQL, Power BI",
            salary: 3500,
            date: "2025-03-14",
            logo: "https://mostlovedworkplace.com/wp-content/uploads/2023/02/2_DataArt%20-%20Logo.png",
            link: "job-detail-4.html"
        },
        {
            company: "Intellias",
            city: "Дніпро",
            position: "Project Manager",
            requirements: "Agile, Scrum, Jira",
            salary: 4500,
            date: "2025-03-10",
            logo: "https://d17ocfn2f5o4rl.cloudfront.net/wp-content/uploads/2024/03/Momentum-release_SM-1.png",
            link: "job-detail-5.html"
        }
    ];

    const jobGrid = document.querySelector(".job-grid-search");
    const searchButton = document.getElementById("search-button");

    function displayVacancies(filteredVacancies) {
        jobGrid.innerHTML = "";
        if (filteredVacancies.length === 0) {
            jobGrid.innerHTML = "<p>На жаль, вакансії не знайдено за вашими критеріями.</p>";
        } else {
            filteredVacancies.forEach(job => {
                const jobCard = document.createElement("article");
                jobCard.classList.add("job-card");

                jobCard.innerHTML = `
                    <img src="${job.logo}" alt="${job.company}" class="company-logo">
                    <h3><a href="${job.link}">${job.position}</a></h3>
                    <p>Компанія: ${job.company}</p>
                    <p>Місто: ${job.city}</p>
                    <p>Вимоги: ${job.requirements}</p>
                    <p class="salary">Зарплата: $${job.salary}</p>
                    <p class="date">Дата публікації: ${job.date}</p>
                    <button class="apply-button">Подати заяву</button>
                `;
                jobGrid.appendChild(jobCard);
            });

            document.querySelectorAll(".apply-button").forEach(button => {
                button.addEventListener("click", function () {
                    this.textContent = "Подано";
                    this.disabled = true;
                    alert("Ваша заявка успішно подана!");
                });
            });
        }
    }

    function filterJobs() {
        const selectedCategory = document.getElementById("category").value.toLowerCase();
        const selectedCity = document.getElementById("city").value.toLowerCase(); // Нижній регістр для порівняння
        const minSalary = parseInt(document.getElementById("salary").value) || 0;

        const filteredJobs = vacancies.filter(job => {
            // Перевіряємо категорію частково у назві позиції
            const matchesCategory = selectedCategory === "all" || job.position.toLowerCase().includes(selectedCategory);
            // Перевірка міста, зробивши порівняння нечутливим до регістру
            const matchesCity = selectedCity === "all" || job.city.toLowerCase().includes(selectedCity);
            // Перевірка зарплати
            const matchesSalary = job.salary >= minSalary;

            return matchesCategory && matchesCity && matchesSalary;
        });

        displayVacancies(filteredJobs);
    }

    searchButton.addEventListener("click", function (event) {
        event.preventDefault(); // Запобігає перезавантаженню сторінки при натисканні на кнопку
        filterJobs();
    });
});
