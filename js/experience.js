// 时间线卡片点击显示图片功能
// 1. 存储每张卡片的图片数据
var timelineImagesData = {
    'student-experience': [
        // 心理委员
        ['./assets/exp_1_1.jpg', './assets/exp_1_2.png', './assets/exp_1_3.png'],
        // SAC创意开发部
        ['./assets/exp_2_1.jpg', './assets/exp_2_2.jpg', './assets/exp_2_3.jpg'],
        // 院学生会志愿服务部
        ['./assets/exp_3_1.png', './assets/exp_3_2.jpg', './assets/exp_3_3.jpg'],
        // 校学生会文体部
        ['./assets/exp_4_1.png', './assets/exp_4_2.jpg', './assets/exp_4_3.jpg'],   
        // 宣传部部长
        ['./assets/exp_5_1.jpg', './assets/exp_5_2.jpg', './assets/exp_5_3.jpg'],
        // 学习委员
        ['./assets/exp_6_1.jpg', './assets/exp_6_2.jpg', './assets/exp_6_3.jpg'],
    ],
    'internship-experience': [
        // 上海罗峰实业有限公司
        ['./assets/com_1_1.jpg', './assets/com_1_2.jpg', './assets/com_1_3.jpg'],
        // 中域工业互联网研究院
        ['./assets/com_2_1.jpg', './assets/com_2_2.jpg', './assets/com_2_3.jpg']
    ]
};

// 2. 为每个时间线卡片添加点击事件
$('.timeline-content').on('click', function () {
    var timelineContent = $(this);
    var timelineItem = timelineContent.parent();
    var sectionId = timelineItem.closest('section').attr('id');
    var cardIndex = timelineItem.index();

    // 检查是否已经存在图片容器
    var imagesContainer = timelineContent.next('.timeline-images-container');

    if (imagesContainer.length > 0) {
        // 如果存在图片容器，切换显示/隐藏状态
        var imageBoxes = imagesContainer.find('.timeline-image-box');
        var isActive = imageBoxes.first().hasClass('active');

        if (isActive) {
            // 隐藏图片
            imageBoxes.removeClass('active');
            setTimeout(function () {
                imagesContainer.remove();
            }, 300);
        } else {
            // 显示图片（如果之前是隐藏的但容器还在）
            imageBoxes.addClass('active');
        }
    } else {
        // 创建新的图片容器
        var imagesContainer = $('<div class="timeline-images-container"></div>');

        // 获取该卡片对应的图片数据
        var sectionImages = timelineImagesData[sectionId] || [];
        var cardImages = sectionImages[cardIndex] || ['./assets/person_1.jpg', './assets/person_2.jpg', './assets/person_3.jpg'];

        // 创建三个图片盒子
        for (var i = 0; i < 3; i++) {
            var imageBox = $('<div class="timeline-image-box"></div>');
            var img = $('<img src="' + cardImages[i] + '" alt="经历图片" />');

            imageBox.append(img);
            imagesContainer.append(imageBox);
        }

        // 添加到DOM
        timelineContent.after(imagesContainer);

        // 触发动画
        setTimeout(function () {
            imagesContainer.find('.timeline-image-box').addClass('active');
        }, 50);
    }
});