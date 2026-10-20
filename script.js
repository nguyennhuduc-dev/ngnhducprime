const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const popup = document.getElementById("popup");
const popupOverlay = document.getElementById("popupOverlay");
const closePopupBtn = document.getElementById("closePopup");
const wishBtn = document.getElementById("wishBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const exploreBtn = document.getElementById("exploreBtn");
const fireworkBtn = document.getElementById("fireworkBtn");

let musicPlaying = false;
let typingStarted = false;

startBtn.addEventListener("click", openGift);

function openGift() {
    if (!intro) return;

    intro.classList.add("hide");

    setTimeout(() => {
        intro.style.display = "none";
    }, 850);

    startEffects();
    playMusic();
}

function startEffects() {
    startTyping();

    setTimeout(() => {
        launchFirework(
            window.innerWidth * 0.25,
            window.innerHeight * 0.25
        );
    }, 500);

    setTimeout(() => {
        launchFirework(
            window.innerWidth * 0.75,
            window.innerHeight * 0.3
        );
    }, 900);
}

function playMusic() {
    if (!music) return;

    music.volume = 0.35;

    music.play()
        .then(() => {
            musicPlaying = true;
            updateMusicButton();
        })
        .catch(() => {
            musicPlaying = false;
            updateMusicButton();
        });
}

musicBtn.addEventListener("click", () => {
    if (!music) return;

    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
    } else {
        music.play()
            .then(() => {
                musicPlaying = true;
            })
            .catch(() => {
                alert("Hãy thêm file music.mp3 vào thư mục website.");
            });
    }

    updateMusicButton();
});

function updateMusicButton() {
    musicBtn.innerHTML = musicPlaying
        ? '<i class="fa-solid fa-volume-high"></i>'
        : '<i class="fa-solid fa-volume-xmark"></i>';
}

function startTyping() {
    if (typingStarted) return;

    typingStarted = true;

    const element = document.getElementById("typingText");

    if (!element) return;

    const text =
        "Mẹ yêu à, nhân ngày 20/10, con chúc mẹ luôn mạnh khỏe, vui vẻ và thật nhiều hạnh phúc. Cảm ơn mẹ vì đã luôn yêu thương, chăm sóc và dành cho con những điều tốt đẹp nhất. Con có thể không nói ra mỗi ngày, nhưng con luôn biết ơn và yêu thương mẹ rất nhiều. Chúc mẹ một ngày 20/10 thật ấm áp và tràn ngập niềm vui. Con yêu mẹ! ❤️";

    let index = 0;

    function type() {
        if (index >= text.length) return;

        element.textContent += text[index];

        index++;

        setTimeout(type, 35);
    }

    type();
}

wishBtn.addEventListener("click", () => {
    showPopup(
        "Gửi mẹ yêu của con 💗",
        "Chúc mẹ ngày 20/10 thật vui vẻ và hạnh phúc. Mong mẹ luôn mạnh khỏe, bình an và có thật nhiều niềm vui mỗi ngày. Cảm ơn mẹ vì tất cả những gì mẹ đã làm cho con. Con yêu mẹ rất nhiều!"
    );

    heartBurst();
});

surpriseBtn.addEventListener("click", () => {
    showPopup(
        "Một điều con muốn nói với mẹ 🎁",
        "Món quà này có thể nhỏ, nhưng tình cảm con dành cho mẹ thì không nhỏ chút nào. Cảm ơn mẹ vì đã luôn là người yêu thương và che chở cho con. Chúc mẹ 20/10 thật hạnh phúc! 💗"
    );

    heartBurst();
    launchMegaFireworks();
});

function showPopup(title, text) {
    document.getElementById("popupTitle").textContent = title;
    document.getElementById("popupText").textContent = text;

    popup.classList.add("show");
}

function closePopup() {
    popup.classList.remove("show");
}

closePopupBtn.addEventListener("click", closePopup);
popupOverlay.addEventListener("click", closePopup);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closePopup();
    }
});

