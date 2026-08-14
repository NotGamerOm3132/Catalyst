/* ========================================
   Testimonials Drag Scroll
======================================== */

const testimonialsScroll = document.querySelector(
    ".testimonials-scroll"
);

if (testimonialsScroll) {

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    /* Start dragging */

    testimonialsScroll.addEventListener("mousedown", (event) => {

        if (event.button !== 0) return;

        isDragging = true;

        startX = event.clientX;

        startScrollLeft = testimonialsScroll.scrollLeft;

        testimonialsScroll.classList.add("is-dragging");

    });


    /* Move */

    testimonialsScroll.addEventListener("mousemove", (event) => {

        if (!isDragging) return;

        const distance = event.clientX - startX;

        testimonialsScroll.scrollLeft =
            startScrollLeft - distance;

    });


    /* Stop dragging */

    window.addEventListener("mouseup", () => {

        if (!isDragging) return;

        isDragging = false;

        testimonialsScroll.classList.remove("is-dragging");

    });


    /* Safety reset */

    window.addEventListener("blur", () => {

        isDragging = false;

        testimonialsScroll.classList.remove("is-dragging");

    });

}