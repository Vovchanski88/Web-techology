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

    const jobGrid = document.querySelector(".job-grid");
    const jobCount = document.getElementById("job-count");

    const urlParams = new URLSearchParams(window.location.search);
    const selectedCompany = urlParams.get("company");
    const selectedIndustry = urlParams.get("industry");

    if (selectedIndustry) {
        document.getElementById("industry").value = selectedIndustry;
    }

    jobCount.textContent = vacancies.length;

    function displayVacancies(filteredVacancies) {
        jobGrid.innerHTML = "";
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

        // Функціонал кнопки "Подати заяву"
        document.querySelectorAll(".apply-button").forEach(button => {
            button.addEventListener("click", function () {
                this.textContent = "Подано";
                this.disabled = true;
                alert("Ваша заявка успішно подана!");
            });
        });
    }

    function saveJobToHistory(job) {
        const jobHistory = JSON.parse(localStorage.getItem('jobHistory')) || [];
        const alreadyInHistory = jobHistory.some(savedJob => savedJob.link === job.link);

        if (!alreadyInHistory) {
            jobHistory.push({ ...job, appliedDate: null });  // додаємо вакансію в історію без дати подачі
            localStorage.setItem('jobHistory', JSON.stringify(jobHistory));
        }
    }

    // Фільтрація вакансій
    function filterJobs() {
        let minSalary = parseInt(document.getElementById("salary-min").value) || 0;
        let maxSalary = parseInt(document.getElementById("salary-max").value) || Infinity;
        let selectedIndustry = document.getElementById("industry").value;
        let selectedCity = document.getElementById("city").value;
        let selectedCompany = document.getElementById("company").value;

        let filteredJobs = vacancies.filter(job => {
            return (
                (job.salary >= minSalary && job.salary <= maxSalary) &&
                (selectedIndustry === "all" || job.position.toLowerCase().includes(selectedIndustry)) &&
                (selectedCity === "all" || job.city === selectedCity) &&
                (selectedCompany === "all" || job.company === selectedCompany)
            );
        });

        displayVacancies(filteredJobs);
    }

    if (selectedCompany) {
        document.getElementById("company").value = selectedCompany;
    }

    let filteredVacancies = vacancies;
    if (selectedCompany) {
        filteredVacancies = vacancies.filter(job => job.company === selectedCompany);
    }
    displayVacancies(filteredVacancies);

    document.getElementById("salary-min").addEventListener("input", filterJobs);
    document.getElementById("salary-max").addEventListener("input", filterJobs);
    document.getElementById("industry").addEventListener("change", filterJobs);
    document.getElementById("city").addEventListener("change", filterJobs);
    document.getElementById("company").addEventListener("change", filterJobs);
    filterJobs()

    // Функція для сортування вакансій
    function sortJobs(criteria) {
        let sortedJobs = [...vacancies];

        if (criteria === "salary") {
            sortedJobs.sort((a, b) => b.salary - a.salary); // Спаданням за зарплатою
        } else if (criteria === "date") {
            sortedJobs.sort((a, b) => new Date(b.date) - new Date(a.date)); // Спаданням за датою
        }

        displayVacancies(sortedJobs);
    }
    document.querySelector(".filter-icon").addEventListener("click", function () {
        document.getElementById("filter-container").classList.toggle("show");
    });

    // Додаємо обробники подій для сортування та фільтрів
    document.getElementById("sort-filter").addEventListener("change", function () {
        sortJobs(this.value);
    })

    // Збереження вакансії в історії при переході на деталі
    const jobLinks = document.querySelectorAll(".job-card a");
    jobLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const jobLink = event.target.closest('a').getAttribute('href');
            const job = vacancies.find(job => job.link === jobLink);
            saveJobToHistory(job);
        });
    });

});