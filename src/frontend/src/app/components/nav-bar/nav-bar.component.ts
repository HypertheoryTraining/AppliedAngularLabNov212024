import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NavLinkComponent } from './components/nav-link.component';
import { NavLinkModel } from './types';
import { Title } from '@angular/platform-browser';
import { FeaturesService } from '../../shared';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NavLinkComponent],
  providers: [Title],
  template: `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">{{ siteName() }}</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          @for (link of filteredLinks(); track link.text) {
            <li>
              <app-link [link]="link" (navigated)="onNavigation($event)" />
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavBarComponent implements OnInit {
  #titleService = inject(Title);
  #featureService = inject(FeaturesService);
  siteName = signal('Applied Angular!');

  ngOnInit(): void {
    this.#titleService.setTitle(this.siteName());
  }

  links = signal<NavLinkModel[]>([
    { 
      text: 'Home', 
      path: 'home',
    },
    { 
      text: 'Gift Planning', 
      path: 'gifts', 
      featureGated: 'gift-giving',
    },
    { 
      text: 'ATM', 
      path: 'atm',
       featureGated: 'atm',
    },
    { 
      path: 'counter', 
      text: 'Counter', 
    },
    { 
      path: 'books',
      text: 'Books',
      featureGated: 'books', 
    },
    { 
      text: 'About Us', 
      path: 'about', 
    },
  ]);

  filteredLinks = signal<NavLinkModel[]>([]);

  constructor() {
    this.filteredLinks.set(this.links().filter(link => 
      !link.featureGated || this.#featureService.isFeatureEnabled(link.featureGated)
    ));
  }

  onNavigation(item: NavLinkModel) {
    this.#titleService.setTitle(`${this.siteName()} | ${item.text}`);
  }
}