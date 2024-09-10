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

export class GameScene6 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE6);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map6', './assets/map/map_christmas_travel_6.jpg');

        this.load.image('joke5', './assets/jokes/Joke 5.png')
        this.load.image('joke6', './assets/jokes/Joke 6.png')

        this.load.image('sydneyNameplate', 'assets/nameplate/sydney.png');
        this.load.image('parisNameplate2', 'assets/nameplate/paris2.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map6');

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
        this.matter.add.fromVertices(433, 1120, '518 1553 513.5 1594.5 513.5 1616.5 0.5 1616.5 0.5 1 1126.5 1 1126.5 303.5 936 303.5 936 337.5 957 347 973.5 362 973.5 450 964.5 457.5 952 450 952 402 941 402 931 414.5 918 405 792 402 781.5 414.5 771.5 422 775.5 429 768.5 435.5 751 435.5 747 425.5 718 457.5 714.5 474.5 598 474.5 598 497 751 497 751 477.5 765.5 477.5 768.5 649.5 747 649.5 747 594.5 425 594.5 425 477.5 438.5 477.5 438.5 383 410.5 371 387.5 371 387.5 349.5 410.5 343 410.5 181.5 278.5 181.5 278.5 572 249 572 249 602.5 270 624.5 270 640.5 261 662 265.5 678 257.5 699.5 274 699.5 270 713 257.5 729.5 229 737.5 244.5 742.5 229 746.5 207.5 737.5 207.5 756 187 756 179 775.5 158 770 139.5 766.5 115 770 97.5 785.5 85.5 785.5 82 779 108.5 752.5 97.5 729.5 73.5 729.5 55 716.5 45.5 699.5 16.5 699.5 16.5 825.5 52 820 82 825.5 82 832.5 66 847 77.5 855.5 97.5 842.5 115 832.5 130.5 825.5 166 825.5 191 812.5 200 815.5 240 807 236 820 207.5 825.5 200 839 191 859.5 187 875.5 161.5 885.5 171 909.5 200 909.5 233.5 894.5 244.5 882 249 847 270 847 270 859.5 278.5 875.5 312.5 888.5 341.5 897.5 369.5 897.5 389 897.5 423 888.5 436.5 900.5 440.5 1064 608 1064 608 1034 625 1034 625 1041.5 722 1037.5 743 1041.5 769 1051 798.5 1051 804 1029 830.5 1029 830.5 1131 798.5 1131 798.5 1308.5 820.5 1301.5 826 1308.5 840.5 1315.5 840.5 1277 820.5 1269.5 820.5 1254.5 826 1234.5 838.5 1218.5 863.5 1200.5 871 1223.5 886 1245 871 1261.5 877.5 1280.5 877.5 1308.5 845.5 1328 826 1337.5 781.5 1346.5 785.5 1416 771 1500.5 573.5 1500.5 552.5 1487.5 490 1487.5 473 1500.5 477 1518.5 499.5 1532 455 1542.5 409 1559 381 1581 434.5 1581 518 1553', { isStatic: true }, true)
        this.matter.add.fromVertices(1044 + 537, 356 + 777.5, '476.5 1502 462 1517.5 462 1554.5 1073.5 1547.5 1073.5 1 0.5 1 0.5 231 118 231 118 262 87.5 276 78 286.5 78 383 97.5 383 97.5 330.5 259.5 330.5 280.5 351 277.5 361 301 361 306 347.5 320 330.5 337.5 330.5 337.5 383 368 383 368 401 468.5 401 468.5 426 294.5 421 294.5 401 277.5 401 277.5 576.5 294.5 576.5 294.5 516 601.5 521 601.5 536.5 616.5 536.5 620.5 512 635 486 640 298 670.5 292 670.5 276 640 266 640 110 764 110 769 496.5 805 496.5 805 516 823 516 823 537 791 542 764 542 759.5 565 759.5 588 749.5 610 791 633 814 642.5 823 752 896.5 764.5 896.5 733.5 907 726 931 708 958.5 708 1005 713.5 1043 713.5 1043 843 1021.5 843 1027.5 862.5 1005 866.5 998 843 983 833 983 871.5 964.5 866.5 941.5 852.5 918 833 875.5 823 827 803 823 779 805 772.5 805 785 791 794 704 798 664.5 805 642.5 814 642.5 990.5 473.5 990.5 473.5 961.5 455.5 961.5 455.5 971 354 971 354 941 229 941 229 1022.5 217 1022.5 217 1005.5 203 1005.5 203 1048.5 223.5 1053 236.5 1062.5 279 1062.5 279 1237.5 268.5 1237.5 258.5 1229 244.5 1245.5 229 1245.5 229 1258 250.5 1268.5 273 1262 289.5 1279 289.5 1413 658 1413 658 1511 619.5 1468 596.5 1463 610.5 1475 637 1517.5 601.5 1511 560 1511 522.5 1485 489.5 1475 476.5 1502', { isStatic: true }, true)
        this.matter.add.fromVertices(838 + 149.5, 769.5 + 86.5, '1 1.5 1 169 18.5 169 18.5 143.5 276.5 143.5 280.5 172.5 298.5 172.5 296.5 6.5 82.5 6.5', { isStatic: true }, true)
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

        const sydneyNameplate = this.matter.add.sprite(1140, 1942 - 140, 'sydneyNameplate', null, {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        });

        sydneyNameplate.setScale(0.3);

        const parisNameplate = this.matter.add.sprite(900, 1942 - 140, 'parisNameplate2', null, {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        });

        parisNameplate.setScale(0.3);

        const elf1 = this.matter.add.sprite(677 + 32, 1926 + 42 - 177, 'elf1', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf2 = this.matter.add.sprite(1453 + 32, 1376 + 42 - 177, 'elf4', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(767 + 32, 981 + 42 - 177, 'elf5', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(1683 + 32, 1002 + 42 - 177, 'elf3', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [elf1, elf2, elf3, elf4, sydneyNameplate, parisNameplate];


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
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'pekinKey1');
        this.firstKey.setScale(0.8);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'pekinKey2');
        this.secondKey.setScale(0.8);
        this.secondKey.setVisible(false);
        this.secondKey.setDepth(2);
        this.secondKey.setScrollFactor(0);
        this.secondKey.setAlpha(0);

        this.firstJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke5');
        this.firstJoke.setScale(0.8);
        this.firstJoke.setVisible(false);
        this.firstJoke.setDepth(2);
        this.firstJoke.setScrollFactor(0);
        this.firstJoke.setAlpha(0);

        this.secondJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke6');
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1054, 1100);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 1630);
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