import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent {
  
  paymentHandler:any = null;

  constructor() { }

  ngOnInit() {
    this.invokeStripe();
  }
  
  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KeGzLSIGUmM79uQuQtRWgNo97s8TlgpfzufYowImUvgRAogbZcTGh5PTK7dEs7Hz97yjn5st6efR8WfBSFiY0N600z4RzHRK2',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken})
        alert('Order Confirmed!');
      }
    });
  
    paymentHandler.open({
      name: 'User',
      description: 'Enter Payment Details',
      amount: amount * 100
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KeGzLSIGUmM79uQuQtRWgNo97s8TlgpfzufYowImUvgRAogbZcTGh5PTK7dEs7Hz97yjn5st6efR8WfBSFiY0N600z4RzHRK2',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

}