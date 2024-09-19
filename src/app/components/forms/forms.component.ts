import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationType } from 'src/app/interfaces/location-type.interface';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { SearchUnitsService } from 'src/app/services/search-units.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  public results: LocationType[] = [];
  public filteredResults: LocationType[] = [];
  public formGroup!: FormGroup;

  @Output() submitEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private searchUnitsService: SearchUnitsService,
    private filterUnitsService: FilterUnitsService
  ) { }

  ngOnInit(): void {
    this.iniitializeMethods();
  }

  public onSubmit(): void {
    this.callFilterService();
  }

  public onClean(): void {
    this.formGroup.reset();
  }

  private iniitializeMethods(): void {
    this.callForm();
    this.callService();
  }

  private callService(): void {
    this.searchUnitsService.getAllUnits().subscribe({
      next: (data) => {
        this.results = data;
        this.filteredResults = data;
      },
      error: (error) => console.log(error),
    });
  }

  private callForm(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });
  }

  private callFilterService(): void {
    let { showClosed, hour } = this.formGroup.value;
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.searchUnitsService.setFilteredUnits(this.filteredResults);
    this.submitEvent.emit();
  }
}
