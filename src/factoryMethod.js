// The video for this file:
// https://youtu.be/n8dQWBhCTck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Layer {
    constructor(map, name, shapes) {
        this.map = map;
        this.name = name;
        this.shapes = shapes;
    }
    show() {
        this.shapes.forEach(_ => this.map.show(_));
    }
    hide() {
        this.shapes.forEach(_ => this.map.hide(_));
    }
}
exports.Layer = Layer;
const map = {
    show() { },
    hide() { }
};
const factoryMethod = (name, shapes) => {
    return new Layer(map, name, shapes);
};
class LayersList {
    constructor(layerFactory, layersNames, layersService) {
        this.layerFactory = layerFactory;
        this.layersNames = layersNames;
        this.layersService = layersService;
        this.layers = [];
        layersNames.forEach(name => {
            this._initializeLayer(name);
        });
    }
    _initializeLayer(layerName) {
        this.layersService.fetchShapes(name)
            .then((shapes) => this.layerFactory(layerName, shapes))
            .then((layer) => {
            this.layers.push(layer);
        });
    }
    showAll() {
        this.layers.forEach(_ => _.show());
    }
    hideAll() {
        this.layers.forEach(_ => _.hide());
    }
}
exports.LayersList = LayersList;
