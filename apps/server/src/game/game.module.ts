import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { Player } from '../common/database/entities/player.entity';
import { MatchHistory } from '../common/database/entities/match-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, MatchHistory])],
  controllers: [GameController],
  providers: [GameService, GameGateway],
  exports: [GameService, GameGateway]
})
export class GameModule {}
