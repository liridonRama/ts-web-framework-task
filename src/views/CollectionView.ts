import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
  constructor(
    public collection: Collection<T, K>,
    private parent: Element,
  ) { }

  render(): void {
    if (!this.parent) {
      throw new Error("no proper parent element was passed");
    }

    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    this.collection.models.forEach(model => {
      this.renderItem(model, templateElement.content);
    });

    this.parent.append(templateElement.content);
  }

  abstract renderItem(model: T, itemParent: DocumentFragment): void;
}