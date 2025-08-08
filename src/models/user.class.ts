export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;

  constructor(obj?: any) {
    this.firstName = obj?.firstName || '';
    this.lastName = obj?.lastName || '';
    this.birthDate = obj?.birthDate || 0;
    this.street = obj?.street || '';
    this.zipCode = obj?.zipCode || 0;
    this.city = obj?.city || '';
  }
}
