import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Role } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return {
      ...user,
      role: Role[user.role as keyof typeof Role],
    };
  }

  async create(data: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return {
      ...user,
      role: Role[user.role as keyof typeof Role],
    };
  }

  // Helper method for initial seeding if needed
  async seedMe() {
    // Check if users exist, if not create Manager and Employee
  }
}
