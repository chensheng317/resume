// 数字跳动动画功能
$(document).ready(function () {
    console.log('Counter animation script loaded');

    // 数字滚动动画函数
    function animateCounter(elementId, targetNumber, duration = 2000) {
        const element = $(elementId);
        if (!element.length) {
            console.log('Counter element not found:', elementId);
            return;
        }

        // 目标数字187.43，根据HTML结构（3位整数+小数点+2位小数）设置目标数字
        const targetDigits = [1, 8, 7, 4, 3];
        const counterElements = element.find('.counter-digit');

        console.log('Found counter elements:', counterElements.length);

        // 为每个数字元素添加随机跳动效果
        counterElements.each(function (index, digitElement) {
            // 确保我们有对应的目标数字
            if (index >= targetDigits.length) {
                console.log('Skipping index', index, 'as it exceeds target digits length');
                return;
            }

            let currentDigit = 0;
            const targetDigit = targetDigits[index];
            const startTime = performance.now();

            console.log('Animating digit at index', index, 'to target', targetDigit);

            function updateDigit(currentTime) {
                const elapsedTime = currentTime - startTime;
                let progress = Math.min(elapsedTime / duration, 1);

                // 使用缓动函数使动画更自然
                progress = 1 - Math.pow(1 - progress, 3);

                // 计算当前应该显示的数字
                if (progress < 0.8) {
                    // 前80%的时间快速随机跳动
                    currentDigit = Math.floor(Math.random() * 10);
                    $(digitElement).text(currentDigit);
                    requestAnimationFrame(updateDigit);
                } else {
                    // 最后20%的时间逐渐接近目标数字
                    // 根据剩余进度计算应该显示的数字
                    const remainingProgress = (progress - 0.8) / 0.2;
                    const currentStep = Math.min(Math.floor(remainingProgress * 10), 9);

                    // 计算从0到目标数字的路径
                    const digitsPath = [];
                    for (let i = 0; i <= 9; i++) {
                        digitsPath.push(Math.floor(i * (targetDigit / 9)));
                    }

                    currentDigit = digitsPath[currentStep];
                    $(digitElement).text(currentDigit);

                    if (progress < 1) {
                        requestAnimationFrame(updateDigit);
                    } else {
                        // 确保显示最终正确的数字
                        $(digitElement).text(targetDigit);

                        // 所有数字都到达目标后，添加最终效果
                        if (index === counterElements.length - 1) {
                            setTimeout(() => {
                                console.log('Animation completed, adding final glow');
                                element.find('.counter-digit').addClass('final-glow');
                            }, 100);
                        }
                    }
                }
            }

            requestAnimationFrame(updateDigit);
        });
    }

    // 检测元素是否在视口中的函数
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0;

        return isVisible;
    }

    // 监听滚动事件，当数字显示屏进入视口时触发动画
    let animationTriggered = false;
    let wasInViewport = false;

    function checkCounterDisplay() {
        const counterDisplay = document.getElementById('counter-display-section');

        if (!counterDisplay) {
            console.log('Counter display section not found');
            return;
        }

        const isInViewport = isElementInViewport(counterDisplay);
        
        // 当元素从视口中移出时，重置动画触发状态
        if (!isInViewport && wasInViewport) {
            console.log('Counter display left viewport, resetting animation');
            animationTriggered = false;
            // 重置数字显示为000.00
            $(counterDisplay).find('.counter-digit').text('0').removeClass('final-glow');
        }
        
        // 当元素进入视口且动画未触发时，触发动画
        if (isInViewport && !animationTriggered) {
            console.log('Triggering counter animation');
            animateCounter('#counter-display', 18743, 3000);
            animationTriggered = true;
        }
        
        // 更新视口状态
        wasInViewport = isInViewport;
    }

    // 添加窗口滚动事件监听
    $(window).on('scroll', checkCounterDisplay);

    // 初始检查
    setTimeout(checkCounterDisplay, 1000); // 稍微延迟检查，确保页面元素完全加载
});