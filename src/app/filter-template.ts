export const filterShowUnique =
`Show
  Rarity Unique
  PlayEffect Brown
  MinimapIcon 2 Brown Cross
`;

export const filterShowRareJewellery =
`Show
  Class "Amulet" "Ring" "Belt"
  Rarity >= Magic
  ItemLevel >= {minRareJewelleryLevel}
`;

export const filterShowOneSocket =
`Show
  Sockets 1
`;

export const filterShow2Sockets =
`Show
  Sockets >= 2
  MinimapIcon 2 White Kite
`;

export const filterShowQuality =
`Show
  Quality >= {minItemQuality}
`;

export const filterPreferredWeaponType =
`Show
  Class {weaponType}{tierType}
  Rarity = Rare
  PlayEffect Yellow
  MinimapIcon 2 Yellow Kite

Show
  Class {weaponType}{tierType}
  Rarity <= Magic
`;

export const filterPreferredBodyArmour =
`Show
  Class "Body Armour"
{defences}
`;

export const filterPreferredHelmet =
`Show
  Class "Helmet"
{defences}
`;

export const filterPreferredGloves =
`Show
  Class "Gloves"
{defences}
`;

export const filterPreferredBoots =
`Show
  Class "Boots"
{defences}
`;

export const filterHideScrolls =
`Hide
  BaseType "Scroll of Wisdom"
`;

export const filterHideFlasks =
`Hide
  Class "Flask"
  Rarity <= Magic
`;

export const filterShowUltimateLifeFlasks =
`Show
  BaseType "Ultimate Life Flask"
  Quality > {minFlaskQuality}
`;

export const filterHideNormalAndMagicItems =
`Hide
  Class "Body Armour" "Boots" "Gloves" "Helmets" "Shields" "Bows" "Crossbows" "Claws" "Daggers" "One Hand" "Two Hand" "Quiver" "Sceptre" "Wand" "Quarterstave" "Stave" "Belt" "Focus" "Maces"
  Rarity <= Magic
`;

export const filterHideLowJewellery =
`Hide
  Class "Amulet" "Ring" "Belt"
  ItemLevel < {minRareJewelleryLevel}
  Rarity <= Magic
`;

