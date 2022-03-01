import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss'],
})
export class GenreViewComponent implements OnInit {
  constructor(
    /**
     * Use Inject to get the movie details from the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
