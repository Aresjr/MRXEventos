import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

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
  constructor() { }
}
