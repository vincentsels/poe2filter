export const filterHighlightUniques =
`Show
  Rarity Unique
  PlayEffect Brown
  MinimapIcon 2 Brown Kite
`;

export const filterHighlightRareJewellery =
`Show
  Class "Amulet" "Ring" "Belt"
  Rarity Rare
  PlayEffect Yellow
  MinimapIcon 2 Yellow Kite
`;

export const filterHighlightSkillGems =
`Show
  BaseType "Skill Gem"
  ItemLevel >= {skillGemLevel}
  PlayEffect White
  MinimapIcon 2 White Circle

Show
  BaseType "Spirit Gem"
  ItemLevel >= {skillGemLevel}
  PlayEffect White
  MinimapIcon 2 White Circle
`;

export const filterShowOneSocket =
`Show
  Sockets 1
`;

export const filterShow2Sockets =
`Show
  Sockets 2
  MinimapIcon 2 White Kite

Show
  Sockets 3
  MinimapIcon 2 Yellow Kite
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
  Class "Body Armour" "Boots" "Gloves" "Helmets" "Bows" "Crossbows" "Focus" "One Hand Maces" "Quivers" "Quarterstaves" "Sceptres" "Shields" "Staves" "Two Hand Maces" "Wands"
  Rarity <= {itemRarity}
`;

export const filterHideJewellery =
`Hide
  Class "Amulet" "Ring" "Belt"
  Rarity <= {itemRarity}
`;

export const filterHideGold =
`Hide
  BaseType == "Gold"
  StackSize < {minGold}
`;

export const filterHighlightGold =
`Show
  BaseType == "Gold"
  StackSize >= {yellowGoldLevel}
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  BaseType == "Gold"
  StackSize >= {whiteGoldLevel}
  PlayEffect White
  MinimapIcon 2 White Circle
`;

export const filterHideCommonCharms =
`Hide
  Class "Charms"
  Rarity <= Magic
  Quality = 0
`

export const filterHideRunes =
`Hide
  Class == "Socketable"
  BaseType "Rune"
`;

export const filterHideWaystone =
`Hide
  BaseType "Waystone"
  WaystoneTier < {tier}
`;

export const filterShowWaystone =
`Show
  BaseType "Waystone"
  WaystoneTier >= {tier}
`;

export const filterHighlightWaystone =
`Show
  BaseType "Waystone"
  WaystoneTier >= {tier}
  PlayEffect {color}
  MinimapIcon 2 {color} Diamond
`;

export const filterStaticWaystones =
`Show
  BaseType "Waystone"
  WaystoneTier > 12
  PlayEffect Brown
  MinimapIcon 2 Brown Diamond

Show
  BaseType "Waystone"
  WaystoneTier > 8
  PlayEffect Orange
  MinimapIcon 2 Orange Diamond

Show
  BaseType "Waystone"
  WaystoneTier > 4
  PlayEffect Yellow
  MinimapIcon 2 Yellow Diamond

Show
  BaseType "Waystone"
  WaystoneTier >= 1
  PlayEffect White
  MinimapIcon 2 White Diamond`;

