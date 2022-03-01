import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://my-flix-2406.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   *  Inject the HttpClient module to the constructor params
  This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */

  constructor(private http: HttpClient) {
    // making the api call for the user refistration
    this.http = http;
  }

  /**
   * call API end-point for registering a new user
   * @function userRegistration
   * @param userDetails
   * @returns new object containing user details
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * call API end-point for logging in an existing user
   * @function userLogin
   * @param userDetails
   * @returns new object containing user details
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * call API end-point for getting all movies
   * @function getAllMovies
   * @returns an array with all movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point for getting a single movie by Username
   * @function getOneMovie
   * @returns an array with all movies
   */

  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point for getting a movie's director by name
   * @function getDirector
   * @returns a movie directors details
   */

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point for getting a movie's director by name
   * @function getGenre
   * @returns a movie genre details
   */

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point for getting a user by username
   * @function getUser
   * @returns an object containing user information
   */

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point for getting current user's favorite movie list
   * @function getFavoriteMovies
   * @returns an array containing a list of favorite movies
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to add a movie from user's favorite movie list
   * @function addFavoriteMovies
   * @param movieId {string}
   * @return current user's updated favorite movie list
   */
  addFavoriteMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to remove a movie from user's favorite movie list
   * @function deleteFavoriteMovies
   * @param movieId {string}
   * @return current user's updated favorite movie list
   */
  deleteFavoriteMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point for deleting a user by username
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point for updating current user's information
   * @function updateUser
   * @returns an updated object containing user information
   */
  updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log(userDetails);
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
