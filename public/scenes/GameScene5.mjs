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

export class GameScene5 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE5);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map5', './assets/map/map_christmas_dinner_5.jpg');

        this.load.image('joke9', './assets/jokes/Joke 9.png')
        this.load.image('joke10', './assets/jokes/Joke 10.png')
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map5');

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
        this.matter.add.fromVertices(543, 1186, '836 1384 863 1395.5 863 1485.5 0.5 1485.5 0.5 1 1960.5 1 1960.5 159.5 1727 159.5 1713.5 147 1631 147 1615.5 133.5 1473.5 133.5 1441.5 141.5 1403.5 147 1403.5 171.5 1378.5 182 1330 182 1304 200.5 1268 212 1236 212 1223.5 200.5 1207 206 1174 212 1151 193.5 1151 166.5 806 166.5 806 193.5 777 212 739 228.5 699.5 228.5 676.5 228.5 676.5 212 662.5 193.5 650 141.5 612.5 141.5 596 122 550.5 141.5 512.5 141.5 492.5 151 447.5 140.5 410 140.5 378 151 365.5 135.5 341 122 310 151 248 151 224 135.5 181.5 151 153.5 166.5 132 193.5 153.5 212 517.5 212 541.5 238 541.5 410.5 153.5 410.5 112.5 389 77 389 68 422 46 430 26.5 422 26.5 493 46 486 87.5 493 118.5 521 126 560.5 118.5 585 98 612 98 635 26.5 640 26.5 699 95 699 112.5 707 132 746.5 132 797 145.5 830 151.5 873.5 177.5 864.5 204.5 853 234.5 853 241.5 822 527 822 570.5 859 570.5 972 542.5 995.5 542.5 1023.5 234.5 1023.5 234.5 984 177.5 984 151.5 972 132 984 132 1192 151.5 1211.5 151.5 1256 221 1256 221 1221 261 1176.5 277.5 1176.5 322 1221 322 1249 299.5 1282 299.5 1351 313 1363.5 345 1363.5 357.5 1342 464 1342 484.5 1384 484.5 1461.5 711 1461.5 711 1384 739 1384 739 1342 836 1342 836 1384', { isStatic: true }, true)
        this.matter.add.fromVertices(1260 + 446, 730 + 670, '1 1262.5 1 1339 879.5 1339 891 0.5 823 0.5 823 60.5 779.5 60.5 762 90.5 754.5 120.5 779.5 140 754.5 183.5 718.5 183.5 718.5 194 689.5 194 689.5 113.5 658.5 113.5 658.5 90.5 623.5 74 323.5 74 302 90.5 302 281.5 399 281.5 432 327 538.5 322 538.5 281.5 651 281.5 670 240.5 709 240.5 709 281.5 734 313 734 360.5 709 366.5 709 475 718.5 491.5 768 491.5 768 573 725.5 571 709 587.5 709 680.5 689.5 680.5 670 700.5 670 792.5 709 803.5 763 803.5 763 925.5 725.5 893.5 680 932 680 956.5 696.5 976.5 696.5 1025 646 985.5 634.5 994 634.5 1083 646 1089 696.5 1062 696.5 1197.5 389.5 1197.5 357.5 1169.5 295.5 1169.5 262.5 1178 220 1226.5 220 1276 203.5 1324.5 153 1324.5 153 1255.5 131 1249.5 131 1215 119 1204 48.5 1204 48.5 1249.5 13.5 1249.5 1 1262.5', { isStatic: true }, true)
        this.matter.add.fromVertices(840 + 253, 1244 + 125, '0.5 22 0.5 217.5 157 224.5 175.5 249 209 249 226.5 224.5 483 217.5 483 133 505.5 133 505.5 22 475 13 448.5 0.5 26.5 0.5 0.5 22', { isStatic: true }, true)
        this.matter.add.fromVertices(1293.5 + 167, 1410 + 161, '121.5 308 82.5 313.5 55 313.5 25.5 271.5 12.5 243 1.5 218.5 12.5 195 1.5 164.5 1.5 133 19.5 101.5 19.5 71 38 50.5 63.5 40.5 95 14 135.5 7 176.5 7 194.5 1.5 213 7 229.5 7 256 23 290.5 40.5 313 65 313 94.5 333 124 323 146.5 333 184 323 218.5 313 243 282.5 271.5 256 287 204 313.5 148 320.5 121.5 308', { isStatic: true }, true)
        this.matter.add.fromVertices(1487 + 139.5, 1130 + 143.5, '1.5 165 1.5 75.5 30.5 45 69 17.5 109.5 1.5 151.5 1.5 189 26.5 219.5 57.5 219.5 17.5 231 1.5 278.5 57.5 278.5 112.5 243 152 219.5 214 243 254 171 285.5 138 238.5 95.5 238.5 69 254 20 246.5 1.5 222.5 20 180.5 1.5 165', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(919 + 111, 1968 + 40.5, '1 1 1 80.5 221 80.5 221 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const elf1 = this.matter.add.sprite(510 + 32, 1665 + 42, 'elf1', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });


        const elf2 = this.matter.add.sprite(605 + 32, 1637 + 42, 'elf3', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(296 + 32, 1102 + 42, 'elf1', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(424 + 32, 1032 + 42, 'elf2', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf5 = this.matter.add.sprite(1385 + 32, 1064 + 42, 'elf6', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf6 = this.matter.add.sprite(1373 + 32, 1186 + 42, 'elf5', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });


        const arrBodies = [backDoor, elf1, elf2, elf3, elf4, elf5, elf6];


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
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer9');
        this.firstKey.setScale(0.8);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer10');
        this.secondKey.setScale(0.8);
        this.secondKey.setVisible(false);
        this.secondKey.setDepth(2);
        this.secondKey.setScrollFactor(0);
        this.secondKey.setAlpha(0);

        this.firstJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke9');
        this.firstJoke.setScale(0.8);
        this.firstJoke.setVisible(false);
        this.firstJoke.setDepth(2);
        this.firstJoke.setScrollFactor(0);
        this.firstJoke.setAlpha(0);

        this.secondJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke10');
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1720);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 810);
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