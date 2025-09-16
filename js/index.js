$(document).ready(function () {
    // 导航栏滚动效果
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('bg-dark');
            $('.navbar').removeClass('bg-transparent');
            $('.navbar').css('padding', '0.5rem 0');
        } else {
            $('.navbar').removeClass('bg-dark');
            $('.navbar').css('padding', '1rem 0');
        }
    });

    // 平滑滚动
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // 技能进度条动画
    function animateSkills() {
        $('.skill-progress-bar').each(function () {
            var width = $(this).data('width');
            $(this).animate({
                width: width
            }, 1500);
        });
    }

    // 元素视口检测动画
    function checkInView() {
        $('.animate').each(function () {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css('opacity', '1');
                $(this).css('transform', 'translateY(0)');
            }
        });

        // 检查技能区域是否在视图中
        var skillsSection = $('#certificates-skills');
        if (skillsSection.length) {
            var sectionTop = skillsSection.offset().top;
            var sectionBottom = sectionTop + skillsSection.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (sectionBottom > viewportTop && sectionTop < viewportBottom) {
                // 只执行一次
                if (!skillsSection.data('animated')) {
                    animateSkills();
                    skillsSection.data('animated', true);
                }
            }
        }
    }

    // 初始检查
    checkInView();

    // 滚动时检查
    $(window).scroll(function () {
        checkInView();
    });

    // 联系表单提交处理
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        alert('感谢您的留言，我会尽快回复您！');
        $(this)[0].reset();
    });

    // 音频播放器控制
    var audio = document.getElementById('background-music');
    var audioPlayer = document.getElementById('audio-player');
    var isPlaying = false;

    audioPlayer.addEventListener('click', function () {
        if (isPlaying) {
            audio.pause();
            audioPlayer.innerHTML = '<i class="fa fa-play"></i>';
        } else {
            audio.play();
            audioPlayer.innerHTML = '<i class="fa fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // 电子故事书翻页功能
    var bookCover = $('.book-cover');
    var pages = $('.page');
    var totalPages = pages.length;

    // 点击封面打开书籍
    function setupBookCoverClick() {
        bookCover.off('click').on('click', function () {
            $(this).fadeOut(500, function () {
                // 确保第一页有active类并且可见
                $('#page-1').addClass('active').fadeIn(500);
            });
        });
    }

    // 初始化封面点击事件
    setupBookCoverClick();

    // 上一页按钮点击事件
    $('.page-btn[id^="prev-"]').on('click', function () {
        var currentPageId = $(this).closest('.page').attr('id');
        var currentPageNum = parseInt(currentPageId.split('-')[1]);
        var prevPageNum = currentPageNum - 1;

        if (prevPageNum >= 1) {
            $(this).closest('.page').fadeOut(300, function () {
                $(this).removeClass('active');
                $('#page-' + prevPageNum).fadeIn(300).addClass('active');
            });
        }
    });

    // 下一页按钮点击事件
    $('.page-btn[id^="next-"]').on('click', function () {
        var currentPageId = $(this).closest('.page').attr('id');
        var currentPageNum = parseInt(currentPageId.split('-')[1]);
        var nextPageNum = currentPageNum + 1;

        if (nextPageNum <= totalPages) {
            $(this).closest('.page').fadeOut(300, function () {
                $(this).removeClass('active');
                $('#page-' + nextPageNum).fadeIn(300).addClass('active');
            });
        } else {
            // 如果是最后一页，返回封面
            $(this).closest('.page').fadeOut(500, function () {
                $(this).removeClass('active');
                bookCover.fadeIn(500, function() {
                    // 重新设置封面点击事件
                    setupBookCoverClick();
                });
            });
        }
    });

    // 个人简介图片切换功能
    var currentImageIndex = 0;
    var images = [
        './assets/person_1.jpg',
        './assets/person_2.jpg',
        './assets/person_3.jpg'
    ];
    var aboutImage = $('.about-image img');
    
    // 添加点击事件
    aboutImage.on('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        $(this).fadeOut(200, function() {
            $(this).attr('src', images[currentImageIndex]);
            $(this).fadeIn(200);
            $(this).css('height', '400');
        });
    });



    // 粒子背景效果
    function createParticles() {
        var canvas = document.createElement('canvas');
        canvas.id = 'particleCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var particles = [];
        var particleCount = 50;

        // 设置canvas尺寸
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // 创建粒子
        function initParticles() {
            particles = [];
            for (var i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: Math.random() * 0.5 - 0.25,
                    speedY: Math.random() * 0.5 - 0.25,
                    color: 'rgba(0, 240, 255, ' + (Math.random() * 0.5 + 0.2) + ')'
                });
            }
        }

        // 绘制粒子
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // 更新粒子位置
                p.x += p.speedX;
                p.y += p.speedY;

                // 边界检测
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            }

            // 连接接近的粒子
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0, 240, 255, ' + (1 - distance / 100) * 0.3 + ')';
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawParticles);
        }

        initParticles();
        drawParticles();
    }

    // 鼠标跟随粒子效果
    function createMouseParticles() {
        var canvas = document.createElement('canvas');
        canvas.id = 'mouseParticleCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var mouseParticles = [];
        var mouseX = 0;
        var mouseY = 0;

        // 设置canvas尺寸
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // 跟踪鼠标位置
        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // 创建鼠标跟随粒子
        function createMouseParticle() {
            mouseParticles.push({
                x: mouseX,
                y: mouseY,
                size: Math.random() * 5 + 2,
                speedX: (Math.random() - 0.5) * 3,
                speedY: (Math.random() - 0.5) * 3,
                color: 'rgba(' + Math.floor(Math.random() * 255) + ', 240, 255, ' + (Math.random() * 0.5 + 0.3) + ')',
                life: 100
            });
        }

        // 绘制鼠标跟随粒子
        function drawMouseParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < mouseParticles.length; i++) {
                var p = mouseParticles[i];
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // 更新粒子位置
                p.x += p.speedX;
                p.y += p.speedY;
                p.size *= 0.95;
                p.life--;

                // 移除死亡的粒子
                if (p.life <= 0) {
                    mouseParticles.splice(i, 1);
                    i--;
                }
            }

            requestAnimationFrame(drawMouseParticles);
        }

        // 定期创建鼠标跟随粒子
        setInterval(createMouseParticle, 50);
        drawMouseParticles();
    }

    // 启动粒子效果
    createParticles();
    createMouseParticles();
});