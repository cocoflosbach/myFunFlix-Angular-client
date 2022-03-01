/**
 * MovieViewComponent renders mat dialog card that displays more details
 * on a selected movie such as the description.
 * @module MovieViewComponent
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent implements OnInit {
  constructor(
    /**
     * Use Inject to get the movie details from the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      ImagePath: any;
      Description: string;
      Genre: string;
    }
  ) {}

  ngOnInit(): void {}
}
