import WebsocketController from "../controllers/WebsocketController"
import Route from "./route";
import { Server as ServerSocket, WebSocket } from 'ws';
import http from 'http';

class WebsocketRoute extends Route{
  private WebsocketController = new WebsocketController();
  private wss: ServerSocket;

  constructor(server: http.Server) {
    super();
    this.prefix = '/message';
    this.wss = new ServerSocket({ server });
    this.setupWebSocket();
    this.setRoutes();
  }

  protected setRoutes() {
    
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('[Client connected]');
      this.WebsocketController.addClient(ws);
      ws.on('close', () => {
        console.log('Close connected');
      });

      ws.on('message', (message: string) => {
        console.log(`Received message: ${message}`);
        const obj = JSON.parse(message);
        const type = obj.type;
        if(type == 'online') this.WebsocketController.online(obj);
      });
    });
  }
}

export default WebsocketRoute;