document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENÚ RESPONSIVO ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- 2. LÓGICA DEL RELOJ ANALÓGICO ---
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');

    function setClock() {
        const currentDate = new Date();
        const secondsRatio = currentDate.getSeconds() / 60;
        const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
        const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

        if (secondHand) setRotation(secondHand, secondsRatio);
        if (minuteHand) setRotation(minuteHand, minutesRatio);
        if (hourHand) setRotation(hourHand, hoursRatio);
    }

    function setRotation(element, rotationRatio) {
        element.style.setProperty('transform', `translateX(-50%) rotate(${rotationRatio * 360}deg)`);
    }

    setClock();
    setInterval(setClock, 1000);

    // --- 3. PARTÍCULAS DORADAS FLOTANTES Y ALEATORIAS ---
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 70;
    const goldColor = 'rgba(197, 160, 89, ';

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6; // Movimiento aleatorio en X
            this.speedY = (Math.random() - 0.5) * 0.6; // Movimiento aleatorio en Y
            this.opacity = Math.random() * 0.5 + 0.2;
            this.angle = Math.random() * Math.PI * 2;
        }

        update() {
            this.angle += 0.02;
            this.x += this.speedX + Math.sin(this.angle) * 0.3;
            this.y += this.speedY + Math.cos(this.angle) * 0.3;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = goldColor + this.opacity + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // --- 4. FILTRO DE PROYECTOS ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 5. SCROLL TOP & FORMULARIO ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = 'Enviando mensaje...';
            setTimeout(() => {
                formStatus.textContent = '✦ Tu mensaje ha sido enviado exitosamente.';
                contactForm.reset();
            }, 1200);
        });
    }
});