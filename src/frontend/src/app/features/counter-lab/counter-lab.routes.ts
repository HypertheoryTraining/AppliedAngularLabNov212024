import { Routes } from '@angular/router';
import { CounterLabComponent } from './counter-lab.component';
import { UiComponent } from './pages/ui.component';
import { PrefsComponent } from './pages/prefs.component';
import { CounterStore } from './services/counter.store';

export const COUNTER_LAB_ROUTES: Routes = [
  {
    path: '',
    component: CounterLabComponent,
    providers: [CounterStore],
    children: [
      { path: 'ui', component: UiComponent },
      { path: 'prefs', component: PrefsComponent },
    ],
  },
];
