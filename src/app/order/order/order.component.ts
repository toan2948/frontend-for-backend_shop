import { Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../api/service/order.service";
import Orders from "../../model/orders";
import {tap} from "rxjs/operators";
import Customer from "../../model/customer";
import {CustomerService} from "../../api/service/customer.service";
import {PaymentService} from "../../api/service/payment.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  //'orders' hold all orders
  orders: Orders[] = [
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
  displayedColumns: string[] = ['number', 'localeCode', 'customer','total', 'method','paymentState', 'shippingState', 'checkoutState' ]
  dataSource = new MatTableDataSource<Orders>();


  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private paymentService: PaymentService
  ) { }
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    //get orders right at the beginning
     this.runGetOrders()
    // this.runGetOrder2()
    // this.runGetOrder3()

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
    this.orderService.getOrders().pipe(
      tap(
        res => {
          console.log('res', res)
          //get the fullname of the customer from the IRI
          res.map(res => {
            //extract the id of the customer from IRI of the customer
            let customerId = Number(res.customer.substr(24))
            res.payments.forEach(payment => {
              // let paymentId = Number(payment.method.substr(30))

              // get Payment Mothods
              this.paymentService.getPayment(payment.id).subscribe(
                r => payment.method = r.method.name
              )
            })
            //get the fullname
            this.customerService.getCustomer(customerId).subscribe(
              r => res.customer = r.fullName
            )
            }
          )
        }
      )

    ) .subscribe(res => {
      //assign the res to the orders
      this.dataSource.data = res.slice()
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  runGetOrder2(){
    this.orderService.getOrders().pipe(
      tap(
        res =>
          {
            console.log('original res', res)
            //=> console will log the modified res, not the original res, because that is how javascript works.
            //
            //slice() only makes a reference to the res, not creating a new array
            //this.orders = res.slice()
            //make a copy of res (deep copy), it will creat a new array
            this.orders = JSON.parse(JSON.stringify(res))

            console.log('orders', this.orders)
            console
            res.map(res => res.customer = res.customer.substr(24))
          }
      )
    )
      .subscribe()
  }

  runGetOrder3(){
    this.orderService.getOrders().subscribe(res => {
      console.log('res', res)
      res.map(res => res.customer = res.customer.substr(24))
    })
  }

  //Filter orders
  filterOrders(event: Event | null){
    // @ts-ignore
    this.dataSource.filter = event.target.value.trim().toLowerCase()
  }




}
