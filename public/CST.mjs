export const CST = {
    SCENE: {
        LOADINGSCENE: "LoadingScene",
        LOBBYSCENE: "LobbyScene",
        GAMESCENE: "GameScene",
        GAMESCENE2: "GameScene2",
        GAMESCENE3: "GameScene3",
        GAMESCENE4: "GameScene4",
        GAMESCENE5: "GameScene5",
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
    ['answer1', { x: 410, y: 330, n: 1, text: 'В какой стране на Новый год\nлюди отправляют открытки\nс изображением солнца, как\nсимвол нового начала?' }],
    ['answer2', { x: 410, y: 330, n: 2, text: 'Где в новогоднюю ночь дети\nоставляют свои ботинки у\nкамина, чтобы Санта-Клаус\nмог положить туда подарки?' }],
    ['answer3', { x: 410, y: 330, n: 3, text: 'В какой стране на Новый год\nлюди наряжаются в костюмы\nи маски, чтобы отпугнуть\nзлых духов' }],
    ['answer4', { x: 420, y: 330, n: 4, text: 'Где существует традиция в\n новогоднюю ночь сжигать\nстарые вещи, чтобы\nизбавиться от прошлого и\nвпустить счастье в Новый\nгод?' }],
    ['answer5', { x: 400, y: 250, n: 5, text: 'Видел вечером в 21:25\nстранного мужчину в\nбелом халате. Он нес\nс собой чехол от\nгитары.' }],
    ['answer6', { x: 425, y: 270, n: 6, text: 'Видел как в 21:15\nдевушка в костюме\nшла очень\nрасстроенная.' }],
    ['answer7', { x: 410, y: 290, n: 7, text: 'Видел как вечером в\n21:10 охранник спешил\nкуда-то.' }],
    ['answer8', { x: 450, y: 330, n: 8, text: 'Я ничего не видел' }],
    ['answer9', { x: 450, y: 330, n: 9, text: 'Я ничего не видела' }],
    ['answer10', { x: 450, y: 330, n: 10, text: 'Я ничего не видела' }],
]);