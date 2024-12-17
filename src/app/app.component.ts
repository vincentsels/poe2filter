import { Component, OnInit } from '@angular/core';
import { Filter, FlaskType, RarityToHide, QualityItemType, SocketedItemType, WeaponFilter, BaseTypeTier, WeaponType, MinimumRarity, ArmourType } from './filter';
import { filterHideFlasks, filterHideNormalAndMagicItems, filterHideJewellery, filterHideScrolls, filterShow2Sockets, filterShowOneSocket, filterShowUltimateLifeFlasks, filterHighlightUniques, filterTemplate, filterShowQuality, filterPreferredWeaponType, filterPreferredBodyArmour, filterPreferredHelmet, filterPreferredGloves, filterPreferredBoots, filterHideGold, filterHighlightRareJewellery, filterHighlightSkillGems, filterHideRunes, filterHideCommonCharms, filterStaticWaystones, filterHideWaystone, filterHighlightWaystone, filterShowWaystone, filterHighlightGold, filterHideCommonCurrency, filterShowCommonCurrency, filterHighlightCommonCurrency, filterPreferredArmourType, filterRarePlayEffect } from './filter-template';
import { FormsModule } from '@angular/forms';

const LOCAL_STORAGE_KEY = 'filter-v6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule]
})
export class AppComponent implements OnInit {
  filter = new Filter();
  filterText = filterTemplate;

  FlaskType = FlaskType;
  RarityToHide = RarityToHide;
  SocketedItemType = SocketedItemType;
  QualityItemType = QualityItemType;
  WeaponType = WeaponType;
  WeaponTier = BaseTypeTier;
  ArmourType = ArmourType;
  Rarity = MinimumRarity;

  copyText = 'Copy to Clipboard';

  dynamicWaystoneThresholds = [
    { style: 'tier-hidden', level: '' },
    { style: 'tier-shown', level: '' },
    { style: 'tier-white', level: '' },
    { style: 'tier-yellow', level: '' },
    { style: 'tier-orange', level: '' },
    { style: 'tier-brown', level: '' },
  ];

  ngOnInit(): void {
    const filterFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (filterFromStorage) this.filter = JSON.parse(filterFromStorage) as Filter;
    this.updateFilter();
  }

  toggleHideFlasks = () => { this.filter.hideFlasks = !this.filter.hideFlasks; this.updateFilter(); }
  toggleHideScrolls = () => { this.filter.hideScrolls = !this.filter.hideScrolls; this.updateFilter(); }
  toggleHideJewellery = () => { this.filter.hideJewellery = !this.filter.hideJewellery; this.updateFilter(); }
  toggleHideNormalAndMagicItems = () => { this.filter.hideNormalAndMagicItems = !this.filter.hideNormalAndMagicItems; this.updateFilter(); }
  toggleHideCommonCharms = () => { this.filter.hideCommonCharms = !this.filter.hideCommonCharms; this.updateFilter(); }
  toggleHideRunes = () => { this.filter.hideRunes = !this.filter.hideRunes; this.updateFilter(); }
  toggleHideCommonCurrency = () => { this.filter.hideCommonCurrency = !this.filter.hideCommonCurrency; this.updateFilter(); }

  toggleHideGold = () => {
    this.filter.hideGold = !this.filter.hideGold;
    if (this.filter.hideGold && !this.filter.hideGoldLowerThan) {
      this.filter.hideGoldLowerThan = 50;
    }
    this.updateFilter();
  }

  toggleShowSocketedItems = () => { this.filter.showSocketedItems = !this.filter.showSocketedItems; this.updateFilter(); }
  toggleShowQualityItems = () => { this.filter.showQualityItems = !this.filter.showQualityItems; this.updateFilter(); }

  toggleShowUltimateLifeFlasks = () => {
    this.filter.showUltimateLifeFlasks = !this.filter.showUltimateLifeFlasks;
    if (this.filter.showUltimateLifeFlasks && !this.filter.showUltimateLifeFlasksMinQuality) {
      this.filter.showUltimateLifeFlasksMinQuality = 10;
    }
    this.updateFilter();
  }

  toggleHighLightUniques = () => { this.filter.highlightUniques = !this.filter.highlightUniques; this.updateFilter(); }
  toggleHighLightRareJewellery = () => { this.filter.highlightRareJewellery = !this.filter.highlightRareJewellery; this.updateFilter(); }

