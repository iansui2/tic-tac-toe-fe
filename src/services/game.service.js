import httpname from "./axios/http-ptrax";

class GameAPI {
    getGames() {
        return httpname.get('/getGames');
    }

    createGame(data) {
        return httpname.post('/createGame', data);
    }
}

const gameAPIInstance = new GameAPI();
export default gameAPIInstance;