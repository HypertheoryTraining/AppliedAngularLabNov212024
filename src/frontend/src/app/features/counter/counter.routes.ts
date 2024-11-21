import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { CounterUIComponent } from './pages/ui.component';


export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: CounterComponent,
    children: [
        {
          path: 'ui',
          //canMatch: [canMatchFeature('people-table-trial')],
          component: CounterUIComponent,
        },
    ]
  },
];
