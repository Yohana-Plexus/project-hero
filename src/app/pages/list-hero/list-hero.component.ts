import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';

import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-hero',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TableListComponent,
    MatButtonModule,
  ],

  templateUrl: './list-hero.component.html',
  styleUrl: './list-hero.component.sass',
})
export default class ListHeroComponent implements OnInit, OnDestroy {
  public heroList: Hero[] = [];
  public heroFormControl = new FormControl('');

  private destroy$ = new Subject<void>();
  constructor(
    private readonly heroService: HeroService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.heroService.list().subscribe({
      next: (heroList: Hero[]) => {
        this.heroList = heroList;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.subscribeToFilterFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  public createHero(): void {
    this.router.navigate(['/update-hero']);
  }

  public editHero(hero: Hero): void {
    this.router.navigate(['/update-hero'], { state: { hero: hero } });
  }

  public deleteHero(hero: Hero) {
    this.openDialog(hero);
  }

  private openDialog(hero: Hero): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `hero: ${hero.name}`,
        text: 'Are you sure you want to eliminate this hero?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroService.delete(hero.id).subscribe({
          next: (heroList: Hero[]) => {
            this.heroList = heroList;
            this.openToast('Hero deleted suscessfully')
          },
          error: (error) => {
            this.openToast(error.message)
          },
        });
      }
    });
  }

  private subscribeToFilterFormChanges(): void {
    this.heroFormControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.heroService.find(this.heroFormControl.value ?? '').subscribe({
          next: (heroList: Hero[]) => {
            this.heroList = heroList;
          },
          error: (error) => {
            console.log(error);
          },
        });
      });
  }


  private openToast(text: string): void {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'error-snackbar',
    });
  }
}
