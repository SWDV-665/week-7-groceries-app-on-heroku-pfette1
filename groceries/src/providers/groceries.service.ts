import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, Subject, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  items: Object = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseUrl = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesService Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseUrl + '/api/groceries').pipe(
      map(this.extractData),
      catchError(err => { throw err })
    );
  }

  private extractData(res: Response | any) {
    let body = res;
    return body || {};
  }

  removeItem(id: any) {
    this.http.delete(this.baseUrl + '/api/groceries/' + id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  addItem(item: any) {
    this.http.post(this.baseUrl + '/api/groceries', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item: any, index: number, id: any) {
    console.log(item);
    this.http.put(this.baseUrl + '/api/groceries/' + id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }
}
