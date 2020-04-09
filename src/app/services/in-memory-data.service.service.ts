import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      { id: 1, name: 'Bhujia',type:'namkeen', quantity: 2, price: 22.22,image:'assets/bhujia.jpg',deadline:'1:30 AM'},
      { id: 2, name: 'Amazon Echo',type:'electronics', quantity: 1, price: 5000,image:'assets/echo.jpg',deadline:'2:30 AM'},
      { id: 2, name: 'Smart TV',type:'electronics', quantity: 1, price: 50000,image:'assets/smarttv.jpeg',deadline:'2:00 AM'}
    ];
    const deadlines = [
      { id: 1, deadline:'1:30 AM'},
      { id: 2, deadline:'2:30 AM'},
      { id: 2, deadline:'2:00 AM'}
    ];
    return {items};
  }
}