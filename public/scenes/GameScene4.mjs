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
        this.load.image('map4', './assets/map/map_christmas_factory_4.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map4');

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
        this.matter.add.fromVertices(680, 1035, '423.5 1739.5 423.5 1811 1 1811 1 1 1759 1 1759 492.5 1666.5 492.5 1666.5 638 1682.5 646.5 1682.5 807 1666.5 818 1173.5 818 1143 792 1143 646.5 1559.5 646.5 1559.5 606 1587.5 606 1594 351 1342.5 351 1342.5 559 1220.5 559 1220.5 543 1124.5 543 1124.5 407.5 1056.5 407.5 1005 422.5 963 407.5 963 120.5 750 120.5 750 442 634 442 634 358.5 555 358.5 555 407.5 580 433.5 580 483 602 483 602 534.5 561.5 534.5 543 515 327.5 515 327.5 534.5 263 534.5 263 497.5 294 497.5 294 462 294 345 191.5 352 191.5 422.5 180.5 422.5 180.5 483 122.5 483 122.5 719.5 168.5 719.5 203 725.5 205.5 752.5 230 752.5 230 712 321 712 321 731.5 385 731.5 385 666.5 414.5 646.5 512 646.5 512 579 666 579 666 646.5 634 646.5 634 740.5 523 740.5 523 752.5 543 779.5 543 826.5 523 844 394 844 394 954.5 321 972 321 1030 230 1030 259.5 1065.5 259.5 1094 288 1094 288 1111 334.5 1111 334.5 1172.5 321 1270 288 1323 252 1323 230 1299.5 230 1230.5 219 1193.5 219 1156.5 230 1149.5 230 1111 193 1111 185.5 1149.5 156 1156.5 156 1270 139 1277.5 115.5 1270 115.5 1299.5 156 1308 193 1350 203 1397 259.5 1397 259.5 1376 288 1376 288 1397 357 1397 357 1642 423.5 1642 453 1716 423.5 1739.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1720 + 148, 790 + 657.5, '1 1055.5 1 1314.5 295.5 1314.5 295.5 1 226.5 1 214.5 60 226.5 96 244 108 244 699.5 221.5 699.5 214.5 728 188.5 747.5 188.5 808 214.5 826.5 214.5 894 244 894 244 935 159 935 159 1032 19.5 1032 1 1055.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1086 + 295, 1548 + 140.5, '5.5 112 5.5 280.5 312.5 280.5 312.5 112 299 112 327 86 496 86 570 86 589.5 44 589.5 1 8.5 1 1 14.5 1 71 18 99.5 5.5 112', { isStatic: true }, true)
        this.matter.add.fromVertices(1739 + 29, 1345 + 54.5, '56.5 53 38 108 1 83.5 1 38 14.5 1 49 1 56.5 53', { isStatic: true }, true)
        this.matter.add.fromVertices(1083 + 343.5, 1160 + 86.5, '686.5 137.5 686.5 0.5 67 0.5 31 29 31 72 1.5 97 8 127.5 37.5 127.5 67 137.5 88 172 121 172 131 137.5 275 137.5 292.5 172 324.5 172 339 145 378.5 145 402 172 438 172 452.5 137.5 603 137.5 619 172 648.5 172 667 137.5 686.5 137.5', { isStatic: true }, true)
        this.matter.add.fromVertices(490.5 + 110.5, 1290 + 128, '0.5 247 0.5 113.5 68.5 113.5 68.5 48 98 48 98 22 115.5 0.5 161 0.5 176.5 22 176.5 48 206 48 206 191 220 191 220 233 206 247 176.5 255 161 223.5 127 223.5 121 247 98 255 77 247 77 223.5 59 223.5 59 247 0.5 247', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(800 + 174, 1982 + 32.5, '1 1 1 64 347.5 64 347.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(879 + 108.5, 368 + 61.5, '216.5 122 1 122 1 1 216.5 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
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

        const box1 = this.matter.add.fromVertices(666 + 52, 1741.5 + 85, '103 0.5 13.5 0.5 1 98 1 169.5 103 169.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(1284.5 + 26, 1873.5 + 43, '0.5 85.5 0.5 0.5 51 0.5 51 85.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(1740.5 + 29.5, 1650.5 + 35, '0.5 0.5 0.5 69.5 58 69.5 47 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1149 + 297.5, 1364.5 + 108, '1 0.5 1 215 594.5 215 594.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(549 + 79.5, 1299.5 + 76.5, '1 0.5 1 152 158.5 152 158.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box6 = this.matter.add.fromVertices(546.5 + 47.5, 813 + 42, '0.5 1 0.5 83.5 94 83.5 94 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(413.5 + 40.5, 741.5 + 45.5, '0.5 0.5 0.5 90.5 80.5 90.5 80.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(345.5 + 24, 665 + 58, '0.5 115.5 47.5 115.5 47.5 1 0.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box9 = this.matter.add.fromVertices(226 + 270, 279.5 + 170, '539.5 339 1 339 1 0.5 539.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box10 = this.matter.add.fromVertices(1184.5 + 37, 638 + 79.5, '0.5 134 0.5 1 73.5 1 73.5 158.5 40 158.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(1195.5 + 345, 280.5 + 166.5, '689.5 326 0.5 332 0.5 0.5 689.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box12 = this.matter.add.fromVertices(1679 + 67, 742 + 67.5, '133 134 1 134 1 1 133 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })


        const arrBodies = [backDoor, forwardDoor, box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12];


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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1040, 1990);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 460);
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