  toggleHighlightSkillGems = () => {
    this.filter.highlightSkillGems = !this.filter.highlightSkillGems;
    if (this.filter.highlightSkillGems && !this.filter.highlightSkillGemsLevel) {
      this.filter.highlightSkillGemsLevel = 15;
    }
    this.updateFilter();
  }

  removeWeaponType(index: number) { this.filter.weaponFilters.splice(index, 1); this.updateFilter();  }
  toggleShowWeapon = (index: number) => { this.filter.weaponFilters[index].show = !this.filter.weaponFilters[index].show; this.updateFilter(); }
  addWeaponType = () => { this.filter.weaponFilters.push(new WeaponFilter()); this.updateFilter(); }

  toggleShowBodyArmour = () => { this.filter.showBodyArmour = !this.filter.showBodyArmour; this.updateFilter(); }
  toggleShowHelmet = () => { this.filter.showHelmet = !this.filter.showHelmet; this.updateFilter(); }
  toggleShowGloves = () => { this.filter.showGloves = !this.filter.showGloves; this.updateFilter(); }
  toggleShowBoots = () => { this.filter.showBoots = !this.filter.showBoots; this.updateFilter(); }

  toggleDynamicWaystones = () => {
    this.filter.dynamicWaystones = !this.filter.dynamicWaystones;
    if (this.filter.dynamicWaystones && !this.filter.dynamicWaystonesLevel) {
      this.filter.dynamicWaystonesLevel = 1;
    }
    this.updateFilter();
  }

