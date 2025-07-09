document.addEventListener('DOMContentLoaded', () => {
    const artistsData = [
        { name: 'Henrique & Juliano', image: './img/artista-henrique-juliano.png' },
        { name: 'Jorge & Mateus', image: './img/artista-jorge-mateus.png' },
        { name: 'Zé Neto & Cristiano', image: './img/artista-ze-neto-cristiano.png' },
        { name: 'Gusttavo Lima', image: './img/artista-gusttavo-lima.png' },
        { name: 'Luan Santana', image: './img/artista-luan-santana.png' },
        { name: 'Matheus & Kauan', image: './img/artista-matheus-kauan.png' }
    ];

    const albumsData = [
        {
            name: 'O Céu Explica Tudo (Ao Vivo)',
            artist: 'Henrique & Juliano',
            image: './img/album-ceu-explica.png',
            tracks: [
                { title: 'Vidinha de Balada', file: './music/henrique-juliano-vidinha-de-balada.mp3' },
                { title: 'Aquela Pessoa', file: './music/henrique-juliano-aquela-pessoa.mp3' },
                { title: '5 km', file: './music/henrique-juliano-5km.mp3' }
            ]
        },
        {
            name: 'Nada como um dia após o outro',
            artist: 'Racionais',
            image: './img/album-vida-loka.png',
            tracks: [
                { title: 'Vida Loka Pt.1', file: './music/racionais-mc-vida-loka-pt-1.mp3' },
                { title: 'Jesus Chorou', file: './music/racionais-mc-jesus-chorou.mp3' },
                { title: 'Negro Drama', file: './music/racionais-mc-negro-drama.mp3' }
            ]
        },
        {
            name: 'HIT ME HARD AND SOFT',
            artist: 'Billie Eilish',
            image: './img/album-hit-me.png',
            tracks: [
                { title: 'SKINNY', file: './music/billie-eilish-skinny.mp3' },
                { title: 'CHIHIRO', file: './music/billie-eilish-chihiro.mp3' },
                { title: 'BIRDS OF A FEATHER', file: './music/billie-eilish-birds-a-feather.mp3' }
            ]
        },
        {
            name: 'CAJU',
            artist: 'Liniker',
            image: './img/album-caju.png',
            tracks: [
                { title: 'AO TEU LADO', file: './music/liniker-ao-teu-lado.mp3' },
                { title: 'NEGONA DOS OLHOS TERRÍVEIS', file: './music/liniker-negona-dos-olhos-terriveis.mp3' },
                { title: 'PAPO DE EDREDOM', file: './music/liniker-papo-de-edredom.mp3' }
            ]
        },
        {
            name: 'Exclusive',
            artist: 'Chris Brown',
            image: './img/album-exclusive.jpg',
            tracks: [
                { title: 'GIMME THAT REMIX', file: './music/chris-brown-gimme-that-remix-ft-lil-wayne.mp3' },
                { title: 'KISS KISS', file: './music/chris-brown-kiss-kiss.mp3' },
                { title: 'YO', file: './music/chris-brown-yo.mp3' }
            ]
        }
    ];

    const artistGrid = document.querySelector('.artists-grid');
    const albumsGrid = document.querySelector('.albums-grid');
    const player = document.getElementById('player');
    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseIcon = playPauseButton.querySelector('i');
    const repeatButton = document.getElementById('repeatButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const volumeControl = document.getElementById('volumeControl');
    const currentTrackName = document.getElementById('current-track-name');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const albumCover = document.getElementById('album-cover');
    const themeCheckbox = document.getElementById('themeCheckbox');
    const body = document.body;

    let isRepeating = false;
    let isShuffling = false;
    let currentPlaylist = [];
    let currentTrackIndex = 0;
    let currentAlbumImage = './img/default-cover.png';
    let currentAlbumIndex = 0;

    // Tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeCheckbox) themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    function playCurrentTrack() {
        const track = currentPlaylist[currentTrackIndex];
        if (track && track.file) {
            player.src = track.file;
            player.play();
            currentTrackName.textContent = track.title;
            playPauseIcon.classList.replace('bx-play', 'bx-pause');
            albumCover.src = currentAlbumImage || './img/default-cover.png';
        }
    }

    playPauseButton.addEventListener('click', () => {
        if (player.paused) {
            player.play();
            playPauseIcon.classList.replace('bx-play', 'bx-pause');
        } else {
            player.pause();
            playPauseIcon.classList.replace('bx-pause', 'bx-play');
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentTrackIndex < currentPlaylist.length - 1) {
            currentTrackIndex++;
        } else {
            // Pula para o próximo álbum
            currentAlbumIndex = (currentAlbumIndex + 1) % albumsData.length;
            currentPlaylist = albumsData[currentAlbumIndex].tracks;
            currentAlbumImage = albumsData[currentAlbumIndex].image;
            currentTrackIndex = 0;
        }
        playCurrentTrack();
    });

    prevButton.addEventListener('click', () => {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
        } else {
            // Volta para o álbum anterior
            currentAlbumIndex = (currentAlbumIndex - 1 + albumsData.length) % albumsData.length;
            currentPlaylist = albumsData[currentAlbumIndex].tracks;
            currentAlbumImage = albumsData[currentAlbumIndex].image;
            currentTrackIndex = currentPlaylist.length - 1;
        }
        playCurrentTrack();
    });

    repeatButton.addEventListener('click', () => {
        isRepeating = !isRepeating;
        repeatButton.style.color = isRepeating ? '#1db954' : '';
    });

    shuffleButton.addEventListener('click', () => {
        isShuffling = !isShuffling;
        shuffleButton.style.color = isShuffling ? '#1db954' : '';
    });

    volumeControl.addEventListener('input', (e) => {
        player.volume = e.target.value;
    });

    player.addEventListener('ended', () => {
        playPauseIcon.classList.replace('bx-pause', 'bx-play');
        if (isRepeating) {
            player.currentTime = 0;
            player.play();
        } else {
            nextButton.click();
        }
    });

    player.addEventListener('timeupdate', () => {
        if (player.duration) {
            const percent = (player.currentTime / player.duration) * 100;
            progressBar.value = percent;
            currentTimeDisplay.textContent = formatTime(player.currentTime);
            durationDisplay.textContent = formatTime(player.duration);
        }
    });

    progressBar.addEventListener('input', () => {
        if (player.duration) {
            const seekTime = (progressBar.value / 100) * player.duration;
            player.currentTime = seekTime;
        }
    });

    // Carrega artistas
    artistsData.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="imagem do ${artist.name}">
            <div>
                <h3>${artist.name}</h3>
                <p>artista</p>
            </div>
        `;
        artistGrid.appendChild(artistCard);
    });

    // Carrega álbuns e faixas
    albumsData.forEach((album, albumIndex) => {
        const albumCard = document.createElement('div');
        albumCard.classList.add('album-card');
        albumCard.innerHTML = `
            <img src="${album.image}" alt="imagem do ${album.name}">
            <div>
                <h3>${album.name}</h3>
                <p>${album.artist}</p>
                <ul class="album-tracks" style="display: none; margin-top: 10px; font-size: 10px; color: var(--text-color); list-style: none; padding: 0;"></ul>
            </div>
        `;

        const trackList = albumCard.querySelector('.album-tracks');
        album.tracks.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = track.title;
            li.style.cursor = 'pointer';
            li.style.padding = '4px 0';

            li.addEventListener('click', (e) => {
                e.stopPropagation();
                currentPlaylist = album.tracks;
                currentTrackIndex = index;
                currentAlbumImage = album.image;
                currentAlbumIndex = albumIndex;
                playCurrentTrack();
            });

            trackList.appendChild(li);
        });

        albumCard.addEventListener('click', () => {
            trackList.style.display = trackList.style.display === 'block' ? 'none' : 'block';
        });

        albumsGrid.appendChild(albumCard);
    });
});
