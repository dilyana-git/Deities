/* ── Guided Sky tour data ────────────────────────────────────────────────
   Each tour is a short narrative told across a sequence of "beats". Every
   beat names a `fig` (a real node id in mythology.js) and the line of
   narration shown while that figure's constellation is on screen. `name`,
   `epithet`, and `category` are looked up from mythology.js at render time —
   keep this file to ids + prose so the two never drift out of sync. */
export const TOURS = [
  { id: 'titans', title: 'The Fall of the Titans', kicker: 'A Cosmogony',
    beats: [
      { fig: 'chaos',  text: "In the beginning there was neither earth nor sky nor sea — only Chaos, the vast and yawning dark, the first gap out of which all things would one day be drawn." },
      { fig: 'gaia',   text: "Out of that emptiness rose Gaia, the broad-breasted Earth, the firm ground beneath all that lives. From herself alone, without seed or mate, she brought forth the world's first shapes." },
      { fig: 'uranus', text: "She bore Uranus, the star-strewn Sky, to cover her on every side — and then took her own son as her husband, in the first marriage of all: the wedding of Earth and Heaven." },
      { fig: 'cronus', text: "But Uranus despised the children she bore and crushed them back into the dark of her body. So Gaia forged a jagged sickle, and her youngest, Cronus, unmanned his father and seized the cosmos for his own." },
      { fig: 'rhea',   text: "Warned that his own child would unseat him in turn, Cronus swallowed each baby that Rhea bore — until, grief-stricken, she hid the last away in a Cretan cave and gave her husband a swaddled stone to gulp down instead." },
      { fig: 'zeus',   text: "That hidden child was Zeus. Grown to his strength, he forced his father to disgorge the swallowed gods, and in a ten-year war he cast the Titans down into the bottomless pit of Tartarus." },
    ] },

  { id: 'night', title: 'The Children of Night', kicker: 'A Genealogy of Dread',
    beats: [
      { fig: 'nyx',      text: "Nyx, the Lady of Night, is among the eldest powers of all — so ancient and so dread that even Zeus, king of the gods, feared to do anything that might cross her." },
      { fig: 'erebus',   text: "With Erebus, the deep primordial darkness, she keeps the unlit places between the worlds; and from those two shadows, strangely, came the shining Day and the bright upper air." },
      { fig: 'thanatos', text: "From her own darkness, needing no father, she bore Thanatos — Death himself, iron-hearted and pitiless, who carries the breathless across the last threshold and takes no offering to be turned aside." },
      { fig: 'hypnos',   text: "And she bore his gentler twin, Hypnos — Sleep, who walks the world on silent feet and can lay even the king of the gods to rest, for nothing under heaven may refuse him forever." },
      { fig: 'nemesis',  text: "She bore Nemesis too, the cold measure of the universe, who watches the proud and brings down the weight that balances every fortune swollen past its rightful due." },
      { fig: 'eris',     text: "And Eris, Strife, the mother of quarrel and ruin — whose single golden apple, tossed unbidden among the goddesses, would one day set the whole world to war beneath the walls of Troy." },
    ] },

  { id: 'gorgon', title: 'Perseus & the Gorgon', kicker: "A Hero's Tale",
    beats: [
      { fig: 'poseidon',  text: "It began with a violation: Poseidon, lord of the sea, took the lovely maiden Medusa by force within the sacred walls of Athena's own temple." },
      { fig: 'medusa',    text: "Unable to strike at a god, Athena turned her wrath upon the girl instead — and Medusa's glorious hair became a nest of hissing serpents, her gaze a thing that froze every living man to stone." },
      { fig: 'athena',    text: "Yet the same goddess who made the monster would arm the hero to end her. Athena lent Perseus her mirror-bright shield, that he might look upon Medusa and still live." },
      { fig: 'perseus',   text: "Watching only her reflection in the polished bronze, Perseus crept upon the sleeping Gorgon and struck off her head — and from the severed neck leapt the winged horse Pegasus, beauty born of blood." },
      { fig: 'andromeda', text: "With that same terrible head he turned a rising sea-beast to stone and freed Andromeda from her chains — becoming one of the very few heroes ever to win a happy ending." },
    ] },

  { id: 'odyssey', title: 'The Long Way Home', kicker: 'An Epic Voyage',
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

  { id: 'theseus', title: 'Theseus & the Labyrinth', kicker: 'A Cretan Legend',
    beats: [
      { fig: 'poseidon', text: "Poseidon — whom some name the true father of Theseus — sent a magnificent white bull rising from the waves to Crete, a gift that proud King Minos could not bring himself to give back." },
      { fig: 'minotaur', text: "In punishment the queen of Crete was cursed to bear the Minotaur: a man with a bull's head and a beast's hunger, shut away in the winding Labyrinth and fed on youths sent in tribute." },
      { fig: 'ariadne',  text: "When Theseus came among the tribute, the princess Ariadne fell in love at the sight of him, and slipped into his hand a single ball of thread to unwind behind him through the maze." },
      { fig: 'theseus',  text: "He killed the beast at the heart of the Labyrinth and followed the thread back to the light — then sailed away and left Ariadne sleeping on the shore of Naxos, his triumph shadowed by betrayal." },
    ] },

  { id: 'argonautica', title: 'Jason & the Golden Fleece', kicker: 'A Quest for Glory',
    beats: [
      { fig: 'hera',            text: "Hera, who loathed the usurper King Pelias, set young Jason upon an errand meant to destroy him: to sail to the world's end and carry home the Golden Fleece." },
      { fig: 'jason',           text: "He gathered the greatest heroes of the age aboard the ship Argo and sailed east into the unknown, all the way to far Colchis, where the Fleece hung guarded in a sacred grove." },
      { fig: 'medea',           text: "There the sorceress Medea, struck with sudden and helpless love, betrayed her own father to save him — giving everything for a man who would one day cast her aside, to his utter ruin." },
      { fig: 'colchian_dragon', text: "By her drugs and her whispered charms she lulled the sleepless dragon coiled about the Fleece into its first and only slumber, and the prize was lifted from the tree at last." },
    ] },

  { id: 'labours', title: 'The Labours of Heracles', kicker: 'Twelve Trials',
    beats: [
      { fig: 'heracles',       text: "Driven to madness by the hatred of Hera, Heracles killed his own wife and children with his bare hands — and to purge that horror he was bound to twelve impossible labours." },
      { fig: 'nemean_lion',    text: "First he strangled the Nemean Lion, whose golden hide turned aside every blade; finding no weapon could pierce it, he skinned the beast with its own claws and wore the pelt as armour ever after." },
      { fig: 'lernaean_hydra', text: "He faced the Lernaean Hydra, which sprouted two heads for every one he struck away — and overcame it only by searing each raw stump with fire before it could grow anew." },
      { fig: 'geryon',         text: "At the far western edge of the world he slew the three-bodied giant Geryon, killed the hound that guarded him, and drove the great herd of red cattle all the long way home." },
      { fig: 'ladon',          text: "He took the golden apples of the Hesperides from the coils of Ladon, the hundred-headed serpent that never once closed all its eyes in sleep." },
      { fig: 'cerberus',       text: "And for the last and hardest labour, he went down living into the land of the dead and dragged its three-headed guardian, Cerberus, up into the light of day." },
    ] },

  { id: 'metamorphoses', title: 'Bodies Changed', kicker: 'Tales of Transformation',
    beats: [
      { fig: 'daphne',   text: "Fleeing the god Apollo through the woods, the nymph Daphne begged the earth to take from her the beauty that doomed her — and felt bark close over her heart as she became the laurel tree." },
      { fig: 'io',       text: "Io, loved by Zeus and hidden in the shape of a white heifer, was given no rest by jealous Hera, who set a single stinging fly to drive her wandering across the whole width of the world." },
      { fig: 'callisto', text: "Callisto, seduced by Zeus and then turned into a shaggy bear, was almost killed by her own hunting son — until Zeus caught them both up and set them among the stars as the Bears." },
      { fig: 'arachne',  text: "Arachne wove the cruelties of the gods so flawlessly that Athena, unable to fault the work, struck her down — and where she hanged herself, shrank her into the first spider, to spin forever." },
      { fig: 'medusa',   text: "Medusa, punished for a violation that was never her fault, wore serpents for hair and carried stone in her gaze, exiled to the world's edge among the statues of the men who had looked on her." },
      { fig: 'scylla',   text: "And Scylla, a sea-nymph poisoned by a rival's envy, watched in horror as a ring of baying dogs burst howling from her waist — and became the six-mouthed terror that haunts the strait." },
    ] },

  { id: 'brood', title: 'The Brood of Typhon', kicker: 'A Lineage of Monsters',
    beats: [
      { fig: 'typhon',         text: "Typhon, storm-born and crowned with a hundred serpent heads, was the last and most terrible child of Gaia — a monster so vast that he rose to challenge Zeus for the throne of heaven itself." },
      { fig: 'echidna',        text: "With Echidna, half-lovely-woman and half-monstrous-serpent, he sired in a deep cave the whole brood of horrors that the heroes of later ages would be born to hunt and to kill." },
      { fig: 'cerberus',       text: "From them came Cerberus, the three-headed hound, set to guard the one gate of the underworld — fawning upon the dead who enter, and tearing apart any who dare to leave." },
      { fig: 'lernaean_hydra', text: "And the Lernaean Hydra of the black marsh, which answered every severed head by sprouting two more in its place, until at last it was burned into stillness." },
      { fig: 'chimera',        text: "And the Chimera, an impossible beast of three natures — lion, goat, and serpent — that breathed living fire from a single throat across the fields of Lycia." },
      { fig: 'sphinx',         text: "And the Sphinx, lion-bodied and winged, who crouched before Thebes and strangled every traveller who could not answer the deadly riddle she set." },
    ] },

  { id: 'phorcys', title: 'The House of Phorcys & Ceto', kicker: 'A Genealogy of Terror',
    beats: [
      { fig: 'pontus',  text: "Pontus, the primal Sea, was born of Earth alone before there was any sailor to cross him — the salt deep in person, the oldest face of the ocean." },
      { fig: 'phorcys', text: "His son Phorcys, grey god of the sea's hidden dangers — the unseen reef, the whirlpool, the dark unfathomed deep — took his own sister Ceto to wife." },
      { fig: 'ceto',    text: "Ceto, the mother of sea-terrors whose very name became the word for monster, bore him a long lineage of horrors gathered at the edge of the world." },
      { fig: 'graeae',  text: "First the Grey Sisters, born already old and withered, who share a single eye and a single tooth between them, passed from hand to groping hand." },
      { fig: 'gorgons', text: "Then the Gorgons, serpent-haired and stone-gazing — and among the three immortal sisters, one alone who could die: ill-fated Medusa." },
      { fig: 'ladon',   text: "And Ladon, the hundred-headed serpent that never slept, coiled forever about the tree of golden apples at the sunset rim of the world." },
    ] },

  { id: 'ovid', title: 'Tales from Ovid', kicker: 'Fables of Change',
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
