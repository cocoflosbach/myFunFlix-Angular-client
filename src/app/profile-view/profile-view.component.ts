/**
 * The ProfileViewComponent renders a page displaying the user's details.
 * This includes a mat card rendering the user's current informatiion,
 * an input field that allows the user to update their information,
 * and a mat card that renders a grid of the user's favorite movies
 * @module ProfileViewComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  /**
   * Gets user input values and stores in userData
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  favMovies: any[] = [];
  user: any = localStorage.getItem('user');
  isFavorite: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getFavMovies();
  }

  /**
   * call API end-point to get current user details
   * @function getUserDetails
   * @return current user's data in json format
   */
  getUserDetails(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      return this.user;
    });
  }

  /**
   * call API end-point to update an existing user's information
   * @function updateUserInformation
   * @param userData {object}
   * @return current user's updated data in json format
   */
  updateUserInformation(): void {
    this.fetchApiData.updateUser(this.userData).subscribe(
      (response: any) => {
        console.log(response);
        this.snackBar.open('Login successful', 'OK', {
          duration: 200,
        });
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 200,
        });
      }
    );
  }

  /**
   * call API end-point to get current user's favorite movie list
   * @function getFavMovies
   * @return current user's favorite movie list
   */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.favMovies = response.FavoriteMovies;
      console.log(this.favMovies);
      return this.favMovies;
    });
  }

  /**
   * Opens a dialog to display detailed view of selected movie.
   */
  openSingleMovieView(
    title: string,
    imagePath: any,
    description: string
  ): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * Opens a dialog to display Director information of selected movie.
   */
  openDirectorView(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      width: '500px',
    });
  }

  /**
   * Opens a dialog to display Genre information of selected movie.
   */
  openGenreView(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * call API end-point to remove a movie from user's favorite movie list
   * @function removeFavoriteMovie
   * @param movieId {string}
   * @return current user's updated favorite movie list
   */
  removeFavoriteMovie(movieId: string): void {
    this.fetchApiData
      .deleteFavoriteMovies(movieId)
      .subscribe((response: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 600,
        });
        this.ngOnInit();
        return this.getFavMovies();
      });
  }

  /**
   * Toggle favorite icon button
   * @function toggleFavIcon
   * @param movieId {string}
   */
  toggleFavIcon(movieId: string): void {
    if (this.checkFavorites(movieId)) this.removeFavoriteMovie(movieId);
  }

  /**
   * Check favorite movie list for specific movie ID
   * @function checkFavorites
   * @param movieId {string}
   */
  checkFavorites(movieId: string): any {
    let favIds = this.favMovies.map(function (favMovie: any) {
      return favMovie._id;
    });
    if (favIds.includes(movieId)) {
      this.isFavorite = true;
      return this.isFavorite;
    }
  }
}
