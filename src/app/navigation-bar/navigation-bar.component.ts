/**
 * NavigationBarComponent renders mat navigation toolbar that provides a
 * logged in user the option to navigate between different pages of the app.
 * It also provides the option to log out of the application
 * @module NavigationBarComponent
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * Opens a dialog to display profile view.
   */
  openProfileView(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Opens a dialog to display movie view
   */
  openMovieView(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Logs current user out of app and redirects to welcome page.
   */
  logOutUser(): void {
    const endSession = localStorage.clear();
    this.router.navigate(['welcome']);
    return endSession;
  }
}
