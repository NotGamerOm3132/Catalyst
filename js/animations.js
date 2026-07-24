const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    },
    {
        threshold: 0.15,
    }
);

document.querySelectorAll(".pop-up").forEach((element) => {
    observer.observe(element);
});