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
        this.load.image('map2', './assets/map/map_christmas_travel_2.jpg');
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
        this.matter.add.fromVertices(902, 870, '808.5 1959 783 2013.5 0.5 2013.5 0.5 1 1811.5 1 1811.5 962.5 1588.5 962.5 1580 712.5 1536 712.5 1534 733.5 1435 733.5 1441 752 1454.5 765 1477 777.5 1482 798.5 1508 798.5 1523.5 811.5 1523.5 833.5 1519.63 849 1494.5 857 1494.5 869.5 1508 879.269 1523.5 903.5 1519.63 923 1523.5 943.5 1534 962.5 1523.5 984 1494.5 984 1470 984 1435 984 1418 968.5 1435 943.5 1426.5 931.5 1426.5 903.5 1406 892 1398.5 857 1359.5 879.269 1337 892 1313 892 1274 915 1200.5 863.5 1173.5 884 1156 915 1131.5 931.5 1098.5 938.5 1075.5 923 1060.5 903.5 1072.5 884 1065.5 863.5 1075.5 843.5 1060.5 821 1065.5 785 1087 785 1092.5 771.5 1075.5 746.5 1072.5 717 1103.5 706.5 1131.5 706.5 1150 717 1164.5 733.5 1186 717 1164.5 706.5 1144 690 1131.5 664 1103.5 671.5 1081 664 1072.5 647.5 1072.5 624 1103.5 599 1060.5 610.5 1038.5 594 1038.5 564 1048 548.5 1030.5 526 1030.5 499 1043.5 480.5 1033.5 447.5 1033.5 396 1015 384.5 1015 368 1043.5 348.5 1055 358.5 1081 348.5 1086 322.5 1092 292.5 1125 292.5 1125 212 1114 212 1103.5 250.5 1081 263 1055 275 1033.5 268 1015 250.5 1015 130.5 1003.5 115.5 1003.5 76 983 52.5 939.5 45 894 52.5 867.5 71 867.5 115.5 858 130.5 858 238 851 263 812.5 275 791 268 777.5 250.5 768.5 231 746.5 212 746.5 282.5 768.5 292.5 777.5 312.5 791 322.5 791 348.5 810.5 363.5 838.5 365 847.5 348.5 859.5 348.5 867.5 377.5 851 409.5 851 495 851 526 828 545.5 843.5 554 843.5 585.5 805.5 599 786 610.5 791 618.5 805.5 647.5 805.5 680.5 797 690 786 690 786 706.5 805.5 717 805.5 737.5 791 765 765 777.5 765 805.5 797 793 802.5 805.5 812.5 821 802.5 843.5 819 892 812.5 909.5 812.5 931.5 786 952 746.5 943.5 746.5 923 734 903.5 707.5 892 699 863.5 693 879.269 651.5 909.5 603.5 915 583.5 903.5 574.5 884 561 884 561 872.5 553.5 856 512.5 879.269 492 892 471 872.5 455.5 892 437 884 428 892 428 931.5 413.5 938.5 413.5 978 393 994.5 368 994.5 350.5 990 333 984 319.5 972.5 319.5 952 333 931.5 319.5 931.5 304 903.5 312.5 884 333 879.269 350.5 884 366 872.5 343.5 863.5 333 835.5 312.5 828 319.5 805.5 319.5 793 343.5 777.5 366 785 380.5 811.5 401 785 419.5 777.5 419.5 765 437 751 455.5 751 471 733.5 419.5 733.5 324.5 733.5 324.5 717 283.5 717 276 952 293.5 978 293.5 1056 312.5 1073.5 305 1275 328 1252 354.5 1238.5 376.5 1230.5 395 1222 406 1193.5 428 1182 455.5 1193.5 474.5 1215 492 1205.5 526 1222 550.5 1215 576.5 1222 583.5 1193.5 603.5 1182 624 1193.5 643.5 1222 660 1205.5 693 1205.5 720 1230.5 732 1245 759 1238.5 781.5 1252 787 1275 797 1291.5 818 1300.5 825 1335.5 805.5 1351 818 1372 805.5 1380 812.5 1405 812.5 1474 751 1474 751 1460.5 732 1460.5 732 1432.5 751 1432.5 751 1405 738.5 1395.5 720 1405 693 1405 678.5 1380 660 1380 660 1422.5 703.5 1460.5 720 1521.5 709.5 1561.5 693 1600 678.5 1639 693 1639 726 1663 732 1697 732 1737 693 1774 732 1785.5 759 1803 791 1838 808.5 1880.5 818 1907.5 818 1937 808.5 1959', { isStatic: true }, true)
        this.matter.add.fromVertices(1103 + 293, 900 + 532, '52.5 1034 84 1063 585 1057.5 585 1 518 1 513 16 505.5 30.5 501 44.5 501 105.5 492.5 105.5 483 117 486.5 322.5 466.5 322.5 455.5 329 455.5 344.5 440.5 352.5 425.5 356 417 352.5 425.5 334.5 440.5 306.5 440.5 290.5 417 265.5 398 275 377 262 377 242.5 360 226 328.5 242.5 304 262 304 275 282 279.5 247 262 233 262 212.5 265.5 197.5 279.5 162.5 275 150 284 109.5 275 76 290.5 76 306.5 62 322.5 34 322.5 17 339 10.5 356 5 367 17 389.5 5 401 1 421 22.5 439.5 10.5 450 10.5 515 72 515 72 504.5 121 504.5 121 538.5 114.5 562.5 121 593.5 114.5 632.5 138.5 657.5 93 682 81.5 709 81.5 742 81.5 778 114.5 812 93 830.5 65 852 45.5 881 22.5 909 13.5 945 29 992.5 52.5 1034', { isStatic: true }, true)
        this.matter.add.fromVertices(850 + 64, 1020 + 63, '22 44 10 25 1 14.5 10 1 47.5 1 66.5 14.5 66.5 36.5 84.5 39 99 55 95.5 72 119.5 72 119.5 86.5 127 99 119.5 114.5 102.5 125.5 91.5 125.5 77.5 109 77.5 93 84.5 75.5 63.5 75.5 54.5 65.5 58.5 44 47.5 50 22 44', { isStatic: true }, true)
        this.matter.add.fromVertices(1095 + 43.5, 1027.5 + 63.5, '13.5 126 8.5 115.5 1 109 1 99.5 1 91.5 8.5 81.5 21.5 81.5 25 72 21.5 61 28 46.5 50.5 46.5 39.5 28 39.5 12 54.5 0.5 70.5 0.5 70.5 12 86 15.5 86 31.5 65.5 55.5 61.5 75 50.5 87.5 50.5 109 36 126 13.5 126', { isStatic: true }, true)
        this.matter.add.fromVertices(1143.5 + 25, 1771.5 + 22.5, '38.5 40 20.5 43.5 5.5 37.5 1.5 20.5 5.5 7 29.5 1.5 44.5 9.5 49 26 38.5 40', { isStatic: true }, true)
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

        // const backDoor = this.matter.add.fromVertices(764.5 + 246, 1924 + 59, '0.5 1 0.5 117.5 491.5 117.5 491.5 1', {
        //     label: `${LABEL_ID.DOOR_BACK_ID}`,
        //     isStatic: true,
        //     isSensor: true
        // })

        // const forwardDoor = this.matter.add.fromVertices(938 + 102.5, 711.5 + 126, '1 0.5 1 251.5 204.5 251.5 204.5 0.5', {
        //     label: `${LABEL_ID.DOOR_FORWARD_ID}`,
        //     isStatic: true,
        // })

        // const thirdKey = this.matter.add.fromVertices(263.5 + 162.5, 194.5 + 186, '1.5 266.5 106.5 370.5 324 126 255 1.5', {
        //     label: `${LABEL_ID.THIRD_KEY}`,
        //     isStatic: true,
        // })

        // const fourthKey = this.matter.add.fromVertices(242.5 + 170.5, 1503.5 + 179.5, '1.5 95 113.5 1.5 339.5 244.5 268 358', {
        //     label: `${LABEL_ID.FOURTH_KEY}`,
        //     isStatic: true,
        // })




        const arrBodies = [];


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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1940);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1054, 1030);
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