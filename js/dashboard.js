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