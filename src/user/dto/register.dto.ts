import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Jane',
    description: 'Provide the name of the user',
  })
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Provide the email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '*********',
    description: 'Provide the password of the user',
  })
  @IsStrongPassword({
    minLength: 5,
    minLowercase: 2,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