  updateFilter() {
    const weaponFilterText = this.filter.weaponFilters.filter(w => w.show).map(w => filterPreferredWeaponType
      .replaceAll('{weaponType}', w.weaponType == WeaponType.All ? this.formatAllWeaponTypes() : `"${w.weaponType}"`)
      .replaceAll('{tierType}', w.baseTypeTier === BaseTypeTier.ExpertOnly ? '\n  BaseType "Expert "' : w.baseTypeTier === BaseTypeTier.AdvancedAndExpert ? '\n  BaseType "Expert " "Advanced "' : '')
      .replaceAll('{rarity}', (w.rarity === MinimumRarity.Magic ? 'Magic' : 'Normal Magic'))
      .replace('{rarePlayEffect}', (w.weaponType === WeaponType.All ? '\n' : '\n' + filterRarePlayEffect))
    ).join('\n');

    const armourFilterText = this.filter.armourFilters.filter(w => w.show).map(w => filterPreferredArmourType
      .replaceAll('{armourType}', w.armourType == ArmourType.All ? this.formatAllArmourTypes() : `"${w.armourType}"`)
      .replaceAll('{tierType}', w.baseTypeTier === BaseTypeTier.ExpertOnly ? '\n  BaseType "Expert "' : w.baseTypeTier === BaseTypeTier.AdvancedAndExpert ? '\n  BaseType "Expert " "Advanced "' : '')
      .replaceAll('{rarity}', (w.rarity === MinimumRarity.Magic ? 'Magic' : 'Normal Magic'))
      .replaceAll('{defenceType}', this.formatDefenceType(w.armour, w.evasion, w.energyShield))
      .replace('{rarePlayEffect}', (w.armourType === ArmourType.All ? '\n' : '\n' + filterRarePlayEffect))
    ).join('\n');

    const dynamicWaystoneFilterText = this.buildDynamicWaystoneFilter();

    this.filterText = filterTemplate
      .replace('{filterHideFlasks}', this.filter.hideFlasks ? filterHideFlasks : '')
      .replace('{filterHideScrolls}', this.filter.hideScrolls ? filterHideScrolls : '')
      .replace('{filterHideJewellery}', this.filter.hideJewellery ? filterHideJewellery.replace('{itemRarity}', (this.filter.hideJewelleryOfRarity === RarityToHide.NormalAndMagic ? 'Magic' : 'Normal')) : '')
      .replace('{filterHideNormalAndMagicItems}', this.filter.hideNormalAndMagicItems ? filterHideNormalAndMagicItems.replace('{itemRarity}', (this.filter.hideNormalAndMagicItemsOfRarity === RarityToHide.NormalAndMagic ? 'Magic' : 'Normal')) : '')
      .replace('{filterHideGold}', this.filter.hideGold ? filterHideGold.replace('{minGold}', (this.filter.hideGoldLowerThan || 10000).toString()): '')
      .replace('{filterHideCommonCharms}', this.filter.hideCommonCharms ? filterHideCommonCharms : '')
      .replace('{filterHideRunes}', this.filter.hideRunes ? filterHideRunes : '')
      .replace('{filterHideCommonCurrency}', this.filter.hideCommonCurrency ? filterHideCommonCurrency : '')
      .replace('{filterShowCommonCurrency}', this.filter.hideCommonCurrency ? filterShowCommonCurrency : filterHighlightCommonCurrency)
      .replace('{filterShowOneSocket}', this.filter.showSocketedItems && this.filter.showSocketedItemsType === SocketedItemType.All ? filterShowOneSocket : '')
      .replace('{filterShow2Sockets}', this.filter.showSocketedItems ? filterShow2Sockets : '')
      .replace('{filterShowQuality}', this.filter.showQualityItems ? filterShowQuality.replace('{minItemQuality}', this.filter.showQualityItemsType === QualityItemType.All ? '1' : '10') : '')
      .replace('{filterShowUltimateLifeFlasks}', this.filter.showUltimateLifeFlasks ? filterShowUltimateLifeFlasks.replace('{minFlaskQuality}', (this.filter.showUltimateLifeFlasksMinQuality || 0).toString()) : '')
      .replace('{filterHighlightUniques}', this.filter.highlightUniques ? filterHighlightUniques : '')
      .replace('{filterHighlightRareJewellery}', this.filter.highlightRareJewellery ? filterHighlightRareJewellery : '')
      .replace('{filterHighlightSkillGems}', this.filter.highlightSkillGems ? filterHighlightSkillGems.replaceAll('{skillGemLevel}', (this.filter.highlightSkillGemsLevel || 1).toString()) : '')
      .replace('{filterHighlightGold}', this.filter.hideGold && this.filter.hideGoldLowerThan ? filterHighlightGold.replaceAll('{whiteGoldLevel}', ((this.filter.hideGoldLowerThan || 1) * 20).toString()).replaceAll('{yellowGoldLevel}', ((this.filter.hideGoldLowerThan || 1) * 100).toString()) : '')
      .replace('{filterPreferredWeaponTypes}', weaponFilterText)
      .replace('{filterPreferredArmourTypes}', armourFilterText)
      .replace('{filterStaticWaystones}', this.filter.dynamicWaystones ? '' : filterStaticWaystones)
      .replace('{filterDynamicWaystones}', this.filter.dynamicWaystones ? dynamicWaystoneFilterText : '')
      ;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.filter));
  }

  formatAllWeaponTypes() {
    return Object.values(WeaponType).filter((value) => value !== WeaponType.All).map(w => `"${w}"`).join(' ');
  }

  formatAllArmourTypes() {
    return Object.values(ArmourType).filter((value) => value !== ArmourType.All).map(w => `"${w}"`).join(' ');
  }

  buildDynamicWaystoneFilter() {
    const currLevel = this.filter.dynamicWaystonesLevel || 1;

    const showFrom = currLevel - (3 + Math.floor(currLevel / 4));
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

  formatDefenceType(armour: boolean, evasion: boolean, energyShield: boolean) {
    let defences = '';
    if (armour) defences += '  BaseArmour > 0\n';
    if (!armour) defences += '  BaseArmour == 0\n';
    if (evasion) defences += '  BaseEvasion > 0\n';
    if (!evasion) defences += '  BaseEvasion == 0\n';
    if (energyShield) defences += '  BaseEnergyShield > 0\n';
    if (!energyShield) defences += '  BaseEnergyShield == 0\n';
    return defences.trimEnd();
  }

  formatDefences(arm: number | null, es: number | null, eva: number | null): string {
    let defences = '';
    if (arm) defences += '  BaseArmour >= ' + arm + '\n';
    if (es) defences += '  BaseEnergyShield >= ' + es + '\n';
    if (eva) defences += '  BaseEvasion >= ' + eva + '\n';
    return defences.trimEnd();
  }

  download() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.filterText));
    element.setAttribute('download', 'poe2filter.filter');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.filterText);
    this.copyText = 'Copied!';
    setTimeout(() => this.copyText = 'Copy to Clipboard', 1000);
  }

  clear() {
    if (confirm("Are you sure you want to reset your filter to the defaults? This cannot be undone.")) {
      this.filter = new Filter();
      this.updateFilter();
    };
  }
}
