import { Processor, Process } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Processor('user')
export class UserConsumer {
    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

  @Process()
  async transcode(job: Job<{user: unknown}>) {
    
    
    await this.saveUser(job.data.user);
     
    return {done: true}
  }

  private async saveUser( user ) {
    
    const userSaved = await this.userRepository.save(user);

  }
}