import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UnitsType } from '../interfaces/units-type.interface';
import { LocationType } from '../interfaces/location-type.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchUnitsService {

  protected readonly URL: string = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";
  private allUnitsSubject: BehaviorSubject<LocationType[]> = new BehaviorSubject<LocationType[]>([]);
  private allUnits$: Observable<LocationType[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: LocationType[] = [];

  constructor(private http: HttpClient) {
    this.http.get<UnitsType>(this.URL).subscribe({
      next: (data) => {
        this.allUnitsSubject.next(data.locations);
        this.filteredUnits = data.locations;
      },
      error: (error: HttpErrorResponse) => this.handleHttpErro(error),
    });
  }

  public getAllUnits(): Observable<LocationType[]> {
    return this.allUnits$;
  }

  public getFilteredUnits() {
    return this.filteredUnits;
  }

  public setFilteredUnits(units: LocationType[]): void {
    this.filteredUnits = units;
  }

  private handleHttpErro(error: HttpErrorResponse): Observable<never> {
    const msg: string = 'Ocorreu um erro ao obter os dados. Por favor, tente novamente.';
    console.error('Ocorreu um erro: ', error);
    return throwError(() => new Error(msg));
  }
}
