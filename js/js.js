// Защита от инспектирования
function preventInspect() {
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.addEventListener('keydown', function(e) {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
            (e.metaKey && e.altKey && e.keyCode === 73) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
            (e.metaKey && e.altKey && e.keyCode === 74) ||
            (e.ctrlKey && e.keyCode === 85) ||
            (e.metaKey && e.keyCode === 85)
        ) {
            e.preventDefault();
            return false;
        }
    });

    function detectDevTools() {
        if (window.outerWidth - window.innerWidth > 160 || 
            window.outerHeight - window.innerHeight > 160) {
            document.body.innerHTML = '';
            location.reload();
        }
    }

    setInterval(detectDevTools, 1000);
}

// Создание паутины
function createWeb() {
    const webContainer = document.createElement('div');
    webContainer.id = 'web';
    document.body.appendChild(webContainer);

    const numberOfNodes = 50;
    const nodes = [];

    // Создаем узлы паутины
    for (let i = 0; i < numberOfNodes; i++) {
        const node = document.createElement('div');
        node.className = 'web-node';
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        
        webContainer.appendChild(node);
        
        nodes.push({
            element: node,
            x,
            y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            connections: []
        });
    }

    // Создаем SVG для линий
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'web-lines';
    webContainer.appendChild(svg);

    function updateWeb() {
        // Обновляем позиции узлов
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Отражение от границ
            if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
            if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

            node.element.style.left = `${node.x}px`;
            node.element.style.top = `${node.y}px`;
        });

        // Очищаем старые линии
        svg.innerHTML = '';

        // Рисуем новые линии
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                const dx = otherNode.x - node.x;
                const dy = otherNode.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', node.x);
                    line.setAttribute('y1', node.y);
                    line.setAttribute('x2', otherNode.x);
                    line.setAttribute('y2', otherNode.y);
                    line.setAttribute('stroke', 'rgba(255, 0, 0, 0.1)');
                    line.setAttribute('stroke-width', '0.5');
                    svg.appendChild(line);
                }
            });
        });

        requestAnimationFrame(updateWeb);
    }

    // Обработка взаимодействия с мышью
    let mouseNode = null;
    document.addEventListener('mousemove', (e) => {
        if (!mouseNode) {
            mouseNode = {
                x: e.clientX,
                y: e.clientY
            };
        } else {
            mouseNode.x = e.clientX;
            mouseNode.y = e.clientY;
        }

        nodes.forEach(node => {
            const dx = mouseNode.x - node.x;
            const dy = mouseNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                node.vx += dx * 0.001;
                node.vy += dy * 0.001;
            }
        });
    });

    // Запускаем анимацию
    updateWeb();

    // Обновление размера SVG при изменении окна
    window.addEventListener('resize', () => {
        svg.setAttribute('width', window.innerWidth);
        svg.setAttribute('height', window.innerHeight);
    });

    // Устанавливаем начальный размер SVG
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
}

// Создание звезд
function createStars() {
    const starsContainer = document.getElementById('stars');
    const fragment = document.createDocumentFragment();
    const numberOfStars = 800;
    
    const starTypes = ['tiny', 'medium', 'bright'];
    const starColors = [
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 255, 255, 0.9)',
        'rgba(255, 250, 250, 0.95)',
        'rgba(255, 245, 245, 0.85)'
    ];
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = `star ${starTypes[Math.floor(Math.random() * starTypes.length)]}`;
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 3 + Math.random() * 4;
        const minOpacity = 0.2 + Math.random() * 0.2;
        const maxOpacity = 0.6 + Math.random() * 0.4;
        
        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            --duration: ${duration}s;
            --min-opacity: ${minOpacity};
            --max-opacity: ${maxOpacity};
            animation-delay: ${Math.random() * -duration}s;
            background-color: ${starColors[Math.floor(Math.random() * starColors.length)]};
        `;
        
        fragment.appendChild(star);
    }
    
    starsContainer.appendChild(fragment);
}

// Создание частиц
function createParticles() {
    const container = document.createElement('div');
    container.id = 'particles';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${20 + Math.random() * 20}s;
        `;
        
        fragment.appendChild(particle);
    }
    
    container.appendChild(fragment);
    document.body.appendChild(container);
}

// Обновление таймера
function updateCountdown() {
    const startDate = new Date('2025-04-02T15:00:00Z');
    const targetDate = new Date('2025-04-14T15:00:00Z');
    
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    let previousValues = {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    };
    
    function update() {
        const currentTime = Date.now();
        
        if (currentTime < startDate) {
            return;
        }
        
        const distance = targetDate - currentTime;
        
        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelector('.countdown').innerHTML = '<h2 class="ended">S62 Has Arrived</h2>';
            return;
        }

        const days = Math.floor(distance / 86400000);
        const hours = Math.floor((distance % 86400000) / 3600000);
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);

        Object.entries({days, hours, minutes, seconds}).forEach(([key, value]) => {
            const formattedValue = String(value).padStart(2, '0');
            if (previousValues[key] !== formattedValue) {
                const element = elements[key];
                element.classList.remove('updated');
                void element.offsetWidth;
                element.classList.add('updated');
                element.textContent = formattedValue;
                previousValues[key] = formattedValue;
            }
        });
    }
    
    update();
    const timerInterval = setInterval(update, 1000);
}

// Инициализация сайта
function initializeSite() {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const startButton = document.getElementById('start-button');
    const backgroundMusic = document.getElementById('background-music');

    startButton.addEventListener('click', () => {
        backgroundMusic.play()
            .then(() => {
                introScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.classList.add('fade-in');
                    
                    preventInspect();
                    createStars();
                    createParticles();
                    createWeb(); // Добавляем создание паутины
                    updateCountdown();
                }, 3000);
            })
            .catch(error => {
                console.error('Ошибка воспроизведения аудио:', error);
                introScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.classList.add('fade-in');
                    
                    preventInspect();
                    createStars();
                    createParticles();
                    createWeb(); // Добавляем создание паутины
                    updateCountdown();
                }, 3000);
            });
    });
}

document.addEventListener('DOMContentLoaded', initializeSite);
