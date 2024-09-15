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

export class GameScene extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map', './assets/map/map_christmas_factory_1.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map');

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


        // if (!this.textures.exists(MAP_SETTINGS.MAP_FULL1)) {

        //     this.loadPlusTexture(MAP_SETTINGS.MAP_FULL1, './assets/map/tample_full_1.png');

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
        this.matter.add.fromVertices(835, 1344, '1007.5 1713.5 1053 1796.5 1 1819.5 1 1 1619.5 1 1619.5 1004 1367 1004 1367 755 1335.5 755 1335.5 681 1367 681 1367 639.5 1411 639.5 1411 624.5 1451 624.5 1451 639.5 1494 639.5 1494 472.5 1440 472.5 1440 546.5 1379.5 546.5 1379.5 472.5 1143.5 472.5 1143.5 546.5 1187.5 546.5 1187.5 673 1074 673 1074 575.5 1085.5 555 1085.5 525 1095.5 485 1085.5 448.5 1085.5 400.5 1095.5 375.5 1074 333 1074 105.5 815.5 105.5 815.5 324 797.5 324 815.5 465 823 485 808 534 750 534 738.5 472.5 364 465 187 659.5 187 760 325.5 760 348 771.5 355.5 860.5 325.5 860.5 325.5 1032.5 355.5 1032.5 377 1012.5 377 976 423.5 976 423.5 1004 447 1004 447 983.5 472.5 983.5 515 1032.5 515 1070.5 505 1100.5 505 1200 472.5 1247.5 407 1247.5 377 1208.5 348 1200 325.5 1539 183.5 1539 183.5 1572 207 1572 207 1671 242.5 1690 260 1722.5 364 1722.5 399.5 1789 555 1789 555 1760 580.5 1760 600.5 1746.5 612 1760 686 1760 712.5 1746.5 733.5 1760 764 1746.5 801.5 1769 826.5 1769 872 1746.5 912 1737.5 937 1729 946 1683.5 927 1659.5 927 1631 937 1605.5 977.5 1612 977.5 1659.5 953.5 1671 953.5 1722.5 987.5 1737.5 987.5 1713.5 1007.5 1713.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1420 + 316, 1277 + 407.5, '19.5 781.5 1 781.5 1 814 631.5 814 631.5 1 339 1 339 70.5 357.5 85.5 357.5 127 349 228.5 538.5 228.5 538.5 293 506 293 486 311.5 413 311.5 413 350.5 486 350.5 499.5 370.5 558.5 370.5 558.5 521.5 460.5 521.5 460.5 712.5 396.5 712.5 396.5 790.5 95 790.5 95 691 79 666 29.5 666 19.5 691 19.5 781.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1393 + 30.5, 1276 + 52, '1 64 1 95.5 20 103 45 95.5 60 54 45 54 45 16.5 20 1.5 1 16.5', { isStatic: true }, true)
        this.matter.add.fromVertices(494 + 43, 1704 + 126.5, '1 252 1 1 85 1 85 252', { isStatic: true }, true)
        this.matter.add.fromVertices(909 + 116.5, 1483 + 40, '1 65.5 1 21.5 27.5 21.5 49 1 184.5 1 206 21.5 232.5 21.5 232.5 65.5 206 65.5 184.5 79 49 79', { isStatic: true }, true)
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

        const bodyDoor = this.matter.add.fromVertices(891 + 130, 356.5 + 110.5, '1 220 1 0.5 259.5 0.5 259.5 220', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        // const firstKey = this.matter.add.fromVertices(509 + 192.5, 1657 + 71.5, '1 116 374.5 141.5 384 1 28.5 1 1 31 1 116', {
        //     label: `${LABEL_ID.FIRST_KEY}`,
        //     isStatic: true,
        // })


        const box1 = this.matter.add.fromVertices(261 + 88, 716 + 101, '175 201.5 1 201.5 1 1 175 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        });

        const box2 = this.matter.add.fromVertices(1147.5 + 91, 1928.5 + 59, '0.5 0.5 0.5 117 181 117 181 17 126.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(1514 + 86.5, 1668.5 + 138, '1 0.5 1 275 172 275 172 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1154 + 42, 1270 + 104, '1 15.5 1 207.5 83 207.5 83 15.5 55.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(1328 + 81.5, 1555.5 + 34, '1 67 1 0.5 162.5 0.5 162.5 67', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box6 = this.matter.add.fromVertices(1149 + 45, 813 + 63, '1 125.5 1 1 89.5 1 89.5 125.5', {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(1275 + 34.5, 927.5 + 43.5, '1 86 1 0.5 68.5 0.5 68.5 86', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1246 + 64, 755 + 94.5, '1 188 1 1 127 1 127 188', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box9 = this.matter.add.fromVertices(1593 + 46, 1368.5 + 57, '1 113.5 1 0.5 91.5 0.5 91.5 113.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box10 = this.matter.add.fromVertices(1750 + 70.5, 1753 + 81.5, '1 162 1 1 140 1 140 162', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(606.5 + 46, 693.5 + 96.5, '0.5 0.5 0.5 192.5 91 192.5 91 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box12 = this.matter.add.fromVertices(264 + 85, 1371.5 + 167, '169 333 1 333 1 0.5 119 0.5 169 78', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box13 = this.matter.add.fromVertices(257.5 + 86.5, 1094 + 137.5, '172 274 0.5 274 0.5 1 118.5 1 172 23.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box14 = this.matter.add.fromVertices(488.5 + 38.5, 671.5 + 50.5, '0.5 100.5 0.5 0.5 76.5 0.5 76.5 100.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box15 = this.matter.add.fromVertices(1611 + 34, 1192 + 68, '1 1 1 135 67 135 67 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box16 = this.matter.add.fromVertices(287 + 55.5, 1824 + 60.5, '1 120 1 1 110.5 1 110.5 120', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoor, box1, box2, box3, box4, box5, box6, box7, box9, box10, box11, box12, box13, box14, box15, box16];


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
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'firstKey');
        this.firstKey.setScale(0.7);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.firstKey, this.emptyKey],
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

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.emptyKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.emptyKey],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1950);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.firstKey.setVisible(true);
            if (this.fold.indexOf(this.firstKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.firstKey.texture.key);
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
        if (this.firstKey.visible) this.firstKey.setVisible(false);
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

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.emptyKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.emptyKey],
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
        //     if (this.textures.exists(MAP_SETTINGS.MAP_FULL1)) {
        //         this.fullMap = true;

        //         this.loadedResolutionMap(MAP_SETTINGS.MAP_FULL1, 1, 1)
        //     }
        // }
    }
}