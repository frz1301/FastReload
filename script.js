(() => {
    function injectReloadButton() {
        let minimizeBtn = document.querySelector('button[aria-label="Свернуть"]') || 
                          document.querySelector('button[aria-label="Minimize"]') ||
                          document.querySelector('[class*="TitleBar_button"]');
        
        if (!minimizeBtn || document.getElementById('sr-reload-root')) return;

        const root = document.createElement('div');
        root.id = 'sr-reload-root';

        const button = document.createElement('button');
        button.id = 'sr-reload-button';
        button.title = 'Перезагрузить (F5)';
        
        button.innerHTML = `
            <svg id="sr-reload-svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23,12A11,11,0,1,1,12,1a10.9,10.9,0,0,1,5.882,1.7l1.411-1.411A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707L16.42,4.166A8.9,8.9,0,0,0,12,3a9,9,0,1,0,9,9,1,1,0,0,1,2,0Z"/>
            </svg>
        `;

        // Функция запуска анимации и перезагрузки
        const handleReload = () => {
            const svg = document.getElementById('sr-reload-svg');
            const btn = document.getElementById('sr-reload-button');
            
            if (svg) svg.classList.add('sr-spinning');
            if (btn) btn.classList.add('sr-active-state'); // Подсвечиваем кнопку

            setTimeout(() => {
                location.reload();
            }, 500);
        };

        // Клик мышкой
        button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleReload();
        };

        button.ondblclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        root.appendChild(button);
        minimizeBtn.parentNode.insertBefore(root, minimizeBtn);

        // Слушатель клавиши F5
        window.addEventListener('keydown', (e) => {
            if (e.key === 'F5') {
                e.preventDefault(); // Отменяем стандартный мгновенный релоад
                handleReload();
            }
        }, { once: true }); // once: true предотвращает зацикливание при долго нажатой клавише
    }

    setInterval(injectReloadButton, 500);
})();