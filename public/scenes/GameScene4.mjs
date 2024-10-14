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

export class GameScene4 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE4);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map4', './assets/map/map_christmas_travel_4.jpg');

        this.load.image('joke9', './assets/jokes/Joke 9.png')
        this.load.image('joke10', './assets/jokes/Joke 10.png')

        this.load.image('sydneyNameplate', 'assets/nameplate/sydney.png');
        this.load.image('tokyoNameplate', 'assets/nameplate/tokyo.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map4');

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
        this.matter.add.fromVertices(1006, 1047, '529.5 1653.5 566.5 1678 0.5 1678 0.5 1 1952.5 1 1952.5 667.5 1941 661 1923 650.5 1918.5 664.5 1918.5 681 1906 693 1887.5 687 1873 672.5 1862.5 698.5 1851 710.5 1840.5 720.5 1833.5 728.5 1827 720.5 1822 703.5 1819 681 1802.5 698.5 1789 703.5 1785 698.5 1789 681 1785 667.5 1773 657 1755.5 657 1735.5 657 1731.5 644 1718.5 650.5 1708.5 650.5 1708.5 626 1695 614.5 1695 598 1695 581.5 1703 563.5 1715.5 541 1692 546 1665.5 543.5 1664.5 563.5 1662 584 1651.5 592.5 1639 598 1639 636.5 1646.5 633 1663 626 1677.5 623.5 1695 644 1695 672.5 1672.5 687 1664.5 681 1651.5 687 1639 687 1639 720.5 1658 710.5 1692 715.5 1703 728.5 1695 742.5 1677.5 762.5 1651.5 770.5 1672.5 790.5 1680 807.5 1672.5 827 1651.5 832.5 1631 819.5 1610.5 800.5 1615.5 827 1615.5 848.5 1601.5 861 1581 848.5 1572.5 824 1572.5 795 1548 814 1530 827 1512.5 827 1502 819.5 1502 807.5 1506.5 790.5 1519 780 1530 767.5 1555.5 759 1530 759 1512.5 746.5 1502 734.5 1356 734.5 1370.5 742.5 1392 756.5 1385.5 767.5 1365 773 1341.5 767.5 1359 780 1365 790.5 1362.5 807.5 1341.5 814 1323 807.5 1332 824 1329.5 842.5 1317 856.5 1296.5 865 1284 852.5 1277 832.5 1270.5 807.5 1257 785 1247 811.5 1243 830 1235 848.5 1215.5 856.5 1191 856.5 1181 838 1181 819.5 1188 811.5 1188 803 1156.5 814 1156.5 803 1168.5 795 1149.5 795 1134 785 1128 770.5 1134 759 1149.5 746.5 1188 736.5 1188 731.5 1076 734.5 1078.5 902.5 1070.5 909 1070.5 957.5 1068.5 976 1057 988 1062.5 999 1057 1016.5 1027.5 1016.5 1016.5 1008 1016.5 990.5 998.5 976 1002 965 1011 950 1027.5 950 1030 868.5 1027.5 862.5 1027.5 819.5 1068.5 819.5 1068.5 678.5 1089.5 678.5 1089.5 693 1257 691 1263.5 678.5 1280 663 1286.5 675 1289.5 695.5 1308.5 695.5 1318.5 687 1336 687 1349.5 691 1349.5 681 1382 681 1382 691 1512.5 693 1512.5 681 1536 681 1536 693 1592 693 1598.5 687 1621 681 1626 691 1631 693 1631 581.5 1628 568 1621 581.5 1612 601.5 1601.5 610.5 1584.5 606.5 1573.5 581.5 1573.5 558.5 1557.5 558.5 1536 563.5 1520.5 558.5 1512.5 546 1529 536.5 1542.5 527 1549 518 1523.5 515 1512.5 499 1508 478 1517.5 464.5 1542.5 464.5 1568 478 1551.5 452.5 1498 452.5 1498 392.5 1438 392.5 1438 338 1498 338 1498 195.5 1489.5 206 1485 223 1471 229.5 1452 229.5 1435.5 214.5 1435.5 191.5 1447.5 171 1418 171 1397 157.5 1389.5 141.5 1372 141.5 1372 510 1336 510 1336 558.5 1071 558.5 1071 510 1046.5 510 1046.5 488.5 1024 488.5 1024 572.5 1003 572.5 1003 469 993 454.5 888 454.5 883.5 472 883.5 572.5 862 572.5 862 472 840 472 840 503.5 834 510 813 510 813 558.5 569 558.5 569 510 528 510 528 406.5 422.5 406.5 428.5 428.5 422.5 439.5 422.5 482.5 417.5 493 417.5 533.5 334 533.5 334 678.5 358 692.5 454.5 695.5 454.5 682.5 480.5 682.5 480.5 692.5 574.5 692.5 574.5 682.5 602.5 682.5 602.5 695.5 615.5 698 625.5 710.5 632.5 686.5 639.5 676 653.5 668.5 668 657.5 683.5 657.5 683.5 676 679.5 695.5 691 686.5 710 686.5 730 686.5 739 692.5 791 692.5 791 682.5 809 682.5 809 819.5 836.5 819.5 836.5 862.5 832.5 868.5 832.5 950 850.5 950 867 972.5 845.5 990.5 845.5 1016.5 807.5 1016.5 807.5 990.5 795.5 981 795.5 955.5 795.5 911.5 786 899.5 786 819.5 804 819.5 800 731.5 744 731.5 744 761 720.5 774.5 736 789 736 810 729 823.5 711 829.5 711 862.5 684.5 837.5 658 802 658 823.5 649 844.5 625 862.5 602 849.5 592.5 823.5 611.5 794.5 558 810 553 794.5 558 766 545 749 529.5 731.5 494.5 731.5 480.5 749 466.5 761 441 749 427 731.5 346 731.5 366 749 372 766 361 789 372 810 408 823.5 417.5 837.5 398.5 849.5 432.5 855.5 460 862.5 466.5 844.5 488 837.5 498.5 857 524.5 855.5 545 868.5 534.5 879.5 534.5 907 510.5 911.5 524.5 925 529.5 950 510.5 964 488 955.5 472.5 981 480.5 1000 494.5 994 515 1008 534.5 1016.5 545 994 563 1000 563 1022.5 587 1022.5 602 1032 592.5 1046.5 563 1057 584 1064 592.5 1089.5 584 1114.5 563 1114.5 545 1103.5 534.5 1074 494.5 1119 488 1103.5 494.5 1074 472.5 1064 441 1074 417.5 1074 417.5 1052.5 408 1040.5 417.5 1026 432.5 981 447 920 398.5 950 380 937.5 361 937.5 338.5 899.5 328 937.5 316 950 316 964 338.5 981 333.5 1000 328 1016.5 351.5 1040.5 351.5 1057 333.5 1078.5 316 1074 316 1103.5 286 1103.5 263 1078.5 249 1136 223 1136 204 1126.5 192 1136 196.5 1161 185.5 1192 169 1207.5 144 1178 144 1212.5 127 1243.5 112 1257.5 127 1279 169 1279 161 1243.5 185.5 1243.5 214.5 1286 223 1257.5 249 1233.5 263 1257.5 249 1300.5 286 1286 307.5 1286 320.5 1296 320.5 1316 299 1333 316 1342.5 328 1364 328 1382 316 1405.5 333.5 1413 351.5 1413 351.5 1455.5 404 1446 429 1468 416 1485.5 372 1499 416 1520.5 429 1550 416 1568 404 1568 388.5 1554.5 380.5 1568 380.5 1581 388.5 1592 416 1592 441 1609.5 441 1581 451 1550 476 1568 486.5 1609.5 509.5 1601 541.5 1592 519 1559.5 519 1527 534 1514 566.5 1509.5 602.5 1493 644 1493 687 1520.5 695.5 1520.5 721.5 1550 740.5 1527 768 1527 768 1554.5 785 1559.5 800 1592 785 1609.5 792 1622.5 764.5 1622.5 768 1638.5 760 1653.5 740.5 1653.5 726 1626.5 703.5 1644.5 675 1644.5 668 1609.5 602.5 1616.5 578.5 1631 529.5 1653.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1590 + 265.5, 840 + 475.5, '37 917 2 950 523.5 941.5 530 1 516 1 495.5 21.5 488.5 46.5 450 21.5 440.5 43 450 68 421 80.5 407 65 385.5 46.5 362.5 51.5 332.5 51.5 317.5 68 317.5 117 332.5 129.5 356.5 135.5 346 167.5 336.5 178.5 317.5 167.5 305 178.5 298.5 202.5 271.5 192 256 202.5 267 226.5 248 256 256 269.5 267 278.5 267 296 286 283.5 298.5 296 317.5 283.5 336.5 261 378 283.5 385.5 261 378 231.5 427.5 219.5 427.5 202.5 439 192 439 178.5 427.5 161 404 150 397 124 410 117 431.5 129.5 460.5 129.5 450 155.5 475 173.5 499.5 184.5 516 161 516 355.5 495.5 355.5 475 340 460.5 363 450 401.5 423 423 410 401.5 385.5 401.5 362.5 401.5 352.5 387 332.5 410.5 305 401.5 298.5 423 286 444 256 479 237 511 211 553 200.5 581.5 158 611 133 637 158 647 181 670 158 682.5 133 701 144 719 133 745.5 121 784 108 818.5 113.5 846 108 884.5 86.5 884.5 66.5 896.5 61.5 917 37 917', { isStatic: true }, true)
        this.matter.add.fromVertices(443 + 75.5, 1315 + 55, '128.5 91 100.5 109.5 68.5 109.5 43 109.5 24.5 91 13.5 77.5 1 60.5 13.5 34 24.5 18 43 7 68.5 7 96.5 1 119 7 134 34 149.5 69.5 128.5 91', { isStatic: true }, true)
        this.matter.add.fromVertices(1325.5 + 105.5, 1110 + 101.5, '42 202 42 133.5 0.5 133.5 0.5 0.5 210.5 0.5 210.5 133.5 168.5 133.5 168.5 202 42 202', { isStatic: true }, true)
        this.matter.add.fromVertices(1555 + 91, 1050 + 94.5, '77.5 167.5 57.5 188 41 180.5 41 145.5 57.5 119.5 41 119.5 14.5 124 1 105 20.5 84 51 79 32 61 20.5 45.5 20.5 28.5 41 24 73 34.5 90 16.5 97.5 1.5 120 12 124.5 39.5 163 45.5 181 72 181 99 174 124 174 139 155.5 134 155.5 167.5 130.5 180.5 107 163 97.5 139 77.5 167.5', { isStatic: true }, true)
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

        const sydneyNameplate = this.matter.add.sprite(1150, 1980 + 32 - 200, 'sydneyNameplate', null, {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        });

        sydneyNameplate.setScale(0.3);

        const tokyoNameplate = this.matter.add.sprite(948, 1980 + 32 - 200, 'tokyoNameplate', null, {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        });

        tokyoNameplate.setScale(0.3);

        const elf1 = this.matter.add.sprite(631 + 32, 1589 + 42 - 168, 'elf-dance1', null, {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const elf2 = this.matter.add.sprite(1331 + 32, 1612 + 42 - 168, 'elf-dance4', null, {
            label: `${LABEL_ID.SECOND_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf3 = this.matter.add.sprite(567 + 32, 918 + 42 - 168, 'elf-dance5', null, {
            label: `${LABEL_ID.FIRST_JOKE}`,
            isStatic: true,
            isSensor: true
        });

        const elf4 = this.matter.add.sprite(1529 + 32, 892 + 42 - 168, 'elf-dance3', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        elf1.play('elf_idle1');
        elf2.play('elf_idle4');
        elf3.play('elf_idle5');
        elf4.play('elf_idle3');

        const arrBodies = [elf1, elf2, elf3, elf4, sydneyNameplate, tokyoNameplate];


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
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'rioKey1');
        this.firstKey.setScale(0.8);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 10, 'rioKey2');
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1054, 1100);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1500);
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