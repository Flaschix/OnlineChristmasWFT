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
        this.load.image('map5', './assets/map/map_christmas_factory_5.jpg');
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

    }


    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(650, 1390, '549 1298.5 549 1354 0.5 1354 0.5 0.5 1687 0.5 1687 169.5 1255 169.5 1255 263 1174.5 263 1150 277.5 1115.5 277.5 1097.5 268 1071.5 246 1071.5 219.5 1056.5 219.5 1019 230.5 987 219.5 987 174.5 819 174.5 819 219.5 713 219.5 693 208 666 219.5 626 219.5 606 208 606 182 448.5 182 448.5 230.5 442 257.5 408.5 277.5 369.5 277.5 340 257.5 340 182 195.5 182 184.5 199.5 91 199.5 91 537 108 520 131 520 154.5 537 166 580 146 609.5 91 615.5 91 749 100.5 770 349.5 770 357 749 357 703 385.5 703 385.5 435 420 435 460 417 488.5 430 559.5 430 577.5 456 577.5 668 559.5 677.5 559.5 703 584 727 584 754.5 639.5 754.5 639.5 770 708 770 708 742 721.5 734.5 751 777.5 751 951 650 951 645 995 363.5 995 349.5 980 91 980 91 1077 612.5 1077 612.5 1258 146 1258 190 1310 223.5 1335 261.5 1343.5 312 1343.5 342.5 1327 373 1343.5 415 1343.5 434.5 1321.5 461 1310 489.5 1310 521 1321.5 537.5 1298.5 549 1298.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1493 + 210, 877.5 + 589.5, '156.5 1124 120 1178 459 1168 444 0.5 317 0.5 328 387 251.5 387 243 351.5 206 344.5 206 307.5 218 293 218 265 192.5 256 172 273.5 1 273.5 1 293 1 335 12 344.5 61.5 344.5 61.5 472.5 76.5 488 218 488 218 770 180.5 770 180.5 687 110.5 681.5 94 693.5 94 760 103 779.5 83.5 779.5 83.5 863 236.5 863 236.5 770 282.5 770 315 760 315 986.5 266 1028 211 1079.5 156.5 1124', { isStatic: true }, true)
        this.matter.add.fromVertices(1215 + 132.5, 1030 + 262.5, '51 524 31 498.5 31 338 9.5 338 1 223 1 118 31 94 31 23.5 110 23.5 133 0.5 217 0.5 217 30.5 232.5 39 232.5 188.5 256.5 188.5 264 205 256.5 230 232.5 230 232.5 280 264 304 256.5 338 232.5 338 232.5 498.5 210 524 51 524', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(854.5 + 193.5, 2012.5 + 17.5, '0.5 0.5 0.5 34 386.5 34 386.5 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(268 + 44.5, 1035.5 + 76.5, '74 152.5 1 152.5 1 0.5 88.5 0.5 88.5 134.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(661.5 + 55.5, 879.5 + 44, '0.5 87 0.5 0.5 110 0.5 110 87', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(873 + 150, 469 + 209.5, '1 1 1 418 299 418 299 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1477 + 169, 714 + 88, '1 8.5 1 158 97 175 337.5 175 337.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(1544 + 61.5, 1018 + 78.5, '1 156 1 1 122 1 122 156', {
            label: `${LABEL_ID.SIXETH_KEY}`,
            isStatic: true,
        })

        const box6 = this.matter.add.fromVertices(1350.5 + 49.5, 842.5 + 64.5, '0.5 0.5 0.5 128.5 98.5 128.5 98.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(1503 + 42.5, 1718 + 59.5, '1 118 1 1 84.5 1 84.5 118', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1622.5 + 73.5, 1673 + 85.5, '0.5 170.5 0.5 12.5 32 1 146 1 146 170.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const answer = this.matter.add.fromVertices(278 + 267.5, 1767.5 + 103.5, '534 206.5 60.5 206.5 1 137 1 0.5 534 0.5', {
            label: `${LABEL_ID.ANSWER_KEY}`,
            isStatic: true,
        })

        const arrBodies = [backDoor, box1, box2, box3, box4, box5, box6, box7, box8, answer];


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
        this.sixethKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'sixethKey');
        this.sixethKey.setScale(0.7);
        this.sixethKey.setVisible(false);
        this.sixethKey.setDepth(2);
        this.sixethKey.setScrollFactor(0);
        this.sixethKey.setAlpha(0);

        this.answer = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'answer');
        this.answer.setScale(0.7);
        this.answer.setVisible(false);
        this.answer.setDepth(2);
        this.answer.setScrollFactor(0);
        this.answer.setAlpha(0);

        this.textA = this.add.text(490, 180, 'Общая форма собрана.\nПодсчитайте общее кол-во\nквадратов. ', { font: "bold 20px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.textA.setVisible(false);
        this.textA.setAlpha(0);

        this.notEnought = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'notEnought');
        this.notEnought.setScale(0.7);
        this.notEnought.setVisible(false);
        this.notEnought.setDepth(2);
        this.notEnought.setScrollFactor(0);
        this.notEnought.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.sixethKey, this.answer, this.notEnought, this.emptyKey, this.textA],
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
                        targets: [this.closeButton, this.overlayBackground, this.sixethKey, this.answer, this.notEnought, this.emptyKey, this.textA],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.sixethKey, this.answer, this.notEnought, this.emptyKey, this.textA],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 990, 520);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.SIXETH_KEY) {
            this.sixethKey.setVisible(true);
            if (this.fold.indexOf(this.sixethKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.sixethKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.emptyKey.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.ANSWER_KEY) {
            if (this.fold.length == 6) { this.answer.setVisible(true); this.textA.setVisible(true); }
            else this.notEnought.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.sixethKey.visible) this.sixethKey.setVisible(false);
        if (this.emptyKey.visible) this.emptyKey.setVisible(false);
        if (this.answer.visible) { this.answer.setVisible(false); this.textA.setVisible(false); }
        if (this.notEnought.visible) this.notEnought.setVisible(false);

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
                    targets: [context.overlayBackground, context.closeButton, context.sixethKey, context.answer, context.notEnought, context.emptyKey, context.textA],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.sixethKey, context.answer, context.notEnought, context.emptyKey, context.textA],
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