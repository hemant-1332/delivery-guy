import { Component, OnInit } from '@angular/core';
import { Observable, Subject,interval, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

//import { FaceApiService } from '../../services/face-api.service';
import { Item } from '../../model/Item';
import { ItemsService } from 'src/app/services/items.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


interface StringTimeWithDate {
  time: string;
  asDate: Date;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  //people: Person[];
  items$: Observable<Item[]>;
  private searchTerms = new Subject<any>();
  items: Item[];
  item: Item;
  isDelivered: boolean = false;

  toggleOptions: Array<String> = ["Delivered", "Cannot Be Delivered"];
  selectedValue : String[] = ["Delivered"]

  now$: Observable<Date>;
  nextTime$: Observable<StringTimeWithDate>;
  timeToNext$: Observable<string>;

  //Deadline for Orders.
  /*
  ToDO: Merge it in item data model
  */
  futuretimes =[
    '5:00 PM',
    '7:30 PM',
    '8:30 PM',
    '9:30 PM',
  ];
  //futuretimes =[];
  futureTimesAsDate: StringTimeWithDate[];

  constructor(
    private itemService: ItemsService,
  ) {

    this.calculateDeadline();

    
   }

   selectionChanged(item, id) {
    console.log("Selected value: " + item.value, id);

    this.selectedValue.forEach(i => console.log(`Included Item: ${i}`));
  }

  ngOnInit() {       
 
    this.getAllItem();
  }

  getItem(): void {
    const id = 1;
    this.itemService.getItem(id)
      .subscribe(item => {

        console.log('>>Received data: ', item)

        this.item = item

      }
        
        );
  }

  getAllItem(): void {    
    this.itemService.getAllItem()
      .subscribe(item => {
        console.log('>>Received all data: ', item)
        this.items = item
      }
      );
      

      this.getAllItemDeadline();
  }

  getAllItemDeadline(): void {    
    this.itemService.getAllItem()
      .subscribe(item => {
        console.log('>>Received deadline data: ', item)
        this.items = item
      }
      );      
  }

  markDelivered(id: number){
    this.isDelivered = true;
  }   

  calculateDeadline(){
    // map time to date and ensure sort ascending
    this.futureTimesAsDate = this.futuretimes
      .map(time => ({ time, asDate: this.timeStringToDate(time) }))
      .sort((a, b) => (a.asDate > b.asDate ? 1 : -1));

    this.now$ = interval(1000).pipe(
      startWith(null),
      map(() => new Date())
    );

    this.nextTime$ = this.now$.pipe(
      // TODO. handle when no more dates
      map((now: Date) => this.futureTimesAsDate.find(timeDate => timeDate.asDate > now))
    );

    this.timeToNext$ = combineLatest(this.now$, this.nextTime$, (now, nextTime) => {
      if (!now || !nextTime) {
        return null;
      }

      const diff = nextTime.asDate.valueOf() - now.valueOf();
      const millisPerSec = 1000;
      const millisPerMin = millisPerSec * 60;

      const min = Math.floor(diff / millisPerMin);
      const msLeftover = Math.floor(diff % millisPerMin);
      const secLeftover = Math.ceil(msLeftover / millisPerSec);

      const formattedMin = min < 10 ? `0${min}` : min;
      const formattedSec = secLeftover < 10 ? `0${secLeftover}` : secLeftover;
      const minMsToNext = `${formattedMin}:${formattedSec}`;

      return minMsToNext;
    });

  }

  private timeStringToDate = dateString => {
    const [time, period] = dateString.split(' ');
    const [hour, minutes] = time.split(':').map(numString => Number(numString));
    const hourOutOf24 = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : hour;

    const dateForDateString = new Date();
    dateForDateString.setHours(hourOutOf24, minutes, 0, 0);

    return dateForDateString;
  }

}
