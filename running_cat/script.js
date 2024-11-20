const img = document.getElementById('kitty');


const updateBorder = () => ({
    maxX: window.innerWidth - img.offsetWidth,
    maxY: window.innerHeight - img.offsetHeight,
});

let border = updateBorder();

img.addEventListener('mouseenter', () => {
    const randomX = Math.random() * border.maxX;
    const randomY = Math.random() * border.maxY;

    img.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

window.addEventListener('resize', () => {
    border = updateBorder();
});
