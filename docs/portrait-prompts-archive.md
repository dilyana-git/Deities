# Portrait Prompts — archived from the dataset

Every figure's `image_prompt`, as it stood when the field was removed from
`src/data/mythology.js`. Nothing in the app ever read it: portraits are resolved
from the node `id` through `portraitManifest.generated.js`, so these strings were
shipped to every visitor as ~20KB of dead weight in the main bundle.

They are kept here because they are authored work and the record of how the
existing art was made. `docs/midjourney-prompts.md` holds the fuller,
hand-written head/full prompt pairs for 118 figures and the house style; this
file is the raw one-line prompt for **all 139**, including the
21 that file never covered.

The `jungian_archetype` field was removed in the same pass and is listed beside
each figure, since it was equally unread.

| | |
|---|---|
| Figures | 139 |
| With a prompt | 139 |
| With an archetype | 139 |


## primordial

| id | name | archetype | prompt |
|---|---|---|---|
| `chaos` | Chaos | Shapeshifter | Swirling primordial void, cosmic darkness with faint light emerging |
| `gaia` | Gaia | Great Mother | Ancient earth goddess, vast and dark, roots and stone, starless sky above |
| `tartarus` | Tartarus | Shadow | Bottomless dark pit, ancient stone walls, imprisoned Titans, eternal flame |
| `eros` | Eros | Anima | Radiant winged figure of pure golden light, cosmic scale, older than gods |
| `erebus` | Erebus | Shadow | Deep primordial darkness, swirling black mist, starless void |
| `nyx` | Nyx | Great Mother | Dark goddess draped in starry veil, owls, poppies, night sky |
| `hemera` | Hemera | Anima | Luminous goddess at dawn, golden light breaking from darkness |
| `aether` | Aether | Wise Old Man | Vast clear golden sky above clouds, divine realm, pure light |
| `pontus` | Pontus | King | Ancient dark sea stretching to infinity, primordial ocean, no sky |
| `nemesis` | Nemesis | Shadow | Stern winged goddess with scales and sword, ancient divine justice |
| `eris` | Eris | Trickster | Chaos goddess throwing golden apple, war erupting in background |

## chthonic

| id | name | archetype | prompt |
|---|---|---|---|
| `thanatos` | Thanatos | Threshold Guardian | Dark-winged young man, inverted torch, peaceful expression, shadowy |
| `hypnos` | Hypnos | Shapeshifter | Dreaming god draped in dark robes, poppies, twin to death |
| `morpheus` | Morpheus | Shapeshifter | Shape-shifting deity of dreams, mirror, poppies, twilight realm |
| `moirai` | The Moirai | Threshold Guardian | Three ancient women weaving a cosmic thread, one cutting, eternal loom |
| `erinyes` | The Erinyes | Shadow | Three winged avenging goddesses, serpent hair, tears of blood, relentless pursuit through shadow |
| `hades` | Hades | King | Dark enthroned king, Cerberus at feet, invisible crown, pale shadowy realm |
| `persephone` | Persephone | Queen | Dual-natured queen, half in spring light, half in underworld shadow, pomegranate |
| `hecate` | Hecate | Shapeshifter | Triple-faced goddess at crossroads, twin torches, key, hounds of night |

## titan

