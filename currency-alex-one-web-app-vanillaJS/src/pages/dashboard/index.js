import NewOrderBlock from '../../components/new_orderBlock/index';
import ListOrderBlock from '../../components/list_orderBlock/index';
import CommentsBlock from '../../components/comments_block/index';

export default class Page {
  element;
  subElements = {};
  components = {};

  initComponents() {
    const newOrderBlock = new NewOrderBlock();
    const listOrderBlock = new ListOrderBlock();
    const commentsBlock = new CommentsBlock();

    this.components.newOrderBlock = newOrderBlock;
    this.components.listOrderBlock = listOrderBlock;
    this.components.commentsBlock = commentsBlock;
  }

  get template() {
    return `
    <div class="wrapper">
      <main class="page">
        <div class="container">

          <div class="three-block">
            <div class="three-block__row">
              <div data-element="newOrderBlock"></div>
              <div data-element="listOrderBlock"></div>
            </div>
          </div>

          <div class="two-block">
            <div class="two-block__row">
              <div data-element="commentsBlock"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
    `;
  }

  async render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    await this.initComponents();
    this.renderComponents();
    return this.element;
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  getSubElements($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }
}
