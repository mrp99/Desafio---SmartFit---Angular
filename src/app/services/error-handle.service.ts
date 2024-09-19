import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  constructor() { }

  public showError(message: string): void {
    message = "Ocorreu um erro: " + message;
    alert(message);
  }
}
