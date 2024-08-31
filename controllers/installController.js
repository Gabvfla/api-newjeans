const Member = require('../models/memberModel');
const Album = require('../models/albumModel');
const Music = require('../models/musicModel');
const User = require('../models/userModel');
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
            { title: 'Get Up', releaseDate: new Date('2023-07-21'), coverImage: 'https://upload.wikimedia.org/wikipedia/en/e/ee/NewJeans_-_Get_Up.png', tracks: [] }
        ];

        // Cria os álbuns
        const albums = await Album.insertMany(albumsData);

        // Define as músicas com referências de ObjectId
        const musicsData = [
            { title: 'Attention', album: albums[0]._id, duration: '3:52', writtenBy: [members[0]._id, members[1]._id] },
            { title: 'Hype Boy', album: albums[0]._id, duration: '2:58', writtenBy: [members[2]._id] },
            { title: 'ETA', album: albums[1]._id, duration: '2:31', writtenBy: [members[3]._id, members[4]._id] }
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
