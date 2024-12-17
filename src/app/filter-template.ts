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

export const filterRarePlayEffect =
`  PlayEffect Yellow
  MinimapIcon 2 Yellow Kite`;

export const filterPreferredWeaponType =
`Show
  Class == {weaponType}{tierType}
  Rarity == Rare{rarePlayEffect}

Show
  Class == {weaponType}{tierType}
  Rarity == {rarity}
`;

export const filterPreferredArmourType =
`Show
  Class == {armourType}{tierType}
  Rarity == Rare{defenceType}{rarePlayEffect}

Show
  Class == {armourType}{tierType}
  Rarity == {rarity}{defenceType}
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
  Class == "Body Armour" "Boots" "Gloves" "Helmets" "Bows" "Crossbows" "Foci" "One Hand Maces" "Quivers" "Quarterstaves" "Sceptres" "Shields" "Staves" "Two Hand Maces" "Wands"
  Rarity <= {itemRarity}
`;

export const filterHideJewellery =
`Hide
  Class "Amulet" "Ring" "Belt"
  Rarity <= {itemRarity}
`;

export const filterHideGold =
`Hide
  BaseType "Gold"
  StackSize < {minGold}
`;

export const filterHighlightGold =
`Show
  BaseType "Gold"
  StackSize >= {yellowGoldLevel}
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  BaseType "Gold"
  StackSize >= {whiteGoldLevel}
  PlayEffect White
  MinimapIcon 2 White Circle
`;

export const filterHideCommonCharms =
`Hide
  Class "Charms"
  Rarity <= Magic
  Quality == 0
`

export const filterHideRunes =
`Hide
  Class "Socketable"
  BaseType "Rune"
`;

export const filterHideCommonCurrency =
`Hide
  Class "Stackable Currency"
  BaseType "Orb of Transmutation" "Orb of Augmentation" "Transmutation Shard" "Regal Shard" "Chance Shard" "Artificer's Shard"
`;

export const filterHighlightCommonCurrency =
`Show
  Class "Stackable Currency"
  BaseType "Orb of Annulment" "Chaos Orb" "Orb of Alchemy" "Gemcutter's Prism" "Orb of Chance"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  Class "Stackable Currency"
  BaseType "Regal Orb" "Vaal Orb" "Artificer's Orb" "Glassblower's Bauble" "Lesser Jeweller's Orb"
  PlayEffect White
  MinimapIcon 2 White Circle

Show
  Class "Stackable Currency"
  BaseType "Armourer's Scrap" "Blacksmith's Whetstone" "Arcanist's Etcher" "Orb of Transmutation" "Orb of Augmentation"

Show
  Class "Stackable Currency"
  BaseType "Shard"
`;

