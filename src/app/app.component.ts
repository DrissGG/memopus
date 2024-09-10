import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  standalone: true,
  selector: 'app-root',
  //template: '<router-outlet></router-outlet>',
  templateUrl: "./app.component.html",
  imports: [RouterModule],
})
export class AppComponent {
  title: String = "memopus";
}
