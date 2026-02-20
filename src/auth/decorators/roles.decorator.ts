import { SetMetadata } from '@nestjs/common';
import { Role } from '../../users/models/user.model';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
