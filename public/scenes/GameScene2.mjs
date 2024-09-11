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
        this.load.image('map2', './assets/map/map_christmas_room_2.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map2');

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
        this.matter.add.fromVertices(835, 1034, '214.5 1843 203 1886 0.5 1886 0.5 0.5 1822.5 0.5 1822.5 961.5 1615.5 961.5 1612.5 757.5 1486.5 757.5 1486.5 805.5 1476 854 1462 858 1465 866.5 1479 873.5 1479 886 1467.5 889.5 1449 886 1438 873.5 1432.5 873.5 1430.5 911.5 1413 911.5 1406.5 878.5 1382.5 889.5 1365.5 889.5 1365.5 869.5 1374 869.5 1382.5 858 1368.5 854 1360 792 1354 761.5 1279 761.5 1274.5 749 1274.5 690.5 1270.5 611.5 1360.5 609 1354.5 527 1365 525 1369.5 460.5 1409.5 447 1440.5 449.5 1474 460.5 1480.5 527 1488 550 1488 565.5 1483.5 611.5 1577 618.5 1581 600.5 1614.5 600.5 1614.5 429.5 1604 415.5 1276 415.5 1268.5 432.5 1271.5 447 1266.5 464.5 1251 479.5 1231 483.5 1220 477 1210 483.5 1192 479.5 1174.5 472.5 1149.5 474.5 1122 479.5 1097 479.5 1087 464.5 1078 454 1060 454 1060 469.5 1049.5 474.5 1038 469.5 1038 227.5 1017 227.5 1008 224.5 1008 128.5 855 128.5 855 219 842.5 227.5 822 227.5 818.5 402.5 824.5 469.5 809.5 474.5 800.5 472.5 798 457.5 758.5 457.5 742.5 483.5 727.5 487 709 483.5 700.5 472.5 680 483.5 670.5 469.5 660.5 469.5 652 480.5 627.5 483.5 601.5 478 597 465 591.5 443 601.5 426.5 597 415.5 505 412.5 376 412.5 236.5 418 236.5 606 367 606 362.5 572.5 364.5 531 376 528.5 379.5 465 411 447 451 447 482 465 485 526 497 531 491.5 603 587.5 692.5 587.5 743.5 579.5 759 498.5 759 498.5 799 492 847 477 858 492 869.5 492 888.5 474 888.5 447 875 441.5 912.5 429 912.5 416.5 875 389 892 377.5 888.5 377.5 869.5 389 855 372.5 832.5 372.5 794.5 365.5 759 247.5 759 247.5 695 216.5 695 216.5 850 244 850 244 957.5 68.5 957.5 44.5 1326 106.5 1326 106.5 1100 212.5 1100 212.5 1071 239.5 1060 316 1060 316 1234 332.5 1234 335.5 1202.5 396.5 1113 411.5 1113 475 1170 492 1185.5 492 1200 475 1200 467.5 1241.5 449 1262.5 464.5 1287.5 449 1301 416 1258.5 361.5 1231 349.5 1248 332.5 1241.5 316 1241.5 316 1267.5 310.5 1273.5 304 1270 304 1234 203 1234 203 1267.5 217.5 1270 217.5 1350 204.5 1338.5 168 1338.5 177.5 1359.5 186.5 1396 217.5 1425.5 256.5 1467 583 1467 583 1602.5 534.5 1602.5 537 1678.5 517 1702 517 1717.5 503 1745.5 517 1745.5 517 1770.5 483 1770.5 471 1756 461.5 1789 447.5 1789 438 1745.5 412 1770.5 390 1770.5 398 1732.5 390 1678.5 384 1657.5 390 1605.5 323 1605.5 358 1671.5 358 1770.5 323 1770.5 310 1789 271 1808 255.5 1843 214.5 1843', { isStatic: true }, true)
        this.matter.add.fromVertices(1343 + 294.5, 1083 + 472, '377 898 383 942.5 588.5 934.5 588.5 0.5 504.5 0.5 504.5 134.5 370.5 134.5 338 115 266.5 118 266.5 254 248.5 254 189 168 173.5 168 122.5 217.5 110.5 224 110.5 233 100 233 90.5 243 95 254 110.5 254 122.5 296 138 320 122.5 340.5 138 352.5 160.5 320 224.5 284 239.5 302 252 296 252 288.5 246 272 248.5 263 266.5 263 266.5 320 272 327.5 276.5 320 276.5 288.5 395.5 288.5 395.5 320 362 320 362 399.5 376.5 399.5 383 393.5 414 393.5 405 416.5 395.5 445.5 383 459.5 368.5 481 0.5 579.5 0.5 659 55.5 659 47 672.5 52 739.5 62.5 749.5 62.5 781.5 86.5 796.5 70 810.5 74 825 91.5 825 112.5 818.5 123.5 847 141 851 141 804 153.5 804 159.5 818.5 188 825 200 818.5 260 818.5 276 851 312.5 858.5 324.5 887 340.5 898 377 898', { isStatic: true }, true)
        this.matter.add.fromVertices(848.5 + 170, 1012 + 36, '9 71.5 1.5 14 9 1 339 4.5 328 71.5 317 71.5 317 57.5 22.5 57.5 22.5 71.5 9 71.5', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(832 + 183, 1995.5 + 26.5, '1 0.5 1 52.5 365 52.5 365 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(946.5 + 77, 174.5 + 104.5, '0.5 0.5 0.5 208 153.5 208 153.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const box1 = this.matter.add.fromVertices(322 + 183, 1598.5 + 57.5, '1 114.5 1 0.5 365.5 0.5 365.5 114.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(184 + 64.5, 1241.5 + 97, '1 193 1 0.5 128.5 0.5 128.5 193', {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(1356.5 + 178, 1596.5 + 59.5, '0.5 118.5 0.5 0.5 355.5 0.5 355.5 118.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1729.5 + 67.5, 1236 + 100, '0.5 199 0.5 1 124.5 1 134 199', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(852 + 167, 858 + 81, '1 161 1 1 333.5 1 333.5 161', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box6 = this.matter.add.fromVertices(162 + 89, 589.5 + 213.5, '1 426 1 0.5 177 0.5 177 426', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(343 + 182, 757 + 54, '1 107.5 1 8 324.5 1 362.5 8 341.5 107.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1701 + 88.5, 585 + 217.5, '176 434 1 434 1 1 176 1', {
            label: `${LABEL_ID.THIRD_KEY}`,
            isStatic: true,
        })

        const box9 = this.matter.add.fromVertices(1360.5 + 158.5, 755.5 + 54.5, '316 8.38938 316 108 5 102.549 1.5 11.5 30.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [backDoor, forwardDoor, box1, box2, box3, box4, box5, box6, box7, box8, box9];


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
        this.thirdKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'thirdKey');
        this.thirdKey.setScale(0.85);
        this.thirdKey.setVisible(false);
        this.thirdKey.setDepth(2);
        this.thirdKey.setScrollFactor(0);
        this.thirdKey.setAlpha(0);

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'secondKey');
        this.secondKey.setScale(0.85);
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1940);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1034, 470);
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