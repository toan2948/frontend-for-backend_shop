
export default interface Order{
  customer: string,
  channel: string,
  shippingAddress: Object,
  billingAddress: Object,
  payments: [{
    id: number,
    method: string
  }],
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
  items: [{
    id: number,
    productName: string,
    quantity: number,
    subtotal: number,
    total: number,
    variant: string
    unitPrice:number
  }],
  itemsTotal: number,
  total: number,
  state: string,
  taxTotal: number,
  shippingTotal: number,
  orderPromotionTotal: number
}