| id | name | archetype | prompt |
|---|---|---|---|
| `uranus` | Uranus | King | Ancient sky god, vast starfield, sickle wound, falling titans |
| `cronus` | Cronus | Devourer | Dark father figure swallowing a child, adamantine sickle, harvest |
| `rhea` | Rhea | Great Mother | Titan mother goddess, lions flanking her throne, mountain crown, ancient |
| `oceanus` | Oceanus | King | Ancient river god encircling the world, serpentine, vast ocean, primordial |
| `tethys` | Tethys | Great Mother | Ancient sea goddess, flowing water, nursing divine children, oceanic throne |
| `hyperion` | Hyperion | Wise Old Man | Radiant titan watching from above, golden light, father of celestial fires |
| `theia` | Theia | Queen | Glowing titan goddess, gold and silver radiance, heavenly crown |
| `prometheus` | Prometheus | Trickster | Chained titan on mountain, eagle, eternal fire, defiant gaze |
| `epimetheus` | Epimetheus | Trickster | Bemused titan, empty-handed, animals swarming, Pandora opening a jar |
| `atlas` | Atlas | Wise Old Man | Titan bearing the heavens on his shoulders, vast cosmic weight, defiant stance |
| `themis` | Themis | Queen | Titan goddess of divine law, scales, stone throne, ancient oracle |
| `mnemosyne` | Mnemosyne | Wise Old Man | Ancient titaness with vast memory, scrolls unrolling around her, eternal archive |
| `iapetus` | Iapetus | Shadow | Dark titan, one of four sky pillars, father of the Promethean line |
| `helios` | Helios | King | Sun god in blazing golden chariot, fire horses, arc across sky |
| `selene` | Selene | Queen | Silver goddess in crescent-moon chariot, night sky, gazing at sleeping Endymion |
| `eos` | Eos | Anima | Rose-golden goddess opening heaven's gate, saffron robes, sunrise |
| `metis` | Metis | Wise Old Man | Wise titaness inside the mind of Zeus, guiding hand invisible, owl eyes |
| `styx` | Styx | Threshold Guardian | Dark Underworld river, black water, divine oath-weight, ghostly current |
| `leto` | Leto | Great Mother | Veiled titaness in labor, refused refuge, Delos floating island, twin lights |

## nymph_minor

| id | name | archetype | prompt |
|---|---|---|---|
| `maia` | Maia | Anima | Shy nymph in mountain cave, Pleiades stars, newborn Hermes, quiet night |
| `pegasus` | Pegasus | Hero | White winged horse born from Medusa's blood, divine flight, Bellerophon riding |
| `chrysaor` | Chrysaor | Shadow | Golden-sworded figure born from Medusa's blood, power and darkness |
| `muses` | The Muses | Anima | Nine divine sisters on Helicon, lyre and scrolls and all arts, eternal inspiration |
| `callirrhoe` | Callirrhoe | Anima | Oceanid nymph, flowing water, beauty and sadness, mother of Geryon |
| `circe` | Circe | Shapeshifter | Sorceress on island, cup of transformation, pigs at her feet, herbs and magic |
| `callisto` | Callisto | Anima | Nymph transformed into bear, her son Arcas hunting her, stars above, tragedy |
| `medea` | Medea | Shadow | Medea, a head-and-shoulders sculptural bust, the face prominent and centered, a cold dangerous intelligence in her eyes, holding a small potion-cup, herbs and a coiled serpent at her shoulder, weathered marble darkened with bronze and verdigris and a faint green glow, beautiful and ruinous |
| `perse` | Perse | Queen | Perse, a head-and-shoulders sculptural bust, the face prominent and centered, a cold vain beauty with heavy-lidded eyes, damp coils of hair like kelp, a thin coronet of shell at her brow, pale sea-green marble beaded with condensation and faint nacre, lovely and indifferent |
| `pasiphae` | Pasiphaë | Shadow | Pasiphaë, a head-and-shoulders sculptural bust, the face prominent and centered, an imperious cruel beauty with a knowing half-smile, a thin gold diadem set with a small bull's-head boss, dark marble streaked with red-oxide and cold gilding, regal and venomous |
| `aeetes` | Aeëtes | King | Aeëtes, a head-and-shoulders sculptural bust, the face prominent and centered, a proud hawk-eyed sorcerer-king, a crown wrought like sun-rays, a fold of golden fleece at his shoulder, dark bronze-veined marble with cold gold leaf, imperious and radiant |
| `perses` | Perses | Shadow | Perses, a head-and-shoulders sculptural bust, the face prominent and centered, a gaunt shadowed sorcerer with hollow watchful eyes, a plain dark circlet, faint spectral wisps at his shoulder, near-black marble veined with grey and dead silver, cold and secretive |
| `echo` | Echo | Anima | Echo, a head-and-shoulders sculptural bust, the face prominent and centered, a sorrowful nymph already half-dissolving into the stone behind her, lips parted around a word she cannot begin, pale weathered marble fading at the edges, soft green lichen |
| `hermaphroditus` | Hermaphroditus | Shapeshifter | Hermaphroditus, a head-and-shoulders sculptural bust, the face prominent and centered, a serene androgynous beauty whose features hold both man and woman at once, faint suggestion of a second face merged with the first, pale marble rising from water, ambiguous and complete |
| `salmacis` | Salmacis | Anima | Salmacis, a head-and-shoulders sculptural bust, the face prominent and centered, a languid nymph emerging from still water with longing in her gaze, her form already beginning to dissolve into another, pale marble and teal-green water, soft and possessive |
| `daphne` | Daphne | Anima | A nymph mid-transformation into a laurel tree, bark creeping up her arms, serene face |
| `calypso` | Calypso | Anima | A radiant nymph on a rocky island shore watching a man's raft sail into the horizon |

