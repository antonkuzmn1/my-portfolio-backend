import { Entity, Column, PrimaryGeneratedColumn, Check } from 'typeorm';

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
  ipAddress: string;

  @Column({ type: 'enum', enum: VisitActions })
  action: VisitActions;

}
