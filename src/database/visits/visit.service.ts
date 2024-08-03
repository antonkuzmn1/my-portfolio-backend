import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitRepository } from './visit.repository';
import { Visit, VisitActions } from './visit.entity';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private visitRepository: VisitRepository,
  ) {}

  async findAll(): Promise<Visit[]> {
    return this.visitRepository.find();
    // return [];
  }

  async createVisit(ipAddress: string, action: VisitActions): Promise<Visit> {
    return this.visitRepository.save({ipAddress, action});
  }
}
