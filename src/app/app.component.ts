import { Component, OnInit } from '@angular/core';
import { Filter, FlaskType, RarityToHide, QualityItemType, SocketedItemType, WeaponFilter, BaseTypeTier, WeaponType, MinimumRarity, ArmourType, ArmourFilter, DefenceType, CurrencyToHide, Rarity, DisplayType, CustomRule, Comparator, WeaponsAndArmourRarityToHide, CosmeticOptions, MinimapIconShape, MinimapIconSize, Color, LabelSize } from './filter';
import { filterHideFlasks, filterHideNormalAndMagicGear, filterHideScrolls, filterShow2Sockets, filterShowOneSocket, filterHighlightUniques, filterTemplate, filterShowQuality, filterPreferredWeaponType, filterHideGold, filterHighlightRareJewellery, filterHideRunes, filterStaticWaystones, filterHideWaystone, filterHighlightWaystone, filterShowWaystone, filterHighlightGold, filterPreferredArmourType, filterRarePlayEffect, filterHighlightGem, filterHideGem, filterCosmeticTopCurrency, filterHideRareGearBelowExpert, filterHideRings, filterHideAmulets, filterHideBelts, filterHideCharms, filterShowFlaskExceptions, filterShowCharmExceptions, filterShowRuneExceptions, filterShowAmuletExceptions, filterShowBeltExceptions, filterShowRingExceptions, filterHideRareGearBelowAdvanced, filterHighlightChanceBases, filterPrefix, filterSuffix, filterHideCurrency } from './filter-template';
import { FormsModule } from '@angular/forms';
import { itemData } from './item-data';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { buildNumber } from '../buildnumber';

const LOCAL_STORAGE_KEY_HIDE_TIER_WARNING = 'poe-hide-tier-warning';
const LOCAL_STORAGE_KEY_FILTER_STORED = 'poe-filter-stored';
const FILTER_MAJOR_VERSION = '9';
const LOCAL_STORAGE_KEY = 'filter-v' + FILTER_MAJOR_VERSION;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule, AutocompleteComponent, ColorPickerModule]
})
export class AppComponent implements OnInit {
  filter = new Filter();
  filterText = filterTemplate;
  filterTextFull = filterTemplate;

  filterVersion = FILTER_MAJOR_VERSION + '.' + buildNumber;

  importFilterError: string | null = null;
  importFilterSuccess: boolean | null = null;
  importFilterExportDate: string | null = null;
  importFilterExportVersion: string | null = null;

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

  copyText = 'Copy to Clipboard';
  filterResetWarning = false;
  showTierWarning = true;

  tab: 'quickFilters' | 'cosmetic' | 'customRules' | 'freeRules' = 'quickFilters';

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

  dynamicWaystoneThresholds = [
    { style: 'tier-hidden', level: '' },
    { style: 'tier-shown', level: '' },
    { style: 'tier-white', level: '' },
    { style: 'tier-yellow', level: '' },
    { style: 'tier-orange', level: '' },
    { style: 'tier-brown', level: '' },
  ];

  dynamicSkillGemThresholds = [
    { style: 'tier-hidden', level: '' },
    { style: 'tier-white', level: '' },
    { style: 'tier-yellow', level: '' },
  ];

  dynamicSupportGemThresholds = [
    { style: 'tier-hidden', level: '' },
    { style: 'tier-white', level: '' },
    { style: 'tier-yellow', level: '' },
  ];

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

  ngOnInit(): void {
    this.showTierWarning = localStorage.getItem(LOCAL_STORAGE_KEY_HIDE_TIER_WARNING) !== '1';
    const filterSet = localStorage.getItem(LOCAL_STORAGE_KEY_FILTER_STORED);
    const filterFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (filterFromStorage) {
      this.filter = JSON.parse(filterFromStorage) as Filter;
      this.migrateFilter();
    }

    if (filterSet && !filterFromStorage) {
      this.filterResetWarning = true;
    }

    this.updateFilter();
  }

