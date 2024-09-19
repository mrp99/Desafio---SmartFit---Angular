import { Component, Input, OnInit } from '@angular/core';
import { LocationType } from 'src/app/interfaces/location-type.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card!: LocationType;

  constructor() { }

  ngOnInit(): void {
  }

}
