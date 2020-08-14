import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject,throwError as observableThrowError,} from 'rxjs';

 

import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

   baseUrl =environment.url

 

  liggedUserData = new Subject<any>();

 

  constructor(private http:HttpClient) {

 

  }

 

  userAuthentication(userObj) {
    return this.http.post(this.baseUrl + 'login', userObj);
  }
}