  migrateFilter() {
    // === v9 ===

    // Move shields over to armour
    const shieldFilters = JSON.parse(JSON.stringify(this.filter.weaponFilters.filter(w => w.weaponType === WeaponType.Shields)));
    if (shieldFilters.length > 0) {
      this.filter.weaponFilters = this.filter.weaponFilters.filter(w => w.weaponType !== WeaponType.Shields);
      this.filter.armourFilters.push(...shieldFilters.map((s: WeaponFilter) => {
        return {
          show: s.show,
          armourType: ArmourType.Shields,
          rarity: s.rarity,
          baseTypeTier: s.baseTypeTier,
          defenceType: DefenceType.All,
        } as ArmourFilter;
      }));
    }

    // Initialize charm quality
    if (this.filter.hideCharms && this.filter.hideCharmsBaseTypeExceptions.length > 0) {
      if (this.filter.hideCharmsQuality === undefined) {
        this.filter.hideCharmsQuality = 0;
      }
    }

    // Add custom cosmetic rules
    if (this.filter.customCosmeticRules === undefined) {
      this.filter.customCosmeticRules = [];
    }

    // Fix item type for custom rules
    this.filter.customRules.forEach(r => {
      if ((r as any).class) {
        r.itemType = (r as any).class;
        r.itemClass = itemData.find(i => i.itemType === r.itemType)?.itemClass || 'All';
        delete (r as any).class;
      }
    });

    // Currency filter
    const hideCommonCurrencyType = (this.filter as any).hideCommonCurrencyType;
    if (hideCommonCurrencyType) {
      this.filter.hideCurrency = true;

      if (hideCommonCurrencyType === "CommonShardsOnly") {
        this.filter.hideCurrencyTypes = ['Transmutation Shard', 'Artificer\'s Shard'];
      } else if (hideCommonCurrencyType === "ShardsOnly") {
        this.filter.hideCurrencyTypes = ['Transmutation Shard', 'Artificer\'s Shard', 'Regal Shard', 'Chance Shard'];
      } else if (hideCommonCurrencyType === "AllCommon") {
        this.filter.hideCurrencyTypes = ['Transmutation Shard', 'Artificer\'s Shard', 'Regal Shard', 'Chance Shard', 'Orb of Augmentation', 'Orb of Transmutation'];
      }

      delete (this.filter as any).hideCommonCurrency;
      delete (this.filter as any).hideCommonCurrencyType;
    }

    this.updateFilter();
  }

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

  removeCustomRule(index: number) { this.filter.customRules.splice(index, 1); this.updateFilter();  }
  toggleCustomRuleActive = (index: number) => { this.filter.customRules[index].active = !this.filter.customRules[index].active; this.updateFilter(); }
  addCustomRule = () => { this.filter.customRules.push(new CustomRule()); this.updateFilter(); }

  removeCustomCosmeticRule(index: number) { this.filter.customCosmeticRules.splice(index, 1); this.updateFilter();  }
  toggleCustomCosmeticRuleActive = (index: number) => { this.filter.customCosmeticRules[index].active = !this.filter.customCosmeticRules[index].active; this.updateFilter(); }
  addCustomCosmeticRule = () => {
    const cosmeticRule = new CustomRule();
    cosmeticRule.cosmeticOptions = new CosmeticOptions();
    cosmeticRule.continue = true;
    this.filter.customCosmeticRules.push(cosmeticRule);
    this.updateFilter();
  }

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

  toggleCosmeticTopCurrencyLabel = () => { this.filter.cosmeticTopCurrencyLabels = !this.filter.cosmeticTopCurrencyLabels; this.updateFilter(); }
  toggleCosmeticTopCurrencyAlertSounds = () => { this.filter.cosmeticTopCurrencyAlertSounds = !this.filter.cosmeticTopCurrencyAlertSounds; this.updateFilter(); }
  toggleCosmeticRemoveAllHighlights = () => { this.filter.cosmeticRemoveAllHighlights = !this.filter.cosmeticRemoveAllHighlights; this.updateFilter(); }
  toggleCosmeticRemoveAllMinimapIcons = () => { this.filter.cosmeticRemoveAllMinimapIcons = !this.filter.cosmeticRemoveAllMinimapIcons; this.updateFilter(); }

  toggleMinimapIcon = (rule: CustomRule) => { rule.cosmeticOptions!.minimapIcon = !rule.cosmeticOptions!.minimapIcon; this.updateFilter(); }
  togglePlayEffect = (rule: CustomRule) => { rule.cosmeticOptions!.playEffect = !rule.cosmeticOptions!.playEffect; this.updateFilter(); }

  updateWeaponType(weapon: WeaponFilter) {
    if (this.weaponTypesWithoutAdvancedAndExpert.includes(weapon.weaponType)) {
      weapon.baseTypeTier = BaseTypeTier.All;
    }
  }

