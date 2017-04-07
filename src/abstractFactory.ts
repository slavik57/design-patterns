// The video for this file:
// https://youtu.be/LoudyTgtDho

interface Upgrade { type: string }
interface Character { type: string }

class NaiveUpgradesVisualizer {
  bodyUpgrades: Upgrade[];
  armsUpgrades: Upgrade[];
  legsUpgrades: Upgrade[];
  constructor(private character: Character) {
  }
  showAll() {
    this.bodyUpgrades =
      this._createBodyUpgrades();
    this.legsUpgrades =
      this._createLegsUpgrades();
    this.armsUpgrades =
      this._createArmsUpgrades();
  }

  private _createBodyUpgrades(): Upgrade[] {
    if (this.character.type === 'Wizard') {
      return [{ type: 'cloak' }]
    } else if (this.character.type === 'Knight') {
      return [{ type: 'body armor' }]
    } else {
      throw new Error('Unsopported character')
    }
  }

  private _createLegsUpgrades(): Upgrade[] {
    if (this.character.type === 'Wizard') {
      return [{ type: 'boots' }]
    } else if (this.character.type === 'Knight') {
      return [{ type: 'leg armor' }]
    } else {
      throw new Error('Unsopported character')
    }
  }

  private _createArmsUpgrades(): Upgrade[] {
    if (this.character.type === 'Wizard') {
      return [{ type: 'gloves' }]
    } else if (this.character.type === 'Knight') {
      return [{ type: 'sword' }]
    } else {
      throw new Error('Unsopported character')
    }
  }
}

interface UpgradesFactory {
  createBodyUpgrades(): Upgrade[];
  createArmsUpgrades(): Upgrade[];
  createLegsUpgrades(): Upgrade[];
}

class UpgradesVisualizer {
  bodyUpgrades: Upgrade[];
  armsUpgrades: Upgrade[];
  legsUpgrades: Upgrade[];
  constructor(private factory: UpgradesFactory) {
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

class WizardUpgradesFactory implements UpgradesFactory {
  createBodyUpgrades(): Upgrade[] {
    return [{ type: 'cloak' }]
  }
  createArmsUpgrades(): Upgrade[] {
    return [{ type: 'gloves' }]
  }
  createLegsUpgrades(): Upgrade[] {
    return [{ type: 'boots' }]
  }
}

class KnightUpgradesFactory implements UpgradesFactory {
  createBodyUpgrades(): Upgrade[] {
    return [{ type: 'body armor' }]
  }
  createArmsUpgrades(): Upgrade[] {
    return [{ type: 'sword' }]
  }
  createLegsUpgrades(): Upgrade[] {
    return [{ type: 'leg armor' }]
  }
}

const visualizer =
  new UpgradesVisualizer(new WizardUpgradesFactory());
visualizer.showAll();
console.log('arms', visualizer.armsUpgrades);
console.log('legs', visualizer.legsUpgrades);
console.log('body', visualizer.bodyUpgrades);