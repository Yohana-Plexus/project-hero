import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableListComponent } from './table-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('TableListComponent', () => {
  let component: TableListComponent<unknown>;
  let fixture: ComponentFixture<TableListComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListComponent, MatTableModule, MatButtonModule, MatIconModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
