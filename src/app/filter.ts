export class Filter {
  hideLifeFlasks = true;
  hideLifeFlasksQuality: number | null = 10;
  hideLifeFlasksBaseTypeExceptions = ['Ultimate Life Flask'];
  hideManaFlasks = true;
  hideManaFlasksQuality: number | null = null;
  hideManaFlasksBaseTypeExceptions = ['None'];
  hideCharms = true;
  hideCharmsQuality: number | null = 0;
  hideCharmsBaseTypeExceptions = ['Thawing Charm', 'Amethyst Charm', 'Golden Charm'];
  hideScrolls = true;
  hideRings = true;
  hideRingsOfRarity = RarityToHide.Normal;
  hideRingsBaseTypeExceptions = ['Gold Ring', 'Prismatic Ring', 'Amethyst Ring'];
  hideAmulets = true;
  hideAmuletsOfRarity = RarityToHide.Normal;
  hideAmuletsBaseTypeExceptions = ['Gold Amulet', 'Stellar Amulet'];
  hideBelts = true;
  hideBeltsOfRarity = RarityToHide.Normal;
  hideBeltsBaseTypeExceptions = ['Golden Obi', 'Utility Belt'];
  hideNormalAndMagicItems = true;
  hideNormalAndMagicItemsOfRarity = WeaponsAndArmourRarityToHide.NormalAndMagic;
  showSocketedItems = true;
  showSocketedItemsType = SocketedItemType.TwoOrMoreSockets;
  showQualityItems = true;
  showQualityItemsType = QualityItemType.MinimumTenQuality;

  hideGold = true;
  hideGoldLowerThan = 50;
  hideRunes = false;
  hideRunesExceptions = ['None'];
  hideCurrency = true;
  hideCurrencyTypes = ['Transmutation Shard', 'Artificer\'s Shard'];

  highlightUniques = true;
  highlightRareJewellery = true;
  highlightChanceBases = true;

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
  cosmeticRemoveAllHighlights = false;
  cosmeticRemoveAllMinimapIcons = false;
  cosmeticTopCurrencyAlertSounds = true;

  customCosmeticRules: CustomRule[] = [];

  customRules: CustomRule[] = [];

  freeRulesTop: string | null = null;
  freeRulesBottom: string | null = null;
}

export class CustomRule {
  active = true;
  itemClass: string = 'All';
  itemType: string = 'All';
  baseTypes: string[] = ['All'];
  rarityComparator: Comparator = Comparator.GreaterThanOrEqual;
  rarity: Rarity = Rarity.Normal;
  displayType = DisplayType.Show;
  cosmeticOptions: CosmeticOptions | null = null;
  continue = false;
}

export class CosmeticOptions {
  minimapIcon = false;
  minimapIconSize = MinimapIconSize.Small;
  minimapIconColor = Color.White;
  minimapIconShape = MinimapIconShape.Circle;

  playEffect = false;
  playEffectColor: Color = Color.White;
  playEffectTemp = false;

  labelStyle = false;
  backgroundColor: string | null = null;
  borderColor: string | null = null;
  textColor: string | null = null;
  fontSize: number | null = null;
}

export enum Comparator {
  GreaterThanOrEqual = '>=',
  LessThanOrEqual = '<=',
  Equal = '==',
}

export enum MinimapIconSize {
  Large = 0,
  Medium = 1,
  Small = 2,
}

export enum LabelSize {
  Smallest = 21,
  Smaller = 25,
  Small = 29,
  Normal = 33,
  Large = 37,
  Larger = 41,
  Largest = 45,
}

export enum MinimapIconShape {
  Circle = 'Circle',
  Diamond = 'Diamond',
  Hexagon = 'Hexagon',
  Square = 'Square',
  Star = 'Star',
  Triangle = 'Triangle',
  Cross = 'Cross',
  Moon = 'Moon',
  Raindrop = 'Raindrop',
  Kite = 'Kite',
  Pentagon = 'Pentagon',
  UpsideDownHouse = 'UpsideDownHouse',
}

export enum Color {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
  Brown = 'Brown',
  White = 'White',
  Yellow = 'Yellow',
  Cyan = 'Cyan',
  Grey = 'Grey',
  Orange = 'Orange',
  Pink = 'Pink',
  Purple = 'Purple',
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
  armourType = ArmourType.AllButShields;
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
  AllButShields = "AllButShields",
  BodyArmours = "Body Armours",
  Helmet = "Helmets",
  Gloves = "Gloves",
  Boots = "Boots",
  Shields = "Shields",
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
  Rare = "Rare",
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

export enum WeaponsAndArmourRarityToHide {
  Normal = "Normal",
  NormalAndMagic = "NormalAndMagic",
  NormalMagicRareBelowAdvanced = "NormalMagicRareBelowAdvanced",
  NormalMagicRareBelowExpert = "NormalMagicRareBelowExpert",
  NormalMagicRare = "NormalMagicRare",
}

export enum CurrencyToHide {
  CommonShardsOnly = "CommonShardsOnly",
  ShardsOnly = "ShardsOnly",
  AllCommon = "AllCommon",
}
