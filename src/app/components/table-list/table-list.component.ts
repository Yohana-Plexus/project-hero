import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.sass',
})
export class TableListComponent<T> {
  @Input({ required: true }) dataSource: T[] = [];
  @Input({ required: true }) columnsToDisplay: string[] = [];
  
  @Output() onDelete: EventEmitter<T> = new EventEmitter();
  @Output() onEdit: EventEmitter<T> = new EventEmitter();
  
  public getColumnHeader(column: string): string {
    return column.charAt(0).toUpperCase() + column.slice(1);
  }

  public deleteClicked(item: T): void {
    this.onDelete.emit(item)
  }
  public editClicked(item: T): void {
    this.onEdit.emit(item)
  }
}
