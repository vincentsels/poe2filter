import { Component, OnInit } from '@angular/core';
import { Filter, FlaskType, QualityItemType, SocketedItemType } from './filter';
import { filterHideFlasks, filterHideNormalAndRareItems, filterHideLowJewellery, filterHideScrolls, filterShow2Sockets, filterShowRareJewellery, filterShowOneSocket, filterShowUltimateLifeFlasks, filterShowUnique, filterTemplate, filterShowQuality } from './filter-template';
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

  updateFilter() {
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

  }
}
