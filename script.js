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
        { x: '10%', y: '70%' },
        { x: '80%', y: '60%' },
        { x: '50%', y: '80%' },
        { x: '20%', y: '50%' },
        { x: '70%', y: '40%' },
        { x: '40%', y: '30%' },
        { x: '90%', y: '20%' },
        { x: '30%', y: '90%' },
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
        event.preventDefault();
        
        // 防止连续触发
        if (noBtn.style.opacity === '0') return;
        
        // 乌萨其表情变化
        usagiImg.src = './images/usagi-sad.png';
        
        // 按钮淡出
        noBtn.style.transition = 'all 0.3s ease';
        noBtn.style.opacity = '0';
        noBtn.style.transform = 'scale(0.8)';
        
        // 切换到新位置并淡入
        setTimeout(() => {
            currentPosIndex = (currentPosIndex + 1) % positions.length;
            noBtn.style.left = positions[currentPosIndex].x;
            noBtn.style.top = positions[currentPosIndex].y;
            
            setTimeout(() => {
                noBtn.style.opacity = '1';
                noBtn.style.transform = 'scale(1)';
                
                // 恢复乌萨其表情
                setTimeout(() => {
                    usagiImg.src = './images/usagi-normal.png';
                }, 300);
            }, 100);
        }, 300);
        
        noCount++;
        if (noCount >= 5) {
            yesBtn.style.transform = 'scale(1.5)';
            yesBtn.style.animation = 'pulse 1s infinite';
        }
        
        return false;
    }

    // 初始化"不要"按钮样式
    noBtn.style.position = 'fixed';
    noBtn.style.left = positions[0].x;
    noBtn.style.top = positions[0].y;
    noBtn.style.transition = 'all 0.3s ease';

    // 添加所有可能的事件监听
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton, { passive: false });
    noBtn.addEventListener('touchmove', moveButton, { passive: false });
    noBtn.addEventListener('click', moveButton);
    
    // 防止按钮被点击
    noBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        return false;
    });

    // 优化移动端体验
    document.addEventListener('touchmove', (e) => {
        if (e.target === noBtn) {
            e.preventDefault();
        }
    }, { passive: false });
    
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