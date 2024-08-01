export default class Service {
  constructor(
    name,
    price,
    credit,
    debit,
    validity,
    description,
    user_id
  ) {
    this.name = name
    this.price = price
    this.credit = credit
    this.debit = debit
    this.validity = validity
    this.description = description
    this.user_id = user_id
  }
}
