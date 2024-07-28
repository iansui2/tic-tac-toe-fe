import httpname from "./axios/http-game";

class GameAPI {
    getGames() {
        return httpname.get('/game/getGames');
    }

    createGame(data) {
        return httpname.post('/game/createGame', data);
    }

    deleteGame(id) {
        return httpname.delete('/game/deleteGame', { data: { id: id } });
    }
}

const gameAPIInstance = new GameAPI();
export default gameAPIInstance;