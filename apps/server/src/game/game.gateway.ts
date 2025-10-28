import { Logger } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { websocketEventSchema } from '@tryfy/contracts';

@WebSocketGateway({ namespace: '/game', cors: { origin: '*' } })
export class GameGateway implements OnGatewayConnection {
  private readonly logger = new Logger(GameGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  broadcast(event: unknown) {
    const parsed = websocketEventSchema.safeParse(event);
    if (!parsed.success) {
      this.logger.warn('Attempted to broadcast invalid event payload');
      return;
    }

    this.server.emit(parsed.data.type, parsed.data);
  }
}
