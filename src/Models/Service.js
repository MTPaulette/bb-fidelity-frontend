export default class Service {
  constructor(
    name,
    price,
    point,
    validity,
    description,
    user_id
  ) {
    this.name = name
    this.price = price
    this.point = point
    this.validity = validity
    this.description = description
    this.user_id = user_id
  }
}
