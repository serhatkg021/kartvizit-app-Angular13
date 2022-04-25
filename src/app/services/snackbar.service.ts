import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  createSnackBar(type: string, message: string, duration: number = 4000): void{
    this._snackBar.open(message, '', {
      duration,
      panelClass: type
    });
  }
}
