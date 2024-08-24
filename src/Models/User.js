export default class Service {
  constructor(
    name,
    email,
    password,
    balance,
    is_registered,
    user_id
  ) {
    this.name = name
    this.email = email
    this.password = password
    this.balance = balance
    this.is_registered = is_registered
    this.user_id = user_id
  }
}
