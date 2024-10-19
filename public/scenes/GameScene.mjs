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

export class GameScene extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map', './assets/map/map_christmas_travel_1.jpg');
        this.load.image('joke1', './assets/jokes/Joke 1.png')
        this.load.image('joke2', './assets/jokes/Joke 2.png')

        this.load.image('newyorkNameplate', 'assets/nameplate/newYork.png');
        this.load.image('beijingNameplate', 'assets/nameplate/beijing.png');
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
    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(676, 890, '525 1493 489.5 1569 0.5 1569 0.5 1 1596.5 1 1596.5 667.5 1543 633 1520.5 644.5 1363.5 542 1363.5 529 1154.5 388 1140.5 414.5 1121 421.5 1125.5 445 1116 459.5 1105 474.5 1078 474.5 1068 459.5 1057 459.5 1044 434.5 1036.5 414.5 1044 399 1025 393 1021.5 374 1046.5 367.5 1040.5 355.5 1053 333.5 1046.5 321 1057 304 1073 290.5 1073 278.5 1046.5 255.5 1040.5 158 979 152 976 118.5 846.5 118.5 846.5 149.5 797 149.5 797 240.5 766.5 265.5 734 255.5 680.5 286 680.5 333.5 596 381.5 596 397 433.5 499.5 422 539.5 433.5 539.5 439 551.5 439 573 427 588 407.5 592 407.5 603.5 393 624 372.5 633 351 626 343.5 666.5 304.5 643 307.5 626 312 608 289 599 289 592 300 577.5 312 563.5 312 546.5 107.5 546.5 107.5 568.5 98 592 93 608 107.5 617.5 124 608 135.5 633 149 626 154.5 641.5 149 669.5 184.5 669.5 208.5 661.5 231.5 669.5 269 669.5 300 688.5 307.5 717.5 300 742.5 307.5 752 329 759 345 795.5 329 815.5 352 825.5 352 853 345 874.5 363.5 911 382.5 911 396 917.5 396 944.5 428 979 455 979 455 990 468.5 998.5 468.5 1023.5 561.5 1201.5 594.5 1224.5 594.5 1250.5 619.5 1290 613.5 1330.5 625 1342 632 1364 608 1389 574 1377.5 561.5 1430.5 544.5 1438 537.5 1467 537.5 1493 544.5 1541 525 1541 525 1493', { isStatic: true }, true)
        this.matter.add.fromVertices(1485 + 247, 900 + 469, '23 922 2 937 493 937 493 0.5 177 0.5 177 58 203 100.5 189.5 108 184.5 149.5 220 164.5 228 207 250 207 278.5 214.5 299 214.5 307.5 237 273 246.5 243 262.5 228 283 228 307 243 322.5 258.5 339.5 250 360.5 264.5 388.5 212.5 394.5 189.5 410.5 177 436.5 169 436.5 161.5 380 151 380 133.5 436.5 143.5 485.5 133.5 518.5 143.5 526 151 510.5 177 526 177 544 185.5 550 189.5 533.5 220 553 212.5 590.5 228 605.5 243 590.5 234.5 568 258.5 568 278.5 598 258.5 610.5 250 632.5 258.5 657.5 250 667 264.5 690 250 702 234.5 681.5 212.5 667 177 657.5 143.5 657.5 120 667 94.5 690 82.5 721 58.5 726.5 48 726.5 58.5 746 58.5 771 82.5 788 39.5 813 13.5 813 2 840 2 863 13.5 880.5 13.5 904.5 23 922', { isStatic: true }, true)
        this.matter.add.fromVertices(1259.5 + 139, 1406 + 136, '78.5 263.5 67.5 271 59 238 19.5 212.5 1.5 220 12 197 12 175.5 1.5 153 1.5 136 8 136 19.5 161.5 35 136 30.5 125.5 25 97.5 30.5 73 24 39 59 13.5 89.5 1.5 94.5 20 146 13.5 186.5 31 219 63 232.5 94 228.5 114 262 131 271 114 277 118 277 136 271 161.5 277 183.5 267 193 262 167 240.5 193 240.5 220 232.5 232 232.5 220 196 204 180.5 212.5 180.5 175.5 167 183.5 167 212.5 171.5 223.5 163.5 238 146 238 146 223.5 152.5 209.5 152.5 183.5 127.5 189 110.5 183.5 110.5 209.5 103.5 223.5 94.5 220 94.5 209.5 74 232 78.5 263.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1334 + 129.5, 1090 + 114.5, '151.5 165.5 97.5 170 97.5 195 103.5 206.5 97.5 218.5 82 218.5 79 206.5 87.5 195 87.5 170 56 156 44.5 144 41 156 33 165.5 16 165.5 16 150.5 28.5 128.5 19 111 10.5 128.5 5.5 124 10.5 107 10.5 79.5 1.5 52 19 16.5 41 0.5 52.5 0.5 56 33 87.5 13 141 9 179 26 204.5 52 214.5 88 210 111 233.5 124 245.5 91.5 257.5 91.5 240 147.5 240 165.5 245.5 186 233.5 186 233.5 165.5 216.5 178.5 204.5 195 204.5 220.5 196.5 227.5 193 195 165.5 178.5 160 195 151.5 195 151.5 165.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1115 + 108.5, 834 + 113, '75 220.5 60.5 224.5 63.5 211 34 192.5 26 201 20.5 196 26 178 20.5 155.5 14.5 133 1.5 119.5 9.5 100 1.5 51.5 9.5 30.5 39.5 1.5 45.5 9.5 45.5 30.5 50 42 75 24.5 113 19.5 154.5 30.5 176.5 51.5 186 81.5 186 108 205.5 125 210.5 108 216 115 210.5 139 205.5 155.5 216 173 205.5 182 202.5 168.5 168 192.5 172.5 208 168 212.5 132 183 132 168.5 120.5 168.5 120.5 183 126 201 107.5 208 97 201 102 183 102 168.5 75 208 75 220.5', { isStatic: true }, true)
        this.matter.add.fromVertices(708 + 115.5, 838 + 103.5, '123.5 194.5 114 206.5 99 206.5 99 186.5 103.5 167.5 95.5 150 78.5 145.5 83.5 186.5 69 194.5 69 178 32 186.5 32 200 23 202.5 26 167.5 20.5 154.5 12.5 145.5 7.5 167.5 1 158 1 115.5 1 91.5 7.5 91.5 17 121.5 39.5 110.5 32 81.5 46 46.5 66.5 30 66.5 12.5 95.5 1.5 121 5.5 121 16 136 18.5 161 30 178.5 50.5 184 77.5 214.5 97.5 225.5 72.5 230 77.5 220 121.5 230 145.5 214.5 145.5 214.5 135.5 199 158 194.5 175 199 194.5 189 200 184 183 151.5 175 151.5 194.5 136 194.5 123.5 194.5', { isStatic: true }, true)
        this.matter.add.fromVertices(683 + 136, 1220 + 121, '78.5 224.5 32.5 189 22.5 195 22.5 168 15 134.5 4 114.5 0.5 78 10 53.5 22.5 81.5 27 109.5 44 103 47.5 81.5 38.5 47.5 54 14.5 78.5 1 84.5 47.5 123 35.5 164.5 40 196 59.5 213 85.5 216.5 109.5 232 114.5 247.5 109.5 255.5 85.5 260.5 85.5 260.5 109.5 255.5 128.5 260.5 141.5 270.5 151 255.5 159.5 244 195 244 216 232 221.5 225 205 190 201 186.5 221.5 176 221.5 174.5 189 168.5 174 138.5 184 138.5 205 147.5 216 138.5 235 126.5 229.5 126.5 208.5 89.5 229.5 84.5 241 73 241 78.5 224.5', { isStatic: true }, true)
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

        const namePlateNewYork = this.matter.add.sprite(918, 1942 + 32 - 266, 'newyorkNameplate', null, {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        });

        namePlateNewYork.setScale(0.3);

        const namePlateBijing = this.matter.add.sprite(1118, 1942 + 32 - 266, 'beijingNameplate', null, {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        });

        namePlateBijing.setScale(0.3);


        const elf1 = this.matter.add.sprite(455 + 32, 1126 + 42 - 266, 'elf-dance1', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf2 = this.matter.add.sprite(907 + 32, 818 + 42 - 266, 'elf-dance2', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(851 + 32, 1378 + 42 - 266, 'elf-dance3', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(1641 + 32, 1254 + 42 - 266, 'elf-dance4', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        elf1.play('elf_idle1');
        elf2.play('elf_idle2');
        elf3.play('elf_idle3');
        elf4.play('elf_idle4');

        const arrBodies = [elf1, elf2, elf3, elf4, namePlateNewYork, namePlateBijing];


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
        const a = myMap.get('parisKey1');
        const b = myMap.get('parisKey2');

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

        this.firstKey = this.add.text(a.x, a.y, `${a.text}`, { font: "normal 36px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.firstKey.setVisible(false);
        this.firstKey.setAlpha(0);

        this.secondkey = this.add.text(b.x, b.y, `${b.text}`, { font: "normal 36px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.secondkey.setVisible(false);
        this.secondkey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.firstJoke, this.secondJoke, this.paper],
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
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.firstJoke, this.secondJoke, this.paper],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.firstJoke, this.secondJoke, this.paper],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1900);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE6, 1024, 1700);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.firstKey.setVisible(true);
            this.paper.setVisible(true);
            if (this.fold.indexOf('parisKey1') == -1) {
                this.mySocket.emitAddNewImg('parisKey1');
            }
        }

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.secondkey.setVisible(true);
            this.paper.setVisible(true);
            if (this.fold.indexOf('parisKey2') == -1) {
                this.mySocket.emitAddNewImg('parisKey2');
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
        if (this.secondkey.visible) this.secondkey.setVisible(false);
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
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondkey, context.firstJoke, context.secondJoke, context.paper],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondkey, context.firstJoke, context.secondJoke, context.paper],
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