import { Injectable } from '@nestjs/common';
import { platformUrls } from '@tryfy/shared';
import { randomUUID } from 'node:crypto';

@Injectable()
export class PaymentsService {
  async createCheckoutSession(playerId: string, items: Array<{ sku: string; quantity: number }>) {
    return {
      id: randomUUID(),
      playerId,
      items,
      status: 'pending',
      redirectUrl: `${platformUrls.payments.checkoutBase}/${randomUUID()}`
    };
  }

  async listTransactions(playerId: string) {
    return [
      {
        id: randomUUID(),
        playerId,
        total: 1999,
        currency: 'USD',
        createdAt: new Date().toISOString()
      }
    ];
  }

  estimateTicketBalance(playerId: string) {
    return playerId === 'self' ? 120 : 45;
  }
}
