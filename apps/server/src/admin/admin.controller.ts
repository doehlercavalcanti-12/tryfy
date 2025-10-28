import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('sessions')
  sessions() {
    return this.adminService.getActiveSessions();
  }

  @Get('audit')
  audit(@Query('limit') limit?: string) {
    return this.adminService.getAuditLog(limit ? Number(limit) : undefined);
  }
}
