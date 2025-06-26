import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('/login')
  login(@Res() res: Response, @Body() loginDto: LoginDto) {
    return this.authService.login(res, loginDto);
  }

  @Post('/verify')
  verify(@Body() body: any) {
    return this.authService.verify(body);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  me(@Req() req: any) {
    return this.authService.me(req);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: LoginDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
