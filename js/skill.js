// 证书点击交互功能
(function () {
    // 创建证书模态框DOM结构
    function createCertificateModal() {
        var modalHtml = `
                <div class="certificate-modal">
                    <div class="certificate-modal-content">
                        <div class="certificate-modal-close"><i class="fas fa-times"></i></div>
                        <h3 class="certificate-modal-title"></h3>
                        <img class="certificate-modal-image" src="" alt="证书图片">
                    </div>
                </div>
            `;
        $('body').append(modalHtml);
    }

    // 证书数据
    var certificatesData = [
        { title: 'NCRE计算机一级证书', image: './assets/skill_1.jpg' },
        { title: 'NCRE计算机二级JAVA证书', image: './assets/skill_2.png' },
        { title: '英语四级证书', image: './assets/skill_3.jpg' },
        { title: '初级会计资格证书', image: './assets/skill_4.jpg' },
        { title: 'CRA专业技能证书', image: './assets/skill_5.jpg' },
        { title: '英语六级证书', image: './assets/skill_6.jpg' }
    ];

    // 模态框状态
    var modalActive = false;

    // 初始化证书交互
    function initCertificateInteraction() {
        // 创建模态框
        createCertificateModal();

        var $modal = $('.certificate-modal');
        var $modalContent = $('.certificate-modal-content');
        var $modalTitle = $('.certificate-modal-title');
        var $modalImage = $('.certificate-modal-image');
        var $modalClose = $('.certificate-modal-close');

        // 为每个证书卡片添加点击事件
        $('.certificate-card').each(function (index) {
            $(this).on('click', function () {
                if (!modalActive) {
                    // 设置模态框内容
                    var certData = certificatesData[index] || certificatesData[0];
                    $modalTitle.text(certData.title);
                    $modalImage.attr('src', certData.image);
                    $modalImage.attr('alt', certData.title);

                    // 显示模态框
                    modalActive = true;
                    $modal.addClass('active');
                    // 防止页面滚动
                    $('body').css('overflow', 'hidden');
                }
            });
        });

        // 关闭按钮点击事件
        $modalClose.on('click', closeModal);

        // 点击模态框外部关闭
        $modal.on('click', function (e) {
            if (e.target === $modal[0]) {
                closeModal();
            }
        });

        // ESC键关闭模态框
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' && modalActive) {
                closeModal();
            }
        });

        // 关闭模态框函数
        function closeModal() {
            modalActive = false;
            $modal.removeClass('active');
            // 恢复页面滚动
            $('body').css('overflow', 'auto');
        }
    }

    // 当文档加载完成后初始化
    $(document).ready(function () {
        // 添加角落装饰元素到证书卡片
        $('.certificate-card').each(function () {
            $(this).append('<div class="corner"></div>');
        });

        // 初始化证书交互
        initCertificateInteraction();
    });
})();