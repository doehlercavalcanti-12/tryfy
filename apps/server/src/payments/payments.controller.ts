import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ticketBalanceSchema } from '@tryfy/shared';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  createCheckout(@Body() body: { playerId: string; items: Array<{ sku: string; quantity: number }> }) {
    return this.paymentsService.createCheckoutSession(body.playerId, body.items ?? []);
  }

  @Get('history/:playerId')
  listHistory(@Param('playerId') playerId: string) {
    return this.paymentsService.listTransactions(playerId);
  }

  @Get('tickets/balance')
  getTicketBalance(@Query('playerId') playerId = 'self') {
    return ticketBalanceSchema.parse({
      balance: this.paymentsService.estimateTicketBalance(playerId)
    });
  }
}
