import { Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../api/service/order.service";
import Order from "../../model/order";
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
  displayedColumns: string[] = ['number', 'localeCode', 'customer','total', 'method','paymentState', 'shippingState', 'checkoutState' ]
  dataSource = new MatTableDataSource<Order>();

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
            //extract the id of the customer from IRI of the customer
            let customerId = Number(res.customer.substr(24))
            res.payments.forEach(payment => {
              let paymentId = Number(payment.method.substr(30))
              this.paymentService.getPayment(paymentId).subscribe(
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

  //Filter orders
  filterOrders(event: Event | null){
    // @ts-ignore
    this.dataSource.filter = event.target.value.trim().toLowerCase()
  }

  //click on rows
  testRow(row: Object){
    console.log('hello row', row)
  }


}
