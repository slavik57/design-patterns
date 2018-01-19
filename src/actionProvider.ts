// The video for this episode
// https://youtu.be/uI9tALNDAgA

// action provider module
export interface Action {
  readonly name: string;
  canPerform(context: any[]): boolean;
  perform(context: any[]): Promise<void>;
}

export class ActionProvider {
  private actions: Action[];
  constructor() { this.actions = []; }
  public register(action: Action): void {
    this.actions.push(action);
  }
  public getActions(context: any[]): Action[] {
    return this.actions
      .filter(action => action.canPerform(context));
  }
}

const actionProvider = new ActionProvider();

// Application module
class Cat {
  constructor(public ownerId: number) { }
}

class CatGallery {
  constructor(private actionProvider: ActionProvider) {
  }
  public catsSelected(cats: Cat[]): void {
    const actions = this.actionProvider.getActions(cats);
    this.showActions(actions);
  }
  public catSelected(cat: Cat): void {
    this.catsSelected([cat]);
  }
  public performActionOnCats(cats: Cat[], action: Action): void {
    action.perform(cats).then(() => {}, (error) => {});
  }
  public performActionOnCat(cat: Cat, action: Action) :void {
    this.performActionOnCats([cat], action);
  }
  private showActions(actions: Action[]) : void {
  }
}

// Delete action module
export class DeleteCatAction implements Action {
  constructor(private currentUserId: number) {}
  public get name() { return "Delete"; }
  public canPerform(context: any[]) : boolean {
    return context.every(item => item instanceof Cat && item.ownerId === this.currentUserId);
  }
  public perform(context: any[]) : Promise<void> {
    return this.deleteCatsFromServer(context);
  }

  private deleteCatsFromServer(cats: Cat[]): Promise<void> {
    return Promise.resolve();
  }
}
actionProvider.register(new DeleteCatAction(1234));