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

export class GameScene5 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE5);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map5', './assets/map/map_christmas_room_5.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map5');

        if (this.mobileFlag) {
            createJoystick(this, 'joystickBase', 'joystickThumb', this.isDragging, 160, this.cameras.main.height - 120);
            createMobileXButton(this, 'touchButton', 'joystickBase', this.cameras.main.width - 150, this.cameras.main.height - 120, this.itemInteract);
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
        this.matter.add.fromVertices(870, 655 + 624, '153.5 1082.5 153.5 1247 1 1247 1 1 1901 1 1901 739 1229 739 1229 641 1064.5 388 1147 338 1213 408 1213 338 1315.5 338 1315.5 424 1368.5 424 1368.5 348 1486 348 1486 424 1797 424 1797 348 1646.5 326 1586 278 1558 219.5 1570 127.5 1413.5 127.5 1413.5 155.5 1213 155.5 1213 261.5 1132.5 278 1094.5 237.5 1094.5 179.5 745.5 179.5 745.5 261.5 663.5 261.5 641 219.5 611 207.5 611 127.5 298 127.5 298 207.5 282 348 171.5 388 171.5 438.5 224 484.5 224 556.5 171.5 605 171.5 813.5 400.5 705 400.5 544.5 559 544.5 559 721 717.5 813.5 717.5 847.5 745.5 847.5 745.5 1034 625 1034 625 986 468.5 986 468.5 847.5 298 847.5 298 942 358.5 942 358.5 1082.5 153.5 1082.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1820 + 140.5, 1316.5 + 341, '1.5 610.5 95.5 681 280 681 280 0.5 232 0.5 232 171 214 267.5 136 255.5 53.5 384 13.5 490 1.5 610.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1500 + 65, 1706.5 + 87, '12.5 28 1 157.5 65.5 172.5 128.5 136.5 117 28 65.5 1.5', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(841.5 + 197.5, 1938.5 + 53, '0.5 0.5 0.5 105 394 105 394 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        // const thirdKey = this.matter.add.fromVertices(263.5 + 162.5, 194.5 + 186, '1.5 266.5 106.5 370.5 324 126 255 1.5', {
        //     label: `${LABEL_ID.THIRD_KEY}`,
        //     isStatic: true,
        // })

        // const fourthKey = this.matter.add.fromVertices(242.5 + 170.5, 1503.5 + 179.5, '1.5 95 113.5 1.5 339.5 244.5 268 358', {
        //     label: `${LABEL_ID.FOURTH_KEY}`,
        //     isStatic: true,
        // })

        const shell1 = this.matter.add.fromVertices(1315 + 339, 1208 + 87, '1 173 1 1 677 1 677 173', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell2 = this.matter.add.fromVertices(1297 + 105, 815 + 126.5, '1 252 1 1 209.5 1 209.5 252', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell3 = this.matter.add.fromVertices(465 + 118, 779 + 139.5, '1 278 1 1 235 1 235 278', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell4 = this.matter.add.fromVertices(101 + 370.5, 1423 + 117, '740 233 740 1 1 1 1 233', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [backDoor, shell1, shell2, shell3, shell4];


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
        this.thirdKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'thirdKey');
        this.thirdKey.setScale(0.5);
        this.thirdKey.setVisible(false);
        this.thirdKey.setDepth(2);
        this.thirdKey.setScrollFactor(0);
        this.thirdKey.setAlpha(0);

        this.fourthKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'fourthKey');
        this.fourthKey.setScale(0.5);
        this.fourthKey.setVisible(false);
        this.fourthKey.setDepth(2);
        this.fourthKey.setScrollFactor(0);
        this.fourthKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.fourthKey, this.emptyKey],
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
                        targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.fourthKey, this.emptyKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.fourthKey, this.emptyKey],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1720);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 1050);
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

        if (this.eventZone == LABEL_ID.FOURTH_KEY) {
            this.fourthKey.setVisible(true);
            if (this.fold.indexOf(this.fourthKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.fourthKey.texture.key);
            }
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.thirdKey.visible) this.thirdKey.setVisible(false);
        if (this.fourthKey.visible) this.fourthKey.setVisible(false);
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
                    targets: [context.overlayBackground, context.closeButton, context.thirdKey, context.fourthKey, context.emptyKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.thirdKey, context.fourthKey, context.emptyKey],
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