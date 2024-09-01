const Member = require('../models/memberModel');
const Album = require('../models/albumModel');
const Music = require('../models/musicModel');
const User = require('../models/userModel');
const Playlist = require('../models/playlistModel');
const createFirstAdmin = require('../utils/FirstAdmin');
const createFirstUsers = require('../utils/FirstUsers');
const bcrypt = require('bcrypt');

const installDatabase = async (req, res) => {
    try {
        // Limpa os dados existentes
        await Member.deleteMany({});
        await Album.deleteMany({});
        await Music.deleteMany({});
        await User.deleteMany({}); 
        await Playlist.deleteMany({});


        // Define os membros do NewJeans
        const membersData = [
            { name: 'Minji', position: 'Leader', role: 'Lead Vocalist', profileImage: 'https://www.famousbirthdays.com/faces/minji-image.jpg' },
            { name: 'Hanni', position: 'Lead Rapper', role: 'Main Rapper', profileImage: 'https://www.famousbirthdays.com/faces/hanni-image.jpg' },
            { name: 'Danielle', position: 'Sub Rapper', role: 'Sub Rapper', profileImage: 'https://www.famousbirthdays.com/faces/danielle-popsinger-image.jpg' },
            { name: 'Haerin', position: 'Lead Dancer', role: 'Main Dancer', profileImage: 'https://www.famousbirthdays.com/faces/haerin-image.jpg' },
            { name: 'Hyein', position: 'Maknae', role: 'Vocalist', profileImage: 'https://www.famousbirthdays.com/faces/hyein-image.jpg' }
        ];

        // Cria os membros
        const members = await Member.insertMany(membersData);

        // Define os álbuns
        const albumsData = [
            { title: 'NewJeans 1st EP Album', releaseDate: new Date('2022-08-01'), coverImage: 'https://i.imgur.com/TBsaoiq.png', tracks: [] },
            { title: 'NewJeans OMG', releaseDate: new Date('2023-01-02'), coverImage: 'https://upload.wikimedia.org/wikipedia/en/1/10/NewJeans_OMG_cover.jpg', tracks: [] },
            { title: 'Get Up', releaseDate: new Date('2023-07-21'), coverImage: 'https://upload.wikimedia.org/wikipedia/en/e/ee/NewJeans_-_Get_Up.png', tracks: [] },
            { title: 'How Sweet', releaseDate: new Date('2024-05-24'), coverImage: 'https://t2.genius.com/unsafe/498x0/https%3A%2F%2Fimages.genius.com%2F2f2c553bf84b85ccc17daef3da1a3dbc.1000x1000x1.png', tracks: [] },
            { title: 'Supernatural', releaseDate: new Date('2024-06-21'), coverImage: 'https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80', tracks: [] }
            
        ];

        // Cria os álbuns
        const albums = await Album.insertMany(albumsData);

        // Define as músicas com referências de ObjectId
        const musicsData = [
            { title: 'Attention', album: albums[0]._id, duration: '3:52', writtenBy: [members[0]._id, members[1]._id] },
            { title: 'Hype Boy', album: albums[0]._id, duration: '2:58', writtenBy: [members[2]._id] },
            { title: 'Cookie', album: albums[0]._id, duration: '3:59', writtenBy: [members[3]._id] },
            { title: 'Hurt', album: albums[0]._id, duration: '3:21', writtenBy: [members[1]._id] },
            { title: 'OMG', album: albums[1]._id, duration: '3:40', writtenBy: [members[0]._id, members[1]._id] },
            { title: 'Ditto', album: albums[1]._id, duration: '3:06', writtenBy: [members[2]._id] },
            { title: 'ETA', album: albums[2]._id, duration: '2:31', writtenBy: [members[3]._id, members[4]._id] },
            { title: 'New Jeans', album: albums[2]._id, duration: '1:48', writtenBy: [members[0]._id, members[1]._id] },
            { title: 'Super Shy', album: albums[2]._id, duration: '2:34', writtenBy: [members[2]._id] },
            { title: 'Cool With You', album: albums[2]._id, duration: '2:27', writtenBy: [members[3]._id] },
            { title: 'Get Up', album: albums[2]._id, duration: '0:36', writtenBy: [members[0]._id, members[1]._id] },
            { title: 'ASAP', album: albums[2]._id, duration: '3:12', writtenBy: [members[2]._id] },
            { title: 'How Sweet', album: albums[3]._id, duration: '3:39', writtenBy: [members[3]._id] },
            { title: 'Bubblegum', album: albums[3]._id, duration: '3:20', writtenBy: [members[0]._id, members[1]._id] },
            { title: 'Supernatural', album: albums[4]._id, duration: '3:11', writtenBy: [members[2]._id] },
            { title: 'Right Now', album: albums[4]._id, duration: '2:40', writtenBy: [members[3]._id] },
        ];

        // Cria as músicas
        const musics = await Music.insertMany(musicsData);

        // Atualiza os álbuns com a lista de faixas
        await Promise.all(albums.map(async (album) => {
            await Album.findByIdAndUpdate(album._id, {
                $set: {
                    tracks: musics.filter(music => music.album.toString() === album._id.toString()).map(music => music._id)
                }
            }, { new: true });
        }));

        // Cria o Admin e os Usuários
        await createFirstAdmin(); 
        await createFirstUsers();

        res.status(200).json({ message: 'Banco de dados instalado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao instalar o banco de dados', error });
    }
};

module.exports = {
    installDatabase
};