  updateFilter() {
    const weaponFilterText = this.filter.weaponFilters.filter(w => w.show).map(w => filterPreferredWeaponType
      .replaceAll('{weaponType}', w.weaponType === WeaponType.All ? this.formatAllWeaponTypes() : `"${w.weaponType}"`)
      .replaceAll('{tierType}', w.baseTypeTier === BaseTypeTier.ExpertOnly ? '\n  BaseType "Expert "' : w.baseTypeTier === BaseTypeTier.AdvancedAndExpert ? '\n  BaseType "Expert " "Advanced "' : '')
      .replaceAll('{rarity}', (w.rarity === MinimumRarity.Rare ? 'Rare' : w.rarity === MinimumRarity.Magic ? 'Magic' : 'Normal Magic'))
      .replace('{rarePlayEffect}', (w.weaponType === WeaponType.All ? '' : '\n' + filterRarePlayEffect))
    ).join('\n');

    const armourFilterText = this.filter.armourFilters.filter(w => w.show).map(w => filterPreferredArmourType
      .replaceAll('{armourType}', w.armourType === ArmourType.All ? this.formatAllArmourTypes() : w.armourType === ArmourType.AllButShields ? this.formatAllArmourTypesButShields() : `"${w.armourType}"`)
      .replaceAll('{tierType}', w.baseTypeTier === BaseTypeTier.ExpertOnly ? '\n  BaseType "Expert "' : w.baseTypeTier === BaseTypeTier.AdvancedAndExpert ? '\n  BaseType "Expert " "Advanced "' : '')
      .replaceAll('{rarity}', (w.rarity === MinimumRarity.Rare ? 'Rare' : w.rarity === MinimumRarity.Magic ? 'Magic' : 'Normal Magic'))
      .replaceAll('{defenceType}', this.formatDefenceType(w.defenceType))
      .replace('{rarePlayEffect}', (w.armourType === ArmourType.All ? '' : '\n' + filterRarePlayEffect))
    ).join('\n');

    const dynamicWaystoneFilterText = this.buildDynamicWaystoneFilter();
    const dynamicSkillGemFilterText = this.buildDynamicSkillGemFilter();

    let showLifeFlaskExceptionsFilterText = '';
    if (this.filter.hideLifeFlasks && this.filter.hideLifeFlasksBaseTypeExceptions.length > 0 && !this.filter.hideLifeFlasksBaseTypeExceptions.includes('None')) {
      showLifeFlaskExceptionsFilterText = filterShowFlaskExceptions
        .replace('{flaskType}', 'Life Flasks')
        .replace('{baseTypes}', this.filter.hideLifeFlasksBaseTypeExceptions.map(t => `"${t}"`).join(' '))
        .replace('{minQuality}', (this.filter.hideLifeFlasksQuality || 0).toString());
    }

    let showManaFlaskExceptionsFilterText = '';
    if (this.filter.hideManaFlasks && this.filter.hideManaFlasksBaseTypeExceptions.length > 0 && !this.filter.hideManaFlasksBaseTypeExceptions.includes('None')) {
      showManaFlaskExceptionsFilterText = filterShowFlaskExceptions
        .replace('{flaskType}', 'Mana Flasks')
        .replace('{baseTypes}', this.filter.hideManaFlasksBaseTypeExceptions.map(t => `"${t}"`).join(' '))
        .replace('{minQuality}', (this.filter.hideManaFlasksQuality || 0).toString());
    }

    let showCharmExceptionsFilterText = '';
    if (this.filter.hideCharms && this.filter.hideCharmsBaseTypeExceptions.length > 0 && !this.filter.hideCharmsBaseTypeExceptions.includes('None')) {
      showCharmExceptionsFilterText = filterShowCharmExceptions
        .replace('{baseTypes}', this.filter.hideCharmsBaseTypeExceptions.map(t => `"${t}"`).join(' '));
    }

    let showRuneExceptionsFilterText = '';
    if (this.filter.hideRunes && this.filter.hideRunesExceptions.length > 0 && !this.filter.hideRunesExceptions.includes('None')) {
      showRuneExceptionsFilterText = filterShowRuneExceptions
        .replace('{baseTypes}', this.filter.hideRunesExceptions.map(t => `"${t}"`).join(' '));
    }

    let showAmuletExceptionsFilterText = '';
    if (this.filter.hideAmulets && this.filter.hideAmuletsBaseTypeExceptions.length > 0 && !this.filter.hideAmuletsBaseTypeExceptions.includes('None')) {
      showAmuletExceptionsFilterText = filterShowAmuletExceptions
        .replace('{baseTypes}', this.filter.hideAmuletsBaseTypeExceptions.map(t => `"${t}"`).join(' '));
    }

    let showRingExceptionsFilterText = '';
    if (this.filter.hideRings && this.filter.hideRingsBaseTypeExceptions.length > 0 && !this.filter.hideRingsBaseTypeExceptions.includes('None')) {
      showRingExceptionsFilterText = filterShowRingExceptions
        .replace('{baseTypes}', this.filter.hideRingsBaseTypeExceptions.map(t => `"${t}"`).join(' '));
    }

    let showBeltExceptionsFilterText = '';
    if (this.filter.hideBelts && this.filter.hideBeltsBaseTypeExceptions.length > 0 && !this.filter.hideBeltsBaseTypeExceptions.includes('None')) {
      showBeltExceptionsFilterText = filterShowBeltExceptions
        .replace('{baseTypes}', this.filter.hideBeltsBaseTypeExceptions.map(t => `"${t}"`).join(' '));
    }

    let hideCurrencyFilterText = '';
    if (this.filter.hideCurrency && this.filter.hideCurrencyTypes.length > 0 && !this.filter.hideCurrencyTypes.includes('None')) {
      hideCurrencyFilterText = filterHideCurrency
        .replace('{baseTypes}', this.filter.hideCurrencyTypes.map(t => `"${t}"`).join(' '));
    }

    const cosmeticRules = this.filter.cosmeticTopCurrencyAlertSounds || this.filter.cosmeticTopCurrencyLabels
      ? filterCosmeticTopCurrency
        .replaceAll('{fontSizePurple}', this.filter.cosmeticTopCurrencyLabels ? '\n  SetFontSize 45' : '')
        .replaceAll('{fontSizeBrown}', this.filter.cosmeticTopCurrencyLabels ? '\n  SetFontSize 40' : '')
        .replaceAll('{alertSoundPurple}', this.filter.cosmeticTopCurrencyAlertSounds ? '\n  PlayAlertSound 6 300' : '')
        .replaceAll('{alertSoundBrown}', this.filter.cosmeticTopCurrencyAlertSounds ? '\n  PlayAlertSound 2 300' : '')
      : '';

    const customRules = this.buildCustomRules();
    const customCosmeticRules = this.buildCustomCosmeticRules();

    this.filterText = filterTemplate
      // Flask and Charm Filters
      .replace('{filterShowLifeFlaskExceptions}', showLifeFlaskExceptionsFilterText)
      .replace('{filterHideLifeFlasks}', this.filter.hideLifeFlasks ? filterHideFlasks.replaceAll('{flaskType}', 'Life Flasks') : '')
      .replace('{filterShowManaFlaskExceptions}', showManaFlaskExceptionsFilterText)
      .replace('{filterHideManaFlasks}', this.filter.hideManaFlasks ? filterHideFlasks.replaceAll('{flaskType}', 'Mana Flasks') : '')
      .replace('{filterShowCharmExceptions}', showCharmExceptionsFilterText)
      .replace('{filterHideCharms}', this.filter.hideCharms ? filterHideCharms : '')

      // Currency Filters
      .replace('{filterHideScrolls}', this.filter.hideScrolls ? filterHideScrolls : '')
      .replace('{filterHighlightGold}', this.filter.hideGold && this.filter.hideGoldLowerThan ? filterHighlightGold.replaceAll('{whiteGoldLevel}', ((this.filter.hideGoldLowerThan || 1) * 20).toString()).replaceAll('{yellowGoldLevel}', ((this.filter.hideGoldLowerThan || 1) * 100).toString()) : '')
      .replace('{filterHideGold}', this.filter.hideGold ? filterHideGold.replace('{minGold}', (this.filter.hideGoldLowerThan || 10000).toString()): '')
      .replace('{filterHideCurrency}', hideCurrencyFilterText)
      .replace('{filterShowRuneExceptions}', showRuneExceptionsFilterText)
      .replace('{filterHideRunes}', this.filter.hideRunes ? filterHideRunes : '')

      // Jewellery Filters
      .replace('{filterShowAmuletExceptions}', showAmuletExceptionsFilterText)
      .replace('{filterHideAmulets}', this.filter.hideAmulets ? filterHideAmulets.replace('{itemRarity}', (this.filter.hideAmuletsOfRarity === RarityToHide.NormalAndMagic ? 'Magic' : 'Normal')) : '')
      .replace('{filterShowRingExceptions}', showRingExceptionsFilterText)
      .replace('{filterHideRings}', this.filter.hideRings ? filterHideRings.replace('{itemRarity}', (this.filter.hideRingsOfRarity === RarityToHide.NormalAndMagic ? 'Magic' : 'Normal')) : '')
      .replace('{filterShowBeltExceptions}', showBeltExceptionsFilterText)
      .replace('{filterHideBelts}', this.filter.hideBelts ? filterHideBelts.replace('{itemRarity}', (this.filter.hideBeltsOfRarity === RarityToHide.NormalAndMagic ? 'Magic' : 'Normal')) : '')

      // Highlights
      .replace('{filterHighlightUniques}', this.filter.highlightUniques ? filterHighlightUniques : '')
      .replace('{filterHighlightChanceBases}', this.filter.highlightChanceBases ? filterHighlightChanceBases : '')
      .replace('{filterHighlightRareJewellery}', this.filter.highlightRareJewellery ? filterHighlightRareJewellery : '')

      // Gear Filters
      .replace('{filterShowOneSocket}', this.filter.showSocketedItems && this.filter.showSocketedItemsType === SocketedItemType.All ? filterShowOneSocket : '')
      .replace('{filterShow2Sockets}', this.filter.showSocketedItems ? filterShow2Sockets : '')
      .replace('{filterShowQuality}', this.filter.showQualityItems ? filterShowQuality.replace('{minItemQuality}', this.filter.showQualityItemsType === QualityItemType.All ? '1' : '10') : '')
      .replace('{filterPreferredWeaponTypes}', weaponFilterText)
      .replace('{filterPreferredArmourTypes}', armourFilterText)
      .replace('{filterHideNormalAndMagicGear}', this.filter.hideNormalAndMagicItems ? filterHideNormalAndMagicGear.replace('{itemRarity}', (this.filter.hideNormalAndMagicItemsOfRarity === WeaponsAndArmourRarityToHide.NormalMagicRare ? 'Rare' : this.filter.hideNormalAndMagicItemsOfRarity === WeaponsAndArmourRarityToHide.NormalAndMagic ? 'Magic' : 'Normal')) : '')
      .replace('{filterHideRareGearBelowAdvanced}', this.filter.hideNormalAndMagicItems && this.filter.hideNormalAndMagicItemsOfRarity === WeaponsAndArmourRarityToHide.NormalMagicRareBelowAdvanced ? filterHideRareGearBelowAdvanced : '')
      .replace('{filterHideRareGearBelowExpert}', this.filter.hideNormalAndMagicItems && this.filter.hideNormalAndMagicItemsOfRarity === WeaponsAndArmourRarityToHide.NormalMagicRareBelowExpert ? filterHideRareGearBelowExpert : '')

      // Dynamic Filters
      .replace('{filterStaticWaystones}', this.filter.dynamicWaystones ? '' : filterStaticWaystones)
      .replace('{filterDynamicWaystones}', this.filter.dynamicWaystones ? dynamicWaystoneFilterText : '')
      .replace('{filterDynamicSkillGems}', this.filter.dynamicSkillGems ? dynamicSkillGemFilterText : '')

      // Cosmetic Filters
      .replace('{filterCosmeticTopCurrency}', cosmeticRules)

    if (this.filter.cosmeticRemoveAllHighlights) {
      this.filterText = this.filterText.replace(/\n\s{2}PlayEffect.*$/gm, '');
    }

    if (this.filter.cosmeticRemoveAllMinimapIcons) {
      this.filterText = this.filterText.replace(/\n\s{2}MinimapIcon.*$/gm, '');
    }

    // Custom and Free Rules -- these must come after optionally removing all highlights and minimap icons
    this.filterText = this.filterText.replace('{filterFreeRulesTop}', this.filter.freeRulesTop ? this.filter.freeRulesTop : '')
      .replace('{filterFreeRulesBottom}', this.filter.freeRulesBottom ? this.filter.freeRulesBottom : '')
      .replace('{filterCustomRules}', customRules)
      .replace('{filterCustomCosmeticRules}', customCosmeticRules)
      // Cleanup
      .replaceAll(/(?:\r?\n){2,}/g, '\n\n');

    const filterConfig = JSON.stringify(this.filter);
    const filterConfigIndented = JSON.stringify(this.filter, null, 2);

    this.filterTextFull = filterPrefix + this.filterText + filterSuffix
      .replace('{version}', this.filterVersion)
      .replace('{date}', new Date().toISOString())
      .replace('{filterConfig}', filterConfigIndented.replaceAll('\n', '\n# '));

    localStorage.setItem(LOCAL_STORAGE_KEY, filterConfig);
    localStorage.setItem(LOCAL_STORAGE_KEY_FILTER_STORED, '1');
  }

