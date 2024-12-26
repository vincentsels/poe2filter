import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'pf-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  imports: [FormsModule]
})
export class AutocompleteComponent {
  @Input({ required: true }) options: string[] = [];
  @Input({ required: true }) showOptions: boolean = true;

  @Input({ required: true }) selectedValues: string[] = [];
  @Output() selectedValuesChange = new EventEmitter<string[]>();

  @ViewChild('autoCompleteInputElement') inputElement!: ElementRef;

  open = false;
  searchText = signal('');

  onSelectedValuesChange(newValues: string[]) {
    this.selectedValues = newValues;
    this.selectedValuesChange.emit(this.selectedValues);
  }

  openAndSetFocus() {
    this.open = true;
    setTimeout(() => {
      if (this.inputElement) {
        this.inputElement.nativeElement.focus();
      }
    }, 1);
  }

  isSelected(option: string) {
    return this.selectedValues.includes(option);
  }

  toggle(option: string) {
    if (this.isSelected(option)) {
      this.selectedValues = this.selectedValues.filter(v => v !== option);
      if (this.selectedValues.length === 0) {
        this.selectedValues = ['All'];
      }
    } else {
      if (option === 'All') {
        this.selectedValues = ['All'];
      } else {
        if (option != 'All' && this.selectedValues.includes('All')) {
          this.selectedValues = [option];
        } else {
          this.selectedValues = [...this.selectedValues, option];
        }
      }
    }
    this.onSelectedValuesChange(this.selectedValues);
  }

  filteredOptions = computed(() => {
    const searchTextValue = this.searchText();
    if (!searchTextValue) return this.options;
    return this.options.filter(o => o.toLowerCase().includes(searchTextValue.toLowerCase()));
  });
}
