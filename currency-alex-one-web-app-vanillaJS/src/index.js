/* eslint-disable no-undef */
import Router from "./router/index.js";

const URL_PATH = process.env.URL_PATH;

// console.error('URL_PATH', URL_PATH);

class MainPage {
  constructor() {
    this.router = Router.instance();
    this.render();
    this.addEventListeners();
  }

  get template() {
    return `
      <div class="wrapper">
        <div class="progress-bar">
          <div class="progress-bar__line"></div>
        </div>
        <header class="header">
          <div class="header__row">
            <a href="#" class="header__logo"></a>
            <div class="header_menu menu">
              <div class="menu__icon"><span></span></div>
            </div>
          </div>
        </header>
        <div class="sidebar">
          <div class="sidebar__container"></div>
        </div>
        
      <div class="content" id="content"></div>
    </div>
    `;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    document.body.append(this.element);
  }

  initializeRouter() {
    this.router
      .addRoute(new RegExp(`^${URL_PATH}$`), "dashboard")
      .addRoute(/404\/?$/, "error404")
      .setNotFoundPagePath("error404")
      .listen();
  }

  addEventListeners() {
    const iconMenu = this.element.querySelector(".menu__icon");
    const sidebar = this.element.querySelector(".sidebar");

    if (iconMenu) {
      iconMenu.addEventListener("click", event => {
        event.preventDefault();
        iconMenu.classList.toggle("_active");
        sidebar.classList.toggle("_active");
      });
    }
  }
}

const mainPage = new MainPage();

document.body.append(mainPage.element);

mainPage.initializeRouter();
