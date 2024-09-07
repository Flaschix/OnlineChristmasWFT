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

export class GameScene3 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE3);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map3', './assets/map/map_christmas_room_3.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map3');

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
        this.matter.add.fromVertices(495, 610 + 643.5, '149 970.5 158 1285.5 0.5 1269.5 20 0.5 1961.5 0.5 1961.5 163.5 1388 163.5 1388 298 1248 326 1145.5 308.5 1145.5 163.5 915.5 163.5 915.5 308.5 761.5 326 660.5 298 660.5 117.5 237.5 117.5 237.5 197 290.5 234 290.5 308.5 358 407.5 473 701.5 446.5 744 459 864 393.5 915.5 335 875 253.5 915.5 168.5 832.5 90.5 807.5 66 823.5 90.5 952.5 149 970.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1890.5 + 69.5, 857 + 594.5, '108 788.5 119 1188.5 138.5 1188.5 138.5 1 27 1 0.5 332 99.5 652 27 657.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1704.5 + 71.5, 1649.5 + 160, '142 319 0.5 319 0.5 0.5 142 0.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1055 + 323, 1382.5 + 85.5, '26 60.5 1 34 1 0.5 645.5 0.5 645.5 78.5 592 78.5 592 170.5 565.5 170.5 565.5 110 488 110 488 170.5 463 170.5 447 60.5 381.5 60.5 371 151 355 151 332 60.5 249 60.5 240 110 240 170.5 213.5 170.5 213.5 110 130.5 110 130.5 170.5 109 170.5 109 60.5 57.5 60.5 57.5 151 26 151 26 60.5', { isStatic: true }, true)
        this.matter.add.fromVertices(466 + 93.5, 1174 + 130, '1 149.5 120.5 259 186 179.5 164 76.5 82.5 1 33 36.5', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(711.5 + 245, 1957.5 + 44, '0.5 0.5 0.5 87.5 489 87.5 489 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(915 + 118.5, 841 + 117, '1 1 1 233 236.5 233 236.5 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        // const thirdKey = this.matter.add.fromVertices(263.5 + 162.5, 194.5 + 186, '1.5 266.5 106.5 370.5 324 126 255 1.5', {
        //     label: `${LABEL_ID.THIRD_KEY}`,
        //     isStatic: true,
        // })

        // const fourthKey = this.matter.add.fromVertices(242.5 + 170.5, 1503.5 + 179.5, '1.5 95 113.5 1.5 339.5 244.5 268 358', {
        //     label: `${LABEL_ID.FOURTH_KEY}`,
        //     isStatic: true,
        // })

        const shell1 = this.matter.add.fromVertices(225 + 233.5, 711.5 + 123, '466.5 245 1 245 1 0.5 466.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell2 = this.matter.add.fromVertices(1356 + 301.5, 704.5 + 140, '602.5 0.5 602.5 278.5 1 250 1 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell3 = this.matter.add.fromVertices(1069 + 411.5, 1182.5 + 111, '822.5 221.5 1 221.5 10 0.5 822.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const shell4 = this.matter.add.fromVertices(1720.5 + 130.5, 1373.5 + 116.5, '0.5 232.5 0.5 0.5 260.5 0.5 260.5 232.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })


        const arrBodies = [backDoor, forwardDoor, shell1, shell2, shell3, shell4];


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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 980, 1950);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1054, 1000);
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