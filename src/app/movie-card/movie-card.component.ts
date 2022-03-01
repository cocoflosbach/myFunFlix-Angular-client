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

  /**
   * Gets movie list when the coponent is initiated
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * Gets all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUserDetails(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.favMovies = response.FavoriteMovies;
      console.log(this.user);
      return this.user;
    });
  }

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

  openDirectorView(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      width: '500px',
    });
  }

  openGenreView(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  /* openProfileView(): void {
    this.dialog.open(ProfileViewComponent),
      {
        width: '800px',
      };
  } */

  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.favMovies = response.FavoriteMovies;
      console.log(this.favMovies);
      return this.favMovies;
    });
  }

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

  /* isFavorite(MovieId: string): boolean {
    return this.favMovies.some((movie) => movie._id === MovieId);
  } */

  toggleFavIcon(movieId: string): void {
    this.checkFavorites(movieId)
      ? this.removeFavoriteMovie(movieId)
      : this.addFavoriteMovie(movieId);
  }

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
