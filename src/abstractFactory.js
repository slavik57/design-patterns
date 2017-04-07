// The video for this file:
// https://youtu.be/LoudyTgtDho
class NaiveUpgradesVisualizer {
    constructor(character) {
        this.character = character;
    }
    showAll() {
        this.bodyUpgrades =
            this._createBodyUpgrades();
        this.legsUpgrades =
            this._createLegsUpgrades();
        this.armsUpgrades =
            this._createArmsUpgrades();
    }
    _createBodyUpgrades() {
        if (this.character.type === 'Wizard') {
            return [{ type: 'cloak' }];
        }
        else if (this.character.type === 'Knight') {
            return [{ type: 'body armor' }];
        }
        else {
            throw new Error('Unsopported character');
        }
    }
    _createLegsUpgrades() {
        if (this.character.type === 'Wizard') {
            return [{ type: 'boots' }];
        }
        else if (this.character.type === 'Knight') {
            return [{ type: 'leg armor' }];
        }
        else {
            throw new Error('Unsopported character');
        }
    }
    _createArmsUpgrades() {
        if (this.character.type === 'Wizard') {
            return [{ type: 'gloves' }];
        }
        else if (this.character.type === 'Knight') {
            return [{ type: 'sword' }];
        }
        else {
            throw new Error('Unsopported character');
        }
    }
}
class UpgradesVisualizer {
    constructor(factory) {
        this.factory = factory;
    }
    showAll() {
        this.bodyUpgrades =
            this.factory.createBodyUpgrades();
        this.armsUpgrades =
            this.factory.createArmsUpgrades();
        this.legsUpgrades =
            this.factory.createLegsUpgrades();
    }
}
class WizardUpgradesFactory {
    createBodyUpgrades() {
        return [{ type: 'cloak' }];
    }
    createArmsUpgrades() {
        return [{ type: 'gloves' }];
    }
    createLegsUpgrades() {
        return [{ type: 'boots' }];
    }
}
class KnightUpgradesFactory {
    createBodyUpgrades() {
        return [{ type: 'body armor' }];
    }
    createArmsUpgrades() {
        return [{ type: 'sword' }];
    }
    createLegsUpgrades() {
        return [{ type: 'leg armor' }];
    }
}
const visualizer = new UpgradesVisualizer(new WizardUpgradesFactory());
visualizer.showAll();
console.log('arms', visualizer.armsUpgrades);
console.log('legs', visualizer.legsUpgrades);
console.log('body', visualizer.bodyUpgrades);
