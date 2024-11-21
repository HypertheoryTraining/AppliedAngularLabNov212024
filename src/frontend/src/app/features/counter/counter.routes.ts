import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { UiComponent } from './pages/ui.component';

export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: CounterComponent,
    children: [
      {
        path: '',
        component: CounterComponent,
      },
      {
        path: 'ui',
        component: UiComponent,
      },
    ],
  },
];
