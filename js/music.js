// 音频播放器功能
const audioPlayer = document.getElementById('audio-player');
const backgroundMusic = document.getElementById('background-music');
const playIcon = audioPlayer.querySelector('i');

audioPlayer.addEventListener('click', function () {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(function (error) {
      console.log('音频播放失败:', error);
    });
    audioPlayer.classList.add('playing');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    backgroundMusic.pause();
    audioPlayer.classList.remove('playing');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
});

// 监听音频播放状态
backgroundMusic.addEventListener('ended', function () {
  audioPlayer.classList.remove('playing');
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
});