## olympian

| id | name | archetype | prompt |
|---|---|---|---|
| `zeus` | Zeus | King | Enthroned king of gods, thunderbolt, eagle, vast storm clouds, Olympus |
| `hera` | Hera | Queen | Regal queen of gods, peacock throne, crown, stern beautiful face, lightning |
| `demeter` | Demeter | Great Mother | Grief-stricken grain goddess, withered wheat, searching for daughter, torch |
| `hestia` | Hestia | Queen | Serene goddess tending eternal flame, hearthfire, quiet sanctuary, ancient |
| `athena` | Athena | Queen | Grey-eyed goddess in full armor, owl, olive branch, born from Zeus's head |
| `apollo` | Apollo | King | Radiant golden god with lyre and silver bow, laurel crown, divine twin |
| `artemis` | Artemis | Queen | Wild goddess with silver bow, deer companion, moonlit forest, fierce |
| `hermes` | Hermes | Trickster | Divine messenger in flight, caduceus, winged sandals, between worlds |
| `aphrodite` | Aphrodite | Anima | Goddess rising from sea foam, rose petals, doves, irresistible beauty |
| `ares` | Ares | Shadow | Blood-soaked war god in black armor, vultures circling, battlefield chaos |
| `hephaestus` | Hephaestus | Trickster | Limping craftsman god at forge, divine fire, miraculous golden creations |
| `dionysus` | Dionysus | Trickster | Wild god of wine and ecstasy, grapevines, maenads, leopard, mask and vine |
| `asclepius` | Asclepius | Wise Old Man | Divine healer with serpent-entwined staff, raising the dead, thunderbolt above |

## sea_deity

| id | name | archetype | prompt |
|---|---|---|---|
| `poseidon` | Poseidon | King | Sea god rising from ocean, trident, chariot of horses, earthquake waves |
| `amphitrite` | Amphitrite | Queen | Sea queen with crown of crab claws, pearl-draped throne, oceanic realm |
| `nereus` | Nereus | Wise Old Man | Ancient shape-shifting sea elder, fish tail, grey beard, wisdom of the deep |
| `proteus` | Proteus | Shapeshifter | Ancient shape-shifting sea elder mid-transformation among seals on a sunlit shore |
| `phorcys` | Phorcys | Devourer | Ancient dangerous sea god, crab-clawed, lurking beneath dark waves, father of horrors |
| `ceto` | Ceto | Great Mother | Sea monster mother, vast whale-form, dark abyssal waters, hatching monsters |
| `triton` | Triton | Threshold Guardian | Half-man sea herald, conch shell horn, fish tail, ocean waves crashing |
| `glaucus` | Glaucus | Shapeshifter | Former fisherman transformed into sea creature, green-tinged, lovesick eyes |
| `thetis` | Thetis | Anima | Silver-footed nereid, sea foam, foreknowledge of tragedy, mother's grief |
| `trygon` | Trygon | Threshold Guardian | Trygon, a vast ancient stingray rendered as a dark sculptural relief, a broad flat body filling the frame, a long barbed venomous tail curling forward, depthless black surfaces veined with faint abyssal phosphor and old verdigris, immense silent and primordial |

## monster