export const filterShowCommonCurrency =
`Show
  Class "Stackable Currency"
  BaseType "Orb of Annulment" "Chaos Orb" "Orb of Alchemy" "Gemcutter's Prism" "Orb of Chance"
  PlayEffect White
  MinimapIcon 2 White Circle

Show
  Class "Stackable Currency"
  BaseType "Regal Orb" "Vaal Orb" "Artificer's Orb" "Glassblower's Bauble" "Lesser Jeweller's Orb"
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

{filterPreferredArmourTypes}

#######################################################
##### Dynamic waystones
#######################################################

{filterDynamicWaystones}

#######################################################
##### Static waystones
#######################################################

{filterStaticWaystones}

#######################################################
##### Precursor Tablets
#######################################################

Show
  BaseType "Precursor Tablet"
  PlayEffect Orange
  MinimapIcon 2 Orange Diamond

#######################################################
##### Regular currency
#######################################################

# Mirror of Kalandra      ?
# Perfect Jeweller's Orb  72
#
# Greater Jeweller's Orb  18
# Divine Orb              9
#
# Orb of Annulment        2
# Chaos Orb               1
# Exalted Orb             1
# Orb of Chance           1
# Gemcutter's Prism       1
# Orb of Alchemy          0.5
#
# Vaal Orb                0.2
# Regal Orb               0.15
# Glassblower's Bauble    0.3
# Artificer's Orb         0.2
# Lesser Jeweller's Orb   0.2
#
# Armourer's Scrap        0.25
# Arcanist's Etcher       0.2
# Blacksmith's Whetstone  0.1
#
# Orb of Transmutation    0.01
# Orb of Augmentation     0.001
# Transmutation Shard     0.001
# Regal Shard             0.05
# Chance Shard            0.015

Show
  Class "Stackable Currency"
  BaseType == "Mirror of Kalandra" "Perfect Jeweller's Orb"
  PlayEffect Purple
  MinimapIcon 2 Purple Circle

Show
  Class "Stackable Currency"
  BaseType == "Greater Jeweller's Orb" "Divine Orb"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class "Stackable Currency"
  BaseType == "Exalted Orb"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

{filterShowCommonCurrency}

#######################################################
##### Trials
#######################################################

Show
  BaseType == "Djinn Barya" "Inscribed Ultimatum"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Diamond

#######################################################
##### Charms
#######################################################

Show
  Class "Charms"
  BaseType == "Thawing Charm" "Amethyst Charm" "Golden Charm"
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
  BaseType == "Distilled Isolation" "Simulacrum" "Distilled Suffering"
  PlayEffect Purple
  MinimapIcon 2 Purple Circle

Show
  Class Currency
  BaseType == "Distilled Fear"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class Currency
  BaseType == "Distilled Despair" "Distilled Disgust"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  Class Currency
  BaseType == "Distilled Envy" "Distilled Paranoia"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  Class Currency
  BaseType == "Distilled Greed" "Simulacrum Splinter" "Distilled Guilt" "Distilled Ire"
  PlayEffect White
  MinimapIcon 2 White Circle

Show
  Class Currency
  BaseType "Distilled" # Safety Catch-all
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
  BaseType == "Breachstone"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class Currency
  BaseType == "Esh's Catalyst" "Neural Catalyst" "Reaver Catalyst" "Chayula's Catalyst" "Tul's Catalyst" "Xoph's Catalyst" "Breach Splinter"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  Class Currency
  BaseType == "Adaptive Catalyst" "Flesh Catalyst" "Skittering Catalyst" "Sibilant Catalyst" "Uul-Netol's Catalyst" "Carapace Catalyst"
  PlayEffect White
  MinimapIcon 2 White Circle

Show
  Class Currency
  BaseType "Catalyst" # Safety Catch-all
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
#
# Deadly Fate                11
# Cowardly Fate              6
# Victorious Fate            5

Show
  BaseType == "An Audience with the King"
  PlayEffect Purple
  MinimapIcon 2 Purple Circle

Show
  BaseType == "Deadly Fate" "Cowardly Fate" "Victorious Fate"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  BaseType "Fragment" # Specific fragments can't seem to be added; just adding this catch-all
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

#######################################################
##### Expedition
#######################################################

Show
  Class == "Expedition Logbooks"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  Class == "Currency"
  BaseType "Exotic Coinage"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  Class "Currency"
  BaseType "Artifact"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

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
  BaseType == "Greater Essence of Torment" "Greater Essence of Haste" "Greater Essence of Ruin"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  BaseType == "Greater Essence of Sorcery" "Greater Essence of Electricity" "Greater Essence of Enhancement" "Greater Essence of Flames" "Greater Essence of Ice" "Greater Essence of the Mind" "Greater Essence of the Body" "Greater Essence of Battle" "Greater Essence of the Infinite"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  BaseType == "Essence of Torment" "Essence of Ruin" "Essence of Haste"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  BaseType == "Essence of Sorcery" "Essence of Electricity" "Essence of Enhancement" "Essence of Flames" "Essence of Ice" "Essence of the Mind" "Essence of the Body" "Essence of Battle" "Essence of the Infinite"
  PlayEffect White
  MinimapIcon 2 White Circle

Show
  BaseType "Essence" # Safety Catch-all
  PlayEffect White
  MinimapIcon 2 White Circle

#######################################################
##### Omens
#######################################################

# Omen of Whittling             112
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
  BaseType == "Omen of Whittling" "Omen of Sinistral Erasure" "Omen of Dextral Erasure" "Omen of Sinistral Annulment" "Omen of Dextral Annulment"
  PlayEffect Purple
  MinimapIcon 2 Purple Circle

Show
  Class "Omen"
  BaseType == "Omen of Amelioration" "Omen of Corruption"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class "Omen"
  BaseType == "Omen of Greater Annulment" "Omen of Resurgence" "Omen of Sinistral Exaltation" "Omen of Dextral Exaltation" "Omen of Greater Exaltation" "Omen of Sinistral Alchemy" "Omen of Refreshment" "Omen of Dextral Alchemy" "Omen of Sinistral Coronation"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  Class "Omen"
  BaseType == "Omen of Dextral Coronation"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  Class "Omen" # Safety Catch-all
  PlayEffect White
  MinimapIcon 2 White Circle

#######################################################
##### Soul Cores
#######################################################

# Soul Core of Azcapa      44
# Soul Core of Zalatl      12
#
# Soul Core of Citaqualotl 4
# Soul Core of Tacati      4
#
# Soul Core of Jiquani     2
# Soul Core of Puhuarte    2
#
# Soul Core of Opiloti     1
# Soul Core of Atmohua     1
# Soul Core of Cholotl     1
# Soul Core of Quipolatl   1
# Soul Core of Ticaba      1
# Soul Core of Topotante   1
# Soul Core of Tzamoto     1
# Soul Core of Xopec       1
# Soul Core of Zantipi     1

Show
  Class "Socketable"
  BaseType == "Soul Core of Azcapa" "Soul Core of Zalatl"
  PlayEffect Brown
  MinimapIcon 2 Brown Circle

Show
  Class "Socketable"
  BaseType == "Soul Core of Citaqualotl" "Soul Core of Tacati"
  PlayEffect Orange
  MinimapIcon 2 Orange Circle

Show
  Class "Socketable"
  BaseType == "Soul Core of Jiquani" "Soul Core of Puhuarte"
  PlayEffect Yellow
  MinimapIcon 2 Yellow Circle

Show
  Class "Socketable"
  BaseType == "Soul Core of Opiloti" "Soul Core of Atmohua" "Soul Core of Cholotl" "Soul Core of Quipolatl" "Soul Core of Ticaba" "Soul Core of Topotante" "Soul Core of Tzamoto" "Soul Core of Xopec" "Soul Core of Zantipi"
  PlayEffect White
  MinimapIcon 2 White Circle

Show
  Class "Socketable"
  BaseType "Soul Core" # Safety Catch-all
  PlayEffect White
  MinimapIcon 2 White Circle

#######################################################
##### Hide stuff
#######################################################

{filterHideNormalAndMagicItems}
{filterHideJewellery}
{filterHideScrolls}
{filterHideFlasks}
{filterHideGold}
{filterHideCommonCharms}
{filterHideRunes}
{filterHideCommonCurrency}`;
