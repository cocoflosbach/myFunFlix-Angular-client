/**
 * The WelcomePageComponent renders a mat card containing the myFunFlix logo and
 * action buttons to register a new user or log in an existing user. Clicking
 * either of the buttons opens a mat-dialog where users can input their details.
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog, public matCard: MatCardModule) {}

  ngOnInit(): void {}

  /**
   * Opens a dialog to display registration form.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  /**
   * Opens a dialog to display login form.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '360px',
    });
  }
}
