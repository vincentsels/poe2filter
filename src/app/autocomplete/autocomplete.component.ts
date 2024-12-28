import { Component, ElementRef, EventEmitter, Output, ViewChild, HostListener, computed, signal, input, model } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'pf-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  imports: [FormsModule]
})
export class AutocompleteComponent {
  allLabel = input<string>('All');
  options = input.required<string[]>();
  showOptions = input.required<boolean>();
  disabled = input.required<boolean>();
  selectedValues = model.required<string[]>();

  @Output() selectedValuesChange = new EventEmitter<string[]>();

  @ViewChild('autoCompleteInputElement') inputElement!: ElementRef;

  open = false;
  searchText = signal('');

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.open && !this.elementRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  onSelectedValuesChange(newValues: string[]) {
    this.selectedValues.set(newValues);
    this.selectedValuesChange.emit(newValues);
  }

  openAndSetFocus() {
    if (this.disabled()) return;
    this.open = true;
    setTimeout(() => {
      if (this.inputElement) {
        this.inputElement.nativeElement.focus();
      }
    }, 1);
  }

  isSelected(option: string) {
    return this.selectedValues().includes(option);
  }

  toggle(option: string) {
    let newValues = this.selectedValues();
    if (this.isSelected(option)) {
      newValues = newValues.filter(v => v !== option);
      if (newValues.length === 0) {
        newValues = [this.allLabel()];
      }
    } else {
      if (option === this.allLabel()) {
        newValues = [this.allLabel()];
      } else {
        if (option != this.allLabel() && newValues.includes(this.allLabel())) {
          newValues = [option];
        } else {
          newValues = [...newValues, option];
        }
      }
    }
    this.onSelectedValuesChange(newValues);
  }

  close() {
    this.open = false;
    this.searchText.set('');
  }

  filteredOptions = computed(() => {
    const searchTextValue = this.searchText();
    if (!searchTextValue) return this.options();
    return this.options().filter(o => o.toLowerCase().includes(searchTextValue.toLowerCase()));
  });

  formattedSelectedValues = computed(() => {
    return this.selectedValues().join(', ');
  });
}
