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
        this.load.image('map3', './assets/map/map_christmas_dinner_3.jpg');

        this.load.image('joke3', './assets/jokes/Joke 3.png')
        this.load.image('joke4', './assets/jokes/Joke 4.png')
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map3');

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
        this.matter.add.fromVertices(575, 1050, '813 1368.5 813 1649 1 1649 1 0.5 1977.5 0.5 1977.5 351.5 1791 351.5 1791 141 1634 141 1634 188.5 1416 188.5 1416 153 1330.5 153 1302 188.5 1268.5 206.5 1235.5 200.5 1207 188.5 1185.5 172 1114 172 1114 106.5 866.5 106.5 866.5 172 778.5 172 743 188.5 732.5 206.5 708.5 213.5 689.5 188.5 655 180.5 619.5 200.5 580 180.5 567 153 482.5 153 482.5 213.5 406.5 213.5 397 231.5 359 265 320.5 278 312.5 338.5 230.5 338.5 230.5 291 194.5 278 167.5 257.5 149.5 257.5 160 291 160 318.5 167.5 338.5 149.5 360 149.5 386 149.5 432.5 174.5 432.5 174.5 529 194.5 529 194.5 545.5 261.5 545.5 261.5 661 194.5 661 194.5 715.5 97 715.5 97 815.5 149.5 815.5 167.5 840.5 167.5 951 143.5 970 62.5 970 62.5 1039 105.5 1075 127 1096 149.5 1127 174.5 1165 174.5 1189 200.5 1210.5 200.5 1240 200.5 1265 237.5 1265 259 1265 276.5 1281.5 342 1281.5 353 1230.5 361 1202 376.5 1210.5 399 1252 416 1252 423 1223.5 442 1223.5 464.5 1252 486 1252 511 1230.5 530 1230.5 543 1240 563.5 1240 563.5 1273.5 692 1281.5 692 1297 715.5 1297 736 1325.5 749 1340 736 1368.5 813 1368.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1210 + 543.5, 807 + 665.5, '0.5 1051 0.5 1330.5 886.5 1330.5 886.5 1 817.5 1 817.5 183 717.5 183 717.5 302 752 302 752 347 732 367 752 378 771 392 686.5 392 686.5 420.5 645 420.5 603.5 438.5 577 479 558 514.5 548.5 561 566.5 593 589 635 611.5 656 645 682.5 686.5 682.5 686.5 768 717.5 777.5 701 820.5 672.5 853.5 664 894 664 924 664 958.5 589 965.5 535.5 949 522.5 924 501 894 476 924 452.5 882 431 863 431 894 409.5 908.5 409.5 934.5 393 934.5 385.5 924 364.5 908.5 340.5 908.5 320.5 934.5 309.5 958.5 201.5 958.5 187 977.5 144 958.5 110 965.5 90.5 989.5 90.5 1022.5 110 1051 0.5 1051', { isStatic: true }, true)
        this.matter.add.fromVertices(365.5 + 248, 850 + 162, '0.5 267.5 0.5 51 128 51 128 1 229 1 229 51 263.5 51 263.5 8 361 8 361 51 495.5 51 495.5 267.5 385 267.5 385 309 368 323 300.5 323 293.5 309 293.5 267.5 229 267.5 229 309 215 323 153 323 138.5 309 138.5 267.5 0.5 267.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1178 + 221.5, 813 + 173.5, '171.5 346.5 171.5 315 152.5 308.5 131.5 290.5 106 271 84 247.5 73.5 225.5 1 225.5 1 113 73.5 113 94.5 82.5 120 63 144 51 171.5 46 171.5 1 251 1 251 46 269 46 303.5 63 328 82.5 356 100.5 442.5 100.5 442.5 212 376 212 376 233 356 233 334 271 313 290.5 290 303.5 264 315 264 346.5 171.5 346.5', { isStatic: true }, true)
        this.matter.add.fromVertices(550 + 373.5, 1295 + 159.5, '0.5 268.5 0.5 54.5 25.5 54.5 25.5 0.5 113 0.5 113 54.5 667 61.5 667 100.5 746 100.5 746 318 566 318 566 275 526.5 275 506 311 460 311 414 304.5 367.5 304.5 355.5 297.5 355.5 268.5 310 268.5 310 297.5 301 311 202 311 163 311 149.5 297.5 149.5 268.5 113 268.5 113 318 25.5 318 25.5 268.5 0.5 268.5', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(856 + 143, 1922.5 + 60, '1 0.5 1 119.5 285.5 119.5 285.5 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(891.5 + 134.5, 262.5 + 157, '0.5 0.5 0.5 313 268 313 268 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const elf1 = this.matter.add.sprite(228 + 32, 1191 + 42, 'elf3', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });


        const elf2 = this.matter.add.sprite(329 + 32, 1170 + 42, 'elf4', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(340 + 32, 1285 + 42, 'elf2', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(1457 + 32, 1294 + 42, 'elf5', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf5 = this.matter.add.sprite(1550 + 32, 1373 + 42, 'elf6', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf6 = this.matter.add.sprite(1282 + 32, 656 + 42, 'elf1', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf7 = this.matter.add.sprite(1390 + 32, 664 + 42, 'elf2', null, {
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
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer5');
        this.firstKey.setScale(0.8);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer6');
        this.secondKey.setScale(0.8);
        this.secondKey.setVisible(false);
        this.secondKey.setDepth(2);
        this.secondKey.setScrollFactor(0);
        this.secondKey.setAlpha(0);

        this.firstJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke3');
        this.firstJoke.setScale(0.8);
        this.firstJoke.setVisible(false);
        this.firstJoke.setDepth(2);
        this.firstJoke.setScrollFactor(0);
        this.firstJoke.setAlpha(0);

        this.secondJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke4');
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 680, 1950);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 760);
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