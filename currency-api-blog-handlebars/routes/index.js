const express = require("express");
const router = express.Router();
const Client = require("../models/client");
const fetch = require("node-fetch");

/* home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Exchanger of currencies" });
});

/* показывает клиентов */
router.get(
  "/auth/homePage/renderClients",
  authenticationMiddleware(),
  async function (req, res, next) {
    const clients = await Client.find({visible: true});
    res.render("renderClients", { clients });
  }
);

router.get(
  "/auth/homePage/renderClient",
  authenticationMiddleware(),
  async function (req, res, next) {
    const message = 'Клиент не найден';
    const { wechatId } = req.query;
    const client = await Client.findOne({ wechatId });
    if(client && client.visible === true) {
      res.locals.isVisible = client.visible === true;
      res.render("renderClient", { client });
    } else {
      res.render('renderClient', { message })
    }
  }
);

//показывает детальную инфу
router.get(
  "/auth/homePage/show/:id",
  authenticationMiddleware(),
  async (req, res, next) => {
    const clients = await Client.findById(req.params.id);
    res.render("show", { clients });
  }
);

// открывает форму edit clients
// TODO: валидация данных
router.get(
  "/auth/homePage/edit/:id",
  authenticationMiddleware(),
  async (req, res, next) => {
    const clients = await Client.findById(req.params.id);
    return res.render("edit", { clients });
  }
);

// изменяет данные клиента - edit
// TODO: валидация данных
router.post(
  "/auth/homePage/edit/:id",
  authenticationMiddleware(),
  async (req, res, next) => {
    const clients = await Client.findById(req.params.id);
    let { wechatId, totalAmount, currency, status, tradeDate } = req.body;
    clients.wechatId = wechatId;
    clients.totalAmount = totalAmount;
    clients.currency = currency;
    clients.status = status;
    clients.tradeDate = tradeDate;
    await clients.save();
    return res.redirect("/auth/homePage");
  }
);

// delete clients
router.get("/auth/homePage/renderClients/delete/:id",
authenticationMiddleware(), async (req, res, next) => {
  const clients = await Client.findById(req.params.id);
  clients.visible = false;
  clients.save();
  res.redirect("/auth/homePage/renderClients");
});

// delete one client
router.get("/auth/homePage/renderClient/delete/:id",
authenticationMiddleware(), async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  client.visible = false;
  client.save();
  res.render("/auth/homePage");
});

/* загрузка API */
router.get(
  "/auth/homePage/api",
  authenticationMiddleware(),
  async (req, res, next) => {
    const result = await getFetchCbr();
    res.render("api", result);
  }
);

router.get(
  "/auth/homePage/apiExchange",
  authenticationMiddleware(),
  async (req, res, next) => {
    const result = await getFetchExchanger();
    const quotes = result.quotes;
    res.render("apiExchange", {quotes});
  }
);

/* calculator page. */
router.get("/auth/homePage/calculator/:id",
authenticationMiddleware(),
function (req, res, next) {
  const id = req.params.id;
  res.render("calculator", { id });
});

router.post("/auth/homePage/calculator/:id",
authenticationMiddleware(),
async (req, res, next) => {
  // логика и расчеты
  const {rmbsum, money, exchange } = req.body;
  const getParamsId = req.params.id;

  // искать exchange в каком api искать
  if(exchange === 'cb_rf') {
    const result = await getFetchCbr(); // Получить с сайта данные по RMB (not USD)
    const getStatus = await fetch(`http://localhost:3000/clientStatus/${getParamsId}`);
    const finalStatus = await getStatus.json();

    // ооочень сложно - как-бы упростить
    if(money === 'RUB')  getValue = result.Valute.RUB.Value;
    if(money === 'UAH')  getValue = result.Valute.UAH.Value;
    if(money === 'BYN')  getValue = result.Valute.BYN.Value;
    if(money === 'KZT')  getValue = result.Valute.KZT.Value;
    const totalAmount = rmbsum*getValue*finalStatus.result // умножить на коэфицент у каждого челоека + получить статус
    res.render("result", {totalAmount});
  }
  if (exchange === 'bank2') {
    const totalAmount = 'Данные из bank2';
    res.render("result", {totalAmount});
  }
});

router.get('/clientStatus/:id', async (req, res, next) => {
  const getClientId = req.params.id.trim();
  const getId = await Client.findOne({_id: getClientId});
  if (getId.status === 'basic') result = 3;
  if (getId.status === 'bronze') result = 2.5;
  if (getId.status === 'silver') result = 2;
  if (getId.status === 'gold') result = 1.5;
  if (getId.status === 'platinum') result = 1;
  res.json({result});
});

/* new client */
// TODO: сделать проверку клиента на visible во всех ручках
router.get("/auth/homePage/new",
authenticationMiddleware(),
function (req, res, next) {
  res.render("newClient");
});

router.post("/auth/homePage/new",
authenticationMiddleware(),
async function (req, res, next) {
  try {
    let dateStr = req.body.tradeDate;
    const arr = dateStr.split(".");
    const newStr = arr[1] + "." + arr[0] + "." + arr[2];
    const { wechatId } = req.body;
    const isUser = await Client.findOne({ wechatId: wechatId });
    if (isUser) {
      return res.status(400).json({ message: "Такой клиент существует" });
    }
    const newClient = new Client({
      wechatId: req.body.wechatId,
      totalAmount: req.body.totalAmount,
      currency: req.body.currency,
      status: req.body.status,
      tradeDate: newStr,
    });
    await newClient.save();
    res.redirect("/auth/homePage");
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  };
}

async function getFetchCbr() {
  const getFetch = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const result = await getFetch.json();
  return result;
}

async function getFetchExchanger() {
  const getFetch = await fetch("http://api.currencylayer.com/live?access_key=c67584b56a42be06b481c2ab10440ded&format=1");
  const result = await getFetch.json();
  return result;
}

module.exports = router;
