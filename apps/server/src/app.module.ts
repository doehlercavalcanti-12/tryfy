import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { GameModule } from './game/game.module';
import { AiModule } from './ai/ai.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ModerationModule } from './moderation/moderation.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    PaymentsModule,
    GameModule,
    AiModule,
    LeaderboardModule,
    ModerationModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
