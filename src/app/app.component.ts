import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  /* Function for manual testing */

  noIdInUrl() {
    this.router.navigate(['/']);
  }

  idInUrl(id?: string) {
    if (!id) id = Math.floor(Math.random() * 6 + 1).toString();
    this.router.navigate(['/', id]);
  }
}
