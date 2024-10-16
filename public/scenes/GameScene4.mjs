import { CST, LABEL_ID } from "../CST.mjs";

import { socket } from "../CST.mjs";

import { createUILeftMobile } from "../share/UICreator.mjs";
import { createUI } from "../share/UICreator.mjs";
import { createAvatarDialog } from "../share/UICreator.mjs";
import { isMobile } from "../share/UICreator.mjs";
import { CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";

import { createJoystick } from "../share/UICreator.mjs";
import { createMobileXButton } from "../share/UICreator.mjs";

import { myMap } from "../CST.mjs";

import { BaseScene } from "./BaseScene.mjs";

export class GameScene4 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE4);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map4', './assets/map/map_christmas_room_4.jpg');
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
    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(857, 867, '779 1579 779 1889 1 1889 1 1 1839 1 1839 559 1766 559 1749.5 578.5 1730 578.5 1703.5 565.5 1700.5 548.5 1686 527 1686 501.5 1694.5 474 1703.5 444.5 1730 422 1749.5 433.5 1761.5 455 1771.5 474 1771.5 376.5 1761.5 376.5 1749.5 395 1730 408.5 1703.5 408.5 1676 395 1666 372 1616.5 372 1616.5 391 1515 391 1511.5 570.5 1400 570.5 1387.5 376.5 1248 376.5 1236 395 1214.5 408.5 1185 408.5 1163.5 395 1153.5 376.5 1101 376.5 1101 533 1088 538.5 1078.5 533 1082 296.5 1054.5 296.5 1049 283 1049 136 897 136 897 283 886.5 293 865 296.5 865 533 853 538.5 841.5 533 841.5 372 770.5 372 770.5 454 595 454 589.5 572.5 481.5 572.5 476 454 327 454 223.5 578.5 161.5 522 161.5 756.5 181 756.5 234 739 293 756.5 293 817.5 333.5 817.5 333.5 980.5 324 990.5 324 1033.5 314.5 1033.5 314.5 1074.5 314.5 1112.5 290 1133 293.5 1251 483.5 1269 483.5 1255 468 1226 468 1183 488 1183 498 1150.5 534.5 1146.5 569.5 1156 591 1183 601.5 1183 601.5 1226 582.5 1238.5 582.5 1269 635.5 1269 635.5 1251 641.5 1238.5 653.5 1234.5 671.5 1234.5 677 1251 671.5 1293 586 1293 586 1540 480 1540 480 1419 325 1419 293.5 1419 277.5 1429.5 267 1579 779 1579', { isStatic: true }, true)
        this.matter.add.fromVertices(1415 + 384, 700 + 685.5, '1 1057 1 1370.5 767 1370.5 767 0.5 637 0.5 637 169.5 588.5 136.5 503.5 224 497.5 273.5 520 309 588.5 360 644 284 644 737 603 750 588.5 779.5 588.5 806.5 611 825.5 644 806.5 644 855 603 855 603 923.5 575.5 938 562.5 982.5 575.5 1003 575.5 1057 1 1057', { isStatic: true }, true)
        this.matter.add.fromVertices(1420 + 79.5, 1240 + 196.5, '10 392 0.5 298.5 28.5 120 28.5 32.5 48.5 32.5 62 1 91 1 126.5 1 144 32.5 158 32.5 158 71.5 144 98.5 121.5 280.5 114.5 392 10 392', { isStatic: true }, true)
        this.matter.add.fromVertices(820 + 220, 970 + 125.5, '0.5 77 0.5 8 18 1 39.5 36 57 8 99 8 99 36 325 36 325 1 369.5 8 376.5 36 390.5 36 395 12.5 410.5 1 423.5 8 428 77 400 150 276.5 150 276.5 208.5 302 205 298.5 250 117 250 117 205 127.5 208.5 127.5 147 22.5 150 0.5 77', { isStatic: true }, true)
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                /*if (this.textures.exists(MAP_SETTINGS.MAP_FULL1))*/ this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
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

        // Создаем область, через которую игрок не может пройти
        // const bodyBookshellMiddle = this.matter.add.fromVertices(706 + 319.5, 1435 + 173.5, '1 1 1 254.121 230.5 346 419 346 638 254.121 638 1 1 1', { label: '1', isStatic: true })

        const bodyDoor = this.matter.add.fromVertices(957 + 79, 235.5 + 103, '1 0.5 1 205.5 157.5 205.5 157.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const backDoor = this.matter.add.fromVertices(849.5 + 169.5, 1870.5 + 85.5, '0.5 0.5 0.5 170.5 338 170.5 338 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(382 + 198.5, 1408 + 104, '1 207.5 1 1 396 1 396 207.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(1280 + 202.5, 1404 + 103, '1 205 1 1 404.5 1 404.5 205', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(946.5 + 92, 831.5 + 179.5, '0.5 358 0.5 0.5 183 0.5 183 358', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(384.5 + 230.5, 452 + 95, '0.5 189 0.5 1 460 1 460 189', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(1331.5 + 180.5, 449.5 + 96.5, '0.5 192 0.5 0.5 360 0.5 360 192', {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
        })


        const arrBodies = [bodyDoor, box1, box2, box3, box4, box5, backDoor];


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
        const a = myMap.get('fivethKey');

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

        this.paper = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'paper');
        this.paper.setScale(0.85);
        this.paper.setVisible(false);
        this.paper.setDepth(2);
        this.paper.setScrollFactor(0);
        this.paper.setAlpha(0);

        this.title1 = this.add.text(a.xt, 170, `${a.title}`, { font: "bold 20px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.title1.setVisible(false);
        this.title1.setAlpha(0);

        this.fivethKey = this.add.text(a.x, 250, `${a.text}`, { font: "normal 18px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.fivethKey.setVisible(false);
        this.fivethKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.emptyKey, this.paper, this.title1],
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
            if (this.avatarDialog.visible || this.exitContainer.visible) return;
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
                        targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.emptyKey, this.paper, this.title1],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.emptyKey, this.paper, this.title1],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 1860);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 420);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.fivethKey.setVisible(true);
            this.title1.setVisible(true);
            this.paper.setVisible(true);
            if (this.fold.indexOf('fivethKey') == -1) {
                this.mySocket.emitAddNewImg('fivethKey');
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.emptyKey.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.fivethKey.visible) { this.fivethKey.setVisible(false); this.title1.setVisible(false); this.paper.setVisible(false); }
        if (this.emptyKey.visible) this.emptyKey.setVisible(false);

        this.paper.setVisible(false)
        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    loadedResolutionMap(name, scaleX, scaleY) {
        this.map.setScale(scaleX, scaleY);

        this.map.setTexture(name);
        this.matter.world.setBounds(0, 0, this.map.width * scaleX, this.map.height * scaleY);
    }

    itemInteract(context) {
        if (context.avatarDialog.visible || context.exitContainer.visible) return;
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
                    targets: [context.overlayBackground, context.closeButton, context.fivethKey, context.emptyKey, context.paper, context.title1],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.fivethKey, context.emptyKey, context.paper, context.title1],
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
    }
}