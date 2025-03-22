import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { LoginDto, RegisterDto, ValidateTokenDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DevConfigService } from 'src/common/providers/DevConfigService';
import { plainToInstance } from 'class-transformer';
import * as speakeasy from 'speakeasy';
import { EnableTwoFAType } from './types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @Inject('test') private value: any,
    @Inject(DevConfigService) private configDev: DevConfigService,
  ) {}

  async registerUser(user: RegisterDto) {
    const isUserExist = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (isUserExist) {
      throw new BadRequestException('This email is already exist');
    }
    const dataUser = {
      ...user,
    };
    const createUser = this.userRepository.create(dataUser);
    createUser.apiKey = uuid();
    return this.userRepository.save(createUser);
  }

  async signIn(user: LoginDto, response) {
    const findUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const comparePassword = bcrypt.compareSync(
      user.password,
      findUser.password,
    );
    if (!comparePassword)
      throw new BadRequestException('Password is not correct');
    const accessToken = await this.jwtService.sign(
      {
        id: findUser.id,
        apiKey: findUser.apiKey,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    response.cookie('accessToken', accessToken, { httpOnly: true });

    return {
      accessToken,
    };
  }
  async getTestValue() {
    return this.value;
  }
  async getDevConfigService() {
    return this.configDev.getDBConfig();
  }

  async getAll() {
    return plainToInstance(UserEntity, this.userRepository.find());
  }

  async enable2FA(id: string): Promise<EnableTwoFAType> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user?.twoFactorEnabled) {
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret();
    user.twoFASecret = secret.base32;
    await this.updateSecretKey(id, user.twoFASecret);
    return {
      secret: user.twoFASecret,
    };
  }
  async updateSecretKey(userId: string, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      {
        id: userId,
      },
      {
        twoFASecret: secret,
        twoFactorEnabled: true,
      },
    );
  }
  async validateTwoFAToken(
    id: string,
    token: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        encoding: 'base32',
        token: token.token,
      });
      if (verified) {
        return { verified: true };
      }
      return { verified: false };
    } catch (error) {
      throw new UnauthorizedException('Error authentication');
    }
  }
  async disableTwoFAToken(userId: string): Promise<UpdateResult> {
    return this.userRepository.update(
      {
        id: userId,
      },
      { twoFASecret: null, twoFactorEnabled: false },
    );
  }

  async validateUserApiKey(apiKey: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({
      apiKey: apiKey,
    });
  }
}
