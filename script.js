document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.querySelector('.no-btn');
    const yesBtn = document.querySelector('.yes-btn');
    const usagiImg = document.querySelector('.usagi-img');
    const container = document.querySelector('.container');
    const musicBtn = document.querySelector('.music-btn');
    const bgm = document.querySelector('#bgm');
    let noCount = 0;
    let isMusicPlaying = false;
    
    // 尝试自动播放
    function tryAutoplay() {
        bgm.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.add('playing');
        }).catch(error => {
            console.log('需要用户交互才能播放音乐');
        });
    }
    
    // 监听页面任何点击事件来开始播放
    document.addEventListener('click', function startMusic() {
        if (!isMusicPlaying) {
            tryAutoplay();
            document.removeEventListener('click', startMusic);
        }
    }, { once: true });
    
    // 页面加载时尝试自动播放
    tryAutoplay();
    
    // 音乐控制
    musicBtn.addEventListener('click', () => {
        if (!isMusicPlaying) {
            bgm.play();
            musicBtn.classList.add('playing');
            isMusicPlaying = true;
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
    
    // "不要"按钮的躲避效果
    noBtn.addEventListener('mouseover', () => {
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // 乌萨其表情变化
        usagiImg.src = './images/usagi-sad.png';
        setTimeout(() => {
            usagiImg.src = './images/usagi-normal.png';
        }, 500);
        
        noCount++;
        if (noCount >= 5) {
            noBtn.style.transform = 'scale(0.5)';
            yesBtn.style.transform = 'scale(1.5)';
        }
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
        
        // 播放庆祝音效
        const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
        audio.play().catch(e => console.log('无法播放音效'));
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