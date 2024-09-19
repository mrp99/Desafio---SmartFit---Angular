import { Component, Input, OnInit } from '@angular/core';
import { LocationType } from 'src/app/interfaces/location-type.interface';
import { SearchUnitsService } from 'src/app/services/search-units.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input() unitsList: LocationType[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
