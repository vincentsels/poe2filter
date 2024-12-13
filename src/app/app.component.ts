import { Component, OnInit } from '@angular/core';
import { Filter, FlaskType, JewelleryRarity, QualityItemType, SocketedItemType, WeaponFilter, WeaponTier, WeaponType } from './filter';
import { filterHideFlasks, filterHideNormalAndMagicItems, filterHideLowJewellery, filterHideScrolls, filterShow2Sockets, filterShowOneSocket, filterShowUltimateLifeFlasks, filterShowUnique, filterTemplate, filterShowQuality, filterPreferredWeaponType, filterPreferredBodyArmour, filterPreferredHelmet, filterPreferredGloves, filterPreferredBoots, filterHideGold } from './filter-template';
import { FormsModule } from '@angular/forms';

const LOCAL_STORAGE_KEY = 'filter-v4';

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
  JewelleryRarity = JewelleryRarity;
  SocketedItemType = SocketedItemType;
  QualityItemType = QualityItemType;
  WeaponType = WeaponType;
  WeaponTier = WeaponTier;

  ngOnInit(): void {
    const filterFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (filterFromStorage) this.filter = JSON.parse(filterFromStorage) as Filter;
    this.updateFilter();
  }

  toggleHideFlasks = () => { this.filter.hideFlasks = !this.filter.hideFlasks; this.updateFilter(); }
  toggleHideScrolls = () => { this.filter.hideScrolls = !this.filter.hideScrolls; this.updateFilter(); }
  toggleHideJewellery = () => { this.filter.hideJewellery = !this.filter.hideJewellery; this.updateFilter(); }
  toggleHideNormalAndMagicItems = () => { this.filter.hideNormalAndMagicItems = !this.filter.hideNormalAndMagicItems; this.updateFilter(); }
  toggleHideGold = () => { this.filter.hideGold = !this.filter.hideGold; this.updateFilter(); }
  toggleShowUniques = () => { this.filter.showUniques = !this.filter.showUniques; this.updateFilter(); }
  toggleShowSocketedItems = () => { this.filter.showSocketedItems = !this.filter.showSocketedItems; this.updateFilter(); }
  toggleShowQualityItems = () => { this.filter.showQualityItems = !this.filter.showQualityItems; this.updateFilter(); }
  toggleShowUltimateLifeFlasks = () => { this.filter.showUltimateLifeFlasks = !this.filter.showUltimateLifeFlasks; this.updateFilter(); }

  removeWeaponType(index: number) { this.filter.weaponFilters.splice(index, 1); this.updateFilter();  }
  toggleShowWeapon = (index: number) => { this.filter.weaponFilters[index].show = !this.filter.weaponFilters[index].show; this.updateFilter(); }
  addWeaponType = () => { this.filter.weaponFilters.push(new WeaponFilter()); this.updateFilter(); }

  toggleShowBodyArmour = () => { this.filter.showBodyArmour = !this.filter.showBodyArmour; this.updateFilter(); }
  toggleShowHelmet = () => { this.filter.showHelmet = !this.filter.showHelmet; this.updateFilter(); }
  toggleShowGloves = () => { this.filter.showGloves = !this.filter.showGloves; this.updateFilter(); }
  toggleShowBoots = () => { this.filter.showBoots = !this.filter.showBoots; this.updateFilter(); }

  updateFilter() {
    const weaponFilterText = this.filter.weaponFilters.filter(w => w.show).map(w => filterPreferredWeaponType
      .replaceAll('{weaponType}', w.weaponType)
      .replaceAll('{tierType}', w.weaponTier === WeaponTier.ExpertOnly ? '\n  BaseType "Expert "' : w.weaponTier === WeaponTier.AdvancedAndExpert ? '\n  BaseType "Expert " "Advanced "' : '')
    ).join('\n');

    const bodyArmourFilterText =
      this.filter.showBodyArmour && (this.filter.showBodyArmourArm || this.filter.showBodyArmourEs || this.filter.showBodyArmourEva)
      ? filterPreferredBodyArmour.replace('{defences}', this.formatDefences(this.filter.showBodyArmourArm, this.filter.showBodyArmourEs, this.filter.showBodyArmourEva)) : '';

    const helmetFilterText =
      this.filter.showHelmet && (this.filter.showHelmetArm || this.filter.showHelmetEs || this.filter.showHelmetEva)
      ? filterPreferredHelmet.replace('{defences}', this.formatDefences(this.filter.showHelmetArm, this.filter.showHelmetEs, this.filter.showHelmetEva)) : '';

    const glovesFilterText =
      this.filter.showGloves && (this.filter.showGlovesArm || this.filter.showGlovesEs || this.filter.showGlovesEva)
      ? filterPreferredGloves.replace('{defences}', this.formatDefences(this.filter.showGlovesArm, this.filter.showGlovesEs, this.filter.showGlovesEva)) : '';

    const bootsFilterText =
      this.filter.showBoots && (this.filter.showBootsArm || this.filter.showBootsEs || this.filter.showBootsEva)
      ? filterPreferredBoots.replace('{defences}', this.formatDefences(this.filter.showBootsArm, this.filter.showBootsEs, this.filter.showBootsEva)) : '';

    this.filterText = filterTemplate
      .replace('{filterHideFlasks}', this.filter.hideFlasks ? filterHideFlasks : '')
      .replace('{filterHideScrolls}', this.filter.hideScrolls ? filterHideScrolls : '')
      .replace('{filterHideLowJewellery}', this.filter.hideJewellery ? filterHideLowJewellery.replace('{jewelleryRarity}', (this.filter.hideJewelleryOfRarity === JewelleryRarity.NormalAndMagic ? 'Magic' : 'Normal')): '')
      .replace('{filterHideNormalAndMagicItems}', this.filter.hideNormalAndMagicItems ? filterHideNormalAndMagicItems : '')
      .replace('{filterHideGold}', this.filter.hideGold ? filterHideGold.replace('{minGold}', (this.filter.hideGoldLowerThan || 50).toString()): '')
      .replace('{filterShowUnique}', this.filter.showUniques ? filterShowUnique : '')
      .replace('{filterShowOneSocket}', this.filter.showSocketedItems && this.filter.showSocketedItemsType === SocketedItemType.All ? filterShowOneSocket : '')
      .replace('{filterShow2Sockets}', this.filter.showSocketedItems ? filterShow2Sockets : '')
      .replace('{filterShowQuality}', this.filter.showQualityItems ? filterShowQuality.replace('{minItemQuality}', this.filter.showQualityItemsType === QualityItemType.All ? '1' : '10') : '')
      .replace('{filterShowUltimateLifeFlasks}', this.filter.showUltimateLifeFlasks ? filterShowUltimateLifeFlasks.replace('{minFlaskQuality}', (this.filter.showUltimateLifeFlasksMinQuality || 10).toString()): '')
      .replace('{filterPreferredWeaponTypes}', weaponFilterText)
      .replace('{filterPreferredBodyArmour}', bodyArmourFilterText)
      .replace('{filterPreferredHelmet}', helmetFilterText)
      .replace('{filterPreferredGloves}', glovesFilterText)
      .replace('{filterPreferredBoots}', bootsFilterText);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.filter));
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

  clear() {
    this.filter = new Filter();
    this.updateFilter();
  }
}
