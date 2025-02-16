document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.querySelector('.no-btn');
    const yesBtn = document.querySelector('.yes-btn');
    const usagiImg = document.querySelector('.usagi-img');
    const container = document.querySelector('.container');
    const musicBtn = document.querySelector('.music-btn');
    const bgm = document.querySelector('#bgm');
    let noCount = 0;
    let isMusicPlaying = false;
    
    // 预定义"不要"按钮的位置
    const positions = [
        { x: '20%', y: '70%' },
        { x: '70%', y: '60%' },
        { x: '40%', y: '80%' },
        { x: '80%', y: '40%' },
        { x: '30%', y: '50%' },
        { x: '60%', y: '30%' },
        { x: '50%', y: '20%' },
        { x: '20%', y: '30%' },
    ];
    let currentPosIndex = 0;
    
    // 创建音乐提示
    const tip = document.createElement('div');
    tip.textContent = '点击页面任何位置开始播放音乐 ♪';
    tip.style.position = 'fixed';
    tip.style.top = '10px';
    tip.style.left = '50%';
    tip.style.transform = 'translateX(-50%)';
    tip.style.padding = '10px 20px';
    tip.style.background = 'rgba(255, 105, 180, 0.8)';
    tip.style.color = 'white';
    tip.style.borderRadius = '20px';
    tip.style.zIndex = '1000';
    tip.style.boxShadow = '0 2px 10px rgba(255, 105, 180, 0.3)';
    tip.style.fontSize = '14px';
    document.body.appendChild(tip);
    
    // 5秒后淡出提示
    setTimeout(() => {
        tip.style.transition = 'opacity 0.5s';
        tip.style.opacity = '0';
        setTimeout(() => {
            tip.remove();
        }, 500);
    }, 5000);
    
    // 尝试播放音乐
    function tryPlayMusic() {
        bgm.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.add('playing');
            tip.style.display = 'none'; // 音乐开始播放后隐藏提示
        }).catch(error => {
            console.log('需要用户交互才能播放音乐');
        });
    }
    
    // 监听页面点击事件来开始播放
    document.addEventListener('click', function startMusic() {
        if (!isMusicPlaying) {
            tryPlayMusic();
        }
    });
    
    // 音乐控制按钮
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止触发页面的点击事件
        if (!isMusicPlaying) {
            tryPlayMusic();
        } else {
            bgm.pause();
            musicBtn.classList.remove('playing');
            isMusicPlaying = false;
        }
    });
    
    // 创建漂浮的心形
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animation = 'floatUp 4s linear forwards';
        heart.style.opacity = '0.6';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
    
    // 每3秒创建一个心形
    setInterval(createHeart, 3000);
    
    // "不要"按钮的新效果
    function moveButton(event) {
        // 阻止默认行为
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        noCount++;
        
        // 如果点击次数达到5次，隐藏"不要"按钮，放大"可以"按钮
        if (noCount >= 5) {
            noBtn.style.display = 'none';
            yesBtn.style.transform = 'scale(1.5)';
            yesBtn.style.animation = 'pulse 1s infinite';
            return;
        }
        
        // 获取可见区域的尺寸
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const buttonHeight = noBtn.offsetHeight;
        const buttonWidth = noBtn.offsetWidth;
        
        // 计算安全区域
        const safeAreaTop = viewportHeight * 0.2;
        const safeAreaBottom = viewportHeight * 0.8;
        const safeAreaLeft = viewportWidth * 0.1;
        const safeAreaRight = viewportWidth * 0.9;
        
        // 立即切换到新位置
        currentPosIndex = (currentPosIndex + 1) % positions.length;
        const pos = positions[currentPosIndex];
        
        // 将百分比转换为实际像素
        const xPercent = parseInt(pos.x) / 100;
        const yPercent = parseInt(pos.y) / 100;
        
        // 计算实际位置，确保在安全区域内
        const x = Math.min(Math.max(safeAreaLeft, viewportWidth * xPercent - buttonWidth/2), safeAreaRight - buttonWidth);
        const y = Math.min(Math.max(safeAreaTop, viewportHeight * yPercent - buttonHeight/2), safeAreaBottom - buttonHeight);
        
        // 应用新位置
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        
        // 乌萨其表情变化
        usagiImg.src = './images/usagi-sad.png';
        setTimeout(() => {
            usagiImg.src = './images/usagi-normal.png';
        }, 300);
    }

    // 初始化"不要"按钮样式
    noBtn.style.position = 'fixed';
    // 设置初始位置
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const buttonHeight = noBtn.offsetHeight;
    const buttonWidth = noBtn.offsetWidth;
    const initialX = viewportWidth * 0.2 - buttonWidth/2;
    const initialY = viewportHeight * 0.7 - buttonHeight/2;
    noBtn.style.left = initialX + 'px';
    noBtn.style.top = initialY + 'px';

    // 简化事件监听，只保留最必要的
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // 防止触发点击事件
        moveButton(e);
    });
    
    // 防止按钮被点击时触发其他事件
    noBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    // "可以"按钮的点击效果
    yesBtn.addEventListener('click', () => {
        // 创建烟花效果
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 100);
        }
        
        container.innerHTML = `
            <div class="usagi">
                <img src="./images/usagi-happy.png" alt="开心的乌萨其" class="usagi-img">
            </div>
            <div class="question">
                <h1>耶！我们在一起啦！ 🎉</h1>
            </div>
        `;
    });
    
    // 添加鼠标跟随效果
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const usagiRect = usagiImg.getBoundingClientRect();
        const usagiX = usagiRect.left + usagiRect.width / 2;
        const usagiY = usagiRect.top + usagiRect.height / 2;
        
        const angle = Math.atan2(mouseY - usagiY, mouseX - usagiX);
        const rotation = angle * (180 / Math.PI);
        
        usagiImg.style.transform = `rotate(${rotation * 0.1}deg)`;
    });
}); 