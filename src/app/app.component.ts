import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationType } from './interfaces/location-type.interface';
import { SearchUnitsService } from './services/search-units.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showList = new BehaviorSubject<boolean>(false);
  public unitsList: LocationType[] = [];

  constructor(private searchUnitsService: SearchUnitsService) { }

  public onSubmit() {
    this.unitsList = this.searchUnitsService.getFilteredUnits();
    console.log("unitsList:", this.unitsList);
    this.showList.next(true);
  }
}
