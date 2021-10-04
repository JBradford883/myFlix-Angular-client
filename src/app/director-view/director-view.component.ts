// core modules
import { Component, Inject, OnInit } from '@angular/core';

// Material modules
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  constructor(

    /**
     * Uses inject to get the movie details form the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string
    }
  ) { }

  ngOnInit(): void {
  }

}