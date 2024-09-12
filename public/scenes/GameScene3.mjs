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
        this.matter.add.fromVertices(746, 990, '801.5 1815.5 801.903 1813.98 801.903 1813.98 810.5 1781.5 835 1763.5 821.5 1734.5 810.5 1700.5 835 1657 801.5 1653 801.5 1624 775.5 1604.5 759 1596.5 759 1566 735.5 1566 712.5 1588.5 694 1566 647 1575 630.5 1588.5 603.5 1596.5 581.5 1580 531.5 1580 503 1596.5 476.5 1580 434 1580 386.5 1575 345 1580 361.5 1520.5 258.5 1470 247.5 1496 149.5 1444 174.5 1417.5 199.5 1395 210 1362.5 206 1326.5 199.5 1298.5 174.5 1271.5 178.5 1149.5 156.5 1140.5 149.5 1107.5 127.5 1107.5 127.5 1029.5 178.5 1029.5 187 1056 199.5 1074.5 207.5 1086.5 193.5 1095.5 193.5 1107.5 207.5 1107.5 225.5 1091 252 1101 271.5 1144 279 1144 285.5 1140.5 269 1101.5 290 1095.5 305 1079.5 329 1086.5 332 1074.5 314 1068 329 1025 323 1005.5 305 995 308 988 308 982 279 963.5 255 958 238.5 966.5 228.5 936.5 213.5 933.5 199.5 939.5 187.5 960.5 178.5 995 136.5 995 136.5 971 149.5 971 156.5 869.5 149.5 834 127.5 822 119.5 812 110 819 85.5 809 85.5 668.5 289 668.5 295 297 336.5 297 336.5 319 346 324 346 363.5 427.5 369.5 433 324 445 297 467 297 467 366.5 490 372.5 510 363.5 510 300.5 547.5 300.5 547.5 376 615.5 376 618 299.5 648 299.5 648 358.5 756 358.5 756 297 793 297 790.5 393 802.5 402 816 393 816 159 841 159 849 148 849 72.5 1001 72.5 1001 151.5 1008 159 1032.5 159 1029.5 402 1042.5 405 1052.5 396 1052.5 299.5 1101.5 299.5 1101.5 358.5 1122.5 358.5 1127 353.5 1191 353.5 1194 358.5 1214 358.5 1214 299.5 1235 299.5 1232 372 1257.5 376 1304.5 376 1304.5 299.5 1322 299.5 1322 368.5 1365.5 368.5 1365.5 353.5 1376.5 353.5 1376.5 362.5 1435 362.5 1435 341 1476 344.5 1505.5 299.5 1568.5 299.5 1565.5 669 1751 669 1751 625.5 1797 625.5 1797 1 0.5 1 0.5 1815.5 801.903 1813.98', { isStatic: true }, true)
        this.matter.add.fromVertices(1220 + 366, 1100 + 601, '28.5 1170 38 1201.5 731 1201.5 731 1 670 1 677.5 166.5 639.5 177 639.5 199.5 586.5 199.5 586.5 355 569 355 569 461.5 698 461.5 698 750.5 680.5 750.5 670 705.5 661 678.5 649.5 678.5 642.5 667 627.5 656.5 609.5 661 605.5 652.5 580.5 661 560 691 545.5 724 545.5 750.5 560 779 569 798 584.5 812.5 584.5 823.5 545.5 840.5 530 808 445 840.5 432 866 483.5 980 470.5 984.5 445 968.5 416 980 396.5 995.5 377 995.5 366 968.5 308 964.5 257 973 231.5 990.5 213 973 201 984.5 166 955 146 964.5 133.5 955 118 973 108.5 964.5 86 955 71.5 973 71.5 1006.5 46 995.5 28.5 1006.5 38 1030.5 38 1043.5 21.5 1034.5 1 1043.5 21.5 1067 28.5 1121.5 5 1121.5 1 1161 28.5 1170', { isStatic: true }, true)
        this.matter.add.fromVertices(1278.5 + 123, 1561.5 + 18, '0.5 35 0.5 0.5 245.5 0.5 245.5 35', { isStatic: true }, true)
        this.matter.add.fromVertices(796 + 227.5, 1005 + 25.5, '0.5 42 0.5 1 454 1 454 42 439.5 50 424.5 45.5 424.5 13 393.5 13 393.5 45.5 64.5 45.5 64.5 13 30 13 30 45.5 17.5 50 0.5 42', { isStatic: true }, true)
        this.matter.add.fromVertices(596.5 + 125, 1564.5 + 16.5, '0.5 32 0.5 0.5 249.5 0.5 249.5 32', { isStatic: true }, true)
        this.matter.add.fromVertices(966 + 66.5, 682 + 63, '1 98.5 1 125 132.5 125 132.5 98.5 116.5 81 113 26 98 12 76 1 43 5.5 20.5 26 20.5 55.5 20.5 78.5 1 98.5', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(912 + 148.5, 1886.5 + 78, '1 0.5 1 155.5 296 155.5 296 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(946 + 78.5, 171 + 103.5, '1 1 1 206.5 156 206.5 156 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const box1 = this.matter.add.fromVertices(563.5 + 160.5, 1357 + 109.5, '0.5 218 0.5 1 320.5 1 320.5 218', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(1248.5 + 157, 1360 + 107, '0.5 213 0.5 1 313 1 313 213', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(152.5 + 50.5, 1200 + 68.5, '0.5 136.5 0.5 1 100 1 100 136.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(194.5 + 109, 515 + 174, '217.5 347.5 0.5 347.5 0.5 6.5 217.5 1', {
            label: `${LABEL_ID.FOURTH_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(801 + 227, 789.5 + 111, '1 221.5 1 0.5 453.5 0.5 453.5 221.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box6 = this.matter.add.fromVertices(1645 + 111.5, 515 + 176, '1 351.5 1 1 222 1 222 351.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(1751 + 67, 1056 + 82.5, '11.5 164.5 1 1 132.5 1 119 164.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [backDoor, forwardDoor, box1, box2, box3, box4, box5, box6, box7];


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

        this.fourthKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'fourthKey');
        this.fourthKey.setScale(0.85);
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
                targets: [this.closeButton, this.overlayBackground, this.fourthKey, this.emptyKey],
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
                        targets: [this.closeButton, this.overlayBackground, this.fourthKey, this.emptyKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.fourthKey, this.emptyKey],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 1850);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 420);
    }

    showOverlay() {
        this.isOverlayVisible = true

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
                    targets: [context.overlayBackground, context.closeButton, context.fourthKey, context.emptyKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.fourthKey, context.emptyKey],
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