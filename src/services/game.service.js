import httpname from "./axios/http-game";

class GameAPI {
    getGames() {
        return httpname.get('/game/getGames');
    }

    createGame(data) {
        return httpname.post('/game/createGame', data);
    }
}

const gameAPIInstance = new GameAPI();
export default gameAPIInstance;