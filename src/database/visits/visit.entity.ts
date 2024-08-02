import { Entity, Column, PrimaryGeneratedColumn, Check } from 'typeorm';
import { IsIP } from 'class-validator';

// noinspection JSUnusedGlobalSymbols
export enum VisitActions {
  Enter = 'Enter',
  Turn = 'Turn',
  Return = 'Return',
  Leave = 'Leave',
}

@Entity()
@Check(`"action" IN ('Enter', 'Turn', 'Return', 'Leave')`)
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  datetime: Date;

  @Column()
  @IsIP()
  ipAddress: string;

  @Column({ type: 'enum', enum: VisitActions })
  action: VisitActions;

}
