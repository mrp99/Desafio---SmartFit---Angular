import { Injectable } from '@angular/core';
import { LocationType } from '../interfaces/location-type.interface';
import { HOUR_INDEX } from '../const/hour_index';
import { OPENING_HOURS } from '../const/opening_hours';


@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {



  constructor() { }


  private transformWeeday(weekday: number) {
    switch (weekday) {
      case 0: return 'Dom.';
      case 6: return 'Sab.';
      default: return 'Seg. à Sex.';
    }
  }

  private filterUnits(unit: LocationType, open_hour: string, closed_hour: string): boolean {
    if (!unit.schedules) return true;

    let open_hour_filter = parseInt(open_hour, 10);
    let closed_hour_filter = parseInt(closed_hour, 10);
    let todays_weekday = this.transformWeeday(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;

      if (todays_weekday === schedule_weekday) {
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour_str, unit_closed_hour_str] = schedule_hour.split(' às ');
          let unit_open_hour_int = parseInt(unit_open_hour_str.replace('h', ''), 10);
          let unit_closed_hour_int = parseInt(unit_closed_hour_str.replace('h', ''), 10);
          if ((unit_open_hour_int <= open_hour_filter) && (unit_closed_hour_int >= closed_hour_filter)) return true;
          else return false;
        }
      }
    }
    return false;
  }


  public filter(results: LocationType[], showClosed: boolean, hour: string): LocationType[] {
    let intermedianteResults = results;

    if (!showClosed) intermedianteResults = results.filter(
      location => location.opened === true);

    if (hour) {
      const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEX].first;
      const CLOSED_HOUR = OPENING_HOURS[hour as HOUR_INDEX].last;

      return intermedianteResults.filter(
        location => this.filterUnits(location, OPEN_HOUR, CLOSED_HOUR)
      );
    } else {
      return intermedianteResults;
    }
  }
}
