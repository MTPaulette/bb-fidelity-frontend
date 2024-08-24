export default class Service {
  constructor(
    name,
    price,
    credit,
    debit,
    validity,
    service_type,
    agency,
    description,
    user_id
  ) {
    this.name = name
    this.price = price
    this.credit = credit
    this.debit = debit
    this.validity = validity
    this.service_type = service_type
    this.agency = agency
    this.description = description
    this.user_id = user_id
  }
}
