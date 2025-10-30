import { Controls } from './controls.js';
import * as Game from './game.js';
import * as UI from './ui.js';

export class App {
    constructor() {
        this.controls = new Controls();
        this.isDesktop = !('ontouchstart' in window) && navigator.maxTouchPoints < 1;
    }

    init() {
        window.addEventListener('resize', UI.resizeCanvases);
        UI.resizeCanvases();

        if (this.isDesktop) {
            UI.setupDesktopUI();
            UI.showScreen('start');
            return;
        }

        this.addEventListeners();
        Game.preload(this.controls);
    }

    addEventListeners() {
        UI.startButton.addEventListener('click', () => {
            if (this.isDesktop) return;

            Game.createAudioContext();

            this.controls.requestPermission().then(granted => {
                if (granted) {
                    Game.init();
                } else {
                    alert('Motion sensor access is required to play this game.');
                }
            }).catch(console.error);
        });

        UI.restartButton.addEventListener('click', () => {
            Game.init();
        });
    }
}

