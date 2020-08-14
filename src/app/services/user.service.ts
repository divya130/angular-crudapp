import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
// import { DataConnect } from 'src/app/model/data-connect/data-connect.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootUrl = environment.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) { }
  public getUsers(pgno): Observable<any> {
    return  this.http.get<any>(this.rootUrl+'users?page='+pgno);
   }
  public userCreation(Obj): Observable<any> {
    return this.http.post(this.rootUrl + 'users', Obj)
    
  }
  public getUserDetail(usrID):Observable<any> {
    return this.http.get<any>(this.rootUrl + 'users/'+usrID);
  }
  public userUpdation(usrid,Obj): Observable<any> {
    return this.http.put(this.rootUrl + 'users/'+usrid, Obj)
    
  }
  deleteUser(usrid): Observable<any> {
    return this.http.delete(this.rootUrl + 'users/' + usrid)
    
  }
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  } 
}

