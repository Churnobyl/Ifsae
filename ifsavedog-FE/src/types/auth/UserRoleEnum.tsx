export class UserRoleEnum {
  private constructor(public readonly label: string) {}

  static readonly ROLE_GENERAL_USER = new UserRoleEnum('ROLE_GENERAL_USER');
  static readonly ROLE_CENTER = new UserRoleEnum('ROLE_CENTER');
  static readonly ROLE_ADMIN = new UserRoleEnum('ROLE_ADMIN');

  toString() {
    return this.label;
  }
}
