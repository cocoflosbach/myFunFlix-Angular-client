/**
 * The AppComponent is the root component rendered in the index.html file and is the parent
 * component for the app.
 * @module AppComponent
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFunFlix-Angular-client';

  constructor() {}
  ngOnInit(): void {}
}
