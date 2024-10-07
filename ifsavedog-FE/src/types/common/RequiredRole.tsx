import { UserRoleEnum } from '@/types/auth/UserRoleEnum';
import { UserStatusEnum } from '@/types/auth/UserStatusEnum';

export type RequiredRole = {
  userStatus?: UserStatusEnum;
  userRole?: UserRoleEnum;
};
