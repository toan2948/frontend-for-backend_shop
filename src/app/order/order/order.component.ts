import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../api/service/order.service";
import Order from "../../model/order";
import {tap} from "rxjs/operators";
import Customer from "../../model/customer";
import {CustomerService} from "../../api/service/customer.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  //'orders' hold all orders
  orders: Order[] = [
    {
      billingAddress: {},
      channel: '',
      customer: '',
      shippingAddress: {},
      payments: [],
      shipments: [],
      currencyCode: '',
      localeCode: '',
      checkoutState: '',
      paymentState: '',
      shippingState: '',
      tokenValue: 'string',
      // @ts-ignore
      id: null,
      number: '',
      notes: '',
      items: [],
      // @ts-ignore
      itemsTotal: null,
      // @ts-ignore
      total: null,
      state: '',
      // @ts-ignore
      taxTotal: null,
      // @ts-ignore
      shippingTotal: null,
      // @ts-ignore
      orderPromotionTotal: null
    }
  ]

  //
  customers: Customer[] = [];

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    //get orders
    this.runGetOrders()
  }

  //this function does not work
  runGetCustomer(id: number){
    let fullname = ''
    this.customerService.getCustomer(id).subscribe(
      res => {
        fullname = res.fullName
        console.log(fullname)
      }
    )
    return fullname
  }

  runGetOrders(){
    this.orderService.getOrder().pipe(
      tap(
        res => {
          console.log('res', res)
          //get the fullname of the customer from the IRI
          res.map(res => {
            //extract the id from IRI
            let customerId = Number(res.customer.substr(24))
            //get the fullname
            this.customerService.getCustomer(customerId).subscribe(
              r => res.customer = r.fullName
            )
            }
          )
          //assign the res to the orders
          this.orders = res.slice()
        }
      )

    ) .subscribe(res =>  null)
  }
}
