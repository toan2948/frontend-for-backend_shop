import Customer from "./customer";

export default interface Order {
 billingAddress: Object,
  channel: string,
  customer: string,
  shippingAddress: Object,
  payments: [],
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
