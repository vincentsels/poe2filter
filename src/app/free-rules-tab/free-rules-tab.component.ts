import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../filter';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-free-rules-tab',
  templateUrl: './free-rules-tab.component.html',
  styleUrls: ['../general.scss', './free-rules-tab.component.scss'],
  imports: [FormsModule, ColorPickerModule]
})
export class FreeRulesTabComponent {
  @Input({ required: true }) filter!: Filter;
  @Output('updateFilter') updateFilterEmitter = new EventEmitter<void>();

  updateFilter() {
    this.updateFilterEmitter.emit();
  }
}
