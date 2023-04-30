const songs = [{
    name: "Intro - Sky Decade",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/intro.mp3",
    art: "./assets/images/intro.jpg",
  },
  {
    name: "Cơn mưa xa dần",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/cmxd.mp3",
    art: "./assets/images/intro.jpg",
  },
  {
    name: "Nắng ấm ngang qua",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/nanq.mp3",
    art: "./assets/images/intro.jpg",
  },
  {
    name: "Có Chắc Yêu Là Đây",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/ccyld1.m4a",
    art: "./assets/images/ccyld1.jpg",
  },
  {
    name: "Remember Me - Onionn Remix",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/rmbm.mp3",
    art: "./assets/images/rmbm.jpg",
  },
  {
    name: "Có Chắc Yêu Là Đây - Onionn Remix",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/ccyld.mp3",
    art: "./assets/images/ccyld.jpg",
  },
  {
    name: "Chúng Ta Của Hiện Tại",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/ctcht.m4a",
    art: "./assets/images/ctcht.jpg",
  },
  {
    name: "Cơn Mưa Ngang Qua - Disco Version",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/cmnq.mp3",
    art: "./assets/images/cmnq.png",
  },
  {
    name: "Nơi này có anh",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/nnca.mp3",
    art: "./assets/images/nnca.jpg",
  },
  {
    name: "Em Của Ngày Hôm Qua",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/ecnhq.mp3",
    art: "./assets/images/ecnhq.png",
  },
  {
    name: "Muộn Rồi Mà Sao Còn",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/mrmsc.mp3",
    art: "./assets/images/mrmsc.jpg",
  },
  {
    name: "Muộn rồi mà sao còn - Disco Version",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/mrmsc1.mp3",
    art: "./assets/images/mrmsc.png",
  },
  {
    name: "There's No One At All",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/noaa.mp3",
    art: "./assets/images/noaa.jpg",
  },
  {
    name: "There's No One At All - Another Version",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/noaa1.mp3",
    art: "./assets/images/noaa1.jpg",
  },
  {
    name: "You Of Yesterday",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/yoy.mp3",
    art: "./assets/images/yoy.jpg",
  },
  {
    name: "Âm Thầm Bên Em",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/atbe.mp3",
    art: "./assets/images/atbe.jpg",
  },
  {
    name: "Chắc ai đó sẽ về",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/cadsv.mp3",
    art: "./assets/images/cadsv.jpg",
  },
  {
    name: "Một Năm Mới Bình An",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/mnmba.mp3",
    art: "./assets/images/mnmba.jpg",
  },
  {
    name: "Em của ngày hôm qua",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/ecnhq1.mp3",
    art: "./assets/images/ecnhq1.png",
  },
  {
    name: "Chúng ta không thuộc về nhau",
    author: "Sơn Tùng - MTP",
    path: "./assets/songs/ctktvn.mp3",
    art: "./assets/images/ctktvn.jpg",
  },
];

const audio = document.querySelector('audio');
const prev_btn = document.querySelector('#prev_btn');
const play_btn = document.querySelector('#play_btn');
const next_btn = document.querySelector('#next_btn');
const music_range = document.querySelector('#music_range');
const music_thumbnail = document.querySelector('.music_thumbnail');
const music_cd = document.querySelector('.music_cd');
const music_cd_img = document.querySelector('.music_cd_img');
const music_title = document.querySelector('.music_title h4');
const music_author = document.querySelector('.music_author h5');
const song_durartion = document.querySelector('.song_durartion');
const song_currentTime = document.querySelector('.song_currentTime');

const app = {
  songs,
  index: 0,
  isPlaying: false,
  timer: null,
  play() {
    if (this.isPlaying) {
      audio.pause();
      this.isPlaying = false;
      play_btn.children[0].setAttribute('class', 'fas fa-play');
    } else {
      audio.play();
      this.isPlaying = true;
      play_btn.children[0].setAttribute('class', 'fas fa-pause');
    }
    this.checkSongPlaying();
  },
  prevSong() {
    this.index--;
    if (this.index < 0) {
      this.index = songs.length - 1;
    }
    // Load lại bài hát + play
    this.getCurrentSong();
    audio.play();
    play_btn.children[0].setAttribute('class', 'fas fa-pause');
    this.checkSongPlaying();
  },
  nextSong() {
    this.index++;
    if (this.index > songs.length - 1) {
      this.index = 0;
    }
    // Load lại bài hát + play
    this.getCurrentSong();
    audio.play();
    play_btn.children[0].setAttribute('class', 'fas fa-pause');
    this.checkSongPlaying();
  },
  skipSong(value) {
    audio.currentTime = value
  },
  checkSongPlaying() {
    audio.onplay = () => {
      music_cd_img.classList.remove("pause");
      music_cd_img.classList.add("play");
      music_cd.style.right = "0%";
    }
    audio.onpause = () => {
      music_cd_img.classList.add('pause');
      music_cd.style.right = "16%";
    }
  },
  getCurrentSong() {
    audio.src = songs[this.index].path;
    music_thumbnail.style.backgroundImage = `url(${songs[this.index].art})`;
    music_title.innerText = songs[this.index].name;
    music_author.innerText = songs[this.index].author;


    setTimeout(() => {
      const {
        duration
      } = audio;
      music_range.min = 0;
      music_range.value = 0;
      music_range.max = Math.floor(duration);
      song_durartion.innerHTML = this.fortmatTimer(Math.floor(duration));
      song_currentTime.innerHTML = "00:00";
    }, 100)

  },
  fortmatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  },
  updateTime() {
    if (!audio.paused) {
      this.timer = setInterval(() => {
        let {
          currentTime, duration
        } = audio;
        music_range.value = Math.floor(currentTime);
        song_currentTime.innerHTML = this.fortmatTimer(currentTime);
        // Kiểm tra nếu hết bài thì next
        if (audio.ended) {
          this.nextSong();
        }
      }, 1000);
    } else {
      clearInterval(this.timer);
    }
  },
  handleEvents() {
    // Nhân nút play
    prev_btn.addEventListener('click', () => {
      this.prevSong();
      this.updateTime();
    });
    // Nhân nút play
    play_btn.addEventListener('click', () => {
      this.play();
      this.updateTime();
    });
    // Nhân nút play
    next_btn.addEventListener('click', () => {
      this.nextSong();
      this.updateTime();
    });
    // Tua bài hát
    music_range.addEventListener('input', (e) => {
      this.skipSong(e.target.value);
    });
  },
  start() {
    this.handleEvents();
    this.getCurrentSong();
  },
};

const myApp = app;

myApp.start();