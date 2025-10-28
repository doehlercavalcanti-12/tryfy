import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity({ name: 'match_history' })
export class MatchHistory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  mode!: string;

  @Column()
  result!: 'win' | 'loss' | 'draw';

  @Column({ name: 'earned_tickets', type: 'integer', default: 0 })
  earnedTickets!: number;

  @CreateDateColumn({ name: 'played_at' })
  playedAt!: Date;

  @ManyToOne(() => Player, (player) => player.matches, { nullable: false })
  player!: Player;
}