  buildCustomRules() {
    return this.filter.customRules
      .filter(r => r.active)
      .filter(r => !this.isEmptyRule(r))
      .map(r => this.formatRule(r)).join('\n');
  }

  buildCustomCosmeticRules() {
    return this.filter.customCosmeticRules
      .filter(r => r.active)
      .filter(r => !this.isEmptyRule(r))
      .map(r => this.formatRule(r)).join('\n');
  }

  isEmptyRule(rule: CustomRule) {
    const emptyType = rule.itemType === 'All' && rule.itemClass === 'All' && (rule.baseTypes.length === 0 || rule.baseTypes.includes('All'));
    const noEffect = rule.displayType === DisplayType.Show && rule.cosmeticOptions && !rule.cosmeticOptions?.minimapIcon && !rule.cosmeticOptions?.playEffect && !rule.cosmeticOptions?.labelStyle;
    return emptyType || noEffect;
  }

  formatRule(rule: CustomRule): any {
    const itemData = this.itemData.find(i => i.itemType === rule.itemType);
    const searchName = itemData?.currencySearchName;
    const showHide = rule.displayType === DisplayType.Hide ? 'Hide' : 'Show';
    const itemClass = rule.itemClass === 'All' ? '' : `\n  Class == "${rule.itemClass}"`;
    const baseTypes = rule.baseTypes.length === 0 || rule.baseTypes.includes('All') ? rule.itemType === 'Currency' ? '' : rule.itemClass === 'Stackable Currency' ? `\n  BaseType "${searchName}"` : '' : `\n  BaseType == ${rule.baseTypes.map(t => `"${t}"`).join(' ')}`;
    const rarity = this.currencyItemTypes.includes(rule.itemType) ? '' : `\n  Rarity ${rule.rarityComparator} "${rule.rarity}"`;
    const highlight = rule.displayType === DisplayType.Hide || rule.displayType === DisplayType.Show ? ''
      : `
  PlayEffect ${rule.displayType}
  MinimapIcon 2 ${rule.displayType} Pentagon`

    const customBeam = !rule.cosmeticOptions?.playEffect ? ''
      : `
  PlayEffect ${rule.cosmeticOptions?.playEffectColor} ${rule.cosmeticOptions?.playEffectTemp ? 'Temp' : ''}`;

    const customMapIcon = !rule.cosmeticOptions?.minimapIcon ? ''
      : `
  MinimapIcon ${rule.cosmeticOptions?.minimapIconSize} ${rule.cosmeticOptions?.minimapIconColor} ${rule.cosmeticOptions?.minimapIconShape}`;

    const textColor = rule.cosmeticOptions?.textColor ? '\n  SetTextColor ' + this.formatColor(rule.cosmeticOptions?.textColor) : '';
    const backgroundColor = rule.cosmeticOptions?.backgroundColor ? '\n  SetBackgroundColor ' + this.formatColor(rule.cosmeticOptions?.backgroundColor) : '';
    const borderColor = rule.cosmeticOptions?.borderColor ? '\n  SetBorderColor ' + this.formatColor(rule.cosmeticOptions?.borderColor) : '';
    const fontSize = rule.cosmeticOptions?.fontSize ? '\n  SetFontSize ' + rule.cosmeticOptions?.fontSize : '';
    const customLabel = !rule.cosmeticOptions?.labelStyle ? '' : textColor + backgroundColor + borderColor + fontSize;

    return `
${showHide}${itemClass}${baseTypes}${rarity}${highlight}${customBeam}${customMapIcon}${customLabel}` + (rule.continue ? '\n  Continue' : '');
  }

