import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    LucideAngularModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    const title = this.getTitleFromRoute(this.route);
    this.updateTitle(title);

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getTitleFromRoute(this.route))
      )
      .subscribe((title) => this.updateTitle(title));
  }

  private getTitleFromRoute(route: ActivatedRoute): string {
    let child = route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    return child?.snapshot.data['title'];
  }

  private updateTitle(title: string) {
    if (title) {
      this.titleService.setTitle(`${environment.clientName} - ${title}`);
    } else {
      this.titleService.setTitle(environment.clientName);
    }
  }
}
