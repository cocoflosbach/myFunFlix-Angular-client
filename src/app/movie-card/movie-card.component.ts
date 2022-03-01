/**
 * MovieCardComponent renders a grid display of all the movies in the
 * database. It also renders buttons to open a movie's synopsis, see
 * more information on the movie's director and Genres,
 * as well as a favorite button that adds movies to the user's favorite list.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favMovies: any[] = [];
  user: any = localStorage.getItem('user');
  isFavorite = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * call API end-point to get all movies
   * @function getMovies
   * @return all movies in the database.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * call API end-point to get current user details
   * @function getUserDetails
   * @return current user's data in json format
   */
  getUserDetails(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.favMovies = response.FavoriteMovies;
      console.log(this.user);
      return this.user;
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
   * call API end-point to add a movie from user's favorite movie list
   * @function addFavoriteMovie
   * @param movieId {string}
   * @return current user's updated favorite movie list
   */
  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavoriteMovies(movieId).subscribe((response: any) => {
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 600,
      });
      this.getUserDetails();
      this.ngOnInit();
    });
    return this.getFavMovies();
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
    this.checkFavorites(movieId)
      ? this.removeFavoriteMovie(movieId)
      : this.addFavoriteMovie(movieId);
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
