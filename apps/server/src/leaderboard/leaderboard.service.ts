import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../common/database/entities/player.entity';
import { leaderboardEntrySchema } from '@tryfy/contracts';

@Injectable()
export class LeaderboardService {
  constructor(@InjectRepository(Player) private readonly players: Repository<Player>) {}

  async getLeaderboard(limit = 25) {
    const data = await this.players.find({
      order: { tickets: 'DESC' },
      take: limit
    });

    return leaderboardEntrySchema.array().parse(
      data.map((player, index) => ({
        id: player.id,
        playerTag: player.displayName,
        rating: player.tickets,
        rank: index + 1
      }))
    );
  }
}
