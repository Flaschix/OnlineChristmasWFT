import { CST, LABEL_ID } from "../CST.mjs";

import { socket } from "../CST.mjs";

import { createUILeftMobile } from "../share/UICreator.mjs";
import { createUI } from "../share/UICreator.mjs";
import { createAvatarDialog } from "../share/UICreator.mjs";
import { isMobile } from "../share/UICreator.mjs";
import { CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";

import { createJoystick } from "../share/UICreator.mjs";
import { createMobileXButton } from "../share/UICreator.mjs";

import { MAP_SETTINGS } from "../share/UICreator.mjs";

import { BaseScene } from "./BaseScene.mjs";

export class GameScene4 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE4);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map4', './assets/map/map_christmas_dinner_4.jpg');

        this.load.image('joke7', './assets/jokes/Joke 7.png')
        this.load.image('joke8', './assets/jokes/Joke 8.png')
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map4');

        if (this.mobileFlag) {
            createJoystick(this, 'joystickBase', 'joystickThumb', this.isDragging, 160, this.cameras.main.height - 140);
            createMobileXButton(this, 'touchButton', 'joystickBase', this.cameras.main.width - 150, this.cameras.main.height - 140, this.itemInteract);
            createUILeftMobile(this, 'settingsMobile', 'exitMobile', 'fold', 90, 70, this.cameras.main.width - 90, 70, this.showSettings, this.showExitMenu, 90, 200, this.showFold); this.createPlayers(players, CAMERA_MARGIN_MOBILE);
        } else {
            createUI(this, this.showSettings, this.showExitMenu, this.showFold);
            this.createPlayers(players, CAMERA_MARGIN);
        }

        //Создаём объект с которыми будем взаимодействовать
        this.createCollision();
        //Создание оверлея
        this.createOverlays();
        this.createFold();
        //Создание слушателей нажатия кнопок
        this.createInputHandlers();

        createAvatarDialog(this, this.enterNewSettingsInAvatarDialog, this.closeAvatarDialog, this.player.room, isMobile());


        // if (!this.textures.exists(MAP_SETTINGS.MAP_FULL2)) {

        //     this.loadPlusTexture(MAP_SETTINGS.MAP_FULL2, './assets/map/tample_full_2.png');

        //     this.fullMap = false;
        // }
    }

    // createMap(map, mapFull) {
    //     if (this.textures.exists(mapFull)) {
    //         this.map = this.add.image(0, 0, mapFull).setOrigin(0, 0);
    //         // this.map.setScale(MAP_SETTINGS.MAP_SCALE_4_3, MAP_SETTINGS.MAP_SCALE_4_3);
    //         this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    //     } else {
    //         this.map = this.add.image(0, 0, map).setOrigin(0, 0);
    //         this.map.setScale(2, 2);
    //         this.matter.world.setBounds(0, 0, this.map.width * MAP_SETTINGS.MAP_SCALE_2, this.map.height * MAP_SETTINGS.MAP_SCALE_2);
    //     }
    // }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(645, 1063, '250 1537.5 250 1625.5 1 1625.5 1 0.5 1932 0.5 1932 383.5 1805 383.5 1756.5 383.5 1735.5 375 1713.5 340 1713.5 292.5 1720 257 1735.5 238.5 1735.5 166.5 1676 166.5 1676 227.5 1656.5 238.5 1510 238.5 1510 257 1437 257 1437 238.5 1252.5 238.5 1274.5 257 1274.5 292.5 1245.5 330 1245.5 375 1211 392.5 1172 392.5 1152.5 355.5 1069.5 355.5 1069.5 330 807.5 330 807.5 355.5 718.5 355.5 718.5 392.5 674.5 402 640.5 392.5 640.5 355.5 621 323 611 302 566 302 554 323 129.5 323 129.5 355.5 149 375 149 451 129.5 474 129.5 526.5 149 536 149 636 129.5 666.5 129.5 799.5 96.5 834 96.5 860.5 129.5 860.5 263.5 860.5 263.5 834 278 821.5 321 821.5 332 841 332 867 450 867 450 1079 129.5 1079 129.5 976.5 46.5 976.5 46.5 1121.5 116 1135 149 1174 129.5 1217 106 1230 106 1278 158.5 1291 158.5 1359.5 189 1359.5 196.5 1435 221 1445 211 1478 250 1502 250 1537.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1265.5 + 393.5, 1050 + 632.5, '0.5 1201 0.5 1264.5 786 1264.5 786 0.5 636 0.5 636 211.5 682 210.5 682 320 657.5 320 657.5 287.5 642 272.5 615 272.5 603 287.5 590.5 320 590.5 529 700.5 529 700.5 640 692 655.5 692 916.5 657.5 942.5 643 964 615 964 603 986 590.5 1007 539.5 1007 539.5 964 314 964 314 1154.5 293 1154.5 264 1119 253 1085 253 1059.5 243 1037.5 215 993.5 196.5 970.5 168.5 986 156.5 964 138 986 116 1007 100.5 986 93 1007 74.5 1037.5 74.5 1059.5 61.5 1065.5 61.5 1085 49 1119 32 1147 16 1170.5 24.5 1201 0.5 1201', { isStatic: true }, true)
        this.matter.add.fromVertices(920 + 134.5, 870 + 210.5, '1 420 1 87 50 87 50 67.5 66 31 94 31 103.5 0.5 141.5 0.5 162 31 183 31 197.5 67.5 210 67.5 216 87 268.5 87 268.5 420 1 420', { isStatic: true }, true)
        this.matter.add.fromVertices(1410 + 150.5, 1224 + 160.5, '236 1 42.5 1 36 19 6.5 19 1 31.5 1 66 13 75.5 36 75.5 36 115 13 115 6.5 125 6.5 164.5 36 177 36 252.5 13 252.5 6.5 264 6.5 300 19 311.5 36 311.5 46 320 277 317.5 294 305.5 294 264 282.5 252.5 245.5 252.5 245.5 177 288.5 177 300 158 300 125 282.5 110.5 245.5 110.5 245.5 75.5 282.5 75.5 294 59.5 294 27.5 282.5 14.5 245.5 14.5 236 1', { isStatic: true }, true)
        this.matter.add.fromVertices(1430 + 186.5, 778 + 127, '0.5 197 0.5 39 191 39 191 10 198 1 243.5 1 254 10 254 39 367.5 39 371.5 197 250 197 250 241 237.5 253 198 253 186.5 241 186.5 197 0.5 197', { isStatic: true }, true)
        this.matter.add.fromVertices(425.5 + 159, 840 + 117, '28 124.5 28 70.5 53 31.5 78 18.5 106 0.5 132.5 0.5 157 9 185.5 23.5 210.5 39.5 231.5 55.5 274 39.5 296.5 23.5 312.5 39.5 317.5 67 317.5 104 308 112 266.5 116 235 124.5 221 161 198.5 175.5 157 187.5 116 198.5 106 211.5 78 228.5 53 233 33 224.5 13.5 211.5 0.5 195 0.5 175.5 18.5 182.5 28 161 40.5 146 28 124.5', { isStatic: true }, true)
        this.matter.add.fromVertices(870 + 175, 1620 + 113.5, '0.5 216.5 0.5 61 128.5 61 128.5 17 144.5 1 181 1 195 17 207.5 17 222 13 233 21.5 233 46.5 239 61 349.5 61 349.5 216.5 222 216.5 222 275 202.5 286.5 160.5 286.5 155 275 155 216.5 0.5 216.5', { isStatic: true }, true)
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                /*if (this.textures.exists(MAP_SETTINGS.MAP_FULL2))*/ this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
                // else this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width * MAP_SETTINGS.MAP_SCALE_2 + cameraMargin.right, this.map.height * MAP_SETTINGS.MAP_SCALE_2 + cameraMargin.bottom);
            } else {
                this.playersController.createOtherPlayer(this, players[id], this.otherPlayers);
            }
        });
    }

    createCollision() {
        // Создаем графику для подсветки
        const highlightGraphics = this.add.graphics();
        highlightGraphics.lineStyle(2, 0x06ff01, 1);
        highlightGraphics.setDepth(0);

        const backDoor = this.matter.add.fromVertices(532 + 142, 1993 + 27.5, '1 1 1 54 283 54 283 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(893 + 141, 513.5 + 137, '1 0.5 1 273.5 281.5 273.5 281.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const elf1 = this.matter.add.sprite(362 + 32, 1570 + 42, 'elf3', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });


        const elf2 = this.matter.add.sprite(539 + 32, 1170 + 42, 'elf4', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(374 + 32, 827 + 42, 'elf1', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(622 + 32, 797 + 42, 'elf2', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf5 = this.matter.add.sprite(1494 + 32, 669 + 42, 'elf5', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf6 = this.matter.add.sprite(1494 + 32, 1041 + 42, 'elf6', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf7 = this.matter.add.sprite(1441 + 32, 1616 + 42, 'elf2', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });


        const arrBodies = [backDoor, forwardDoor, elf1, elf2, elf3, elf4, elf5, elf6, elf7];


        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: arrBodies,
            callback: function (eventData) {
                this.isInZone = true;
                this.eventZone = Number(eventData.bodyB.label);

                // Подсвечиваем границы зоны
                const vertices = eventData.bodyB.vertices;
                highlightGraphics.beginPath();
                highlightGraphics.moveTo(vertices[0].x, vertices[0].y);
                for (let i = 1; i < vertices.length; i++) {
                    highlightGraphics.lineTo(vertices[i].x, vertices[i].y);
                }
                highlightGraphics.closePath();
                highlightGraphics.strokePath();
            },
            context: this
        });

        this.matterCollision.addOnCollideEnd({
            objectA: this.player,
            objectB: arrBodies,
            callback: function (eventData) {
                this.isInZone = false;
                this.eventZone = null;

                highlightGraphics.clear();
            },
            context: this
        });
    }

    createOverlays() {
        this.pressX = this.add.image(this.player.x, this.player.y - 50, 'pressX');
        this.pressX.setDisplaySize(this.pressX.width, this.pressX.height);
        this.pressX.setVisible(false);

        //задний фон оверлея
        this.overlayBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'overlayBackground');
        this.overlayBackground.setOrigin(0.5, 0.5);
        this.overlayBackground.setDisplaySize(this.cameras.main.width - 300, this.cameras.main.height - 100);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0); // Начальное значение прозрачности

        //Первый ключ
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer7');
        this.firstKey.setScale(0.8);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer8');
        this.secondKey.setScale(0.8);
        this.secondKey.setVisible(false);
        this.secondKey.setDepth(2);
        this.secondKey.setScrollFactor(0);
        this.secondKey.setAlpha(0);

        this.firstJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke7');
        this.firstJoke.setScale(0.8);
        this.firstJoke.setVisible(false);
        this.firstJoke.setDepth(2);
        this.firstJoke.setScrollFactor(0);
        this.firstJoke.setAlpha(0);

        this.secondJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke8');
        this.secondJoke.setScale(0.8);
        this.secondJoke.setVisible(false);
        this.secondJoke.setDepth(2);
        this.secondJoke.setScrollFactor(0);
        this.secondJoke.setAlpha(0);


        this.closeButton = this.add.image(this.cameras.main.width - 200, 85, 'closeIcon');
        this.closeButton.setDisplaySize(50, 50);
        this.closeButton.setInteractive();
        this.closeButton.setVisible(false);
        this.closeButton.setDepth(2);
        this.closeButton.setScrollFactor(0);
        this.closeButton.setAlpha(0); // Начальное значение прозрачности

        this.closeButton.on('pointerdown', () => {
            this.isOverlayVisible = false;
            this.tweens.add({
                targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    try {
                        this.hideOverlay();
                    }
                    catch (e) { }
                }
            });
        });
    }

    createInputHandlers() {
        this.input.keyboard.on('keydown-X', () => {
            if (this.foldKeys.visible) return;

            if (this.isInZone) {
                this.player.setVelocity(0);

                if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                    this.moveForwardRoom();
                    return;
                }

                if (this.eventZone == LABEL_ID.DOOR_BACK_ID) {
                    this.moveBackRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            try {
                                this.hideOverlay();
                            } catch (e) { }

                        }
                    });
                }
            }
        });
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 1930);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 630);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.firstKey.setVisible(true);
            if (this.fold.indexOf(this.firstKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.firstKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.secondKey.setVisible(true);
            if (this.fold.indexOf(this.secondKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.secondKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.FIRST_JOKE) {
            this.firstJoke.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.SECOND_JOKE) {
            this.secondJoke.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.firstKey.visible) this.firstKey.setVisible(false);
        if (this.secondKey.visible) this.secondKey.setVisible(false);
        if (this.firstJoke.visible) this.firstJoke.setVisible(false);
        if (this.secondJoke.visible) this.secondJoke.setVisible(false);

        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    loadedResolutionMap(name, scaleX, scaleY) {
        this.map.setScale(scaleX, scaleY);

        this.map.setTexture(name);
        this.matter.world.setBounds(0, 0, this.map.width * scaleX, this.map.height * scaleY);
    }

    itemInteract(context) {
        if (context.foldKeys.visible) return;
        if (context.isInZone) {
            context.player.setVelocity(0);

            if (context.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                context.moveForwardRoom();
                return;
            }

            if (context.eventZone == LABEL_ID.DOOR_BACK_ID) {
                context.moveBackRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondKey, context.firstJoke, context.secondJoke],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondKey, context.firstJoke, context.secondJoke],
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        try {
                            context.hideOverlay();
                        } catch (e) { }

                    }
                });
            }
        }
    }


    update() {
        super.update();

        // if (!this.fullMap) {
        //     if (this.textures.exists(MAP_SETTINGS.MAP_FULL2)) {
        //         this.fullMap = true;

        //         this.loadedResolutionMap(MAP_SETTINGS.MAP_FULL2, 1, 1)
        //     }
        // }
    }
}