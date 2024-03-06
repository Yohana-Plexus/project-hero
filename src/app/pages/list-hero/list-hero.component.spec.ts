import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../../services/hero.service';
import { of, throwError } from 'rxjs';
import { Hero } from '../../models/hero';
import ListHeroComponent from './list-hero.component';

describe('ListHeroComponent', () => {
  let component: ListHeroComponent;
  let fixture: ComponentFixture<ListHeroComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'list',
      'find',
      'delete',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    });

    fixture = TestBed.createComponent(ListHeroComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize heroList and onLoading on ngOnInit', () => {
    const mockHeroList: Hero[] = [
      {
        id: 12,
        name: 'Test Hero',
        description: '',
        source: '',
        superpower: '',
      },
    ];
    mockHeroService.list.and.returnValue(of(mockHeroList));

    component.ngOnInit();

    expect(component.heroList).toEqual(mockHeroList);
    expect(component.onLoading).toBeFalse();
  });

});
