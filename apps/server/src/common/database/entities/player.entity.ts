import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MatchHistory } from './match-history.entity';

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'display_name' })
  displayName!: string;

  @Column({ type: 'integer', default: 0 })
  tickets!: number;

  @OneToMany(() => MatchHistory, (match) => match.player)
  matches!: MatchHistory[];
}
