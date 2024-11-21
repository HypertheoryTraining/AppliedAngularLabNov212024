import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FEATURE_FLAG_URL } from '.';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FeaturesService {
  #client = inject(HttpClient);
  private enabledFeatures$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.loadEnabledFeatures();
  }

  private loadEnabledFeatures() {
    this.#client.get<string[]>(FEATURE_FLAG_URL).pipe(
      tap(features => this.enabledFeatures$.next(features))
    ).subscribe();
  }

  public isFeatureEnabled(feature: string): boolean {
    return this.enabledFeatures$.value.includes(feature);
  }

  public getEnabledFeatures(): Observable<string[]> {
    return this.enabledFeatures$.asObservable();
  }
}