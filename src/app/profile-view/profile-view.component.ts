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

  getUserDetails(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      return this.user;
    });
  }

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

  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.favMovies = response.FavoriteMovies;
      console.log(this.favMovies);
      return this.favMovies;
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
  toggleFavIcon(movieId: string): void {
    if (this.checkFavorites(movieId)) this.removeFavoriteMovie(movieId);
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
