import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html'
})
export class IndexComponent {

  constructor(private route: ActivatedRoute,
              private router: Router) {
    const redirect = this.route.snapshot.queryParamMap.get('route');
    if (redirect) {
      this.router.navigate([`/${redirect}`]);
    }
  }
}
