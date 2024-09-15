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

export class GameScene2 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE2);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map2', './assets/map/map_christmas_factory_2.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map2');

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
        this.matter.add.fromVertices(530, 375 + 843.5, '266.5 1663 301 1686 0.5 1686 0.5 0.5 1874.5 0.5 1874.5 432.5 1646 432.5 1646 294 1202 294 1196 382 1154 382 1145.5 321.5 1118 337.5 1092 337.5 1066 305.5 1066 71 875 71 875 289.5 849 346 817.5 346 808.5 321.5 729 321.5 729 289.5 114.5 289.5 114.5 382 378 382 408 369 430 382 464.5 382 495 369 516.5 382 586 382 607.5 369 639.5 382 717.5 369 759.5 424 775.5 502 759.5 532.5 717.5 521 652.5 521 660 563 639.5 580 570 571.5 558.5 552.5 570 521 503.5 521 495 571.5 440 580 408 563 421 509.5 333 509.5 321.5 571.5 165.5 571.5 165.5 509.5 136.5 509.5 114.5 602 145 602 145 745 99 764 99 811.5 126.5 865 308.5 865 308.5 992 229 992 229 933 99 933 99 1100.5 421 1100.5 421 1419 495 1419 495 1507 538.5 1534.5 570 1534.5 593.5 1507 593.5 1591 538.5 1591 538.5 1619.5 483.5 1619.5 474.5 1591 431.5 1582 391 1591 376.5 1567.5 391 1534.5 266.5 1484 180 1484 180 1419 266.5 1419 291 1430.5 291 1378.5 70 1378.5 70 1484 126.5 1484 126.5 1553 194 1553 194 1591 229 1619.5 229 1663 266.5 1663', { isStatic: true }, true)
        this.matter.add.fromVertices(1223 + 420.5, 908 + 664, '129 1285.5 109 1309 109 1327.5 840.5 1327.5 840.5 39.5 479 39.5 469 17.5 428.5 39.5 428.5 17.5 369 17.5 369 0.5 310 0.5 292.5 39.5 300 195.5 326 195.5 326 236 274 236 255 220 112 226 19.5 236 0.5 253.5 0.5 427 35.5 455.5 70 455.5 91.5 438.5 120.5 461.5 152.5 461.5 172.5 438.5 184 438.5 200 461.5 248 455.5 274 427 346 438.5 274 544 394 599 456 521 456 587.5 479 643.5 521 662.5 554.5 643.5 553 599 584.5 599 584.5 636.5 621 662.5 658.5 652.5 668.5 599 715 599 715 872 691.5 905.5 691.5 962 743.5 975 743.5 1100.5 743.5 1165.5 729.5 1165.5 715 1139.5 715 1090.5 668.5 1027 631 1071.5 605 1090.5 605 1129.5 584.5 1165.5 553 1165.5 509.5 1154 537 1118 509.5 1100.5 501 1071.5 584.5 1071.5 584.5 1019.5 561.5 990.5 521 990.5 521 954.5 537 894 479 923 464.5 946 433 946 394 975 414 1009.5 444.5 1027 414 1037 394 1060 433 1100.5 464.5 1071.5 479 1090.5 464.5 1129.5 464.5 1154 411 1154 394 1173 394 1236.5 274 1236.5 274 1293 236 1293 236 1228 222 1228 222 1173 206 1129.5 206 1044 162.5 1044 152.5 1060 152.5 1129.5 162.5 1165.5 162.5 1285.5 129 1285.5', { isStatic: true }, true)
        this.matter.add.fromVertices(979 + 59, 1806 + 30, '1 59 1 1 117 1 117 59', { isStatic: true }, true)
        this.matter.add.fromVertices(347 + 133.5, 972 + 97.5, '266 194.5 1 194.5 1 1 266 1', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(892.5 + 149.5, 1979.5 + 32.5, '0.5 0.5 0.5 64 298 64 298 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(931.5 + 98, 434 + 104.5, '0.5 208 0.5 1 195.5 1 195.5 208', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(773.5 + 29, 1619.5 + 43.5, '0.5 86 0.5 0.5 57 0.5 57 86', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(632 + 48, 1618 + 49.5, '1 98 1 1 95 1 95 98', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(526.5 + 42.5, 1696 + 56, '0.5 111 0.5 1 84.5 1 84.5 111', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(641 + 59, 1794 + 44.5, '1 46.1731 1 88 117 88 117 1 70.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(353 + 73.5, 1421 + 185, '1 1 1 369 146 369 146 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box6 = this.matter.add.fromVertices(655 + 35, 1067.5 + 47.5, '1 94.5 1 0.5 69 0.5 69 94.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(202.5 + 71, 964.5 + 76.5, '0.5 152.5 0.5 0.5 141 0.5 141 152.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1294 + 76, 808.5 + 78.5, '1 156.5 1 0.5 151.5 0.5 151.5 156.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box9 = this.matter.add.fromVertices(1718 + 68, 1463.5 + 91, '1 181 1 0.5 135.5 0.5 135.5 181', {
            label: `${LABEL_ID.THIRD_KEY}`,
            isStatic: true,
        })

        const box10 = this.matter.add.fromVertices(1433 + 105, 1637 + 31, '209 1 209 61.5 18.5 61.5 1 24 1 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(1447.5 + 54, 1783 + 58.5, '0.5 116.5 0.5 1 107.5 1 107.5 116.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box12 = this.matter.add.fromVertices(1266.5 + 304.5, 341.5 + 163.5, '0.5 0.5 0.5 326 608 326 608 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box13 = this.matter.add.fromVertices(189.5 + 292, 351.5 + 156, '0.5 0.5 0.5 311.5 583.5 311.5 583.5 0.5', {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
        })

        const box14 = this.matter.add.fromVertices(325.5 + 84.5, 1835 + 28.5, '0.5 1 0.5 56 168 56 168 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })


        const arrBodies = [backDoor, forwardDoor, box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, box13, box14];


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
        this.thirdKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'thirdKey');
        this.thirdKey.setScale(0.7);
        this.thirdKey.setVisible(false);
        this.thirdKey.setDepth(2);
        this.thirdKey.setScrollFactor(0);
        this.thirdKey.setAlpha(0);

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'secondKey');
        this.secondKey.setScale(0.7);
        this.secondKey.setVisible(false);
        this.secondKey.setDepth(2);
        this.secondKey.setScrollFactor(0);
        this.secondKey.setAlpha(0);

        this.emptyKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'emptyKey');
        this.emptyKey.setVisible(false);
        this.emptyKey.setDepth(2);
        this.emptyKey.setScrollFactor(0);
        this.emptyKey.setAlpha(0);


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
                targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.secondKey, this.emptyKey],
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
                        targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.secondKey, this.emptyKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.secondKey, this.emptyKey],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1900);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 600);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.THIRD_KEY) {
            this.thirdKey.setVisible(true);
            if (this.fold.indexOf(this.thirdKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.thirdKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.emptyKey.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.secondKey.setVisible(true);
            if (this.fold.indexOf(this.secondKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.secondKey.texture.key);
            }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.thirdKey.visible) this.thirdKey.setVisible(false);
        if (this.secondKey.visible) this.secondKey.setVisible(false);
        if (this.emptyKey.visible) this.emptyKey.setVisible(false);

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
                    targets: [context.overlayBackground, context.closeButton, context.thirdKey, context.secondKey, context.emptyKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.thirdKey, context.secondKey, context.emptyKey],
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