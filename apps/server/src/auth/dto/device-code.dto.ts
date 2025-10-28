import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DeviceCodeRequestDto {
  @IsString()
  @IsNotEmpty()
  clientId!: string;
}

export class DeviceCodeTokenRequestDto {
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsString()
  @IsNotEmpty()
  deviceCode!: string;

  @IsOptional()
  @IsString()
  userCode?: string;
}
