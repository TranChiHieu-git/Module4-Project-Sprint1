import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar,
              private toastr: ToastrService) {
  }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  edit(msg): void {
    this.config.panelClass = ['notification', 'edit'];
    this.snackBar.open(msg, '', this.config);
  }

  delete(msg): void {
    this.config.panelClass = ['notification', 'delete'];
    this.snackBar.open(msg, '', this.config);
  }

  create(msg): void {
    this.config.panelClass = ['notification', 'create'];
    this.snackBar.open(msg, '', this.config);
  }

  showSuccess(message, title){
    this.toastr.success(message, title)
  }

  showError(message, title){
    this.toastr.error(message, title)
  }

  showInfo(message, title){
    this.toastr.info(message, title)
  }

  showWarning(message, title){
    this.toastr.warning(message, title)
  }
}
