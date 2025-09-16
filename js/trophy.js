// 荣誉成果弹窗功能
// 1. 创建弹窗DOM结构
function createTrophyModal() {
    if ($('#trophy-modal').length === 0) {
        var modalHTML = `
                <div id="trophy-modal" class="trophy-modal">
                    <div class="trophy-modal-content">
                        <div class="trophy-modal-close"><i class="fas fa-times"></i></div>
                        <div class="trophy-modal-header">
                            <h3 class="trophy-modal-title"></h3>
                        </div>
                        <div class="trophy-modal-body">
                            <div class="trophy-modal-image">
                                <img src="" alt="荣誉图片">
                            </div>
                            <div>
                                <p class="trophy-modal-description" style="text-indent: 2em;">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        $('body').append(modalHTML);
    }
    return $('#trophy-modal');
}

// 2. 荣誉数据
var trophyData = [
    {
        title: '服务之星',
        image: './assets/trophy_1.jpg',
        description: '荣获上海立信会计金融学院文汇路校区SAC学生事务中心颁发的"服务之星"称号，表彰在学生事务服务工作中取得的杰出表现和奉献精神。在任职期间，积极参与各项学生服务活动，为同学们提供了优质的帮助和支持。'
    },
    {
        title: '优秀学生会干部',
        image: './assets/trophy_2.jpg',
        description: '被评为上海立信会计金融学院学生会"优秀学生会干部"，展现了卓越的领导能力和团队协作精神。在学生会工作中，组织并参与了多项大型校园活动，为丰富校园文化生活做出了重要贡献。'
    },
    {
        title: '优秀学生干部',
        image: './assets/trophy_3.jpg',
        description: '获得上海立信会计金融学院"优秀学生干部"荣誉称号，这是对在学生工作中表现突出的肯定。始终以高度的责任感和敬业精神投入到各项工作中，得到了老师和同学们的广泛认可。'
    },
    {
        title: '优秀学生奖学金一等奖',
        image: './assets/trophy_4.jpg',
        description: '获得上海立信会计金融学院"优秀学生奖学金一等奖"，表彰在学业上的优异成绩和全面发展。在学习中始终保持严谨的态度和刻苦的精神，取得了优异的学习成绩，同时积极参与各项课外活动。'
    },
    {
        title: '优秀共青团干部',
        image: './assets/trophy_5.jpg',
        description: '被评为上海立信会计金融学院"优秀共青团干部"，展现了作为共青团员的先进性和模范带头作用。积极组织和参与团组织的各项活动，为推动共青团工作的开展做出了积极贡献。'
    }
];

// 3. 弹窗状态控制
var modalActive = false;

// 4. 打开弹窗函数
function openTrophyModal(index) {
    if (modalActive) return;

    modalActive = true;
    var trophyModal = createTrophyModal();
    var data = trophyData[index];

    // 填充弹窗内容
    trophyModal.find('.trophy-modal-title').text(data.title);
    trophyModal.find('.trophy-modal-image img').attr('src', data.image);
    trophyModal.find('.trophy-modal-description').text(data.description);

    // 显示弹窗
    setTimeout(function () {
        trophyModal.addClass('active');
    }, 50);

    // 禁止背景滚动
    $('body').css('overflow', 'hidden');
}

// 5. 关闭弹窗函数
function closeTrophyModal() {
    if (!modalActive) return;

    var trophyModal = $('#trophy-modal');
    trophyModal.removeClass('active');

    // 动画结束后重置状态
    setTimeout(function () {
        modalActive = false;
        $('body').css('overflow', '');
    }, 300);
}

// 6. 绑定点击事件
$('.trophy-card').each(function (index) {
    $(this).on('click', function () {
        openTrophyModal(index);
    });
});

// 7. 绑定关闭事件
$(document).on('click', '.trophy-modal-close', function () {
    closeTrophyModal();
});

// 8. 点击弹窗外部关闭
$(document).on('click', '.trophy-modal', function (e) {
    if (e.target === this) {
        closeTrophyModal();
    }
});

// 9. ESC键关闭弹窗
$(document).on('keydown', function (e) {
    if (e.key === 'Escape' && modalActive) {
        closeTrophyModal();
    }
});