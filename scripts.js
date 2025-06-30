
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
        { name: 'White Noise (Sleep & Relaxation Sounds)', artist: 'Sleepy John', image: './img/album-white-noise.png' },
        { name: 'O Céu Explica Tudo (Ao Vivo)', artist: 'Henrique & Juliano', image: './img/album-ceu-explica.png' },
        { name: 'Nada como um dia após o outro', artist: 'Racionais', image: './img/album-vida-loka.png' },
        { name: 'HIT ME HARD AND SOFT', artist: 'Billie Eilish', image: './img/album-hit-me.png' },
        { name: 'CAJU', artist: 'Liniker', image: './img/album-caju.png' },
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
        `
        artistGrid.appendChild(artistCard)

    })

    albumsData.forEach( album => {
        const albumCard = document.createElement('div')
        albumCard.classList.add('album-card')
        
        albumCard.innerHTML = `
            <img src="${album.image}" alt="imagem do ${album.name}">
            <div>
                <h3>${album.name}</h3>
                <p>${album.artist}</p>
            </div>
        `
        albumsGrid.appendChild(albumCard)

    })
})

    