exploreBtn.addEventListener("click", () => {
    document.getElementById("flowers").scrollIntoView({
        behavior: "smooth"
    });
});

fireworkBtn.addEventListener("click", launchMegaFireworks);

function createPetals() {
    const container = document.getElementById("petals");

    if (!container) return;

    for (let i = 0; i < 35; i++) {
        const petal = document.createElement("div");

        petal.className = "falling-petal";

        petal.style.left = Math.random() * 100 + "%";

        petal.style.animationDuration =
            7 + Math.random() * 8 + "s";

        petal.style.animationDelay =
            Math.random() * 8 + "s";

        petal.style.transform =
            `scale(${0.5 + Math.random() * 0.8})`;

        container.appendChild(petal);
    }
}

createPetals();

function createSparkles() {
    const container =
        document.getElementById("sparkles");

    if (!container) return;

    for (let i = 0; i < 45; i++) {
        const sparkle =
            document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.style.left =
            Math.random() * 100 + "%";

        sparkle.style.top =
            Math.random() * 100 + "%";

        sparkle.style.animationDelay =
            Math.random() * 3 + "s";

        container.appendChild(sparkle);
    }
}

createSparkles();

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function launchFirework(x, y) {
    const colors = [
        "#ff5c93",
        "#ff9fbd",
        "#ffd166",
        "#ffffff",
        "#c77dff"
    ];

    const color =
        colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 75; i++) {
        const angle =
            Math.PI * 2 * (i / 75);

        const speed =
            2 + Math.random() * 4;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: .012 + Math.random() * .012,
            color: color
        });
    }
}

function animateFireworks() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles =
        particles.filter(
            particle => particle.life > 0
        );

    particles.forEach(particle => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += .04;

        particle.life -= particle.decay;

        ctx.globalAlpha = particle.life;

        ctx.fillStyle = particle.color;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            2,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

function launchMegaFireworks() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    launchFirework(
        width * .2,
        height * .25
    );

    setTimeout(() => {
        launchFirework(
            width * .5,
            height * .2
        );
    }, 250);

    setTimeout(() => {
        launchFirework(
            width * .8,
            height * .25
        );
    }, 500);

    setTimeout(() => {
        launchFirework(
            width * .35,
            height * .35
        );
    }, 750);

    setTimeout(() => {
        launchFirework(
            width * .65,
            height * .35
        );
    }, 1000);
}

function heartBurst() {
    const symbols = [
        "♥",
        "♡",
        "💗",
        "💖",
        "💕"
    ];

    for (let i = 0; i < 25; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.className = "click-heart";

            heart.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];

            heart.style.left = "50vw";
            heart.style.top = "50vh";

            heart.style.fontSize =
                16 + Math.random() * 25 + "px";

            heart.style.setProperty(
                "--x",
                Math.random() * 500 - 250 + "px"
            );

            heart.style.setProperty(
                "--y",
                Math.random() * 500 - 350 + "px"
            );

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 1200);

        }, i * 35);
    }
}

document.addEventListener("click", event => {

    if (
        event.target.closest("button") ||
        event.target.closest("a")
    ) {
        return;
    }

    createClickHeart(
        event.clientX,
        event.clientY
    );
});

function createClickHeart(x, y) {

    const heart =
        document.createElement("div");

    heart.className = "click-heart";

    heart.textContent =
        Math.random() > .5 ? "♥" : "♡";

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    heart.style.setProperty(
        "--x",
        Math.random() * 100 - 50 + "px"
    );

    heart.style.setProperty(
        "--y",
        -80 - Math.random() * 80 + "px"
    );

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");

const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {
                        link.classList.add("active");
                    }
                });
            });
        },
        {
            threshold: .4
        }
    );

sections.forEach(section => {
    sectionObserver.observe(section);
});

const revealItems =
    document.querySelectorAll(
        ".flower-card, .memory-item, .wish-card, .quote"
    );

revealItems.forEach(item => {
    item.classList.add("reveal");
});

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: .15
        }
    );

revealItems.forEach(item => {
    revealObserver.observe(item);
});
