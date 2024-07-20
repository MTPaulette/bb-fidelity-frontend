export default class Purchase {
  constructor(
    admin_id,
    service_id,
    user_id,
    by_cash,
    bonus_point,
    user_balance
  ) {
    this.admin_id = admin_id
    this.service_id = service_id
    this.user_id = user_id
    this.by_cash = by_cash
    this.bonus_point = bonus_point
    this.user_balance = user_balance
  }
}
