// Theogony — Deity Stories
// ---------------------------------------------------------------------------
// Original prose retellings keyed by node id. Drop into the app and render
// `story` as the deity's narrative in the modal, with `source` as a small
// citation line beneath it.
//
// COPYRIGHT NOTE: All story text here is original. The myths themselves are
// drawn from public-domain sources (Ovid's Metamorphoses, Hesiod's Theogony,
// the Homeric poems and Hymns, Apollodorus). Ted Hughes's "Tales from Ovid"
// (1997) is in copyright and is NOT reproduced or paraphrased — it is credited
// only as recommended further reading on the Ovidian transformation tales.
//
// Suggested in-app "Sources & further reading" note (e.g. in the About panel):
//   "Stories drawn from Ovid's Metamorphoses and Hesiod's Theogony, with the
//    Homeric poems and Apollodorus. For the transformation myths, see Ted
//    Hughes, Tales from Ovid (Faber, 1997)."
// ---------------------------------------------------------------------------

export const deityStories = {

  // ---- PRIMORDIALS ----
  chaos: {
    story: "Before name, before number, before the first edge of anything stood against anything else — there was Chaos: not ruin and not riot, but a vast and yawning openness, the original gap in which nothing yet leaned upon nothing. It is less a god than a held breath, the dark unmeasured mouth out of which all distance would one day be drawn.\n\nFrom that emptiness, with no mother and no mate, the first powers simply happened — broad-breasted Gaia the Earth, dim Tartarus in the pit below, and Eros who would teach the world to reach for itself. Chaos shaped nothing and ruled nothing; it only opened, and having opened, let everything else begin to fall into its place.",
    beats: [
      { label: "The Yawning Openness", weight: 1,
        text: "Before name, before number, before the first edge of anything stood against anything else — there was Chaos: not ruin and not riot, but a vast and yawning openness, the original gap in which nothing yet leaned upon nothing." },
      { label: "A Held Breath", weight: 0.75,
        text: "It is less a god than a held breath, the dark unmeasured mouth out of which all distance would one day be drawn." },
      { label: "The First Powers", weight: 0.9, figures: ['gaia', 'tartarus', 'eros'],
        text: "From that emptiness, with no mother and no mate, the first powers simply happened — broad-breasted Gaia the Earth, dim Tartarus in the pit below, and Eros who would teach the world to reach for itself." },
      { label: "The Opening", weight: 0.6,
        text: "Chaos shaped nothing and ruled nothing; it only opened, and having opened, let everything else begin to fall into its place." },
    ],
    source: "Hesiod, Theogony."
  },
  gaia: {
    story: "Gaia is the ground beneath the story — the broad and patient Earth, first of the solid things, the sure floor on which gods would later dare to stand. She rose after Chaos, the first body to have weight and warmth, and everything that followed would need her to stand on.\n\nOut of herself alone, without seed or suitor, she brought forth the starry sky to cover her, grey Pontus the barren sea, and the long bones of the mountains — mother and grandmother and great-grandmother to nearly all that breathes. Then she lay with the sky she had made and bore the twelve Titans, the three one-eyed Cyclopes, and the Hundred-Handed, creatures of such terrible strength that their own father stuffed them back into the dark of her body rather than suffer them to walk.\n\nBut the Earth remembers, and the Earth takes sides. It was Gaia who forged the grey adamantine sickle and whispered among her children until young Cronus, the youngest and the boldest, dared to take it up. When the blow fell and the sky recoiled from the earth forever, the drops of blood that struck her soil became the Erinyes, the ash-tree nymphs, and — from the foam on the sea — Aphrodite. Gaia had broken one tyrant only to crown another; for Cronus in his turn chained her elder children in Tartarus and ruled as cruelly as his father before him.\n\nSo when the Titans themselves were cast down by the Olympians, it was Gaia, grieving again for imprisoned sons, who bore the storm-giant Typhon with Tartarus — a last monstrous champion hurled against Zeus and the new order. And when even Typhon failed, she stirred the Giants to rise in the terrible Gigantomachy, a war that shook Olympus to its roots. Before any of this, before Apollo ever claimed it, the oracle at Delphi had been hers — the navel of the world spoke first with the Earth\'s own voice. She endures every reign and outlasts each one, the patient mother who buries all her kings.",
    beats: [
      { label: "First After Chaos", weight: 1, figures: ['chaos'],
        text: "Gaia rose after Chaos, the first body to have weight and warmth, the broad and patient Earth on which gods would later dare to stand. Everything that followed would need her to stand on." },
      { label: "Born of Herself Alone", weight: 0.85, figures: ['pontus'],
        text: "Out of herself alone she brought forth the starry sky to cover her, grey Pontus the barren sea, and the long bones of the mountains — mother and grandmother to nearly all that breathes." },
      { label: "The Grey Sickle", weight: 0.9, figures: ['cronus'],
        text: "She forged the grey adamantine sickle and whispered among her children until young Cronus, the youngest and the boldest, dared to take it up against his father the sky." },
      { label: "Mother of Titans", weight: 0.8, figures: ['rhea', 'hyperion', 'oceanus'],
        text: "She bore the twelve Titans, the three one-eyed Cyclopes, and the Hundred-Handed — creatures of such terrible strength that their own father stuffed them back into the dark of her body rather than suffer them to walk." },
      { label: "The Wrath of Typhon", weight: 0.9, figures: ['typhon', 'tartarus'],
        text: "When the Titans were cast down in their turn, it was Gaia, grieving again for imprisoned sons, who bore the storm-giant Typhon with Tartarus — a last monstrous champion hurled against Zeus and the new order." },
      { label: "The Gigantomachy", weight: 0.75, figures: ['zeus'],
        text: "And when even Typhon failed, she stirred the Giants to rise in the terrible Gigantomachy, a war that shook Olympus to its roots. The Earth takes sides, and never stops taking them." },
      { label: "She Who Buries Her Kings", weight: 0.7, figures: ['apollo'],
        text: "Before Apollo ever claimed it, the oracle at Delphi had been hers — the navel of the world spoke first with the Earth\'s own voice. She endures every reign and outlasts each one, the patient mother who buries all her kings." },
    ],
    source: "Hesiod, Theogony."
  },
  uranus: {
    story: "Uranus is the Sky — the great star-sown dome that Gaia bore out of herself so that she would never lie uncovered, and who then stretched upon her as her mate, pressing close over the whole width of the world. He was the first king of all things, and the first to learn that a throne, once made, can be taken.\n\nHe hated the children Gaia gave him and would not suffer them to be born, stuffing each one back into the dark of her body until the Earth herself ached with the weight of them. So Gaia forged a jagged sickle, and her youngest, Cronus, lay in ambush in the folds of the coming night; when Uranus descended upon her once more, the son reached up and unmanned his father, and flung the severed flesh into the sea. Where the foam gathered, Aphrodite rose; where the blood fell upon the Earth, the Furies were born. Sky recoiled from Earth and never came down again — and the gap between them, the open air, is the world we live in.",
    beats: [
      { label: "The Star-Sown Dome", weight: 0.85, figures: ['gaia'],
        text: "Uranus is the Sky — the great star-sown dome that Gaia bore out of herself so that she would never lie uncovered, and who then stretched upon her as her mate. He was the first king of all things, and the first to learn that a throne, once made, can be taken." },
      { label: "Children Denied", weight: 0.8,
        text: "He hated the children Gaia gave him and would not suffer them to be born, stuffing each one back into the dark of her body until the Earth herself ached with the weight of them." },
      { label: "The Sickle in the Dark", weight: 1, figures: ['cronus', 'gaia'],
        text: "Gaia forged a jagged sickle, and her youngest, Cronus, lay in ambush in the folds of the coming night; when Uranus descended upon her once more, the son reached up and unmanned his father, and flung the severed flesh into the sea." },
      { label: "Beauty from Violence", weight: 0.7, figures: ['aphrodite'],
        text: "Where the foam gathered, Aphrodite rose; where the blood fell upon the Earth, the Furies were born. Sky recoiled from Earth and never came down again — and the gap between them, the open air, is the world we live in." },
    ],
    source: "Hesiod, Theogony."
  },
  nyx: {
    story: "Nyx is Night itself, one of the eldest powers to come unbidden out of Chaos, and among the few beings before whom Zeus himself lowers his eyes. She keeps her house at the very rim of the world, where Day and Dark cross on the threshold at dusk and dawn and never once sit down together.\n\nFrom her own darkness, needing no father, she gave birth to the whole solemn company that rules the ends of mortal life — Sleep and his iron brother Death, the swarming tribe of Dreams, the three Fates with their thread, and blame and aching Misery and Doom. Yet the same womb that loosed these shadows also bore shining Day and the bright upper Air. The mother of every terror is also the mother of the morning; there is nothing the night gives us that it did not first carry in the dark.",
    beats: [
      { label: "The Eldest Dark", weight: 0.9, figures: ['chaos'],
        text: "Nyx is Night itself, one of the eldest powers to come unbidden out of Chaos, and among the few beings before whom Zeus himself lowers his eyes." },
      { label: "The Threshold House", weight: 0.6,
        text: "She keeps her house at the very rim of the world, where Day and Dark cross on the threshold at dusk and dawn and never once sit down together." },
      { label: "Mother of Shadows", weight: 1, figures: ['hypnos', 'thanatos', 'moirai'],
        text: "From her own darkness, needing no father, she gave birth to the whole solemn company that rules the ends of mortal life — Sleep and his iron brother Death, the swarming tribe of Dreams, the three Fates with their thread, and blame and aching Misery and Doom." },
      { label: "Mother of Morning", weight: 0.75, figures: ['hemera', 'aether'],
        text: "Yet the same womb that loosed these shadows also bore shining Day and the bright upper Air. The mother of every terror is also the mother of the morning; there is nothing the night gives us that it did not first carry in the dark." },
    ],
    source: "Hesiod, Theogony."
  },
  erebus: {
    story: "Erebus is the primordial dark — not the night sky overhead but the deeper gloom beneath the world, the shadow that pools in the hollow places of the earth and lines the long road the dead must walk on their way down. He is among the first powers to emerge from Chaos, older than any god with a face or a name.\n\nYet darkness, in the oldest stories, is fertile. Erebus lay with his sister Nyx, the Night, and from that mingling of two shadows came their own bright opposites: Hemera the Day and Aether the shining upper air. So the deepest dark fathered the clearest light — as though the world could only arrive at its morning by first passing through the gloom that came before it.",
    beats: [
      { label: "The Deeper Gloom", weight: 0.85, figures: ['chaos'],
        text: "Erebus is the primordial dark — not the night sky overhead but the deeper gloom beneath the world, the shadow that pools in the hollow places of the earth and lines the long road the dead must walk on their way down." },
      { label: "Older Than Names", weight: 0.6,
        text: "He is among the first powers to emerge from Chaos, older than any god with a face or a name." },
      { label: "Two Shadows Mingled", weight: 1, figures: ['nyx'],
        text: "Yet darkness, in the oldest stories, is fertile. Erebus lay with his sister Nyx, the Night, and from that mingling of two shadows came their own bright opposites." },
      { label: "Light from the Dark", weight: 0.8, figures: ['hemera', 'aether'],
        text: "From that mingling came Hemera the Day and Aether the shining upper air. So the deepest dark fathered the clearest light — as though the world could only arrive at its morning by first passing through the gloom that came before it." },
    ],
    source: "Hesiod, Theogony."
  },
  tartarus: {
    story: "Tartarus is less a god than a hunger with a floor — the bottomless pit that gapes beneath the underworld, lying as far below the realm of Hades as the earth lies below the sky. A bronze anvil, the old poets said, would fall nine days and nine nights through the dark before it struck the bottom. He is the deep that even the dead do not enter.\n\nBorn of Chaos beside Gaia at the very beginning of things, Tartarus is the prison at the bottom of the world. Into him the defeated Titans were hurled when the Olympians won their war, sealed behind gates of bronze with the hundred-handed giants set to guard them; and there the worst are kept forever. He is also, with Gaia, the father of Typhon — the abyss itself reaching up, just once, to breed a monster terrible enough to threaten heaven.",
    beats: [
      { label: "A Hunger with a Floor", weight: 0.9,
        text: "Tartarus is less a god than a hunger with a floor — the bottomless pit that gapes beneath the underworld, lying as far below the realm of Hades as the earth lies below the sky." },
      { label: "The Nine-Day Fall", weight: 0.7, figures: ['chaos', 'gaia'],
        text: "A bronze anvil, the old poets said, would fall nine days and nine nights through the dark before it struck the bottom. Born of Chaos beside Gaia at the very beginning of things, he is the deep that even the dead do not enter." },
      { label: "Prison of the Titans", weight: 1, figures: ['cronus'],
        text: "Into him the defeated Titans were hurled when the Olympians won their war, sealed behind gates of bronze with the hundred-handed giants set to guard them; and there the worst are kept forever." },
      { label: "Father of Typhon", weight: 0.8, figures: ['gaia', 'typhon'],
        text: "He is also, with Gaia, the father of Typhon — the abyss itself reaching up, just once, to breed a monster terrible enough to threaten heaven." },
    ],
    source: "Hesiod, Theogony."
  },
  eros: {
    story: "Eros is desire itself — not the winged boy with his arrows of the later tales, but one of the first and oldest powers, the force that stirred at the very beginning when there was almost nothing yet to want. He is the pull at the heart of things, the reaching of one thing toward another out of which all joining, and so all making, is born.\n\nHe rose out of Chaos among the earliest powers, alongside the broad Earth and the abyss, and without him they would have stayed forever apart, cold and separate in the dark. It is Eros who taught Sky to lie upon Earth and Sea to mingle with the shore, who set the gods themselves to loving and so to bearing the generations that crowd the world. The younger gods of love are only his late children; the desire that runs through everything is far older than any of them.",
    beats: [
      { label: "The Oldest Want", weight: 1, figures: ['chaos'],
        text: "Eros is desire itself — not the winged boy with his arrows of the later tales, but one of the first and oldest powers, the force that stirred at the very beginning when there was almost nothing yet to want." },
      { label: "The Pull at the Heart", weight: 0.8,
        text: "He is the pull at the heart of things, the reaching of one thing toward another out of which all joining, and so all making, is born." },
      { label: "Sky Upon Earth", weight: 0.9, figures: ['gaia', 'uranus', 'pontus'],
        text: "He rose out of Chaos among the earliest powers, alongside the broad Earth and the abyss, and without him they would have stayed forever apart, cold and separate in the dark. It is Eros who taught Sky to lie upon Earth and Sea to mingle with the shore." },
      { label: "Older Than His Children", weight: 0.6,
        text: "The younger gods of love are only his late children; the desire that runs through everything is far older than any of them." },
    ],
    source: "Hesiod, Theogony."
  },
  pontus: {
    story: "Pontus is the Sea itself — not a god who rules the water but the water given a will, the salt deep as it was before any keel had ever crossed it, before Poseidon lifted a trident over it. He is the grey horizon and the unlit fathoms, the oldest face of the ocean.\n\nGaia bore him out of herself alone, without a father, as she bore the sky and the mountains — the first sea poured from the first earth. And when Earth and Sea came together, they seeded the elder line of ocean powers: Nereus the truthful old man of the waves, and dangerous Phorcys with his sister Ceto, from whom the great sea-monsters would one day descend. Long before the Olympians divided the world among themselves, Pontus was already the whole of the deep.",
    beats: [
      { label: "The Water Given a Will", weight: 0.9,
        text: "Pontus is the Sea itself — not a god who rules the water but the water given a will, the salt deep as it was before any keel had ever crossed it, before Poseidon lifted a trident over it." },
      { label: "Born of Earth Alone", weight: 0.7, figures: ['gaia'],
        text: "Gaia bore him out of herself alone, without a father, as she bore the sky and the mountains — the first sea poured from the first earth." },
      { label: "Elder Ocean Powers", weight: 1, figures: ['nereus', 'phorcys', 'ceto'],
        text: "When Earth and Sea came together, they seeded the elder line of ocean powers: Nereus the truthful old man of the waves, and dangerous Phorcys with his sister Ceto, from whom the great sea-monsters would one day descend." },
      { label: "The Whole of the Deep", weight: 0.6,
        text: "Long before the Olympians divided the world among themselves, Pontus was already the whole of the deep." },
    ],
    source: "Hesiod, Theogony."
  },
  thanatos: {
    story: "Thanatos is Death — not the violence that kills but the quiet, final closing that comes after, the iron-hearted god who gathers each mortal at the end and carries them across the last threshold. He is gentle in his way, and utterly without exception: alone of all the gods he takes no offerings and grants no favors, for there is nothing anyone can give him to be spared.\n\nBorn of Night without a father, twin brother to Sleep, he is the most hated of the gods by men and the most steadfast. Twice only was he cheated of his due: the cunning Sisyphus once chained him so that for a time no one in all the world could die, and Heracles wrestled him at a graveside and tore back the soul of Alcestis from his grip. But these are the rare exceptions that prove his rule — for in the end Thanatos comes for everyone, and in the end no one slips past him twice.",
    beats: [
      { label: "The Quiet Closing", weight: 0.9,
        text: "Thanatos is Death — not the violence that kills but the quiet, final closing that comes after, the iron-hearted god who gathers each mortal at the end and carries them across the last threshold." },
      { label: "Twin of Sleep", weight: 0.65, figures: ['nyx', 'hypnos'],
        text: "Born of Night without a father, twin brother to Sleep, he is the most hated of the gods by men and the most steadfast." },
      { label: "Twice Cheated", weight: 1, figures: ['heracles'],
        text: "Twice only was he cheated of his due: the cunning Sisyphus once chained him so that no one in all the world could die, and Heracles wrestled him at a graveside and tore back the soul of Alcestis from his grip." },
      { label: "No One Slips Past", weight: 0.75,
        text: "These are the rare exceptions that prove his rule — for in the end Thanatos comes for everyone, and in the end no one slips past him twice." },
    ],
    source: "Hesiod, Theogony."
  },
  hypnos: {
    story: "Hypnos is Sleep, the gentle twin of Death and the kinder of the two — the god who walks the world each night on silent feet, touching the eyes of the weary and laying even the strongest low without a wound. Where his brother takes a life forever, Hypnos takes it only until the morning.\n\nHe dwells in a still cave at the edge of the world where the sun never reaches and the river of forgetfulness murmurs softly through the dark, and his countless sons, the Dreams, drift about him like moths. So great is his power that he can quiet even the restless mind of Zeus: Hera once bribed him to lull the king of the gods to sleep so that she might work her will unwatched, and though he dreaded the waking, he did it — for there is nothing under heaven that does not, in the end, have to rest.",
    beats: [
      { label: "The Gentle Twin", weight: 0.8, figures: ['thanatos'],
        text: "Hypnos is Sleep, the gentle twin of Death and the kinder of the two — the god who walks the world each night on silent feet, laying even the strongest low without a wound." },
      { label: "The Cave of Forgetting", weight: 0.6, figures: ['morpheus'],
        text: "He dwells in a still cave at the edge of the world where the sun never reaches and the river of forgetfulness murmurs softly through the dark, and his countless sons, the Dreams, drift about him like moths." },
      { label: "Lulling the King", weight: 1, figures: ['zeus', 'hera'],
        text: "Hera once bribed him to lull the king of the gods to sleep so that she might work her will unwatched, and though he dreaded the waking, he did it." },
      { label: "Everything Must Rest", weight: 0.7,
        text: "There is nothing under heaven that does not, in the end, have to rest." },
    ],
    source: "Hesiod, Theogony; Homer, Iliad XIV."
  },
  morpheus: {
    story: "Morpheus is the shaper of dreams, one of the thousand sons of Sleep — and the most gifted of them, for he can take the exact form of any mortal: their face and voice, their walk, the very way they hold themselves, so that he may step into a sleeper's mind wearing the shape of someone loved and known.\n\nIt is through Morpheus that the gods send their messages by night, and through him that the dead seem to come back to us in our sleep. When the drowned king Ceyx could not return home to his wife Alcyone, it was Morpheus who put on his pale and dripping shape and stood at her bedside to tell her, gently, that she was already a widow — so that even grief, in the old stories, arrives first as a dream wearing a beloved face.",
    beats: [
      { label: "The Shaper of Dreams", weight: 0.85, figures: ['hypnos'],
        text: "Morpheus is the shaper of dreams, one of the thousand sons of Sleep — and the most gifted of them, for he can take the exact form of any mortal." },
      { label: "Messenger by Night", weight: 0.7,
        text: "It is through Morpheus that the gods send their messages by night, and through him that the dead seem to come back to us in our sleep." },
      { label: "A Beloved Face", weight: 1,
        text: "When the drowned king Ceyx could not return home, it was Morpheus who put on his pale and dripping shape and stood at her bedside to tell her, gently, that she was already a widow." },
    ],
    source: "Ovid, Metamorphoses XI."
  },
  moirai: {
    story: "The Moirai are the three Fates, the grey weavers who hold every life as a single thread between their hands — Clotho who spins it into being, Lachesis who measures out its length, and Atropos, the smallest and most terrible, who cuts it without appeal. What they decide is decided, and there is no court above them.\n\nOlder even than the Olympians in their power, they were present at every birth and will be present at every death, and not even Zeus can unmake what they have set — some say he is only the one who carries out their will. They are blind to pleading and deaf to prayer; they spun the doom into the infant Meleager on the night he was born and let it run its length unbroken. To the Greeks they were the proof that beneath all the bright, quarreling gods there ran a deeper law that even heaven itself had to obey.",
    beats: [
      { label: "The Grey Weavers", weight: 0.9,
        text: "The Moirai are the three Fates — Clotho who spins the thread of life into being, Lachesis who measures out its length, and Atropos, the smallest and most terrible, who cuts it without appeal." },
      { label: "Above the Gods", weight: 1, figures: ['zeus'],
        text: "Not even Zeus can unmake what they have set — some say he is only the one who carries out their will. They are blind to pleading and deaf to prayer." },
      { label: "A Deeper Law", weight: 0.75,
        text: "To the Greeks they were the proof that beneath all the bright, quarreling gods there ran a deeper law that even heaven itself had to obey." },
    ],
    source: "Hesiod, Theogony."
  },
  nemesis: {
    story: "Nemesis is the goddess of due measure, the cold hand that restores the balance whenever a mortal's fortune or pride swells past its proper bound. She is not cruelty but correction — the weight that comes down on the scale grown too light with arrogance, the answer the universe makes to anyone who forgets that they are not a god.\n\nA daughter of Night, she carries a measuring-rod and a bridle, and she watches the proud the way a creditor watches a debt. It was Nemesis who heard the prayer raised against cold Narcissus and bent him to fall in love with his own reflection, so that the boy who had scorned every lover wasted away wanting only himself. She gives good fortune freely — but she watches what is done with it, and to those who mistake a gift for a right, she comes quietly to take the difference back.",
    beats: [
      { label: "The Cold Hand", weight: 0.85, figures: ['nyx'],
        text: "Nemesis is the goddess of due measure, the cold hand that restores the balance whenever a mortal's fortune or pride swells past its proper bound. A daughter of Night, she carries a measuring-rod and a bridle." },
      { label: "The Mirror Pool", weight: 1, figures: ['narcissus'],
        text: "It was Nemesis who heard the prayer raised against cold Narcissus and bent him to fall in love with his own reflection, so that the boy who had scorned every lover wasted away wanting only himself." },
      { label: "Taking the Difference", weight: 0.7,
        text: "She gives good fortune freely — but she watches what is done with it, and to those who mistake a gift for a right, she comes quietly to take the difference back." },
    ],
    source: "Hesiod, Theogony."
  },
  eris: {
    story: "Eris is Strife, the sister and companion of war, the small bitter goddess who is never invited and always comes. From her descend all the things that pull a peace apart — quarrel and rivalry, lying words, toil and famine and ruin — the whole brood of discord that so often begins in a single slighted moment.\n\nHer most famous act was the smallest. Left off the guest-list for the wedding of Peleus and Thetis, Eris came all the same, and tossed among the goddesses a single golden apple inscribed 'to the fairest.' Hera, Athena, and Aphrodite each claimed it; the quarrel was handed to the Trojan prince Paris to settle; and his choice lit the long slow fuse that ended in the ten-year burning of Troy. So the greatest war of the age began with one uninvited goddess and one little golden apple of spite.",
    beats: [
      { label: "Never Invited", weight: 0.8,
        text: "Eris is Strife, the sister and companion of war, the small bitter goddess who is never invited and always comes." },
      { label: "The Golden Apple", weight: 1, figures: ['thetis', 'hera', 'athena', 'aphrodite'],
        text: "Left off the guest-list for the wedding of Peleus and Thetis, Eris tossed among the goddesses a single golden apple inscribed 'to the fairest.'" },
      { label: "The Fuse That Lit Troy", weight: 0.9,
        text: "The quarrel was handed to the Trojan prince Paris to settle; and his choice lit the long slow fuse that ended in the ten-year burning of Troy." },
    ],
    source: "Hesiod, Theogony; Works and Days."
  },

  // ---- TITANS ----
  cronus: {
    story: "Cronus was the youngest and most daring of the twelve Titans, the one bold enough to lift his hand against the sky — and for a long golden age he was lord of all, ruler of the world's first kingdom long before the Olympians were so much as dreamed.\n\nHe had won that crown by ambushing his own father Uranus with a sickle, and the very prophecy that armed him now turned to haunt him: that a child of his would do to him exactly as he had done. So as his sister-wife Rhea bore him god after god, he swallowed each newborn whole — Hestia, Demeter, Hera, Hades, Poseidon — all of them sinking living into his dark. But Rhea hid the last away and gave him a stone in swaddling-bands to gulp down in its place. That child was Zeus, who grew far off, returned, and forced his father to bring up again the brothers and sisters he had eaten. The stone came first, then the living gods — and the war for heaven began.",
    beats: [
      { label: "Lord of the Golden Age", weight: 0.85,
        text: "Cronus was the youngest and most daring of the twelve Titans — and for a long golden age he was lord of all, ruler of the world's first kingdom long before the Olympians were dreamed." },
      { label: "The Sickle", weight: 0.8, figures: ['uranus'],
        text: "He had won that crown by ambushing his own father Uranus with a jagged sickle, unmanning him and seizing the cosmos for his own." },
      { label: "The Devouring Father", weight: 1, figures: ['rhea'],
        text: "But the prophecy that armed him turned to haunt him — that his own child would do to him as he had done. So as Rhea bore him god after god, he swallowed each newborn whole, sinking them living into his dark." },
      { label: "The Swallowed Stone", weight: 0.75, figures: ['zeus'],
        text: "Rhea hid the last away and gave him a stone in swaddling-bands to gulp down in its place. That child was Zeus, who would return, free his siblings, and begin the war for heaven." },
    ],
    source: "Hesiod, Theogony."
  },
  rhea: {
    story: "Rhea is the Titaness of the flowing generations, the great mother who stands between two ages of the world — wife to Cronus, and mother of the first six Olympians. Hers is the oldest grief in heaven: to give birth again and again, and each time to watch the cradle emptied.\n\nFor Cronus, in terror of his own children, swallowed each one the moment she bore it. When her sixth child quickened within her, Rhea could endure no more. She fled by night to Crete, brought the infant Zeus to birth in a hidden cave on the mountainside, and carried back to her husband a stone dressed in an infant's clothes. He swallowed it whole without once looking down. So by nothing more than a mother's cunning the youngest god was saved — and grew strong enough, at last, to make his father give back all the rest.",
    beats: [
      { label: "Mother Between Ages", weight: 0.85, figures: ['cronus'],
        text: "Rhea is the Titaness of the flowing generations, the great mother who stands between two ages of the world — wife to Cronus, and mother of the first six Olympians." },
      { label: "The Oldest Grief", weight: 0.9, figures: ['hestia', 'demeter', 'hera', 'hades', 'poseidon'],
        text: "Hers is the oldest grief in heaven: Cronus, in terror of his own children, swallowed each one the moment she bore it — and each time she watched the cradle emptied." },
      { label: "The Cave on Crete", weight: 1, figures: ['zeus'],
        text: "When her sixth child quickened within her, Rhea could endure no more. She fled by night to Crete and brought the infant Zeus to birth in a hidden cave on the mountainside." },
      { label: "A Stone in Swaddling", weight: 0.75,
        text: "She carried back to her husband a stone dressed in an infant's clothes. He swallowed it whole without once looking down — and by nothing more than a mother's cunning the youngest god was saved." },
    ],
    source: "Hesiod, Theogony."
  },
  oceanus: {
    story: "Oceanus is the great world-river — the vast, ever-circling stream that the ancients believed ran round the rim of the whole earth, the boundary of the known world and the source from which every river, spring, and well draws its water. Eldest of the Titans, he is less a person than a horizon, immense and untroubled.\n\nWith his sister and wife Tethys he fathered the three thousand river-gods and the three thousand Oceanid nymphs, so that nearly every flowing water in the world is one of his children. Yet when the Titans rose in war against the young Olympians, Oceanus alone would not raise his hand; he kept to his endless circling at the edge of things and let the others fall — too old and too vast to be stirred by a quarrel over a throne.",
    beats: [
      { label: "The World-River", weight: 0.9,
        text: "Oceanus is the great world-river — the vast, ever-circling stream that ran round the rim of the whole earth, the boundary of the known world and the source from which every river, spring, and well draws its water." },
      { label: "Father of All Waters", weight: 1, figures: ['tethys'],
        text: "With his sister and wife Tethys he fathered the three thousand river-gods and the three thousand Oceanid nymphs, so that nearly every flowing water in the world is one of his children." },
      { label: "The Titan Who Would Not Fight", weight: 0.75, figures: ['zeus'],
        text: "When the Titans rose in war against the young Olympians, Oceanus alone would not raise his hand; he kept to his endless circling at the edge of things and let the others fall — too old and too vast to be stirred by a quarrel over a throne." },
    ],
    source: "Hesiod, Theogony."
  },
  tethys: {
    story: "Tethys is the Titaness of the nursing waters, the gentle mother from whom the world's fresh streams flow — wife to Oceanus the world-river, and the source that feeds the rivers, the rain-clouds, and the springs that keep the living earth alive.\n\nFrom her came the three thousand Oceanids and all the rivers of the world, drawn up through the earth and poured back into the sea in an endless round; she is the hidden circulation that turns the salt deep into the sweet water of every brook. In the oldest tales she even nursed the goddess Hera while the war in heaven raged, fostering her at the world's far edge — the great nurse of waters who was, for a time, the nurse of a future queen.",
    beats: [
      { label: "Nurse of the World", weight: 0.85, figures: ['oceanus'],
        text: "Tethys is the Titaness of the nursing waters — wife to Oceanus the world-river, and the source that feeds the rivers, the rain-clouds, and the springs that keep the living earth alive." },
      { label: "The Hidden Circulation", weight: 1,
        text: "From her came the three thousand Oceanids and all the rivers of the world, drawn up through the earth and poured back into the sea in an endless round — the hidden circulation that turns the salt deep into the sweet water of every brook." },
      { label: "Foster-Mother of Hera", weight: 0.7, figures: ['hera'],
        text: "In the oldest tales she even nursed the goddess Hera while the war in heaven raged, fostering her at the world's far edge — the great nurse of waters who was, for a time, the nurse of a future queen." },
    ],
    source: "Hesiod, Theogony."
  },
  hyperion: {
    story: "Hyperion is the Titan of heavenly light, the watcher from on high — his very name means 'the one who goes above.' He is light not as a single lamp but as a principle, the pure radiance of the upper sky out of which the measured lights of day and night were drawn.\n\nWith his sister Theia, goddess of shining, he fathered the three great lights of the world: Helios the Sun, Selene the Moon, and Eos the Dawn. Through his children the heavens are lit and the hours are counted — sunrise, high noon, and the silver crossing of the night. Hyperion himself stands behind them all, the older and dimmer source, the father-light from which every visible brightness in the sky was first kindled.",
    beats: [
      { label: "The One Who Goes Above", weight: 0.85,
        text: "Hyperion is the Titan of heavenly light, the watcher from on high — his very name means 'the one who goes above.' He is light not as a single lamp but as a principle, the pure radiance of the upper sky." },
      { label: "Three Lights of the World", weight: 1, figures: ['theia', 'helios', 'selene', 'eos'],
        text: "With his sister Theia he fathered the three great lights of the world: Helios the Sun, Selene the Moon, and Eos the Dawn. Through his children the heavens are lit and the hours are counted." },
      { label: "The Father-Light", weight: 0.65,
        text: "Hyperion himself stands behind them all, the older and dimmer source, the father-light from which every visible brightness in the sky was first kindled." },
    ],
    source: "Hesiod, Theogony."
  },
  theia: {
    story: "Theia is the Titaness of sight and shining — the power that lends light its splendor and the eye its ability to see by it. The Greeks believed it was she who gave gold and silver and bright gems their gleam, so that everything precious in the world borrows a little of her radiance.\n\nHer name means simply 'divine,' and she is brightness in its purest form, before it is parceled out into particular fires. With her brother Hyperion she gave birth to the three lights that order the sky — the Sun, the Moon, and the Dawn — pouring her own shining into each of her children. To look upon anything that glitters, the old poets said, is to catch a far-off glimpse of Theia herself.",
    beats: [
      { label: "Goddess of Shining", weight: 0.85,
        text: "Theia is the Titaness of sight and shining — the power that lends light its splendor and the eye its ability to see by it. Everything precious in the world borrows a little of her radiance." },
      { label: "Mother of the Lights", weight: 1, figures: ['hyperion', 'helios', 'selene', 'eos'],
        text: "With her brother Hyperion she gave birth to the three lights that order the sky — the Sun, the Moon, and the Dawn — pouring her own shining into each of her children." },
      { label: "A Glimpse of the Divine", weight: 0.6,
        text: "To look upon anything that glitters, the old poets said, is to catch a far-off glimpse of Theia herself." },
    ],
    source: "Hesiod, Theogony."
  },
  iapetus: {
    story: "Iapetus is one of the four great Titans who, in the oldest reckoning, stood at the corners of the world and held the sky apart from the earth — a pillar-god of the western edge, linked by the Greeks with mortal life and its short, striving span.\n\nHis true importance lies in his sons, for through them the whole condition of humankind entered the world. He fathered Atlas, condemned to bear the heavens on his shoulders; Prometheus, who stole fire and suffered for loving men; and Epimetheus, the afterthought who took Pandora into his house. Endurance and foresight, cleverness and folly — the best and the worst of the mortal lot all trace back, in the end, through the line of Iapetus.",
    beats: [
      { label: "Pillar of the West", weight: 0.75,
        text: "Iapetus is one of the four great Titans who stood at the corners of the world and held the sky apart from the earth — a pillar-god of the western edge, linked by the Greeks with mortal life and its short, striving span." },
      { label: "Father of Man's Condition", weight: 1, figures: ['atlas', 'prometheus', 'epimetheus'],
        text: "Through his sons the whole condition of humankind entered the world: Atlas, condemned to bear the heavens; Prometheus, who stole fire and suffered for loving men; and Epimetheus, the afterthought who took Pandora into his house." },
      { label: "The Mortal Lot", weight: 0.7,
        text: "Endurance and foresight, cleverness and folly — the best and the worst of the mortal lot all trace back, in the end, through the line of Iapetus." },
    ],
    source: "Hesiod, Theogony."
  },
  mnemosyne: {
    story: "Mnemosyne is Memory itself given a face — the Titaness who holds the whole of the past, and without whom there could be no knowledge, no story, no name that outlasts the moment it is spoken. In an age before writing, she was the most necessary power of all: the keeper of everything that must not be lost.\n\nZeus came to her and lay with her for nine nights running, and from those nights she bore the nine Muses — so that out of Memory came song, history, and all the arts that carry a people's past forward into its future. It is no accident that the poets begin by calling on her daughters: every poem is an act of remembering, and behind every Muse stands their mother, the deep still well of Memory from which all of it is drawn.",
    beats: [
      { label: "Memory Given a Face", weight: 0.85,
        text: "Mnemosyne is Memory itself given a face — the Titaness who holds the whole of the past. In an age before writing, she was the most necessary power of all: the keeper of everything that must not be lost." },
      { label: "Nine Nights with Zeus", weight: 1, figures: ['zeus', 'muses'],
        text: "Zeus came to her and lay with her for nine nights running, and from those nights she bore the nine Muses — so that out of Memory came song, history, and all the arts that carry a people's past forward into its future." },
      { label: "The Well of All Song", weight: 0.7,
        text: "Every poem is an act of remembering, and behind every Muse stands their mother, the deep still well of Memory from which all of it is drawn." },
    ],
    source: "Hesiod, Theogony."
  },
  themis: {
    story: "Themis is the Titaness of divine law and right order — not the written statutes of cities but the older, deeper rule beneath them: custom, fairness, the way things are properly done between gods and men. She is the steady sense of what is fitting, and she sits closer to the throne of Zeus than almost anyone.\n\nBefore Apollo ever held it, it was Themis who spoke the oracles at Delphi, breathing the future from the navel of the world. As Zeus's trusted counselor she became his second consort and bore the Seasons and, in some tellings, the Fates themselves — so that order, timeliness, and destiny are all her daughters. When the gods gather in assembly, it is Themis who calls them to order: the quiet keeper of the rules that even heaven agrees to keep.",
    beats: [
      { label: "The Deeper Rule", weight: 0.85,
        text: "Themis is the Titaness of divine law and right order — not the written statutes of cities but the older, deeper rule beneath them: custom, fairness, the way things are properly done between gods and men." },
      { label: "Oracle Before Apollo", weight: 0.9, figures: ['apollo'],
        text: "Before Apollo ever held it, it was Themis who spoke the oracles at Delphi, breathing the future from the navel of the world." },
      { label: "Mother of Order", weight: 1, figures: ['zeus', 'moirai'],
        text: "As Zeus's trusted counselor she became his second consort and bore the Seasons and, in some tellings, the Fates themselves — so that order, timeliness, and destiny are all her daughters." },
      { label: "Keeper of the Assembly", weight: 0.6,
        text: "When the gods gather in assembly, it is Themis who calls them to order: the quiet keeper of the rules that even heaven agrees to keep." },
    ],
    source: "Hesiod, Theogony."
  },
  metis: {
    story: "Metis is deep cunning given a face — an Oceanid whose name is the very word for the shrewd and supple wisdom that loosens what cannot be untied. She was the first power Zeus turned to and the first he loved; it was her counsel that brewed the draught which made Cronus disgorge the children he had swallowed.\n\nBut it was foretold that Metis would bear children mightier than their father — first a daughter, then a son who would cast Zeus down as Zeus had cast down his own. So the new king, having learned the old lesson well, coaxed her small with soft words and swallowed her whole, taking her wisdom inside himself for good. From within him she counsels him still; and when her time came the child was not lost but born from his own splitting skull — Athena, leaping out full-grown and armored, carrying her mother's grey unsleeping mind.",
    beats: [
      { label: "Cunning Given a Face", weight: 0.8, figures: ['cronus'],
        text: "Metis is deep cunning given a face — the shrewd and supple wisdom that loosens what cannot be untied. It was her counsel that brewed the draught which made Cronus disgorge the children he had swallowed." },
      { label: "The Dread Prophecy", weight: 0.85, figures: ['zeus'],
        text: "It was foretold that Metis would bear children mightier than their father — first a daughter, then a son who would cast Zeus down as Zeus had cast down his own." },
      { label: "Swallowed Whole", weight: 1, figures: ['zeus'],
        text: "So the new king, having learned the old lesson well, coaxed her small with soft words and swallowed her whole, taking her wisdom inside himself for good. From within him she counsels him still." },
      { label: "Born from the Skull", weight: 0.9, figures: ['athena'],
        text: "When her time came the child was not lost but born from his own splitting skull — Athena, leaping out full-grown and armored, carrying her mother's grey unsleeping mind." },
    ],
    source: "Hesiod, Theogony."
  },
  prometheus: {
    story: "Prometheus — his name means 'forethought' — is the cleverest of the Titans and the truest friend that mortals ever found among the gods. While his brothers warred or shouldered the sky, he bent his quick mind toward the shivering, short-lived creatures of the dust, and could not bear to leave them helpless in the cold.\n\nAt the first dividing of the sacrifice he tricked Zeus into choosing bare bones dressed in glistening fat, so that the good meat would stay with men; and when Zeus hid fire away in revenge, Prometheus stole it back, carrying a single live ember down to earth concealed in a hollow fennel-stalk. For that theft Zeus had him chained to a crag at the edge of the world, where each day an eagle came to tear out his liver, and each night the liver grew whole again — an agony built to have no ending. So he hung for an age of the world, until Heracles passed beneath the cliff, lifted his bow, and shot the eagle out of the sky.",
    beats: [
      { label: "Friend of Mortals", weight: 0.85,
        text: "Prometheus — his name means 'forethought' — is the cleverest of the Titans and the truest friend that mortals ever found among the gods. He bent his quick mind toward the shivering, short-lived creatures of the dust, and could not bear to leave them helpless in the cold." },
      { label: "The Stolen Fire", weight: 1, figures: ['zeus'],
        text: "He tricked Zeus into choosing bare bones dressed in glistening fat, so that the good meat would stay with men; and when Zeus hid fire away in revenge, Prometheus stole it back, carrying a single live ember down to earth concealed in a hollow fennel-stalk." },
      { label: "The Eagle and the Crag", weight: 0.9, figures: ['caucasian_eagle'],
        text: "For that theft Zeus had him chained to a crag at the edge of the world, where each day an eagle came to tear out his liver, and each night the liver grew whole again — an agony built to have no ending." },
      { label: "The Arrow of Heracles", weight: 0.7, figures: ['heracles'],
        text: "So he hung for an age of the world, until Heracles passed beneath the cliff, lifted his bow, and shot the eagle out of the sky." },
    ],
    source: "Hesiod, Theogony; Works and Days."
  },
  atlas: {
    story: "Atlas is endurance turned to stone — a Titan of immense and patient strength who stands at the western rim of the world, where the day goes down, and bears upon his neck and unwearying arms the whole weight of the heavens.\n\nWhen the Titans rose against the young Olympians and were broken, Zeus did not cast Atlas into the pit with the others. He gave him instead a punishment shaped exactly like the crime: since the Titans had reached up to seize heaven, Atlas would hold heaven up — forever, alone, never once setting it down. Only a single time was the burden ever shifted from him, when Heracles took the sky onto his own shoulders for the space of an errand; and even then Atlas had to be tricked into stooping back beneath it, having tasted for one moment what it was to stand up straight.",
    beats: [
      { label: "Endurance Turned to Stone", weight: 0.85,
        text: "Atlas is endurance turned to stone — a Titan of immense and patient strength who stands at the western rim of the world, bearing upon his neck and unwearying arms the whole weight of the heavens." },
      { label: "A Punishment Like the Crime", weight: 1, figures: ['zeus'],
        text: "Zeus did not cast Atlas into the pit with the others. He gave him a punishment shaped exactly like the crime: since the Titans had reached up to seize heaven, Atlas would hold heaven up — forever, alone, never once setting it down." },
      { label: "One Moment Upright", weight: 0.75, figures: ['heracles'],
        text: "Only once was the burden ever shifted, when Heracles took the sky onto his own shoulders for the space of an errand; and even then Atlas had to be tricked into stooping back beneath it, having tasted for one moment what it was to stand up straight." },
    ],
    source: "Hesiod, Theogony."
  },
  helios: {
    story: "Helios is the Sun made flesh — the unwearying god who climbs each dawn into a chariot of fire drawn by four white horses and drives the burning day from the eastern gates to the western sea. From that height nothing is hidden from him; he is the great witness of the world, who sees every deed done beneath the light.\n\nIt was Helios who caught Aphrodite in the arms of Ares and carried the tale to her husband, and Helios who told grieving Demeter that Hades had taken her daughter down into the dark. But his own clear seeing brought him the deepest sorrow of all. When his mortal son Phaethon begged to drive the sun-chariot for a single day, the boy could not hold the horses, scorched the green earth black from sky to sea, and had to be struck dead out of the heavens to save the world — and the father who sees all things could do nothing but watch his child fall, burning, into a river.",
    beats: [
      { label: "The Great Witness", weight: 0.85,
        text: "Helios is the Sun made flesh — the unwearying god who drives the burning day from the eastern gates to the western sea. From that height nothing is hidden from him; he is the great witness of the world." },
      { label: "Teller of Truths", weight: 0.7, figures: ['aphrodite', 'ares', 'demeter'],
        text: "It was Helios who caught Aphrodite in the arms of Ares and carried the tale to her husband, and Helios who told grieving Demeter that Hades had taken her daughter down into the dark." },
      { label: "The Fall of Phaethon", weight: 1, figures: ['phaethon', 'zeus'],
        text: "When his mortal son Phaethon begged to drive the sun-chariot, the boy could not hold the horses, scorched the green earth black from sky to sea, and had to be struck dead out of the heavens to save the world." },
      { label: "A Father Who Could Only Watch", weight: 0.8,
        text: "The father who sees all things could do nothing but watch his child fall, burning, into a river." },
    ],
    source: "Hesiod, Theogony; Ovid, Metamorphoses II. Further reading: Ted Hughes, Tales from Ovid."
  },
  selene: {
    story: "Selene is the Moon herself, a calm-browed goddess crowned with a thin bright crescent, who rises when her brother the Sun lies down and rides her silver car across the dark, drawing the tides and the dreams of sleepers softly after her.\n\nHer one great story is a long and tender ache. She looked down one night upon Endymion, a shepherd asleep on a Carian hillside, and loved him past all reason — and rather than watch him grow old and die as mortal men must, she begged that he be granted an endless sleep, ageless and unbroken. So he lies forever young in his cave, breathing slow, and forever the Moon comes down through the dark to bend over him and gaze — loving a man who will never once wake to know that he is loved.",
    beats: [
      { label: "The Silver Car", weight: 0.75, figures: ['helios'],
        text: "Selene is the Moon herself, a calm-browed goddess crowned with a thin bright crescent, who rises when her brother the Sun lies down and rides her silver car across the dark." },
      { label: "Love Past All Reason", weight: 1,
        text: "She looked down one night upon Endymion, a shepherd asleep on a Carian hillside, and loved him past all reason — and rather than watch him grow old and die, she begged that he be granted an endless sleep, ageless and unbroken." },
      { label: "The Sleeper Who Never Wakes", weight: 0.85,
        text: "So he lies forever young in his cave, breathing slow, and forever the Moon comes down through the dark to bend over him and gaze — loving a man who will never once wake to know that he is loved." },
    ],
    source: "Hesiod, Theogony."
  },
  eos: {
    story: "Eos is the Dawn — rosy-fingered, saffron-robed, the goddess who throws open the gates of the east each morning so that her brother the Sun may follow her out. She is lovely and restless, forever falling in love with mortal men and bearing them away into the bright unfolding edge of the day.\n\nHer sorrow is a gift granted in haste. Loving the Trojan prince Tithonus, she begged Zeus to make him immortal, and it was done. But Eos in her longing had forgotten to ask also for his unfading youth — and so her lover could not die and yet could not stay young. He withered and shrank and dried, year upon slow year, until at last there was nothing left of him but a thin, ceaseless voice; and pity, they say, shrank that voice into the cicada, which sings on through every summer in the heat of her brother's light.",
    beats: [
      { label: "Rosy-Fingered Dawn", weight: 0.8, figures: ['helios'],
        text: "Eos is the Dawn — rosy-fingered, saffron-robed, the goddess who throws open the gates of the east each morning so that her brother the Sun may follow her out. Lovely and restless, forever falling in love with mortal men." },
      { label: "A Gift Granted in Haste", weight: 1, figures: ['zeus'],
        text: "Loving the Trojan prince Tithonus, she begged Zeus to make him immortal, and it was done. But Eos in her longing had forgotten to ask also for his unfading youth." },
      { label: "The Voice of the Cicada", weight: 0.85,
        text: "Her lover could not die and yet could not stay young. He withered and shrank, year upon slow year, until there was nothing left of him but a thin, ceaseless voice — and pity shrank that voice into the cicada, which sings on through every summer." },
    ],
    source: "Hesiod, Theogony; Homeric Hymn to Aphrodite."
  },

  // ---- OLYMPIANS ----
  zeus: {
    story: "Zeus is the lord of the bright sky and the gathered storm, youngest son of Cronus who grew to become the father and king of gods and men. His weapon is the thunderbolt, forged by the Cyclopes in gratitude for their deliverance; his word is the binding of every oath; and beneath his hand stand the oldest laws of all — the law of the guest and the host, of the suppliant and the stranger at the door. He is the keeper of cosmic order, the arbiter who holds the quarreling gods in check and weighs the fate of mortals in golden scales.\n\nHe was born in secret on the slopes of Mount Dicte in Crete, where his mother Rhea fled by night to cheat the devouring hunger of Cronus. While a stone wrapped in swaddling-bands went down into his father's belly, the infant Zeus was nursed in a hidden cave by the nymph Amaltheia and guarded by the clash of the Kouretes' shields, whose din drowned out his cries. When he came of age he returned disguised, forced Cronus to disgorge the five gods he had swallowed, and raised the banner of war. For ten grinding years the Titanomachy shook the pillars of the world — Olympian against Titan, thunderbolt against mountain — until Zeus freed the hundred-handed giants from Tartarus and the old order broke at last. The conquered cosmos was divided by lot among three brothers: the sky for Zeus, the wide salt sea for Poseidon, the kingdom of the dead for Hades, while the earth remained common ground.\n\nYet the peace was not yet secure. When Gaia, grieving for her imprisoned Titan sons, loosed the Giants against Olympus, Zeus rallied the gods once more in the terrible Gigantomachy, and it was only with the mortal arm of Heracles fighting beside them that the Giants were overthrown. Even then one last challenger rose — monstrous Typhon, a creature of a hundred serpent-heads — and Zeus alone stood against him, hurling thunderbolts until the beast was crushed beneath Mount Etna, where it smolders still.\n\nHaving secured heaven, Zeus turned to securing wisdom. He swallowed the Titaness Metis, his first consort and the very embodiment of cunning counsel, after a prophecy warned that she would bear a son mightier than his father. From within him she counsels him still, and from his own aching skull their daughter Athena was born, leaping out in full armor. His other unions read like a map of the divine order itself: with Mnemosyne he fathered the nine Muses over nine nights; with Leto he sired the twin archers Apollo and Artemis; with Maia, swift Hermes. Among mortals he wandered in disguise — as a white bull carrying Europa across the sea, as a swan to Leda, as a shower of gold falling into the lap of Danae, mother of Perseus.\n\nSo the king of all order is also its most restless transgressor. His loves father half the heroes of the world and feed the long, unsleeping jealousy of his queen Hera. Yet without him the cosmos has no center, the oaths no witness, the scales no hand to hold them. He is the storm and the calm after the storm, the father who cannot stop fathering and the judge who must answer for none of it — the bright and terrible axis on which the whole of heaven turns.",
    beats: [
      { label: "The Cretan Birth", weight: 0.7, figures: ['rhea', 'cronus'],
        text: "Born in secret on Mount Dicte in Crete, the infant Zeus was hidden in a cave while a swaddled stone went down into his father's belly — nursed by Amaltheia and guarded by the clashing shields of the Kouretes." },
      { label: "The Titanomachy", weight: 1, figures: ['cronus', 'poseidon', 'hades'],
        text: "For ten grinding years the war shook the pillars of the world, until Zeus freed the hundred-handed giants from Tartarus and the old order broke — the conquered cosmos divided by lot among three brothers." },
      { label: "Swallowing Metis", weight: 0.8, figures: ['metis', 'athena'],
        text: "He swallowed the Titaness Metis after prophecy warned her son would surpass him; from within she counsels him still, and from his splitting skull their daughter Athena was born in full armor." },
      { label: "Loves of the Thunder-God", weight: 0.85, figures: ['leto', 'mnemosyne', 'danae'],
        text: "His unions map the divine order itself — nine nights with Mnemosyne for the Muses, Leto for the twin archers, and among mortals he wandered as bull, swan, and shower of gold." },
      { label: "The Gigantomachy", weight: 0.9, figures: ['heracles', 'typhon'],
        text: "When Gaia loosed the Giants against Olympus, Zeus rallied the gods and the mortal Heracles to overthrow them; then he alone stood against monstrous Typhon, crushing the beast beneath Mount Etna." },
      { label: "Keeper of Cosmic Order", weight: 0.75, figures: ['hera'],
        text: "Without him the cosmos has no center, the oaths no witness, the scales no hand — the bright and terrible axis on which heaven turns, storm and calm alike." },
      { label: "The Axis of Heaven", weight: 0.65,
        text: "He is the father who cannot stop fathering and the judge who must answer for none of it — the restless transgressor whose loves feed Hera's jealousy yet father half the heroes of the world." },
    ],
    source: "Hesiod, Theogony."
  },
  hera: {
    story: "Hera is the queen of heaven and the goddess of marriage and the marriage-bond, reigning at Zeus's side with a cold and regal splendor. Daughter of Cronus and Rhea, she was swallowed at birth and brought up again from her father's belly when Zeus compelled it. During the long war between Titans and Olympians, the young goddess was fostered at the far edge of the world by Oceanus and Tethys, growing into her power beside the circling waters where no battle reached.\n\nZeus won her not by command but by cunning. He came to her in the form of a shivering cuckoo, bedraggled in a storm of his own making, and when she drew the little bird against her breast for pity, he resumed his shape and embraced her. She held him to a lawful marriage — the Sacred Wedding, celebrated by all the gods — and from that day the marriage-bond was her dominion: she is its protector, its enforcer, and its most bitter evidence that a vow can be kept and broken at the same time.\n\nMuch of her story, and much of her power, is spent in answering her husband's faithlessness. She hounds his lovers across the earth and torments the children they bear him, none more relentlessly than Heracles, on whom she set both madness and a lifetime of impossible labors. She bound hundred-eyed Argus to watch the girl Io after Zeus had turned her into a heifer; she drove gentle Callisto into the shape of a bear; she lured Semele into demanding Zeus appear in his true form — a demand that burned the girl to ash. When the nymph Echo tried to distract her with chatter while Zeus slipped away, Hera stripped her of original speech and left her only the power to repeat what others said.\n\nOnce she rose against Zeus himself. With Athena and Poseidon she bound the king of the gods in his sleep with a hundred knotted cords, and only the hundred-handed giant Briareus, summoned by Thetis, untied the knots in time. Zeus hung Hera from the sky by golden chains with anvils at her ankles until she swore never to rebel again — yet her defiance, like her jealousy, sleeps lighter than he thinks. At Troy she schemed openly against his will, borrowing Aphrodite's girdle to seduce him into slumber while Poseidon rallied the Greeks below.\n\nWronged, magnificent, and unforgiving, Hera is the storm that each of Zeus's betrayals must sooner or later weather. She is the proof that the keeper of the vow suffers more than the one who breaks it — and that her suffering does not make her gentle.",
    beats: [
      { label: "Queen of Heaven", weight: 0.85, figures: ['cronus', 'rhea'],
        text: "Daughter of Cronus and Rhea, swallowed at birth and fostered by Oceanus and Tethys at the world's edge while the war in heaven raged." },
      { label: "The Cuckoo's Trick", weight: 0.75, figures: ['zeus'],
        text: "Zeus won her not by command but by cunning — he came as a shivering cuckoo in a storm of his own making, and when she drew the bird against her breast for pity, he resumed his shape and claimed her." },
      { label: "The Sacred Wedding", weight: 0.7,
        text: "She held him to a lawful marriage celebrated by all the gods, and from that day the marriage-bond was her dominion — its protector, its enforcer, and its most bitter evidence." },
      { label: "The Wronged Wife", weight: 0.9, figures: ['heracles', 'io', 'callisto', 'semele'],
        text: "She hounds Zeus's lovers and torments the children they bear him — Argus set to watch Io, Callisto driven into a bear's shape, Semele lured into a demand that burned her to ash, Echo stripped of her own voice." },
      { label: "Rebellion in Heaven", weight: 1, figures: ['athena', 'poseidon', 'thetis'],
        text: "Once she rose against Zeus himself, binding him in a hundred knotted cords with Athena and Poseidon — and was hung from the sky by golden chains with anvils at her ankles until she swore never to rebel again." },
      { label: "Scheming at Troy", weight: 0.8, figures: ['aphrodite'],
        text: "At Troy she borrowed Aphrodite's girdle to seduce Zeus into slumber while Poseidon rallied the Greeks below — her defiance sleeps lighter than the king of the gods thinks." },
      { label: "The Storm", weight: 0.7,
        text: "She is the proof that the keeper of the vow suffers more than the one who breaks it — and that her suffering does not make her gentle." },
    ],
    source: "Hesiod, Theogony; Homer, Iliad."
  },
  poseidon: {
    story: "Poseidon is the lord of the sea, the shaker of the earth, and the maker of horses — a vast and moody god whose trident lifts the storm-wave and splits the dry ground into earthquake. Like his brothers and sisters he was swallowed at birth by Cronus, who feared the children fate had promised would overthrow him. He lay in his father\'s dark until Zeus forced the Titan to disgorge them all, and from that shared captivity the three brothers rose together to break the old order.\n\nWhen the Titanomachy was won, the conquered cosmos was divided by lot: the sky for Zeus, the kingdom of the dead for Hades, and the wide salt water for Poseidon. He took his trident — forged, like Zeus\'s bolt, by the Cyclopes — and descended to his palace on the ocean floor. But the sea-nymph Amphitrite, whom he desired for his queen, fled from his courtship to the farthest reach of the deep. It was a dolphin who found her hiding among the Nereids and spoke so sweetly on Poseidon\'s behalf that she relented; in gratitude the god set the dolphin among the stars, where it shines still.\n\nHis pride ran deeper than his waters. When he and Apollo were sent by Zeus to build the great walls of Troy for King Laomedon, the king cheated them of their promised wage — and Poseidon\'s rage against Troy smoldered for generations. He struck the earth with his trident and from the bare rock the first horse leapt forth, neck arched and mane streaming, a gift of wild power that no other god could match. Yet when he vied with Athena for patronage of Athens, the judges chose her grey-green olive over his salt spring, and the slight cut him to the bone.\n\nAbove all he is a god of long memory and longer grudges. When Odysseus blinded Polyphemus, Poseidon\'s own Cyclops son, the god pursued the hero across ten bitter years of sea, raising every wind and wreck and whirlpool he could against the man — for to wrong what Poseidon loves is to make an enemy of the whole heaving ocean, and the ocean does not tire.",
    beats: [
      { label: "Swallowed and Returned", weight: 0.6, figures: ['cronus', 'zeus'],
        text: "Like his brothers and sisters he was swallowed at birth by Cronus, lying in his father\'s dark until Zeus forced the Titan to disgorge them all — and from that shared captivity the three brothers rose to break the old order." },
      { label: "Lord of the Sea", weight: 1, figures: ['hades'],
        text: "When the Titanomachy was won, the cosmos was divided by lot: the sky for Zeus, the dead for Hades, and the wide salt water for Poseidon. He took his trident and descended to his palace on the ocean floor." },
      { label: "The Dolphin\'s Errand", weight: 0.75, figures: ['amphitrite'],
        text: "Amphitrite fled from his courtship to the farthest reach of the deep, but a dolphin found her and spoke so sweetly on his behalf that she relented. In gratitude Poseidon set the dolphin among the stars." },
      { label: "The Walls of Troy", weight: 0.7, figures: ['apollo'],
        text: "When he and Apollo were sent to build the great walls of Troy, King Laomedon cheated them of their promised wage — and Poseidon\'s rage against the city smoldered for generations." },
      { label: "The First Horse", weight: 0.8,
        text: "He struck the earth with his trident and from the bare rock the first horse leapt forth, neck arched and mane streaming — a gift of wild power that no other god could match." },
      { label: "The Contest for Athens", weight: 0.85, figures: ['athena'],
        text: "When he vied with Athena for patronage of Athens, the judges chose her grey-green olive over his salt spring. The slight cut him to the bone, and he never once forgave the city for it." },
      { label: "The Ten-Year Vendetta", weight: 0.9, figures: ['odysseus', 'polyphemus'],
        text: "When Odysseus blinded Polyphemus, Poseidon\'s own Cyclops son, the god pursued the hero across ten bitter years of sea — for to wrong what Poseidon loves is to make an enemy of the whole heaving ocean, and the ocean does not tire." },
    ],
    source: "Homer, Odyssey; Hesiod, Theogony; Homeric Hymn to Poseidon."
  },
  demeter: {
    story: "Demeter is the goddess of the grain and the gift of the harvest, the gentle power who taught mortals to break the earth, sow the seed, and reap the standing corn. Daughter of Cronus and Rhea, she was swallowed at birth like all her siblings and lay in her father\'s dark until Zeus compelled him to give them back. Where she walks in contentment the fields run gold to the horizon; where she grieves, nothing at all will grow.\n\nAnd once she grieved beyond all bearing. While her daughter Persephone gathered flowers in a meadow, the ground tore open and Hades rose in his black chariot and bore the girl down to be his queen. Demeter searched the whole wide world with a kindled torch in either hand, nine days without rest. At last she wandered to Eleusis disguised as an old woman in mourning, and was taken in by the household of King Celeus. There she nursed the infant Demophon, and each night she held him in the heart of the fire, burning away his mortality — until his mother saw and screamed, and the goddess, interrupted, cast the child down and revealed herself in blazing radiance.\n\nWhen Helios at last told her the truth of Persephone\'s abduction, her grief turned to fury. She withdrew her gift from the earth and let the soil go barren. No seed sprouted, no stalk bent with grain, and a famine crept across the world that would have ended humankind had Zeus not intervened. But Persephone had already eaten the seeds of a pomegranate in the dark, and so was bound to return to Hades for a portion of every year — the compromise that broke and healed the goddess\'s heart at once.\n\nBefore she left Eleusis, Demeter taught her secret rites to the people there — the Mysteries that promised initiates some grace beyond the grave. And she gave to the young prince Triptolemus a chariot drawn by winged serpents and ears of sacred grain, and sent him across the whole earth to teach every nation the art of the plough. So from one mother\'s grief the world received both its seasons and its bread.",
    beats: [
      { label: "Daughter of Cronus", weight: 0.6, figures: ['cronus', 'rhea'],
        text: "Daughter of Cronus and Rhea, Demeter was swallowed at birth like all her siblings and lay in her father\'s dark until Zeus compelled him to give them back." },
      { label: "The Stolen Daughter", weight: 1, figures: ['persephone', 'hades'],
        text: "While Persephone gathered flowers in a meadow, the ground tore open and Hades rose in his black chariot and bore the girl down to be his queen. Demeter searched the world with a torch in either hand, nine days without rest." },
      { label: "The Old Woman at Eleusis", weight: 0.75,
        text: "She wandered to Eleusis disguised as an old woman in mourning, taken in by the household of King Celeus — and there nursed the infant Demophon, holding him in the heart of the fire each night to burn away his mortality." },
      { label: "The Child in the Fire", weight: 0.7,
        text: "His mother saw and screamed, and the goddess, interrupted, cast the child down and revealed herself in blazing radiance — the immortal rite broken by mortal fear." },
      { label: "The World Goes Barren", weight: 0.9, figures: ['zeus', 'helios'],
        text: "When Helios told her the truth, her grief turned to fury. She withdrew her gift from the earth and let the soil go barren — a famine that would have ended humankind, had Zeus not forced a bargain." },
      { label: "The Pomegranate Seeds", weight: 0.85, figures: ['persephone'],
        text: "But Persephone had eaten pomegranate seeds in the dark, and so was bound to return to Hades for a portion of every year. The world goes cold when the daughter goes down, and breaks into green when she climbs back into her mother\'s arms." },
      { label: "The Winged Chariot", weight: 0.7,
        text: "Demeter gave young Triptolemus a chariot drawn by winged serpents and ears of sacred grain, and sent him across the whole earth to teach every nation the art of the plough. From one mother\'s grief the world received both its seasons and its bread." },
    ],
    source: "Homeric Hymn to Demeter; Ovid, Metamorphoses V."
  },
  hestia: {
    story: "Hestia is the goddess of the hearth and its quiet, unfailing fire — eldest of the children of Cronus and Rhea, and so the first he swallowed and the last he gave back up, making her both the eldest and the youngest of the gods at once. Hers is the still center of every house and every city, the flame that must never be allowed to go out.\n\nWhen both Apollo and Poseidon desired her, Hestia swore by the head of Zeus to remain a virgin forever, and Zeus granted her in return the highest honor of his household: the first and last portion of every sacrifice offered by mortals would belong to her. No feast could begin and no prayer could close without naming her first, so that the quietest goddess became the most constantly invoked.\n\nIn every Greek city the public hearth — the prytaneum — burned with her fire, and when colonists set out to found a new settlement they carried an ember from the mother-city\'s flame, so that Hestia\'s presence traveled with them across the sea. She was the invisible thread that bound every hall and every altar into a single civilization of warmth.\n\nOnce, at a feast of the gods while Hestia slept, the crude god Priapus crept toward her in the dark. But a donkey brayed so loudly that the goddess woke and the other gods came running — the beast\'s ridiculous cry saving what all the powers of heaven had not thought to guard. The donkey was honored ever after at her festivals.\n\nGentlest and least quarrelsome of the Olympians, she gave up her very throne when Dionysus came late to heaven, choosing the warmth of the hearth-stone over the splendor of a seat among the Twelve. She has almost no myths of her own — and that is precisely her nature: she is the one who stays and keeps the fire while the others go out to make the stories.",
    beats: [
      { label: "First and Last Born", weight: 0.85, figures: ['cronus', 'rhea'],
        text: "Eldest of the children of Cronus and Rhea, Hestia was the first he swallowed and the last he gave back up — making her both the eldest and the youngest of the gods at once." },
      { label: "The Unwed Oath", weight: 1, figures: ['apollo', 'poseidon', 'zeus'],
        text: "When both Apollo and Poseidon desired her, Hestia swore by the head of Zeus to remain a virgin forever, and in return received the first and last portion of every sacrifice — the quietest goddess, the most constantly invoked." },
      { label: "The First Portion", weight: 0.75,
        text: "No feast could begin and no prayer could close without naming her first, so that every mortal hearth and every divine altar answered to her presence before any other god\'s." },
      { label: "The Living Ember", weight: 0.8,
        text: "In every Greek city the public hearth burned with her fire, and colonists carried an ember from the mother-city\'s flame across the sea — Hestia the invisible thread that bound every hall into a single civilization of warmth." },
      { label: "The Donkey\'s Bray", weight: 0.7,
        text: "At a feast of the gods, Priapus crept toward the sleeping Hestia in the dark — but a donkey brayed so loudly she woke and the gods came running, the beast\'s ridiculous cry saving what heaven had not thought to guard." },
      { label: "The Yielded Throne", weight: 0.65, figures: ['dionysus'],
        text: "She gave up her Olympian throne when Dionysus came late to heaven, choosing the warmth of the hearth-stone over the splendor of a seat — the one who stays and keeps the fire while the others go out to make the stories." },
    ],
    source: "Homeric Hymn to Hestia; Ovid, Fasti VI."
  },
  athena: {
    story: "Athena is the grey-eyed goddess of wisdom, of just war and shrewd strategy, and of every disciplined craft from the loom to the shipwright's adze. Cool, clear, and undeceived, she is the patron of heroes who think — guiding Perseus to Medusa, steadying Odysseus through every trial, and giving the city of Athens both her name and her grey-green olive tree.\n\nHer birth is among the strangest in all heaven. Zeus had swallowed her mother Metis, the Titaness of cunning, for fear of the child she carried; but the child grew within him all the same, until his skull split with an unbearable ache and Athena sprang forth full-grown, in gleaming armor, with a war-cry that rang across Olympus. Born of pure mind and never of a mother's body, she is wisdom that has known no childhood — and she guards her dignity without mercy, loosing the proud mortal Arachne into the shape of the first spider for daring to match her at the loom.",
    beats: [
      { label: "Grey-Eyed Wisdom", weight: 1,
        text: "Athena is the grey-eyed goddess of wisdom, of just war and shrewd strategy, and of every disciplined craft. Cool, clear, and undeceived, she is the patron of heroes who think." },
      { label: "Born from the Skull of Zeus", weight: 0.95, figures: ['zeus', 'metis'],
        text: "Zeus had swallowed her mother Metis for fear of the child she carried; but the child grew within him until his skull split and Athena sprang forth full-grown, in gleaming armor, with a war-cry that rang across Olympus." },
      { label: "Patron of Heroes", weight: 0.75, figures: ['perseus', 'odysseus'],
        text: "Wisdom that knew no childhood, she guides Perseus to Medusa, steadies Odysseus through every trial, and gave the city of Athens both her name and her grey-green olive tree." },
      { label: "No Mercy for Pride", weight: 0.7, figures: ['arachne'],
        text: "She guards her dignity without mercy — loosing the proud mortal Arachne into the shape of the first spider for daring to match her at the loom." },
    ],
    source: "Hesiod, Theogony; Ovid, Metamorphoses VI. Further reading: Ted Hughes, Tales from Ovid."
  },
  apollo: {
    story: "Apollo is the radiant god of light, music, healing, archery, and prophecy — the most luminous of the Olympians, whose lyre sets the order of the heavens and whose far-shooting bow brings both the plague and its cure. Twin of Artemis, son of Zeus and Leto, he is beauty and clarity made divine.\n\nNewborn and scarcely grown, he came to Delphi and slew the great earth-serpent Python that coiled about the oracle, claiming the navel of the world for his own voice; ever after, his priestess breathed the future from that place. Yet for all his brilliance the god is strangely luckless in love. Having mocked little Eros, he was struck with an arrow of helpless longing and pursued the nymph Daphne through the woods until, at the very edge of her strength, she begged the earth to save her and turned to laurel in his arms — bark closing over her heart as he embraced it. He could only break a branch to crown himself, holding forever the one thing he could not have.",
    beats: [
      { label: "The Radiant Twin", weight: 0.85, figures: ['artemis', 'zeus', 'leto'],
        text: "Apollo is the most luminous of the Olympians — twin of Artemis, son of Zeus and Leto, beauty and clarity made divine, whose lyre sets the order of the heavens and whose far-shooting bow brings both the plague and its cure." },
      { label: "The Serpent at Delphi", weight: 0.9,
        text: "Newborn and scarcely grown, he came to Delphi and slew the great earth-serpent Python that coiled about the oracle, claiming the navel of the world for his own voice; ever after, his priestess breathed the future from that place." },
      { label: "Laurel in His Arms", weight: 1, figures: ['eros', 'daphne'],
        text: "Having mocked little Eros, he was struck with an arrow of helpless longing and pursued the nymph Daphne through the woods until she begged the earth to save her and turned to laurel in his arms — bark closing over her heart as he embraced it." },
      { label: "The Crown He Keeps", weight: 0.6,
        text: "He could only break a branch to crown himself, holding forever the one thing he could not have." },
    ],
    source: "Homeric Hymn to Apollo; Ovid, Metamorphoses I. Further reading: Ted Hughes, Tales from Ovid."
  },
  artemis: {
    story: "Artemis is the goddess of the hunt, the wild wood, the untrodden places, and the silver moon — twin sister of Apollo, born first and said to have helped her own mother bring her brother into the light. Swift, chaste, and free, she runs the mountains with her band of nymphs and her hounds, and guards her solitude with a deadly silver bow.\n\nWoe to any who trespass upon it. When the hunter Actaeon, lost in the forest, stumbled by pure chance upon the goddess bathing naked in a pool, she would suffer no man who had seen her so to live to speak of it; she flung the cold water in his face, and he felt antlers branch from his brow, his neck lengthen, his cry break into a stag's. His own hounds, no longer knowing their master, ran him down and tore him apart upon the leaves. Such is Artemis — tender to the young and the wild, and utterly without mercy toward whatever lays a hand on what is hers.",
    beats: [
      { label: "Goddess of the Wild", weight: 0.85, figures: ['apollo', 'leto'],
        text: "Artemis is the goddess of the hunt, the wild wood, and the silver moon — twin sister of Apollo, born first and said to have helped her own mother bring her brother into the light. Swift, chaste, and free, she guards her solitude with a deadly silver bow." },
      { label: "The Hunter Trespasses", weight: 0.9, figures: ['actaeon'],
        text: "When the hunter Actaeon, lost in the forest, stumbled by pure chance upon the goddess bathing naked in a pool, she would suffer no man who had seen her so to live to speak of it; she flung the cold water in his face." },
      { label: "The Stag's Cry", weight: 1,
        text: "He felt antlers branch from his brow, his neck lengthen, his cry break into a stag's. His own hounds, no longer knowing their master, ran him down and tore him apart upon the leaves." },
      { label: "Tender and Merciless", weight: 0.65,
        text: "Such is Artemis — tender to the young and the wild, and utterly without mercy toward whatever lays a hand on what is hers." },
    ],
    source: "Homeric Hymn to Artemis; Ovid, Metamorphoses III. Further reading: Ted Hughes, Tales from Ovid."
  },
  hephaestus: {
    story: "Hephaestus is the smith of the gods, the lame master of fire and the forge, and the one Olympian who truly labors — and out of his labor come wonders no other hand could shape: the armor of heroes, self-moving servants of gold, the very thrones and palaces of heaven.\n\nHis own mother cast him out. Hera, ashamed to have borne a crippled son, flung him from the height of Olympus, and he fell a whole day through the bright air before he struck the sea near Lemnos, lamed for good. But the sea received what heaven rejected: Thetis and the Oceanid Eurynome drew the broken child from the waves and raised him in an ocean grotto, where for nine years he learned the secrets of fire and metal, hammering his first wonders in the dark beneath the surf.\n\nWhen he was grown he sent his mother a gift — a throne of surpassing beauty that locked her fast the instant she sat. No god could prise the clever mechanism open, and Hera sat trapped and raging until Dionysus went down to find the smith, got him cheerfully drunk, and led him back to Olympus on a donkey, wreathed in ivy and grinning, to free her at last.\n\nZeus gave him Aphrodite in marriage, but the goddess of love had never wanted the lame craftsman and turned instead to Ares. Hephaestus, patient and precise, forged a net of bronze links finer than any spider\'s thread, slung it above his own marriage bed, and caught the two lovers tangled in the act, hauling them up for all the gods of Olympus to see and laugh at — proving that craft and patience could shame even the strongest and the most beautiful.\n\nHis greatest single work was the shield he forged for Achilles: a vast disc that held the earth and sea and sky, cities at war and cities at peace, a wedding and a harvest and a vintage, the whole turning world beaten into immortal bronze in a single night of fire.",
    beats: [
      { label: "Cast from Olympus", weight: 0.9, figures: ['hera'],
        text: "His own mother cast him out. Hera, ashamed to have borne a crippled son, flung him from the height of Olympus, and he fell a whole day through the bright air before he struck the sea, lamed for good." },
      { label: "Raised by the Sea", weight: 0.7, figures: ['thetis'],
        text: "The sea received what heaven rejected: Thetis and the Oceanid Eurynome drew the broken child from the waves and raised him in an ocean grotto, where for nine years he learned the secrets of fire and metal, hammering his first wonders in the dark beneath the surf." },
      { label: "The Golden Throne", weight: 0.85, figures: ['hera'],
        text: "He sent his mother a throne of surpassing beauty that locked her fast the instant she sat. No god could prise the clever mechanism open, and Hera sat trapped and raging until someone went to bargain with the smith she had thrown away." },
      { label: "The Donkey Ride Home", weight: 0.65, figures: ['dionysus'],
        text: "Dionysus went down to find him, got him cheerfully drunk, and led him back to Olympus on a donkey, wreathed in ivy and grinning, to free Hera at last — the rejected son returning in triumph and laughter." },
      { label: "The Unwanted Bride", weight: 0.75, figures: ['aphrodite'],
        text: "Zeus gave him Aphrodite in marriage, but the goddess of love had never wanted the lame craftsman and turned instead to Ares — beauty paired with strength, while patience worked alone at the forge." },
      { label: "The Bronze Net", weight: 1, figures: ['aphrodite', 'ares'],
        text: "Hephaestus forged a net of bronze links finer than any spider\'s thread, slung it above his own marriage bed, and caught the two lovers tangled in the act — hauling them up for all Olympus to laugh at, proving that craft can shame even the strong and the beautiful." },
      { label: "The Shield of Achilles", weight: 0.8,
        text: "His greatest work was the shield he forged for Achilles: a vast disc that held the earth and sea and sky, cities at war and cities at peace, a wedding and a harvest and a vintage — the whole turning world beaten into immortal bronze in a single night of fire." },
    ],
    source: "Homer, Odyssey VIII; Iliad XVIII; Homeric Hymn to Hephaestus."
  },
  ares: {
    story: "Ares is the god of war in its rawest form — not the cool generalship of the battlefield but the blood-thrill, the slaughter, the screaming chaos where the spears press close. Son of Zeus and Hera, he is the least loved of all the Olympians; his own father tells him to his face that of all the gods he is the most hateful, and his mother regards him with a chill she shows to no other child. Where Athena brings war ordered toward a purpose, Ares brings only the savage joy of the killing.\n\nHe is war without strategy, the red joy of the charge and the ruin left behind it. His war-cry alone could shatter the nerve of armies, and he rode into battle with his sons Phobos and Deimos — Fear and Terror — running at his chariot wheels, so that panic arrived before the spears. The old stories take a quiet pleasure in humbling him, as though the Greeks themselves distrusted a god who loved only the carnage.\n\nSnared in Hephaestus\'s invisible net in the arms of Aphrodite, he was held up naked and ridiculous before the assembled gods — strength and beauty caught and shamed by patience and a clever hand. On the plain of Troy, where even gods took sides, the mortal hero Diomedes drove a spear clean into his belly, guided by Athena\'s own hand, and Ares fled bellowing back to Olympus trailing a scream like the roar of ten thousand men, to nurse his wound and complain to Zeus, who turned him away without pity.\n\nYet once his violence served a righteous cause. When Poseidon\'s son Halirrhothius assaulted Ares\' daughter, the war-god killed him outright and was brought to trial by the other gods on a rocky hill above Athens. He was acquitted — and that hill became the Areopagus, the court that bore his name, the one monument to Ares that stood for justice rather than slaughter.",
    beats: [
      { label: "The Most Hateful God", weight: 0.85, figures: ['zeus', 'hera'],
        text: "Ares is the god of war in its rawest form — the blood-thrill, the slaughter, the screaming chaos where the spears press close. Son of Zeus and Hera, he is the least loved of all the Olympians; his own father tells him he is the most hateful." },
      { label: "The Roar of Battle", weight: 0.7,
        text: "He is war without strategy, the red joy of the charge and the ruin left behind it. His war-cry alone could shatter the nerve of armies, and he rode into battle with panic arriving before the spears." },
      { label: "Snared in the Net", weight: 1, figures: ['hephaestus', 'aphrodite'],
        text: "Snared in Hephaestus\'s invisible net in the arms of Aphrodite, he was held up naked and ridiculous before the assembled gods — strength and beauty caught and shamed by patience and a clever hand." },
      { label: "Wounded at Troy", weight: 0.9, figures: ['athena'],
        text: "On the plain of Troy the mortal hero Diomedes drove a spear into his belly, guided by Athena\'s own hand, and Ares fled bellowing back to Olympus with a wound that stung his pride far more than his flesh." },
      { label: "The Trial on the Hill", weight: 0.8, figures: ['poseidon'],
        text: "When Poseidon\'s son Halirrhothius assaulted Ares\' daughter, the war-god killed him outright and was brought to trial on a rocky hill above Athens. He was acquitted — and that hill became the Areopagus, the one monument to Ares that stood for justice rather than slaughter." },
      { label: "Fear and Terror", weight: 0.65, figures: ['aphrodite'],
        text: "His children by Aphrodite were Phobos and Deimos — Fear and Terror — who ran at his chariot wheels so that dread preceded him onto every field. Even his offspring were instruments of war." },
    ],
    source: "Homer, Iliad V; Homer, Odyssey VIII; Apollodorus, Bibliotheca."
  },
  aphrodite: {
    story: "Aphrodite is the goddess of love, desire, and beauty — the irresistible power that bends gods and mortals alike, that raises cities up and pulls them down, that no will in heaven or earth can finally refuse. Where she passes, the grass breaks into flower and the doves wheel overhead; what she wants, sooner or later, she has.\n\nShe was born of no mother, out of an act of violence turned somehow to beauty. When Cronus cut the manhood from his father Uranus and flung it into the sea, a white foam gathered about the drifting flesh upon the waves, and out of that foam rose a goddess already full-grown, who stepped ashore on Cyprus with flowers springing wherever her feet touched the sand. So the gentlest of all powers came from the cruelest of deeds — and perhaps that is why her gifts cut both ways, her favor and her spite each able, in a single season, to remake the whole of the world.",
    beats: [
      { label: "Goddess of Desire", weight: 1,
        text: "Aphrodite is the goddess of love, desire, and beauty — the irresistible power that bends gods and mortals alike, that no will in heaven or earth can finally refuse." },
      { label: "Born of the Foam", weight: 0.95, figures: ['cronus', 'uranus'],
        text: "She was born of no mother. When Cronus cut the manhood from Uranus and flung it into the sea, a white foam gathered about the drifting flesh, and out of it rose a goddess already full-grown." },
      { label: "Ashore on Cyprus", weight: 0.7,
        text: "She stepped ashore on Cyprus with flowers springing wherever her feet touched the sand — the gentlest of all powers, come from the cruelest of deeds." },
      { label: "A Gift That Cuts Both Ways", weight: 0.8,
        text: "Perhaps that is why her gifts cut both ways: her favor and her spite are each able, in a single season, to remake the whole of the world." },
    ],
    source: "Hesiod, Theogony."
  },
  hermes: {
    story: "Hermes is the quick-footed messenger of the gods, the patron of travelers and traders, of heralds and thieves and lucky finds, and the keeper of every boundary and crossroads. Wing-sandalled, bearing the herald's staff, he alone moves freely between Olympus, the green earth, and the silent country of the dead, whose souls he leads gently down at the close of their lives.\n\nHe was a trickster from the first hour of his life. Born at dawn in a cave to Zeus and the shy nymph Maia, he climbed from his cradle before nightfall, invented the lyre from a tortoise-shell he found at the door, and then slipped away to steal the cattle of his elder brother Apollo — driving them backward so their tracks would lie. Hauled up to Olympus to answer for the theft, the infant lied so sweetly, and played his new-made lyre so beautifully, that Apollo forgave everything, traded the stolen herd for the instrument, and the two became fast friends. So the youngest Olympian charmed his way into the company of the gods before he could rightly walk.",
    beats: [
      { label: "The God of Crossroads", weight: 0.8,
        text: "Hermes is the quick-footed messenger of the gods, patron of travelers and traders, of heralds and thieves and lucky finds. Wing-sandalled, bearing the herald\'s staff, he alone moves freely between Olympus, the green earth, and the silent country of the dead." },
      { label: "Born a Trickster", weight: 0.9, figures: ['zeus', 'maia'],
        text: "He was a trickster from his first hour. Born at dawn in a cave to Zeus and the shy nymph Maia, he climbed from his cradle before nightfall, invented the lyre from a tortoise-shell, and slipped away to steal the cattle of his elder brother." },
      { label: "The Stolen Herd", weight: 1, figures: ['apollo'],
        text: "Hauled up to Olympus to answer for the theft, the infant lied so sweetly and played his new-made lyre so beautifully that Apollo forgave everything, traded the stolen herd for the instrument, and the two became fast friends." },
      { label: "Charmed into Heaven", weight: 0.6,
        text: "So the youngest Olympian charmed his way into the company of the gods before he could rightly walk." },
    ],
    source: "Homeric Hymn to Hermes."
  },
  dionysus: {
    story: "Dionysus is the god of the vine and of wine, of ecstasy and the theatre and the wild release that loosens the bound and ordered self — the one Olympian born of a mortal woman, the god who arrives from outside and changes whatever he touches. He carries joy and freedom in one hand and madness and ruin in the other, and offers either without warning.\n\nHe was born twice over. His mother, the princess Semele, was tricked by jealous Hera into begging Zeus to show himself in his full divinity, and the sight of the unveiled god burned her to ash where she stood — but Zeus snatched the unborn child from the fire and sewed it into his own thigh, from which Dionysus was brought forth a second time, now wholly divine. Ever after he wanders the world with his reeling, ivy-crowned followers, blessing all who welcome him and destroying those who will not: when King Pentheus of Thebes denied his godhood and tried to cage his rites, the god drove the women of the city into a frenzy, and Pentheus was torn limb from limb by the hands of his own mother, who in her madness took her son for a lion.",
    beats: [
      { label: "The God Who Arrives", weight: 0.85,
        text: "Dionysus is the god of the vine and of wine, of ecstasy and the theatre and the wild release — the one Olympian born of a mortal woman, the god who arrives from outside and changes whatever he touches. He carries joy in one hand and madness in the other." },
      { label: "Born Twice Over", weight: 1, figures: ['semele', 'hera', 'zeus'],
        text: "His mother Semele was tricked by jealous Hera into begging Zeus to show himself in his full divinity, and the sight burned her to ash — but Zeus snatched the unborn child from the fire and sewed it into his own thigh, from which Dionysus was brought forth a second time, now wholly divine." },
      { label: "Welcome or Ruin", weight: 0.7,
        text: "Ever after he wanders the world with his reeling, ivy-crowned followers, blessing all who welcome him and destroying those who will not." },
      { label: "The Madness of Pentheus", weight: 0.9,
        text: "When King Pentheus of Thebes denied his godhood and tried to cage his rites, the god drove the women of the city into a frenzy, and Pentheus was torn limb from limb by the hands of his own mother, who in her madness took her son for a lion." },
    ],
    source: "Ovid, Metamorphoses III; Euripides, Bacchae. Further reading: Ted Hughes, Tales from Ovid."
  },

  // ---- CHTHONIC ----
  hades: {
    story: "Hades is the lord of the dead and the master of the world below, a stern and shadowed god who rules the silent realm that bears his name. He is not wicked, only final — cold and just in the way death itself is just, neither cruel nor kind, simply the end from which there is no road back.\n\nHe was the eldest son of Cronus and Rhea, swallowed first and disgorged last when Zeus forced his father to bring up all he had eaten. In the war that followed, the Cyclopes forged for each brother a weapon of terrible power: Zeus received the thunderbolt, Poseidon the trident, and Hades a helm of invisibility — the Cap of Darkness, which rendered its wearer unseen even by gods. Wearing it, he slipped among the Titans like a cold wind, sowing ruin none could trace.\n\nWhen the war was won and the three brothers cast lots for the conquered cosmos, the dim underworld fell to Hades, and he went down into it and seldom climbed out again. His one great venture into the upper world was a theft of love: he saw Persephone gathering flowers in a sunlit meadow, opened the earth beneath her feet, and bore her down in his black chariot to be his queen. But Persephone had tasted the pomegranate of the dead — six seeds on her lips — and that taste bound her to return to the shadows each year, so that even Demeter\'s terrible grieving could not wholly reclaim her daughter.\n\nOnce, the singer Orpheus descended alive into the kingdom of the dead, playing his lyre so sweetly that even the shades wept. Hades, moved for the only time in all the ages, agreed to release the dead wife Eurydice — on the sole condition that Orpheus walk ahead and never look back until they reached the light. At the very threshold, the singer turned, and she was lost again forever. And once more his kingdom was violated: Heracles came down on his final labor, seized the three-headed hound Cerberus with his bare hands, and dragged him up into the daylight — the only mortal ever to breach the gates of the dead and return with a trophy.",
    beats: [
      { label: "Swallowed and Freed", weight: 0.7, figures: ['cronus', 'zeus'],
        text: "He was the eldest son of Cronus and Rhea, swallowed first and disgorged last when Zeus forced his father to bring up all he had eaten — born twice, in a sense, into a world already at war." },
      { label: "The Threefold Division", weight: 0.65, figures: ['zeus', 'poseidon'],
        text: "When the three brothers cast lots for the conquered cosmos, the dim underworld fell to Hades. He went down into it and seldom climbed out again, lord of every soul that would ever cease to breathe." },
      { label: "The Helm of Darkness", weight: 0.8,
        text: "The Cyclopes forged him the Cap of Darkness, a helm that rendered its wearer unseen even by gods. Wearing it in the Titanomachy, he slipped among the enemy ranks like a cold wind, sowing ruin none could trace." },
      { label: "Seizing the Queen", weight: 1, figures: ['persephone'],
        text: "His one great venture into the upper world was a theft of love: he saw Persephone gathering flowers in a sunlit meadow, opened the earth beneath her feet, and bore her down in his black chariot to be his queen." },
      { label: "The Pomegranate Trick", weight: 0.9, figures: ['demeter'],
        text: "Persephone had tasted the pomegranate of the dead — six seeds on her lips — and that taste bound her to return each year, so that even Demeter\'s terrible grieving could not wholly reclaim her daughter." },
      { label: "Orpheus and Eurydice", weight: 0.85,
        text: "The singer Orpheus descended alive into the kingdom of the dead, playing his lyre so sweetly that Hades, moved for the only time in all the ages, agreed to release Eurydice — on the condition that Orpheus never look back. At the very threshold, the singer turned, and she was lost forever." },
      { label: "The Hound Dragged Up", weight: 0.75, figures: ['heracles', 'cerberus'],
        text: "Heracles came down on his final labor, seized the three-headed hound Cerberus with his bare hands, and dragged him into the daylight — the only mortal ever to breach the gates of the dead and return with a trophy." },
    ],
    source: "Homeric Hymn to Demeter; Hesiod, Theogony; Apollodorus, Bibliotheca."
  },
  persephone: {
    story: "Persephone is the maiden of spring who became the queen of the dead — two goddesses in a single body, the girl gathering flowers in the sun and the dread sovereign of the world below. Daughter of Demeter and Zeus, she was called Kore in her innocence, the bright daughter around whom the whole green world turned, beloved above all things by a mother who would let the earth itself starve rather than lose her.\n\nShe was a girl in a meadow, reaching for a strange and beautiful narcissus that the earth had put forth as a lure — a hundred blossoms sprung from a single root, so sweet that the sky and the sea and the dark ground laughed for joy. But when she reached for it the ground tore open beneath her and Hades surged up in his dark chariot and seized her, dragging her down before she could so much as cry out. Her scream echoed across the peaks, but only Hecate in her cave and Helios in his chariot heard it.\n\nBelow, the frightened girl found herself queen of a silent kingdom, and slowly, terribly, she grew into the role — learning the weight of the crown and the cold patience that ruling the dead demands. She was no longer merely a captive but a presence the shades themselves obeyed.\n\nIn her grief she ate six small seeds of a pomegranate, and that taste of the food of the dead bound her to the shadows forever after. So a bargain was struck: she rises each spring to walk the earth at her mother\'s side, and the world breaks into flower at her coming; each autumn she descends again to her cold throne, and the world withers behind her. The turning between the two is the turning of the year itself — Demeter\'s joy and Demeter\'s sorrow written across every field.\n\nIn time she became not merely Hades\' consort but a judge of the dead in her own right, weighing the lives that streamed endlessly through the gates. And when the singer Orpheus came down alive to beg for his wife, it was Persephone who wept at the beauty of his song — and Persephone, clear-eyed, who imposed the fatal condition: walk ahead, never look back. She knew what love would do.",
    beats: [
      { label: "Daughter of Light", weight: 0.7, figures: ['demeter', 'zeus'],
        text: "Daughter of Demeter and Zeus, she was called Kore in her innocence — the bright daughter around whom the whole green world turned, knowing nothing yet of the dark below." },
      { label: "The Narcissus Trap", weight: 0.9, figures: ['hades'],
        text: "She was reaching for a strange and beautiful narcissus that the earth had put forth as a lure when the ground tore open beneath her and Hades surged up in his dark chariot, dragging her down before she could cry out." },
      { label: "Queen of the Dead", weight: 0.85,
        text: "Below, the frightened girl found herself queen of a silent kingdom, and slowly, terribly, she grew into the role — learning the weight of the crown and the cold patience that ruling the dead demands." },
      { label: "The Pomegranate Seeds", weight: 1,
        text: "In her grief she ate six small seeds of a pomegranate, and that taste of the food of the dead bound her to the shadows forever after — the single act that made the bargain irreversible." },
      { label: "The Turning Year", weight: 0.8, figures: ['demeter'],
        text: "She rises each spring and the world breaks into flower; each autumn she descends again to her cold throne and the world withers behind her. The turning between the two is the turning of the year itself." },
      { label: "Judge of the Dead", weight: 0.65, figures: ['hades'],
        text: "In time she became not merely Hades\' consort but a judge of the dead in her own right, weighing the lives that streamed endlessly through the gates — no longer the stolen girl, but a sovereign." },
      { label: "The Fatal Condition", weight: 0.75,
        text: "When the singer Orpheus came down alive to beg for his wife, it was Persephone who wept at the beauty of his song — and Persephone, clear-eyed, who imposed the condition: walk ahead, never look back. She knew what love would do." },
    ],
    source: "Homeric Hymn to Demeter; Ovid, Metamorphoses V; Apollodorus, Bibliotheca."
  },
  hecate: {
    story: "Hecate is the goddess of the crossroads, of witchcraft and the moonless dark, of thresholds and the magic that gathers wherever one way gives onto another. Alone among the gods she holds a portion of power in all three realms at once — earth, sea, and sky — and passes freely between the living and the dead.\n\nTorch-bearing, and often shown with three faces turned to watch three roads at once, she is the lantern at every dangerous passage and the guide of all who must travel in the dark. It was Hecate who heard Persephone's cry as the earth swallowed her, and Hecate who walked before the lost maiden afterward with her two blazing torches, lighting the road between the upper world and the lower. So she became the close companion of the dead queen, lingering ever after at the boundary where one world ends and the next begins.",
    beats: [
      { label: "Goddess of Crossroads", weight: 0.85,
        text: "Hecate is the goddess of the crossroads, of witchcraft and the moonless dark, of thresholds and the magic that gathers wherever one way gives onto another. Alone among the gods she holds a portion of power in all three realms at once — earth, sea, and sky." },
      { label: "Three Faces Watching", weight: 0.7,
        text: "Torch-bearing, and often shown with three faces turned to watch three roads at once, she is the lantern at every dangerous passage and the guide of all who must travel in the dark." },
      { label: "The Cry in the Earth", weight: 1, figures: ['persephone'],
        text: "It was Hecate who heard Persephone\'s cry as the earth swallowed her, and Hecate who walked before the lost maiden afterward with her two blazing torches, lighting the road between the upper world and the lower." },
      { label: "Between the Worlds", weight: 0.75,
        text: "So she became the close companion of the dead queen, lingering ever after at the boundary where one world ends and the next begins." },
    ],
    source: "Hesiod, Theogony."
  },
  erinyes: {
    story: "The Erinyes — the Furies — were born from blood and violence before the world had any law to answer them. When Cronus took up the jagged sickle and unmanned his father Uranus, the dark drops that fell upon the Earth quickened into three terrible daughters: Alecto the unceasing, Tisiphone the avenger of murder, and Megaera the jealous one. They are older than the Olympians, older than mercy, and they answer to no throne.\n\nSerpent-haired, black-winged, and weeping tears of blood, they rise from the dark whenever kindred blood is spilled or a sacred oath is broken. They do not judge — they pursue, with a patience that outlasts the turning of the world. Orestes, who slew his own mother Clytemnestra to avenge his murdered father, was hunted across Greece by their shrieking, sleepless wrath until Athena herself convened the first court of law in Athens to try his case. There the Furies were persuaded — barely — to accept the verdict, and were given a new name: the Eumenides, the Kindly Ones, housed in a cavern beneath the Areopagus. But kindness is only the mask they agreed to wear. Beneath it they are still the oldest anger in the world, and what they hunt, they never stop hunting.",
    beats: [
      { label: "Born from Blood", weight: 0.9, figures: ['cronus', 'uranus'],
        text: "When Cronus took up the jagged sickle and unmanned his father Uranus, the dark drops that fell upon the Earth quickened into three terrible daughters: Alecto the unceasing, Tisiphone the avenger, and Megaera the jealous one. They are older than the Olympians, older than mercy." },
      { label: "The Sleepless Hunt", weight: 0.8,
        text: "Serpent-haired, black-winged, and weeping tears of blood, they rise from the dark whenever kindred blood is spilled or a sacred oath is broken. They do not judge — they pursue, with a patience that outlasts the turning of the world." },
      { label: "The Trial of Orestes", weight: 1, figures: ['athena'],
        text: "Orestes, who slew his own mother to avenge his murdered father, was hunted across Greece by their shrieking, sleepless wrath until Athena herself convened the first court of law in Athens to try his case." },
      { label: "The Kindly Ones", weight: 0.7,
        text: "There the Furies were persuaded — barely — to accept the verdict, and were given a new name: the Eumenides, the Kindly Ones. But kindness is only the mask they agreed to wear. Beneath it they are still the oldest anger in the world." },
    ],
    source: "Hesiod, Theogony; Aeschylus, Eumenides."
  },

  // ---- MONSTERS ----
  typhon: {
    story: "Typhon is the last and most terrible child of the Earth — a storm-giant so vast that his head brushed the stars and his outstretched arms touched the east and the west, with a hundred serpent-heads bursting from his shoulders, fire flashing from his eyes, and the cries of every beast roaring together from his throats. He is chaos itself risen up in monstrous flesh to swallow the new order of heaven.\n\nGaia bore him in her grief and fury after the Titans were chained, and loosed him against the young king of the gods to undo all that Zeus had built. Their battle scorched the land and boiled the sea and shook the pillars of the world; for a time the monster even overmastered Zeus and cut the very sinews from his limbs. But Zeus recovered his strength, and with a storm of a hundred thunderbolts beat Typhon down at last and hurled him beneath Mount Etna in Sicily — where he lies pinned to this day, and his unspent rage still breaks from the mountain's peak in smoke and running fire.",
    beats: [
      { label: "Earth's Last Weapon", weight: 0.85, figures: ['gaia'],
        text: "Gaia bore Typhon in her grief and fury after the Titans were chained — a storm-giant so vast that his head brushed the stars, with a hundred serpent-heads bursting from his shoulders and the cries of every beast roaring from his throats." },
      { label: "The Sinews of Zeus", weight: 1.0, figures: ['zeus'],
        text: "Their battle scorched the land and boiled the sea and shook the pillars of the world; for a time the monster even overmastered Zeus and cut the very sinews from his limbs." },
      { label: "Beneath Mount Etna", weight: 0.75,
        text: "Zeus recovered his strength and with a storm of a hundred thunderbolts beat Typhon down at last and hurled him beneath Mount Etna — where he lies pinned to this day, and his unspent rage still breaks from the peak in smoke and running fire." },
    ],
    source: "Hesiod, Theogony."
  },
  echidna: {
    story: "Echidna is the Mother of Monsters — half a fair-cheeked woman with bright unblinking eyes, and half an enormous speckled serpent, coiling and glittering in a cavern deep beneath the earth. Deathless and ageless, she is the dark womb out of which nearly every great horror of the Greek world came crawling.\n\nIn her cave at the edge of things she took the storm-giant Typhon for her mate, and from that union came the whole brood the heroes were born to slay: the hound Cerberus that guards the gates of the dead, the many-headed Hydra of the marsh, the fire-breathing Chimera, the lion of Nemea, the riddling Sphinx, and the sleepless dragons that coil about the world's hidden treasures. She herself outlived them all in her lair, the patient source of the monsters — for however many of her children the heroes cut down, Echidna remained, waiting in the dark to bear more.",
    beats: [
      { label: "Woman and Serpent", weight: 0.8,
        text: "Echidna is the Mother of Monsters — half a fair-cheeked woman with bright unblinking eyes, and half an enormous speckled serpent, coiling and glittering in a cavern deep beneath the earth." },
      { label: "The Brood of Horrors", weight: 1.0, figures: ['typhon', 'cerberus', 'chimera', 'nemean_lion'],
        text: "She took the storm-giant Typhon for her mate, and from that union came the whole brood the heroes were born to slay: the hound Cerberus, the many-headed Hydra, the fire-breathing Chimera, the lion of Nemea, the riddling Sphinx." },
      { label: "The Patient Source", weight: 0.7,
        text: "She herself outlived them all in her lair, the patient source of the monsters — for however many of her children the heroes cut down, Echidna remained, waiting in the dark to bear more." },
    ],
    source: "Hesiod, Theogony."
  },
  medusa: {
    story: "Medusa is the most famous of monsters and the most pitiable — a creature whose gaze turns the living to cold stone, whose head writhes with serpents, and who was not always a thing of horror at all. Of the three Gorgon sisters she alone was mortal, and she alone had once been beautiful.\n\nFor Medusa began as a lovely maiden, so fair that the sea-god Poseidon desired her and took her by force in the very temple of Athena. The goddess, unwilling to strike at a god, turned her anger upon the girl instead: she changed Medusa's glorious hair into hissing snakes and made her face so terrible that whoever met her eyes was frozen into rock. Banished to the world's edge among gardens of petrified men, she was at last beheaded in her sleep by Perseus, who dared look only at her reflection in his polished shield — and from the blood of her severed neck sprang the winged horse Pegasus and the golden warrior Chrysaor: beauty and valor leaping free of her ruin at the very last.",
    beats: [
      { label: "The Punished Maiden", weight: 0.85, figures: ['poseidon', 'athena'],
        text: "Medusa began as a lovely maiden, so fair that Poseidon desired her and took her by force in Athena's own temple. The goddess turned her anger upon the girl instead — changing her glorious hair into hissing snakes and her face into a thing that turned the living to stone." },
      { label: "The Mirror Shield", weight: 1.0, figures: ['perseus'],
        text: "Banished to the world's edge among gardens of petrified men, she was at last beheaded in her sleep by Perseus, who dared look only at her reflection in his polished shield." },
      { label: "Beauty from Ruin", weight: 0.75, figures: ['pegasus', 'chrysaor'],
        text: "From the blood of her severed neck sprang the winged horse Pegasus and the golden warrior Chrysaor: beauty and valor leaping free of her ruin at the very last." },
    ],
    source: "Ovid, Metamorphoses IV. Further reading: Ted Hughes, Tales from Ovid."
  },
  scylla: {
    story: "Scylla is the six-headed terror of the narrow strait — a monster who haunts one cliff of a deadly channel and snatches sailors from the decks of passing ships, with six heads on long writhing necks, each mouth set with three rows of teeth, and a girdle of baying dogs about her waist. To pass beneath her is to lose six men and count yourself fortunate.\n\nBut she was not always so. Once Scylla was a lovely sea-nymph who bathed in a quiet cove, and her undoing came not from any fault of her own but from another's jealousy. The sea-god Glaucus loved her and was refused, and went to the sorceress Circe for a charm to win her — but Circe wanted Glaucus for herself, and turned her spite upon the girl instead. She poisoned the pool where Scylla bathed, and where the tainted water touched her the snarling dog-heads burst howling from her thighs. Maddened by the horror of her own body, the nymph became the monster of the rocks, devouring whatever the current carried close.",
    beats: [
      { label: "The Lovely Nymph", weight: 0.7, figures: ['glaucus'],
        text: "Once Scylla was a lovely sea-nymph who bathed in a quiet cove. The sea-god Glaucus loved her and was refused, and went to the sorceress Circe for a charm to win her." },
      { label: "Circe's Poison", weight: 1.0, figures: ['circe'],
        text: "Circe wanted Glaucus for herself, and turned her spite upon the girl instead. She poisoned the pool where Scylla bathed, and where the tainted water touched her the snarling dog-heads burst howling from her thighs." },
      { label: "The Terror of the Strait", weight: 0.8, figures: ['charybdis'],
        text: "Maddened by the horror of her own body, the nymph became the monster of the rocks — six heads on long writhing necks, devouring whatever the current carried close, with the whirlpool Charybdis waiting across the narrow water." },
    ],
    source: "Ovid, Metamorphoses XIII–XIV; Homer, Odyssey XII. Further reading: Ted Hughes, Tales from Ovid."
  },
  charybdis: {
    story: "Charybdis is the great devouring whirlpool that lurks across the narrow strait from Scylla — three times each day she swallows down the whole of the sea in a roaring black funnel, and three times she heaves it back up, and any ship caught above her throat is dragged down with it past all hope of saving.\n\nShe is appetite without restraint, given a permanent form. Some said she was once a daughter of Poseidon and Earth, so greedy that she stole the cattle of Heracles, and was struck by Zeus's thunderbolt into the sea to swallow and spew forever. Her especial terror is that she shares her strait with Scylla, so that the sailor who steers wide of the six-headed monster is swept toward the whirlpool, and there is no clean water between them. Odysseus survived her only by leaping for a wild fig-tree that overhung the vortex and clinging there while she sucked his raft down — then dropping back onto the timbers the moment she belched them up again.",
    beats: [
      { label: "Appetite Made Permanent", weight: 0.8, figures: ['zeus', 'poseidon'],
        text: "Some said she was once a daughter of Poseidon and Earth, so greedy that she stole the cattle of Heracles, and was struck by Zeus's thunderbolt into the sea to swallow and spew forever." },
      { label: "No Clean Water", weight: 0.7, figures: ['scylla'],
        text: "Her especial terror is that she shares her strait with Scylla, so that the sailor who steers wide of the six-headed monster is swept toward the whirlpool, and there is no clean water between them." },
      { label: "The Fig-Tree Above the Vortex", weight: 1.0, figures: ['odysseus'],
        text: "Odysseus survived her only by leaping for a wild fig-tree that overhung the vortex and clinging there while she sucked his raft down — then dropping back onto the timbers the moment she belched them up again." },
    ],
    source: "Homer, Odyssey XII."
  },
  cerberus: {
    story: "Cerberus is the hound of Hades, the three-headed dog with a mane of serpents and a dragon's tail who keeps the gate of the underworld. He is the threshold turned monstrous — fawning and gentle upon the souls who come down to the dead, but tearing apart any who would climb back out toward the light.\n\nA child of Echidna and Typhon, he was set to guard the one door that should only ever open inward. To drag him up alive into the daylight was the last and most dreadful of the twelve labors laid upon Heracles. The hero went down into the country of the dead and found the beast, and Hades granted him the hound on one condition: that he master it with his bare hands and no weapon. So Heracles seized the three-throated dog and wrestled it into submission, hauled it up the long dark road for the living to see — and then, the labor done, led the bewildered guardian back down to its post at the gate of the dead.",
    beats: [
      { label: "Guardian of the Gate", weight: 0.85, figures: ['echidna', 'typhon'],
        text: "A child of Echidna and Typhon, Cerberus is the three-headed hound with a mane of serpents who keeps the gate of the underworld — fawning upon the souls who come down, but tearing apart any who would climb back toward the light." },
      { label: "Bare Hands Only", weight: 1.0, figures: ['heracles', 'hades'],
        text: "Hades granted Heracles the hound on one condition: that he master it with his bare hands and no weapon. So the hero seized the three-throated dog and wrestled it into submission." },
      { label: "Returned to His Post", weight: 0.6,
        text: "The labor done, Heracles led the bewildered guardian back down the long dark road to its post at the gate of the dead." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  lernaean_hydra: {
    story: "The Lernaean Hydra was a many-headed water-serpent that lurked in the bottomless swamps of Lerna, its body a nest of writhing necks with one head among them immortal — and its breath and blood so venomous that even its scent could kill. Worst of all was its terrible gift: for every head a sword struck off, two more grew at once from the stump, so that to fight it in the ordinary way was only to multiply it.\n\nA child of Typhon and Echidna, raised by Hera for the express purpose of destroying Heracles, it was the hero's second labor. He learned its secret the hard way, watching the heads double back under his blade — until his nephew Iolaus caught up a torch, and the two worked as one: Heracles severing each neck, Iolaus searing the raw stump with fire before it could sprout anew. The single immortal head he buried, still hissing, beneath a great rock; and in the Hydra's gall he dipped his arrows, making a poison so deadly that it would one day, by a long and winding fate, become the death of Heracles himself.",
    beats: [
      { label: "The Multiplying Horror", weight: 0.85, figures: ['typhon', 'echidna'],
        text: "A child of Typhon and Echidna, the Hydra lurked in the bottomless swamps of Lerna — for every head a sword struck off, two more grew at once from the stump, so that to fight it was only to multiply it." },
      { label: "Sword and Torch", weight: 1.0, figures: ['heracles'],
        text: "Heracles learned its secret the hard way, watching the heads double under his blade — until his nephew Iolaus caught up a torch, and the two worked as one: severing each neck and searing the stump with fire before it could sprout anew." },
      { label: "The Poisoned Arrows", weight: 0.75,
        text: "The immortal head he buried still hissing beneath a rock; and in the Hydra's gall he dipped his arrows, making a poison so deadly it would one day, by a long and winding fate, become the death of Heracles himself." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  chimera: {
    story: "The Chimera is an impossibility given breath — a single beast made of three, with the head and forequarters of a lion, a second head of a goat rising from the middle of its back, and a serpent for a tail. From its lion's jaws it breathed living fire, and it ravaged the land of Lycia until nothing could stand against it.\n\nIt was one of the dread children of Echidna and Typhon, kin to the Hydra and the hound of hell. No man on foot could come near its flames and live — until the hero Bellerophon was sent against it on the winged horse Pegasus. Riding high above the fire, he drove a lump of lead fixed to his spear-point into the creature's open mouth; the monster's own burning breath melted the metal, and the molten lead poured down its throat and put out its life from within. So the unkillable beast was undone at the last by the very fire that had made it terrible.",
    beats: [
      { label: "Three Beasts in One", weight: 0.8, figures: ['echidna', 'typhon'],
        text: "A child of Echidna and Typhon, the Chimera was an impossibility given breath — lion, goat, and serpent fused into a single beast that breathed living fire and ravaged the land of Lycia until nothing could stand against it." },
      { label: "The Rider Above the Flames", weight: 1.0, figures: ['bellerophon', 'pegasus'],
        text: "No man on foot could come near its flames — until Bellerophon rode the winged horse Pegasus high above the fire and drove a lump of lead fixed to his spear-point into the creature's open mouth." },
      { label: "Undone by Its Own Fire", weight: 0.7,
        text: "The monster's own burning breath melted the metal, and the molten lead poured down its throat and put out its life from within — the unkillable beast undone by the very fire that had made it terrible." },
    ],
    source: "Homer, Iliad VI; Hesiod, Theogony."
  },
  sphinx: {
    story: "The Sphinx is a riddling terror with the face and breast of a woman, the body of a lion, and the broad wings of an eagle — a monster of the threshold, who sits at the edge of the city and lets no traveler pass who cannot answer her. She is the question that kills.\n\nSent to plague Thebes, she crouched upon a rock outside the gates and set to every passer-by the same riddle: what walks on four legs in the morning, two at noon, and three in the evening? All who failed she seized and devoured, until the road lay strewn with bones and the city starved behind its walls. Then came Oedipus, who answered without faltering — it is man, who crawls as an infant, walks upright in his strength, and leans on a staff in his age. At the sound of the truth the Sphinx flung herself from her rock and was destroyed; and Oedipus walked on through the open gate, into a doom far darker than any monster could have devised.",
    beats: [
      { label: "The Question That Kills", weight: 0.85,
        text: "The Sphinx crouched upon a rock outside the gates of Thebes and set to every passer-by the same riddle: what walks on four legs in the morning, two at noon, and three in the evening? All who failed she seized and devoured." },
      { label: "The Answer", weight: 1.0, figures: ['oedipus'],
        text: "Then came Oedipus, who answered without faltering — it is man, who crawls as an infant, walks upright in his strength, and leans on a staff in his age. At the sound of the truth the Sphinx flung herself from her rock and was destroyed." },
      { label: "Through the Open Gate", weight: 0.7,
        text: "Oedipus walked on through the open gate, into a doom far darker than any monster could have devised." },
    ],
    source: "Apollodorus, Library; Sophocles."
  },
  gorgons: {
    story: "The Gorgons are three sisters who dwell at the very edge of the world, near the cold borders of Night — winged women with living serpents for hair, tusks like a boar's, and a glare so terrible that any creature which meets their eyes is turned upon the instant to stone. Stheno and Euryale, the elder two, are deathless; only Medusa, the youngest, could ever be slain.\n\nDaughters of the ancient sea-gods Phorcys and Ceto, they are the dread face of the deep made flesh, kin to the Grey Sisters and to the serpents that guard the world's hidden things. When the hero Perseus came for Medusa's head, he could strike at all only because she alone was mortal — and the moment the deed was done, her immortal sisters woke and rose shrieking into the air behind him. But he wore the cap of darkness and the winged sandals, and they could only wail across the sky as he vanished, robbed forever of vengeance for a sister who could not be brought back.",
    beats: [
      { label: "The Dread Sisters", weight: 0.85, figures: ['phorcys', 'ceto'],
        text: "Daughters of Phorcys and Ceto, the three Gorgons dwell at the very edge of the world — winged women with living serpents for hair and a glare so terrible that any creature which meets their eyes is turned to stone." },
      { label: "The Mortal One", weight: 1.0, figures: ['medusa', 'perseus'],
        text: "Only Medusa, the youngest, could ever be slain. When Perseus came for her head, he could strike only because she alone was mortal — and the moment the deed was done, her immortal sisters woke and rose shrieking into the air." },
      { label: "Robbed of Vengeance", weight: 0.7, figures: ['stheno', 'euryale'],
        text: "Stheno and Euryale could only wail across the sky as Perseus vanished in the cap of darkness and the winged sandals — robbed forever of vengeance for a sister who could not be brought back." },
    ],
    source: "Hesiod, Theogony."
  },
  graeae: {
    story: "The Graeae are the three Grey Sisters — Deino, Enyo, and Pemphredo — who were never young: they came into the world already old, grey-haired and withered from their very first moment, the ancient watchwomen of the road that leads to the Gorgons' lair. Between the three of them they possess but a single eye and a single tooth, passed from hand to hand as each takes her turn to see and to eat.\n\nDaughters of Phorcys and Ceto and sisters to the Gorgons, they alone keep the secret of where their monstrous kin can be found. When Perseus needed that secret, he watched and waited until the very moment the eye was being handed along — and snatched it out of the air between their groping fingers. Blind and helpless and able to do nothing but bargain, the old sisters were forced to tell him the way to Medusa before he would return their one eye. So the greatest of the hero-quests turned upon a single stolen instant of sight.",
    beats: [
      { label: "Born Already Old", weight: 0.75, figures: ['phorcys', 'ceto'],
        text: "Daughters of Phorcys and Ceto, the Graeae came into the world already old — grey-haired and withered from their very first moment, sharing between them a single eye and a single tooth, passed from hand to hand." },
      { label: "The Stolen Eye", weight: 1.0, figures: ['perseus'],
        text: "Perseus watched and waited until the very moment the eye was being handed along — and snatched it out of the air between their groping fingers. Blind and helpless, the old sisters could do nothing but bargain." },
      { label: "A Stolen Instant of Sight", weight: 0.65, figures: ['medusa'],
        text: "They were forced to tell him the way to Medusa before he would return their one eye. So the greatest of the hero-quests turned upon a single stolen instant of sight." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  ladon: {
    story: "Ladon is the sleepless dragon of the world's far west — a serpent of a hundred heads, the old stories say, each speaking in a different voice, coiled forever about the tree of golden apples in the garden of the Hesperides at the edge of the sunset. He never closed all his eyes at once, and so the precious fruit was never for an instant unguarded.\n\nA child of the ancient sea-powers, he was set to keep the golden apples that Earth had given Hera as a wedding gift. When the labors of Heracles brought the hero to the garden wall, that endless watch came to its end: by one account Heracles loosed a single arrow over the wall and felled the dragon, by another he sent Atlas to gather the apples while the beast slept its first and final sleep. In sorrow for so faithful a guardian, the goddess set Ladon's coils among the stars, where he winds to this day as the constellation of the Dragon.",
    beats: [
      { label: "The Hundred-Headed Watch", weight: 0.85, figures: ['hera'],
        text: "Ladon was a serpent of a hundred heads, each speaking in a different voice, coiled forever about the tree of golden apples that Earth had given Hera as a wedding gift. He never closed all his eyes at once." },
      { label: "The End of the Vigil", weight: 1.0, figures: ['heracles', 'atlas'],
        text: "When the labors of Heracles brought the hero to the garden wall, that endless watch came to its end — by one account a single arrow felled the dragon, by another Atlas gathered the apples while the beast slept its first and final sleep." },
      { label: "Set Among the Stars", weight: 0.65,
        text: "In sorrow for so faithful a guardian, the goddess set Ladon's coils among the stars, where he winds to this day as the constellation of the Dragon." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  orthrus: {
    story: "Orthrus is the two-headed hound of the far west, a child of the storm-giant Typhon and the serpent Echidna, and the lesser, earthbound brother of Cerberus who keeps the gate of the dead. Where his brother guards the threshold of the underworld, Orthrus guards only a herd of cattle — but he guards it with the same monstrous devotion.\n\nHe was set to watch over the red cattle of the three-bodied giant Geryon, on the island of Erytheia at the edge of the world where the sun goes down. When Heracles came on his tenth labor to drive that herd back to Greece, Orthrus was the first to rush him, both heads snarling at once — and the first to fall, beaten down by a single blow of the hero's great club before the giant himself had even reached the field. A short life, and a faithful one, spent guarding another's wealth at the end of the world.",
    beats: [
      { label: "Brother of Cerberus", weight: 0.7, figures: ['typhon', 'echidna', 'cerberus'],
        text: "A child of Typhon and Echidna, Orthrus is the two-headed hound of the far west and the lesser, earthbound brother of Cerberus — guarding not the gate of the dead but a herd of cattle with the same monstrous devotion." },
      { label: "The Red Cattle", weight: 0.8, figures: ['geryon'],
        text: "He was set to watch over the red cattle of the three-bodied giant Geryon, on the island of Erytheia at the edge of the world where the sun goes down." },
      { label: "A Single Blow", weight: 1.0, figures: ['heracles'],
        text: "When Heracles came on his tenth labor, Orthrus was the first to rush him, both heads snarling — and the first to fall, beaten down by a single blow of the hero's great club. A short life, and a faithful one." },
    ],
    source: "Hesiod, Theogony."
  },
  nemean_lion: {
    story: "The Nemean Lion was a beast no weapon could wound — an enormous lion whose tawny golden hide turned aside every arrow, spear, and blade, so that it ravaged the hills around Nemea wholly unafraid, and no hunter who went up against it ever came home to tell of it.\n\nA monstrous child of Typhon and Echidna, dropped (some said) to earth from the moon, it was set as the first of the twelve labors of Heracles. When the hero found that his arrows simply glanced from its skin, he cast down his useless weapons, cornered the lion in the dark of its double-mouthed cave, and throttled it to death in the crook of his bare arm. Then, finding that no knife on earth could cut the pelt, he skinned the beast with its own razor claws — and wore that impenetrable hide ever after as cloak and helm, so that the terror of Nemea became the armor of the man who killed it.",
    beats: [
      { label: "The Invulnerable Hide", weight: 0.85, figures: ['typhon', 'echidna'],
        text: "A child of Typhon and Echidna, the Nemean Lion was a beast no weapon could wound — its tawny golden hide turned aside every arrow, spear, and blade, and no hunter who went against it ever came home." },
      { label: "Throttled in the Dark", weight: 1.0, figures: ['heracles'],
        text: "When his arrows simply glanced from its skin, Heracles cast down his useless weapons, cornered the lion in its double-mouthed cave, and throttled it to death in the crook of his bare arm." },
      { label: "The Monster Becomes Armor", weight: 0.7,
        text: "Finding that no knife on earth could cut the pelt, he skinned the beast with its own razor claws — and wore that impenetrable hide ever after, so that the terror of Nemea became the armor of the man who killed it." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  colchian_dragon: {
    story: "The Colchian Dragon is the unsleeping guardian of the Golden Fleece — an immense serpent coiled around the sacred oak in the grove of Ares at the far eastern edge of the world, who kept its watch without ever once closing its eyes, so that the Fleece glittered always just beyond the reach of any thief.\n\nA child of Typhon and Echidna, it was the last barrier between Jason and the prize his whole long voyage had been undertaken to win. No sword could pass it; the dragon would have devoured the hero where he stood. But Jason had Medea, the sorceress-princess of Colchis who loved him — and she came into the grove with her drugs and her low murmured charms and her sprinkled drops of sleep, and sang the great beast, for the first and only time in its life, into slumber. While its sleepless eyes at last fell shut, Jason lifted the shining Fleece from the tree and fled with it into the dark.",
    beats: [
      { label: "The Unsleeping Watch", weight: 0.8, figures: ['typhon', 'echidna'],
        text: "A child of Typhon and Echidna, the Colchian Dragon coiled around the sacred oak in the grove of Ares, keeping its watch without ever once closing its eyes, so that the Golden Fleece glittered always just beyond reach." },
      { label: "Medea's Lullaby", weight: 1.0, figures: ['medea', 'jason'],
        text: "Medea came into the grove with her drugs and her low murmured charms and sang the great beast, for the first and only time in its life, into slumber." },
      { label: "The Fleece Taken", weight: 0.65,
        text: "While its sleepless eyes at last fell shut, Jason lifted the shining Fleece from the tree and fled with it into the dark." },
    ],
    source: "Apollonius of Rhodes, Argonautica."
  },
  caucasian_eagle: {
    story: "The Caucasian Eagle was the instrument of the cruelest punishment in all the myths — a vast bird of prey, born of Typhon and Echidna, sent by Zeus to a windswept crag at the end of the world to serve as the daily torment of the chained Titan Prometheus.\n\nEach day the eagle flew to the cliff where Prometheus hung in unbreakable bonds, tore open his side, and ate away his liver; and each night, because the deathless Titan could not die, the liver grew whole again — so that the agony began afresh with every dawn, without relief and without end. For long ages of the world it went on, until Heracles, crossing that desolate place on his wanderings, lifted his great bow and shot the bird out of the sky, ending the torture and setting the friend of mankind free.",
    beats: [
      { label: "Instrument of Cruelty", weight: 0.8, figures: ['zeus', 'prometheus'],
        text: "Born of Typhon and Echidna, the Caucasian Eagle was sent by Zeus to serve as the daily torment of the chained Titan Prometheus on a windswept crag at the end of the world." },
      { label: "The Unending Agony", weight: 1.0, figures: ['prometheus'],
        text: "Each day the eagle tore open his side and ate away his liver; each night the liver grew whole again — so that the agony began afresh with every dawn, without relief and without end." },
      { label: "Shot from the Sky", weight: 0.75, figures: ['heracles'],
        text: "For long ages it went on, until Heracles, crossing that desolate place, lifted his great bow and shot the bird out of the sky, ending the torture and setting the friend of mankind free." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  geryon: {
    story: "Geryon is the three-bodied giant of the sunset lands — a mighty warrior grown from a single waist into three torsos, three heads, and six arms, sometimes winged, who reigned over the island of Erytheia at the western edge of the world and kept there a famous herd of red cattle.\n\nA grandson of Medusa, born of the golden warrior Chrysaor who sprang from her blood, he was among the strongest beings Heracles ever faced. For his tenth labor the hero crossed the whole of the world to take the red cattle, killed the herdsman and the two-headed hound Orthrus that guarded them, and then met Geryon himself in arms. The giant's three bodies should have made him three times the foe — but a single arrow, dipped in the Hydra's venom, passed clean through all three at once, and the great cattle-king of the west went down, and the herd was driven home.",
    beats: [
      { label: "King of the Sunset Isle", weight: 0.8, figures: ['chrysaor', 'medusa'],
        text: "A grandson of Medusa, born of the golden warrior Chrysaor, Geryon was a three-bodied giant who reigned over the island of Erytheia at the western edge of the world and kept a famous herd of red cattle." },
      { label: "Orthrus Falls First", weight: 0.7, figures: ['orthrus', 'heracles'],
        text: "For his tenth labor Heracles crossed the whole world to take the red cattle, killing the herdsman and the two-headed hound Orthrus that guarded them before the giant himself reached the field." },
      { label: "One Arrow, Three Bodies", weight: 1.0, figures: ['heracles'],
        text: "The giant's three bodies should have made him three times the foe — but a single arrow, dipped in the Hydra's venom, passed clean through all three at once, and the great cattle-king of the west went down." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  chrysaor: {
    story: "Chrysaor — his name means 'he of the golden sword' — leapt fully grown and armed into the world at the very moment of Medusa's death, springing from her severed neck in the same instant as his brother, the winged horse Pegasus. Two children born together out of a single act of horror: one of them flight, and one of them a blade.\n\nWhere Pegasus rose into the sky and into the company of the gods, Chrysaor stayed earthbound and shadowed, and his own myth is brief — his importance lies in what came after him. Joining with the Oceanid Callirrhoe, he fathered the three-bodied giant Geryon, whom Heracles would one day cross the whole world to slay. So from Medusa's ruin came not only beauty and a hero's mount, but a line of monsters reaching down the generations, like a golden sword drawn slowly from its sheath.",
    beats: [
      { label: "Born from the Blood", weight: 0.85, figures: ['medusa', 'pegasus'],
        text: "Chrysaor leapt fully grown and armed into the world at the very moment of Medusa's death, springing from her severed neck in the same instant as his brother Pegasus — two children born of a single act of horror: one of them flight, and one of them a blade." },
      { label: "The Earthbound Sword", weight: 0.7, figures: ['callirrhoe'],
        text: "Where Pegasus rose into the sky, Chrysaor stayed earthbound and shadowed. Joining with the Oceanid Callirrhoe, his importance lies in what came after him." },
      { label: "Father of Geryon", weight: 1.0, figures: ['geryon'],
        text: "He fathered the three-bodied giant Geryon, whom Heracles would one day cross the whole world to slay — from Medusa's ruin came a line of monsters reaching down the generations, like a golden sword drawn slowly from its sheath." },
    ],
    source: "Hesiod, Theogony."
  },
  pegasus: {
    story: "Pegasus is the winged horse of the heavens, white as a cloud and swift as the wind — the one shining and perfect thing to come out of an act of pure horror. He leaps into the stories at the very instant of a monster's death, beauty breaking free of blood.\n\nFor when Perseus struck the head from sleeping Medusa, it was out of the dark fountain of her severed neck that Pegasus burst forth full-grown, unfolding his great wings into the air. He flew to Mount Helicon, where a spring of the Muses opened where his hoof first struck the rock; and the hero Bellerophon, taming him with a golden bridle that Athena gave, rode him up against the Chimera and killed the fire-breathing beast from the safety of the sky. But when Bellerophon grew proud and tried to ride all the way up to Olympus, Pegasus threw his rider back down to earth and climbed on alone — and was received among the gods, to carry the thunderbolts of Zeus.",
    beats: [
      { label: "Beauty from Blood", weight: 0.85, figures: ['medusa', 'perseus'],
        text: "When Perseus struck the head from sleeping Medusa, it was out of the dark fountain of her severed neck that Pegasus burst forth full-grown, unfolding his great wings into the air — beauty breaking free of blood." },
      { label: "Tamed for the Chimera", weight: 1.0, figures: ['bellerophon', 'athena', 'chimera'],
        text: "Bellerophon tamed him with a golden bridle that Athena gave, and rode him up against the Chimera and killed the fire-breathing beast from the safety of the sky." },
      { label: "Received Among the Gods", weight: 0.7, figures: ['zeus'],
        text: "When Bellerophon grew proud and tried to ride to Olympus, Pegasus threw his rider back down to earth and climbed on alone — received among the gods, to carry the thunderbolts of Zeus." },
    ],
    source: "Hesiod, Theogony; Ovid, Metamorphoses IV. Further reading: Ted Hughes, Tales from Ovid."
  },

  // ---- SEA DEITIES ----
  phorcys: {
    story: "Phorcys is an ancient god of the sea's hidden perils — not the open storm but the deeper dangers beneath the surface: the reef that waits unseen, the sucking whirlpool, the dark fathoms where drowned things drift. Grey and crusted like an old rock at the tide-line, he is the deep sea's own grim face.\n\nBorn of Earth and the primordial Sea, he took his sister Ceto for his wife, and together this old pair bred the most fearsome brood in all the world. From them came the Gorgons with their stone-turning gaze, the grey-born Graeae who share a single eye, the dragon Ladon that guards the golden apples, and the serpents that coil at the edges of things. Phorcys himself does little in the stories — but nearly every monster a hero ever faced is, somewhere up the line, a child of his house.",
    beats: [
      { label: "The Sea's Grim Face", weight: 0.7,
        text: "Phorcys is an ancient god of the sea's hidden perils — not the open storm but the deeper dangers beneath the surface, the dark fathoms where drowned things drift. Grey and crusted like an old rock at the tide-line." },
      { label: "The Old Pair", weight: 0.85, figures: ['ceto', 'gaia', 'pontus'],
        text: "Born of Earth and the primordial Sea, he took his sister Ceto for his wife, and together this old pair bred the most fearsome brood in all the world." },
      { label: "Father of Every Monster", weight: 1.0, figures: ['medusa', 'graeae', 'ladon'],
        text: "From them came the Gorgons with their stone-turning gaze, the grey-born Graeae who share a single eye, the dragon Ladon that guards the golden apples. Nearly every monster a hero ever faced is a child of his house." },
    ],
    source: "Hesiod, Theogony."
  },
  ceto: {
    story: "Ceto is the goddess of the sea's monsters and its swallowing deeps — the dread of the great dark shapes that move below a boat, the terror that has no name until it surfaces. Her own name became the Greek word for every whale and sea-beast, so that to speak of a sea-monster at all is, in a way, to speak of her.\n\nSister and wife to the old sea-god Phorcys, she is the womb of horrors at the edge of the world. From her came the Gorgons and the Grey Sisters, and in many tellings the serpent Echidna and the strait-haunting Scylla besides — so that the monsters the heroes were born to slay were very largely the daughters of Ceto. She is the deep ocean understood as a living appetite: calm and lovely from above, and full of teeth below.",
    beats: [
      { label: "The Nameless Terror", weight: 0.75,
        text: "Ceto is the goddess of the sea's monsters and its swallowing deeps — the dread of the great dark shapes that move below a boat. Her own name became the Greek word for every whale and sea-beast." },
      { label: "Womb of Horrors", weight: 1.0, figures: ['phorcys', 'medusa', 'graeae'],
        text: "Sister and wife to the old sea-god Phorcys, she is the womb of horrors at the edge of the world. From her came the Gorgons and the Grey Sisters, and in many tellings the serpent Echidna and Scylla besides." },
      { label: "Calm Above, Teeth Below", weight: 0.65,
        text: "The monsters the heroes were born to slay were very largely the daughters of Ceto. She is the deep ocean understood as a living appetite: calm and lovely from above, and full of teeth below." },
    ],
    source: "Hesiod, Theogony."
  },
  amphitrite: {
    story: "Amphitrite is the queen of the sea, the calm of the deep waters and the mother of its creatures — a Nereid daughter of the truthful old sea-god Nereus, who reigns over the ocean at the side of Poseidon and lends the waves their gentler moods.\n\nShe did not come to her throne willingly. When Poseidon first desired her, Amphitrite fled his rough courtship to the very ends of the ocean, hiding herself in the furthest deeps where she believed no one could follow. But the sea-god sent his messengers searching through the waters, and a single dolphin found her in her hiding-place and pleaded his master's cause so sweetly that she relented and let herself be brought back to be made queen. In gratitude Poseidon set the dolphin's likeness among the stars — so that a courtship which began in flight ended as a constellation.",
    beats: [
      { label: "Queen of the Sea", weight: 0.8, figures: ['nereus', 'poseidon'],
        text: "Amphitrite is the queen of the sea, the calm of the deep waters — a Nereid daughter of Nereus, who reigns over the ocean at the side of Poseidon and lends the waves their gentler moods." },
      { label: "The Flight to the Deeps", weight: 1.0, figures: ['poseidon'],
        text: "When Poseidon first desired her, Amphitrite fled his rough courtship to the very ends of the ocean, hiding in the furthest deeps. But a single dolphin found her and pleaded his master's cause so sweetly that she relented." },
      { label: "A Constellation for Courtship", weight: 0.7,
        text: "In gratitude Poseidon set the dolphin's likeness among the stars — so that a courtship which began in flight ended as a constellation." },
    ],
    source: "Hesiod, Theogony."
  },
  triton: {
    story: "Triton is the herald of the sea, the merman son of Poseidon and Amphitrite — a god with the torso of a man and the long scaled tail of a fish, who swims at the head of his father's train through the deep. In his hands he carries a great twisted conch-shell, and that shell is both his voice and his instrument of command.\n\nWhen Triton sets the conch to his lips and blows, the sound rolls out across the water and the waves obey it — climbing into a roar when he wills the sea to rage, or sinking flat and still when he sounds the note of calm. It was his horn, the poets said, that Poseidon had him wind to call the floodwaters back after the great deluge, so that the drowned world might rise again into the light. He is the sea's announcing trumpet, the sound the ocean makes when it remembers that it has a king.",
    beats: [
      { label: "Herald of the Deep", weight: 0.75, figures: ['poseidon', 'amphitrite'],
        text: "Triton is the herald of the sea, the merman son of Poseidon and Amphitrite — carrying a great twisted conch-shell that is both his voice and his instrument of command." },
      { label: "The Conch That Commands", weight: 1.0,
        text: "When Triton sets the conch to his lips and blows, the sound rolls out across the water and the waves obey it — climbing into a roar when he wills the sea to rage, or sinking flat and still when he sounds the note of calm." },
      { label: "Calling Back the Flood", weight: 0.85, figures: ['poseidon'],
        text: "It was his horn that Poseidon had him wind to call the floodwaters back after the great deluge, so that the drowned world might rise again into the light. He is the sea's announcing trumpet." },
    ],
    source: "Hesiod, Theogony."
  },
  nereus: {
    story: "Nereus is the Old Man of the Sea — the eldest and gentlest of the sea-gods, born of Earth and the primordial deep long before Poseidon, and famous above all for two things: he never lies, and he knows what is to come. With his wife Doris he fathered the fifty Nereids, the kindly nymphs of the waves.\n\nTruthful and wise, he yields his knowledge only to those who can take it, for like the sea itself he is a shifter of shapes. When Heracles needed to learn the secret road to the garden of the golden apples, he had to seize the old god and cling on as Nereus turned in his grip to water, to fire, to a roaring beast and a coiling serpent — through form after form — until, finding he could not break free, the Old Man of the Sea returned to himself and told the hero the truth. He is the deep's calm conscience: ancient, honest, and not easily held.",
    beats: [
      { label: "The Truthful Elder", weight: 0.8, figures: ['gaia', 'pontus'],
        text: "Nereus is the Old Man of the Sea — the eldest and gentlest of the sea-gods, born of Earth and the primordial deep long before Poseidon, famous above all because he never lies and he knows what is to come." },
      { label: "The Shifting Grip", weight: 1.0, figures: ['heracles'],
        text: "When Heracles needed the secret road to the golden apples, he seized the old god and clung on as Nereus turned in his grip to water, to fire, to a roaring beast and a coiling serpent — through form after form." },
      { label: "The Deep's Calm Conscience", weight: 0.65,
        text: "Finding he could not break free, the Old Man of the Sea returned to himself and told the hero the truth. He is the deep's calm conscience: ancient, honest, and not easily held." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  proteus: {
    story: "Proteus is the Old Man of the Sea, a shape-shifter who herds the grey seals of Poseidon across the shallows of the Egyptian isle of Pharos. He knows all things — past, present, and the paths that are still to come — but he will not speak unless forced, and forcing him is the trial.\n\nEach noon he rises from the surf, counts his seals like a shepherd counting sheep, and lies down among them to sleep. That is the only moment he can be caught, and whoever seizes him must hold fast through every horror he becomes: a bearded lion, a sinuous serpent, a leopard, a great boar, running water, a towering tree roaring with wind. Only if the grip never loosens will Proteus at last return to his own aged shape and, with a sigh, answer what is asked. It was Menelaus, stranded on his long voyage home from Troy, who wrestled the old god down on the advice of Proteus's own daughter Eidothea — and learned at last which winds to court and which gods to appease. Proteus is knowledge that does not want to be known, truth that fights to stay hidden, the sea itself refusing to hold one shape long enough to be read.",
    beats: [
      { label: "Shepherd of Seals", weight: 0.7, figures: ['poseidon'],
        text: "Proteus is the Old Man of the Sea, a shape-shifter who herds the grey seals of Poseidon across the shallows of Pharos. He knows all things — past, present, and the paths still to come — but will not speak unless forced." },
      { label: "Every Horror He Becomes", weight: 1.0,
        text: "Whoever seizes him must hold fast through every horror he becomes: a bearded lion, a sinuous serpent, a leopard, a great boar, running water, a towering tree roaring with wind. Only if the grip never loosens will he answer." },
      { label: "Menelaus on Pharos", weight: 0.85,
        text: "It was Menelaus, stranded on his long voyage home from Troy, who wrestled the old god down on the advice of Proteus's own daughter Eidothea — and learned at last which winds to court and which gods to appease." },
    ],
    source: "Homer, Odyssey IV."
  },
  thetis: {
    story: "Thetis is a silver-footed nymph of the sea, gentlest and most loyal of the Nereids, a shape-shifter and a help to the gods in their need — and the mother whose love could not, in the end, save her own son. She stands at the very meeting-point of the divine and the mortal, and pays the price of crossing it.\n\nSo beautiful was Thetis that both Zeus and Poseidon desired her — until it was foretold that she would bear a son greater than his father. At once the gods drew back, and to keep the danger small they married her to a mortal man, Peleus, who had to hold her fast as she changed in his arms to fire and water and beast before she would consent. Their son was Achilles, the greatest of warriors and the most short-lived; and Thetis, knowing his doom from the start, tried every way to cheat it — dipping him as an infant in the river of the dead to make him invulnerable, hiding him from the war, begging new armor for him from the gods — and still could only watch the prophecy close around her child, loving him all the more for being unable to keep him.",
    beats: [
      { label: "The Dangerous Prophecy", weight: 0.85, figures: ['zeus', 'poseidon'],
        text: "So beautiful was Thetis that both Zeus and Poseidon desired her — until it was foretold she would bear a son greater than his father. At once the gods drew back and married her to a mortal man." },
      { label: "Fire and Water and Beast", weight: 0.7,
        text: "Peleus had to hold her fast as she changed in his arms to fire and water and beast before she would consent. Their son was Achilles, the greatest of warriors and the most short-lived." },
      { label: "A Mother's Failing Shield", weight: 1.0, figures: ['hephaestus'],
        text: "Thetis, knowing his doom from the start, tried every way to cheat it — dipping him in the river of the dead, hiding him from the war, begging new armor from the gods — and still could only watch the prophecy close around her child." },
    ],
    source: "Hesiod, Theogony; Homer, Iliad."
  },

  // ---- HEROES ----
  perseus: {
    story: "Perseus is the bright hero of the impossible errand — son of Zeus and the mortal princess Danaë, and one of the very few in all the myths to walk out of his story into a long and happy life. Where other heroes are undone by pride or fate, Perseus is carried through by courage, quickness, and the steady favor of the gods.\n\nHe was born in a locked bronze chamber, for his grandfather had shut Danaë away to thwart a prophecy that her son would one day kill him — yet Zeus came to her as a shower of golden light, and Perseus was born all the same. Cast adrift in a wooden chest with his mother and washed ashore on a distant island, he grew, and was sent by a scheming king to fetch the head of Medusa, a task meant to be his death. Instead, guided by Athena's mirror-bright shield and Hermes' winged sandals, he struck off the Gorgon's head by her reflection, rescued Andromeda from a sea-monster on his way home, and turned his enemies to stone with the trophy in his hand. Even the old prophecy came true in the end — but gently, by the accident of a discus thrown astray, long years and a whole life later.",
    beats: [
      { label: "The Bronze Chamber", weight: 0.7, figures: ['zeus', 'danae'],
        text: "He was born in a locked bronze chamber where his grandfather had shut Danaë away to thwart a prophecy — yet Zeus came to her as a shower of golden light, and Perseus was born all the same." },
      { label: "The Gorgon's Head", weight: 1.0, figures: ['athena', 'hermes', 'medusa'],
        text: "Sent to fetch the head of Medusa on an errand meant to be his death, Perseus was guided by Athena's mirror-bright shield and Hermes' winged sandals, and struck off the Gorgon's head by her reflection." },
      { label: "Andromeda Unchained", weight: 0.85, figures: ['andromeda'],
        text: "On his way home he rescued Andromeda from a sea-monster, turning the beast to stone with the trophy in his hand — and won her as his bride." },
      { label: "The Gentle Prophecy", weight: 0.6,
        text: "Even the old prophecy came true in the end — but gently, by the accident of a discus thrown astray, long years and a whole life later." },
    ],
    source: "Ovid, Metamorphoses IV–V; Apollodorus, Library. Further reading: Ted Hughes, Tales from Ovid."
  },
  heracles: {
    story: "Heracles is the greatest of all the Greek heroes — the strongest man who ever lived and the only mortal ever to win a seat among the gods. A son of Zeus, his strength was matched at every turn only by the suffering laid upon him, and his whole life is one long labor of that strength bent, again and again, to undoing harm.\n\nHis sorrow began before his birth, in Hera's hatred of yet another of her husband's children; and it was Hera who, when he was grown and happy, struck him with a madness in which he killed his own wife and children with his bare hands. To purge that horror he was bound to the service of a lesser king, who set him twelve impossible labors — to strangle the lion of Nemea, to cut down the deathless Hydra, to cleanse the world of its monsters and haul up the very hound of hell. He accomplished every one. And though he died at the last in agony, poisoned by a robe steeped in a centaur's blood, the gods lifted him from the burning pyre and set him among the stars: the mortal who suffered his way into heaven.",
    beats: [
      { label: "Hera's Hatred", weight: 0.8, figures: ['hera', 'zeus'],
        text: "His sorrow began before his birth, in Hera's hatred of yet another of her husband's children; and it was Hera who struck him with a madness in which he killed his own wife and children with his bare hands." },
      { label: "The Twelve Labors", weight: 1.0, figures: ['nemean_lion', 'hydra', 'cerberus'],
        text: "To purge that horror he was bound to a lesser king, who set him twelve impossible labors — to strangle the lion of Nemea, to cut down the deathless Hydra, to cleanse the world of its monsters and haul up the very hound of hell." },
      { label: "The Poisoned Robe", weight: 0.85,
        text: "He accomplished every one. And though he died at the last in agony, poisoned by a robe steeped in a centaur's blood, the fire consumed only what was mortal in him." },
      { label: "Suffered into Heaven", weight: 0.7,
        text: "The gods lifted him from the burning pyre and set him among the stars: the mortal who suffered his way into heaven." },
    ],
    source: "Apollodorus, Library; Hesiod, Theogony."
  },
  odysseus: {
    story: "Odysseus is the cleverest of all the Greek heroes — not the strongest spear nor the swiftest runner, but the subtlest mind, the man of many turns and many tricks who wins by wit what others cannot win by force. He is the hero of the long way home, and of the patience and cunning it takes to survive it.\n\nIt was Odysseus who devised the wooden horse that took the towers of Troy after ten years of siege; but the same cleverness made him an enemy, for he blinded the Cyclops Polyphemus, and the Cyclops was a son of Poseidon. So the sea-god hounded him for ten more years across every water of the world, and one by one Odysseus lost his ships and all his men — to the lotus and the whirlpool, to the witch Circe and the singing Sirens, to his crew's own folly. Alone at the last, washed up naked on a strange shore, he still talked and schemed and endured his way home to Ithaca, to the wife and the kingdom that had waited twenty years for his return.",
    beats: [
      { label: "The Wooden Horse", weight: 0.85,
        text: "It was Odysseus who devised the wooden horse that took the towers of Troy after ten years of siege — the subtlest mind, winning by wit what others could not win by force." },
      { label: "The Cyclops's Eye", weight: 1.0, figures: ['polyphemus', 'poseidon'],
        text: "He blinded the Cyclops Polyphemus, and the Cyclops was a son of Poseidon. So the sea-god hounded him for ten more years across every water of the world." },
      { label: "Witch and Whirlpool", weight: 0.75, figures: ['circe', 'scylla', 'charybdis'],
        text: "One by one Odysseus lost his ships and all his men — to the lotus and the whirlpool, to the witch Circe and the singing Sirens, to his crew's own folly." },
      { label: "The Long Way Home", weight: 0.9,
        text: "Alone at the last, washed up naked on a strange shore, he still talked and schemed and endured his way home to Ithaca, to the wife and the kingdom that had waited twenty years for his return." },
    ],
    source: "Homer, Odyssey."
  },
  theseus: {
    story: "Theseus is the great hero and founding king of Athens — bold, clever, and restless, the slayer of the Minotaur and the prince who walked willingly into the maze. He is courage with a flaw running through it, a hero whose triumphs and whose betrayals are cut from the very same daring.\n\nHe was born in Troezen to Aethra, who told him his father was Aegeus, king of Athens — though some whispered it was Poseidon who had come to her that same night, so that the boy carried the sea in his blood alongside the crown. Before leaving, Aegeus hid a sword and a pair of sandals beneath a great stone, saying: when the boy is strong enough to lift it, send him to me. Theseus lifted the stone young, and set out for Athens not by the safe sea-route but overland, through the bandit-haunted isthmus — and on that road he made his name, clearing each horror as he went: Periphetes with his bronze club, Sinis who bent the pines, Sciron who kicked travelers from his cliff, and Procrustes who stretched or hacked his guests to fit his iron bed.\n\nHe arrived in Athens a stranger and was recognized by the sword and the sandals just as Medea, then Aegeus\'s queen, tried to poison him at the banquet table. The cup was dashed aside; the father embraced his son; and the sorceress fled. When Athens was forced to send its young men and women to Crete as tribute, to be devoured by the Minotaur in King Minos\'s Labyrinth, Theseus volunteered and vowed to end the horror. There the king\'s daughter Ariadne fell in love with him and gave him a sword and a ball of thread. He tied the thread at the mouth of the Labyrinth, unwound it as he went, killed the bull-headed monster at the maze\'s heart, and followed the line back out into the light.\n\nBut sailing home he abandoned Ariadne asleep on the island of Naxos — the hero whose triumphs and whose betrayals were cut from the very same daring. And then, in his joy or his carelessness, he forgot to change his black sails for white, the agreed sign of his survival, so that his watching father Aegeus, believing him dead, threw himself from the cliffs into the sea that bears his name ever since. Theseus became king of Athens by the grief his own forgetting caused.",
    beats: [
      { label: "Son of Two Fathers", weight: 0.65, figures: ['poseidon'],
        text: "Born in Troezen, Theseus was told his father was Aegeus, king of Athens — though some whispered it was Poseidon who had come to his mother that same night, so that the boy carried the sea in his blood alongside the crown." },
      { label: "The Stone and the Sword", weight: 0.7,
        text: "Aegeus hid a sword and sandals beneath a great stone, saying: when the boy is strong enough to lift it, send him to me. Theseus lifted the stone young, and set out for Athens overland." },
      { label: "The Six Labors", weight: 0.75,
        text: "He cleared the bandit-haunted road, horror by horror — Periphetes with his bronze club, Sinis who bent the pines, Sciron who kicked travelers from his cliff, and Procrustes who stretched or hacked his guests to fit his iron bed." },
      { label: "Recognized in Athens", weight: 0.7, figures: ['medea'],
        text: "He arrived a stranger and was recognized by the sword and sandals just as Medea, then Aegeus\'s queen, tried to poison him at the banquet table. The cup was dashed aside; the father embraced his son." },
      { label: "Ariadne\'s Thread", weight: 1.0, figures: ['ariadne', 'minotaur'],
        text: "Ariadne fell in love with him and gave him a sword and a ball of thread. He unwound it through the Labyrinth, killed the bull-headed monster at the maze\'s heart, and followed the line back out into the light." },
      { label: "The Sleeping Shore", weight: 0.7, figures: ['ariadne'],
        text: "But sailing home he abandoned Ariadne asleep on the island of Naxos — the hero whose triumphs and whose betrayals were cut from the very same daring." },
      { label: "The Black Sails", weight: 0.9,
        text: "In his joy or his carelessness he forgot to change his black sails for white, so that his watching father Aegeus, believing him dead, threw himself from the cliffs into the sea that bears his name ever since." },
    ],
    source: "Plutarch, Life of Theseus; Ovid, Metamorphoses VIII; Apollodorus, Library."
  },
  bellerophon: {
    story: "Bellerophon is the rider of the winged horse and the slayer of the Chimera — a dazzling hero lifted to the very edge of heaven, and then flung all the way back down. His story is the oldest warning in the myths: that the height a man is given is not a height he may keep.\n\nSent on an errand designed to kill him — to destroy the fire-breathing Chimera that no man could approach on foot — Bellerophon first tamed the wild winged horse Pegasus with a golden bridle laid in his hands by Athena, and from the saddle of the sky he killed the monster and went on to win battle after battle. But triumph swelled into pride, and at the last he dared to ride Pegasus up toward Olympus itself, to take a seat among the gods. The horse threw him. Bellerophon fell the whole long way back to the earth, and lived out his remaining days lamed and broken and alone, wandering the plain and shunning the paths of other men — a hero ruined by reaching too high.",
    beats: [
      { label: "The Golden Bridle", weight: 0.85, figures: ['athena', 'pegasus'],
        text: "Sent to destroy the fire-breathing Chimera on an errand designed to kill him, Bellerophon first tamed the wild winged horse Pegasus with a golden bridle laid in his hands by Athena." },
      { label: "Slaying the Chimera", weight: 1.0, figures: ['chimera'],
        text: "From the saddle of the sky he killed the Chimera and went on to win battle after battle — a dazzling hero lifted to the very edge of heaven." },
      { label: "The Reach for Olympus", weight: 0.9, figures: ['pegasus'],
        text: "But triumph swelled into pride, and at the last he dared to ride Pegasus up toward Olympus itself, to take a seat among the gods. The horse threw him." },
      { label: "The Broken Wanderer", weight: 0.65,
        text: "Bellerophon fell the whole long way back to the earth, and lived out his remaining days lamed and broken and alone, wandering the plain and shunning the paths of other men." },
    ],
    source: "Homer, Iliad VI; Hesiod, Theogony."
  },
  jason: {
    story: "Jason is the captain of the Argonauts, the prince who gathered the greatest heroes of his age aboard a single ship and sailed to the world\'s end for the Golden Fleece. He is the leader who could not have triumphed alone — and whose deepest failing was that he came to forget it.\n\nAs an infant he was smuggled out of Iolcus, hidden from his usurping uncle Pelias, and given to the centaur Chiron, who raised him on the wild slopes of Mount Pelion in the old way — herbs, hunting, the lyre and the spear. He grew tall and golden and came down from the mountain with one sandal lost in a river crossing, and the sight of him fulfilled the very prophecy Pelias feared: beware the one-sandaled stranger. So the king set him an impossible errand — to sail to Colchis, at the edge of the world, and bring back the Golden Fleece from the grove where a sleepless dragon kept it.\n\nJason called out the flower of his generation and they answered: Heracles, Orpheus, the Dioscuri, Atalanta — a ship\'s company of heroes aboard the Argo, the fastest hull ever built. At Colchis the king set trials no man could survive: yoke two fire-breathing bronze bulls, plough a field, and sow it with dragon\'s teeth from which armed warriors would spring. Jason would surely have perished but for the sorceress Medea, the king\'s own daughter, who fell helplessly in love with him. By her magic he yoked the bulls, survived the sown men, and charmed asleep the sleepless serpent that guarded the prize.\n\nMedea betrayed her father and killed her own brother to carry him to safety, burning every bridge behind her for a man she believed would never let her go. Yet years afterward, his ambition outrunning his loyalty, Jason cast her aside to marry the young princess Glauce of Corinth for a crown. Medea\'s revenge was total and terrible: she sent the bride a golden robe and coronet soaked in poison that burst into flame the moment they were put on, consuming the girl and the king who rushed to save her. Then, in the final act of a fury that had eaten through every tenderness, she killed the children she herself had borne Jason — and fled on the chariot of the Sun, leaving him at the end with nothing at all but the rotting hull of the Argo, beneath which, the old stories say, he sat down and died.",
    beats: [
      { label: "Raised by Chiron", weight: 0.6,
        text: "As an infant Jason was smuggled from Iolcus and given to the centaur Chiron, who raised him on the wild slopes of Mount Pelion — herbs, hunting, the lyre and the spear." },
      { label: "The One-Sandaled Stranger", weight: 0.7,
        text: "He came down from the mountain with one sandal lost in a river crossing, fulfilling the prophecy his uncle Pelias feared. The king set him an impossible errand: sail to Colchis and bring back the Golden Fleece." },
      { label: "The Argo Sails", weight: 0.8, figures: ['heracles'],
        text: "Jason called out the flower of his generation — Heracles, Orpheus, the Dioscuri, Atalanta — a ship\'s company of heroes aboard the Argo, the fastest hull ever built." },
      { label: "The Trials at Colchis", weight: 0.85, figures: ['colchian_dragon'],
        text: "At Colchis the king set trials no man could survive: yoke two fire-breathing bronze bulls, plough a field, and sow it with dragon\'s teeth from which armed warriors would spring." },
      { label: "Medea\'s Sorcery", weight: 1.0, figures: ['medea', 'colchian_dragon'],
        text: "Jason would surely have perished but for the sorceress Medea, who fell helplessly in love with him. By her magic he yoked the bulls, survived the sown men, and charmed asleep the sleepless serpent that guarded the prize." },
      { label: "The Broken Vow", weight: 0.8, figures: ['medea'],
        text: "Years afterward, his ambition outrunning his loyalty, Jason cast Medea aside to marry the young princess Glauce of Corinth for a crown — the leader who forgot what he owed." },
      { label: "Medea\'s Revenge", weight: 0.95, figures: ['medea'],
        text: "She sent the bride a golden robe soaked in poison that burst into flame, then killed the children she herself had borne Jason — and fled on the chariot of the Sun, leaving him at the end with nothing at all but the rotting hull of the Argo." },
    ],
    source: "Apollonius of Rhodes, Argonautica; Euripides, Medea; Ovid, Metamorphoses VII."
  },

  // ---- NYMPHS & EARTHWARD ----
  circe: {
    story: "Circe is the great enchantress of myth — daughter of Helios the Sun and the Oceanid Perse, born with the fire of stars and the cold of sea-water mingled in her blood. Divine on both sides, yet she was given no throne, no court, no company; the gods set her alone on the wooded island of Aiaia, where she became mistress of herbs and transformations, a goddess who learned to need no one and who turned the men who washed up on her shore into the beasts she judged them to be.\n\nHer reputation spread across the wine-dark sea: a witch-goddess whose halls smelled of cedar and thyme, whose loom sang while wolves and lions padded tame at her feet — beasts that had once been men. When Odysseus\'s crew came hungry to those halls, she feasted them and touched them with her wand, and they dropped to the floor as swine — snouts and bristles and little weeping eyes, their human minds left whole inside the bodies of pigs. Only Odysseus withstood the cup, armed by Hermes with the white flower moly, its root black as the night. When her spell broke harmless against him, she took him not as an enemy but as a lover.\n\nFor a full year he stayed on Aiaia — not as a prisoner but as a guest and a beloved, feasting at her table while his men grew fat and easy. It was Circe who told him what no other could: that to find his way home he must first sail to the land of the dead and hear the shade of the prophet Tiresias speak. She gave him the rites, the route, the warnings — the sorceress becoming the guide.\n\nYet her gift had a darker face. When the sea-god Glaucus came begging a charm to win the nymph Scylla, Circe — who wanted him for herself and was refused — poured poison into the cove where Scylla bathed, and watched the girl she envied burst from the waist down into a ring of baying dogs: a monster made out of nothing but jealousy. And later traditions say that from her year with Odysseus she bore a son, Telegonus, who would one day sail unknowing to Ithaca and kill his own father with a spear tipped in the spine of a stingray — so that even Circe\'s love, carried far enough forward, drew blood.",
    beats: [
      { label: "Daughter of the Sun", weight: 0.7, figures: ['helios'],
        text: "Circe was born of Helios the Sun and the Oceanid Perse — divine on both sides, yet given no throne and no company. The gods set her alone on the wooded island of Aiaia, where she became mistress of herbs and transformations." },
      { label: "The Witch\'s Reputation", weight: 0.6,
        text: "Her reputation spread across the wine-dark sea: a goddess whose halls smelled of cedar and thyme, whose loom sang while wolves and lions padded tame at her feet — beasts that had once been men." },
      { label: "Odysseus\'s Crew in Swine", weight: 0.85, figures: ['odysseus'],
        text: "She feasted Odysseus\'s crew and touched them with her wand, and they dropped to the floor as swine — snouts and bristles and little weeping eyes, their human minds left whole inside the bodies of pigs." },
      { label: "The White Flower Moly", weight: 1.0, figures: ['odysseus', 'hermes'],
        text: "Only Odysseus withstood the cup, armed by Hermes with the white flower moly. When her spell broke harmless against him, she took him not as an enemy but as a lover." },
      { label: "A Year on Aiaia", weight: 0.75, figures: ['odysseus'],
        text: "For a full year he stayed — not as a prisoner but as a guest and a beloved. It was Circe who told him he must sail to the land of the dead to find his way home. The sorceress became the guide." },
      { label: "The Poisoned Pool", weight: 0.9, figures: ['glaucus', 'scylla'],
        text: "When the sea-god Glaucus came begging a charm to win Scylla, Circe — who wanted him for herself — poured poison into the cove where the nymph bathed, and watched the girl burst into a ring of baying dogs: a monster made of jealousy." },
      { label: "Mother of Telegonus", weight: 0.65, figures: ['odysseus'],
        text: "Later traditions say she bore Odysseus a son, Telegonus, who would one day sail unknowing to Ithaca and kill his own father — so that even Circe\'s love, carried far enough forward, drew blood." },
    ],
    source: "Homer, Odyssey X; Ovid, Metamorphoses XIV. Further reading: Ted Hughes, Tales from Ovid."
  },
  calypso: {
    story: "Calypso is the lonely nymph of the island of Ogygia, a daughter of the Titan Atlas who dwells at the still navel of the sea, far from the company of gods and men — beautiful, immortal, and utterly alone. Her name means 'the hidden one,' and to be loved by her is to be hidden away from the whole of the world.\n\nWhen the shipwrecked Odysseus was cast upon her shore, the last survivor of all his fleet, Calypso took him in and loved him, and kept him at her side for seven long years. She offered him what is offered to no mortal — agelessness, deathlessness, an eternity with her — if only he would stay and forget the rocky little kingdom and the aging wife who waited for him. But he sat each day upon the headland weeping toward the grey water, and at last the gods themselves commanded her to release him. Grieving, she gave the man she loved the tools to build his raft and a fair wind to carry him off, and stood on the shore and watched him sail away into the world that had never once stopped calling him home.",
    beats: [
      { label: "The Hidden One", weight: 0.7, figures: ['atlas'],
        text: "Calypso is the lonely nymph of Ogygia, a daughter of Atlas who dwells at the still navel of the sea — beautiful, immortal, and utterly alone. Her name means 'the hidden one.'" },
      { label: "Seven Years of Longing", weight: 1.0, figures: ['odysseus'],
        text: "When the shipwrecked Odysseus was cast upon her shore, Calypso took him in and loved him for seven years, offering him immortality itself — but he sat each day upon the headland weeping toward the grey water." },
      { label: "The Raft and the Fair Wind", weight: 0.85,
        text: "At last the gods commanded her to release him. Grieving, she gave the man she loved the tools to build his raft and a fair wind to carry him off, and stood on the shore and watched him sail away." },
    ],
    source: "Homer, Odyssey V."
  },
  muses: {
    story: "The Muses are the nine goddesses of inspiration — the bright sisters who preside over poetry and music, history and dance, tragedy and the wheeling of the stars. They are the unseen presence behind every made thing of beauty, the breath a singer draws before the first true note.\n\nThey were born of nine nights between Zeus and Mnemosyne, the Titaness of Memory, on the slopes below Olympus — so that art is the child of power and remembrance together. They dwell on Mount Helicon, where the spring that Pegasus opened with a strike of his hoof runs cold and clear, and there they sing for the gods and touch chosen mortals with their gift. This is why the old poems all begin by calling upon them: no singer believed the song was truly his own, but rather that the Muses, the daughters of Memory, were speaking the remembered past through his mouth.",
    beats: [
      { label: "Nine Bright Sisters", weight: 0.8,
        text: "The Muses are the nine goddesses of inspiration — the bright sisters who preside over poetry and music, history and dance, tragedy and the wheeling of the stars." },
      { label: "Born of Power and Memory", weight: 1.0, figures: ['zeus', 'mnemosyne'],
        text: "They were born of nine nights between Zeus and Mnemosyne, the Titaness of Memory — so that art is the child of power and remembrance together." },
      { label: "The Spring on Helicon", weight: 0.7, figures: ['pegasus'],
        text: "They dwell on Mount Helicon, where the spring that Pegasus opened with a strike of his hoof runs cold and clear, and there they sing for the gods and touch chosen mortals with their gift." },
    ],
    source: "Hesiod, Theogony."
  },
  daphne: {
    story: "Daphne is a nymph of the wild woods and running water, a daughter of a river-god, who wished for nothing in the world but to run free among the trees and to be no man's at all. She is the first of Apollo's loves and the first of his griefs — the one who would sooner become a tree than be caught.\n\nHer fate was sealed by a quarrel of the gods. Stung by the radiant Apollo's mockery, little Eros drew two arrows from his quiver: one of gold, which he loosed into the god to kindle a helpless desire, and one of lead, which he shot into Daphne to fill her with loathing of it. So Apollo pursued her through the forest, pleading even as he ran, and she fled until her strength gave out at the bank of her father's river. There she cried out to the river-god to destroy the beauty that doomed her — and as the god's hands closed upon her, bark climbed her skin, her hair thickened into leaves, her swift feet struck root into the earth. Apollo embraced only a laurel tree, and pressed his face to the cool bark where her heart still beat beneath it; and he made the laurel his own forever, so that the girl who fled him would crown his every victory.",
    beats: [
      { label: "The Two Arrows", weight: 0.85, figures: ['eros', 'apollo'],
        text: "Stung by Apollo's mockery, little Eros drew two arrows: one of gold to kindle helpless desire in the god, and one of lead to fill Daphne with loathing of it." },
      { label: "The Chase Through the Forest", weight: 1.0, figures: ['apollo'],
        text: "Apollo pursued her through the forest, pleading even as he ran, and she fled until her strength gave out at the bank of her father's river and she cried out to destroy the beauty that doomed her." },
      { label: "Bark Over Her Heart", weight: 0.9,
        text: "As the god's hands closed upon her, bark climbed her skin, her hair thickened into leaves, her feet struck root. Apollo embraced only a laurel tree, and made it his crown forever." },
    ],
    source: "Ovid, Metamorphoses I. Further reading: Ted Hughes, Tales from Ovid."
  },
  io: {
    story: "Io is a mortal priestess of Hera, a princess of Argos whose only fault was to be beautiful enough to catch the wandering eye of Zeus. Hers is a story of helpless suffering — a girl flung back and forth between a god's desire and a goddess's jealousy, and given no say in either.\n\nTo hide his affair, Zeus changed Io into a snow-white heifer — but Hera, undeceived, asked for the lovely creature as a gift and set the hundred-eyed giant Argus to guard her, so that some of those unsleeping eyes were always open and watching. When Hermes lulled Argus to sleep with stories and killed him to set her free, Hera was not finished: she sent a maddening gadfly to sting the heifer onward, and drove poor Io wandering in torment across the whole width of the world, over the sea that took her name and past the very rock where Prometheus hung in chains. Only when she came at last to the Nile did Zeus restore her to herself with a gentle touch — and there, her long flight ended, she was made a woman again and bore the line of kings from which Heracles himself would one day come.",
    beats: [
      { label: "The White Heifer", weight: 0.85, figures: ['zeus', 'hera'],
        text: "To hide his affair, Zeus changed Io into a snow-white heifer — but Hera, undeceived, asked for the creature as a gift and set the hundred-eyed giant Argus to guard her." },
      { label: "The Slaying of Argus", weight: 1.0, figures: ['hermes'],
        text: "Hermes lulled Argus to sleep with stories and killed him to set her free — but Hera sent a maddening gadfly to sting the heifer onward, driving Io in torment across the whole width of the world." },
      { label: "Restored at the Nile", weight: 0.75, figures: ['zeus', 'heracles'],
        text: "Only at the Nile did Zeus restore her with a gentle touch — and there she bore the line of kings from which Heracles himself would one day come." },
    ],
    source: "Ovid, Metamorphoses I. Further reading: Ted Hughes, Tales from Ovid."
  },
  callisto: {
    story: "Callisto is a nymph of Artemis's wild company, a huntress sworn to the goddess's service and to lifelong chastity, who ran the forests with her bow and asked for nothing more. She is one of the gentlest of the doomed, punished for a wrong that was never hers to commit.\n\nZeus desired her and took her, and when at last her secret could no longer be hidden she was cast out of Artemis's band in shame — and then turned into a shaggy bear, by Hera's spite or the goddess's own anger, to wander in dread through the woods she had once hunted, fleeing the very hounds that had once run at her side. Years later her own son Arcas, grown now into a hunter, came upon the great bear among the trees and raised his spear, never knowing it was his mother — but Zeus, in pity, caught them both up into the heavens in that last instant and set them among the stars as the Great Bear and the Little Bear, circling the pole forever and, by Hera's lasting grudge, never permitted to sink and rest beneath the sea.",
    beats: [
      { label: "The Huntress Betrayed", weight: 0.8, figures: ['zeus', 'artemis'],
        text: "Zeus desired her and took her; when her secret could no longer be hidden she was cast out of Artemis's band in shame — punished for a wrong that was never hers." },
      { label: "The Bear in the Woods", weight: 1.0, figures: ['hera'],
        text: "Turned into a shaggy bear by Hera's spite, she wandered in dread through the woods she had once hunted, fleeing the very hounds that had once run at her side." },
      { label: "Set Among the Stars", weight: 0.85, figures: ['zeus'],
        text: "When her own son raised his spear at the bear, never knowing it was his mother, Zeus caught them both into the heavens as the Great Bear and the Little Bear, circling the pole forever." },
    ],
    source: "Ovid, Metamorphoses II. Further reading: Ted Hughes, Tales from Ovid."
  },
  arachne: {
    story: "Arachne is a mortal girl of Lydia, a weaver of such genius that the nymphs left their streams and groves to watch her work — and whose gift was matched only by her pride, for she would not grant that she had learned her art from anyone, least of all from a goddess. She is the first spider, and the oldest parable of a talent that will not bow.\n\nWhen she boasted that her weaving outshone Athena's own, the goddess came to her disguised as an old woman to counsel humility, and was scorned for it; so Athena threw off the disguise, and the two set their looms side by side. Athena wove the gods in their glory; Arachne wove the gods in their cruelties — every betrayal and disguise and violation, a tapestry flawless in its skill and unforgivable in its truth. Enraged less by the perfection than by the honesty of it, Athena struck the girl down. Where Arachne in despair hanged herself, the goddess loosened the noose into a thread and shrank her into a small dark spinner — condemned, with all her children after her, to weave in the corners of the world forever.",
    beats: [
      { label: "A Talent That Will Not Bow", weight: 0.7,
        text: "Arachne is a mortal girl of Lydia, a weaver of such genius that the nymphs left their streams to watch her work — and whose pride would not grant she had learned her art from a goddess." },
      { label: "The Contest of Looms", weight: 1.0, figures: ['athena'],
        text: "Athena wove the gods in their glory; Arachne wove the gods in their cruelties — every betrayal and violation, a tapestry flawless in its skill and unforgivable in its truth." },
      { label: "The First Spider", weight: 0.9, figures: ['athena'],
        text: "Enraged by the honesty of it, Athena struck the girl down. Where Arachne in despair hanged herself, the goddess loosened the noose into a thread and shrank her into a small dark spinner, condemned to weave in the corners of the world forever." },
    ],
    source: "Ovid, Metamorphoses VI. Further reading: Ted Hughes, Tales from Ovid."
  },
  asclepius: {
    story: "Asclepius is the great healer of myth, the mortal son of Apollo who rose to become the god of medicine — a man whose art grew so perfect that it overstepped the boundary the gods had set between the living and the dead. He is the hope at every sickbed, and the warning that even healing has a forbidden edge.\n\nSnatched as an unborn child from his dying mother's funeral pyre by his father Apollo, he was given to the wise centaur Chiron to raise, and learned from him every secret of herb and knife and binding, until he could close any wound and break any fever. But his skill ran past its appointed limit when he learned to raise the dead outright, calling souls back up out of the underworld — and Hades complained to Zeus that the very order of life and death was being unmade. So Zeus struck the healer down with a thunderbolt. Yet his worth was not denied him: he was set among the stars as the constellation of the Serpent-Bearer, and honored ever after as a god, his temples filled with the sick who came to be healed as they slept.",
    beats: [
      { label: "Snatched from the Pyre", weight: 0.8, figures: ['apollo'],
        text: "Snatched as an unborn child from his dying mother's funeral pyre by Apollo, he was given to the wise centaur Chiron to raise, and learned every secret of herb and knife and binding." },
      { label: "Raising the Dead", weight: 1.0, figures: ['hades'],
        text: "His skill ran past its limit when he learned to raise the dead outright — and Hades complained to Zeus that the very order of life and death was being unmade." },
      { label: "The Thunderbolt and the Stars", weight: 0.85, figures: ['zeus'],
        text: "Zeus struck the healer down with a thunderbolt. Yet his worth was not denied: he was set among the stars as the Serpent-Bearer, and honored ever after as a god." },
    ],
    source: "Ovid, Metamorphoses II, XV; Pindar, Pythian 3."
  },
  minotaur: {
    story: "The Minotaur is the shame of Crete made flesh — a creature with the body of a powerful man and the head and horns of a bull, born of an unnatural union and hidden away in the dark heart of a maze. He is hunger without reason, a man's mind caught in a beast's craving, and he feeds on the flesh of the young.\n\nHis making was itself a punishment. When King Minos kept back from Poseidon a magnificent white bull that was meant for sacrifice, the god in revenge filled the queen, Pasiphaë, with a monstrous passion for the animal, and from it she bore the bull-headed child. Minos, unable to kill it and unwilling to look upon it, had the craftsman Daedalus build the Labyrinth — a maze so cunning its own maker could scarcely find the way out — and shut the Minotaur within, feeding it on youths and maidens sent as tribute from conquered Athens. There it prowled the windings in the dark, until Theseus came at last with a sword in his hand and a thread to mark his way, and killed it at the center of the maze.",
    beats: [
      { label: "The Shame of Crete", weight: 0.8, figures: ['poseidon'],
        text: "When King Minos kept back from Poseidon a magnificent white bull, the god filled the queen with a monstrous passion for the animal, and from it she bore the bull-headed child." },
      { label: "The Labyrinth", weight: 0.9, figures: ['daedalus'],
        text: "Minos had the craftsman Daedalus build the Labyrinth — a maze so cunning its own maker could scarcely find the way out — and shut the Minotaur within, feeding it on youths and maidens." },
      { label: "Killed at the Center", weight: 1.0, figures: ['theseus'],
        text: "There it prowled the windings in the dark, until Theseus came at last with a sword in his hand and a thread to mark his way, and killed it at the center of the maze." },
    ],
    source: "Apollodorus, Library; Ovid, Metamorphoses VIII."
  },
  ariadne: {
    story: "Ariadne is the princess of Crete who holds the thread of the most famous story in the maze — daughter of King Minos, half-sister to the Minotaur, the girl whose love undoes the monster and whose abandonment becomes, against all expectation, the doorway to something far greater. She is the one left sleeping on the empty shore who wakes to find herself a god's bride.\n\nWhen Theseus came to Crete to face the Minotaur, Ariadne fell in love with him and gave him the secret that saved his life — a ball of thread to unwind through the Labyrinth, so that he could find the way back out of the dark once the killing was done. She fled with him across the sea, having betrayed her own father and her own blood for his sake; and he repaid her by abandoning her, asleep and alone, on the island of Naxos as he sailed away at dawn. But there, in the depths of her grief, the god Dionysus found her — and loved her as the hero had not, took her for his wife, and lifted her bridal crown up into the night, where it shines still as the Corona, a circlet of stars set forever above the woman who was left behind.",
    beats: [
      { label: "The Thread of the Maze", weight: 1.0, figures: ['theseus', 'minotaur'],
        text: "When Theseus came to face the Minotaur, Ariadne fell in love and gave him the secret that saved his life — a ball of thread to unwind through the Labyrinth, so he could find the way back out." },
      { label: "Abandoned on Naxos", weight: 0.85, figures: ['theseus'],
        text: "She fled with him across the sea, having betrayed her own father for his sake; and he repaid her by abandoning her, asleep and alone, on the island of Naxos as he sailed away at dawn." },
      { label: "A God's Bride", weight: 0.9, figures: ['dionysus'],
        text: "In the depths of her grief, Dionysus found her and loved her as the hero had not, took her for his wife, and lifted her bridal crown into the night, where it shines still as the Corona." },
    ],
    source: "Apollodorus, Library; Ovid, Metamorphoses VIII."
  },
  medea: {
    story: "Medea is the most formidable of all the mortal women of myth — a sorceress and a priestess of Hecate, granddaughter of the Sun, whose love and whose vengeance burn with one and the same terrible intensity. She is power that gives away everything for love, and then, betrayed, takes everything back: the most devoted and the most fearsome figure in the story she shares with Jason.\n\nWhen Jason came to her father's distant kingdom for the Golden Fleece, Medea fell helplessly in love and turned the whole force of her magic to his survival — taming the fire-breathing bulls, lulling the sleepless dragon, betraying her father and killing her own brother to flee with him across the sea. She gave him children and made him the match of a king. And when, for ambition's sake, Jason cast her aside to marry a younger princess for a crown, the same fierce heart turned to ice: she sent the bride a poisoned robe that burned her alive, and then — to leave Jason with nothing in the world left to live for — she killed with her own hand the children she had borne him, and rode away above the ruin in a chariot drawn by dragons, beyond his reach and beyond every judgment but her own.",
    beats: [
      { label: "Love and Sorcery", weight: 0.9, figures: ['jason', 'hecate'],
        text: "When Jason came for the Golden Fleece, Medea fell helplessly in love and turned the whole force of her magic to his survival — taming fire-breathing bulls, lulling the sleepless dragon, betraying her father and killing her own brother." },
      { label: "The Broken Oath", weight: 0.8, figures: ['jason'],
        text: "She gave him children and made him the match of a king. And when, for ambition's sake, Jason cast her aside to marry a younger princess, the same fierce heart turned to ice." },
      { label: "The Chariot of Dragons", weight: 1.0, figures: ['jason'],
        text: "She sent the bride a poisoned robe that burned her alive, then killed with her own hand the children she had borne him, and rode away in a chariot drawn by dragons — beyond his reach and beyond every judgment but her own." },
    ],
    source: "Apollonius of Rhodes, Argonautica; Ovid, Metamorphoses VII; Euripides, Medea."
  },
   semele: {
    story: "Semele is a princess of Thebes, a mortal woman loved by Zeus himself and the mother of a god — the only human ever to give birth to an Olympian, and to pay for that glory with her life. She is the bright moth drawn to the one light no mortal can survive the sight of.\n\nWhile Semele was carrying Zeus's child, jealous Hera came to her disguised as an old nurse and quietly sowed a doubt: was her divine lover truly a god at all? So Semele, deceived, begged Zeus to swear an unbreakable oath, and then asked him to show himself to her exactly as he showed himself to Hera, in the full blaze of his divinity. Bound by his oath and unable to refuse, the god came to her crowned in his own lightning — and the sight of him burned her to ash where she stood. But Zeus snatched the unborn child from the fire and sewed it into his own thigh to finish its growing, and so brought forth Dionysus; and the son, when he was grown, went down into the land of the dead to bring his mother up from the shadows and set her among the stars.",
    beats: [
      { label: "Beloved of Zeus", weight: 0.7, figures: ['zeus'],
        text: "Semele is a princess of Thebes, a mortal woman loved by Zeus himself — the only human ever to give birth to an Olympian, the bright moth drawn to the one light no mortal can survive." },
      { label: "Hera's Poisoned Doubt", weight: 1.0, figures: ['hera', 'zeus'],
        text: "Jealous Hera came disguised as an old nurse and sowed a doubt, until Semele begged Zeus to show himself in his full divinity. Bound by his oath, the god came crowned in lightning — and the sight burned her to ash." },
      { label: "The Twice-Born Son", weight: 0.85, figures: ['dionysus'],
        text: "Zeus snatched the unborn child from the fire and sewed it into his own thigh; and the son, Dionysus, when grown, went down to the land of the dead to bring his mother up and set her among the stars." },
    ],
    source: "Ovid, Metamorphoses III. Further reading: Ted Hughes, Tales from Ovid."
  },
  phaethon: {
    story: "Phaethon is the boy who drove the chariot of the Sun — a child of Helios and a mortal woman, who reached for proof of his divine father and seized instead the instrument of his own death. His is the great myth of ambition outrunning strength, the cautionary blaze written in fire across the sky.\n\nTaunted that the Sun was no true father of his, Phaethon journeyed to the blazing palace of Helios and begged for a sign that none could ever doubt; and his father, having rashly sworn to grant whatever the boy asked, could not refuse him the one thing he wanted — to drive the sun-chariot across the heavens for a single day. But Phaethon had not the strength to hold the four fire-breathing horses, and they bolted from the worn path, scorching the high heavens and then plunging low to set the very earth ablaze, drying the rivers and blackening whole lands to desert, until the world itself cried out for mercy. To save creation, Zeus struck the runaway boy from the sky with a thunderbolt, and Phaethon fell blazing like a shooting star into the river Eridanus — where his grieving sisters were turned to weeping poplars on the bank, and their tears to beads of amber.",
    beats: [
      { label: "A Father's Rash Oath", weight: 0.8, figures: ['helios'],
        text: "Taunted that the Sun was no true father of his, Phaethon journeyed to the blazing palace of Helios and begged a sign — and his father, having rashly sworn to grant whatever the boy asked, could not refuse him the sun-chariot." },
      { label: "The Heavens Ablaze", weight: 1.0,
        text: "Phaethon had not the strength to hold the fire-breathing horses; they bolted from the worn path, scorching the heavens and setting the earth ablaze, drying rivers and blackening whole lands to desert." },
      { label: "Struck from the Sky", weight: 0.9, figures: ['zeus'],
        text: "To save creation, Zeus struck the boy from the sky with a thunderbolt, and Phaethon fell blazing like a shooting star into the river Eridanus — where his sisters were turned to weeping poplars and their tears to amber." },
    ],
    source: "Ovid, Metamorphoses I–II. Further reading: Ted Hughes, Tales from Ovid."
  },
  narcissus: {
    story: "Narcissus is a youth of heartbreaking beauty and heartbreaking coldness — a boy so lovely that every nymph and mortal who saw him fell in love, and so proud that he turned them all away without a second glance. He is the emblem of a beauty that can love nothing outside itself, and of the punishment folded quietly inside that gift.\n\nOne of those he scorned prayed that Narcissus might one day love, and never have what he loved — and Nemesis, the goddess who answers cruelty, heard the prayer and granted it. Coming hot and thirsty to a still, clear pool, Narcissus bent to drink and saw his own reflection gazing up at him, and fell in love with it past all reason, never understanding that it was himself. He could not kiss the face without shattering it, could not embrace it, could not bring himself to leave it; and so he lay by the water reaching for the unreachable until he wasted away and died there, still staring down. Where his body had lain the others found only a flower, white-petalled and bowed toward the water, that carries his name to this day.",
    beats: [
      { label: "Beauty Without Mercy", weight: 0.7, figures: ['echo'],
        text: "Narcissus is a youth of heartbreaking beauty and heartbreaking coldness — so lovely that every nymph fell in love, and so proud that he turned them all away without a second glance." },
      { label: "The Answered Prayer", weight: 1.0, figures: ['nemesis'],
        text: "Nemesis heard the prayer that Narcissus might love and never have what he loved. At a still pool he saw his own reflection and fell in love with it past all reason, never understanding it was himself." },
      { label: "The Flower by the Water", weight: 0.85,
        text: "He could not kiss the face without shattering it; he lay by the water reaching for the unreachable until he wasted away. Where his body had lain the others found only a white-petalled flower bowed toward the water." },
    ],
    source: "Ovid, Metamorphoses III. Further reading: Ted Hughes, Tales from Ovid."
  },
  echo: {
    story: "Echo is a nymph of the hills and woodlands, once a bright and chattering creature who loved nothing better than the last word — until her own voice became first her punishment and then all that was left of her. She is the sound that answers from the cliff-face and the empty valley, a love that could never once speak first.\n\nShe had angered Hera by covering for Zeus with her endless talk, holding the goddess in conversation while the god's lovers slipped quietly away; so Hera took from her all speech of her own, leaving her able only to give back the last words that others spoke. Then Echo loved the beautiful Narcissus, and trailed him through the woods aching to call out to him — but could only return his own words to him, 'Is anyone here? — here. Come to me — to me,' until he turned from her in scorn. Heartbroken and refused, she wasted away in the lonely glens until her body faded entirely and nothing remained but her voice, which lingers still in caves and mountains, answering whoever calls into them.",
    beats: [
      { label: "Hera's Punishment", weight: 0.8, figures: ['hera', 'zeus'],
        text: "Echo had angered Hera by covering for Zeus with her endless talk; so Hera took from her all speech of her own, leaving her able only to give back the last words that others spoke." },
      { label: "The Unreturnable Love", weight: 1.0, figures: ['narcissus'],
        text: "Echo loved the beautiful Narcissus and trailed him through the woods aching to call out — but could only return his own words, until he turned from her in scorn." },
      { label: "Only a Voice", weight: 0.85,
        text: "Heartbroken and refused, she wasted away in the lonely glens until her body faded entirely and nothing remained but her voice, which lingers still in caves and mountains, answering whoever calls." },
    ],
    source: "Ovid, Metamorphoses III. Further reading: Ted Hughes, Tales from Ovid."
  },
  actaeon: {
    story: "Actaeon is a young hunter of Thebes, grandson of a king and a pupil of the wise centaur Chiron — a skilled and innocent man whose only crime was to be in the wrong glade at the wrong hour. His is the most frightening kind of tragedy: ruin with no fault in it, a doom that falls by sheer ill chance.\n\nWandering the wooded mountain with his pack of hounds after a day's hunting, Actaeon parted the leaves of a hidden valley and came without warning upon the goddess Artemis bathing naked in a forest pool among her nymphs. She would suffer no man who had seen her so to live to speak of it; with no spell but a handful of flung water she set antlers branching from his brow, drew his neck out long, dappled his skin and stole his voice — and turned the hunter into a stag. His own fifty hounds, catching the strange new scent, gave chase to the master they no longer knew, ran him down upon the slope, and tore him to pieces while he tried in vain to call each of them by name.",
    beats: [
      { label: "The Wrong Glade", weight: 0.7,
        text: "Actaeon is a young hunter whose only crime was to be in the wrong glade at the wrong hour — ruin with no fault in it, a doom that falls by sheer ill chance." },
      { label: "The Flung Water", weight: 1.0, figures: ['artemis'],
        text: "He came upon Artemis bathing naked in a forest pool; with no spell but a handful of flung water she set antlers branching from his brow and turned the hunter into a stag." },
      { label: "Torn by His Own Hounds", weight: 0.9,
        text: "His own fifty hounds, catching the strange new scent, gave chase to the master they no longer knew, ran him down upon the slope, and tore him to pieces while he tried in vain to call them by name." },
    ],
    source: "Ovid, Metamorphoses III. Further reading: Ted Hughes, Tales from Ovid."
  },
  tiresias: {
    story: "Tiresias is the great blind prophet of Thebes, the seer whose inner sight outlasted his eyes and even his death — for he kept his prophetic mind among the shades of the dead, and it was his ghost that Odysseus crossed the edge of the world to consult. He is the one mortal who lived as both man and woman, and so came to know more of life than either alone can know.\n\nWalking once in the forest, he came upon two great serpents coupling on the path and struck them with his staff — and was at once changed into a woman, and lived seven years as one before chancing on the same sign again and being changed back. So when Zeus and Hera fell to arguing whether man or woman takes the greater pleasure in love, they summoned the one being who had been both; and Tiresias answered, truthfully, that the woman's pleasure is by far the greater. Furious to lose the argument, Hera struck him blind on the spot — and Zeus, who could not undo another god's act, gave him in recompense the gift of true prophecy and a life that spanned seven generations of mortal men.",
    beats: [
      { label: "The Two Serpents", weight: 0.8,
        text: "Walking in the forest, Tiresias came upon two serpents coupling on the path and struck them — and was at once changed into a woman, living seven years as one before being changed back." },
      { label: "The Argument of the Gods", weight: 1.0, figures: ['zeus', 'hera'],
        text: "When Zeus and Hera argued whether man or woman takes the greater pleasure in love, they summoned the one being who had been both; and Tiresias answered that the woman's pleasure is far greater." },
      { label: "Blindness and Prophecy", weight: 0.85, figures: ['hera', 'zeus'],
        text: "Furious, Hera struck him blind on the spot — and Zeus, who could not undo another god's act, gave him in recompense the gift of true prophecy and a life spanning seven generations." },
    ],
    source: "Ovid, Metamorphoses III. Further reading: Ted Hughes, Tales from Ovid."
  },
  adonis: {
    story: "Adonis is a youth of such surpassing beauty that two goddesses fell to war over him — the very image of mortal loveliness, fleeting and doomed, beloved of Aphrodite herself and mourned by her when the brief flower of his life was cut. He is the beauty the world cannot keep, the spring blossom that dies almost as soon as it opens.\n\nEven his birth came out of a tangled grief, for he was born from a myrrh tree into which his mother had been transformed. Aphrodite loved the child from the moment she first saw him and hid him in a chest, leaving him with Persephone for safekeeping — but the queen of the dead came to love him too and would not give him back, until Zeus decreed that he should pass part of each year in the world above and part below, shared between the goddess of love and the goddess of death. Then, hunting against Aphrodite's pleading, Adonis was gored by a wild boar and bled out in her arms; and from his blood, where it soaked into the ground, she raised the windflower, the anemone, that the spring wind coaxes open and the same wind scatters.",
    beats: [
      { label: "Shared Between Two Worlds", weight: 0.85, figures: ['aphrodite', 'persephone', 'zeus'],
        text: "Aphrodite loved the child and hid him with Persephone for safekeeping — but the queen of the dead came to love him too, until Zeus decreed he should pass part of each year above and part below." },
      { label: "The Boar in the Thicket", weight: 1.0, figures: ['aphrodite'],
        text: "Hunting against Aphrodite's pleading, Adonis was gored by a wild boar and bled out in her arms — the beauty the world could not keep." },
      { label: "The Windflower", weight: 0.75,
        text: "From his blood, where it soaked into the ground, Aphrodite raised the anemone, the windflower that the spring wind coaxes open and the same wind scatters." },
    ],
    source: "Ovid, Metamorphoses X. Further reading: Ted Hughes, Tales from Ovid."
  },
  hermaphroditus: {
    story: "Hermaphroditus is the child of Hermes and Aphrodite, and carries in his very name the union of his parents — a youth of rare beauty who became, in the space of a single afternoon, the first being to hold both man and woman in one body. His story is of two selves fused past any separating, of a desire granted so completely that it erased the boundary it had longed to cross.\n\nWandering far from home, the boy came to a clear pool in Caria where the water-nymph Salmacis dwelt, and stripped to bathe in its still water. The nymph, seized with sudden desire, slipped in after him and wound herself about him as he struggled to break free, and prayed to the gods that the two of them might never, ever be parted. The gods granted it with terrible exactness: the two bodies grew together into one, neither wholly male nor wholly female but both at once. And Hermaphroditus, rising changed from the water, begged in his turn that whoever bathed in that pool thereafter should be softened and half-unmanned as he had been — so that the spring kept its strange power ever after.",
    beats: [
      { label: "Child of Two Gods", weight: 0.7, figures: ['hermes', 'aphrodite'],
        text: "Hermaphroditus is the child of Hermes and Aphrodite — a youth of rare beauty who carries in his very name the union of his parents." },
      { label: "The Pool in Caria", weight: 1.0, figures: ['salmacis'],
        text: "The water-nymph Salmacis slipped into the pool after him and wound herself about him as he struggled, praying to the gods that the two might never be parted — and the gods granted it with terrible exactness, fusing two bodies into one." },
      { label: "The Enchanted Spring", weight: 0.8,
        text: "Rising changed from the water, Hermaphroditus begged that whoever bathed in that pool should be softened as he had been — so the spring kept its strange power ever after." },
    ],
    source: "Ovid, Metamorphoses IV. Further reading: Ted Hughes, Tales from Ovid."
  },
  salmacis: {
    story: "Salmacis is the nymph of a single still pool in Caria — and the one naiad in all the stories who would not hunt. While her sisters ran the woods with Artemis's bow, Salmacis lingered always at her own clear water, combing her hair and gazing at her own reflection, in love with stillness and with herself.\n\nThen the beautiful youth Hermaphroditus came to her pool and stripped to bathe in it, and Salmacis was seized with a desire she could not master. She slipped into the water after him and wound herself about his struggling body, and prayed aloud that the gods would never let the two of them be parted. The gods granted it with terrible exactness: the two bodies grew together into a single being, both man and woman at once and neither wholly either. Salmacis won her wish to be joined to him forever — but lost herself entirely in the winning of it, her name surviving only on the enchanted spring that softens whoever bathes there to this day.",
    beats: [
      { label: "The Nymph Who Would Not Hunt", weight: 0.65, figures: ['artemis'],
        text: "While her sisters ran the woods with Artemis's bow, Salmacis lingered at her own clear water, combing her hair and gazing at her reflection, in love with stillness and with herself." },
      { label: "A Desire Beyond Mastering", weight: 1.0, figures: ['hermaphroditus'],
        text: "When the beautiful Hermaphroditus came to bathe, Salmacis slipped into the water after him and wound herself about his struggling body, praying aloud that the gods would never part them." },
      { label: "Lost in the Winning", weight: 0.85,
        text: "The two bodies grew together into one, both man and woman at once. Salmacis won her wish to be joined forever — but lost herself entirely in the winning of it." },
    ],
    source: "Ovid, Metamorphoses IV. Further reading: Ted Hughes, Tales from Ovid."
  },

  // ---- ADDITIONAL FIGURES (previously shown only as plain descriptions) ----
  hemera: {
    story: "Hemera is the Day — not the sun itself but the soft pervading light of the daytime sky, the brightness that fills the world between one dawn and the next. She is one of the first powers, gentle and constant, the shining counterpart to her mother's dark.\n\nFor Hemera was born of Night. Out of black Nyx and the deep gloom of Erebus came their own bright opposite, the Day, and the two keep an ancient rhythm at the threshold of the world: as Hemera goes out each morning across the sky, her mother Nyx comes home to rest, and as Day returns at evening, Night goes forth again. They share a single house and are never within it at the same moment — the oldest taking of turns there is, light and dark forever passing each other in the doorway of the world.",
    beats: [
      { label: "Light from Darkness", weight: 0.85, figures: ['nyx', 'erebus'],
        text: "Hemera was born of Night. Out of black Nyx and the deep gloom of Erebus came their own bright opposite, the Day — the soft pervading light of the daytime sky." },
      { label: "The Oldest Rhythm", weight: 1.0, figures: ['nyx'],
        text: "As Hemera goes out each morning across the sky her mother Nyx comes home to rest, and as Day returns at evening, Night goes forth again. They share a single house and are never within it at the same moment." },
      { label: "The Passing in the Doorway", weight: 0.6,
        text: "The oldest taking of turns there is, light and dark forever passing each other in the doorway of the world." },
    ],
    source: "Hesiod, Theogony."
  },
  aether: {
    story: "Aether is the bright upper air — not the heavy, breathable air of the mortal world below, but the pure shining substance of the heights, the clear blue medium in which the gods themselves move and breathe. He is the very element of heaven, the luminous space between the clouds and the stars.\n\nLike his sister Hemera the Day, Aether was born of darkness: children both of black Night and deep Erebus, light and clear air alike came out of the primordial gloom. He is the brightness that lies above all the weather, untouched by storm or shadow, the calm radiance the Greeks imagined the immortals dwelt within. To breathe the lower air is to be mortal; Aether is the rarer stuff that the deathless ones breathe instead.",
    beats: [
      { label: "The Upper Brightness", weight: 0.75,
        text: "Aether is the bright upper air — not the heavy, breathable air of the mortal world but the pure shining substance of the heights, the clear blue medium in which the gods themselves move and breathe." },
      { label: "Born of the Deepest Dark", weight: 1.0, figures: ['nyx', 'erebus'],
        text: "Like his sister Hemera, Aether was born of darkness: children both of black Night and deep Erebus, light and clear air alike came out of the primordial gloom." },
      { label: "The Breath of the Gods", weight: 0.6,
        text: "He is the brightness that lies above all the weather, untouched by storm or shadow. To breathe the lower air is to be mortal; Aether is the rarer stuff that the deathless ones breathe instead." },
    ],
    source: "Hesiod, Theogony."
  },
  epimetheus: {
    story: "Epimetheus is the Titan whose name means 'afterthought' — the slower brother of clever Prometheus, the one who acts first and understands only later, when the harm is already done. Where his brother was foresight, Epimetheus is hindsight, forever wise a single moment too late.\n\nIt was Epimetheus who was given the task of furnishing the new-made animals with their gifts, and he spent them all so freely — speed here, claws there, warm fur and wings and armor — that when he came at last to humankind he found he had nothing left to give, and it fell to Prometheus to steal fire to make up the lack. And it was Epimetheus who, against his brother's express warning never to accept a gift from Zeus, took the beautiful Pandora into his house — whereupon she opened her fatal jar and loosed sickness, toil, and sorrow upon the world, leaving only Hope shut inside. Twice his afterthought cost humankind dearly: he is the proof that good intentions, without foresight, can undo a world.",
    beats: [
      { label: "Afterthought", weight: 0.7, figures: ['prometheus'],
        text: "Epimetheus is the Titan whose name means 'afterthought' — the slower brother of clever Prometheus, the one who acts first and understands only later, when the harm is already done." },
      { label: "Nothing Left to Give", weight: 0.85, figures: ['prometheus', 'humanity'],
        text: "He spent all the gifts so freely on the animals — speed, claws, warm fur and wings — that when he came to humankind he had nothing left, and it fell to Prometheus to steal fire to make up the lack." },
      { label: "Pandora at the Door", weight: 1.0, figures: ['zeus'],
        text: "Against his brother's express warning never to accept a gift from Zeus, Epimetheus took the beautiful Pandora into his house — whereupon she opened her fatal jar and loosed sickness, toil, and sorrow upon the world, leaving only Hope shut inside." },
    ],
    source: "Hesiod, Theogony; Works and Days."
  },
  styx: {
    story: "Styx is the great river of the underworld and the most dreadful oath in all creation — a black, cold stream that winds seven times around the realm of the dead, and at the same time a goddess, eldest daughter of Oceanus, whose name binds even the gods.\n\nWhen the Olympians went to war against the Titans, Styx was the very first to come to Zeus's side, bringing her children Victory, Strength, Power, and Zeal to stand with him; and in gratitude Zeus gave her the highest honor he could devise. Ever after, when a god wished to swear an oath that could not be broken, they swore by the waters of Styx — and any immortal who swore falsely by her was struck senseless for a year and banished from the councils of heaven for nine more. So the cold river of the dead became the one thing the deathless gods themselves were bound to fear: the only promise that not even a god dared break.",
    beats: [
      { label: "River and Goddess", weight: 0.75, figures: ['oceanus'],
        text: "Styx is the great river of the underworld and the most dreadful oath in all creation — a black, cold stream that winds seven times around the realm of the dead, and at the same time a goddess, eldest daughter of Oceanus." },
      { label: "First to Stand with Zeus", weight: 1.0, figures: ['zeus'],
        text: "When the Olympians went to war against the Titans, Styx was the very first to come to Zeus's side, bringing her children Victory, Strength, Power, and Zeal to stand with him." },
      { label: "The Unbreakable Oath", weight: 0.9,
        text: "Ever after, when a god swore an oath that could not be broken, they swore by the waters of Styx — and any immortal who swore falsely was struck senseless for a year and banished for nine more. The one promise not even a god dared break." },
    ],
    source: "Hesiod, Theogony."
  },
  leto: {
    story: "Leto is the gentle Titaness of motherhood and modesty, a quiet, dark-veiled goddess whose whole story is the cost and the triumph of bearing the children of Zeus. She asked for little, and was hunted across the world for it.\n\nFor when Leto grew great with Zeus's twins, the jealous Hera forbade any place on the firm earth to give her shelter, and sent a serpent to harry her from land to land as her time came upon her. No country dared receive her — until the barren floating island of Delos, anchored to nothing and so bound by none of Hera's decrees, took pity and let her come ashore. There, clinging to a slender palm tree, Leto laboured nine days and nights and at last brought forth Artemis, who turned at once and helped her mother deliver her brother Apollo. From the wanderer whom the whole earth refused came the goddess of the moon and the god of the sun; and Delos, her one refuge, was fixed forever in the sea and made holy.",
    beats: [
      { label: "Hunted Across the World", weight: 0.85, figures: ['hera', 'zeus'],
        text: "When Leto grew great with Zeus's twins, the jealous Hera forbade any place on the firm earth to give her shelter, and sent a serpent to harry her from land to land as her time came upon her." },
      { label: "The Barren Island", weight: 1.0,
        text: "No country dared receive her — until the barren floating island of Delos, anchored to nothing and so bound by none of Hera's decrees, took pity and let her come ashore." },
      { label: "Moon and Sun Born", weight: 0.9, figures: ['artemis', 'apollo'],
        text: "Clinging to a slender palm tree, Leto laboured nine days and nights and brought forth Artemis, who turned at once and helped her mother deliver her brother Apollo. From the wanderer the whole earth refused came the goddess of the moon and the god of the sun." },
    ],
    source: "Homeric Hymn to Apollo; Hesiod, Theogony."
  },
  maia: {
    story: "Maia is the eldest and shyest of the seven Pleiades, the daughters of Atlas set among the stars — a quiet mountain nymph who shunned the company of the gods and kept to a deep cave on Mount Cyllene, asking nothing of heaven.\n\nBut Zeus found her there in the dark of the night, while Hera slept, and from their secret union Maia bore a single extraordinary child: Hermes, who would climb out of his cradle on the very day of his birth to invent the lyre and steal Apollo's cattle before nightfall. The retiring nymph who wanted only her solitude became the mother of the cleverest of all the gods. Out of the most private of lives came the most restless and far-travelling of the Olympians — as if the quiet of her cave had been storing up all that motion for the world.",
    beats: [
      { label: "The Shy Pleiad", weight: 0.65, figures: ['atlas'],
        text: "Maia is the eldest and shyest of the seven Pleiades, daughters of Atlas — a quiet mountain nymph who shunned the company of the gods and kept to a deep cave on Mount Cyllene." },
      { label: "A Secret Union", weight: 0.8, figures: ['zeus'],
        text: "Zeus found her there in the dark of the night, while Hera slept, and from their secret union Maia bore a single extraordinary child." },
      { label: "Mother of the Trickster", weight: 1.0, figures: ['hermes'],
        text: "Hermes climbed out of his cradle on the very day of his birth to invent the lyre and steal Apollo's cattle before nightfall. The retiring nymph who wanted only solitude became the mother of the cleverest of all the gods." },
    ],
    source: "Homeric Hymn to Hermes; Hesiod, Theogony."
  },
  callirrhoe: {
    story: "Callirrhoe — her name means 'beautiful flowing' — is an Oceanid, one of the three thousand daughters of Oceanus and Tethys, a nymph of fresh and lovely running water. Her own myth is almost nothing but her lineage; she is one of those quiet figures whose meaning lies entirely in what flows out of her.\n\nFor the clear sweet water is also, in the old logic of the myths, the spring that can feed monstrous roots. Callirrhoe joined with Chrysaor, the golden warrior born from Medusa's severed neck, and bore him the three-bodied giant Geryon, whom Heracles would one day cross the whole world to kill. So from the most nourishing of elements came one of the great monsters of the west — beauty flowing, as it sometimes does in these stories, straight on into terror.",
    beats: [
      { label: "Beautiful Flowing", weight: 0.6, figures: ['oceanus', 'tethys'],
        text: "Callirrhoe — her name means 'beautiful flowing' — is an Oceanid, one of the three thousand daughters of Oceanus and Tethys, a nymph of fresh and lovely running water." },
      { label: "The Golden Warrior's Bride", weight: 0.85, figures: ['chrysaor', 'medusa'],
        text: "Callirrhoe joined with Chrysaor, the golden warrior born from Medusa's severed neck, and bore him the three-bodied giant Geryon." },
      { label: "Sweetness into Terror", weight: 1.0, figures: ['geryon', 'heracles'],
        text: "From the most nourishing of elements came one of the great monsters of the west — Geryon, whom Heracles would cross the whole world to kill. Beauty flowing, as it sometimes does in these stories, straight on into terror." },
    ],
    source: "Hesiod, Theogony."
  },
  glaucus: {
    story: "Glaucus began as a mortal fisherman and became a god almost by accident — one of the few to cross from the human world into the divine not through birth or punishment but through simple curiosity. He is the green-bearded merman of the open sea, a minor prophet of the waves with a sorrow at the heart of him.\n\nOne day, laying his catch on a strange meadow by the shore, he saw the dead fish twitch and leap back into the water at the touch of a certain herb; and when he tasted the plant himself a longing seized him, and he plunged into the sea, his legs fusing into a fish's tail, and rose again immortal. But his new godhood brought him no joy, for he fell hopelessly in love with the nymph Scylla, who fled him in horror; and when he begged the sorceress Circe for a love-charm, she desired him herself, and in her jealousy poisoned Scylla into a monster. So the fisherman who gained eternity gained an eternal grief with it — to have been, however unwillingly, the ruin of the very thing he loved.",
    beats: [
      { label: "The Strange Herb", weight: 0.8,
        text: "One day, laying his catch on a strange meadow, Glaucus saw the dead fish twitch and leap back into the water at the touch of a certain herb; and when he tasted it himself, a longing seized him and he plunged into the sea, his legs fusing into a fish's tail." },
      { label: "The Hopeless Suit", weight: 0.7, figures: ['scylla', 'circe'],
        text: "His new godhood brought him no joy, for he fell hopelessly in love with the nymph Scylla, who fled him in horror; and when he begged the sorceress Circe for a love-charm, she desired him herself." },
      { label: "The Ruin He Caused", weight: 1.0, figures: ['circe', 'scylla'],
        text: "In her jealousy Circe poisoned Scylla into a monster. So the fisherman who gained eternity gained an eternal grief with it — to have been, however unwillingly, the ruin of the very thing he loved." },
    ],
    source: "Ovid, Metamorphoses XIII–XIV. Further reading: Ted Hughes, Tales from Ovid."
  },
  stheno: {
    story: "Stheno is the eldest of the three Gorgon sisters and, the old tales say, the most murderous of them all — credited with slaying more men than both her sisters together. Where Medusa is remembered with a kind of pity, Stheno is remembered only with dread: winged, serpent-haired, and deathless.\n\nA daughter of the ancient sea-gods Phorcys and Ceto, she shares Medusa's snakes and stone-turning glare but not her mortality, and so could never be slain. When Perseus came and struck the head from her sleeping sister, Stheno woke with Euryale and rose shrieking into the air after him — but the hero was already vanishing on his winged sandals beyond their reach. Robbed of her vengeance, she remained at the world's edge, immortal and furious and grieving: the terror that outlived the one story everyone remembers, and was left with nothing to do but mourn.",
    beats: [
      { label: "The Most Murderous", weight: 0.75, figures: ['phorcys', 'ceto'],
        text: "Stheno is the eldest of the three Gorgon sisters and the most murderous — a daughter of Phorcys and Ceto, credited with slaying more men than both her sisters together. Winged, serpent-haired, and deathless." },
      { label: "The Shriek of the Immortal", weight: 1.0, figures: ['medusa', 'perseus'],
        text: "When Perseus struck the head from her sleeping sister, Stheno woke with Euryale and rose shrieking into the air after him — but the hero was already vanishing on his winged sandals beyond their reach." },
      { label: "Left to Mourn", weight: 0.7, figures: ['euryale'],
        text: "Robbed of her vengeance, she remained at the world's edge, immortal and furious and grieving: the terror that outlived the one story everyone remembers, left with nothing to do but mourn." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  euryale: {
    story: "Euryale is the second of the three Gorgon sisters, the 'wide-roaming' one — immortal like Stheno and terrible like all her kind, winged and snake-haired, with a glare that turns the living to stone. But she is remembered most for a single, almost human thing: the sound of her grief.\n\nA daughter of Phorcys and Ceto, she could not be killed, and when Perseus beheaded their mortal sister Medusa, it was Euryale's cry that filled the world — a bellow of mourning so vast and so anguished that the poets said it gave music its first lament, the mournful double-piped tune invented in imitation of her wail. She roamed the wide earth after her sister's killer and never caught him; and so the immortal monster became, strangely, the first voice of sorrow, the deathless sister left to howl forever for the one who could die.",
    beats: [
      { label: "The Wide-Roaming One", weight: 0.7, figures: ['phorcys', 'ceto'],
        text: "Euryale is the second of the three Gorgon sisters, the 'wide-roaming' one — a daughter of Phorcys and Ceto, immortal and terrible, winged and snake-haired, with a glare that turns the living to stone." },
      { label: "The First Lament", weight: 1.0, figures: ['medusa', 'perseus'],
        text: "When Perseus beheaded their mortal sister Medusa, it was Euryale's cry that filled the world — a bellow of mourning so vast that the poets said it gave music its first lament, the mournful double-piped tune invented in imitation of her wail." },
      { label: "The Deathless Sister", weight: 0.8, figures: ['stheno'],
        text: "She roamed the wide earth after her sister's killer and never caught him — the immortal monster who became, strangely, the first voice of sorrow, the deathless sister left to howl forever for the one who could die." },
    ],
    source: "Hesiod, Theogony; Pindar, Pythian 12."
  },
  polyphemus: {
    story: "Polyphemus is the most famous of the Cyclopes — a one-eyed giant, a son of Poseidon, who herds his fat sheep in a cave on a wild island and answers to no law but his own enormous appetite. He is brute force without hospitality, the savage who devours his own guests.\n\nWhen Odysseus and his men sheltered in his cave, Polyphemus rolled a great stone across the mouth and began to eat them two at a time. But the cunning hero gave the giant strong wine until he slept, told him his name was 'Nobody,' and then drove a burning, sharpened stake into the single eye. Blinded, the Cyclops roared for help — but when his neighbours called to ask who was harming him, he could only bellow that 'Nobody' was killing him, and they left him to it. Odysseus and his survivors escaped clinging beneath the bellies of the sheep; yet the hero could not resist shouting back his true name as he sailed, and so Polyphemus prayed to his father Poseidon for vengeance, and bought Odysseus ten more years of wandering with a single proud boast.",
    beats: [
      { label: "The One-Eyed Shepherd", weight: 0.7, figures: ['poseidon'],
        text: "Polyphemus is the most famous of the Cyclopes — a one-eyed giant, a son of Poseidon, who herds his fat sheep in a cave on a wild island and answers to no law but his own enormous appetite." },
      { label: "Nobody Is Killing Me", weight: 1.0, figures: ['odysseus'],
        text: "Odysseus gave the giant strong wine until he slept, told him his name was 'Nobody,' then drove a burning stake into the single eye. When Polyphemus roared for help his neighbours heard only that 'Nobody' was killing him, and left him to it." },
      { label: "The Proud Boast", weight: 0.85, figures: ['odysseus', 'poseidon'],
        text: "Odysseus could not resist shouting back his true name as he sailed, and so Polyphemus prayed to his father Poseidon for vengeance — buying the hero ten more years of wandering with a single proud boast." },
    ],
    source: "Homer, Odyssey IX."
  },
  hydra: {
    story: "The Hydra of Lerna is the deathless terror of the marsh — a water-serpent of many heads that rises from the bog with venom in its breath, and whose dreadful secret is that it cannot simply be cut down: strike off one head and two grow at once from the wound, so that every blow only makes it stronger.\n\nBred by Typhon and Echidna and raised, the poets say, by Hera herself to be a snare for Heracles, the Hydra was the hero's second labor. He learned the hard way that the sword alone could never win, and called his nephew Iolaus to his side; together they made a method of it, Heracles lopping each head while Iolaus seared the raw stump with a torch before it could double. The one immortal head, which no fire could kill, he buried still hissing beneath a boulder — and dipped his arrows in the monster's black gall, carrying away a poison that would serve him through a lifetime of labors and, at the very last, bring about his own death.",
    beats: [
      { label: "Two for Every One", weight: 0.85, figures: ['typhon', 'echidna'],
        text: "Bred by Typhon and Echidna, the Hydra of Lerna was a water-serpent of many heads whose dreadful secret was that it could not simply be cut down: strike off one head and two grew at once from the wound." },
      { label: "The Method", weight: 1.0, figures: ['heracles'],
        text: "Heracles learned the hard way, watching heads double under his blade — until his nephew Iolaus caught up a torch, and the two worked as one: severing each neck and searing the raw stump with fire before it could sprout anew." },
      { label: "The Poison That Returns", weight: 0.75,
        text: "The one immortal head he buried still hissing beneath a boulder; and in the Hydra's gall he dipped his arrows, making a poison so deadly it would one day become the death of Heracles himself." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  oedipus: {
    story: "Oedipus is the hero who answered the riddle and could not escape his own — the king of Thebes whose cleverness saved a city and whose fate destroyed him, the man who saw the truth of everyone but himself until it was far too late. His name, \'swollen-foot,\' is the scar of the prophecy he was born under.\n\nFor it was foretold at Delphi before his birth that the son of Laius and Jocasta would kill his father and marry his mother. To cheat the oracle, the infant was given to a shepherd with orders to leave him on the stony flank of Mount Cithaeron, his ankles pinned together with a bronze spike. But the shepherd could not do it; he passed the child on, hand to hand, until a herdsman carried the wailing boy across the mountains to Corinth, where King Polybus and Queen Merope raised him as their own.\n\nOedipus grew up a prince, quick and proud, knowing nothing of his true blood — until a taunt at a feast sent him to the oracle at Delphi to ask who he really was. Apollo gave no answer to that question; instead the god pronounced the same dreadful fate: you will kill your father and lie with your mother. Horrified, believing Polybus and Merope to be his parents, Oedipus turned his back on Corinth forever — and in doing so set his feet on the very road the prophecy required.\n\nAt a narrow crossroads where three ways met, he quarreled with an old man in a chariot over the right of way, and in a flash of anger struck him dead — never knowing the stranger was Laius, king of Thebes and his true father. He walked on and came to Thebes, where the Sphinx crouched on her rock outside the gates and strangled every traveler who could not answer her riddle. Oedipus answered it — \'Man\' — and the Sphinx hurled herself from the cliff. The grateful city gave him the crown and the hand of the widowed queen Jocasta, and for many years he ruled well and justly, a beloved king with sons and daughters, never suspecting that his wife was his mother and his children were his siblings.\n\nBut plague came to Thebes, and the oracle declared it would not lift until the murderer of Laius was found and driven out. Oedipus, the great solver of riddles, tore the truth loose thread by thread — and when the last thread gave way, the whole fabric of his life collapsed. Jocasta hanged herself behind closed doors. Oedipus took the golden pins from her brooches and drove them into his own eyes, again and again, choosing blindness over a single moment more of seeing what he had done. Blinded and exiled, led by his daughter Antigone, he wandered for years until he came at last to the sacred grove of Colonus, near Athens, where the earth opened gently beneath him and took him in — the man whom fate had used most cruelly, granted at the end a passing more like grace than punishment.",
    beats: [
      { label: "The Dread Prophecy", weight: 0.7,
        text: "It was foretold at Delphi that the son of Laius and Jocasta would kill his father and marry his mother. To cheat the oracle, the infant was given to a shepherd with orders to leave him on Mount Cithaeron, his ankles pinned with a bronze spike." },
      { label: "The Rescued Child", weight: 0.6,
        text: "But the shepherd could not do it. Hand to hand the child was passed until a herdsman carried the wailing boy to Corinth, where King Polybus and Queen Merope raised him as their own, knowing nothing of his blood." },
      { label: "The Road from Corinth", weight: 0.7,
        text: "A taunt at a feast sent him to Delphi, where Apollo pronounced the same dreadful fate. Believing Polybus and Merope his parents, Oedipus turned his back on Corinth forever — and in doing so set his feet on the very road the prophecy required." },
      { label: "The Crossroads", weight: 0.85,
        text: "At a narrow place where three ways met, he quarreled with an old man in a chariot over the right of way, and in a flash of anger struck him dead — never knowing the stranger was Laius, his true father." },
      { label: "The Sphinx\'s Riddle", weight: 0.9, figures: ['sphinx'],
        text: "The Sphinx crouched outside Thebes strangling every traveler who failed her riddle. Oedipus answered it — \'Man\' — and the Sphinx hurled herself from the cliff. The grateful city gave him the crown and the hand of the widowed queen." },
      { label: "The Truth Unraveled", weight: 1.0,
        text: "Plague came to Thebes, and the oracle declared the murderer of Laius must be found. Oedipus, the great solver of riddles, tore the truth loose thread by thread — and when the last thread gave way, the whole fabric of his life collapsed." },
      { label: "Blindness and Colonus", weight: 0.85,
        text: "Jocasta hanged herself. Oedipus drove golden pins into his own eyes, choosing blindness over sight. Exiled, led by his daughter Antigone, he wandered until the grove of Colonus opened gently beneath him — a passing more like grace than punishment." },
    ],
    source: "Sophocles, Oedipus Rex; Sophocles, Oedipus at Colonus; Apollodorus, Library."
  },
  alcmene: {
    story: "Alcmene is the mortal mother of the greatest of heroes — a princess of such beauty and wisdom that the poets said no woman of her age surpassed her, and so virtuous that even Zeus had to come to her in disguise. She is the human vessel of a more-than-human son.\n\nFor Zeus desired her, but Alcmene was faithful and would yield only to her own husband Amphitryon; so the god took on Amphitryon's exact shape while the true husband was away at war, and came to her bed, and that night she conceived. Of that union Heracles was born — and with him, the same night, a mortal half-brother by her real husband. But the child of Zeus drew down upon his mother the undying jealousy of Hera, and much of Alcmene's life was spent in fear and flight, shielding the boy from the goddess's wrath. She gave the world its mightiest hero, and paid for it with a lifetime of looking over her shoulder.",
    beats: [
      { label: "The Faithful Wife", weight: 0.7, figures: ['zeus'],
        text: "Alcmene was so virtuous that even Zeus had to come to her in disguise — taking on her husband Amphitryon's exact shape while the true man was away at war." },
      { label: "Mother of the Mightiest", weight: 1.0, figures: ['heracles'],
        text: "Of that union Heracles was born — the mightiest of all heroes, the child of Zeus and a mortal woman whose beauty and wisdom none in her age surpassed." },
      { label: "Hera's Shadow", weight: 0.8, figures: ['hera'],
        text: "The child of Zeus drew down upon his mother the undying jealousy of Hera, and much of Alcmene's life was spent in fear and flight, shielding the boy from the goddess's wrath." },
    ],
    source: "Hesiod, Shield of Heracles; Apollodorus, Library."
  },
  danae: {
    story: "Danaë is the bronze-towered princess and the mother of Perseus — a woman shut away from the world to thwart a prophecy, who became the very channel through which that prophecy worked itself out. Her story is one of imprisonment turned, against all a fearful father's care, into destiny.\n\nFor an oracle had warned King Acrisius of Argos that his daughter's son would one day kill him, and so he locked Danaë in a chamber of bronze where no man could reach her. But no wall keeps out a god: Zeus came to her as a shower of golden rain that poured down through the roof into her lap, and she conceived and bore Perseus. Enraged and still afraid, Acrisius sealed mother and infant in a wooden chest and cast them into the sea — yet they did not drown, but washed safe to a far island, where Perseus grew into the hero who would slay Medusa. And the prophecy came true in the end, gently and by accident, long years later: so the locked tower and the floating chest only carried fate the longer way around to the same door.",
    beats: [
      { label: "The Bronze Tower", weight: 0.85, figures: ['zeus'],
        text: "An oracle warned that her son would kill his grandfather, so King Acrisius locked Danae in a chamber of bronze — but Zeus came to her as a shower of golden rain, and she conceived Perseus." },
      { label: "Cast upon the Sea", weight: 1.0, figures: ['perseus'],
        text: "Acrisius sealed mother and infant in a wooden chest and cast them into the sea — yet they washed safe to a far island, where Perseus grew into the hero who would slay Medusa." },
      { label: "Fate the Longer Way Around", weight: 0.7,
        text: "The prophecy came true in the end, gently and by accident, long years later — the locked tower and the floating chest only carried fate the longer way around to the same door." },
    ],
    source: "Apollodorus, Library; Ovid, Metamorphoses IV."
  },
  andromeda: {
    story: "Andromeda is the princess chained to the rock — the Ethiopian king's daughter offered up to a sea-monster, and saved at the last instant by a passing hero, whose rescue became one of the great love-stories and one of the great constellations of the sky.\n\nHer peril was not of her own making. Her mother, Queen Cassiopeia, boasted that Andromeda was lovelier than the sea-nymphs, and the offended Nereids sent the monster Cetus to ravage the coast; the only way to appease it, the oracle said, was to chain the princess to a seaside cliff as its prey. There she hung, waiting to be devoured — until Perseus, flying home with the head of Medusa, saw her, fell in love at the sight, and turned the rising monster to stone. He freed her and married her, and at the end of their lives the gods set Andromeda among the stars beside her husband and her parents: the chained maiden raised forever into the night.",
    beats: [
      { label: "Chained to the Rock", weight: 0.85,
        text: "Her mother boasted that Andromeda was lovelier than the sea-nymphs, and the offended Nereids sent a monster to ravage the coast; the only appeasement was to chain the princess to a cliff as prey." },
      { label: "The Hero from the Sky", weight: 1.0, figures: ['perseus', 'medusa'],
        text: "Perseus, flying home with the head of Medusa, saw her chained and fell in love at the sight; he turned the rising monster to stone, freed her, and married her." },
      { label: "Raised into the Stars", weight: 0.7,
        text: "At the end of their lives the gods set Andromeda among the stars beside her husband and her parents: the chained maiden raised forever into the night." },
    ],
    source: "Ovid, Metamorphoses IV; Apollodorus, Library."
  },
  humanity: {
    story: "Humanity is the strangest creature in the whole of the Theogony — the only beings who age and sicken and know that they must die, who feel the cold and the dark closing in, and who nonetheless raise cities, sing songs, and shape gods in their own image. The entire divine drama circles, in the end, the question of what to do with them.\n\nThey were made, the stories say, from clay and water by the Titan Prometheus, who loved them, and given the stolen fire of heaven that set them apart from the beasts — the spark of craft and warmth and ruinous ambition all at once. For that gift Prometheus suffered, and through Pandora's opened jar came every sorrow that mortal flesh is heir to, with only Hope left shut inside. Fragile, doomed, and unaccountably defiant, humankind is the audience and the prize of every myth: the short-lived clay that learned to look up at the stars and give them names.",
    beats: [
      { label: "Shaped from Clay", weight: 0.85, figures: ['prometheus'],
        text: "They were made from clay and water by the Titan Prometheus, who loved them, and given the stolen fire of heaven — the spark of craft and warmth and ruinous ambition all at once." },
      { label: "Pandora's Jar", weight: 1.0, figures: ['epimetheus'],
        text: "For that gift Prometheus suffered, and through Pandora's opened jar came every sorrow that mortal flesh is heir to, with only Hope left shut inside." },
      { label: "The Short-Lived Clay", weight: 0.7,
        text: "Fragile, doomed, and unaccountably defiant, humankind is the audience and the prize of every myth: the short-lived clay that learned to look up at the stars and give them names." },
    ],
    source: "Hesiod, Works and Days; Theogony."
  },
  daedalus: {
    story: "Daedalus is the master craftsman of myth — the inventor, architect, and maker whose cleverness could build anything the mind could imagine, and whose story is a long warning about the things a brilliant maker should perhaps refuse to build. He is genius without the wisdom to govern it.\n\nIt was Daedalus who built the Labyrinth to hold the Minotaur, and Daedalus who had earlier made the very device by which the monster was conceived; and when King Minos imprisoned him to keep his secrets, the craftsman simply invented escape, fashioning wings of feathers and wax for himself and his son Icarus. But genius cannot always protect what it loves: Icarus, exulting in flight, soared too near the sun against his father's warning, and the wax melted, and the boy fell into the sea while Daedalus flew helplessly on. Long before, in envy, he had murdered his own gifted nephew for surpassing him. The maker of wonders carried to his grave the knowledge that his cleverness had cost him both a rival and a son.",
    beats: [
      { label: "Builder of the Labyrinth", weight: 0.85, figures: ['minotaur'],
        text: "It was Daedalus who built the Labyrinth to hold the Minotaur, and who had earlier made the very device by which the monster was conceived — genius without the wisdom to govern it." },
      { label: "Wings of Wax", weight: 1.0, figures: ['icarus'],
        text: "Imprisoned on Crete, the craftsman fashioned wings of feathers and wax for himself and his son Icarus. But the boy soared too near the sun, the wax melted, and Icarus fell into the sea while Daedalus flew helplessly on." },
      { label: "The Murdered Nephew", weight: 0.8, figures: ['perdix'],
        text: "Long before, in envy, he had murdered his own gifted nephew Perdix for surpassing him. The maker of wonders carried to his grave the knowledge that his cleverness had cost him both a rival and a son." },
    ],
    source: "Ovid, Metamorphoses VIII; Apollodorus, Library."
  },
  icarus: {
    story: "Icarus is the boy who flew too high — the son of the great craftsman Daedalus, whose name has become the very word for a bright ambition that climbs past its limit and falls. His whole story lasts only a single morning, and ends in the sea.\n\nImprisoned with his father on Crete, Icarus was given wings of feathers and wax that Daedalus had made for their escape, with a single careful warning: fly the middle way, neither so low that the sea-spray clogs the feathers nor so high that the sun melts the wax. But once aloft, drunk on the sheer joy of flight, the boy forgot the warning and rose higher and higher toward the sun — until the wax softened, the feathers loosed one by one, and he fell out of the bright sky into the water that bears his name to this day. His father flew on alone. Icarus is the eternal image of youth and rapture and ruin: the fall that came not from failure, but from flying.",
    beats: [
      { label: "The Father's Warning", weight: 0.75, figures: ['daedalus'],
        text: "Imprisoned on Crete, Icarus was given wings of feathers and wax by his father Daedalus, with a single warning: fly the middle way, neither so low the spray clogs the feathers nor so high the sun melts the wax." },
      { label: "Drunk on Flight", weight: 1.0,
        text: "Once aloft, drunk on the sheer joy of flight, the boy forgot the warning and rose higher and higher toward the sun — until the wax softened, the feathers loosed, and he fell from the bright sky." },
      { label: "The Sea That Bears His Name", weight: 0.8, figures: ['daedalus'],
        text: "He fell into the water that bears his name to this day, and his father flew on alone. Icarus is the eternal image of youth and rapture and ruin: the fall that came not from failure, but from flying." },
    ],
    source: "Ovid, Metamorphoses VIII; Apollodorus, Library."
  },
  perdix: {
    story: "Perdix is the gifted nephew of Daedalus — a boy whose brilliance rivalled and then outshone his master's, and who paid for it with his life, only to be saved at the last instant in the shape of a low and wary bird. His brief story is the dark root of his uncle's later sorrows.\n\nApprenticed to Daedalus, young Perdix had a genius of his own: studying the spine of a fish, he invented the saw; he devised the compass for drawing perfect circles. But his uncle, consumed with envy that the pupil should surpass the teacher, lured the boy to the height of the Acropolis and threw him down. The goddess Athena, who loves all skill, caught him as he fell and changed him into a partridge — and to this day the partridge flies low and nests in the hedgerows, never building high or trusting the heights, as though the bird still remembers the long fall and will never again be coaxed to climb.",
    beats: [
      { label: "The Gifted Apprentice", weight: 0.75, figures: ['daedalus'],
        text: "Apprenticed to Daedalus, young Perdix had a genius of his own: studying the spine of a fish, he invented the saw; he devised the compass for drawing perfect circles." },
      { label: "Thrown from the Heights", weight: 1.0, figures: ['daedalus'],
        text: "His uncle, consumed with envy that the pupil should surpass the teacher, lured the boy to the height of the Acropolis and threw him down." },
      { label: "The Low-Flying Bird", weight: 0.85, figures: ['athena'],
        text: "Athena caught him as he fell and changed him into a partridge — and to this day the partridge flies low and nests in hedgerows, as though the bird still remembers the fall and will never again trust the heights." },
    ],
    source: "Ovid, Metamorphoses VIII; Apollodorus, Library."
  }
};

