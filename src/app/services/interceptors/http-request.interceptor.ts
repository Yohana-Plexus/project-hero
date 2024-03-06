import type {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const requestHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      showToastError(snackBar, error);
      return throwError(() => error);
    })
  );
};

function showToastError(snackBar: MatSnackBar, error: HttpErrorResponse): void {
  snackBar.open(error.message, '', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: 'error-snackbar',
  });
}
