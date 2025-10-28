import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { Player } from '../common/database/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  exports: [LeaderboardService]
})
export class LeaderboardModule {}
