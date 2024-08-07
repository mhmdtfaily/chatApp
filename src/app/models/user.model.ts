export class User {
  id: string;
  email: string;
  full_name: string;
  imageUrl: string; 
  constructor(id: string, email: string, full_name: string, imageUrl: string) {
    this.id = id;
    this.email = email;
    this.full_name = full_name;
    this.imageUrl = imageUrl;
  }
}