  formatColor(rgbaColor: string) {
    const color = rgbaColor.replace('rgba(', '').replace('rgb(', '').replace(')', '').split(',').map((c, index) => index === 3 ? parseFloat(c) : parseInt(c));
    const alpha = color.length === 4 ? Math.round(color[3] * 255) : 255;
    return `${color[0]} ${color[1]} ${color[2]} ${alpha}`;
  }

  formatAllWeaponTypes() {
    return Object.values(WeaponType).filter((value) => value !== WeaponType.All).map(w => `"${w}"`).join(' ');
  }

  formatAllArmourTypesButShields() {
    return [ArmourType.BodyArmours, ArmourType.Helmet, ArmourType.Gloves, ArmourType.Boots].map(w => `"${w}"`).join(' ');
  }

  formatAllArmourTypes() {
    return [ArmourType.BodyArmours, ArmourType.Helmet, ArmourType.Gloves, ArmourType.Boots, ArmourType.Shields].map(w => `"${w}"`).join(' ');
  }

  buildDynamicWaystoneFilter() {
    const currLevel = this.filter.dynamicWaystonesLevel || 1;

    const showFrom = currLevel - 3;
    const highlightTiers = [
      { level: Math.min(currLevel + 3, 16), color: 'Brown' },
      { level: Math.min(currLevel + 1, 15), color: 'Orange' },
      { level: Math.min(currLevel, 14), color: 'Yellow' },
      { level: Math.min(currLevel - 1, 13), color: 'White' },
    ];

    this.dynamicWaystoneThresholds = [
      { style: 'tier-hidden', level: showFrom > 1 ? '< ' + showFrom.toString() : '🞪' },
      { style: 'tier-shown', level: currLevel > 2 ? '≥ ' + Math.max(showFrom, 1) : '🞪' },
      { style: 'tier-white', level: highlightTiers[3].level >= 1 ? '≥ ' + highlightTiers[3].level : '🞪' },
      { style: 'tier-yellow', level: highlightTiers[2].level >= 1 ? '≥ ' + highlightTiers[2].level : '🞪' },
      { style: 'tier-orange', level: highlightTiers[1].level >= 1 ? '≥ ' + highlightTiers[1].level : '🞪' },
      { style: 'tier-brown', level: highlightTiers[0].level >= 1 ? '≥ ' + highlightTiers[0].level : '🞪' },
    ];

    let text = '';

    for (let threshold of highlightTiers) {
      if (threshold.level >= 1) {
        text += filterHighlightWaystone.replace('{tier}', Math.max(threshold.level, 1).toString()).replaceAll('{color}', threshold.color) + '\n';
      }
    }

    if (currLevel > 2) {
      text += filterShowWaystone.replace('{tier}', Math.max(showFrom, 1).toString()) + '\n';
    }

    if (showFrom > 1) {
      text += filterHideWaystone.replace('{tier}', showFrom.toString()) + '\n';
    }

    return text.trimEnd();
  }

