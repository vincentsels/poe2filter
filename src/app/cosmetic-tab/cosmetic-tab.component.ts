import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, Rarity, CustomRule, Comparator, CosmeticOptions, MinimapIconShape, MinimapIconSize, Color, LabelSize } from '../filter';
import { FormsModule } from '@angular/forms';
import { itemData } from '../item-data';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-cosmetic-tab',
  templateUrl: './cosmetic-tab.component.html',
  styleUrls: ['../general.scss', './cosmetic-tab.component.scss'],
  imports: [FormsModule, AutocompleteComponent, ColorPickerModule]
})
export class CosmeticTabComponent {
  @Input({ required: true }) filter!: Filter;
  @Output('updateFilter') updateFilterEmitter = new EventEmitter<void>();

  Rarity = Rarity;
  Comparator = Comparator;
  MinimapIconShape = MinimapIconShape;
  MinimapIconSize = MinimapIconSize;
  Color = Color;
  LabelSize = LabelSize;

  itemData = itemData;

  currencyItemTypes = itemData.filter(i => i.itemClass === 'Stackable Currency').map(i => i.itemType);

  presetColors = [
    'rgb(127,127,127)',
    'rgb(200,200,200)',
    'rgb(136,136,255)',
    'rgb(255,255,119)',
    'rgb(175,96,37)',
    'rgb(170,158,130)',
    'rgb(27,162,155)',
    'rgb(74,230,58)',
  ]

  removeCustomCosmeticRule(index: number) { this.filter.customCosmeticRules.splice(index, 1); this.updateFilter();  }
  toggleCustomCosmeticRuleActive = (index: number) => { this.filter.customCosmeticRules[index].active = !this.filter.customCosmeticRules[index].active; this.updateFilter(); }
  addCustomCosmeticRule = () => {
    const cosmeticRule = new CustomRule();
    cosmeticRule.cosmeticOptions = new CosmeticOptions();
    cosmeticRule.continue = true;
    this.filter.customCosmeticRules.push(cosmeticRule);
    this.updateFilter();
  }

  toggleCosmeticTopCurrencyLabel = () => { this.filter.cosmeticTopCurrencyLabels = !this.filter.cosmeticTopCurrencyLabels; this.updateFilter(); }
  toggleCosmeticTopCurrencyAlertSounds = () => { this.filter.cosmeticTopCurrencyAlertSounds = !this.filter.cosmeticTopCurrencyAlertSounds; this.updateFilter(); }
  toggleCosmeticRemoveAllHighlights = () => { this.filter.cosmeticRemoveAllHighlights = !this.filter.cosmeticRemoveAllHighlights; this.updateFilter(); }
  toggleCosmeticRemoveAllMinimapIcons = () => { this.filter.cosmeticRemoveAllMinimapIcons = !this.filter.cosmeticRemoveAllMinimapIcons; this.updateFilter(); }

  toggleMinimapIcon = (rule: CustomRule) => { rule.cosmeticOptions!.minimapIcon = !rule.cosmeticOptions!.minimapIcon; this.updateFilter(); }
  togglePlayEffect = (rule: CustomRule) => { rule.cosmeticOptions!.playEffect = !rule.cosmeticOptions!.playEffect; this.updateFilter(); }

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

  toggleBackgroundColor(rule: CustomRule) {
    if (rule.cosmeticOptions!.backgroundColor) rule.cosmeticOptions!.backgroundColor = null;
    else rule.cosmeticOptions!.backgroundColor = 'rgba(0,0,0,0.9411)';
    this.updateFilter();
  }

  toggleBorderColor(rule: CustomRule) {
    if (rule.cosmeticOptions!.borderColor) rule.cosmeticOptions!.borderColor = null;
    else rule.cosmeticOptions!.borderColor = 'rgba(200,200,200,1)';
    this.updateFilter();
  }

  toggleTextColor(rule: CustomRule) {
    if (rule.cosmeticOptions!.textColor) rule.cosmeticOptions!.textColor = null;
    else rule.cosmeticOptions!.textColor = 'rgba(200,200,200,1)';
    this.updateFilter();
  }

  toggleFontSize(rule: CustomRule) {
    if (rule.cosmeticOptions!.fontSize) rule.cosmeticOptions!.fontSize = null;
    else rule.cosmeticOptions!.fontSize = LabelSize.Normal;
    this.updateFilter();
  }

  getCurrencyStyle(o: CosmeticOptions) {
    return {
      'margin-left': o.borderColor ? '0px' : '1px',
      'margin-right': o.borderColor ? '0px' : '1px',
      'padding-top': o.borderColor ? '7px' : '8px',
      'background': o.backgroundColor || 'inherit',
      'color': o.textColor || 'rgb(170,158,130) !important',
      'border': o.borderColor ? '1px solid ' + o.borderColor + ' !important' : 'none !important',
      'line-height': o.borderColor ? '14px' : '16px',
    };
  }

  getItemStyle(o: CosmeticOptions) {
    return {
      'margin-left': o.borderColor ? '0px' : '1px',
      'margin-right': o.borderColor ? '0px' : '1px',
      'padding-top': o.borderColor ? '7px' : '8px',
      'background': o.backgroundColor || 'inherit',
      'color': o.textColor || 'rgb(200,200,200) !important',
      'border': o.borderColor ? '1px solid ' + o.borderColor + ' !important' : 'none !important',
      'line-height': o.borderColor ? '14px' : '16px',
    };
  }

  updateFilter() {
    this.updateFilterEmitter.emit();
  }
}
