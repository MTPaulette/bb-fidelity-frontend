export default class Service {
  constructor(
    name,
    price,
    credit,
    debit,
    validity,
    agency,
    service_type,
    description,
    user_id
  ) {
    this.name = name
    this.price = price
    this.credit = credit
    this.debit = debit
    this.validity = validity
    this.agency = agency
    this.service_type = service_type
    this.description = description
    this.user_id = user_id
  }
}
