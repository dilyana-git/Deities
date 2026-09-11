/* ── Guided Sky tour data ────────────────────────────────────────────────
   Each tour is a short narrative told across a sequence of "beats". Every
   beat names a `fig` (a real node id in mythology.js) and the line of
   narration shown while that figure's constellation is on screen. `name`,
   `epithet`, and `category` are looked up from mythology.js at render time —
   keep this file to ids + prose so the two never drift out of sync.

   `hero` names the figure the tale follows — the one who burns at the centre
   of the Guided Sky constellation while the chapters scatter around it, and
   the one the reading column's "Following …" line credits. It is an editorial
   choice, not the first beat: several tours open on the god who sets things in
   motion rather than on their protagonist (the Argonautica opens on Hera, and
   is Jason's). Absent, GuidedSky falls back to the first beat's figure. */
export const TOURS = [
  { id: 'titans', title: 'The Fall of the Titans', kicker: 'A Cosmogony', hero: 'cronus',
    beats: [
      { fig: 'chaos',  text: "In the beginning there was neither earth nor sky nor sea — only Chaos, the vast and yawning dark, the first gap out of which all things would one day be drawn." },
      { fig: 'gaia',   text: "Out of that emptiness rose Gaia, the broad-breasted Earth, the firm ground beneath all that lives. From herself alone, without seed or mate, she brought forth the world's first shapes." },
      { fig: 'uranus', text: "She bore Uranus, the star-strewn Sky, to cover her on every side — and then took her own son as her husband, in the first marriage of all: the wedding of Earth and Heaven." },
      { fig: 'cronus', text: "But Uranus despised the children she bore and crushed them back into the dark of her body. So Gaia forged a jagged sickle, and her youngest, Cronus, unmanned his father and seized the cosmos for his own." },
      { fig: 'rhea',   text: "Warned that his own child would unseat him in turn, Cronus swallowed each baby that Rhea bore — until, grief-stricken, she hid the last away in a Cretan cave and gave her husband a swaddled stone to gulp down instead." },
      { fig: 'zeus',   text: "That hidden child was Zeus. Grown to his strength, he forced his father to disgorge the swallowed gods, and in a ten-year war he cast the Titans down into the bottomless pit of Tartarus." },
    ] },

  { id: 'night', title: 'The Children of Night', kicker: 'A Genealogy of Dread', hero: 'nyx',
    beats: [
      { fig: 'nyx',      text: "Nyx, the Lady of Night, is among the eldest powers of all — so ancient and so dread that even Zeus, king of the gods, feared to do anything that might cross her." },
      { fig: 'erebus',   text: "With Erebus, the deep primordial darkness, she keeps the unlit places between the worlds; and from those two shadows, strangely, came the shining Day and the bright upper air." },
      { fig: 'thanatos', text: "From her own darkness, needing no father, she bore Thanatos — Death himself, iron-hearted and pitiless, who carries the breathless across the last threshold and takes no offering to be turned aside." },
      { fig: 'hypnos',   text: "And she bore his gentler twin, Hypnos — Sleep, who walks the world on silent feet and can lay even the king of the gods to rest, for nothing under heaven may refuse him forever." },
      { fig: 'nemesis',  text: "She bore Nemesis too, the cold measure of the universe, who watches the proud and brings down the weight that balances every fortune swollen past its rightful due." },
      { fig: 'eris',     text: "And Eris, Strife, the mother of quarrel and ruin — whose single golden apple, tossed unbidden among the goddesses, would one day set the whole world to war beneath the walls of Troy." },
    ] },

  { id: 'gorgon', title: 'Perseus & the Gorgon', kicker: "A Hero's Tale", hero: 'perseus',
    beats: [
      { fig: 'poseidon',  text: "It began with a violation: Poseidon, lord of the sea, took the lovely maiden Medusa by force within the sacred walls of Athena's own temple." },
      { fig: 'medusa',    text: "Unable to strike at a god, Athena turned her wrath upon the girl instead — and Medusa's glorious hair became a nest of hissing serpents, her gaze a thing that froze every living man to stone." },
      { fig: 'athena',    text: "Yet the same goddess who made the monster would arm the hero to end her. Athena lent Perseus her mirror-bright shield, that he might look upon Medusa and still live." },
      { fig: 'perseus',   text: "Watching only her reflection in the polished bronze, Perseus crept upon the sleeping Gorgon and struck off her head — and from the severed neck leapt the winged horse Pegasus, beauty born of blood." },
      { fig: 'andromeda', text: "With that same terrible head he turned a rising sea-beast to stone and freed Andromeda from her chains — becoming one of the very few heroes ever to win a happy ending." },
    ] },

  { id: 'odyssey', title: 'The Long Way Home', kicker: 'An Epic Voyage', hero: 'odysseus',
    beats: [
      { fig: 'odysseus',  text: "Odysseus, cleverest of the Greeks, broke ten-walled Troy with the trick of the wooden horse — and then turned for home, where the wide sea would turn ten more years against him." },
      { fig: 'poseidon',  text: "For he had blinded the Cyclops Polyphemus, a son of Poseidon; and the sea-god swore in his fury that the wanderer would not look upon his island of Ithaca for a weary age." },
      { fig: 'circe',     text: "On the green isle of Aiaia the enchantress Circe touched his crew with her wand and made them swine — then, her magic broken against him, took the hero as her lover and kept him a year in her hall." },
      { fig: 'scylla',    text: "In the narrow strait he passed six-mouthed Scylla, who reached down from her cliff and snatched six screaming men from the deck before he could so much as draw his sword." },
      { fig: 'charybdis', text: "Across the same water her sister Charybdis swallowed the whole sea and spat it roaring back; between the two terrors there was no safe passage, and he threaded the deadly gap by a hair." },
      { fig: 'helios',    text: "Marooned and starving, his men slaughtered the forbidden cattle of the Sun — and Helios, who sees all that is done beneath the light, swore that not one of them would ever come home." },
      { fig: 'calypso',   text: "Wrecked and alone, the last of all his fleet, he was held seven long years by the nymph Calypso, who loved him and offered him a deathless, ageless life — which, weeping for home, he refused." },
      { fig: 'athena',    text: "Through every trial it was grey-eyed Athena, his unwavering champion, who watched over him — and won the wanderer, at the very last, his long-denied return to Ithaca." },
    ] },

  { id: 'theseus', title: 'Theseus & the Labyrinth', kicker: 'A Cretan Legend', hero: 'theseus',
    beats: [
      { fig: 'poseidon', text: "Poseidon sent a magnificent white bull surging from the waves as a sign of favor to King Minos of Crete — but Minos, struck by the beast's beauty, kept it for himself instead of sacrificing it as the god demanded. For that broken promise, the sea-god's curse would fall not on the king but on his house." },
      { fig: 'minotaur', text: "In punishment, Poseidon drove the queen Pasiphae to a monstrous passion for the bull, and from that union was born the Minotaur — a creature with a man's body and a bull's black head, raging and insatiable. Minos imprisoned it in the Labyrinth, a maze so cunning that no one who entered could ever find the way out, and fed it on Athenian youths sent across the sea as tribute." },
      { fig: 'ariadne',  text: "When Theseus came among the third tribute, the princess Ariadne saw him from the walls and loved him at once — fiercely enough to betray her own father and her own blood. She pressed into his hand a ball of thread and a single whispered instruction: tie the end at the door, unwind it as you go, and follow it back to the light." },
      { fig: 'theseus',  text: "In the deepest chamber of the maze Theseus found the bellowing Minotaur and killed it with his bare fists, then followed the thread back through the winding dark to the open air. He sailed at once with Ariadne — and left her sleeping on the shore of Naxos, his triumph forever shadowed by a betrayal he never explained. The hero who conquered the labyrinth could not find his way through his own heart." },
    ] },

  { id: 'argonautica', title: 'Jason & the Golden Fleece', kicker: 'A Quest for Glory', hero: 'jason',
    beats: [
      { fig: 'hera',            text: "Hera, queen of the gods, loathed the usurper King Pelias for failing to honor her shrine. She set young Jason upon an errand she meant to be his death — to sail beyond the edge of the known world and bring back the Golden Fleece that hung in a sacred grove in far Colchis, guarded by a dragon that never slept." },
      { fig: 'jason',           text: "But Jason did not go alone. He gathered the greatest heroes of the age — Heracles, Orpheus, Castor and Polydeuces, Atalanta — aboard the ship Argo, and sailed east into waters no Greek had crossed before. Through the Clashing Rocks that ground ships to splinters, past the war-like Amazons and the bronze-beaked Stymphalian birds, all the way to Colchis at the far shore of the Black Sea." },
      { fig: 'medea',           text: "There the sorceress Medea, granddaughter of the Sun, was struck by Aphrodite's arrow with a sudden and helpless love for the stranger. She betrayed her own father, her own country, and at last her own brother to save him — giving everything she had for a man who would one day cast her aside for a younger bride, to his utter ruin and her terrible revenge." },
      { fig: 'colchian_dragon', text: "By her drugs and her whispered charms, Medea lulled the sleepless Colchian dragon — coiled a hundred times about the sacred oak — into its first and only slumber. Jason lifted the gleaming Fleece from the bough while the great serpent's eyes closed at last, and the quest that was meant to kill him became the glory that made his name." },
    ] },

  { id: 'labours', title: 'The Labours of Heracles', kicker: 'Twelve Trials', hero: 'heracles',
    beats: [
      { fig: 'heracles',       text: "Driven to madness by the unrelenting hatred of Hera, Heracles killed his own wife Megara and their children with his bare hands, not knowing what he did until the blood was already on the floor. To purge that unspeakable horror, the Oracle at Delphi bound him to twelve impossible labours in service to his cousin Eurystheus — a man far lesser than himself, which was precisely the punishment." },
      { fig: 'nemean_lion',    text: "The first labour sent him against the Nemean Lion, a monstrous beast whose golden hide turned aside every blade, every arrow, every spear. Finding no weapon in the world that could pierce it, Heracles tracked the lion to its cave, blocked the second entrance with a boulder, and strangled it with his bare arms. He skinned the beast with its own claws and wore the impenetrable pelt as armor for the rest of his life." },
      { fig: 'lernaean_hydra', text: "In the black marshes of Lerna he faced the Hydra, a serpent of many heads that answered each severed neck by sprouting two more, hissing and snapping, the stumps regenerating faster than any sword could cut. Only by enlisting his nephew Iolaus to sear each raw stump with a burning brand before it could grow anew did Heracles at last bring the writhing horror to stillness — and dipped his arrows in its venom, which never lost its poison." },
      { fig: 'geryon',         text: "At the far western edge of the world, beyond the Pillars he himself had set, Heracles slew the three-bodied giant Geryon with a single arrow dipped in Hydra venom that pierced all three torsos at once. He killed the two-headed hound Orthrus that guarded the red cattle, and drove the great herd all the long way home across mountains and rivers and the breadth of the known world — the longest road of all the labours." },
      { fig: 'ladon',          text: "He came to the garden of the Hesperides at the sunset rim of the world, where golden apples grew on a tree guarded by the hundred-headed serpent Ladon, who never once closed all its eyes in sleep. Some say Heracles slew the dragon; others that he tricked Atlas into fetching the apples while he held up the sky in the Titan's place — and then tricked Atlas into taking the weight back." },
      { fig: 'cerberus',       text: "And for the last and hardest labour, Heracles descended living into the realm of the dead — past the river Styx, past the shades of the unburied, past the judges and the fields of asphodel — and with nothing but his lion-skin and his own strength, he seized Cerberus, the three-headed guardian of the underworld, and dragged the howling beast up into the light of day. Even Hades stood aside. The man who had begun in madness and blood ended his labours at the very threshold of death, and walked back out." },
    ] },

  { id: 'metamorphoses', title: 'Bodies Changed', kicker: 'Tales of Transformation', hero: 'daphne',
    beats: [
      { fig: 'daphne',   text: "Fleeing the god Apollo through the woods, the nymph Daphne begged the earth to take from her the beauty that doomed her — and felt bark close over her heart as she became the laurel tree." },
      { fig: 'io',       text: "Io, loved by Zeus and hidden in the shape of a white heifer, was given no rest by jealous Hera, who set a single stinging fly to drive her wandering across the whole width of the world." },
      { fig: 'callisto', text: "Callisto, seduced by Zeus and then turned into a shaggy bear, was almost killed by her own hunting son — until Zeus caught them both up and set them among the stars as the Bears." },
      { fig: 'arachne',  text: "Arachne wove the cruelties of the gods so flawlessly that Athena, unable to fault the work, struck her down — and where she hanged herself, shrank her into the first spider, to spin forever." },
      { fig: 'medusa',   text: "Medusa, punished for a violation that was never her fault, wore serpents for hair and carried stone in her gaze, exiled to the world's edge among the statues of the men who had looked on her." },
      { fig: 'scylla',   text: "And Scylla, a sea-nymph poisoned by a rival's envy, watched in horror as a ring of baying dogs burst howling from her waist — and became the six-mouthed terror that haunts the strait." },
    ] },

  { id: 'brood', title: 'The Brood of Typhon', kicker: 'A Lineage of Monsters', hero: 'typhon',
    beats: [
      { fig: 'typhon',         text: "Typhon, the last and most terrible child of Gaia, was storm-born and crowned with a hundred serpent heads that spoke in the voices of every beast. So vast was he that his head scraped the stars and his outstretched arms touched east and west at once, and when he rose against Olympus the gods themselves fled in terror — all but Zeus, who stood alone against him with nothing but his thunderbolts and the desperate courage of a king who knows that if he falls, everything falls." },
      { fig: 'echidna',        text: "With Echidna he made his den — she who was half a lovely dark-eyed woman from the waist up and half a monstrous speckled serpent from the waist down, dwelling in a cave beneath the earth far from gods and men. Together, in that sunless place, they sired the whole brood of horrors that the heroes of later ages would be born to hunt and to kill — a lineage of monsters that would test the courage of every generation." },
      { fig: 'cerberus',       text: "From them came Cerberus, the three-headed hound of Hades, whose mane writhed with serpents and whose tail was a living snake. He was set to guard the one gate of the underworld — fawning with all three heads upon the newly dead who enter, and turning with bared fangs on any living soul who dares to leave. Only Heracles ever dragged him into the daylight, and only Orpheus ever charmed him to sleep with music." },
      { fig: 'lernaean_hydra', text: "And the Lernaean Hydra, which made its lair in the black marshes of Lerna — a vast water-serpent of many heads, each one dripping venom so potent that even its breath could kill. For every head that Heracles struck away, two more burst hissing from the stump, until the hero learned to sear each raw neck with fire before it could grow anew. The immortal head he buried under a stone that is said to lie there still." },
      { fig: 'chimera',        text: "And the Chimera, the impossible beast of three natures fused into one — the head and chest of a lion, a goat's head rising from its spine, and a serpent for a tail, all of it breathing living fire from a single throat. It ravaged the fields of Lycia until the hero Bellerophon, riding the winged horse Pegasus, drove a lead-tipped lance down its fiery gullet and let its own flame melt the metal and choke the life from it." },
      { fig: 'sphinx',         text: "And the Sphinx, most cunning of the brood — lion-bodied, eagle-winged, and woman-faced — who crouched on a rock before the gates of Thebes and put a riddle to every traveler who sought to pass. None could answer it, and she strangled them all, one by one, until young Oedipus came and spoke the word 'man' — and the Sphinx, undone by the simplest truth, hurled herself from the cliff and was broken on the rocks below." },
    ] },

  { id: 'phorcys', title: 'The House of Phorcys & Ceto', kicker: 'A Genealogy of Terror', hero: 'phorcys',
    beats: [
      { fig: 'pontus',  text: "Pontus, the primal Sea, was born of Gaia alone before there was any sailor to cross him or any god to rule his waves — the salt deep in person, grey and unfathomable, the oldest face of the ocean. From him descends the elder bloodline of sea powers, far older than Poseidon's bright trident." },
      { fig: 'phorcys', text: "His son Phorcys, grey-bearded god of the sea's hidden dangers — the unseen reef that splits a hull, the sudden whirlpool, the dark unfathomed deep where no light reaches — took his own sister Ceto to wife. Together they kept the treacherous waters at the edge of the known world, where the maps ran out and the monsters began." },
      { fig: 'ceto',    text: "Ceto, whose very name became the Greek word for sea-monster, bore Phorcys a lineage of terrors unmatched in all mythology. She is the mother of nightmares — not the grand cosmic horrors of Typhon's line, but the older, colder things that wait in the dark water and the fog at the world's edge, patient and hungry and very, very old." },
      { fig: 'graeae',  text: "First came the Graeae, the Grey Sisters — Pemphredo, Enyo, and Deino — born already old and withered, with grey hair from their first breath. Between the three of them they shared a single eye and a single tooth, passed from groping hand to groping hand. Perseus stole the eye to force them to reveal the road to their Gorgon sisters — and some say he flung it into the lake, leaving them blind forever." },
      { fig: 'gorgons', text: "Then the Gorgons — Stheno, Euryale, and Medusa — serpent-haired and stone-gazing, dwelling at the world's edge surrounded by the petrified shapes of men who had looked upon them. Two were immortal and could never be harmed; but the third, ill-fated Medusa, was mortal — and it was her head that Perseus came to take, and from her severed neck that Pegasus and golden Chrysaor leapt, born of the blood." },
      { fig: 'ladon',   text: "And Ladon, the hundred-headed serpent that Hera set to guard the golden apples of the Hesperides at the sunset rim of the world. He coiled about the tree in an embrace that never loosened, and his hundred pairs of eyes took turns sleeping so that some were always open — the perfect watchman, who rested in shifts with himself. When Heracles came for the apples, even that vigilance was not enough." },
    ] },

  { id: 'ovid', title: 'Tales from Ovid', kicker: 'Fables of Change', hero: 'narcissus',
    beats: [
      { fig: 'daphne',         text: "Daphne, fleeing Apollo's pursuit, chose to lose herself rather than be caught — and as the god's hands closed upon her, her body stiffened into the first laurel tree." },
      { fig: 'actaeon',        text: "Actaeon, a hunter who by sheer ill chance glimpsed the goddess Artemis bathing, was turned into a stag for the trespass — and run down and torn apart by his own faithful hounds." },
      { fig: 'narcissus',      text: "Narcissus, so cold that he scorned every lover, was punished by Nemesis to fall hopelessly in love with his own reflection, and wasted away by the pool into the flower that bears his name." },
      { fig: 'echo',           text: "Echo, the nymph cursed to do nothing but repeat the last words of others, loved him in vain — and faded in her grief until nothing was left of her at all but a voice." },
      { fig: 'arachne',        text: "Arachne, who out-wove Athena herself and dared to picture the cruelties of the gods, was struck down for the truth of it and shrunk into the first spider, condemned to spin forever." },
      { fig: 'tiresias',       text: "Tiresias, who lived seven years as a woman before returning to a man, settled a quarrel of the gods with his answer — and was blinded by Hera for it, then given prophecy by Zeus in recompense." },
      { fig: 'adonis',         text: "Adonis, a youth so beautiful that two goddesses warred over him, was gored on a wild boar's tusk and died in Aphrodite's arms — and from his blood she raised the wind-scattered anemone." },
      { fig: 'hermaphroditus', text: "Hermaphroditus, seized in the still water by the desperate nymph Salmacis, was fused with her by the gods into a single body, both man and woman and wholly neither." },
    ] },
]