  buildDynamicSkillGemFilter() {
    const level = this.filter.dynamicSkillGemsLevel || 1;
    const supportLevel = level <= 12 ? 1 : level <= 14 ? 2 : level <= 16 ? 3 : 4

    this.dynamicSkillGemThresholds = [
      { style: 'tier-hidden', level: level > 1 ? '< ' + level.toString() : '🞪' },
      { style: 'tier-white', level: level.toString() },
      { style: 'tier-yellow', level: '> ' + level.toString() },
    ];

    this.dynamicSupportGemThresholds = [
      { style: 'tier-hidden', level: supportLevel === 2 ? '1' : supportLevel > 1 && supportLevel < 4 ? '< ' + supportLevel : '🞪' },
      { style: 'tier-white', level: supportLevel === 4 ? '🞪' : supportLevel.toString() },
      { style: 'tier-yellow', level: supportLevel >= 3 ? '🞪' : supportLevel === 2 ? '3' : '> ' + supportLevel.toString() },
    ];

    let skillGemHighlightYellowText = filterHighlightGem
      .replace('{type}', '"Skill Gem" "Spirit Gem"')
      .replace('{level}', '> ' + level)
      .replaceAll('{color}', 'Yellow');

    let skillGemHighlightWhiteText = filterHighlightGem
      .replace('{type}', '"Skill Gem" "Spirit Gem"')
      .replace('{level}', '== ' + level)
      .replaceAll('{color}', 'White');

    let skillGemHideText = filterHideGem
      .replace('{type}', '"Skill Gem" "Spirit Gem"')
      .replace('{level}', '< ' + level);

    let supportGemHighlightYellowText = filterHighlightGem
      .replace('{type}', '"Support Gem"')
      .replace('{level}', '> ' + supportLevel)
      .replaceAll('{color}', 'Yellow');

    let supportGemHighlightWhiteText = filterHighlightGem
      .replace('{type}', '"Support Gem"')
      .replace('{level}', '== ' + supportLevel)
      .replaceAll('{color}', 'White');

    let supportGemHideText = supportLevel === 1 ? '' : filterHideGem
      .replace('{type}', '"Support Gem"')
      .replace('{level}', '< ' + supportLevel);

    return skillGemHighlightYellowText + '\n' + skillGemHighlightWhiteText + '\n' + skillGemHideText
      + '\n' + supportGemHighlightYellowText + '\n' + supportGemHighlightWhiteText + '\n' + supportGemHideText
  }

