import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DeviceCodeRequestDto, DeviceCodeTokenRequestDto } from './dto/device-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('device/code')
  requestDeviceCode(@Body() dto: DeviceCodeRequestDto) {
    return this.authService.requestDeviceCode(dto.clientId);
  }

  @Post('device/token')
  exchangeDeviceCode(@Body() dto: DeviceCodeTokenRequestDto) {
    return this.authService.exchangeDeviceCode(dto.clientId, dto.deviceCode, dto.userCode);
  }
}
