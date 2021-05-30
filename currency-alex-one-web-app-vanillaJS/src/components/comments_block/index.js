export default class CommentsBlock {
  constructor() {
    this.render();
  }

  get template() {
    return `
    <div class="two-block__column">
      <div class="two-block__item">
        <div class="two-block__image"></div>
        <div class="two-block__text">
          3 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Perspiciatis minima sed, magni voluptate neque voluptatibus
          omnis nihil accusamus officia modi! Repellat voluptates
          iusto enim optio, quidem obcaecati, dolor quos numquam.
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
