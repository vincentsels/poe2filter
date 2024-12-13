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

  weaponFilters: WeaponFilter[] = [];

  showBodyArmour = false;
  showBodyArmourArm: number | null = null;
  showBodyArmourEs: number | null = null;
  showBodyArmourEva: number | null = null;

  showHelmet = false;
  showHelmetArm: number | null = null;
  showHelmetEs: number | null = null;
  showHelmetEva: number | null = null;

  showGloves = false;
  showGlovesArm: number | null = null;
  showGlovesEs: number | null = null;
  showGlovesEva: number | null = null;

  showBoots = false;
  showBootsArm: number | null = null;
  showBootsEs: number | null = null;
  showBootsEva: number | null = null;
}

export class WeaponFilter {
  show = true;
  weaponType = WeaponType.Bows;
  weaponTier = WeaponTier.ExpertOnly;
}

export enum WeaponType {
  Bows = 'Bows',
  Crossbows = 'Crossbows',
  OneHandMaces = 'OneHandMaces',
  Quivers = 'Quivers',
  QuarterStaves = 'QuarterStaves',
  Sceptres = 'Sceptres',
  Staves = 'Staves',
  TwoHandMaces = 'TwoHandMaces',
  Wands = 'Wands',
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