| id | name | archetype | prompt |
|---|---|---|---|
| `typhon` | Typhon | Shadow | Colossal monster with hundred serpent heads, volcanic fire, eclipsing the sky |
| `echidna` | Echidna | Great Mother | Half-woman half-serpent in cave, beautiful and terrible, mother of monsters |
| `cerberus` | Cerberus | Threshold Guardian | Three-headed underworld dog, serpent mane, hellgate, shadow realm |
| `chimera` | Chimera | Shadow | Triple-formed fire-breathing monster, lion-goat-serpent, blazing Lycia |
| `sphinx` | Sphinx | Threshold Guardian | Winged lion-bodied woman with woman's face, sphinx at Thebes gate, riddle |
| `orthrus` | Orthrus | Threshold Guardian | Twin-headed dog guarding red cattle, Geryon's realm, killed by Heracles' club |
| `nemean_lion` | Nemean Lion | Shadow | Monstrous golden lion with impenetrable hide, Nemea, strangled by Heracles |
| `colchian_dragon` | Colchian Dragon | Threshold Guardian | Vast coiled dragon wrapped around golden fleece, sacred grove, sleepless eye |
| `caucasian_eagle` | Caucasian Eagle | Shadow | Divine eagle eating the liver of chained Prometheus, Caucasian cliff, eternal |
| `medusa` | Medusa | Shadow | Gorgon with serpent hair, terrible gaze, winged, stone figures around her |
| `stheno` | Stheno | Shadow | Immortal Gorgon, most terrible, bronze claws, seeking vengeance for Medusa |
| `euryale` | Euryale | Shadow | Gorgon wailing over slain Medusa, vast winged grief, wide-roaming terror |
| `graeae` | The Graeae | Shadow | Three ancient grey women sharing one eyeball and one tooth, fog and shadow |
| `ladon` | Ladon | Threshold Guardian | Vast coiled serpent-dragon around golden apple tree, edge of world, stars |
| `scylla` | Scylla | Shadow | Six-headed sea monster in cliff cave, sailors passing, terrible barking |
| `charybdis` | Charybdis | Devourer | Vast whirlpool consuming ships, dark water vortex, thunderbolt origins |
| `geryon` | Geryon | Shadow | Three-bodied giant on western island, vast red cattle herds, sunset warrior |
| `polyphemus` | Polyphemus | Shadow | One-eyed giant cyclops in cave, shepherd, blinded by Odysseus's burning stake |
| `minotaur` | The Minotaur | Shadow | The Minotaur, a head-and-shoulders sculptural bust, the face prominent and centered, a powerful bull's head on a man's muscled shoulders, horns lowered, nostrils flaring, faint labyrinth walls carved behind, rough black volcanic rock veined with red-oxide and verdigris bronze, violent and bestial |
| `lernaean_hydra` | Lernaean Hydra | Shadow | Nine-headed water-serpent rising from a dark swamp, one head glowing immortal gold |
| `gorgons` | The Gorgons | Shadow | Three terrible sisters with snake hair, one with a glowing gaze, cliffs at world's edge |

## hero

| id | name | archetype | prompt |
|---|---|---|---|
| `perseus` | Perseus | Hero | Hero flying with winged sandals, Gorgon head in bag, mirrored shield, Perseus |
| `heracles` | Heracles | Hero | Muscular hero in lion-skin cloak, club, fire, twelve legendary labors |
| `odysseus` | Odysseus | Trickster | Cunning hero of endurance, sea-worn, raft in storm, Scylla and Charybdis |
| `bellerophon` | Bellerophon | Hero | Hero astride winged horse, slaying fire-breathing Chimera, hubris leading to fall |
| `jason` | Jason | Hero | Hero with golden fleece, Argo behind him, betrayal and tragedy shadowing triumph |
| `oedipus` | Oedipus | Hero | Tragic hero at crossroads, answered Sphinx, blinded himself by truth, fate |
| `theseus` | Theseus | Hero | Hero at the entrance of a dark labyrinth, golden thread in hand, sword drawn, black sails on a distant sea |
| `achilles` | Achilles | Hero | Achilles, the best of the Achaeans, a head-and-shoulders sculptural bust, the face prominent and centered, a beautiful terrible young warrior in a horsehair-crested bronze helm, jaw set in grief-hardened rage, weathered gold-bronze marble streaked with blood-red oxide, glorious and doomed |
| `patroclus` | Patroclus | Hero | Patroclus, dearest companion of Achilles, a head-and-shoulders sculptural bust, the face prominent and centered, a gentle-eyed warrior wearing the borrowed armor of Achilles a size too large, tenderness and courage mingled, pale marble and dimmed bronze with a faint shadow of death at his shoulder, noble and sacrificial |
| `hector` | Hector | Hero | Hector, bulwark of Troy, a head-and-shoulders sculptural bust, the face prominent and centered, a noble bearded warrior in a horsehair-crested helm, sorrow and resolve in his eyes as if looking back at his city, weathered bronze and sandstone marble dusted with the Trojan plain, dutiful and tragic |
| `ajax` | Ajax | Hero | Ajax the Great, the tower of the Greeks, a head-and-shoulders sculptural bust, the face prominent and centered, an immense grim-jawed warrior half-shadowed by the rim of a vast tower shield, brute strength edged with the first darkness of madness, iron-grey marble and heavy bronze, monumental and brooding |
| `diomedes` | Diomedes | Hero | Diomedes, tamer of horses who wounded the gods, a head-and-shoulders sculptural bust, the face prominent and centered, a fierce clear-eyed young warrior lit by the grey gleam of Athena's favor, spear-scarred and fearless, cool silver-grey marble with bright bronze, martial and blessed |

