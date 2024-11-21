import { Routes } from '@angular/router';
import { CounterRukunComponent } from './counter-rukun.component';
import { UiRukunComponent } from './pages/ui-rukun.component';
import { PrefsRukunComponent } from './pages/prefs-rukun.component';
import { CounterRukunStore } from './service/counter-rukun.store';

export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: CounterRukunComponent,
    providers: [CounterRukunStore],
    children: [
      { path: 'ui-rukun', component: UiRukunComponent },
      { path: 'prefs-rukun', component: PrefsRukunComponent },
    ],
  },
];
