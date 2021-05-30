export default class ListOrderBlock {
  constructor() {
    this.render();
  }

  get template() {
    return `
    <div class="three-block__column">
      <div class="three-block__item">
        <div class="three-block__image">
          <img src="" alt="" />
        </div>
        <div class="three-block__text">
          2 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tempora animi maxime ex odit assumenda dolorum doloremque.
          Excepturi eum cumque, tempora cum. Odio omnis nesciunt autem
          explicabo deleniti corporis quasi, molestias.
        </div>
      </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    return this.element;
  }
}
