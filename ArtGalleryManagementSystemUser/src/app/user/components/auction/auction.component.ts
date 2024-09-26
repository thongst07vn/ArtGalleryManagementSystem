
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { interval, Subscription, timestamp  } from 'rxjs';
import { ConectActive } from '../../services/conectActive';
@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './auction.component.html',
  host:{
    'collision': 'AutionComponent'
  }
})
export class AuctionComponent implements OnInit {
    auctionStartTime: Date;
    auctionEndTime: Date;
    auctionLifetime:number;
    auctionMin: number;
    auctionSec: number;
    source = interval(1000);
    subscription: Subscription;
    subscriptionstart:Subscription;
    subscriptionend:Subscription;
    onDisable:boolean
    auctionInformation:string;
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive
  ){
    
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    const now = new Date();
    this.auctionStartTime = new Date(); // September 20, 2024, 3:00 PM
    this.auctionStartTime.setTime(now.getTime()+10000)
    this.auctionLifetime = 10000;
    this.auctionEndTime = new Date(this.auctionStartTime);
    this.auctionEndTime.setTime(this.auctionEndTime.getTime() + this.auctionLifetime);
    this.startInterval();
   
  }
  startInterval(){
    this.subscription = interval(1000).subscribe(()=>{
        if(new Date() < this.auctionStartTime){
            this.auctionInformation = 'Auction start in ';
            this.onDisable = true;
            if(this.subscriptionend){
                this.subscriptionend.unsubscribe();
            }
            if(this.subscription){
                this.subscription.unsubscribe();
            }
            this.subscriptionstart = interval(1000).subscribe(() => this.timingCounter(new Date(), this.auctionStartTime,this.subscriptionstart));
            
        } else if(new Date() > this.auctionEndTime){
            this.auctionInformation = 'Auction ended';
            this.onDisable = true;
            if(this.subscription){
                this.subscription.unsubscribe();
            }
        } else {
            this.auctionInformation = 'Time left: ';
            this.onDisable = false;
            if(this.subscriptionstart){
                this.subscriptionstart.unsubscribe();
            }
            if(this.subscription){
                this.subscription.unsubscribe();
            }
            this.subscriptionend = interval(1000).subscribe(() => this.timingCounter(new Date(), this.auctionEndTime,this.subscriptionend));
            
        }
    })
  }
  timingCounter(start:Date, end:Date, subscription:Subscription){
    const timeRemain = end.getTime() - start.getTime();
    this.auctionMin = Math.floor(timeRemain / 60000);
    this.auctionSec = Math.floor((timeRemain % 60000) / 1000);
    if (timeRemain <= 1000) {
        // Auction has ended
        subscription.unsubscribe();
        this.startInterval();
      }
  }
  getvalue(evt:any){
    const timeValue = evt.target.value;
    const now = new Date();
    const selectedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...timeValue.split(':'));
    console.log(selectedTime);
  }

  // formatTimestamp(timestamp) {
  //   const date = new Date(timestamp);
  
  //   const year = date.getFullYear();

  //   const month = String(date.getMonth() + 1).padStart(2,   
  //  '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   const seconds = String(date.getSeconds()).padStart(2,   
  //  '0');
  //   const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
  //   return `${year}:${month}:${day}:${hours}:${minutes}:${seconds}.${milliseconds}`;   
  // }
}
