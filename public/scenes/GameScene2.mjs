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
        this.load.image('map2', './assets/map/map_christmas_dinner_2.jpg');

        this.load.image('joke1', './assets/jokes/Joke 1.png')
        this.load.image('joke2', './assets/jokes/Joke 2.png')
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
        this.matter.add.fromVertices(723, 1024, '701 1502 701 1664 1 1664 1 0.5 1887.5 0.5 1887.5 203.5 1853 203.5 1831 203.5 1800 223.5 1772 219 1765.5 181.5 1747 181.5 1747 315.5 1747 415.5 1716 474.5 1677 488.5 1652 445 1652 379.5 1465 379.5 1376 379.5 1376 231.5 1315 195.5 1315 161 1260.5 161 1260.5 203.5 1221.5 223.5 1198 203.5 1198 253 1154.5 292 1106.5 306 1106.5 339 1020.5 339 1020.5 223.5 846 223.5 846 339 771 339 771 292 726 292 704 262.5 684 231.5 684 203.5 660.5 223.5 612 240.5 568.5 223.5 528 203.5 515.5 231.5 476.5 223.5 447 203.5 425 231.5 383 223.5 350 203.5 314.5 223.5 260 240.5 239.5 240.5 239.5 262.5 239.5 306 219.5 348.5 210 379.5 210 401.5 182 428 182 488.5 160 535.5 193 546.5 193 583.5 171 626 118 626 101 579 88.5 608.5 88.5 870.5 118 870.5 133.5 830 171 803.5 219.5 785 286.5 792.5 350 820.5 383 853.5 383 820.5 425 820.5 447 853.5 447 897 468.5 915.5 468.5 992 383 992 361 1029.5 327 1057.5 286.5 1071.5 239.5 1071.5 200.5 1057.5 182 1079.5 200.5 1104.5 221 1140 200.5 1160.5 252 1216.5 221 1240 239.5 1269.5 239.5 1322.5 269 1322.5 269 1357 182 1357 182 1494 383 1494 383 1455 361 1419 369 1371 414 1357 414 1296 562 1296 562 1240 643.5 1240 626 1296 738.5 1296 738.5 1477 724.5 1502 701 1502', { isStatic: true }, true)
        this.matter.add.fromVertices(1285 + 407, 650 + 748.5, '13.5 1340 13.5 1496 813 1496 813 1 735.5 1 735.5 213 682.5 213 662 231.5 662 543.5 648 573 662 606 662 641.5 631 641.5 582.5 595 482.5 595 440.5 606 397 649.5 294 649.5 270.5 685.5 270.5 886.5 309.5 913 415.5 913 440.5 933 604.5 933 620 913 648 913 648 1173 620 1173 570 1173 540.5 1173 521.5 1210.5 492 1184 440.5 1173 415.5 1140.5 389 1129.5 359.5 1173 330 1184 309.5 1157.5 185 1157.5 160 1140.5 13.5 1140.5 1 1173 1 1319.5 13.5 1340', { isStatic: true }, true)
        this.matter.add.fromVertices(422 + 241, 654 + 236, '261.5 356 157 356 120.5 361.5 97.5 348 85 321.5 80.5 295 80.5 252.5 93 205 57.5 205 18.5 178.5 1 131.5 1 83 1 63 32.5 44 66.5 2 76 44 105.5 63 135.5 94 157 133 239.5 133 239.5 83 261.5 72.5 302 72.5 330 94 322.5 109.5 322.5 133 398.5 131.5 419 159.5 448.5 159.5 461 131.5 481.5 150.5 481.5 295 472 321.5 419 321.5 398.5 356 344 356 344 471.5 330 471.5 330 440 275.5 440 275.5 471.5 261.5 471.5 261.5 356', { isStatic: true }, true)
        this.matter.add.fromVertices(796 + 246, 1154.5 + 139.5, '63.5 278.5 42 255.5 42 215 1 211.5 2 138.5 13 130.5 27.5 150.5 42 150.5 42 71 54.5 56.5 112 56.5 112 19.5 125 0.5 177.5 0.5 193.5 13 188.5 56.5 234 56.5 234 13 248.5 0.5 304.5 0.5 312.5 13 312.5 56.5 434 56.5 443.5 71 443.5 130.5 467.5 130.5 481 125.5 491 138.5 491 192.5 475.5 215 443.5 215 443.5 255.5 423.5 278.5 63.5 278.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1110 + 207, 755.5 + 188.5, '77 256.5 64.5 240 64.5 231.5 10.5 231.5 0.5 201.5 0.5 156.5 10.5 145.5 10.5 42 25 29.5 34.5 49 64.5 53.5 172 53.5 172 13 189 0.5 236.5 0.5 247.5 17.5 247.5 53.5 335 58 345.5 70.5 373.5 58 395.5 49 413 42 413 240 345.5 240 341 248.5 322.5 256.5 253.5 256.5 253.5 376 236.5 376 236.5 347 203.5 347 193 355.5 193 376 178 376 178 256.5 77 256.5', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(798.5 + 212, 1883.5 + 81.5, '0.5 0.5 0.5 162.5 423 162.5 423 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(928 + 98.5, 460 + 128, '1 1 1 255.5 196 255.5 196 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const elf1 = this.matter.add.sprite(376 + 32, 1506 + 42, 'elf3', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });


        const elf2 = this.matter.add.sprite(477 + 32, 1485 + 42, 'elf4', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(329 + 32, 1014 + 42, 'elf1', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(422 + 32, 1022 + 42, 'elf2', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf5 = this.matter.add.sprite(1486 + 32, 1525 + 42, 'elf6', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf6 = this.matter.add.sprite(1580 + 32, 1525 + 42, 'elf2', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf7 = this.matter.add.sprite(1570 + 32, 1013 + 42, 'elf5', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
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
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer3');
        this.firstKey.setScale(0.8);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer4');
        this.secondKey.setScale(0.8);
        this.secondKey.setVisible(false);
        this.secondKey.setDepth(2);
        this.secondKey.setScrollFactor(0);
        this.secondKey.setAlpha(0);

        this.firstJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke1');
        this.firstJoke.setScale(0.8);
        this.firstJoke.setVisible(false);
        this.firstJoke.setDepth(2);
        this.firstJoke.setScrollFactor(0);
        this.firstJoke.setAlpha(0);

        this.secondJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke2');
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1000, 1900);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 950);
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