export class Filter {
  hideFlasks = true;
  hideFlasksType = FlaskType.All;
  hideScrolls = true;
  hideJewellery = true;
  hideJewelleryOfRarity = RarityToHide.Normal;
  hideNormalAndMagicItems = true;
  hideNormalAndMagicItemsOfRarity = RarityToHide.NormalAndMagic;
  hideGold = true;
  hideGoldLowerThan = 50;
  hideCommonCharms = true;
  hideRunes = false;
  hideCommonCurrency = false;
  hideCommonCurrencyType = CurrencyToHide.ShardsOnly;

  showSocketedItems = true;
  showSocketedItemsType = SocketedItemType.All;
  showQualityItems = true;
  showQualityItemsType = QualityItemType.All;
  showUltimateLifeFlasks = true;
  showUltimateLifeFlasksMinQuality = 10;

  highlightUniques = true;
  highlightRareJewellery = true;

  weaponFilters: WeaponFilter[] = [];

  armourFilters: ArmourFilter[] = [];

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

  dynamicWaystones = false;
  dynamicWaystonesLevel: number | null = null;

  dynamicSkillGems = false;
  dynamicSkillGemsLevel: number | null = null;

  cosmeticTopCurrencyLabels = false;
  cosmeticTopCurrencyAlertSounds = false;

  customRules: CustomRule[] = [];

  freeRulesTop: string | null = null;
  freeRulesBottom: string | null = null;
}

export class CustomRule {
  active = true;
  class: string = 'All';
  baseTypes: string[] = ['All'];
  minimumRarity: Rarity = Rarity.Normal;
  displayType = DisplayType.Show;
}

export enum Rarity {
  Normal = 'Normal',
  Magic = 'Magic',
  Rare = 'Rare',
  Unique = 'Unique',
}

export enum DisplayType {
  Hide = 'Hide',
  Show = 'Show',
  White = 'White',
  Yellow = 'Yellow',
  Orange = 'Orange',
  Brown = 'Brown',
  Purple = 'Purple',
}

export class WeaponFilter {
  show = true;
  weaponType = WeaponType.All;
  rarity = MinimumRarity.Normal;
  baseTypeTier = BaseTypeTier.ExpertOnly;
}

export class ArmourFilter {
  show = true;
  armourType = ArmourType.All;
  rarity = MinimumRarity.Normal;
  baseTypeTier = BaseTypeTier.ExpertOnly;
  defenceType = DefenceType.All;
}

export enum WeaponType {
  All = 'All',
  Bows = 'Bows',
  Crossbows = 'Crossbows',
  Foci = 'Foci',
  OneHandMaces = 'One Hand Maces',
  Quivers = 'Quivers',
  QuarterStaves = 'Quarterstaves',
  Sceptres = 'Sceptres',
  Shields = 'Shields',
  Staves = 'Staves',
  TwoHandMaces = 'Two Hand Maces',
  Wands = 'Wands',
}

export enum ArmourType {
  All = "All",
  BodyArmour = "Body Armours",
  Helmet = "Helmets",
  Gloves = "Gloves",
  Boots = "Boots",
}

export enum DefenceType {
  All = "All",
  Armour = "Armour",
  Evasion = "Evasion",
  EnergyShield = "EnergyShield",
  ArmourEvasion = "ArmourEvasion",
  ArmourEnergyShield = "ArmourEnergyShield",
  EvasionEnergyShield = "EvasionEnergyShield",
}

export enum MinimumRarity {
  Magic = "Magic",
  Normal = "Normal",
}

export enum BaseTypeTier {
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

export enum RarityToHide {
  Normal = "Normal",
  NormalAndMagic = "NormalAndMagic",
}

export enum CurrencyToHide {
  ShardsOnly = "ShardsOnly",
  AllCommon = "AllCommon",
}
