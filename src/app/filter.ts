export class Filter {
  hideFlasks = true;
  hideFlasksType = FlaskType.All;
  hideScrolls = true;
  hideJewellery = true;
  hideJewelleryLowerThan = 60;
  hideNormalAndRareItems = true;
  showUniques = true;
  showRareJewellery = true;
  showSocketedItems = true;
  showSocketedItemsType = SocketedItemType.All;
  showQualityItems = true;
  showQualityItemsType = QualityItemType.All;
  showUltimateLifeFlasks = true;
  showUltimateLifeFlasksMinQuality = 10;

  weaponFilters = [
    new WeaponFilter(),
  ]
}

export class WeaponFilter {
  show = true;
  weaponType = WeaponType.Bows;
  weaponTier = WeaponTier.ExpertOnly;
}

export enum WeaponType {
  Bows = 'Bows',
  OneHandMaces = 'OneHandMaces',
  Quivers = 'Quivers',
  Sceptres = 'Sceptres',
  Staves = 'Staves',
  TwoHandMaces = 'TwoHandMaces',
  Wands = 'Wands',
  QuarterStaves = 'QuarterStaves',
}

export enum WeaponTier {
  ExpertOnly = "ExpertOnly",
  AdvancedAndExpert = "AdvancedAndExpert",
  All = "All",
}

export enum FlaskType {
  All = "All",
  AllButUltimate = "AllButUltimate",
}

export enum SocketedItemType {
  All = "All",
  TwoOrMoreSockets = "TwoOrMoreSockets",
}

export enum QualityItemType {
  All = "All",
  MinimumTenQuality = "MinimumTenQuality",
}
