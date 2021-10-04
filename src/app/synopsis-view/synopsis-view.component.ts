// Core modules
import { Component, Inject, OnInit } from '@angular/core';

// Material modules
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent implements OnInit {

  constructor(

    /**
     * uses inject to get the movie details form the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      ImagePath: any,
      Description: string,
      Genre: string
    }
  ) { }

  ngOnInit(): void {
  }

}
