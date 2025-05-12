const WebSocket = require('ws');
const http = require('http');
const express = require('express')
const app = express();
// Crear servidor WebSocket en el puerto 3001
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Almacenar clientes con su conexión y mensajes
const clients = new Map();

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    const clientId = Math.random().toString(36).substr(2, 9);
    clients.set(clientId, { ws, messages: [] });

    ws.send(JSON.stringify({ type: 'connection', clientId }));

    ws.on('message', (msg) => {
      try {
        const data = JSON.parse(msg.toString());

        if (data.type === 'admin_connect') {
          clients.set('admin', { ws, messages: [] });
          const chatList = [...clients.keys()].filter(k => k !== 'admin');
          ws.send(JSON.stringify({ type: 'chatList', chats: chatList }));
        } else if (data.type === 'message') {
          const admin = clients.get('admin');
          if (admin) {
            admin.ws.send(JSON.stringify({
              type: 'message',
              from: clientId,
              message: data.message,
            }));
            clients.get(clientId).messages.push({ from: 'client', message: data.message });
          }
        } else if (data.type === 'admin_message') {
          const target = clients.get(data.to);
          if (target) {
            target.ws.send(JSON.stringify({ type: 'message', message: data.content }));
            target.messages.push({ from: 'admin', message: data.content });
          }
        } else if (data.type === 'getMessages') {
          const client = clients.get(data.chat);
          const chatMessages = client?.messages || [];
          ws.send(JSON.stringify({ type: 'messages', chat: data.chat, messages: chatMessages }));
        }
      } catch (err) {
        console.error('Error procesando mensaje:', err);
      }
    });

    ws.on('close', () => {
      clients.delete(clientId);
      const admin = clients.get('admin');
      if (admin) {
        admin.ws.send(JSON.stringify({ type: 'disconnection', clientId }));
      }
    });
  });
}

module.exports = { setupWebSocket };