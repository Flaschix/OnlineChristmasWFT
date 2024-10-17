export const CST = {
    SCENE: {
        LOADINGSCENE: "LoadingScene",
        LOBBYSCENE: "LobbyScene",
        GAMESCENE: "GameScene",
        GAMESCENE2: "GameScene2",
        GAMESCENE3: "GameScene3",
        GAMESCENE4: "GameScene4",
        GAMESCENE5: "GameScene5",
        GAMESCENE6: "GameScene6",
    }
}

export const socket = io();

export const LABEL_ID = {
    DOOR_FORWARD_ID: 11111111,
    DOOR_BACK_ID: 22222222,

    FIRST_KEY: 33333333,
    SECOND_KEY: 44444444,
    FIRST_JOKE: 55555555,
    SECOND_JOKE: 6666666,
}

export const myMap = new Map([
    ['newyorkKey1', { x: 420, y: 250, text: '' }],
    ['newyorkKey2', { x: 395, y: 250, text: '' }],
    ['parisKey1', { x: 440, y: 250, text: '' }],
    ['parisKey2', { x: 430, y: 270, text: '' }],
    ['pekinKey1', { x: 400, y: 250, text: '' }],
    ['pekinKey2', { x: 425, y: 270, text: '' }],
    ['rioKey1', { x: 410, y: 290, text: '' }],
    ['rioKey2', { x: 450, y: 330, text: '' }],
    ['sidneyKey1', { x: 450, y: 330, text: '' }],
    ['sidneyKey2', { x: 450, y: 330, text: '' }],
    ['tokioKey1', { x: 450, y: 330, text: '' }],
    ['tokioKey2', { x: 450, y: 330, text: '' }],
]);