  formatDefenceType(defenceType: DefenceType) {
    if (defenceType === DefenceType.All) {
      return '';
    } else if (defenceType === DefenceType.Armour) {
      return '\n  BaseArmour > 0\n  BaseEnergyShield == 0\n  BaseEvasion == 0';
    } else if (defenceType === DefenceType.ArmourEnergyShield) {
      return '\n  BaseArmour > 0\n  BaseEnergyShield > 0\n  BaseEvasion == 0';
    } else if (defenceType === DefenceType.ArmourEvasion) {
      return '\n  BaseArmour > 0\n  BaseEnergyShield == 0\n  BaseEvasion > 0';
    } else if (defenceType === DefenceType.EnergyShield) {
      return '\n  BaseArmour == 0\n  BaseEnergyShield > 0\n  BaseEvasion == 0';
    } else if (defenceType === DefenceType.Evasion) {
      return '\n  BaseArmour == 0\n  BaseEnergyShield == 0\n  BaseEvasion > 0';
    } else if (defenceType === DefenceType.EvasionEnergyShield) {
      return '\n  BaseArmour == 0\n  BaseEnergyShield > 0\n  BaseEvasion > 0';
    }
    return '';
  }

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

  download() {
    this.downloadTextAsFile(this.filterTextFull, 'poe2filter.filter');
  }

