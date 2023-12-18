const segments = document.querySelectorAll(".segment");
segments.forEach((segment) => {
    const btn = segment.querySelector("button");
    const div = segment.querySelector(".article__content");
    btn.addEventListener("click", () => {
        segments.forEach((item) => {
            if (item != segment) {
                item.classList.remove("open");
            }
        });
        segment.classList.toggle("open");
    });
});
