// The video for this file:
// https://youtu.be/n8dQWBhCTck

export interface Shape { }

export interface Map {
  show(shape: Shape): void;
  hide(shape: Shape): void;
}

export class Layer {
  constructor(private map: Map,
    private name: string,
    private shapes: Shape[]) {
  }
  show(): void {
    this.shapes.forEach(_ => this.map.show(_));
  }
  hide(): void {
    this.shapes.forEach(_ => this.map.hide(_));
  }
}

export interface LayersService {
  fetchShapes(layerName: string): Promise<Shape[]>;
}

interface LayerFactory {
  (name: string, shapes: Shape[]): Layer;
}

const map: Map = {
  show() { },
  hide() { }
};

const factoryMethod: LayerFactory =
  (name: string, shapes: Shape[]) => {
    return new Layer(map, name, shapes);
  }

export class LayersList {
  private layers: Layer[];
  constructor(
    private layerFactory: LayerFactory,
    private layersNames: string[],
    private layersService: LayersService
  ) {
    this.layers = [];
    layersNames.forEach(name => {
      this._initializeLayer(name);
    });
  }

  private _initializeLayer(layerName: string): void {
    this.layersService.fetchShapes(name)
      .then((shapes: Shape[]) =>
        this.layerFactory(layerName, shapes))
      .then((layer: Layer) => {
        this.layers.push(layer);
      });
  }
  showAll(): void {
    this.layers.forEach(_ => _.show());
  }
  hideAll(): void {
    this.layers.forEach(_ => _.hide());
  }
}