  downloadTextAsFile(text: string, filename: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.filterTextFull);
    this.copyText = 'Copied!';
    setTimeout(() => this.copyText = 'Copy to Clipboard', 1000);
  }

  clear() {
    if (confirm("Are you sure you want to reset your filter to the defaults? This cannot be undone.")) {
      this.filter = new Filter();
      this.updateFilter();
    };
  }

  import() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.filter';
    input.style.display = 'none'; // Hide the input element
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target!.result as string;
            const versionMatch = content.match(/# Version: (\d+)/);
            const dateMatch = content.match(/# Export date: (.+)/);
            const configMatch = content.match(/# \[\[Config Start\]\]\n# (.+)\n# \[\[Config End\]\]/s);

            if (versionMatch && dateMatch && configMatch) {
              this.importFilterExportVersion = versionMatch[1];
              this.importFilterExportDate = dateMatch[1];
              const config = configMatch[1].replace(/^# /gm, '');

              try {
                this.filter = JSON.parse(config);
                try {
                  this.migrateFilter();
                  this.importFilterSuccess = true;
                  this.updateFilter();
                } catch (error: any) {
                  this.importFilterError = 'Error migrating filter: ' + error;
                }
              } catch (error: any) {
                this.importFilterError = error;
              }
            } else {
              this.importFilterError = 'Missing version, date, or filter configuration in the imported file.';
            }
          } catch (error: any) {
            this.importFilterError = error;
          } finally {
            document.body.removeChild(input); // Remove the input element
          }
        };
        reader.readAsText(file);
      } else {
        document.body.removeChild(input); // Remove the input element if no file is selected
      }
    };
    document.body.appendChild(input); // Append the input element to the body
    input.click();
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

  hideTierWarning() {
    this.showTierWarning = false;
    localStorage.setItem(LOCAL_STORAGE_KEY_HIDE_TIER_WARNING, '1');
  }
}
