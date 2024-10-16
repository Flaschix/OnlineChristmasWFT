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
        this.load.image('map3', './assets/map/map_christmas_factory_3.jpg');
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
        this.matter.add.fromVertices(820, 1060, '808.5 1752 1131.5 1752 1131.5 1788.5 0.5 1788.5 0.5 1 1862.5 1 1862.5 676.5 1748.5 676.5 1748.5 617.5 1769.5 617.5 1763.5 503.5 1678.5 503.5 1564.5 512.5 1564.5 554 1346 554 1346 503.5 1045.5 503.5 1045.5 96.5 895.5 96.5 895.5 538.5 803.5 545.5 803.5 499.5 770.5 499.5 770.5 516.5 678.5 512.5 678.5 476 621 476 621 676.5 783.5 676.5 783.5 745 664.5 745 664.5 823 722.5 823 765 889 765 1347.5 594 1347.5 594 1221.5 502 1221.5 502 1024.5 487.5 1008 487.5 903 340.5 903 340.5 938.5 385 969 385 1008 375.5 1055 340.5 1076.5 295.5 1083.5 274 1069.5 248.5 1055 257.5 1183.5 295.5 1183.5 295.5 1112 340.5 1112 348.5 1433.5 248.5 1433.5 248.5 1520 196.5 1520 196.5 1590.5 178.5 1646 138.5 1694.5 412 1694.5 808.5 1719 808.5 1752', { isStatic: true }, true)
        this.matter.add.fromVertices(1210 + 447, 860 + 573, '104 1115.5 0.5 1115.5 0.5 1145 893 1145 893 7 722 7 722 41 510 41 510 1 400 1 400 41 232.5 48 232.5 103.5 304.5 103.5 304.5 284 376.5 284 376.5 324 388.5 324 388.5 377 441.5 377 441.5 358 637 358 637 377 674 377 674 453.5 722 453.5 730.5 679 666.5 679 666.5 833.5 714 833.5 714 879.5 789.5 879.5 764.5 938.5 736.5 969 722 1017.5 736.5 1023.5 736.5 1051.5 722 1077.5 104 1077.5 104 1115.5', { isStatic: true }, true)
        this.matter.add.fromVertices(701.5 + 42.5, 1669 + 56, '32.5 110.5 0.5 81 0.5 31.5 54 1 84.5 31.5 84.5 87', { isStatic: true }, true)
        this.matter.add.fromVertices(1235 + 161.5, 1326 + 170.5, '1 82 19.5 82 128 76.5 131.5 1 307.5 8 307.5 89 322.5 89 322.5 340.5 252 340.5 252 313.5 85.5 313.5 62 340.5 12.5 340.5 12.5 268.5 1 268.5 1 82', { isStatic: true }, true)
        this.matter.add.fromVertices(483.5 + 22, 1273 + 87.5, '43 174 0.5 174 0.5 1 43 1', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(862 + 161.5, 1928.5 + 32.5, '1 0.5 1 64 322 64 322 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const forwardDoor = this.matter.add.fromVertices(957.5 + 69.5, 347 + 48.5, '0.5 96.5 0.5 1 138.5 1 138.5 96.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(573.5 + 67.5, 719 + 98.5, '0.5 196 0.5 1 134.5 1 134.5 196', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(1270 + 36, 1301 + 76.5, '1 1 1 152.5 71.5 152.5 71.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(1372.5 + 35.5, 991.5 + 89.5, '0.5 178.5 0.5 0.5 70 0.5 70 178.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1294.5 + 58.5, 675.5 + 72.5, '0.5 144 0.5 0.5 116 0.5 116 125.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(1804 + 38.5, 734 + 61.5, '1 122 1 1 76 1 76 122', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box6 = this.matter.add.fromVertices(1638.5 + 48.5, 682.5 + 41, '0.5 0.5 0.5 81 96.5 81 96.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(383 + 182.5, 1008 + 70.5, '1 38.5 1 140 364.5 140 364.5 1 114 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1581.5 + 75, 1830.5 + 80.5, '0.5 160.5 0.5 0.5 149 0.5 149 160.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box9 = this.matter.add.fromVertices(1524 + 95.5, 1204.5 + 25.5, '1 0.5 1 50.5 190.5 50.5 190.5 0.5', {
            label: `${LABEL_ID.FOURTH_KEY}`,
            isStatic: true,
        })

        const box10 = this.matter.add.fromVertices(1755 + 74.5, 1328 + 118.5, '148.5 1 1 1 1 236.5 148.5 236.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(654.5 + 43, 1789.5 + 56.5, '85.5 112.5 0.5 112.5 0.5 0.5 85.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box12 = this.matter.add.fromVertices(332.5 + 71.5, 1830.5 + 82.5, '0.5 164.5 0.5 0.5 142 0.5 142 164.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [backDoor, forwardDoor, box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12];


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
        this.fourthKey.setScale(0.7);
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 980, 1950);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 700);
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
    }
}