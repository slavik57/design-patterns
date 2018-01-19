"use strict";
// The video for this episode
// https://youtu.be/uI9tALNDAgA
Object.defineProperty(exports, "__esModule", { value: true });
class ActionProvider {
    constructor() { this.actions = []; }
    register(action) {
        this.actions.push(action);
    }
    getActions(context) {
        return this.actions
            .filter(action => action.canPerform(context));
    }
}
exports.ActionProvider = ActionProvider;
const actionProvider = new ActionProvider();
// Application module
class Cat {
    constructor(ownerId) {
        this.ownerId = ownerId;
    }
}
class CatGallery {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }
    catsSelected(cats) {
        const actions = this.actionProvider.getActions(cats);
        this.showActions(actions);
    }
    catSelected(cat) {
        this.catsSelected([cat]);
    }
    performActionOnCats(cats, action) {
        action.perform(cats).then(() => { }, (error) => { });
    }
    performActionOnCat(cat, action) {
        this.performActionOnCats([cat], action);
    }
    showActions(actions) {
    }
}
// Delete action module
class DeleteCatAction {
    constructor(currentUserId) {
        this.currentUserId = currentUserId;
    }
    get name() { return "Delete"; }
    canPerform(context) {
        return context.every(item => item instanceof Cat && item.ownerId === this.currentUserId);
    }
    perform(context) {
        return this.deleteCatsFromServer(context);
    }
    deleteCatsFromServer(cats) {
        return Promise.resolve();
    }
}
exports.DeleteCatAction = DeleteCatAction;
actionProvider.register(new DeleteCatAction(1234));
