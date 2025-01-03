import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FlaskType, RarityToHide, QualityItemType, SocketedItemType, WeaponFilter, BaseTypeTier, WeaponType, MinimumRarity, ArmourType, ArmourFilter, DefenceType, CurrencyToHide, Rarity, DisplayType, Comparator, WeaponsAndArmourRarityToHide, MinimapIconShape, MinimapIconSize, Color, LabelSize } from '../filter';
import { itemData } from '../item-data';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

@Component({
  selector: 'app-quick-filter-tab',
  templateUrl: './quick-filter-tab.component.html',
  styleUrls: ['../general.scss', './quick-filter-tab.component.scss'],
  imports: [FormsModule, AutocompleteComponent, ColorPickerModule]
})
export class QuickFilterTabComponent {
  @Input({ required: true }) filter!: Filter;
  @Input({ required: true }) filterResetWarning!: boolean;
  @Input({ required: true }) dynamicWaystoneThresholds!: any;
  @Input({ required: true }) dynamicSkillGemThresholds!: any;
  @Input({ required: true }) dynamicSupportGemThresholds!: any;
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

  weaponTypesWithoutAdvancedAndExpert = [WeaponType.Sceptres, WeaponType.Staves, WeaponType.Wands, WeaponType.Quivers];

  toggleHideLifeFlasks = () => { this.filter.hideLifeFlasks = !this.filter.hideLifeFlasks; this.updateFilter(); }
  toggleHideManaFlasks = () => { this.filter.hideManaFlasks = !this.filter.hideManaFlasks; this.updateFilter(); }
  toggleHideScrolls = () => { this.filter.hideScrolls = !this.filter.hideScrolls; this.updateFilter(); }
  toggleHideAmulets = () => { this.filter.hideAmulets = !this.filter.hideAmulets; this.updateFilter(); }
  toggleHideRings = () => { this.filter.hideRings = !this.filter.hideRings; this.updateFilter(); }
  toggleHideBelts = () => { this.filter.hideBelts = !this.filter.hideBelts; this.updateFilter(); }
  toggleHideNormalAndMagicItems = () => { this.filter.hideNormalAndMagicItems = !this.filter.hideNormalAndMagicItems; this.updateFilter(); }
  toggleHideCommonCharms = () => { this.filter.hideCharms = !this.filter.hideCharms; this.updateFilter(); }
  toggleHideRunes = () => { this.filter.hideRunes = !this.filter.hideRunes; this.updateFilter(); }
  toggleHideCurrency = () => { this.filter.hideCurrency = !this.filter.hideCurrency; this.updateFilter(); }

  toggleHideGold = () => {
    this.filter.hideGold = !this.filter.hideGold;
    if (this.filter.hideGold && !this.filter.hideGoldLowerThan) {
      this.filter.hideGoldLowerThan = 50;
    }
    this.updateFilter();
  }

  toggleShowSocketedItems = () => { this.filter.showSocketedItems = !this.filter.showSocketedItems; this.updateFilter(); }
  toggleShowQualityItems = () => { this.filter.showQualityItems = !this.filter.showQualityItems; this.updateFilter(); }

  toggleHighlightUniques = () => { this.filter.highlightUniques = !this.filter.highlightUniques; this.updateFilter(); }
  toggleHighlightChanceBases = () => { this.filter.highlightChanceBases = !this.filter.highlightChanceBases; this.updateFilter(); }
  toggleHighlightRareJewellery = () => { this.filter.highlightRareJewellery = !this.filter.highlightRareJewellery; this.updateFilter(); }

  removeWeaponType(index: number) { this.filter.weaponFilters.splice(index, 1); this.updateFilter();  }
  toggleShowWeapon = (index: number) => { this.filter.weaponFilters[index].show = !this.filter.weaponFilters[index].show; this.updateFilter(); }
  addWeaponType = () => { this.filter.weaponFilters.push(new WeaponFilter()); this.updateFilter(); }

  removeArmourType(index: number) { this.filter.armourFilters.splice(index, 1); this.updateFilter();  }
  toggleShowArmour = (index: number) => { this.filter.armourFilters[index].show = !this.filter.armourFilters[index].show; this.updateFilter(); }
  addArmourType = () => { this.filter.armourFilters.push(new ArmourFilter()); this.updateFilter(); }

  toggleDynamicWaystones = () => {
    this.filter.dynamicWaystones = !this.filter.dynamicWaystones;
    if (this.filter.dynamicWaystones && !this.filter.dynamicWaystonesLevel) {
      this.filter.dynamicWaystonesLevel = 1;
    }
    this.updateFilter();
  }

  toggleDynamicSkillGems = () => {
    this.filter.dynamicSkillGems = !this.filter.dynamicSkillGems;
    if (this.filter.dynamicSkillGems && !this.filter.dynamicSkillGemsLevel) {
      this.filter.dynamicSkillGemsLevel = 1;
    }
    this.updateFilter();
  }

  updateWeaponType(weapon: WeaponFilter) {
    if (this.weaponTypesWithoutAdvancedAndExpert.includes(weapon.weaponType)) {
      weapon.baseTypeTier = BaseTypeTier.All;
    }
  }

  updateFilter() {
    this.updateFilterEmitter.emit();
  }
}
