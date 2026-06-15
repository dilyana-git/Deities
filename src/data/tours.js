/* ── Guided Sky tour data ────────────────────────────────────────────────
   Each tour is a short narrative told across a sequence of "beats". Every
   beat names a `fig` (a real node id in mythology.js) and the line of
   narration shown while that figure's constellation is on screen. `name`,
   `epithet`, and `category` are looked up from mythology.js at render time —
   keep this file to ids + prose so the two never drift out of sync. */
export const TOURS = [
  { id: 'titans', title: 'The Fall of the Titans', kicker: 'A Cosmogony',
    beats: [
      { fig: 'chaos',  text: 'In the beginning was only Chaos — the formless gap from which all becoming erupts.' },
      { fig: 'gaia',   text: 'From the void rose Gaia, the broad-breasted Earth, mother of all that has form.' },
      { fig: 'uranus', text: 'Gaia bore Uranus, the starry Sky, and took him as her equal and her mate.' },
      { fig: 'cronus', text: 'Their son Cronus seized a sickle, unmanned his father, and claimed the cosmos as his own.' },
      { fig: 'rhea',   text: 'Cronus swallowed each child Rhea bore him — until she hid one away and fed him a stone.' },
      { fig: 'zeus',   text: 'That hidden child was Zeus, who freed his siblings and cast the Titans down into Tartarus.' },
    ] },

  { id: 'night', title: 'The Children of Night', kicker: 'A Genealogy of Dread',
    beats: [
      { fig: 'nyx',      text: 'Nyx, Lady of Night, is so old and so dread that even Zeus feared to cross her.' },
      { fig: 'erebus',   text: 'With Erebus, the deep darkness, she shares the unlit places between the worlds.' },
      { fig: 'thanatos', text: 'From her alone came Thanatos — Death, who carries the breathless away.' },
      { fig: 'hypnos',   text: 'And Hypnos, gentle Sleep, his twin, who can still even the king of the gods.' },
      { fig: 'nemesis',  text: 'She bore Nemesis too, the weight that balances every excess of fortune.' },
      { fig: 'eris',     text: 'And Eris, Strife, whose single golden apple would set the world to war.' },
    ] },

  { id: 'gorgon', title: 'Perseus & the Gorgon', kicker: "A Hero's Tale",
    beats: [
      { fig: 'poseidon',  text: "Poseidon lay with the maiden Medusa within Athena's own temple." },
      { fig: 'medusa',    text: 'For that desecration Medusa was cursed — her hair to serpents, her gaze to stone.' },
      { fig: 'athena',    text: 'Athena, wronged, later armed the hero who would end the monster she had made.' },
      { fig: 'perseus',   text: "Perseus, watching only her reflection, struck off Medusa's head." },
      { fig: 'andromeda', text: 'With that same severed head he turned a sea-beast to rock, and won Andromeda.' },
    ] },

  { id: 'odyssey', title: 'The Long Way Home', kicker: 'An Epic Voyage',
    beats: [
      { fig: 'odysseus',  text: 'Odysseus, who broke Troy with the wooden horse, turned for home — and the sea turned ten years against him.' },
      { fig: 'poseidon',  text: 'For blinding the Cyclops, his son, Poseidon swore the wanderer would not see Ithaca for an age.' },
      { fig: 'circe',     text: 'On the isle of Aiaia, the witch Circe made swine of his crew, then kept him a year in her hall.' },
      { fig: 'scylla',    text: 'In the narrow strait, six-mouthed Scylla snatched six screaming men from his deck.' },
      { fig: 'charybdis', text: 'Across the water her sister Charybdis drank the whole sea and spat it back; he threaded the gap between.' },
      { fig: 'helios',    text: 'His starving men slaughtered the cattle of the Sun, and Helios swore they would never come home.' },
      { fig: 'calypso',   text: 'Wrecked and alone, he was held seven years by Calypso, who offered him a deathless life he refused.' },
      { fig: 'athena',    text: 'Only grey-eyed Athena, his unwavering champion, won him at last his long-denied return.' },
    ] },

  { id: 'theseus', title: 'Theseus & the Labyrinth', kicker: 'A Cretan Legend',
    beats: [
      { fig: 'poseidon', text: "Poseidon — some say Theseus's true father — sent a white bull from the waves to Crete." },
      { fig: 'minotaur', text: "From that bull was born the Minotaur, a man with a bull's head, caged in the winding Labyrinth." },
      { fig: 'ariadne',  text: 'The princess Ariadne, in love, gave him a thread to unwind behind him through the maze.' },
      { fig: 'theseus',  text: "Theseus slew the beast at the maze's heart, followed the thread to the light — then abandoned Ariadne sleeping on an island." },
    ] },

  { id: 'argonautica', title: 'Jason & the Golden Fleece', kicker: 'A Quest for Glory',
    beats: [
      { fig: 'hera',            text: 'Hera, who loathed King Pelias, set Jason upon the long quest for the Golden Fleece.' },
      { fig: 'jason',           text: 'Jason gathered the greatest heroes aboard the Argo and sailed east to far Colchis.' },
      { fig: 'medea',           text: 'There the sorceress Medea, struck with sudden love, betrayed her own father to aid him — and he would one day cast her aside, to his ruin.' },
      { fig: 'colchian_dragon', text: 'She charmed the sleepless dragon coiled about the Fleece into slumber, and the prize was won.' },
    ] },

  { id: 'labours', title: 'The Labours of Heracles', kicker: 'Twelve Trials',
    beats: [
      { fig: 'heracles',       text: 'Driven to madness by Hera, Heracles killed his own children — and was bound to twelve labours in penance.' },
      { fig: 'nemean_lion',    text: 'He strangled the Nemean Lion, whose golden hide turned every blade, and wore its pelt thereafter.' },
      { fig: 'lernaean_hydra', text: 'He seared the necks of the Lernaean Hydra, which grew two heads for each he struck away.' },
      { fig: 'geryon',         text: "At the world's western edge he slew three-bodied Geryon and drove home the red cattle." },
      { fig: 'ladon',          text: 'He took the golden apples that the sleepless serpent Ladon coiled to guard.' },
      { fig: 'cerberus',       text: 'And for the last, he dragged Cerberus himself, alive, up from the doorway of the dead.' },
    ] },

  { id: 'metamorphoses', title: 'Bodies Changed', kicker: 'Tales of Transformation',
    beats: [
      { fig: 'daphne',   text: 'Fleeing Apollo, the nymph Daphne begged to lose the beauty that doomed her — and became the laurel.' },
      { fig: 'io',       text: 'Io, loved by Zeus and hidden as a white heifer, was driven across the earth by a single stinging fly.' },
      { fig: 'callisto', text: 'Callisto, seduced and then turned to a bear, was set among the stars to escape her hunting son.' },
      { fig: 'arachne',  text: "Arachne, who wove the gods' cruelties too well, was shrunk by Athena into the first spider." },
      { fig: 'medusa',   text: 'Medusa, punished for a violation not her own, wore serpents for hair and stone in her gaze.' },
      { fig: 'scylla',   text: "And Scylla, poisoned by a rival's envy, sprouted howling dogs from her waist and haunted the strait." },
    ] },

  { id: 'brood', title: 'The Brood of Typhon', kicker: 'A Lineage of Monsters',
    beats: [
      { fig: 'typhon',         text: 'Typhon, hundred-headed and storm-born, was the last and most fearsome child of Gaia.' },
      { fig: 'echidna',        text: 'With Echidna, half-woman and half-serpent, he sired the monsters the heroes were born to kill.' },
      { fig: 'cerberus',       text: 'Cerberus, three-headed, set to guard the gate that no shade may leave.' },
      { fig: 'lernaean_hydra', text: 'The Lernaean Hydra, regrowing two heads for every one cut away.' },
      { fig: 'chimera',        text: 'The Chimera — lion, goat, and serpent burning in a single body.' },
      { fig: 'sphinx',         text: 'And the Sphinx, who strangled all who could not answer her riddle.' },
    ] },

  { id: 'phorcys', title: 'The House of Phorcys & Ceto', kicker: 'A Genealogy of Terror',
    beats: [
      { fig: 'pontus',  text: 'Pontus, the primal Sea, was born of Earth alone, before any sailor.' },
      { fig: 'phorcys', text: "His son Phorcys, god of the deep's hidden dangers, took his own sister to wife." },
      { fig: 'ceto',    text: 'Ceto, mother of sea-terrors, bore him a lineage of horrors.' },
      { fig: 'graeae',  text: 'The Grey Sisters, born old, sharing a single eye and tooth between them.' },
      { fig: 'gorgons', text: 'The Gorgons, serpent-haired — and among them, mortal Medusa.' },
      { fig: 'ladon',   text: 'And Ladon, the hundred-headed serpent coiled about the golden apples.' },
    ] },

  { id: 'ovid', title: 'Tales from Ovid', kicker: 'Fables of Change',
    beats: [
      { fig: 'daphne',         text: 'Daphne, fleeing Apollo, became the laurel rather than be caught.' },
      { fig: 'actaeon',        text: 'Actaeon, who glimpsed Artemis bathing, was turned to a stag and torn apart by his own hounds.' },
      { fig: 'narcissus',      text: 'Narcissus, punished by Nemesis, wasted away in love with his own reflection and became a flower.' },
      { fig: 'echo',           text: 'Echo, cursed to only repeat, loved him in vain until nothing was left of her but a voice.' },
      { fig: 'arachne',        text: "Arachne, who out-wove Athena and dared show the gods' cruelty, was shrunk into the first spider." },
      { fig: 'tiresias',       text: 'Tiresias, who lived as both man and woman, was blinded by Hera and given prophecy by Zeus.' },
      { fig: 'adonis',         text: "Adonis, beloved of two goddesses, died on a boar's tusk and rose again as the anemone." },
      { fig: 'hermaphroditus', text: 'Hermaphroditus, seized by the nymph Salmacis, was fused with her into a single body.' },
    ] },
]
