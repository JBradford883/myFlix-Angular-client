// Core modules
import { Component, OnInit } from '@angular/core';

// Material Modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Custom components
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { Router } from '@angular/router';

// Declare global variables
const user = localStorage.getItem('username');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }


  /**
   * Gets movies and favoriteMovies when initialized
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  /**
   * Gets all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //console.log(this.movies);
      return this.movies;
    });
  }

  /**
  * opens the genre modal with information about the specific genre
  * @param name (genre name)
  * @param description (genre description)
  */
  openGenre(name: string, description: string,): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * opens the director modal with informaiton about the specific director
   * @param name (director name)
   * @param bio (director bio)
   * @param birth (director birth year)
   * @param death (director death year)
   */
  openDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '500px'
    });
  }

  /**
   * open the synopsis modal with information about the specific movie
   * @param title (movie title)
   * @param imagePath (movie poster)
   * @param description (movie description)
   */
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * adds the movie to the users favorite movies array
   * @param id (movie._id - unique identifier)
   * @param Title (movie title)
   * @returns a status message -succes/error
   */
  postFavoriteMovies(id: string, Title: string): void {
    this.fetchApiData.postFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  /**
   * removes a movie from the users favorite movies array
   * @param id (movie._id - unique identifier)
   * @param Title (movie title)
   * @returns a status message - success/error
   */
  deleteFavoriteMovies(id: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  /**
   * Returns a list of the users favorites movie._id's
  */
  getUsersFavs(): void {
    this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      //console.log(this.favs);
      return this.favs;
    });
  }

  /**
   * Compares the movie id's with getUserFavs to display the favorite movie icon correctly
   * red heart - movie is in favorties list / white heart with outline - movie is not in favorites list
   * @param id 
   * @returns 
   */
  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * logs out the user by clearing the localstorage (username, token) and reloads the page
   * then -> redirect to welcome page
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }

}
