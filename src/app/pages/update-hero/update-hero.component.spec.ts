import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component'; // Importa el componente HeroFormComponent
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import UpdateHeroComponent from './update-hero.component';
import { heroMockData } from '../../services/mocks/hero-mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Hero } from '../../models/hero';
import { Observable, of } from 'rxjs';

const mockListHero = heroMockData;

describe('UpdateHeroComponent', () => {
  let component: UpdateHeroComponent;
  let fixture: ComponentFixture<UpdateHeroComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['save']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(UpdateHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save hero successfully and navigate to list-hero', () => {
    const hero: Hero = {
      id: 12,
      name: 'Test Hero',
      description: '',
      source: '',
      superpower: '',
    };
    mockListHero.push(hero);
    heroServiceSpy.save.and.returnValue(of(mockListHero));

    component.saveHero(hero);

    expect(heroServiceSpy.save).toHaveBeenCalledWith(hero);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list-hero']);
  });

  it('should handle error while saving hero', () => {
    const hero: Hero = {
      id: 12,
      name: 'Test Hero',
      description: '',
      source: '',
      superpower: '',
    };
    const errorMessage = 'Error saving hero';

    heroServiceSpy.save.and.returnValue(
      new Observable<Hero[]>((observer) =>
        observer.error({ message: errorMessage })
      )
    );

    component.saveHero(hero);
    expect(heroServiceSpy.save).toHaveBeenCalledWith(hero);
  });
});
