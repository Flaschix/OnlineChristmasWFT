import { CST, LABEL_ID } from "../CST.mjs";

import { socket } from "../CST.mjs";

import { createUILeftMobile, decrypt } from "../share/UICreator.mjs";
import { createUI } from "../share/UICreator.mjs";
import { createAvatarDialog } from "../share/UICreator.mjs";
import { isMobile } from "../share/UICreator.mjs";
import { CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";

import { createJoystick } from "../share/UICreator.mjs";
import { createMobileXButton } from "../share/UICreator.mjs";

import { myMap } from "../CST.mjs";

import { BaseScene } from "./BaseScene.mjs";

export class GameScene3 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE3);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map3', './assets/map/map_christmas_travel_3.jpg');

        this.load.image('joke7', './assets/jokes/Joke 7.png')
        this.load.image('joke8', './assets/jokes/Joke 8.png')

        this.load.image('newyorkNameplate', 'assets/nameplate/newYork.png');
        this.load.image('rioNameplate', 'assets/nameplate/rio.png');
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


    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(750, 683, '880 1333.5 891 1365 1 1365 1 0.5 1977 0.5 1977 207 1866.5 207 1866.5 183 1860 158.5 1849 140.5 1824 131.5 1813 126 1813 106.5 1819 90 1806 83.5 1775 94.5 1762 83.5 1762 66 1752.5 60 1737.5 75 1734.5 111 1709 122.5 1689 150 1675.5 144 1659 172.5 1667.5 187 1683 183 1698 192.5 1712 216.5 1712 246.5 1702 270 1671.5 273 1667.5 287 1648.5 301.5 1628.5 291 1626 308.5 1608.5 325 1591 313.5 1583.5 293.5 1569.5 298 1551 293.5 1536.5 301.5 1521.5 283 1509 276.5 1509 258 1491 253 1486 276.5 1491 293.5 1460 308.5 1460 325 1439.5 343 1412 359.5 1403 351 1387.5 339.5 1387.5 283 1374 273 1374 258 1378.5 250 1392 246.5 1392 224.5 1383.5 207 1367 207 1363.5 219.5 1346.5 219.5 1346.5 240.5 1311 240.5 1311 283 1293.5 283 1293.5 366 1273 366 1273 343 1193 343 1193 366 1174 366 1174 343 1082.5 343 1082.5 373.5 1075 379 1064 354 930.5 354 926 363 922.5 373.5 898 379 886.5 366 893.5 354 886.5 343 805.5 343 805.5 368.5 787.5 368.5 787.5 343 701 343 701 366 684.5 366 684.5 281 668.5 281 668.5 241.5 622.5 241.5 622.5 263 609 271 601 278 616 281 622.5 292 609 311 622.5 320.5 616 347 601 368.5 594.5 366 573.5 379 568 395 549.5 395 539 387 532 366 529.5 373.5 517 390.5 526 405 511 420.5 489 423.5 481.5 405 464 402.5 437.5 405 437.5 390.5 421.5 395 406 387 406 373.5 389.5 373.5 374.5 379 361.5 373.5 361.5 362.5 368.5 351.5 368.5 337.5 361.5 300 346.5 281 326.5 263 320.5 268 308 263 277.5 263 256.5 281 240.5 271 226.5 271 209 292 200.5 292 195 300 212 315.5 226.5 324.5 226.5 334.5 240.5 337.5 252 330.5 271.5 340.5 288.5 351.5 288.5 368.5 310.5 387 310.5 412 277.5 426 288.5 436 280.5 453 284 470.5 284 482 263 482 259 474 245 474 233.5 468 238 453 226.5 443.5 233.5 426 219.5 420.5 226.5 405 206 395 206 402.5 188.5 412 174.5 405 167 426 146 436 157 449 167 462.5 167 482 181 491.5 178.5 506 197.5 508.5 197.5 522 200.5 537 203 556 167 578 157 608 137.5 618 127 614.5 99.5 614.5 91.5 624.5 63 602.5 43 634.5 60 641 74.5 660 83.5 664.5 96 655 113.5 650 127 671 124 685 157 698 167 710.5 191 726.5 200.5 710.5 193.5 704.5 206 685 214 671 233.5 664.5 279 660 299 641 302.5 631.5 320.5 634.5 333.5 629 359 621 373.5 614.5 380 618 396 614.5 396 608 418.5 602.5 448 598 475.5 602.5 486.5 614.5 511 624.5 526 621 543 629 562 631.5 567.5 647.5 600.5 664.5 633.5 689.5 664 686 679 693 681.5 705.5 700 720.5 700 742 685 750.5 694.5 760.5 703.5 764 708.5 780.5 703.5 790 700 801.5 703.5 811 727.5 843.5 752.5 853.5 752.5 1099 621.5 1099 654.5 1135.5 648 1166 683.5 1200 668.5 1224 683.5 1261.5 717.5 1261.5 734 1281.5 727.5 1294.5 744 1302 769 1341 804.5 1315.5 820.5 1281.5 830.5 1261.5 849.5 1247.5 866 1269 891 1269 880 1281.5 891 1315.5 880 1333.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1115 + 427.5, 384 + 597.5, '16 1182 2 1194 854 1188.5 854 1 711.5 1 711.5 34 689 34 674.5 51.5 657.5 66 662 84.5 640 84.5 633 98.5 633 119.5 654 143.5 662 134 683.5 143.5 670 168.5 645.5 168.5 629 192 607.5 192 592 204 592 227 584 246.5 576 270 584 281 576 295 579.5 320.5 566 344 566 355.5 579.5 371 542.5 381.5 517 388 517 398.5 492 404 466.5 410 442 423.5 417 423.5 393.5 441.5 373 441.5 366 458.5 356.5 464 356.5 480 336.5 489.5 336.5 505.5 321 505.5 308 519.5 308 536.5 301 536.5 287.5 551.5 301 566 287.5 566 270.5 581 267 608 287.5 628 267 628 256 618 238.5 624 234 618 214 612 218.5 591.5 204.5 581 192.5 566 157.5 560 138.5 566 113 581 113 608 102.5 608 90 604 64 608 64 624 44.5 628 31 648 44.5 667 44.5 678 26.5 686 13 694 17.5 713.5 26.5 723.5 26.5 916.5 38.5 926.5 336 926.5 336 941.5 301 941.5 268 953.5 241 978 220 1005 190 1011 167.5 1031 167.5 1057.5 145.5 1057.5 135.5 1078 131.5 1100.5 139.5 1118.5 151.5 1132 145.5 1147.5 131.5 1147.5 110.5 1144 110.5 1160 91 1160 87 1172.5 70 1160 33 1164.5 26.5 1188.5 16 1182', { isStatic: true }, true)
        this.matter.add.fromVertices(763 + 45, 770 + 58.5, '32 99.5 32 116 46.5 116 46.5 103.5 61.5 109 72 99.5 69 79.5 69 74 85 74 89 60.5 76 52.5 76 37.5 61.5 37.5 69 21.5 52.5 10.5 50 1 38.5 1 32 9.5 25 16.5 10.5 21.5 7.5 30.5 7.5 46 1 52.5 1 71 7.5 83 7.5 93 13.5 99.5 32 99.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1107.5 + 29.5, 850 + 39.5, '57.5 59 37.5 78 9.5 73 1.5 56.5 5 37 20.5 31 9.5 8 31.5 1.5 42 11 42 20 57.5 27 57.5 37 52 42.5 52 52 57.5 59', { isStatic: true }, true)
        this.matter.add.fromVertices(1208 + 67, 630 + 93.5, '71 171 45.5 186 18.5 171.5 21.5 159.5 6 142.5 4 133 1 120 4 106.5 1 83 21.5 77 25 55 34.5 36 39 13 55 1 71 1 92.5 22 101.5 36 83 51 92.5 60 98.5 77 101.5 87.5 111 83 115 91 107 99.5 115 109.5 107 125.5 107 139.5 132.5 149 115 163.5 98.5 171 71 171', { isStatic: true }, true)
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

        const newyorkNameplate = this.matter.add.sprite(780, 1780 + 32 - 468, 'newyorkNameplate', null, {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        });

        newyorkNameplate.setScale(0.3);

        const rioNameplate = this.matter.add.sprite(1280, 1780 + 32 - 468, 'rioNameplate', null, {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        });

        rioNameplate.setScale(0.3);

        const elf1 = this.matter.add.sprite(1204 + 32, 1326 + 42 - 468, 'elf-dance4', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf2 = this.matter.add.sprite(379 + 32, 1139 + 42 - 468, 'elf-dance2', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(765 + 32, 1024 + 42 - 468, 'elf-dance5', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(1592 + 32, 1047 + 42 - 468, 'elf-dance3', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        elf1.play('elf_idle4');
        elf2.play('elf_idle2');
        elf3.play('elf_idle5');
        elf4.play('elf_idle3');

        const arrBodies = [elf1, elf2, elf3, elf4, newyorkNameplate, rioNameplate];


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
        const a = myMap.get('tokioKey1');
        const b = myMap.get('tokioKey2');

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

        this.paper = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'paper');
        this.paper.setScale(0.8);
        this.paper.setVisible(false);
        this.paper.setDepth(2);
        this.paper.setScrollFactor(0);
        this.paper.setAlpha(0);

        this.firstKey = this.add.text(a.x, a.y, `${decrypt(a.text)}`, { font: "normal 36px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.firstKey.setVisible(false);
        this.firstKey.setAlpha(0);

        this.secondKey = this.add.text(b.x, b.y, `${decrypt(b.text)}`, { font: "normal 36px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.secondKey.setVisible(false);
        this.secondKey.setAlpha(0);

        this.firstJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke7');
        this.firstJoke.setScale(0.8);
        this.firstJoke.setVisible(false);
        this.firstJoke.setDepth(2);
        this.firstJoke.setScrollFactor(0);
        this.firstJoke.setAlpha(0);

        this.secondJoke = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'joke8');
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
                targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke, this.paper],
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
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke, this.paper],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke, this.paper],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1054, 1760);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1900);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.firstKey.setVisible(true);
            this.paper.setVisible(true);
            if (this.fold.indexOf('tokioKey1') == -1) {
                this.mySocket.emitAddNewImg('tokioKey1');
            }
        }

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.secondKey.setVisible(true);
            this.paper.setVisible(true);
            if (this.fold.indexOf('tokioKey2') == -1) {
                this.mySocket.emitAddNewImg('tokioKey2');
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

        this.paper.setVisible(false);
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
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondKey, context.firstJoke, context.secondJoke, context.paper],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondKey, context.firstJoke, context.secondJoke, context.paper],
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