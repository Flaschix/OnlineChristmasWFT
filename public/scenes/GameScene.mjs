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
        this.load.image('map', './assets/map/map_christmas_dinner_1.jpg');

        this.load.image('joke5', './assets/jokes/Joke 5.png')
        this.load.image('joke6', './assets/jokes/Joke 6.png')
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
        this.matter.add.fromVertices(750, 1170, '797.5 1319.5 797.5 1452 18 1444 1 0.5 1946.5 0.5 1946.5 438.5 1820 438.5 1820 315.5 1743.5 259.5 1697 259.5 1591 214 1528.5 214 1519 290.5 1477 290.5 1469.5 259.5 1352.5 268.5 1352.5 184.5 1318 184.5 1318 295 1298 337 1248 351.5 1178 337 1142 295 1123.5 315.5 1064 315.5 1064 259.5 902 259.5 902 315.5 852 315.5 833.5 306 797.5 328 727.5 337 673 315.5 646.5 268.5 646.5 225 657 184.5 563.5 184.5 462.5 198.5 316 198.5 192.5 225 167.5 284 141 306 118 295 118 268.5 93 268.5 63.5 315.5 63.5 384 118 351.5 167.5 368.5 182 438.5 302 438.5 316 429 394 429 409.5 438.5 521.5 438.5 521.5 663 476.5 663 476.5 794 211.5 794 211.5 884.5 167.5 906 182 954.5 521.5 954.5 521.5 1168 255 1168 255 1319.5 521.5 1319.5 521.5 1296 507.5 1255.5 554.5 1227.5 602.5 1244.5 635.5 1227.5 685.5 1201 724 1227.5 735 1269.5 768 1269.5 768 1308.5 797.5 1319.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1295 + 385.5, 1070 + 520.5, '535.5 531.5 510.5 564 510.5 654.5 468 671.5 431 671.5 412 692 421.5 723 449.5 737 482.5 723 491.5 692 521 681 552.5 692 535.5 723 535.5 862 499.5 838.5 449.5 854 412 896 339 896 351.5 854 399.5 838.5 412 798 370 767 370 723 379.5 640.5 351.5 629.5 312.5 620.5 289 640.5 278 671.5 278 723 297 754.5 339 754.5 339 779.5 312.5 798 312.5 838.5 289 854 268.5 838.5 268.5 798 239 779.5 212.5 798 169 788.5 169 754.5 133 754.5 113 779.5 86.5 798 63 838.5 24 862 11.5 896 0.5 950.5 0.5 1039.5 758 1018 770.5 14 535.5 14 521 1.5 431 1.5 421.5 14 239 14 212.5 1.5 187.5 14 187.5 241.5 220.5 241.5 220.5 310 220.5 350.5 220.5 391 247 408.5 289 408.5 312.5 391 339 372.5 535.5 372.5 535.5 241.5 700.5 241.5 700.5 271 668 285 668 318 700.5 341 700.5 408.5 668 408.5 657 445.5 682 459.5 682 531.5', { isStatic: true }, true)
        this.matter.add.fromVertices(784.5 + 236, 1340 + 158, '165.5 315 229 315 287 310 330.5 290 361.5 240 388 165 450.5 165 471 110.5 450.5 45 413 18.5 413 70 361.5 82.5 294.5 28 165.5 28 120 70 93.5 53 59.5 53 59.5 1.5 19 28 1.5 70 19 165 93.5 165 93.5 218 129.5 280.5 165.5 315', { isStatic: true }, true)
        this.matter.add.fromVertices(880 + 120, 1035 + 161, '158.5 309.5 143 320.5 107 320.5 90 309.5 65 320.5 41.5 294 27.5 286.5 20 266 9 256.5 9 224 1 205 9 172.5 32.5 132 65 113.5 102.5 97.5 107 55.5 107 26 115 1 158.5 26 166.5 63.5 158.5 104 185 113.5 222.5 132 222.5 157 222.5 182 239.5 194.5 239.5 224 239.5 256.5 205.5 294 185 309.5 158.5 309.5', { isStatic: true }, true)
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

        // Создаем область, через которую игрок не может пройти
        // const bodyBookshellMiddle = this.matter.add.fromVertices(706 + 319.5, 1435 + 173.5, '1 1 1 254.121 230.5 346 419 346 638 254.121 638 1 1 1', { label: '1', isStatic: true })

        const bodyDoor = this.matter.add.fromVertices(934 + 89, 670 + 123, '1 1 1 245 177 245 177 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const elf1 = this.matter.add.sprite(470 + 32, 927 + 42, 'elf-dance1', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });


        const elf2 = this.matter.add.sprite(585 + 32, 935 + 42, 'elf-dance2', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(385 + 32, 1383 + 42, 'elf-dance3', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(500 + 32, 1362 + 42, 'elf-dance4', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf5 = this.matter.add.sprite(1440 + 32, 861 + 42, 'elf-dance5', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf6 = this.matter.add.sprite(1555 + 32, 940 + 42, 'elf-dance3', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf7 = this.matter.add.sprite(1498 + 32, 1486 + 42, 'elf-dance2', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        elf1.play('elf_idle1');
        elf2.play('elf_idle2');
        elf3.play('elf_idle3');
        elf4.play('elf_idle4');
        elf5.play('elf_idle5');
        elf6.play('elf_idle3');
        elf7.play('elf_idle2');


        const arrBodies = [bodyDoor, elf1, elf2, elf3, elf4, elf5, elf6, elf7];


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
        const a = myMap.get('answer1');
        const b = myMap.get('answer2');

        this.pressX = this.add.image(this.player.x, this.player.y - 50, 'pressX');
        this.pressX.setDisplaySize(this.pressX.width, this.pressX.height);
        this.pressX.setVisible(false);

        this.overlayBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'overlayBackground');
        this.overlayBackground.setOrigin(0.5, 0.5);
        this.overlayBackground.setDisplaySize(this.cameras.main.width - 300, this.cameras.main.height - 100);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0);

        this.paper = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'paper');
        this.paper.setScale(0.8);
        this.paper.setVisible(false);
        this.paper.setDepth(2);
        this.paper.setScrollFactor(0);
        this.paper.setAlpha(0);

        this.title = this.add.text(570, 260, `Вопрос ${a.n}`, { font: "bold 32px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.title.setVisible(false);
        this.title.setAlpha(0);

        this.firstKey = this.add.text(a.x, a.y, `${a.text}`, { font: "normal 28px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.firstKey.setVisible(false);
        this.firstKey.setAlpha(0);

        this.secondKey = this.add.text(b.x, b.y, `${b.text}`, { font: "normal 28px MyCustomFont", fill: '#000000', align: 'center' }).setScrollFactor(0).setDepth(2);
        this.secondKey.setVisible(false);
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
                targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke, this.paper, this.title],
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

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke, this.paper, this.title],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondKey, this.firstJoke, this.secondJoke, this.paper, this.title],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1850);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.firstKey.setVisible(true);
            this.title.setText('Вопрос 1')
            this.title.setVisible(true);
            this.paper.setVisible(true);
            if (this.fold.indexOf('answer1') == -1) {
                this.mySocket.emitAddNewImg('answer1');
            }
        }

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.secondKey.setVisible(true);
            this.title.setText('Вопрос 2')
            this.title.setVisible(true);
            this.paper.setVisible(true);
            if (this.fold.indexOf('answer2') == -1) {
                this.mySocket.emitAddNewImg('answer2');
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
        this.title.setVisible(false);
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

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondKey, context.firstJoke, context.secondJoke, context.paper, context.title],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondKey, context.firstJoke, context.secondJoke, context.paper, context.title],
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