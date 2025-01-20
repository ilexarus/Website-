/******************************************************
 * server.js — Простой сервер на Node + Express + Socket.io
 ******************************************************/
const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

// Храним тикеты / сообщения в памяти (упрощённо)
let tickets = []; 
// Пример структуры каждого: {
//   ticketId: "TICKET_123",
//   messages: [ { from: "user"/"admin", text: "...", date: "..." }, ... ]
// }

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Раздаём статические файлы (index.html, style.css, client.js и т.д.)
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  // Отдаём index.html — главную
  res.sendFile(path.join(__dirname, "index.html"));
});

// При подключении клиента (socket.io)
io.on("connection", (socket) => {
  console.log("Новый пользователь подключился:", socket.id);

  // Слушаем создание тикета
  socket.on("createTicket", (ticketId) => {
    // Если такого тикета ещё нет — создаём
    if (!tickets.find(t => t.ticketId === ticketId)) {
      tickets.push({
        ticketId,
        messages: []
      });
      console.log("Создан тикет:", ticketId);
    }
    // Привязываем socket к этому тикету
    socket.join(ticketId);
    // Отправим актуальные данные
    const found = tickets.find(t => t.ticketId === ticketId);
    io.to(ticketId).emit("ticketData", found);
  });

  // При получении сообщения
  socket.on("sendMessage", ({ ticketId, from, text }) => {
    const found = tickets.find(t => t.ticketId === ticketId);
    if (!found) return;
    const now = new Date().toLocaleString();
    found.messages.push({ from, text, date: now });
    // Шлём обновлённые данные всем в комнате ticketId
    io.to(ticketId).emit("ticketData", found);
    console.log(`Сообщение в тикет ${ticketId} от ${from}: ${text}`);
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});
