import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { registerRequest, loginRequest } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async register(@Body() request: registerRequest): Promise<string> {
    return this.appService.register(request);
  }

  @Post('login')
  async login(@Body() request: loginRequest): Promise<string> {
    return this.appService.login(request);
  }

  @Get('movies')
  async getMovies(@Query('sessionKey') sessionKey: string): Promise<string> {
    return this.appService.getMovies(sessionKey);
  }
}
