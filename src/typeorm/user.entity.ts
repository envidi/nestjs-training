import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    example: 'Jane',
    description: 'Provide the name of the user',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Provide the email of the user',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '098765432',
    description: 'Provide the phone number of the user',
  })
  @Column()
  phoneNumber: string;

  @ApiProperty({
    example: '*********',
    description: 'Provide the password of the user',
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: '',
    description: 'Provide the two factor secret of the user',
  })
  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @ApiProperty({
    example: 'false',
    description: 'Provide the status two factor secret of the user',
  })
  @Column({ default: false, type: 'boolean' })
  twoFactorEnabled: boolean;

  @ApiProperty({
    example: '000-999-888',
    description: 'Provide the api key secret of the user',
  })
  @Column()
  apiKey: string;

  @BeforeInsert()
  hashPassword() {
    const saltRound = 10;
    const saltPassword = bcrypt.genSaltSync(saltRound);
    this.password = bcrypt.hashSync(this.password, saltPassword);
  }
}
