export class UserStatusEnum {
  private constructor(
    public readonly code: number,
    public readonly label: string,
  ) {}

  static readonly PENDING = new UserStatusEnum(0, 'PENDING');
  static readonly ACTIVE = new UserStatusEnum(1, 'ACTIVE');
  static readonly INACTIVE = new UserStatusEnum(2, 'INACTIVE');

  toString() {
    return this.label;
  }
}
