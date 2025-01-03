import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FlaskType, RarityToHide, QualityItemType, SocketedItemType, BaseTypeTier, WeaponType, MinimumRarity, ArmourType, DefenceType, CurrencyToHide, Rarity, DisplayType, CustomRule, Comparator, WeaponsAndArmourRarityToHide, MinimapIconShape, MinimapIconSize, Color, LabelSize } from '../filter';
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

  FlaskType = FlaskType;
  RarityToHide = RarityToHide;
  WeaponsAndArmourRarityToHide = WeaponsAndArmourRarityToHide;
  SocketedItemType = SocketedItemType;
  QualityItemType = QualityItemType;
  WeaponType = WeaponType;
  BaseTypeTier = BaseTypeTier;
  ArmourType = ArmourType;
  DefenceType = DefenceType;
  MinimumRarity = MinimumRarity;
  CurrencyToHide = CurrencyToHide;
  Rarity = Rarity;
  Comparator = Comparator;
  DisplayType = DisplayType;
  MinimapIconShape = MinimapIconShape;
  MinimapIconSize = MinimapIconSize;
  Color = Color;
  LabelSize = LabelSize;

  itemData = itemData;

  lifeFlaskBaseTypes = itemData.filter(i => i.itemType === 'Life Flasks')[0].baseTypes;
  manaFlaskBaseTypes = itemData.filter(i => i.itemType === 'Mana Flasks')[0].baseTypes;
  charmBaseTypes = itemData.filter(i => i.itemType === 'Charms')[0].baseTypes;
  ringBaseTypes = itemData.filter(i => i.itemType === 'Rings')[0].baseTypes;
  amuletBaseTypes = itemData.filter(i => i.itemType === 'Amulets')[0].baseTypes;
  beltBaseTypes = itemData.filter(i => i.itemType === 'Belts')[0].baseTypes;
  runeBaseTypes = itemData.filter(i => i.itemType === 'Socketable')[0].baseTypes.filter(b => b.includes('Rune'));
  baseCurrencyTypes = [
    "Transmutation Shard",
    "Artificer's Shard",
    "Regal Shard",
    "Chance Shard",
    "Orb of Augmentation",
    "Orb of Transmutation",
    "Armourer's Scrap",
    "Blacksmith's Whetstone",
    "Arcanist's Etcher",
    "Artificer's Orb",
    "Glassblower's Bauble",
    "Gemcutter's Prism",
    "Vaal Orb",
    "Regal Orb",
    "Orb of Alchemy",
    "Chaos Orb",
    "Lesser Jeweller's Orb",
  ];

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
