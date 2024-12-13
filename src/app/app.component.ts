import { Component, OnInit } from '@angular/core';
import { Filter, FlaskType, QualityItemType, SocketedItemType, WeaponFilter, WeaponTier, WeaponType } from './filter';
import { filterHideFlasks, filterHideNormalAndRareItems, filterHideLowJewellery, filterHideScrolls, filterShow2Sockets, filterShowRareJewellery, filterShowOneSocket, filterShowUltimateLifeFlasks, filterShowUnique, filterTemplate, filterShowQuality, filterPreferredWeaponType } from './filter-template';
import { FormsModule } from '@angular/forms';

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
  SocketedItemType = SocketedItemType;
  QualityItemType = QualityItemType;
  WeaponType = WeaponType;
  WeaponTier = WeaponTier;

  ngOnInit(): void {
    this.updateFilter();
  }

  toggleHideFlasks = () => { this.filter.hideFlasks = !this.filter.hideFlasks; this.updateFilter(); }
  toggleHideScrolls = () => { this.filter.hideScrolls = !this.filter.hideScrolls; this.updateFilter(); }
  toggleHideJewellery = () => { this.filter.hideJewellery = !this.filter.hideJewellery; this.updateFilter(); }
  toggleHideNormalAndRareItems = () => { this.filter.hideNormalAndRareItems = !this.filter.hideNormalAndRareItems; this.updateFilter(); }
  toggleShowUniques = () => { this.filter.showUniques = !this.filter.showUniques; this.updateFilter(); }
  toggleShowRareJewellery = () => { this.filter.showRareJewellery = !this.filter.showRareJewellery; this.updateFilter(); }
  toggleShowSocketedItems = () => { this.filter.showSocketedItems = !this.filter.showSocketedItems; this.updateFilter(); }
  toggleShowQualityItems = () => { this.filter.showQualityItems = !this.filter.showQualityItems; this.updateFilter(); }
  toggleShowUltimateLifeFlasks = () => { this.filter.showUltimateLifeFlasks = !this.filter.showUltimateLifeFlasks; this.updateFilter(); }

  removeWeaponType(index: number) { this.filter.weaponFilters.splice(index, 1); this.updateFilter();  }
  toggleShowWeapon = (index: number) => { this.filter.weaponFilters[index].show = !this.filter.weaponFilters[index].show; this.updateFilter(); }
  addWeaponType = () => { this.filter.weaponFilters.push(new WeaponFilter()); this.updateFilter(); }

  updateFilter() {
    const weaponFilterText = this.filter.weaponFilters.filter(w => w.show).map(w => filterPreferredWeaponType
      .replaceAll('{weaponType}', w.weaponType)
      .replaceAll('{tierType}', w.weaponTier === WeaponTier.ExpertOnly ? '\n  BaseType "Expert "' : w.weaponTier === WeaponTier.AdvancedAndExpert ? '\n  BaseType "Expert " "Advanced "' : '')
    ).join(`
`);

    this.filterText = filterTemplate
      .replace('{filterHideFlasks}', this.filter.hideFlasks ? filterHideFlasks : '')
      .replace('{filterHideScrolls}', this.filter.hideScrolls ? filterHideScrolls : '')
      .replace('{filterHideLowJewellery}', this.filter.hideJewellery ? filterHideLowJewellery.replace('{minRareJewelleryLevel}', (this.filter.hideJewelleryLowerThan || 60).toString()): '')
      .replace('{filterHideNormalAndRareItems}', this.filter.hideNormalAndRareItems ? filterHideNormalAndRareItems : '')
      .replace('{filterShowUnique}', this.filter.showUniques ? filterShowUnique : '')
      .replace('{filterShowRareJewellery}', this.filter.showRareJewellery ? filterShowRareJewellery.replace('{minRareJewelleryLevel}', (this.filter.hideJewelleryLowerThan || 60).toString()) : '')
      .replace('{filterShowOneSocket}', this.filter.showSocketedItems && this.filter.showSocketedItemsType === SocketedItemType.All ? filterShowOneSocket : '')
      .replace('{filterShow2Sockets}', this.filter.showSocketedItems ? filterShow2Sockets : '')
      .replace('{filterShowQuality}', this.filter.showQualityItems ? filterShowQuality.replace('{minItemQuality}', this.filter.showQualityItemsType === QualityItemType.All ? '0' : '10') : '')
      .replace('{filterShowUltimateLifeFlasks}', this.filter.showUltimateLifeFlasks ? filterShowUltimateLifeFlasks.replace('{minFlaskQuality}', (this.filter.showUltimateLifeFlasksMinQuality || 10).toString()): '')

      .replace('{filterPreferredWeaponTypes}', weaponFilterText)
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
}
