import { Component, OnInit } from '@angular/core';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-hero',
  standalone: true,
  imports: [HeroFormComponent],
  templateUrl: './update-hero.component.html',
  styleUrl: './update-hero.component.sass',
})
export default class UpdateHeroComponent  {
  public hero: Hero;

  constructor(
    private readonly heroService: HeroService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.hero = history?.state?.hero ?? null;
  }

  saveHero(hero: Hero) {
    this.heroService.save(hero).subscribe({
      error: (error) => {
        this.openToast(error.message);
      },
      complete: () => {
        this.openToast('Hero saved successfully');
        this.router.navigate(['/list-hero']);
      },
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
