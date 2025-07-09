
document.addEventListener('DOMContentLoaded', () => {
    const artistsData = [
        { name: 'Henrique & Juliano', image: './img/artista-henrique-juliano.png' },
        { name: 'Jorge & Mateus',  image: './img/artista-jorge-mateus.png' },
        { name: 'Zé Neto & Cristiano', image: './img/artista-ze-neto-cristiano.png' }, 
        { name: 'Gusttavo Lima', image: './img/artista-gusttavo-lima.png' },
        { name: 'Luan Santana', image: './img/artista-luan-santana.png' },
        { name: 'Matheus & Kauan',image: './img/artista-matheus-kauan.png' }
    ];

    const albumsData = [
        { 
            name: 'White Noise (Sleep & Relaxation Sounds)', 
            artist: 'Sleepy John', 
            image: './img/album-white-noise.png',
            tracks: [
                { title: 'Ocean Breeze', file: },
                { title: 'Deep Sleep', file: },
                { title: 'Rainfall Meditation', file: }
            ]
         },

        { name: 'O Céu Explica Tudo (Ao Vivo)', 
            artist: 'Henrique & Juliano', 
            image: './img/album-ceu-explica.png',
            tracks: [
                'Vidinha de Balada', 
                'Aquela Pessoa', 
                '5 km',
            ]
         },

        { name: 'Nada como um dia após o outro', 
            artist: 'Racionais', 
            image: './img/album-vida-loka.png',
            tracks: [
                'Vida Loka Pt.1', 
                'Jesus Chorou', 
                'Negro Drama',
            ]
         },

        { 
            name: 'HIT ME HARD AND SOFT', 
            artist: 'Billie Eilish', 
            image: './img/album-hit-me.png',
            tracks: [
                'SKINNY', 
                'CHIHIRO', 
                'BIRDS OF AFEATHER',
            ]
        },

        { 
            name: 'CAJU', 
            artist: 'Liniker', 
            image: './img/album-caju.png',
            tracks: [
                'AO TEU LADO', 
                'NEGONA DOS OLHOS TERRÍVEIS', 
                'PAPO DE EDREDOM',
            ]
        },
        { name: 'Escândalo Íntimo', artist: 'Luísa Sonza', image: './img/album-escandalo.png' }
    ];

    const artistGrid = document.querySelector('.artists-grid')
    const albumsGrid = document.querySelector('.albums-grid')
     
    artistsData.forEach( artist => {
        const artistCard = document.createElement('div')
        artistCard.classList.add('artist-card')
        
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="imagem do ${artist.name}">
            <div>
                <h3>${artist.name}</h3>
                <p>artista</p>
            </div>
        `;
        artistGrid.appendChild(artistCard)

    })

   albumsData.forEach(album => {
    const albumCard = document.createElement('div');
    albumCard.classList.add('album-card');

    albumCard.innerHTML = `
        <img src="${album.image}" alt="imagem do ${album.name}">
        <div>
            <h3>${album.name}</h3>
            <p>${album.artist}</p>
            <ul class="album-tracks" style="display: none; margin-top: 10px; font-size: 10px; color: #ccc; list-style: none; padding: 0;"></ul>
        </div>
    `;

    // Criar e adicionar as faixas
    const trackList = albumCard.querySelector('.album-tracks');
    album.tracks.forEach(track => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.style.cursor = 'pointer';
        li.style.padding = '4px 0';

        li.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita esconder/mostrar faixas ao clicar na faixa
            const player = document.getElementById('player');
            player.src = track.file;
            player.play();
        });

        trackList.appendChild(li);
    });

    // Mostrar/ocultar ao clicar no álbum
    albumCard.addEventListener('click', () => {
        trackList.style.display = trackList.style.display === 'block' ? 'none' : 'block';
    });

    albumsGrid.appendChild(albumCard);
});
});