export const filterTemplate =
`#######################################################
##### Always show
#######################################################

{filterShowUnique}
{filterShowRareJewellery}
{filterShowOneSocket}
{filterShow2Sockets}
{filterShowQuality}

#######################################################
##### Always show preferred weapon types
#######################################################

{filterPreferredWeaponTypes}

#######################################################
##### Always show preferred armor types
#######################################################

{filterPreferredBodyArmour}
{filterPreferredHelmet}
{filterPreferredGloves}
{filterPreferredBoots}

#######################################################
##### Only quality flasks
#######################################################

{filterShowUltimateLifeFlasks}

#######################################################
##### Regular currency
#######################################################

Show
	Class Currency
	BaseType "Divine Orb" "Orb of Chance" "Perfect Jeweller's Orb" "Mirror of Kalandra"
	PlayEffect Brown
	MinimapIcon 2 Brown Circle

Show
	Class Currency
	BaseType "Exalted Orb" "Chaos Orb" "Orb of Alchemy" "Orb of Annulment" "Gemcutter's Prism" "Glassblower's Bauble" "Greater Jeweller's Orb"
	PlayEffect Orange
	MinimapIcon 2 Orange Circle

Show
	Class Currency
	BaseType == "Regal Orb" "Artificer's Orb" "Lesser Jeweller's Orb" "Vaal Orb"
	PlayEffect Yellow
	MinimapIcon 2 Yellow Circle

Show
	Class Currency
	BaseType == "Orb of Transmutation" "Orb of Augmentation" "Orb of Alteration" "Armourer's Scrap" "Blacksmith's Whetstone" "Arcanist's Etcher"
	PlayEffect White
	MinimapIcon 2 White Circle

Show
	Class == "Stackable Currency"
	BaseType "Shard"
	PlayEffect White
	MinimapIcon 2 White Circle

#######################################################
##### Essence
#######################################################

Show
	BaseType "Essence"
	PlayEffect Yellow
	MinimapIcon 2 Yellow Circle

#######################################################
##### Maps
#######################################################

Show
	BaseType " Fragment" "Breachstone" "Simulacrum" " Tablet" "Cowardly Fate" "Deadly Fate" "Victorious Fate"
	PlayEffect Orange
	MinimapIcon 2 Orange Diamond

Show
	Class "Currency"
	BaseType "Simulacrum Splinter" "Breach Splinter" " Artifact"
	PlayEffect Yellow
	MinimapIcon 2 Yellow Diamond

Show
	BaseType "Waystone"
	WaystoneTier >= 12
	PlayEffect Brown
	MinimapIcon 2 Brown Diamond

Show
	BaseType "Waystone"
	WaystoneTier >= 8
	PlayEffect Orange
	MinimapIcon 2 Orange Diamond

Show
	BaseType "Waystone"
	WaystoneTier >= 4
	PlayEffect Yellow
	MinimapIcon 2 Yellow Diamond

Show
	BaseType "Waystone"
	WaystoneTier >= 1
	PlayEffect White
	MinimapIcon 2 White Diamond

#######################################################
##### Trials
#######################################################

Show
	BaseType "Djinn Barya" "Inscribed Ultimatum"
	PlayEffect Yellow
	MinimapIcon 2 Yellow Diamond

#######################################################
##### Runes
#######################################################

Show
	Class == "Socketable"
	BaseType "Soul Core" "Timeless"
	PlayEffect Yellow
	MinimapIcon 2 Yellow Circle

Show
	Class == "Socketable"
	BaseType "Rune"
	PlayEffect White
	MinimapIcon 2 White Circle

#######################################################
##### Charms
#######################################################

Show
	BaseType "Charm"
	PlayEffect White
	MinimapIcon 2 White Circle

#######################################################
##### Jewels
#######################################################

Show
	Class == "Jewels"
	PlayEffect White
	MinimapIcon 2 White Circle

#######################################################
##### Relics
#######################################################

Show
	Class "Relic"
	PlayEffect White
	MinimapIcon 2 White Circle

#######################################################
##### Oil
#######################################################

Show
	Class Currency
	BaseType "Oil"
	PlayEffect Yellow
	MinimapIcon 2 Yellow Circle

#######################################################
##### Expedition currency
#######################################################

Show
	Class "Currency"
	BaseType == "Exotic Coinage"
	PlayEffect Orange
	MinimapIcon 2 Orange Moon

# TODO: other currency types

Show
	Class "Currency"
	BaseType "Artifact"
	PlayEffect Yellow
	MinimapIcon 2 Yellow Moon

#######################################################
##### Simulacrum currency
#######################################################

Show
	Class Currency
	BaseType "Splinter of Chayula" "Timeless Maraketh Splinter" "Timeless Templar Splinter" "Timeless Vaal Splinter"
	PlayEffect Orange
	MinimapIcon 2 Orange Circle

Show
	Class Currency
	BaseType "Timeless Eternal Empire Splinter" "Timeless Karui Splinter"
	PlayEffect Yellow
	MinimapIcon 2 Yellow Circle

Show
	Class Currency
	BaseType "Splinter of Esh" "Splinter of Tul" "Splinter of Uul-Netol" "Splinter of Xoph"
	PlayEffect White
	MinimapIcon 2 White Circle

Show
	Class Currency
	BaseType "Simulacrum Splinter"
	PlayEffect White

#######################################################
##### Hide crap items
#######################################################

{filterHideNormalAndMagicItems}
{filterHideLowJewellery}

#######################################################
##### Show/hide scrolls of ID
#######################################################

{filterHideScrolls}

#######################################################
##### Only quality flasks
#######################################################

{filterHideFlasks}`;
