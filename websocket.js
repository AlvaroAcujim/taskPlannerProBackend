const WebSocket = require('ws');
const http = require('http');
const app = express();
// Crear servidor WebSocket en el puerto 3001
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Almacenar clientes con su conexión y mensajes
const clients = new Map();

// Cuando un cliente se conecta
wss.on('connection', (ws) => {
    // Generar ID único para el cliente
    const clientId = Math.random().toString(36).substr(2, 9);

    clients.set(clientId, { ws: ws, messages: []});
    
    // Enviar ID al cliente
    ws.send(JSON.stringify({
        type: 'connection',
        clientId: clientId
    }));
    
    // Cuando recibimos un mensaje
    ws.on('message', (message) => {
        try {
            // Asegurarse de que el mensaje sea una cadena antes de parsearlo
            const messageStr = message.toString();
            const data = JSON.parse(messageStr);
            
            // Si es un mensaje del admin
            if (data.type === 'admin_message') {
                const client = clients.get(data.to);
                if (client) {
                    client.ws.send(JSON.stringify({
                        type: 'message',
                        message: data.content
                    }));
                    // Guardar mensaje en el historial
                    client.messages.push({
                        from: 'admin',
                        message: data.content
                    });
                }
            }
            // Si es un mensaje de un cliente
            else if (data.type === 'message') {
                const admin = clients.get('admin');
                if (admin) {
                    admin.ws.send(JSON.stringify({
                        type: 'message',
                        from: clientId,
                        message: data.message
                    }));
                    // Guardar mensaje en el historial
                    clients.get(clientId).messages.push({
                        from: 'client',
                        message: data.message
                    });
                }
            }
            // Si es el admin conectándose
            else if (data.type === 'admin_connect') {
                clients.set('admin', {
                    ws: ws,
                    messages: []
                });
                const chatList = Array.from(clients.keys()).filter(id => id !== 'admin');
                ws.send(JSON.stringify({
                    type: 'chatList',
                    chats: chatList
                }));
            }
            // Si es una solicitud de historial de mensajes
            else if (data.type === 'getMessages') {
                const client = clients.get(data.chat);
                const chatMessages = client ? client.messages : [];
                ws.send(JSON.stringify({
                    type: 'messages',
                    chat: data.chat,
                    messages: chatMessages
                }));
            }
        } catch (e) {
            console.error('Error al procesar mensaje:', e);
            console.error('Mensaje recibido:', message.toString());
        }
    });

    // Cuando un cliente se desconecta
    ws.on('close', () => {
        clients.delete(clientId);
        
        // Notificar al administrador
        const admin = clients.get('admin');
        if (admin) {
            admin.ws.send(JSON.stringify({
                type: 'disconnection',
                clientId: clientId
            }));
        }
    });
});

module.exports = wss;