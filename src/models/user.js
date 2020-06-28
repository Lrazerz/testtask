export default class User {
  constructor(id, name, email, phone, position, position_id, registration_timestamp, avatarUrl) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.position = position;
    this.position_id = position_id;
    this.registration_timestamp = registration_timestamp;
    this.avatarUrl = avatarUrl;
  }
}