import { CST, LABEL_ID } from "../CST.mjs";

import { socket } from "../CST.mjs";

import { cd, createUILeftMobile, decrypt } from "../share/UICreator.mjs";
import { createUI } from "../share/UICreator.mjs";
import { createAvatarDialog } from "../share/UICreator.mjs";
import { isMobile } from "../share/UICreator.mjs";
import { CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";

import { createJoystick } from "../share/UICreator.mjs";
import { createMobileXButton } from "../share/UICreator.mjs";

import { myMap } from "../CST.mjs";

import { BaseScene } from "./BaseScene.mjs";

export class GameScene5 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE5);
        this.cd = cd;
    }

    preload() {
        super.preload();

        //map
        this.load.image('map5', './assets/map/map_christmas_room_5.jpg');
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

        this.createEnterCodeContainer();
    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(853, 896, '745.5 1626.5 1043 1626.5 1043 1648.5 1 1654 1 0.5 1760.5 0.5 1760.5 172 1672.5 172 1626 226.5 1570.5 188.5 1570.5 142 1507 142 1507 150 1522.5 163.5 1528.5 194.5 1522.5 258 1516 310.5 1613.5 310.5 1613.5 513 1599 513 1599 499 1278 499 1270.5 517.5 1260 517.5 1260 319.5 1405.5 319.5 1405.5 267 1399.5 253 1399.5 226.5 1409.5 201 1409.5 142 1322.5 142 1322.5 150 1254 150 1254 142 1218 142 1218 163.5 1198.5 178.5 1168.5 172 1161 201 1173 212.5 1173 247.5 1117 289.5 1075 253 1075 289.5 1010.5 289.5 1010.5 230.5 763.5 230.5 763.5 289.5 694.5 289.5 694.5 190 676.5 230.5 643 212.5 649 201 603 201 603 142 532 142 532 150 461.5 150 461.5 142 371.5 142 383.5 168 376 201 389.5 244 383.5 263.5 376 325.5 512.5 325.5 512.5 514 500.5 514 500.5 497.5 179.5 497.5 172.5 514 157.5 514 164.5 325.5 267 325.5 258 207 267 160 308.5 142 220 142 225 190 157.5 222 100 168 100 1289 123 1305 271 1090.5 271 1055.5 268 1007.5 274.5 998.5 274.5 965.5 322 947.5 374.5 947.5 388 955.5 388 976.5 383.5 998.5 392 1031.5 392 1052 400.5 1074.5 408.5 1250.5 514.5 1250.5 514.5 1309.5 499 1309.5 488 1289 181.5 1294.5 166 1355.5 206 1355.5 206 1375 223 1399 745.5 1399 745.5 1626.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1290 + 374, 873 + 738, '1 1232.5 1 1475.5 747 1475.5 747 0.5 664.5 0.5 664.5 1092 650 1122.5 636 1128.5 500.5 940 532.5 852.5 525 844 525 807.5 418 784 409.5 807.5 409.5 829 392 870 398 893.5 392 912.5 392 1045 242 1045 242 1148.5 261 1148.5 261 1128.5 591 1128.5 591 1157 538 1157 518 1232.5 1 1232.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1632 + 50, 904 + 58.5, '26 115.5 1 60 1 25 70.5 1 99 63 95.5 94.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1592 + 75.5, 1122.5 + 91.5, '24.5 164.5 28 150 5.5 141 1 129.5 18.5 28 31.5 36 36.5 13 39.5 1.5 64.5 7 89 20 103 32.5 115.5 13 130.5 1.5 142 7 149.5 32.5 146 53 137.5 79 121 102.5 127.5 120 121 150 107.5 164.5 80 169 64.5 181.5 39.5 177.5 24.5 164.5', { isStatic: true }, true)
        this.matter.add.fromVertices(341 + 78.5, 1141.5 + 92.5, '90 183.5 77 174 57.5 174 37 165.5 26.5 140.5 26.5 118 10.5 92 1 59 5 23 17 1.5 26.5 4.5 37 11 49 33 63 21 90 8.5 117.5 4.5 128 38 135 33 141 35.5 155.5 140.5 138.5 152.5 135 165.5 128 174 108 180 90 183.5', { isStatic: true }, true)
        this.matter.add.fromVertices(327.5 + 47.5, 912.5 + 50, '94 15.5 68 98.5 10 84.5 1.5 71 32.5 1.5', { isStatic: true }, true)
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

        const backDoor = this.matter.add.fromVertices(876.5 + 138, 1877 + 63, '0.5 1 0.5 125.5 275.5 125.5 275.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(286.5 + 182, 1452 + 88, '0.5 175.5 0.5 1 363.5 1 363.5 175.5', {
            label: `${LABEL_ID.SIXETH_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(1386 + 189.5, 1452 + 92, '1 183 1 1 378 1 378 183', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box3 = this.matter.add.fromVertices(284 + 187.5, 671.5 + 86, '1 171.5 1 0.5 374 0.5 374 171.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1384 + 191.5, 674 + 82.5, '1 164.5 1 1 382 1 382 164.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const kamin = this.matter.add.fromVertices(881 + 142.5, 482.5 + 70, '1 0.5 17.5 139 268.5 139 284 0.5', {
            label: `${LABEL_ID.SEIF_KEY}`,
            isStatic: true,
        })

        const arrBodies = [backDoor, kamin, box1, box2, box3, box4];


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
        const a = myMap.get('sixethKey');
        const b = myMap.get('answer');
        const c = myMap.get('wrong');

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

        this.paper = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'paper');
        this.paper.setScale(0.85);
        this.paper.setVisible(false);
        this.paper.setDepth(2);
        this.paper.setScrollFactor(0);
        this.paper.setAlpha(0);

        this.title1 = this.add.text(a.xt, 170, `${a.title}`, { font: "bold 20px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.title1.setVisible(false);
        this.title1.setAlpha(0);

        this.sixethKey = this.add.text(a.x, 250, `${decrypt(a.text)}`, { font: "normal 18px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.sixethKey.setVisible(false);
        this.sixethKey.setAlpha(0);

        this.title2 = this.add.text(b.xt, 170, `${b.title}`, { font: "bold 20px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.title2.setVisible(false);
        this.title2.setAlpha(0);

        this.answer = this.add.text(b.x, 250, `${decrypt(b.text)}`, { font: "normal 18px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.answer.setVisible(false);
        this.answer.setAlpha(0);

        this.title3 = this.add.text(c.xt, 170, `${c.title}`, { font: "bold 20px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.title3.setVisible(false);
        // this.title3.setAlpha(0);

        this.wrong = this.add.text(c.x, 250, `${decrypt(c.text)}`, { font: "normal 18px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.wrong.setVisible(false);
        // this.wrong.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.sixethKey, this.emptyKey, this.answer, this.wrong, this.paper, this.title1, this.title2, this.title3],
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

                if (this.eventZone == LABEL_ID.SEIF_KEY) {
                    if (this.overlayBackground.visible) return;
                    if (this.enterCodeContainer.visible) {
                        this.tweens.add({
                            targets: [this.enterCodeContainer],
                            alpha: 0,
                            duration: 500,
                            onComplete: () => {
                                this.enterCodeContainer.setVisible(false);
                                this.isOverlayVisible = false;
                            }
                        });

                    } else {
                        this.isOverlayVisible = true;
                        this.enterCodeContainer.setVisible(true);
                        this.tweens.add({
                            targets: [this.enterCodeContainer],
                            alpha: 1,
                            duration: 500
                        });
                    }
                    return;
                }

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
                        targets: [this.closeButton, this.overlayBackground, this.sixethKey, this.emptyKey, this.answer, this.wrong, this.paper, this.title1, this.title2, this.title3],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.sixethKey, this.emptyKey, this.answer, this.wrong, this.paper, this.title1, this.title2, this.title3],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1034, 460);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.SIXETH_KEY) {
            this.sixethKey.setVisible(true);
            this.title1.setVisible(true);
            this.paper.setVisible(true);
            if (this.fold.indexOf('sixethKey') == -1) {
                this.mySocket.emitAddNewImg('sixethKey');
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.emptyKey.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.sixethKey.visible) { this.sixethKey.setVisible(false); this.title1.setVisible(false); this.paper.setVisible(false); }
        if (this.emptyKey.visible) this.emptyKey.setVisible(false);
        if (this.answer.visible) { this.answer.setVisible(false); this.title2.setVisible(false); this.paper.setVisible(false); }
        if (this.wrong.visible) { this.wrong.setVisible(false); this.title3.setVisible(false); this.paper.setVisible(false); }

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

            if (context.eventZone == LABEL_ID.SEIF_KEY) {
                if (context.overlayBackground.visible) return;
                if (context.enterCodeContainer.visible) {
                    context.tweens.add({
                        targets: [context.enterCodeContainer],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            context.enterCodeContainer.setVisible(false);
                            context.isOverlayVisible = false;
                        }
                    });

                } else {
                    context.isOverlayVisible = true;
                    context.enterCodeContainer.setVisible(true);
                    context.tweens.add({
                        targets: [context.enterCodeContainer],
                        alpha: 1,
                        duration: 500
                    });
                }
                return;
            }

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
                    targets: [context.overlayBackground, context.closeButton, context.sixethKey, context.emptyKey, context.answer, context.wrong, context.paper, context.title1, context.title2, context.title3],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.sixethKey, context.emptyKey, context.answer, context.wrong, context.paper, context.title1, context.title2, context.title3],
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


    createEnterCodeContainer() {
        this.enterCodeContainer = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
    <div class="enterCodeContainer">
        <div id="enterCodeDialog">
            <h2 id="enterCodeTitle">Enter code</h2>
            <div id="codeInputs">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
            </div>
            <input id="join-room-connect" class="connect-space-button" type="image" src="./assets/button/enter.png" alt="Connect">
            <input id="join-room-cancel" class="connect-space-button" type="image" src="./assets/button/cancel.png" alt="Cancel">
        </div>
    </div>
                `);
        this.enterCodeContainer.setScrollFactor(0);
        this.enterCodeContainer.setOrigin(0.5, 0.5);
        const inputsContainer = document.getElementById('codeInputs')
        const titleContainer = document.getElementById('enterCodeTitle')

        const inputs = document.querySelectorAll('#codeInputs input');

        inputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
                    inputs[index - 1].focus();
                }
            });

            input.addEventListener('paste', (event) => {
                event.preventDefault();
                const pasteData = (event.clipboardData || window.clipboardData).getData('text');
                const pasteArray = pasteData.split('').slice(0, inputs.length);

                pasteArray.forEach((char, i) => {
                    inputs[i].value = char;
                });

                if (pasteArray.length < inputs.length) {
                    inputs[pasteArray.length].focus();
                }
            });
        });

        const correctCode = this.cd;
        let correctFlag = true;

        const joinRoomConnect = document.getElementById('join-room-connect');
        joinRoomConnect.addEventListener('click', () => {

            let code = '';

            inputs.forEach(input => {
                code += input.value;
            });

            code = code.toUpperCase();

            if (code == correctCode) {
                this.answer.setVisible(true);
                this.title2.setVisible(true);
                this.paper.setVisible(true);
            }
            else {
                this.wrong.setVisible(true);
                this.title3.setVisible(true);
                this.paper.setVisible(true);
            }

            this.enterCodeContainer.setVisible(false);
            this.showOverlay();
            this.tweens.add({
                targets: [this.closeButton, this.overlayBackground, this.sixethKey, this.emptyKey, this.answer, this.wrong, this.paper, this.title1, this.title2, this.title3],
                alpha: 1,
                duration: 500
            });
        });

        const joinRoomCancel = document.getElementById('join-room-cancel');
        joinRoomCancel.addEventListener('click', () => {
            this.isOverlayVisible = false;
            this.tweens.add({
                targets: [this.enterCodeContainer],
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

        this.enterCodeContainer.setVisible(false);
    }
}