export const filterTemplate =
`#######################################################
##### Highlights
#######################################################

{filterHighlightUniques}
{filterHighlightRareJewellery}
{filterHighlightSkillGems}
{filterHighlightGold}

#######################################################
##### Filter Exceptions
#######################################################

{filterShowOneSocket}
{filterShow2Sockets}
{filterShowQuality}
{filterShowUltimateLifeFlasks}

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
##### Dynamic waystones
#######################################################

{filterDynamicWaystones}

#######################################################
##### Static waystones
#######################################################

{filterStaticWaystones}

#######################################################
##### Special map types
#######################################################

Show
  BaseType "Precursor Tablet"
  PlayEffect Orange
  MinimapIcon 2 Orange Diamond

#######################################################
##### Regular currency
#######################################################

Show
  Class Currency
  BaseType "Perfect Jeweller's Orb" "Mirror of Kalandra"
  PlayEffect Purple
  MinimapIcon 2 Purple Circle

Show
  Class Currency
  BaseType "Divine Orb" "Greater Jeweller's Orb"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class Currency
  BaseType "Exalted Orb" "Chaos Orb" "Orb of Alchemy" "Orb of Annulment" "Gemcutter's Prism" "Glassblower's Bauble" "Orb of Chance"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  Class Currency
  BaseType == "Regal Orb" "Artificer's Orb" "Lesser Jeweller's Orb" "Vaal Orb"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  Class Currency
  BaseType == "Armourer's Scrap" "Blacksmith's Whetstone" "Arcanist's Etcher"
  PlayEffect White
  MinimapIcon 2 White Circle

Show
  Class Currency
  BaseType == "Orb of Transmutation" "Orb of Augmentation"

Show
  Class == "Stackable Currency"
  BaseType "Shard"

#######################################################
##### Trials
#######################################################

Show
  BaseType "Djinn Barya" "Inscribed Ultimatum"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Diamond

#######################################################
##### Socketables
#######################################################

Show
  Class "Socketables"
  BaseType "Soul Core" "Timeless"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

#######################################################
##### Charms
#######################################################

Show
  Class "Charms"
  BaseType "Thawing Charm" "Amethyst Charm" "Golden Charm"
  PlayEffect White
  MinimapIcon 2 White Circle

#######################################################
##### Jewels
#######################################################

Show
  Class "Jewels"
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
##### Delirium
#######################################################

# Distilled Isolation  205
# Simulacrum           108
# Distilled Suffering  71
#
# Distilled Fear       23
#
# Distilled Despair    8
# Distilled Disgust    6
#
# Distilled Envy       2
# Distilled Paranoia   1
#
# Distilled Greed      0.3
# Simulacrum Splinter  0.3
# Distilled Guilt      0.1
# Distilled Ire        0.05

Show
  Class Currency
  BaseType "Distilled Isolation" "Simulacrum" "Distilled Suffering"
  PlayEffect Purple
  MinimapIcon 2 Purple Circle

Show
  Class Currency
  BaseType "Distilled Fear"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class Currency
  BaseType "Distilled Despair" "Distilled Disgust"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  Class Currency
  BaseType "Distilled Envy" "Distilled Paranoia"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  Class Currency
  BaseType "Distilled Greed" "Simulacrum Splinter" "Distilled Guilt" "Distilled Ire"
  PlayEffect White
  MinimapIcon 2 White Circle

#######################################################
##### Breach
#######################################################

# Breachstone           38
#
# Esh's Catalyst        0.3
# Neural Catalyst       0.3
# Reaver Catalyst       0.2
# Chayula's Catalyst    0.2
# Tul's Catalyst        0.2
# Xoph's Catalyst       0.15
# Breach Splinter       0.15
#
# Adaptive Catalyst     0.1
# Flesh Catalyst        0.1
# Skittering Catalyst   0.1
# Sibilant Catalyst     0.07
# Uul-Netol's Catalyst  0.05
# Carapace Catalyst     0.05

Show
  Class Currency
  BaseType "Breachstone"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class Currency
  BaseType "Esh's Catalyst" "Neural Catalyst" "Reaver Catalyst" "Chayula's Catalyst" "Tul's Catalyst" "Xoph's Catalyst" "Breach Splinter"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  Class Currency
  BaseType "Adaptive Catalyst" "Flesh Catalyst" "Skittering Catalyst" "Sibilant Catalyst" "Uul-Netol's Catalyst" "Carapace Catalyst"
  PlayEffect White
  MinimapIcon 2 White Circle

#######################################################
##### Fragments
#######################################################

# An Audience with the King  167
#
# Faded Crisis Fragment      27
# Ancient Crisis Fragment    19
# Weathered Crisis Fragment  17

# Deadly Fate                11
# Cowardly Fate              6
# Victorious Fate            5

Show
  BaseType "An Audience with the King"
  PlayEffect Purple
  MinimapIcon 2 Purple Circle

Show
  BaseType "Faded Crisis Fragment" "Ancient Crisis Fragment" "Weathered Crisis Fragment"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  BaseType "Deadly Fate" "Cowardly Fate" "Victorious Fate"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

#######################################################
##### Essences
#######################################################

# Greater Essence of Torment      26
# Greater Essence of Haste        23
# Greater Essence of Ruin         15
#
# Greater Essence of Sorcery      10
# Greater Essence of Electricity  9
# Greater Essence of Enhancement  8
# Greater Essence of Flames       6
# Greater Essence of Ice          6
# Greater Essence of the Mind     5
# Greater Essence of the Body     4
# Greater Essence of Battle       3
# Greater Essence of the Infinite 3
#
# Essence of Torment              1
# Essence of Ruin                 1
# Essence of Haste                1
#
# Essence of Electricity          0.4
# Essence of the Body             0.1
# Essence of the Mind             0.1
# Essence of Enhancement          0.2
# Essence of Flames               0.1
# Essence of Ice                  0.1
# Essence of Battle               0.2
# Essence of Sorcery              0.2
# Essence of the Infinite         0.1

Show
  BaseType "Greater Essence of Torment" "Greater Essence of Haste" "Greater Essence of Ruin"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  BaseType "Greater Essence of Sorcery" "Greater Essence of Electricity" "Greater Essence of Enhancement" "Greater Essence of Flames" "Greater Essence of Ice" "Greater Essence of the Mind" "Greater Essence of the Body" "Greater Essence of Battle" "Greater Essence of the Infinite"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  BaseType "Essence of Torment" "Essence of Ruin" "Essence of Haste"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  BaseType "Essence of Sorcery" "Essence of Electricity" "Essence of Enhancement" "Essence of Flames" "Essence of Ice" "Essence of the Mind" "Essence of the Body" "Essence of Battle" "Essence of the Infinite"
  PlayEffect White
  MinimapIcon 2 White Circle

#######################################################
##### Omens
#######################################################

# Omen of Whittling	            112
# Omen of Sinistral Erasure     ?
# Omen of Dextral Erasure       ?
# Omen of Sinistral Annulment   ?
# Omen of Dextral Annulment     ?
#
# Omen of Amelioration          17
# Omen of Corruption            11
#
# Omen of Greater Annulment     3
# Omen of Resurgence            2.5
# Omen of Sinistral Exaltation  2
# Omen of Dextral Exaltation    2
# Omen of Greater Exaltation    1.5
# Omen of Sinistral Alchemy     1.5
# Omen of Refreshment           1
# Omen of Dextral Alchemy       1
# Omen of Sinistral Coronation  1
#
# Omen of Dextral Coronation    0.5

Show
  Class "Omen"
  BaseType "Omen of Whittling" "Omen of Sinistral Erasure" "Omen of Dextral Erasure" "Omen of Sinistral Annulment" "Omen of Dextral Annulment"
  PlayEffect Purple
  MinimapIcon 2 Purple Circle

Show
  Class "Omen"
  BaseType "Omen of Amelioration" "Omen of Corruption"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class "Omen"
  BaseType "Greater Annulment" "Omen of Resurgence" "Omen of Sinistral Exaltation" "Omen of Dextral Exaltation" "Omen of Greater Exaltation" "Omen of Sinistral Alchemy" "Omen of Refreshment" "Omen of Dextral Alchemy" "Omen of Sinistral Coronation"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  Class "Omen"
  BaseType "Dextral Coronation"
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

Show
  Class "Expedition Logbooks"
  PlayEffect Orange
  MinimapIcon 2 Orange Moon

Show
  Class "Currency"
  BaseType "Artifact"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Moon

#######################################################
##### Hide stuff
#######################################################

{filterHideNormalAndMagicItems}
{filterHideJewellery}
{filterHideScrolls}
{filterHideFlasks}
{filterHideGold}
{filterHideCommonCharms}
{filterHideRunes}`;
