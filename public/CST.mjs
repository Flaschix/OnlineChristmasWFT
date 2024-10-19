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
    ['newyorkKey1', { x: 445, y: 300, text: 'Наш часовой пояс\nотстает от\nвсемирного времени\nна 5 часов.' }],
    ['newyorkKey2', { x: 445, y: 330, text: 'Сейчас в Нью-Йорке\n17:00 (5:00 вечера).' }],
    ['parisKey1', { x: 430, y: 310, text: 'Наш часовой пояс\nвсего на 1 час впереди\nвсемирного времени.' }],
    ['parisKey2', { x: 420, y: 330, text: 'В Париже сейчас 12:00\n(полдень).' }],
    ['pekinKey1', { x: 440, y: 280, text: 'Мы находимся в\nчасовом поясе,\nкоторый на 8 часов\nвпереди всемирного\nвремени.' }],
    ['pekinKey2', { x: 415, y: 330, text: 'Сейчас в нашем городе\n8:00 утра.' }],
    ['rioKey1', { x: 435, y: 320, text: 'Мы отстаем от\nвсемирного времени\nна 3 часа.' }],
    ['rioKey2', { x: 450, y: 320, text: 'Сейчас в Рио-де-\nЖанейро 16:00 (4:00\nдня).' }],
    ['sidneyKey1', { x: 425, y: 300, text: 'Мы находимся в\nчасовом поясе,\nкоторый опережает\nвсемирное время на 11\nчасов.' }],
    ['sidneyKey2', { x: 415, y: 330, text: 'Cейчас в нашем городе\n14:00 (2:00 дня).' }],
    ['tokioKey1', { x: 420, y: 320, text: 'Наш часовой пояс на 9\nчасов впереди\nвсемирного времени.' }],
    ['tokioKey2', { x: 410, y: 330, text: 'В нашем городе сейчас\n9:00 утра.' }],
]);