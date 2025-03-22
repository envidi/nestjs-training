import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/typeorm';
import { AuthGuard } from 'src/guard/auth.guard';
import { LoginDto, RegisterDto, ValidateTokenDTO } from './dto';
import { UpdateResult } from 'typeorm';
import { ApiKeyGuard } from 'src/guard/api-key.guard';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 200,
    description: 'It will return the user in the response',
  })
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.userService.registerUser(user);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'It will give you the access_token in the response',
  })
  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.signIn(user, response);
  }
  @ApiCookieAuth('Access Token')
  @UseGuards(AuthGuard)
  @Get('current')
  async getCurrentUser(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @UseGuards(ApiKeyGuard)
  @Get('currentAPI')
  async getCurrentAPIUser(@Request() req) {
    return req.user;
  }
  @Get('test')
  async getTest() {
    return this.userService.getTestValue();
  }
  @Get('devConfig')
  async getDevConfig() {
    return this.userService.getDevConfigService();
  }

  @Get()
  async getAllUser() {
    return this.userService.getAll();
  }
  @Post('enable2fa')
  @UseGuards(AuthGuard)
  async enable2FA(@Request() req: { user: { id: string } }) {
    return this.userService.enable2FA(req.user.id);
  }

  @Post('validateTwoFA')
  @UseGuards(AuthGuard)
  async validateTwoFA(
    @Request() request,
    @Body() validateToken: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.userService.validateTwoFAToken(request.user.id, validateToken);
  }
  @Post('disableTwoFA')
  @UseGuards(AuthGuard)
  async disableTwoFA(@Request() request): Promise<UpdateResult> {
    return this.userService.disableTwoFAToken(request.user.id);
  }
}
