export class DogGenderEnum {
  private constructor(
    public readonly code: number,
    public readonly label: string,
  ) {}

  static readonly MALE = new DogGenderEnum(0, 'MALE');
  static readonly FEMALE = new DogGenderEnum(1, 'FEMALE');
  static readonly NEUTRAL = new DogGenderEnum(2, 'NEUTRAL');

  toString() {
    return this.label;
  }
}
