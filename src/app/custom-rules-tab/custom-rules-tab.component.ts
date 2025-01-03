import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, Rarity, DisplayType, CustomRule, Comparator } from '../filter';
import { FormsModule } from '@angular/forms';
import { itemData } from '../item-data';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-custom-rules-tab',
  templateUrl: './custom-rules-tab.component.html',
  styleUrls: ['../general.scss', './custom-rules-tab.component.scss'],
  imports: [FormsModule, AutocompleteComponent, ColorPickerModule]
})
export class CustomRulesTabComponent {
  @Input({ required: true }) filter!: Filter;
  @Output('updateFilter') updateFilterEmitter = new EventEmitter<void>();

  Rarity = Rarity;
  Comparator = Comparator;
  DisplayType = DisplayType;

  itemData = itemData;

  currencyItemTypes = itemData.filter(i => i.itemClass === 'Stackable Currency').map(i => i.itemType);

  removeCustomRule(index: number) { this.filter.customRules.splice(index, 1); this.updateFilter();  }
  toggleCustomRuleActive = (index: number) => { this.filter.customRules[index].active = !this.filter.customRules[index].active; this.updateFilter(); }
  addCustomRule = () => { this.filter.customRules.push(new CustomRule()); this.updateFilter(); }

  itemTypeChanged(rule: CustomRule) {
    const itemData = this.itemData.find(i => i.itemType === rule.itemType);
    if (itemData) {
      rule.itemClass = itemData.itemClass;
    } else {
      rule.itemClass = 'All';
    }
    rule.baseTypes = ['All'];
    this.updateFilter();
  }

  getBaseTypesForItemType = (itemType: string) => {
    if (itemType === 'All') return ['All'];
    return this.itemData.find(i => i.itemType === itemType)!.baseTypes;
  }

  selectedValuesChanged(rule: CustomRule, values: string[]) {
    rule.baseTypes = values;
    this.updateFilter();
  }

  updateFilter() {
    this.updateFilterEmitter.emit();
  }
}
