const dashboardMenuToggle = document.getElementById("dashboard-menu-toggle");
const dashboardSidebar = document.getElementById("dashboard-sidebar");
const dashboardDate = document.getElementById("dashboard-date");

function updateDashboardDate() {
    if (!dashboardDate) return;

    const today = new Date();

    dashboardDate.textContent = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function toggleDashboardSidebar() {
    if (!dashboardSidebar) return;

    dashboardSidebar.classList.toggle("is-open");
}

function closeDashboardSidebar() {
    if (!dashboardSidebar) return;

    dashboardSidebar.classList.remove("is-open");
}

if (dashboardMenuToggle) {
    dashboardMenuToggle.addEventListener(
        "click",
        toggleDashboardSidebar
    );
}

document.addEventListener("click", (event) => {
    if (!dashboardSidebar || !dashboardMenuToggle) return;

    const clickedInsideSidebar =
        dashboardSidebar.contains(event.target);

    const clickedMenuButton =
        dashboardMenuToggle.contains(event.target);

    if (
        window.innerWidth <= 900 &&
        dashboardSidebar.classList.contains("is-open") &&
        !clickedInsideSidebar &&
        !clickedMenuButton
    ) {
        closeDashboardSidebar();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeDashboardSidebar();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updateDashboardDate();
});
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("dashboard-sidebar");
    const toggle = document.getElementById("dashboard-menu-toggle");

    if (!sidebar || !toggle) return;

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("is-collapsed");

        const collapsed = sidebar.classList.contains("is-collapsed");

        toggle.setAttribute("aria-expanded", String(!collapsed));
        toggle.setAttribute(
            "aria-label",
            collapsed ? "Expand navigation" : "Collapse navigation"
        );
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.querySelector(".task-list");
    const taskItems = [...document.querySelectorAll(".task-item")];

    if (!taskList || !taskItems.length) return;

    const updateTask = (taskItem) => {
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        const checkboxVisual = taskItem.querySelector(".task-checkbox");

        if (!checkbox || !checkboxVisual) return;

        taskItem.classList.toggle("completed", checkbox.checked);

        checkboxVisual.innerHTML = checkbox.checked
            ? `<svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 4 4L19 6"></path>
               </svg>`
            : "";
    };

    const sortTasks = () => {
        const tasks = [...taskList.querySelectorAll(".task-item")];

        tasks.sort((a, b) => {
            const aCompleted = a.querySelector('input[type="checkbox"]').checked;
            const bCompleted = b.querySelector('input[type="checkbox"]').checked;

            return Number(bCompleted) - Number(aCompleted);
        });

        tasks.forEach((task) => {
            taskList.appendChild(task);
        });
    };

    taskItems.forEach((taskItem) => {
        const checkbox = taskItem.querySelector('input[type="checkbox"]');

        if (!checkbox) return;

        updateTask(taskItem);

        checkbox.addEventListener("change", () => {
            updateTask(taskItem);
            sortTasks();
        });
    });

    sortTasks();
});