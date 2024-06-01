import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Session } from './session.entity';
import { Movie } from './movie.entity';

interface registerRequest {
  fullName: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
}

interface loginRequest {
  usernameOrEmail: string;
  password: string;
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async register(request: registerRequest): Promise<string> {
    try {
      if (request.password1 !== request.password2) {
        const response = { status: 'failed', message: 'Passwords do not match' };
        return JSON.stringify(response);
      }

      const user = new User();
      user.fullName = request.fullName;
      user.username = request.username;
      user.email = request.email;
      user.password = request.password1;

      await this.userRepository.save(user);

      const response = { status: 'ok', message: `Registered new user as ${request.username}` };
      return JSON.stringify(response);
    } catch (error) {
      const response = { status: 'error', message: `Failed to register ${error}` };
      return JSON.stringify(response);
    }
  }

  async login(request: loginRequest): Promise<string> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ username: request.usernameOrEmail }, { email: request.usernameOrEmail }],
      });

      if (user && user.password === request.password) {
        const session = new Session();
        session.userId = user.id;
        session.sessionKey = Math.random().toString(36).substring(7); 
        session.createdAt = new Date();
        await this.sessionRepository.save(session);

        const response = { status: 'ok', message: `Logged in as ${request.usernameOrEmail}`, sessionKey: session.sessionKey };
        return JSON.stringify(response);
      } else {
        const response = { status: 'failed', message: `Failed to log in as ${request.usernameOrEmail}` };
        return JSON.stringify(response);
      }
    } catch (error) {
      const response = { status: 'error', message: `Login failed: ${error}` };
      return JSON.stringify(response);
    }
  }

  async getMovies(sessionKey: string): Promise<string> {
    const session = await this.sessionRepository.findOne({ where: { sessionKey } });

    if (!session) {
      const response = { status: 'failed', message: 'Invalid session key' };
      return JSON.stringify(response);
    }

    const movies = await this.movieRepository.find();
    return JSON.stringify(movies);
  }
}