## mortal

| id | name | archetype | prompt |
|---|---|---|---|
| `alcmene` | Alcmene | Anima | Mortal woman of extraordinary beauty, hiding from divine wrath, mother of heroes |
| `danae` | Danaë | Anima | Princess in bronze tower receiving golden rain from Zeus, destiny descending |
| `arachne` | Arachne | Trickster | Mortal weaver at loom, challenging a goddess, transformed into first spider |
| `io` | Io | Anima | Beautiful woman transformed into white heifer, gadfly tormenting her, endless wandering |
| `andromeda` | Andromeda | Anima | Princess chained to coastal rock, sea-monster approaching, stars in her future |
| `humanity` | Humanity | Hero | Figures of clay rising with divine fire, the first humans looking at the stars |
| `ariadne` | Ariadne | Anima | Ariadne, a head-and-shoulders sculptural bust, the face prominent and centered, a quiet knowing expression, a fine thread wound through her fingers at her shoulder, a crown of seven stars at her brow, pale weathered marble with faint gilding and lichen, gentle and luminous |
| `minos` | Minos | King | Minos, a head-and-shoulders sculptural bust, the face prominent and centered, a stern bearded king with hard sea-grey eyes, a heavy crown of Cretan design, a set of scales faintly incised behind him, weathered pale stone and tarnished bronze, austere and severe |
| `telegonus` | Telegonus | Hero | Telegonus, a head-and-shoulders sculptural bust, the face prominent and centered, an earnest sea-weathered youth with searching eyes, the barbed spine of a ray lashed to a spear at his shoulder, pale salt-bleached marble and dull bronze, hopeful and shadowed by fate |
| `semele` | Semele | Anima | Semele, a head-and-shoulders sculptural bust, the face prominent and centered, caught in the instant of being consumed by divine fire, an expression between ecstasy and terror, pale marble cracking into ember and gold light, scorched, beautiful and doomed |
| `phaethon` | Phaethon | Hero | Phaethon, a head-and-shoulders sculptural bust, the face prominent and centered, a youth in the moment of his fall, hair streaming with fire, eyes wide in terror, scorched bronze and molten gold streaking past him, falling against a burning sky |
| `narcissus` | Narcissus | Shadow | Narcissus, a head-and-shoulders sculptural bust, the face prominent and centered, a beautiful cold youth gazing downward as if into water, his own faint reflection rising toward him, pale marble flecked with gold, narcissus flowers at his shoulder, self-enclosed |
| `actaeon` | Actaeon | Shapeshifter | Actaeon, a head-and-shoulders sculptural bust, the face prominent and centered, a hunter's face mid-transformation as antlers erupt from his brow and fur creeps up his neck, horror dawning in his still-human eyes, pale marble breaking into bronze and stag, dappled green light |
| `tiresias` | Tiresias | Wise Old Man | Tiresias, a head-and-shoulders sculptural bust, the face prominent and centered, an ancient blind seer with clouded eyes and a face holding both masculine and feminine features, two carved serpents entwined at the shoulder, weathered grey marble veined with silver, prophetic stillness |
| `adonis` | Adonis | Anima | Adonis, a head-and-shoulders sculptural bust, the face prominent and centered, an exquisitely beautiful youth with a faint wound at his throat blooming into anemones, serene and already fading, pale rose marble with crimson veining, mortal perfection touched by death |
| `daedalus` | Daedalus | Trickster | Daedalus, master craftsman and maker of the Labyrinth, a head-and-shoulders sculptural bust, the face prominent and centered, an aged inventor's keen sorrowful eyes, great feathered wings strapped at his shoulders, tools and a coil of waxed cord at his collar, weathered marble and aged bronze, ingenious and grief-marked |
| `icarus` | Icarus | Hero | Icarus, the boy who flew too high, a head-and-shoulders sculptural bust, the face prominent and centered, a beautiful youth in the instant of his fall, head tipped back toward the sun, wings of feather and softening wax shedding single feathers, ecstasy turning to terror, pale marble streaked with melting gold, sunlit and doomed |
| `perdix` | Perdix | Shapeshifter | Perdix, the gifted nephew, a head-and-shoulders sculptural bust, the face prominent and centered, a youth mid-transformation as partridge feathers break from his skin and his arms taper into wings, a saw and compass at his shoulder marking his stolen genius, pale marble breaking into mottled bronze plumage, fear and release |
| `agamemnon` | Agamemnon | King | Agamemnon, lord of men, a head-and-shoulders sculptural bust, the face prominent and centered, a proud imperious king wearing a beaten golden funerary mask, hard commanding eyes, a scepter's head at his shoulder, aged gold and dark bronze marble, majestic and doomed to the axe |
| `menelaus` | Menelaus | King | Menelaus, king of Sparta, a head-and-shoulders sculptural bust, the face prominent and centered, a red-haired battle-worn king with a jaw clenched over an old grievance, a spear and Spartan crest implied, weathered bronze and iron-red marble, wronged and relentless |
| `priam` | Priam | Wise Old Man | Priam, the last king of Troy, a head-and-shoulders sculptural bust, the face prominent and centered, an ancient grief-stricken king with a long white beard and hollow eyes, hands rising in supplication at the edge of the frame, pale cracked marble veined with ash and faded gold, sorrowful and dignified |
| `paris` | Paris | Lover | Paris, prince of Troy and bearer of the golden apple, a head-and-shoulders sculptural bust, the face prominent and centered, a beautiful careless youth holding a single golden apple near his shoulder, a bow slung behind him, soft rose-gold marble with warm bronze, alluring and ruinous |
| `helen` | Helen | Anima | Helen of Troy, the face that launched a thousand ships, a head-and-shoulders sculptural bust, the face prominent and centered, a woman of unbearable beauty with a distant sorrowful gaze, faint reflections of burning ships in her eyes, luminous pale marble with fine gilding, exquisite and blamed |
| `andromache` | Andromache | Anima | Andromache, wife of Hector, a head-and-shoulders sculptural bust, the face prominent and centered, a tender grieving woman with a small infant's hand implied at her shoulder and a veil half-drawn, an expression of enduring loss, soft grey-white marble with muted bronze, devoted and bereaved |
| `briseis` | Briseis | Anima | Briseis, the war-prize of Achilles, a head-and-shoulders sculptural bust, the face prominent and centered, a beautiful captive woman with downcast tear-bright eyes and a broken bridal wreath at her shoulder, pale marble dimmed with grey and faint bronze, sorrowful and unfree |
| `penelope` | Penelope | Anima | Penelope, the faithful weaver of Ithaca, a head-and-shoulders sculptural bust, the face prominent and centered, a patient clear-eyed queen with fine threads of an unfinished web drifting from her fingers at her shoulder, quiet unbreakable resolve, warm ivory marble with soft gold, steadfast and wise |
| `telemachus` | Telemachus | Hero | Telemachus, the son who sought his father, a head-and-shoulders sculptural bust, the face prominent and centered, an earnest young man on the edge of manhood in a traveler's cloak with a spear implied, searching hopeful eyes, pale marble and fresh bronze, youthful and resolute |
| `nausicaa` | Nausicaa | Anima | Nausicaa, princess of the Phaeacians, a head-and-shoulders sculptural bust, the face prominent and centered, a bright kind young princess with sea-wind in her hair and a folded white garment at her shoulder, an open generous gaze, pale marble washed with sea-green and warm gold, gracious and luminous |
