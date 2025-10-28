import { Injectable } from '@nestjs/common';
import { MatchHistory } from '../common/database/entities/match-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../common/database/entities/player.entity';
import { matchHistoryEntrySchema } from '@tryfy/contracts';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Player) private readonly players: Repository<Player>,
    @InjectRepository(MatchHistory) private readonly matches: Repository<MatchHistory>
  ) {}

  async queuePlayer(playerId: string) {
    const player = await this.players.findOne({ where: { id: playerId } });
    if (!player) {
      throw new Error('Player not found');
    }

    return { status: 'queued', playerId };
  }

  async recordMatch(playerId: string, payload: { mode: string; result: 'win' | 'loss' | 'draw' }) {
    const player = await this.players.findOne({ where: { id: playerId } });
    if (!player) {
      throw new Error('Player not found');
    }

    const earnedTickets = payload.result === 'win' ? 10 : payload.result === 'draw' ? 3 : 0;
    const match = this.matches.create({
      mode: payload.mode,
      result: payload.result,
      earnedTickets,
      player
    });
    await this.matches.save(match);

    player.tickets += earnedTickets;
    await this.players.save(player);

    return matchHistoryEntrySchema.parse({
      id: match.id,
      mode: match.mode,
      result: match.result,
      earnedTickets: match.earnedTickets,
      playedAt: match.playedAt.toISOString()
    });
  }
}
