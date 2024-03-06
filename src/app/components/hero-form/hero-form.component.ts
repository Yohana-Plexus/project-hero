import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hero } from '../../models/hero';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.sass',
})
export class HeroFormComponent implements OnInit {
  @Input({ required: true }) hero!: Hero;

  @Output() onSave: EventEmitter<Hero> = new EventEmitter<Hero>();

  heroForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.heroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      source: [''],
      superpower: [''],
    });
  }

  ngOnInit(): void {
    if (this.hero) {
      this.printData();
    }
  }

  saveForm(): void {
    if (this.heroForm.valid) {
      this.onSave.emit({...this.heroForm.value, id: this.hero?.id ?? null});
    }
  }

  private printData(): void {
    this.heroForm.patchValue({
      ...this.hero,
      name: this.hero.name.toUpperCase(),
    });
  }
}
