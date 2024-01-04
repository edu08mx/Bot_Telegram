// src/bot.js
const TelegramBot = require('node-telegram-bot-api');
const { telegramToken } = require('./config'); // Importa o token do arquivo config.js

const bot = new TelegramBot(telegramToken, { polling: true });

// Lida com o comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Bem-vindo! Este é o seu bot no Telegram.');
});

// Lida com mensagens de texto
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Responde à mensagem recebida
  bot.sendMessage(chatId, `Você disse: ${messageText}`);
});

// Lida com comandos personalizados
bot.onText(/\/minhocomando/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Você acionou o comando personalizado!');
});

// Lida com comandos com parâmetros
bot.onText(/\/comandocomparametro (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const parametro = match[1];

  bot.sendMessage(chatId, `Você acionou o comando com parâmetro: ${parametro}`);
});

// Lida com ação de clique em um botão inline
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  bot.sendMessage(chatId, `Você clicou no botão com o seguinte dado: ${data}`);
});

console.log('Bot está rodando...');
