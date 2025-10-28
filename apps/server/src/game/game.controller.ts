import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchHistory } from '../common/database/entities/match-history.entity';
import { matchHistoryResponseSchema } from '@tryfy/contracts';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    @InjectRepository(MatchHistory) private readonly matches: Repository<MatchHistory>
  ) {}

  @Post('queue')
  queuePlayer(@Body() body: { playerId: string }) {
    return this.gameService.queuePlayer(body.playerId);
  }

  @Post('complete')
  completeMatch(
    @Body()
    body: { playerId: string; mode: string; result: 'win' | 'loss' | 'draw' }
  ) {
    return this.gameService.recordMatch(body.playerId, { mode: body.mode, result: body.result });
  }

  @Get('history/:playerId')
  async history(@Param('playerId') playerId: string, @Query('limit') limit?: string) {
    const take = limit ? Number(limit) : undefined;
    const data = await this.matches.find({
      where: { player: { id: playerId } },
      relations: ['player'],
      order: { playedAt: 'DESC' },
      take
    });
    return matchHistoryResponseSchema.parse({
      entries: data.map((match) => ({
        id: match.id,
        mode: match.mode,
        result: match.result,
        earnedTickets: match.earnedTickets,
        playedAt: match.playedAt.toISOString()
      }))
    });
  }
}
