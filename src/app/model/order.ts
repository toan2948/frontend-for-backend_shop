
// this Payment is used in Order Type only
interface Payment{
  method: string
}

export default interface Order {
 billingAddress: Object,
  channel: string,
  customer: string,
  shippingAddress: Object,
  payments: Payment[],
  shipments: [],
  currencyCode: string,
  localeCode: string,
  checkoutState: string,
  paymentState: string,
  shippingState: string,
  tokenValue: string,
  id: number,
  number: string,
  notes: string,
  items: [],
  itemsTotal: number,
  total: number,
  state: string,
  taxTotal: number,
  shippingTotal: number,
  orderPromotionTotal: number
}
