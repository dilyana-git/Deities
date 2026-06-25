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
    story: "Before name, before number, before the first edge of anything stood against anything else — there was Chaos: not ruin and not riot, but a vast and yawning openness, the original gap in which nothing yet leaned upon nothing. It is less a god than a held breath, the dark unmeasured mouth out of which all distance would one day be drawn.\n\nThe Greeks did not imagine Chaos as destruction. The word means simply 'gaping' — a split, a chasm, a space where something could happen but nothing yet had. It is the silence before the first note, the blank page before the first word. Even Ovid, centuries later, called it a rude and undivided mass where cold fought hot and wet fought dry and nothing held its shape.\n\nFrom that emptiness, with no mother and no mate, the first powers simply happened — broad-breasted Gaia the Earth, dim Tartarus in the pit below, and Eros who would teach the world to reach for itself. Later, from the same gulf, came Erebus the primordial dark and Nyx the Night, siblings born of nothing into nothing, who would between them people the world with shadows and dreams and the quiet offices of death.\n\nChaos shaped nothing and ruled nothing; it only opened, and having opened, let everything else begin to fall into its place. The later poets would shrink it to mere disorder, but Hesiod knew better — Chaos is the condition that makes all order possible, the space without which no thing could stand apart from any other thing.",
    beats: [
      { label: "The Yawning Openness", weight: 1,
        text: "Before name, before number, before the first edge of anything stood against anything else — there was Chaos: not ruin and not riot, but a vast and yawning openness, the original gap in which nothing yet leaned upon nothing." },
      { label: "A Held Breath", weight: 0.75,
        text: "It is less a god than a held breath, the dark unmeasured mouth out of which all distance would one day be drawn." },
      { label: "The Silence Before the Note", weight: 0.65,
        text: "The Greeks did not imagine Chaos as destruction. The word means simply \'gaping\' — the silence before the first note, the blank page before the first word. Even Ovid called it a rude and undivided mass where cold fought hot and wet fought dry and nothing held its shape." },
      { label: "The First Powers", weight: 0.9, figures: ['gaia', 'tartarus', 'eros'],
        text: "From that emptiness, with no mother and no mate, the first powers simply happened — broad-breasted Gaia the Earth, dim Tartarus in the pit below, and Eros who would teach the world to reach for itself." },
      { label: "Siblings of Nothing", weight: 0.8, figures: ['erebus', 'nyx'],
        text: "Later, from the same gulf, came Erebus the primordial dark and Nyx the Night, siblings born of nothing into nothing, who would between them people the world with shadows and dreams and the quiet offices of death." },
      { label: "The Opening", weight: 0.6,
        text: "Chaos shaped nothing and ruled nothing; it only opened, and having opened, let everything else begin to fall into its place. It is the condition that makes all order possible, the space without which no thing could stand apart from any other thing." },
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
    story: "Uranus is the Sky — the great star-sown dome that Gaia bore out of herself so that she would never lie uncovered, and who then stretched upon her as her mate, pressing close over the whole width of the world. He was the first king of all things, and the first to learn that a throne, once made, can be taken.\n\nHe lay with Gaia and fathered the twelve Titans, the three one-eyed Cyclopes whose hammers would one day forge the thunderbolt, and the Hundred-Handed whose fifty heads could watch every direction at once. But he hated the children she gave him and would not suffer them to be born, stuffing each one back into the dark of her body until the Earth herself ached with the weight of them. The Cyclopes and the Hundred-Handed he thrust deepest, into the pit of Tartarus beneath the world's floor, where no light could reach them.\n\nSo Gaia forged a jagged sickle of grey adamantine, and her youngest, Cronus, lay in ambush in the folds of the coming night; when Uranus descended upon her once more, the son reached up and unmanned his father, and flung the severed flesh into the sea. Where the foam gathered, Aphrodite rose; where the blood fell upon the Earth, the Furies were born — and the ash-tree nymphs, the Meliae, sprang from the same dark rain. Sky recoiled from Earth and never came down again — and the gap between them, the open air, is the world we live in.\n\nBut as the knife fell, the old Sky spoke a curse: that Cronus in his turn would be overthrown by his own son, and that the sickle-bearer would learn the taste of the same betrayal he had dealt. It was the first prophecy in the world, and like all the prophecies that followed it, it came true.",
    beats: [
      { label: "The Star-Sown Dome", weight: 0.85, figures: ['gaia'],
        text: "Uranus is the Sky — the great star-sown dome that Gaia bore out of herself so that she would never lie uncovered, and who then stretched upon her as her mate. He was the first king of all things, and the first to learn that a throne, once made, can be taken." },
      { label: "Children Cast into Darkness", weight: 0.75,
        text: "He fathered the twelve Titans, the one-eyed Cyclopes, and the Hundred-Handed — but he hated them all. The Cyclopes and the Hundred-Handed he thrust deepest, into the pit of Tartarus beneath the world's floor, where no light could reach them." },
      { label: "Children Denied", weight: 0.8,
        text: "He would not suffer them to be born, stuffing each one back into the dark of Gaia's body until the Earth herself ached with the weight of them." },
      { label: "The Sickle in the Dark", weight: 1, figures: ['cronus', 'gaia'],
        text: "Gaia forged a jagged sickle, and her youngest, Cronus, lay in ambush in the folds of the coming night; when Uranus descended upon her once more, the son reached up and unmanned his father, and flung the severed flesh into the sea." },
      { label: "Beauty from Violence", weight: 0.7, figures: ['aphrodite', 'erinyes'],
        text: "Where the foam gathered, Aphrodite rose; where the blood fell upon the Earth, the Furies were born, and the ash-tree nymphs sprang from the same dark rain. Sky recoiled from Earth and never came down again." },
      { label: "The First Prophecy", weight: 0.65, figures: ['cronus'],
        text: "As the knife fell, the old Sky spoke a curse: that Cronus in his turn would be overthrown by his own son, and that the sickle-bearer would learn the taste of the same betrayal he had dealt. It was the first prophecy in the world, and it came true." },
    ],
    source: "Hesiod, Theogony."
  },
  nyx: {
    story: "Nyx is Night itself, one of the eldest powers to come unbidden out of Chaos, and among the few beings before whom Zeus himself lowers his eyes. Even the king of Olympus, Homer says, once drew back from a quarrel when he learned Nyx stood behind the other side — for there are things older than thunder, and the dark is one of them.\n\nShe keeps her house at the very rim of the world, where Day and Dark cross on the threshold at dusk and dawn and never once sit down together. When Hemera goes out, Nyx comes in; when Nyx returns, Hemera departs. The two share the same bronze threshold but never stand upon it at the same time — mother and daughter greeting each other only in passing, forever.\n\nFrom her own darkness, needing no father, she gave birth to the whole solemn company that rules the ends of mortal life — Sleep and his iron brother Death, the swarming tribe of Dreams, the three Fates with their thread, and blame and aching Misery and Doom. She bore Nemesis who corrects the proud, and Eris who sows discord, and old Age who bends the strongest back.\n\nYet the same womb that loosed these shadows also bore shining Day and the bright upper Air. The mother of every terror is also the mother of the morning; there is nothing the night gives us that it did not first carry in the dark. She wraps the world each evening not to punish it but to let it rest, and in that rest, to dream.",
    beats: [
      { label: "The Eldest Dark", weight: 0.9, figures: ['chaos'],
        text: "Nyx is Night itself, one of the eldest powers to come unbidden out of Chaos, and among the few beings before whom Zeus himself lowers his eyes." },
      { label: "Even Zeus Drew Back", weight: 0.8, figures: ['zeus'],
        text: "Even the king of Olympus, Homer says, once drew back from a quarrel when he learned Nyx stood behind the other side — for there are things older than thunder, and the dark is one of them." },
      { label: "The Threshold House", weight: 0.6,
        text: "She keeps her house at the very rim of the world, where Day and Dark cross on the threshold at dusk and dawn. When Hemera goes out, Nyx comes in — mother and daughter greeting each other only in passing, forever." },
      { label: "Mother of Shadows", weight: 1, figures: ['hypnos', 'thanatos', 'moirai'],
        text: "From her own darkness, needing no father, she gave birth to the whole solemn company that rules the ends of mortal life — Sleep and his iron brother Death, the swarming tribe of Dreams, the three Fates with their thread, and blame and aching Misery and Doom." },
      { label: "Nemesis and Eris", weight: 0.7, figures: ['nemesis', 'eris'],
        text: "She bore Nemesis who corrects the proud, and Eris who sows discord, and old Age who bends the strongest back. The darker offices of the world are all her children." },
      { label: "Mother of Morning", weight: 0.75, figures: ['hemera', 'aether'],
        text: "Yet the same womb that loosed these shadows also bore shining Day and the bright upper Air. The mother of every terror is also the mother of the morning. She wraps the world each evening not to punish it but to let it rest, and in that rest, to dream." },
    ],
    source: "Hesiod, Theogony."
  },
  erebus: {
    story: "Erebus is the primordial dark — not the night sky overhead but the deeper gloom beneath the world, the shadow that pools in the hollow places of the earth and lines the long road the dead must walk on their way down. He is among the first powers to emerge from Chaos, older than any god with a face or a name.\n\nHis darkness is not empty but full — the kind of dark you find in deep caves, in the space behind closed eyes, in the passage between one world and the next. The dead walk through Erebus on their way to the underworld, and his gloom is the last thing they see before they forget. Charon\'s ferry crosses waters stained with his shadow, and the gates of Hades stand wrapped in it.\n\nYet darkness, in the oldest stories, is fertile. Erebus lay with his sister Nyx, the Night, and from that mingling of two shadows came their own bright opposites: Hemera the Day and Aether the shining upper air. So the deepest dark fathered the clearest light — as though the world could only arrive at its morning by first passing through the gloom that came before it. He remains where he has always been: beneath, behind, between — the shadow that gives every lit thing its edge.",
    beats: [
      { label: "The Deeper Gloom", weight: 0.85, figures: ['chaos'],
        text: "Erebus is the primordial dark — not the night sky overhead but the deeper gloom beneath the world, the shadow that pools in the hollow places of the earth and lines the long road the dead must walk on their way down." },
      { label: "Older Than Names", weight: 0.6,
        text: "He is among the first powers to emerge from Chaos, older than any god with a face or a name." },
      { label: "The Road of the Dead", weight: 0.75, figures: ['hades'],
        text: "His darkness is not empty but full. The dead walk through Erebus on their way to the underworld, and his gloom is the last thing they see before they forget. Charon\'s ferry crosses waters stained with his shadow, and the gates of Hades stand wrapped in it." },
      { label: "Two Shadows Mingled", weight: 1, figures: ['nyx'],
        text: "Yet darkness, in the oldest stories, is fertile. Erebus lay with his sister Nyx, the Night, and from that mingling of two shadows came their own bright opposites." },
      { label: "Light from the Dark", weight: 0.8, figures: ['hemera', 'aether'],
        text: "From that mingling came Hemera the Day and Aether the shining upper air. So the deepest dark fathered the clearest light — as though the world could only arrive at its morning by first passing through the gloom that came before it." },
      { label: "The Edge of Every Lit Thing", weight: 0.55,
        text: "He remains where he has always been: beneath, behind, between — the shadow that gives every lit thing its edge." },
    ],
    source: "Hesiod, Theogony."
  },
  tartarus: {
    story: "Tartarus is less a god than a hunger with a floor — the bottomless pit that gapes beneath the underworld, lying as far below the realm of Hades as the earth lies below the sky. A bronze anvil, the old poets said, would fall nine days and nine nights through the dark before it struck the bottom. He is the deep that even the dead do not enter.\n\nBorn of Chaos beside Gaia at the very beginning of things, Tartarus is the prison at the bottom of the world. A wall of bronze rings it round, and night pours about its throat in a triple line. Above its gates stand the roots of the earth and of the unharvested sea — everything that has weight drains down toward Tartarus in the end.\n\nInto him the defeated Titans were hurled when the Olympians won their war, sealed behind gates of bronze with the hundred-handed giants set to guard them; and there the worst are kept forever. It was there too that the great sinners served their sentences — Tantalus reaching for fruit that draws forever back, Sisyphus rolling his stone up a hill that has no top, Ixion turning on his wheel of fire.\n\nHe is also, with Gaia, the father of Typhon — the abyss itself reaching up, just once, to breed a monster terrible enough to threaten heaven. Even the pit, it seems, can want something badly enough to make it.",
    beats: [
      { label: "A Hunger with a Floor", weight: 0.9,
        text: "Tartarus is less a god than a hunger with a floor — the bottomless pit that gapes beneath the underworld, lying as far below the realm of Hades as the earth lies below the sky." },
      { label: "The Nine-Day Fall", weight: 0.7, figures: ['chaos', 'gaia'],
        text: "A bronze anvil, the old poets said, would fall nine days and nine nights through the dark before it struck the bottom. Born of Chaos beside Gaia at the very beginning of things, he is the deep that even the dead do not enter." },
      { label: "The Bronze Wall", weight: 0.6,
        text: "A wall of bronze rings it round, and night pours about its throat in a triple line. Above its gates stand the roots of the earth and of the unharvested sea — everything that has weight drains down toward Tartarus in the end." },
      { label: "Prison of the Titans", weight: 1, figures: ['cronus'],
        text: "Into him the defeated Titans were hurled when the Olympians won their war, sealed behind gates of bronze with the hundred-handed giants set to guard them; and there the worst are kept forever." },
      { label: "The Great Sinners", weight: 0.75,
        text: "It was there too that the great sinners served their sentences — Tantalus reaching for fruit that draws forever back, Sisyphus rolling his stone up a hill that has no top, Ixion turning on his wheel of fire." },
      { label: "Father of Typhon", weight: 0.8, figures: ['gaia', 'typhon'],
        text: "He is also, with Gaia, the father of Typhon — the abyss itself reaching up, just once, to breed a monster terrible enough to threaten heaven. Even the pit, it seems, can want something badly enough to make it." },
    ],
    source: "Hesiod, Theogony."
  },
  eros: {
    story: "Eros is desire itself — not the winged boy with his arrows of the later tales, but one of the first and oldest powers, the force that stirred at the very beginning when there was almost nothing yet to want. He is the pull at the heart of things, the reaching of one thing toward another out of which all joining, and so all making, is born.\n\nHesiod names him among the very first — born out of Chaos alongside Gaia and Tartarus. Without Eros the other primordials would have stayed forever apart, cold and separate in the dark, each complete unto itself and therefore sterile. It is Eros who taught Sky to lie upon Earth and Sea to mingle with the shore, who set the gods themselves to loving and so to bearing the generations that crowd the world.\n\nThe later poets softened him into Aphrodite\'s son, a mischievous boy with a golden bow, but that is only his latest mask. In the Orphic hymns he is Phanes, the first light, a shining being with golden wings who hatched from the cosmic egg and set the universe spinning. In Plato he is a daemon who stands between mortal and divine, the restless hunger that drives the philosopher toward truth.\n\nThe younger gods of love are only his late children; the desire that runs through everything is far older than any of them. He is the reason anything reaches for anything else — the gravity of the soul.",
    beats: [
      { label: "The Oldest Want", weight: 1, figures: ['chaos'],
        text: "Eros is desire itself — not the winged boy with his arrows of the later tales, but one of the first and oldest powers, the force that stirred at the very beginning when there was almost nothing yet to want." },
      { label: "The Pull at the Heart", weight: 0.8,
        text: "He is the pull at the heart of things, the reaching of one thing toward another out of which all joining, and so all making, is born." },
      { label: "Sky Upon Earth", weight: 0.9, figures: ['gaia', 'uranus', 'pontus'],
        text: "Without Eros the other primordials would have stayed forever apart, cold and separate in the dark. It is Eros who taught Sky to lie upon Earth and Sea to mingle with the shore, who set the gods themselves to loving." },
      { label: "The Golden Bow", weight: 0.65, figures: ['aphrodite'],
        text: "The later poets softened him into Aphrodite\'s son, a mischievous boy with a golden bow, but that is only his latest mask." },
      { label: "Phanes the First Light", weight: 0.7,
        text: "In the Orphic hymns he is Phanes, a shining being with golden wings who hatched from the cosmic egg and set the universe spinning. In Plato he is the restless hunger that drives the philosopher toward truth." },
      { label: "The Gravity of the Soul", weight: 0.6,
        text: "The younger gods of love are only his late children; the desire that runs through everything is far older than any of them. He is the reason anything reaches for anything else — the gravity of the soul." },
    ],
    source: "Hesiod, Theogony."
  },
  pontus: {
    story: "Pontus is the Sea itself — not a god who rules the water but the water given a will, the salt deep as it was before any keel had ever crossed it, before Poseidon lifted a trident over it. He is the grey horizon and the unlit fathoms, the oldest face of the ocean.\n\nGaia bore him out of herself alone, without a father, as she bore the sky and the mountains — the first sea poured from the first earth. In those earliest days there was no shore, no harbour, no island — only the vast flat grey of Pontus stretching to every horizon, the first mirror in which the young sky saw its own face.\n\nAnd when Earth and Sea came together, they seeded the elder line of ocean powers: Nereus the truthful old man of the waves, and dangerous Phorcys with his sister Ceto, from whom the great sea-monsters would one day descend. Through these children the sea populated itself with wonders — the fifty sea-nymphs of Nereus, the Gorgons and the Graeae, the dragon Ladon and the hundred terrors that lurked beneath the surface.\n\nLong before the Olympians divided the world among themselves, Pontus was already the whole of the deep. When Poseidon took the sea as his domain he inherited the water, but Pontus was the water — the untamed, pre-Olympian ocean that neither obeys nor remembers any king.",
    beats: [
      { label: "The Water Given a Will", weight: 0.9,
        text: "Pontus is the Sea itself — not a god who rules the water but the water given a will, the salt deep as it was before any keel had ever crossed it, before Poseidon lifted a trident over it." },
      { label: "Born of Earth Alone", weight: 0.7, figures: ['gaia'],
        text: "Gaia bore him out of herself alone, without a father, as she bore the sky and the mountains — the first sea poured from the first earth." },
      { label: "The First Mirror", weight: 0.55,
        text: "In those earliest days there was no shore, no harbour, no island — only the vast flat grey of Pontus stretching to every horizon, the first mirror in which the young sky saw its own face." },
      { label: "Elder Ocean Powers", weight: 1, figures: ['nereus', 'phorcys', 'ceto'],
        text: "When Earth and Sea came together, they seeded the elder line of ocean powers: Nereus the truthful old man of the waves, and dangerous Phorcys with his sister Ceto, from whom the great sea-monsters would one day descend." },
      { label: "Wonders of the Deep", weight: 0.7, figures: ['ladon'],
        text: "Through these children the sea populated itself with wonders — the fifty sea-nymphs of Nereus, the Gorgons and the Graeae, the dragon Ladon and the hundred terrors that lurked beneath the surface." },
      { label: "The Untamed Ocean", weight: 0.65, figures: ['poseidon'],
        text: "When Poseidon took the sea as his domain he inherited the water, but Pontus was the water — the untamed, pre-Olympian ocean that neither obeys nor remembers any king." },
    ],
    source: "Hesiod, Theogony."
  },
  thanatos: {
    story: "Thanatos is Death — not the violence that kills but the quiet, final closing that comes after, the iron-hearted god who gathers each mortal at the end and carries them across the last threshold. He is gentle in his way, and utterly without exception: alone of all the gods he takes no offerings and grants no favors, for there is nothing anyone can give him to be spared.\n\nBorn of Night without a father, twin brother to Sleep, he dwells with Hypnos in a cave at the edge of the world. Euripides gives him black robes and dark wings and a sword with which he cuts a lock of hair from the dying — a small ritual consecration that marks the soul as his. He is the most hated of the gods by men and the most steadfast, the one certainty in a world of uncertain fates.\n\nTwice only was he cheated of his due. The cunning Sisyphus once bound him in chains so that for a time no one in all the world could die, and the battlefields filled with soldiers who could not fall. Ares himself had to free Death so that war could function again. And Heracles, strongest of mortals, wrestled Thanatos at the graveside of Queen Alcestis and tore her soul from his grip by brute force — the only time death was beaten in a fair fight.\n\nBut these are the rare exceptions that prove his rule — for in the end Thanatos comes for everyone, and in the end no one slips past him twice. He does not hurry and he does not delay. He is the most patient of all the gods.",
    beats: [
      { label: "The Quiet Closing", weight: 0.9,
        text: "Thanatos is Death — not the violence that kills but the quiet, final closing that comes after, the iron-hearted god who gathers each mortal at the end and carries them across the last threshold." },
      { label: "No Offerings Accepted", weight: 0.65,
        text: "Alone of all the gods he takes no offerings and grants no favors, for there is nothing anyone can give him to be spared." },
      { label: "Twin of Sleep", weight: 0.7, figures: ['nyx', 'hypnos'],
        text: "Born of Night without a father, twin brother to Sleep, he dwells with Hypnos in a cave at the edge of the world. Euripides gives him black robes and dark wings and a sword with which he cuts a lock of hair from the dying." },
      { label: "Sisyphus in Chains", weight: 0.85, figures: ['ares'],
        text: "The cunning Sisyphus once bound him in chains so that for a time no one in all the world could die, and the battlefields filled with soldiers who could not fall. Ares himself had to free Death so that war could function again." },
      { label: "Heracles at the Graveside", weight: 1, figures: ['heracles'],
        text: "Heracles, strongest of mortals, wrestled Thanatos at the graveside of Queen Alcestis and tore her soul from his grip by brute force — the only time death was beaten in a fair fight." },
      { label: "The Most Patient God", weight: 0.6,
        text: "These are the rare exceptions that prove his rule — for in the end Thanatos comes for everyone, and in the end no one slips past him twice. He does not hurry and he does not delay." },
    ],
    source: "Hesiod, Theogony."
  },
  hypnos: {
    story: "Hypnos is Sleep, the gentle twin of Death and the kinder of the two — the god who walks the world each night on silent feet, touching the eyes of the weary and laying even the strongest low without a wound. Where his brother takes a life forever, Hypnos takes it only until the morning.\n\nHe dwells in a still cave at the edge of the world where the sun never reaches and the river Lethe, the water of forgetfulness, murmurs softly through the dark. No cock crows there, no watchdog barks; the silence is so deep that even the cave\'s entrance grows poppies. His countless sons, the Dreams, drift about him like moths — Morpheus the cleverest among them, who wears the shapes of men.\n\nSo great is his power that he can quiet even the restless mind of Zeus. Twice Hera came to him with bribes: once during the Trojan War she offered him a golden throne wrought by Hephaestus, and another time one of the younger Graces for a wife. Both times she asked the same thing — lull the Thunderer to sleep so that she might work her will on the battlefield unwatched. Hypnos dreaded the waking, for the last time he had dared this, Zeus had nearly hurled him into the sea; only his mother Nyx\'s protection had saved him.\n\nBut he did it — for there is nothing under heaven that does not, in the end, have to rest. Even the god who rules the world must close his eyes, and when he does, it is Hypnos who is waiting.",
    beats: [
      { label: "The Gentle Twin", weight: 0.8, figures: ['thanatos'],
        text: "Hypnos is Sleep, the gentle twin of Death and the kinder of the two — the god who walks the world each night on silent feet, laying even the strongest low without a wound." },
      { label: "The Cave of Forgetting", weight: 0.6, figures: ['morpheus'],
        text: "He dwells in a still cave where the sun never reaches and the river Lethe murmurs softly through the dark. No cock crows there, no watchdog barks; the silence is so deep that even the cave\'s entrance grows poppies." },
      { label: "Hera\'s Bribe", weight: 0.85, figures: ['hera', 'hephaestus'],
        text: "Twice Hera came to him with bribes — a golden throne wrought by Hephaestus and one of the younger Graces for a wife. Both times she asked the same thing: lull the Thunderer to sleep so that she might work her will unwatched." },
      { label: "Lulling the King", weight: 1, figures: ['zeus', 'nyx'],
        text: "Hypnos dreaded the waking, for the last time he had dared this, Zeus had nearly hurled him into the sea; only his mother Nyx\'s protection had saved him. But he did it." },
      { label: "Everything Must Rest", weight: 0.65,
        text: "There is nothing under heaven that does not, in the end, have to rest. Even the god who rules the world must close his eyes, and when he does, it is Hypnos who is waiting." },
    ],
    source: "Hesiod, Theogony; Homer, Iliad XIV."
  },
  morpheus: {
    story: "Morpheus is the shaper of dreams, one of the thousand sons of Sleep — and the most gifted of them, for he can take the exact form of any mortal: their face and voice, their walk, the very way they hold themselves, so that he may step into a sleeper\'s mind wearing the shape of someone loved and known. His name means \'form\' — he is the one who gives the dream its body.\n\nHe has two brothers of note: Phobetor, who takes the shapes of beasts and is the maker of nightmares, and Phantasos, who becomes water and stone and tree — the dreamer of landscapes. But only Morpheus wears human faces, and so it is Morpheus the gods choose when they need to send a message that the sleeper will believe.\n\nIt is through him that the dead seem to come back to us in our sleep. When the drowned king Ceyx could not return home to his wife Alcyone, Hera sent Iris down to the cave of Sleep to commission a dream. It was Morpheus who put on the king\'s pale and dripping shape, seaweed still tangled in his hair, and stood at her bedside to tell her, gently, that she was already a widow. Alcyone woke weeping, ran to the shore, and threw herself into the sea — where the gods, moved at last, turned husband and wife alike into kingfisher birds.\n\nSo even grief, in the old stories, arrives first as a dream wearing a beloved face.",
    beats: [
      { label: "The Shaper of Dreams", weight: 0.85, figures: ['hypnos'],
        text: "Morpheus is the shaper of dreams, one of the thousand sons of Sleep — and the most gifted of them, for he can take the exact form of any mortal. His name means \'form\' — he is the one who gives the dream its body." },
      { label: "Brothers of the Dream", weight: 0.6,
        text: "He has two brothers of note: Phobetor, who takes the shapes of beasts and is the maker of nightmares, and Phantasos, who becomes water and stone and tree — the dreamer of landscapes." },
      { label: "Messenger by Night", weight: 0.7, figures: ['hera'],
        text: "It is through him that the gods send their messages by night. Only Morpheus wears human faces, and so it is Morpheus the gods choose when they need to send a message the sleeper will believe." },
      { label: "The Drowned King", weight: 1,
        text: "When the drowned king Ceyx could not return home, Morpheus put on his pale and dripping shape, seaweed still tangled in his hair, and stood at Alcyone\'s bedside to tell her, gently, that she was already a widow." },
      { label: "Kingfisher Birds", weight: 0.75,
        text: "Alcyone woke weeping, ran to the shore, and threw herself into the sea — where the gods, moved at last, turned husband and wife alike into kingfisher birds. Even grief arrives first as a dream wearing a beloved face." },
    ],
    source: "Ovid, Metamorphoses XI."
  },
  moirai: {
    story: "The Moirai are the three Fates, the grey weavers who hold every life as a single thread between their hands — Clotho who spins it into being, Lachesis who measures out its length, and Atropos, the smallest and most terrible, who cuts it without appeal. What they decide is decided, and there is no court above them.\n\nThey sit robed in white, singing in three voices — Lachesis of the past, Clotho of the present, Atropos of what is to come — and the sound of their singing is the sound of necessity itself. Some poets call them daughters of Night; others, of Zeus and Themis, as though law and order had produced them. Either way they are older in authority than any god on Olympus.\n\nNot even Zeus can unmake what they have set — some say he is only the one who carries out their will. When his own son Sarpedon lay dying on the fields of Troy, Zeus wept tears of blood but could not lift the thread from Atropos\'s shears. They are blind to pleading and deaf to prayer.\n\nThey spun the doom into the infant Meleager on the night he was born, tying his life to a half-burnt log: when the log burned through, the hero fell. They gave Achilles his terrible choice — a long dim life or a short bright one — and held him to it. To the Greeks they were the proof that beneath all the bright, quarreling gods there ran a deeper law that even heaven itself had to obey.",
    beats: [
      { label: "The Grey Weavers", weight: 0.9,
        text: "The Moirai are the three Fates — Clotho who spins the thread of life into being, Lachesis who measures out its length, and Atropos, the smallest and most terrible, who cuts it without appeal." },
      { label: "Three Voices Singing", weight: 0.65, figures: ['nyx'],
        text: "They sit robed in white, singing in three voices — Lachesis of the past, Clotho of the present, Atropos of what is to come. Some call them daughters of Night; others, of Zeus and Themis." },
      { label: "Sarpedon\'s Thread", weight: 0.85, figures: ['zeus'],
        text: "Not even Zeus can unmake what they have set. When his own son Sarpedon lay dying on the fields of Troy, Zeus wept tears of blood but could not lift the thread from Atropos\'s shears." },
      { label: "Meleager\'s Log", weight: 0.8,
        text: "They spun the doom into the infant Meleager on the night he was born, tying his life to a half-burnt log: when the log burned through, the hero fell." },
      { label: "Achilles\' Choice", weight: 1,
        text: "They gave Achilles his terrible choice — a long dim life or a short bright one — and held him to it." },
      { label: "A Deeper Law", weight: 0.7,
        text: "To the Greeks they were the proof that beneath all the bright, quarreling gods there ran a deeper law that even heaven itself had to obey." },
    ],
    source: "Hesiod, Theogony."
  },
  nemesis: {
    story: "Nemesis is the goddess of due measure, the cold hand that restores the balance whenever a mortal\'s fortune or pride swells past its proper bound. She is not cruelty but correction — the weight that comes down on the scale grown too light with arrogance, the answer the universe makes to anyone who forgets that they are not a god.\n\nA daughter of Night, she carries a measuring-rod and a bridle, and she watches the proud the way a creditor watches a debt. Her temple at Rhamnous near Athens was one of the most feared shrines in Greece — warriors prayed there before battle not for victory but that they would not grow too proud if they won.\n\nIt was Nemesis who heard the prayer raised against cold Narcissus and bent him to fall in love with his own reflection, so that the boy who had scorned every lover wasted away wanting only himself. And in one strange myth, Zeus himself pursued Nemesis across land and sea; she fled him, changing shape — into a fish, a wild goose, every creature that runs — but he caught her at last in the form of a swan, and from their union came an egg from which Helen of Troy was born. So the goddess of retribution became, against her will, the mother of the most beautiful woman alive — the one whose face would launch a thousand ships and bring down a city.\n\nShe gives good fortune freely — but she watches what is done with it, and to those who mistake a gift for a right, she comes quietly to take the difference back.",
    beats: [
      { label: "The Cold Hand", weight: 0.85, figures: ['nyx'],
        text: "Nemesis is the goddess of due measure, the cold hand that restores the balance whenever a mortal\'s fortune or pride swells past its proper bound. A daughter of Night, she carries a measuring-rod and a bridle." },
      { label: "The Shrine at Rhamnous", weight: 0.6,
        text: "Her temple at Rhamnous near Athens was one of the most feared shrines in Greece — warriors prayed there before battle not for victory but that they would not grow too proud if they won." },
      { label: "The Mirror Pool", weight: 0.9, figures: ['narcissus'],
        text: "It was Nemesis who heard the prayer raised against cold Narcissus and bent him to fall in love with his own reflection, so that the boy who had scorned every lover wasted away wanting only himself." },
      { label: "Mother of Helen", weight: 1, figures: ['zeus'],
        text: "Zeus pursued Nemesis across land and sea; she fled him, changing shape — into a fish, a wild goose, every creature that runs — but he caught her at last, and from their union came an egg from which Helen of Troy was born." },
      { label: "Taking the Difference", weight: 0.7,
        text: "She gives good fortune freely — but she watches what is done with it, and to those who mistake a gift for a right, she comes quietly to take the difference back." },
    ],
    source: "Hesiod, Theogony."
  },
  eris: {
    story: "Eris is Strife, the sister and companion of war, the small bitter goddess who is never invited and always comes. From her descend all the things that pull a peace apart — quarrel and rivalry, lying words, toil and famine and ruin — the whole brood of discord that so often begins in a single slighted moment.\n\nHesiod knew there were two Erises. One is hateful — she feeds wars and feuds and is loved by no one. But the other is older and better: the Eris of competition, the strife that makes the potter envy the potter and the poet outdo the poet. Zeus set this good Eris in the roots of the earth as a gift, so that even rivalry could drive men to work.\n\nBut it is the hateful Eris everyone remembers, and her most famous act was the smallest. Left off the guest-list for the wedding of Peleus and Thetis, Eris came all the same, and tossed among the goddesses a single golden apple inscribed \'to the fairest.\' Hera, Athena, and Aphrodite each claimed it; the quarrel was handed to the Trojan prince Paris to settle; and his choice lit the long slow fuse that ended in the ten-year burning of Troy.\n\nSo the greatest war of the age began with one uninvited goddess and one little golden apple of spite. Eris walked the battlefield of Troy herself, Ares\'s sister in blood and in temperament, growing taller with every kill — small when the fighting starts, towering by the end.",
    beats: [
      { label: "Never Invited", weight: 0.8, figures: ['nyx'],
        text: "Eris is Strife, the sister and companion of war, the small bitter goddess who is never invited and always comes. From her descend quarrel and rivalry, lying words, toil and famine and ruin." },
      { label: "Two Stripes", weight: 0.6,
        text: "Hesiod knew there were two Erises. One is hateful — she feeds wars and feuds. But the other is older and better: the strife that makes the potter envy the potter and the poet outdo the poet." },
      { label: "The Golden Apple", weight: 1, figures: ['thetis', 'hera', 'athena', 'aphrodite'],
        text: "Left off the guest-list for the wedding of Peleus and Thetis, Eris tossed among the goddesses a single golden apple inscribed \'to the fairest.\'" },
      { label: "The Judgement of Paris", weight: 0.9,
        text: "The quarrel was handed to the Trojan prince Paris to settle; and his choice lit the long slow fuse that ended in the ten-year burning of Troy." },
      { label: "She Walks the Battlefield", weight: 0.75, figures: ['ares'],
        text: "Eris walked the battlefield of Troy herself, Ares\'s sister in blood and in temperament, growing taller with every kill — small when the fighting starts, towering by the end." },
    ],
    source: "Hesiod, Theogony; Works and Days."
  },

  // ---- TITANS ----
  cronus: {
    story: "Cronus was the youngest of the twelve Titans, and the only one with nerve enough to answer his mother\'s call. When Gaia groaned beneath the weight of children forced back into her body by their father the Sky, she forged a jagged sickle of grey adamant and begged each of her sons in turn to wield it. Eleven refused. The twelfth — the youngest, the most cunning — took it without a word.\n\nHe lay in ambush in the folds of dusk, and when the sky descended upon the earth that night, Cronus reached up and unmanned his father with a single stroke. The severed flesh tumbled into the sea and the foam gathered into Aphrodite; the drops of blood that struck the soil became the Erinyes, the dark avengers. The sky recoiled forever, and the son who had cut it loose became lord of everything beneath it.\n\nFor a time the world knew peace. The age of Cronus was remembered ever after as the Golden Age, when mortals lived without labor and the earth gave its fruit unasked. But a prophecy shadowed his throne — Gaia herself, or perhaps the starry sky in its dying curse, foretold that Cronus would be overthrown by his own child, just as he had overthrown his father.\n\nSo when his sister-queen Rhea bore him children, Cronus swallowed each one whole the moment it drew breath — Hestia first, then Demeter, then Hera, then Hades, then Poseidon, each infant sinking living into the dark of their father\'s belly. But when the sixth child quickened within her, Rhea could bear no more. She fled to Crete by night, gave birth in a hidden cave, and carried back to her husband a stone wrapped in swaddling-bands. He swallowed it without looking down.\n\nThe child she had saved was Zeus. He grew in secret, nursed by nymphs, fed on the milk of a wild goat, hidden by the clash of shields that drowned his infant cries. When he was grown he returned, forced the draught of Metis upon his father, and Cronus disgorged the stone first, then the five living gods one by one. The brothers and sisters stood together, and the war for heaven — the Titanomachy — broke across the world like a storm that lasted ten years. In the end Cronus and his Titan allies were hurled down into the pit of Tartarus, sealed behind gates of bronze, and the age of the Olympians began.",
    beats: [
      { label: "The Youngest Who Dared", weight: 0.8, figures: ['gaia'],
        text: "Cronus was the youngest of the twelve Titans, and the only one with nerve enough to answer his mother\'s call. Gaia forged a jagged sickle and begged each son in turn to wield it. Eleven refused. The twelfth took it without a word." },
      { label: "Unmanning the Sky", weight: 0.9, figures: ['aphrodite', 'erinyes'],
        text: "He lay in ambush in the folds of dusk, and when the sky descended that night, Cronus reached up and unmanned his father with a single stroke. The severed flesh tumbled into the sea and the foam gathered into Aphrodite; the blood that struck the soil became the Erinyes." },
      { label: "The Golden Age", weight: 0.7,
        text: "For a time the world knew peace. The age of Cronus was remembered ever after as the Golden Age, when mortals lived without labor and the earth gave its fruit unasked." },
      { label: "The Dread Prophecy", weight: 0.85,
        text: "But a prophecy shadowed his throne — he would be overthrown by his own child, just as he had overthrown his father. The sickle that had won him the cosmos now hung above his head as a curse." },
      { label: "The Devouring Father", weight: 1, figures: ['rhea', 'hestia', 'demeter', 'hera', 'hades', 'poseidon'],
        text: "So as Rhea bore him children, Cronus swallowed each one whole the moment it drew breath — Hestia, Demeter, Hera, Hades, Poseidon — each infant sinking living into the dark of their father\'s belly." },
      { label: "The Swaddled Stone", weight: 0.9, figures: ['rhea', 'zeus'],
        text: "When the sixth child quickened, Rhea fled to Crete by night, gave birth in a hidden cave, and carried back a stone wrapped in swaddling-bands. He swallowed it without looking down. The child she had saved was Zeus." },
      { label: "Cast into Tartarus", weight: 0.85, figures: ['zeus', 'tartarus'],
        text: "Zeus returned, forced Cronus to disgorge the stone and then the five living gods. The Titanomachy broke across the world like a storm that lasted ten years, and in the end Cronus was hurled down into the pit of Tartarus, sealed behind gates of bronze." },
    ],
    source: "Hesiod, Theogony."
  },
  rhea: {
    story: "Rhea is the Titaness of the flowing generations, the great mother who stands between two ages of the world — wife to Cronus, and mother of the first six Olympians. Hers is the oldest grief in heaven: to give birth again and again, and each time to watch the cradle emptied.\n\nFor Cronus, warned by Gaia and Uranus that his own child would overthrow him, swallowed each one the moment she bore it — Hestia first, then Demeter, then Hera, then Hades, then Poseidon, each vanishing into their father\'s throat before they drew a second breath. Five times Rhea endured it. The sixth time she could not.\n\nShe fled by night to Crete, counselled by her own mother Gaia, and brought the infant Zeus to birth in a hidden cave on the slopes of Mount Dicte. The Curetes, young warriors, clashed their shields and danced outside the cave so that the baby\'s cries would not carry to heaven. Inside, the goat Amaltheia suckled him, and bees brought him wild honey.\n\nMeanwhile, Rhea carried back to her husband a stone dressed in an infant\'s clothes. He swallowed it whole without once looking down — and by nothing more than a mother\'s cunning the youngest god was saved. When he was grown, Zeus returned and forced his father to vomit up every child he had swallowed — the stone came last and was set at Delphi, where men could see it for a thousand years after, anointed with oil, proof that the world had once been saved by a trick as old as motherhood.",
    beats: [
      { label: "Mother Between Ages", weight: 0.85, figures: ['cronus'],
        text: "Rhea is the Titaness of the flowing generations, the great mother who stands between two ages of the world — wife to Cronus, and mother of the first six Olympians." },
      { label: "The Oldest Grief", weight: 0.9, figures: ['hestia', 'demeter', 'hera', 'hades', 'poseidon'],
        text: "Cronus swallowed each child the moment she bore it — Hestia first, then Demeter, then Hera, then Hades, then Poseidon, each vanishing into their father\'s throat before they drew a second breath." },
      { label: "The Cave on Crete", weight: 1, figures: ['zeus', 'gaia'],
        text: "She fled by night to Crete, counselled by her own mother Gaia, and brought the infant Zeus to birth in a hidden cave on the slopes of Mount Dicte. The Curetes clashed their shields outside so the baby\'s cries would not carry." },
      { label: "A Stone in Swaddling", weight: 0.8,
        text: "She carried back to her husband a stone dressed in an infant\'s clothes. He swallowed it whole without once looking down — and by nothing more than a mother\'s cunning the youngest god was saved." },
      { label: "The Stone at Delphi", weight: 0.7, figures: ['apollo'],
        text: "When Zeus returned, he forced his father to vomit up every child — the stone came last and was set at Delphi, where men could see it for a thousand years after, anointed with oil, proof that the world had once been saved by a trick as old as motherhood." },
    ],
    source: "Hesiod, Theogony."
  },
  oceanus: {
    story: "Oceanus is the great world-river — the vast, ever-circling stream that the ancients believed ran round the rim of the whole earth, the boundary of the known world and the source from which every river, spring, and well draws its water. Eldest of the Titans, he is less a person than a horizon, immense and untroubled.\n\nHomer calls him the origin of all things — even of the gods. His stream runs at the edge of the world where the sky comes down, and beyond it lie the meadows of asphodel where the dead walk, the gates of the sun, and the country of dreams. To cross Oceanus is to leave the world of the living altogether, and only the bravest heroes — Heracles and Odysseus among them — ever dared the passage.\n\nWith his sister and wife Tethys he fathered the three thousand river-gods and the three thousand Oceanid nymphs, so that nearly every flowing water in the world is one of his children. Among his daughters were Styx the oath-river, Metis the cunning counsellor, and Calypso who held Odysseus seven years on her island.\n\nYet when the Titans rose in war against the young Olympians, Oceanus alone would not raise his hand; he kept to his endless circling at the edge of things and let the others fall — too old and too vast to be stirred by a quarrel over a throne. He was never punished and never imprisoned; he simply continued, the way a river continues, regardless of who claims to own the land.",
    beats: [
      { label: "The World-River", weight: 0.9,
        text: "Oceanus is the great world-river — the vast, ever-circling stream that ran round the rim of the whole earth, the boundary of the known world and the source from which every river, spring, and well draws its water." },
      { label: "Origin of All Things", weight: 0.7, figures: ['heracles', 'odysseus'],
        text: "Homer calls him the origin of all things. Beyond his stream lie the meadows of asphodel, the gates of the sun, and the country of dreams. To cross Oceanus is to leave the world of the living." },
      { label: "Father of All Waters", weight: 1, figures: ['tethys'],
        text: "With his sister and wife Tethys he fathered the three thousand river-gods and the three thousand Oceanid nymphs, so that nearly every flowing water in the world is one of his children." },
      { label: "Famous Daughters", weight: 0.65, figures: ['styx', 'metis', 'calypso'],
        text: "Among his daughters were Styx the oath-river, Metis the cunning counsellor, and Calypso who held Odysseus seven years on her island." },
      { label: "The Titan Who Would Not Fight", weight: 0.75, figures: ['zeus'],
        text: "When the Titans rose in war, Oceanus alone would not raise his hand; he kept to his endless circling and let the others fall. He was never punished — he simply continued, the way a river continues, regardless of who claims to own the land." },
    ],
    source: "Hesiod, Theogony."
  },
  tethys: {
    story: "Tethys is the Titaness of the nursing waters, the gentle mother from whom the world\'s fresh streams flow — wife to Oceanus the world-river, and the source that feeds the rivers, the rain-clouds, and the springs that keep the living earth alive.\n\nFrom her came the three thousand Oceanids and all the rivers of the world, drawn up through the earth and poured back into the sea in an endless round; she is the hidden circulation that turns the salt deep into the sweet water of every brook. No river runs without passing through Tethys first — she is the pulse of the water cycle itself, the great recycler who gives the land back what the sea has taken.\n\nIn the oldest tales she even nursed the goddess Hera while the war in heaven raged, fostering her at the world\'s far edge — the great nurse of waters who was, for a time, the nurse of a future queen. When Hera came into her power she never forgot the kindness, and some say Tethys\'s gentle influence is the reason Hera\'s rages always burn themselves out in the end.\n\nIn one myth Tethys quarrelled with a nymph who had been Hera\'s rival, and forbade the stars of the Great Bear from ever dipping below the horizon to bathe in her waters — which is why, to this day, those stars never set. Even the sky obeys the old nurse\'s grievances.",
    beats: [
      { label: "Nurse of the World", weight: 0.85, figures: ['oceanus'],
        text: "Tethys is the Titaness of the nursing waters — wife to Oceanus the world-river, and the source that feeds the rivers, the rain-clouds, and the springs that keep the living earth alive." },
      { label: "The Hidden Circulation", weight: 1,
        text: "From her came the three thousand Oceanids and all the rivers of the world, drawn up through the earth and poured back into the sea in an endless round — the hidden circulation that turns the salt deep into the sweet water of every brook." },
      { label: "Foster-Mother of Hera", weight: 0.8, figures: ['hera'],
        text: "She nursed the goddess Hera while the war in heaven raged, fostering her at the world\'s far edge — the great nurse of waters who was, for a time, the nurse of a future queen." },
      { label: "The Gentle Influence", weight: 0.6,
        text: "When Hera came into her power she never forgot the kindness, and some say Tethys\'s gentle influence is the reason Hera\'s rages always burn themselves out in the end." },
      { label: "The Stars That Never Set", weight: 0.7, figures: ['callisto'],
        text: "Tethys forbade the stars of the Great Bear from ever dipping below the horizon to bathe in her waters — which is why, to this day, those stars never set. Even the sky obeys the old nurse\'s grievances." },
    ],
    source: "Hesiod, Theogony."
  },
  hyperion: {
    story: "Hyperion is the Titan of heavenly light, the watcher from on high — his very name means \'the one who goes above.\' He is light not as a single lamp but as a principle, the pure radiance of the upper sky out of which the measured lights of day and night were drawn.\n\nHomer sometimes calls Helios himself \'Hyperion,\' as though father and son were the same fire seen from different distances — the Titan a dimmer, older version of his child\'s blaze. In the Titanomachy he was one of the four brothers who held the corners of the sky while Cronus ambushed their father Uranus; he stood at the eastern pillar, where the light first rises, and held it fast.\n\nWith his sister Theia, goddess of shining, he fathered the three great lights of the world: Helios the Sun, Selene the Moon, and Eos the Dawn. Through his children the heavens are lit and the hours are counted — sunrise, high noon, and the silver crossing of the night.\n\nWhen the Olympians overthrew the Titans, Hyperion was cast into Tartarus with his brothers. But his children were spared — the world still needed its lights. Hyperion himself stands behind them all, the older and dimmer source, the father-light from which every visible brightness in the sky was first kindled, burning in the dark below the world while his son drives the chariot above it.",
    beats: [
      { label: "The One Who Goes Above", weight: 0.85,
        text: "Hyperion is the Titan of heavenly light, the watcher from on high — his very name means \'the one who goes above.\' He is light not as a single lamp but as a principle, the pure radiance of the upper sky." },
      { label: "The Eastern Pillar", weight: 0.7, figures: ['cronus', 'uranus'],
        text: "In the Titanomachy he was one of the four brothers who held the corners of the sky while Cronus ambushed Uranus; he stood at the eastern pillar, where the light first rises, and held it fast." },
      { label: "Three Lights of the World", weight: 1, figures: ['theia', 'helios', 'selene', 'eos'],
        text: "With his sister Theia he fathered the three great lights of the world: Helios the Sun, Selene the Moon, and Eos the Dawn. Through his children the heavens are lit and the hours are counted." },
      { label: "Cast Down, Still Shining", weight: 0.75,
        text: "When the Olympians overthrew the Titans, Hyperion was cast into Tartarus with his brothers. But his children were spared — the world still needed its lights." },
      { label: "The Father-Light", weight: 0.6,
        text: "He is the older and dimmer source, the father-light from which every visible brightness was first kindled — burning in the dark below the world while his son drives the chariot above it." },
    ],
    source: "Hesiod, Theogony."
  },
  theia: {
    story: "Theia is the Titaness of sight and shining — the power that lends light its splendor and the eye its ability to see by it. The Greeks believed it was she who gave gold and silver and bright gems their gleam, so that everything precious in the world borrows a little of her radiance.\n\nHer name means simply \'divine,\' and she is brightness in its purest form, before it is parceled out into particular fires. Pindar calls her the goddess \'for whose sake men prize gold above all other things\' — not because she makes them greedy but because she makes things visible, and what shines draws the eye before it draws the hand.\n\nWith her brother Hyperion she gave birth to the three lights that order the sky — the Sun, the Moon, and the Dawn — pouring her own shining into each of her children. Helios inherited her blaze, Selene her gentler silver, and Eos her rose-gold edge. Through them the world gained its calendar: day and month and the rosy announcement of each new morning.\n\nTheia is rarely worshipped alone — she is the kind of power people use without noticing, the gleam in the crown and the flash on the wave. To look upon anything that glitters, the old poets said, is to catch a far-off glimpse of Theia herself. She is the reason anything catches the light at all.",
    beats: [
      { label: "Goddess of Shining", weight: 0.85,
        text: "Theia is the Titaness of sight and shining — the power that lends light its splendor and the eye its ability to see by it. Everything precious in the world borrows a little of her radiance." },
      { label: "Why Men Prize Gold", weight: 0.65,
        text: "Pindar calls her the goddess \'for whose sake men prize gold above all other things\' — not because she makes them greedy but because she makes things visible, and what shines draws the eye before it draws the hand." },
      { label: "Mother of the Lights", weight: 1, figures: ['hyperion', 'helios', 'selene', 'eos'],
        text: "With her brother Hyperion she gave birth to the three lights that order the sky — the Sun, the Moon, and the Dawn — pouring her own shining into each of her children." },
      { label: "Three Inheritances", weight: 0.7,
        text: "Helios inherited her blaze, Selene her gentler silver, and Eos her rose-gold edge. Through them the world gained its calendar: day and month and the rosy announcement of each new morning." },
      { label: "A Glimpse of the Divine", weight: 0.6,
        text: "To look upon anything that glitters is to catch a far-off glimpse of Theia herself. She is the reason anything catches the light at all." },
    ],
    source: "Hesiod, Theogony."
  },
  iapetus: {
    story: "Iapetus is one of the four great Titans who, in the oldest reckoning, stood at the corners of the world and held the sky apart from the earth — a pillar-god of the western edge, linked by the Greeks with mortal life and its short, striving span. Some scholars see in his name an echo of the biblical Japheth, the third son of Noah, as though two traditions dimly remembered the same patriarch of the human race.\n\nWith the Oceanid Clymene he fathered four sons, and through them the whole condition of humankind entered the world. Atlas was condemned to bear the heavens on his shoulders — endurance without end. Prometheus stole fire and suffered for loving men — foresight punished. Epimetheus, the afterthought, took Pandora into his house and opened grief to the world — folly unpunished. And Menoetius, the rash one, was struck down by Zeus\'s thunderbolt for his insolence and hurled into Tartarus — pride destroyed.\n\nWhen the Titans fell, Iapetus was cast into Tartarus alongside Cronus and the others. But his sons remained above ground to enact their fates — endurance and foresight, cleverness and folly — the best and the worst of the mortal lot all trace back, in the end, through the line of Iapetus. He is the Titan whose legacy is not power but consequence.",
    beats: [
      { label: "Pillar of the West", weight: 0.75,
        text: "Iapetus is one of the four great Titans who stood at the corners of the world and held the sky apart from the earth — a pillar-god of the western edge, linked by the Greeks with mortal life and its short, striving span." },
      { label: "An Ancient Echo", weight: 0.55,
        text: "Some scholars see in his name an echo of the biblical Japheth, the third son of Noah, as though two traditions dimly remembered the same patriarch of the human race." },
      { label: "Four Sons, Four Fates", weight: 1, figures: ['atlas', 'prometheus', 'epimetheus'],
        text: "Atlas was condemned to bear the heavens — endurance without end. Prometheus stole fire — foresight punished. Epimetheus took Pandora — folly unpunished. And Menoetius was struck down by thunderbolt — pride destroyed." },
      { label: "Cast into Tartarus", weight: 0.7, figures: ['cronus'],
        text: "When the Titans fell, Iapetus was cast into Tartarus alongside Cronus and the others. But his sons remained above ground to enact their fates." },
      { label: "The Legacy of Consequence", weight: 0.65,
        text: "Endurance and foresight, cleverness and folly — the best and the worst of the mortal lot all trace back through the line of Iapetus. He is the Titan whose legacy is not power but consequence." },
    ],
    source: "Hesiod, Theogony."
  },
  mnemosyne: {
    story: "Mnemosyne is Memory itself given a face — the Titaness who holds the whole of the past, and without whom there could be no knowledge, no story, no name that outlasts the moment it is spoken. In an age before writing, she was the most necessary power of all: the keeper of everything that must not be lost.\n\nShe was born of Gaia and Uranus among the twelve Titans, and among them she alone carries no weapon and rules no element. Her domain is time itself as it is experienced — not the ticking of hours but the accumulation of meaning, the thread that connects what happened yesterday to what matters tomorrow.\n\nZeus came to her in Pieria, at the foot of Mount Olympus, and lay with her for nine nights running. From those nights she bore the nine Muses — Clio for history, Calliope for epic poetry, Melpomene for tragedy, and six more sisters, each governing one of the arts that keep civilization alive. So out of Memory came song, history, and all the arts that carry a people\'s past forward into its future.\n\nIn the underworld there were two springs: one of Lethe, forgetting, and one of Mnemosyne, remembering. The initiates of the mystery cults were taught to drink from Memory\'s spring so they could carry their past lives with them into death. It is no accident that the poets begin by calling on her daughters: every poem is an act of remembering, and behind every Muse stands their mother, the deep still well from which all of it is drawn.",
    beats: [
      { label: "Memory Given a Face", weight: 0.85, figures: ['gaia', 'uranus'],
        text: "Mnemosyne is Memory itself given a face — the Titaness who holds the whole of the past. In an age before writing, she was the most necessary power of all: the keeper of everything that must not be lost." },
      { label: "No Weapon, No Element", weight: 0.55,
        text: "Among the twelve Titans she alone carries no weapon and rules no element. Her domain is time as it is experienced — not the ticking of hours but the accumulation of meaning." },
      { label: "Nine Nights in Pieria", weight: 1, figures: ['zeus', 'muses'],
        text: "Zeus came to her in Pieria and lay with her for nine nights running. From those nights she bore the nine Muses — Clio for history, Calliope for epic poetry, Melpomene for tragedy, and six more sisters, each governing one of the arts that keep civilization alive." },
      { label: "Two Springs in the Underworld", weight: 0.75,
        text: "In the underworld there were two springs: one of Lethe, forgetting, and one of Mnemosyne, remembering. The initiates were taught to drink from Memory\'s spring so they could carry their past lives into death." },
      { label: "The Well of All Song", weight: 0.7,
        text: "Every poem is an act of remembering, and behind every Muse stands their mother, the deep still well of Memory from which all of it is drawn." },
    ],
    source: "Hesiod, Theogony."
  },
  themis: {
    story: "Themis is the Titaness of divine law and right order — not the written statutes of cities but the older, deeper rule beneath them: custom, fairness, the way things are properly done between gods and men. She is the steady sense of what is fitting, and she sits closer to the throne of Zeus than almost anyone.\n\nShe was never overthrown with the other Titans because she was never on their side — she fought with justice, which happened to be with Zeus. In this she is like a constitution that survives a revolution: the new rulers adopt her because they cannot do without her.\n\nBefore Apollo ever held it, it was Themis who spoke the oracles at Delphi, breathing the future from the navel of the world. She held it after her mother Gaia and before Apollo took it by gift or by conquest — the second prophetess of the most sacred site in Greece.\n\nAs Zeus\'s trusted counselor she became his second consort and bore the Horae, the Seasons who open and close heaven\'s gates, and in some tellings the Fates themselves — so that order, timeliness, and destiny are all her daughters. It was Themis who warned Zeus that the child of Thetis would be greater than its father, a prophecy that saved Olympus by ensuring Thetis was married to a mortal instead.\n\nWhen the gods gather in assembly, it is Themis who calls them to order: the quiet keeper of the rules that even heaven agrees to keep. She does not punish — that is Nemesis\'s work. She merely sets the boundary and waits.",
    beats: [
      { label: "The Deeper Rule", weight: 0.85,
        text: "Themis is the Titaness of divine law and right order — not the written statutes of cities but the older, deeper rule beneath them: custom, fairness, the way things are properly done between gods and men." },
      { label: "The Undefeated Titan", weight: 0.65, figures: ['zeus'],
        text: "She was never overthrown because she was never on the wrong side — she fought with justice, which happened to be with Zeus. She is like a constitution that survives a revolution." },
      { label: "Oracle Before Apollo", weight: 0.9, figures: ['apollo', 'gaia'],
        text: "Before Apollo ever held it, it was Themis who spoke the oracles at Delphi. She held it after her mother Gaia — the second prophetess of the most sacred site in Greece." },
      { label: "Mother of Order", weight: 1, figures: ['moirai'],
        text: "She bore the Horae, the Seasons who open and close heaven\'s gates, and in some tellings the Fates themselves — so that order, timeliness, and destiny are all her daughters." },
      { label: "The Warning About Thetis", weight: 0.8, figures: ['thetis'],
        text: "It was Themis who warned Zeus that the child of Thetis would be greater than its father — a prophecy that saved Olympus by ensuring Thetis was married to a mortal instead." },
      { label: "Keeper of the Assembly", weight: 0.6,
        text: "When the gods gather, it is Themis who calls them to order. She does not punish — that is Nemesis\'s work. She merely sets the boundary and waits." },
    ],
    source: "Hesiod, Theogony."
  },
  metis: {
    story: "Metis is deep cunning given a face — an Oceanid whose name is the very word for the shrewd and supple wisdom that loosens what cannot be untied. She was the first power Zeus turned to and the first he loved; it was her counsel that brewed the draught which made Cronus disgorge the children he had swallowed.\n\nShe is the Oceanid of practical intelligence — not brute knowledge but the nimble, adaptive kind: the trick, the stratagem, the way around the wall. Odysseus, centuries later, would be her spiritual heir, though he did not know it. The Greeks prized this quality — metis — above raw strength, and they gave it a goddess\'s face.\n\nBut it was foretold that Metis would bear children mightier than their father — first a daughter of equal mind, then a son who would cast Zeus down as Zeus had cast down his own. So the new king, having learned the old lesson well, coaxed her small with soft words and swallowed her whole, taking her wisdom inside himself for good.\n\nIt was the mirror of his father\'s crime — Cronus had swallowed his children, and now Zeus swallowed his wife. But where Cronus acted from blind fear, Zeus acted from cunning: he did not destroy Metis but incorporated her, so that from within him she counsels him still, whispering strategy in the dark behind his eyes.\n\nWhen her time came the child was not lost but born from his own splitting skull — Athena, leaping out full-grown and armored, carrying her mother\'s grey unsleeping mind. The son who would have overthrown him was never conceived. The daughter was enough: wisdom without the prophecy\'s price.",
    beats: [
      { label: "Cunning Given a Face", weight: 0.8, figures: ['cronus'],
        text: "Metis is deep cunning given a face — the shrewd and supple wisdom that loosens what cannot be untied. It was her counsel that brewed the draught which made Cronus disgorge the children he had swallowed." },
      { label: "The Greek Art", weight: 0.6, figures: ['odysseus'],
        text: "She is the Oceanid of practical intelligence — the trick, the stratagem, the way around the wall. The Greeks prized this quality above raw strength, and they gave it a goddess\'s face." },
      { label: "The Dread Prophecy", weight: 0.85, figures: ['zeus'],
        text: "It was foretold that Metis would bear children mightier than their father — first a daughter, then a son who would cast Zeus down as Zeus had cast down his own." },
      { label: "Swallowed Whole", weight: 1,
        text: "Zeus coaxed her small with soft words and swallowed her whole — the mirror of his father\'s crime. But where Cronus acted from blind fear, Zeus acted from cunning: he did not destroy Metis but incorporated her." },
      { label: "The Voice Behind His Eyes", weight: 0.7,
        text: "From within him she counsels him still, whispering strategy in the dark behind his eyes. The son who would have overthrown him was never conceived." },
      { label: "Born from the Skull", weight: 0.9, figures: ['athena'],
        text: "When her time came the child was born from his own splitting skull — Athena, leaping out full-grown and armored, carrying her mother\'s grey unsleeping mind. Wisdom without the prophecy\'s price." },
    ],
    source: "Hesiod, Theogony."
  },
  prometheus: {
    story: "Prometheus — his name means \'forethought\' — was the son of the Titan Iapetus and the wisest of the elder gods. While his brothers warred or shouldered the sky, he turned his quick mind toward the shivering, short-lived creatures of the dust — humankind — and could not bear to leave them naked in the cold.\n\nSome say it was Prometheus who shaped the first men from river-clay, moulding them upright so they would look at the stars instead of the ground, breathing into them a spark of divine reason. Whether he made them or merely pitied them, he became their champion, and the price of that love would be terrible.\n\nAt the great feast of Mekone, where gods and mortals sat together for the last time, he divided a slaughtered ox in two: good meat hidden beneath the stomach-lining, bare bones dressed in glistening fat. Zeus chose the gleam and took the bones, and the pattern of sacrifice was set forever. Zeus, who does not forgive a trick, hid fire away from the world in revenge.\n\nBut Prometheus stole it back, carrying a live ember down from heaven in the pith of a hollow fennel-stalk. With fire came everything — warmth, the forge, the lit hearth around which language and law could grow. For that theft Zeus had him chained to a crag in the Caucasus, where each dawn a great eagle tore out his liver, and each night it grew whole again — an agony built to have no ending.\n\nNor was Zeus satisfied with punishing the thief alone. He sent Pandora down to Prometheus\'s trusting brother Epimetheus, bearing a sealed jar. When the lid was lifted, every sorrow men had never known came swarming into the world — and only blind Hope remained beneath the rim.\n\nSo Prometheus hung for an age of the world, until Heracles passed beneath the cliff, saw the eagle descending, and shot it out of the sky. He struck the chains from the Titan\'s wrists, and Prometheus stood upright again at last — scarred but unbroken, the friend of mortals who had given men everything and asked for nothing in return.",
    beats: [
      { label: "Son of Iapetus", weight: 0.7, figures: ['iapetus'],
        text: "Prometheus was the son of the Titan Iapetus and the wisest of all the elder gods — his name means \'forethought,\' the one who could see what was coming before it arrived." },
      { label: "Shaper of Mankind", weight: 0.8,
        text: "Some say it was Prometheus himself who shaped the first men from river-clay, moulding them upright so they would look at the stars instead of the ground, breathing into them a spark of the divine reason that only the gods had known." },
      { label: "The Trick at Mekone", weight: 0.85, figures: ['zeus'],
        text: "At the great feast of Mekone he divided a slaughtered ox in two: good meat hidden beneath the stomach-lining, bare bones dressed in glistening fat. Zeus chose the gleam and took the bones — and the pattern of sacrifice was set forever." },
      { label: "The Stolen Fire", weight: 1, figures: ['zeus'],
        text: "When Zeus hid fire away in revenge, Prometheus stole it back, carrying a single live ember down from heaven in the pith of a hollow fennel-stalk. With fire came everything — warmth, the forge, the lit hearth around which language and law could grow." },
      { label: "The Eagle and the Crag", weight: 0.95, figures: ['caucasian_eagle'],
        text: "Zeus had him chained to a crag high in the Caucasus, where each dawn a great eagle descended to tear out his liver, and each night it grew whole again — an agony built to have no ending." },
      { label: "Pandora\'s Jar", weight: 0.8, figures: ['epimetheus'],
        text: "Nor was Zeus satisfied with punishing the thief alone. He sent Pandora to the trusting Epimetheus, and when her jar was opened every sorrow men had never known came swarming into the world — and only blind Hope remained beneath the rim." },
      { label: "The Arrow of Heracles", weight: 0.75, figures: ['heracles'],
        text: "Heracles passed beneath the cliff, saw the eagle descending, and shot it out of the sky. He struck the chains from the Titan\'s wrists, and Prometheus stood upright again at last — the friend of mortals, scarred but unbroken." },
    ],
    source: "Hesiod, Theogony; Works and Days; Aeschylus, Prometheus Bound."
  },
  atlas: {
    story: "Atlas is endurance turned to stone — a Titan of immense and patient strength who stands at the western rim of the world, where the day goes down, and bears upon his neck and unwearying arms the whole weight of the heavens. He is the son of Iapetus and the brother of Prometheus, and where Prometheus suffered for his cleverness, Atlas suffers for his strength.\n\nWhen the Titans rose against the young Olympians and were broken, Zeus did not cast Atlas into the pit with the others. He gave him instead a punishment shaped exactly like the crime: since the Titans had reached up to seize heaven, Atlas would hold heaven up — forever, alone, never once setting it down.\n\nOnly a single time was the burden ever shifted from him, when Heracles came seeking the golden apples of the Hesperides. Atlas alone knew where the garden lay, so Heracles took the sky onto his own shoulders while the Titan fetched the fruit. But when Atlas returned with the apples, he tasted for one moment what it was to stand up straight — and had no intention of stooping back. Heracles had to trick him: \'Let me just shift the weight on my shoulders,\' he said, and when Atlas lifted it for a moment, Heracles walked away.\n\nIn another telling, Perseus passed by Atlas and, when the Titan refused him hospitality, showed him the head of Medusa. Atlas turned to stone — becoming the mountain range that bears his name in North Africa, his back and shoulders becoming the ridges, the heavens resting upon the peaks. The Greeks knew he was there. They could see his mountains. He is still holding.",
    beats: [
      { label: "Endurance Turned to Stone", weight: 0.85, figures: ['iapetus', 'prometheus'],
        text: "Atlas is endurance turned to stone — a Titan who stands at the western rim of the world bearing the whole weight of the heavens. He is the brother of Prometheus: where Prometheus suffered for his cleverness, Atlas suffers for his strength." },
      { label: "A Punishment Like the Crime", weight: 0.9, figures: ['zeus'],
        text: "Zeus did not cast Atlas into the pit with the others. He gave him a punishment shaped exactly like the crime: since the Titans had reached up to seize heaven, Atlas would hold heaven up — forever, alone." },
      { label: "The Golden Apples", weight: 1, figures: ['heracles'],
        text: "Heracles came seeking the golden apples of the Hesperides. Atlas alone knew the garden, so Heracles took the sky while the Titan fetched the fruit. When Atlas returned, he had to be tricked into stooping back beneath the weight." },
      { label: "The Gorgon\'s Gaze", weight: 0.75, figures: ['perseus', 'medusa'],
        text: "In another telling, Perseus showed him the head of Medusa and Atlas turned to stone — becoming the mountain range that bears his name, his back and shoulders becoming the ridges, the heavens resting upon the peaks." },
      { label: "Still Holding", weight: 0.6,
        text: "The Greeks knew he was there. They could see his mountains in North Africa. He is still holding." },
    ],
    source: "Hesiod, Theogony."
  },
  helios: {
    story: "Helios is the Sun made flesh — the unwearying god who climbs each dawn into a chariot of fire drawn by four white horses and drives the burning day from the eastern gates to the western sea. From that height nothing is hidden from him; he is the great witness of the world, who sees every deed done beneath the light.\n\nEach evening his horses plunge into the western ocean, and Helios floats back to the east in an enormous golden cup, sailing through the dark stream of Oceanus while the world sleeps, ready to rise and begin again. He keeps the sacred cattle on the island of Thrinacia — immortal herds that must never be touched, a test that Odysseus\'s men would fail.\n\nIt was Helios who caught Aphrodite in the arms of Ares and carried the tale to her husband, and Helios who told grieving Demeter that Hades had taken her daughter down into the dark. He sees everything and reports it without mercy — the sun has no shadows of its own.\n\nBut his own clear seeing brought him the deepest sorrow of all. When his mortal son Phaethon begged to drive the sun-chariot for a single day, the boy could not hold the horses, scorched the green earth black from sky to sea, and had to be struck dead by Zeus\'s thunderbolt to save the world — and the father who sees all things could do nothing but watch his child fall, burning, into the river Eridanus. His sisters, the Heliades, wept amber tears beside that river until the gods, pitying them, turned them into poplar trees.",
    beats: [
      { label: "The Great Witness", weight: 0.85,
        text: "Helios is the Sun made flesh — the unwearying god who drives the burning day from the eastern gates to the western sea. From that height nothing is hidden from him; he is the great witness of the world." },
      { label: "The Golden Cup", weight: 0.6, figures: ['oceanus'],
        text: "Each evening his horses plunge into the western ocean, and Helios floats back to the east in an enormous golden cup, sailing through the dark stream of Oceanus while the world sleeps." },
      { label: "Teller of Truths", weight: 0.7, figures: ['aphrodite', 'ares', 'demeter'],
        text: "It was Helios who caught Aphrodite in the arms of Ares and told her husband, and Helios who told grieving Demeter that Hades had taken Persephone. The sun has no shadows of its own." },
      { label: "The Sacred Cattle", weight: 0.55, figures: ['odysseus'],
        text: "He keeps the sacred cattle on Thrinacia — immortal herds that must never be touched, a test that Odysseus\'s men would fail." },
      { label: "The Fall of Phaethon", weight: 1, figures: ['phaethon', 'zeus'],
        text: "When his son Phaethon begged to drive the sun-chariot, the boy could not hold the horses, scorched the earth black, and was struck dead by thunderbolt. The father who sees all things could do nothing but watch his child fall." },
      { label: "Amber Tears", weight: 0.7,
        text: "His sisters, the Heliades, wept amber tears beside the river Eridanus until the gods turned them into poplar trees — and even as trees, their tears still fell as amber." },
    ],
    source: "Hesiod, Theogony; Ovid, Metamorphoses II. Further reading: Ted Hughes, Tales from Ovid."
  },
  selene: {
    story: "Selene is the Moon herself, a calm-browed goddess crowned with a thin bright crescent, who rises when her brother the Sun lies down and rides her silver car across the dark, drawing the tides and the dreams of sleepers softly after her. She is the daughter of Hyperion and Theia, the middle light between her brother\'s blaze and her sister Eos\'s dawn-blush.\n\nThe poets describe her in a chariot drawn by two white horses — or sometimes by oxen, their horns curving like the crescent she wears. She is silver where her brother is gold, cool where he is burning, and her light is the kind that lets you see without being seen — the accomplice of lovers and thieves.\n\nHer one great story is a long and tender ache. She looked down one night upon Endymion, a shepherd asleep on a Carian hillside, and loved him past all reason — and rather than watch him grow old and die as mortal men must, she begged Zeus that he be granted an endless sleep, ageless and unbroken. Some say it was Endymion himself who chose eternal sleep over mortality; others that Zeus put him to sleep to punish his ambition, for the boy had dared to desire Hera.\n\nHowever it happened, he lies forever young in his cave on Mount Latmos, breathing slow, and forever the Moon comes down through the dark to bend over him and gaze — loving a man who will never once wake to know that he is loved. They say she bore him fifty daughters in his sleep, one for each lunar month of the four-year Olympiad.",
    beats: [
      { label: "The Silver Car", weight: 0.75, figures: ['helios', 'eos'],
        text: "Selene is the Moon herself, crowned with a thin bright crescent, who rises when her brother the Sun lies down. She is silver where he is gold, cool where he is burning — the middle light between blaze and dawn-blush." },
      { label: "The Accomplice of Lovers", weight: 0.55,
        text: "Her light is the kind that lets you see without being seen — the accomplice of lovers and thieves. The poets describe her in a chariot drawn by two white horses, their horns curving like her crescent." },
      { label: "Love Past All Reason", weight: 1, figures: ['zeus'],
        text: "She looked down one night upon Endymion, a shepherd asleep on a Carian hillside, and loved him past all reason — and begged Zeus that he be granted an endless sleep, ageless and unbroken." },
      { label: "The Sleeper Who Never Wakes", weight: 0.85,
        text: "He lies forever young in his cave on Mount Latmos, breathing slow, and forever the Moon comes down to bend over him and gaze — loving a man who will never once wake to know that he is loved." },
      { label: "Fifty Daughters", weight: 0.6,
        text: "They say she bore him fifty daughters in his sleep, one for each lunar month of the four-year Olympiad — the moon\'s own quiet multiplication." },
    ],
    source: "Hesiod, Theogony."
  },
  eos: {
    story: "Eos is the Dawn — rosy-fingered, saffron-robed, the goddess who throws open the gates of the east each morning so that her brother the Sun may follow her out. She is lovely and restless, forever falling in love with mortal men and bearing them away into the bright unfolding edge of the day.\n\nAphrodite cursed her with this endless hunger for mortals, in revenge for the time Eos lay with Ares. Since then the Dawn cannot help herself — she seized the hunter Orion, the giant Cephalus, the young Cleitus. Each time she snatched a beautiful man and carried him off to her palace at the edge of the sky, and each time the affair ended in grief, because mortal men break.\n\nHer deepest sorrow was Tithonus, a Trojan prince she loved enough to beg Zeus for his immortality. It was done. But Eos in her longing had forgotten to ask also for his unfading youth — and so her lover could not die and yet could not stay young. He withered and shrank and dried, year upon slow year, his hair going white, his limbs folding in on themselves, until at last there was nothing left of him but a thin, ceaseless voice; and pity, they say, shrank that voice into the cicada, which sings on through every summer in the heat of her brother\'s light.\n\nShe bore him two sons before the withering began: Memnon, king of the Ethiopians, who fought at Troy and was killed by Achilles. Eos wept for Memnon so fiercely that her tears became the morning dew — and every dawn, they say, she weeps again. The rosy fingers are beautiful, but they are also wet.",
    beats: [
      { label: "Rosy-Fingered Dawn", weight: 0.8, figures: ['helios'],
        text: "Eos is the Dawn — rosy-fingered, saffron-robed, the goddess who throws open the gates of the east each morning so that her brother the Sun may follow her out." },
      { label: "Aphrodite\'s Curse", weight: 0.7, figures: ['aphrodite', 'ares'],
        text: "Aphrodite cursed her with endless hunger for mortals, in revenge for the time Eos lay with Ares. Since then the Dawn cannot help herself — she seized Orion, Cephalus, Cleitus, each time carrying a beautiful man to her palace at the sky\'s edge." },
      { label: "A Gift Granted in Haste", weight: 1, figures: ['zeus'],
        text: "Loving Tithonus, she begged Zeus to make him immortal, and it was done. But Eos had forgotten to ask also for his unfading youth — and so her lover could not die and yet could not stay young." },
      { label: "The Voice of the Cicada", weight: 0.85,
        text: "He withered year upon slow year until there was nothing left of him but a thin, ceaseless voice — and pity shrank that voice into the cicada, which sings on through every summer." },
      { label: "The Tears for Memnon", weight: 0.75,
        text: "Her son Memnon fought at Troy and was killed by Achilles. Eos wept so fiercely that her tears became the morning dew — and every dawn, they say, she weeps again. The rosy fingers are beautiful, but they are also wet." },
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
    story: "Athena is the grey-eyed goddess of wisdom, of just war and shrewd strategy, and of every disciplined craft from the loom to the shipwright's adze. Cool, clear, and undeceived, she is the mind that cuts through confusion — the patron of heroes who think before they strike.\n\nHer birth is among the strangest in all heaven. Zeus had swallowed her mother Metis, the Titaness of cunning, for fear of a prophecy that her children would surpass him; but the child grew within him all the same, a pressure behind the eyes that no nectar could ease. At last his skull cracked with an unbearable ache, and Hephaestus split it open with an axe. Out leapt Athena full-grown, sheathed in gleaming bronze, with a war-cry that rang across Olympus and shook the sea. Born of pure mind and never of a mother's body, she is wisdom that has known no childhood.\n\nWhen Poseidon contested her for the patronage of Athens, each god offered the city a gift: he struck the rock and a salt spring burst forth; she planted her spear and an olive tree rose, grey-green and enduring. The citizens chose the olive — and Poseidon never forgave them. She armed Perseus for his journey to the Gorgons, lending him her polished shield as a mirror so he could face Medusa without meeting her gaze, and she guided him to the Graeae who held the secret of the way. She stood at Odysseus's shoulder through every trial of his long voyage home, whispering patience when he wanted rage. Yet her protection carries a terrible price for those who offend her. When Poseidon violated Medusa in Athena's own temple, the goddess cursed the girl — turning her hair to serpents and her gaze to stone, punishing the victim for the crime committed on holy ground. When the mortal Arachne dared challenge her to a weaving contest and produced a tapestry equal to her own, Athena tore it apart and struck the girl until she hanged herself in shame — then, in cold pity, loosened her into the shape of the first spider, weaving forever. At Troy she was the fiercest champion of the Achaeans, and it was her cunning that whispered to Odysseus the idea of the wooden horse — the hollow trick that ended ten years of war in a single night of fire.",
    beats: [
      { label: "Born from the Skull", weight: 0.95, figures: ['zeus', 'metis'],
        text: "Zeus swallowed her mother Metis for fear of a prophecy; but the child grew within him until his skull cracked and Athena sprang forth full-grown in gleaming bronze, with a war-cry that shook the sea." },
      { label: "The Olive and the Spring", weight: 0.8, figures: ['poseidon'],
        text: "When Poseidon contested her for Athens, he struck the rock for a salt spring; she planted her spear and an olive tree rose, grey-green and enduring. The citizens chose the olive — and the sea-god never forgave them." },
      { label: "Arming Perseus", weight: 0.85, figures: ['perseus', 'medusa', 'graeae'],
        text: "She lent Perseus her polished shield as a mirror so he could face Medusa without meeting her gaze, and guided him to the Graeae who held the secret of the way." },
      { label: "Odysseus's Steady Hand", weight: 0.75, figures: ['odysseus'],
        text: "She stood at Odysseus's shoulder through every trial of his long voyage home, whispering patience when he wanted rage — the unseen mind behind the survivor." },
      { label: "The Weaver's Pride", weight: 0.9, figures: ['arachne'],
        text: "When the mortal Arachne produced a tapestry equal to her own, Athena tore it apart and struck the girl until she hanged herself — then, in cold pity, loosened her into the shape of the first spider, weaving forever." },
      { label: "Medusa's Curse", weight: 0.85, figures: ['medusa'],
        text: "When Poseidon violated Medusa in Athena's own temple, the goddess cursed the victim — turning her hair to serpents and her gaze to stone, punishing the girl for the crime committed on holy ground." },
      { label: "The Wooden Horse", weight: 1, figures: ['odysseus'],
        text: "At Troy she was the fiercest champion of the Achaeans, and it was her cunning that whispered to Odysseus the idea of the wooden horse — the hollow trick that ended ten years of war in a single night of fire." },
    ],
    source: "Hesiod, Theogony; Homer, Iliad & Odyssey; Ovid, Metamorphoses VI. Further reading: Ted Hughes, Tales from Ovid."
  },
  apollo: {
    story: "Apollo is the radiant god of light, music, healing, archery, and prophecy — the most luminous of the Olympians, whose lyre sets the order of the heavens and whose far-shooting bow brings both the plague and its cure. Twin of Artemis, son of Zeus and Leto, he is beauty and clarity made divine.\n\nHis mother Leto, heavy with the twins, wandered the earth in agony: no land would receive her for fear of Hera's wrath, until the tiny floating isle of Delos, itself unmoored and overlooked, offered its barren rock. There Artemis was born first and at once helped deliver her brother into the light. Newborn and scarcely four days grown, Apollo came to Delphi and slew the great earth-serpent Python that coiled about the oracle, claiming the navel of the world for his own voice; ever after, his priestess breathed the future from that place.\n\nYet for all his brilliance the god is strangely luckless in love. Having mocked little Eros, he was struck with an arrow of helpless longing and pursued the nymph Daphne through the woods until, at the very edge of her strength, she begged the earth to save her and turned to laurel in his arms — bark closing over her heart as he embraced it. His pride could be merciless too: when the satyr Marsyas challenged him to a contest of music, flute against lyre, Apollo won the judgment and flayed his rival alive, hanging the skin from a pine as a warning to all who would match a god. When Zeus struck down his son Asclepius for raising the dead, Apollo killed the Cyclopes who had forged the thunderbolt in revenge; for that crime he was stripped of divinity and made to serve as a common shepherd to King Admetus — the radiant god brought low among the bleating flocks. With Poseidon he labored to build the great walls of Troy for King Laomedon, and when the king refused their payment, Apollo loosed a plague upon the city — a grudge the god carried all the way to the Trojan War. Through it all he remained the patron of the Muses and the keeper of the lyre, the voice of order and the music that holds the spheres in their courses — the god who could not be loved in return, yet whose song makes the whole world want to listen.",
    beats: [
      { label: "Born on Delos", weight: 0.8, figures: ['leto', 'artemis'],
        text: "No land would receive his mother Leto for fear of Hera's wrath, until the tiny floating isle of Delos offered its barren rock. Artemis was born first and at once helped deliver her twin into the light." },
      { label: "The Serpent at Delphi", weight: 0.9,
        text: "Newborn and scarcely four days grown, he came to Delphi and slew the great earth-serpent Python that coiled about the oracle, claiming the navel of the world for his own voice." },
      { label: "Laurel in His Arms", weight: 0.95, figures: ['eros', 'daphne'],
        text: "Having mocked little Eros, he was struck with an arrow of helpless longing and pursued the nymph Daphne until she begged the earth to save her and turned to laurel in his arms — bark closing over her heart as he embraced it." },
      { label: "The Flaying of Marsyas", weight: 0.85,
        text: "When the satyr Marsyas challenged him to a contest of music, flute against lyre, Apollo won and flayed his rival alive, hanging the skin from a pine as a warning to all who would match a god." },
      { label: "Shepherd to a King", weight: 0.8, figures: ['asclepius', 'zeus'],
        text: "When Zeus struck down Asclepius for raising the dead, Apollo killed the Cyclopes in revenge; for that crime he was stripped of divinity and made to serve as a common shepherd to King Admetus." },
      { label: "The Walls of Troy", weight: 0.75, figures: ['poseidon'],
        text: "With Poseidon he labored to build the great walls of Troy for King Laomedon, and when the king refused their payment, Apollo loosed a plague upon the city — a grudge he carried to the Trojan War." },
      { label: "Patron of the Muses", weight: 1, figures: ['muses'],
        text: "Through it all he remained the patron of the Muses and the keeper of the lyre, the voice of order and the music that holds the spheres in their courses — the god who could not be loved in return, yet whose song makes the whole world listen." },
    ],
    source: "Homeric Hymn to Apollo; Ovid, Metamorphoses I & VI; Apollodorus. Further reading: Ted Hughes, Tales from Ovid."
  },
  artemis: {
    story: "Artemis is the goddess of the hunt, the wild wood, the untrodden places, and the silver moon — twin sister of Apollo, born first on the barren rock of Delos and said to have turned at once, newborn herself, to help her own mother bring her brother into the light. She knew from the beginning what she was: at three years old, sitting on her father's knee, she asked Zeus for eternal virginity, the wild places of the earth for her domain, a pack of hounds, and a silver bow — and the lord of heaven, charmed, gave her everything she asked.\n\nSwift, chaste, and free, she runs the mountains with her band of nymphs and guards her solitude with a deadly arrow. Woe to any who trespass upon it. When the hunter Actaeon, lost in the forest, stumbled by pure chance upon the goddess bathing naked in a pool, she would suffer no man who had seen her so to live to speak of it; she flung the cold water in his face, and he felt antlers branch from his brow, his neck lengthen, his cry break into a stag's. His own hounds, no longer knowing their master, ran him down and tore him apart upon the leaves.\n\nHer one tenderness was the giant hunter Orion, who alone could match her stride across the hills. Some say Apollo, jealous of their closeness, tricked her: he pointed to a dark speck bobbing far out at sea and challenged her marksmanship, and her arrow found its mark before she knew whose head broke the waves. Others say a great scorpion stung Orion to death and both were set in the sky, hunter and hunter's bane wheeling forever opposite one another. Either way, the grief was real — the one companion she chose, taken by her own unerring hand or by the wilderness she loved.\n\nWith her brother Apollo she punished Queen Niobe, who had boasted of her fourteen children and mocked Leto for bearing only two. Apollo's arrows felled the seven sons; Artemis's, the seven daughters — and Niobe wept until the gods turned her to stone on a mountainside, a weeping rock that runs with water still. When the Greek fleet was becalmed at Aulis and the seer declared that Artemis demanded the sacrifice of Agamemnon's daughter Iphigenia, the girl was led to the altar — but at the stroke the goddess snatched her away and set a deer in her place, sparing the innocent while keeping the price. Such is Artemis: tender to the young and the wild, protector of girls on the threshold of womanhood, and utterly without mercy toward whatever lays a hand on what is hers.",
    beats: [
      { label: "Firstborn on Delos", weight: 0.8, figures: ['apollo', 'leto'],
        text: "Born first on the barren rock of Delos, the newborn Artemis turned at once to help her own mother bring her twin brother into the light — midwife before she was a day old." },
      { label: "The Child's Wish", weight: 0.75, figures: ['zeus'],
        text: "At three years old she sat on her father's knee and asked Zeus for eternal virginity, the wild places of the earth, a pack of hounds, and a silver bow — and the lord of heaven, charmed, gave her everything." },
      { label: "Actaeon's Doom", weight: 0.9,
        text: "When the hunter Actaeon stumbled upon the goddess bathing, she flung cold water in his face; antlers branched from his brow, his cry broke into a stag's, and his own hounds tore him apart upon the leaves." },
      { label: "The Loss of Orion", weight: 1, figures: ['apollo'],
        text: "Her one tenderness was the giant hunter Orion. Apollo, jealous of their closeness, tricked her into shooting a dark speck far out at sea — and her unerring arrow found Orion's head before she knew whose it was." },
      { label: "Niobe's Children", weight: 0.85, figures: ['apollo'],
        text: "When Queen Niobe mocked Leto for bearing only two children, Apollo's arrows felled the seven sons and Artemis's the seven daughters — and Niobe wept until the gods turned her to stone, a weeping rock that runs with water still." },
      { label: "The Deer at Aulis", weight: 0.9,
        text: "When the Greek fleet was becalmed at Aulis and Artemis demanded the sacrifice of Iphigenia, the girl was led to the altar — but at the stroke the goddess snatched her away and set a deer in her place, sparing the innocent while keeping the price." },
      { label: "Tender and Merciless", weight: 0.65,
        text: "Such is Artemis: tender to the young and the wild, protector of girls on the threshold, and utterly without mercy toward whatever lays a hand on what is hers." },
    ],
    source: "Homeric Hymn to Artemis; Callimachus, Hymn to Artemis; Ovid, Metamorphoses III & VI. Further reading: Ted Hughes, Tales from Ovid."
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
    story: "Aphrodite is the goddess of love, desire, and beauty — the irresistible power that bends gods and mortals alike, that raises cities up and pulls them down, that no will in heaven or earth can finally refuse. She was born of no mother, out of an act of violence turned somehow to beauty: when Cronus cut the manhood from his father Uranus and flung the severed flesh into the sea, a white foam gathered on the grey waves, and from that foam a goddess rose, already full-grown and smiling.\n\nThe West Wind carried her to Cyprus, where she stepped ashore on the wet sand and flowers broke open under her bare feet — roses and hyacinths, springing from nothing, as though the earth itself were blushing. The Seasons came to dress her and lead her up to Olympus, where every god turned to stare and every goddess felt, for one cold moment, the sting of being second.\n\nZeus married her to Hephaestus, the lame smith — the least likely husband for the most desired bride, a match meant to keep the peace. But the peace did not hold. Aphrodite took Ares, the god of war, into her bed, and Hephaestus, warned by Helios, forged a net of bronze links finer than spider-silk and caught them tangled together for all Olympus to see. The lovers were shamed, the gods laughed, and Aphrodite rose from the net unrepentant, her power not diminished by a single shade.\n\nIt was she who lit the fuse that burned Troy. When Paris, the Trojan prince, was asked to judge which goddess was fairest, Aphrodite promised him the most beautiful woman in the world — Helen of Sparta — and he chose her without hesitating. Helen was taken, the thousand ships were launched, and a city that had stood for generations became ash and memory, all for the promise of a face.\n\nYet she could be tender as well as terrible. On the fields before Troy she shielded her mortal son Aeneas with her own bright body, taking a spear-wound from Diomedes — ichor flowing, not blood — and carrying the boy to safety while the Greeks gaped at a goddess who would bleed for her child.\n\nHer one true grief was Adonis, the beautiful hunter she loved without art or advantage. When a wild boar gored him in the thicket, she ran barefoot through the thorns to reach him and held him as he died, and where his blood soaked the earth the first red anemones pushed through — flowers that open at the wind\'s touch and fall apart just as quickly, as brief and lovely as the boy himself.",
    beats: [
      { label: "Violence Birthing Beauty", weight: 0.9, figures: ['cronus'],
        text: "When Cronus flung the severed flesh of Uranus into the sea, a white foam gathered on the grey waves, and from that foam a goddess rose, already full-grown and smiling — beauty born from the cruelest of deeds." },
      { label: "Ashore on Cyprus", weight: 0.7,
        text: "The West Wind carried her to Cyprus, where she stepped ashore and flowers broke open under her bare feet — roses and hyacinths, springing from nothing, as though the earth itself were blushing." },
      { label: "The Unwilling Bride", weight: 0.75, figures: ['hephaestus'],
        text: "Zeus married her to Hephaestus, the lame smith — the least likely husband for the most desired bride, a match meant to keep the peace. But the peace did not hold." },
      { label: "The Bronze Net", weight: 0.85, figures: ['ares', 'hephaestus', 'helios'],
        text: "Aphrodite took Ares into her bed, and Hephaestus forged a net of bronze links finer than spider-silk and caught them tangled together for all Olympus to see. She rose from the net unrepentant, her power not diminished by a single shade." },
      { label: "The Judgement of Paris", weight: 1,
        text: "When Paris was asked to judge which goddess was fairest, Aphrodite promised him Helen of Sparta. He chose without hesitating, the thousand ships were launched, and Troy became ash and memory — all for the promise of a face." },
      { label: "A Goddess Who Would Bleed", weight: 0.8, figures: ['athena'],
        text: "On the fields before Troy she shielded her mortal son Aeneas with her own bright body, taking a spear-wound from Diomedes — ichor flowing, not blood — a goddess who would bleed for her child." },
      { label: "Anemones for Adonis", weight: 0.9,
        text: "When a wild boar gored the beautiful Adonis, she ran barefoot through the thorns and held him as he died. Where his blood soaked the earth the first red anemones pushed through — as brief and lovely as the boy himself." },
    ],
    source: "Hesiod, Theogony; Homer, Iliad V; Ovid, Metamorphoses X."
  },
  hermes: {
    story: "Hermes is the quick-footed messenger of the gods, the patron of travelers and traders, of heralds and thieves and lucky finds, and the keeper of every boundary and crossroads. Wing-sandalled, bearing the herald\'s staff, he alone moves freely between Olympus, the green earth, and the silent country of the dead, whose souls he leads gently down at the close of their lives.\n\nHe was a trickster from the first hour of his life. Born at dawn in a cave on Mount Cyllene to Zeus and the shy nymph Maia, he did not wait even for nightfall to begin his mischief. Still in his cradle-cloth he found a tortoise at the cave mouth, hollowed the shell, strung it with ox-gut, and so invented the lyre — the first music the world had ever heard, drawn from a dead thing and a stolen sinew.\n\nBefore the sun had set he slipped out and drove off fifty head of Apollo\'s sacred cattle, walking them backward through the dust so that their hoof-prints pointed home instead of away. He hid them in a grotto, sacrificed two to the gods — the first burnt offering any immortal had ever made — and crept back to his cradle, pulling the blankets up and blinking innocently at the stars.\n\nApollo tracked the theft by divination, stormed into the cave, and dragged the infant before the throne of Zeus. Hermes lied beautifully, swore he had never even heard the word \'cattle,\' and when the gods could not help laughing, played the lyre so sweetly that Apollo\'s fury melted into longing. The sun god traded the whole stolen herd for the little instrument, and from that day the two were fast and inseparable friends.\n\nBut Hermes was given graver offices than charm. It fell to him to be the psychopomp — the escort of the newly dead, leading each soul gently from the light down into the dim country of Hades, the last kind face a mortal would ever see. He walks every road and crosses every border, and no gate in any world is closed to him.\n\nIt was Hermes whom Zeus sent to slay hundred-eyed Argus, the watchman Hera had set to guard the white heifer Io. He lulled each of those hundred eyes to sleep one by one with a story and the soft drone of his reed-pipe, then struck the giant\'s head from his shoulders and set Io free to wander the world again.\n\nAnd it was Hermes who met Odysseus on the shores of Circe\'s island and pressed into his hand the herb moly — white-flowered, black-rooted — the only charm that could break the enchantress\'s spell and keep a man\'s shape his own.",
    beats: [
      { label: "Born on Mount Cyllene", weight: 0.75, figures: ['zeus', 'maia'],
        text: "Born at dawn in a cave on Mount Cyllene to Zeus and the shy nymph Maia, Hermes did not wait even for nightfall to begin his mischief — the quickest god was restless from his very first breath." },
      { label: "The Tortoise-Shell Lyre", weight: 0.8,
        text: "Still in his cradle-cloth he found a tortoise at the cave mouth, hollowed the shell, strung it with ox-gut, and so invented the lyre — the first music the world had ever heard, drawn from a dead thing and a stolen sinew." },
      { label: "The Cattle Driven Backward", weight: 0.85, figures: ['apollo'],
        text: "Before the sun had set he slipped out and drove off fifty head of Apollo\'s sacred cattle, walking them backward through the dust so that their hoof-prints pointed home instead of away." },
      { label: "The Sweetest Liar on Olympus", weight: 1, figures: ['apollo', 'zeus'],
        text: "Dragged before Zeus, the infant lied beautifully and played the lyre so sweetly that Apollo\'s fury melted into longing. The sun god traded the whole stolen herd for the little instrument, and from that day the two were inseparable friends." },
      { label: "Escort of the Dead", weight: 0.9, figures: ['hades'],
        text: "It fell to him to be the psychopomp — the escort of the newly dead, leading each soul gently from the light down into the dim country of Hades, the last kind face a mortal would ever see." },
      { label: "The Slaying of Argus", weight: 0.85, figures: ['io', 'hera'],
        text: "Zeus sent him to slay hundred-eyed Argus, the watchman Hera had set to guard the white heifer Io. He lulled each of those hundred eyes to sleep one by one, then struck the giant\'s head from his shoulders and set Io free." },
      { label: "The Herb Moly", weight: 0.7, figures: ['odysseus', 'circe'],
        text: "On the shores of Circe\'s island he pressed into Odysseus\'s hand the herb moly — white-flowered, black-rooted — the only charm that could keep a man\'s shape his own against the enchantress\'s spell." },
    ],
    source: "Homeric Hymn to Hermes; Homer, Odyssey X; Ovid, Metamorphoses I."
  },
  dionysus: {
    story: "Dionysus is the god of the vine and of wine, of ecstasy and the theatre and the wild release that loosens the bound and ordered self — the one Olympian born of a mortal woman, the god who arrives from outside and changes whatever he touches. He carries joy and freedom in one hand and madness and ruin in the other, and offers either without warning.\n\nHis story begins with a trick and a burning. The princess Semele, daughter of Cadmus of Thebes, was loved by Zeus and carried his child; but jealous Hera came to her disguised as her old nurse and planted a seed of doubt — how could she be sure her lover was truly the king of the gods? Semele, persuaded, made Zeus swear on the Styx to grant her one wish, then asked to see him in his full divine splendor. Bound by the unbreakable oath, Zeus appeared as he truly was — thunder, lightning, and unbearable radiance — and Semele was burned to ash where she stood.\n\nBut the child survived. Zeus snatched the unborn god from the fire and sewed him into his own thigh, where the boy quickened and grew until the time came to be born a second time — the twice-born, dithyrambos, the only god to pass through death before he had drawn his first breath.\n\nHermes carried the infant in secret to the nymphs of Nysa, a valley hidden from Hera\'s jealous eye, and there among the vines and the wild ivy the young god grew, learning the art of the grape and the deep, loosening joy of wine. When he came of age he did not climb to Olympus but wandered instead across the wide world — through Phrygia and India and the islands of the sea — teaching mortals viticulture and the rites of his worship, gathering his wild procession of maenads and satyrs as he went.\n\nNot all welcomed him. A crew of Tyrrhenian pirates once seized the beautiful stranger on a lonely shore, meaning to sell him as a slave. But the mast burst into vine, ivy coiled the oars, the phantom shapes of lions and bears crowded the deck, and the god stood revealed, smiling, as the terrified sailors leapt overboard and were changed into dolphins the moment they touched the sea.\n\nThe worst refusal came from his mother\'s own city. Young King Pentheus of Thebes denied the new god, mocked his rites, and tried to chain his followers. Dionysus answered softly and without hurry: he drove the women of the city into an ecstatic frenzy on the mountainside, and when Pentheus crept up to spy on them, disguised but trembling, the Bacchae fell upon him and tore him limb from limb — his own mother Agave carrying his severed head home in triumph, believing it a lion\'s.\n\nYet the god who could destroy so completely could also redeem. In his last great act he descended to the underworld itself to find his mother Semele, whom he had never known in life. He faced the darkness, bargained with the lords of the dead, and brought her back up into the light, raising her to Olympus as the goddess Thyone — so that the son born from fire at last returned the gift of life to the woman who had burned for loving his father.",
    beats: [
      { label: "Semele\'s Burning", weight: 0.85, figures: ['semele', 'hera', 'zeus'],
        text: "The princess Semele was tricked by jealous Hera into begging Zeus to show himself in his full divine splendor. Bound by an oath on the Styx, Zeus appeared as he truly was — thunder, lightning, and unbearable radiance — and Semele was burned to ash where she stood." },
      { label: "The Twice-Born God", weight: 1, figures: ['zeus'],
        text: "Zeus snatched the unborn god from the fire and sewed him into his own thigh, where the boy quickened and grew until the time came to be born a second time — the only god to pass through death before he had drawn his first breath." },
      { label: "The Nymphs of Nysa", weight: 0.65, figures: ['hermes'],
        text: "Hermes carried the infant in secret to the nymphs of Nysa, a valley hidden from Hera\'s jealous eye, and there among the vines and the wild ivy the young god grew, learning the art of the grape and the deep, loosening joy of wine." },
      { label: "The Wandering Teacher", weight: 0.7,
        text: "He wandered across the wide world — through Phrygia and India and the islands of the sea — teaching mortals viticulture and gathering his wild procession of maenads and satyrs as he went." },
      { label: "The Pirates Transformed", weight: 0.8,
        text: "A crew of Tyrrhenian pirates seized the beautiful stranger, meaning to sell him as a slave. But the mast burst into vine, ivy coiled the oars, and the terrified sailors leapt overboard and were changed into dolphins the moment they touched the sea." },
      { label: "The Ruin of Pentheus", weight: 0.95,
        text: "King Pentheus of Thebes denied the new god and tried to cage his rites. Dionysus drove the women into frenzy, and Pentheus was torn apart by the Bacchae — his own mother Agave carrying his severed head home in triumph, believing it a lion\'s." },
      { label: "Semele Redeemed", weight: 0.9, figures: ['semele', 'hades'],
        text: "He descended to the underworld to find his mother, whom he had never known in life. He faced the darkness, brought her back into the light, and raised her to Olympus as the goddess Thyone — the son born from fire returning the gift of life to the woman who had burned." },
    ],
    source: "Ovid, Metamorphoses III; Euripides, Bacchae; Homeric Hymn to Dionysus. Further reading: Ted Hughes, Tales from Ovid."
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
    story: "Hecate is the goddess of the crossroads, of witchcraft and the moonless dark, of thresholds and the magic that gathers wherever one way gives onto another. Alone among the gods she holds a portion of power in all three realms at once — earth, sea, and sky — and passes freely between the living and the dead.\n\nWhen Zeus rose to power after the Titans' fall, he could have stripped her of her ancient honors, as he stripped so many others. Instead he confirmed them all — earth, sea, and starry sky — and added more besides: the nurse of the young, the giver of victories, the friend of those who ask. Hesiod says Zeus honored her above all, for she had stood with the Olympians in the great war, and her power was older than his own.\n\nTorch-bearing, and often shown with three faces turned to watch three roads at once, she is the lantern at every dangerous passage and the guide of all who must travel in the dark. It was Hecate who heard Persephone's cry as the earth swallowed her, and Hecate who walked before the lost maiden afterward with her two blazing torches, lighting the road between the upper world and the lower. So she became the close companion of the dead queen, lingering ever after at the boundary where one world ends and the next begins.\n\nAt every crossroads where three roads met, the Greeks left offerings to her on moonless nights — honey-cakes and garlic and the dark meat of dogs, set out at the threshold-place where choices are made and paths diverge. For Hecate watches the turnings, and what she sees in the dark, no daylight god can know.",
    beats: [
      { label: "Goddess of Crossroads", weight: 0.85,
        text: "Hecate is the goddess of the crossroads, of witchcraft and the moonless dark, of thresholds and the magic that gathers wherever one way gives onto another. Alone among the gods she holds a portion of power in all three realms at once — earth, sea, and sky." },
      { label: "Honored by Zeus", weight: 0.7, figures: ['zeus'],
        text: "When Zeus rose to power he could have stripped her of her ancient honors. Instead he confirmed them all and added more — the nurse of the young, the giver of victories. Her power was older than his own, and he knew it." },
      { label: "Three Faces Watching", weight: 0.7,
        text: "Torch-bearing, and often shown with three faces turned to watch three roads at once, she is the lantern at every dangerous passage and the guide of all who must travel in the dark." },
      { label: "The Cry in the Earth", weight: 1, figures: ['persephone'],
        text: "It was Hecate who heard Persephone\'s cry as the earth swallowed her, and Hecate who walked before the lost maiden afterward with her two blazing torches, lighting the road between the upper world and the lower." },
      { label: "Between the Worlds", weight: 0.75, figures: ['hades'],
        text: "So she became the close companion of the dead queen, lingering ever after at the boundary where one world ends and the next begins." },
      { label: "Offerings at the Crossroads", weight: 0.6,
        text: "At every crossroads where three roads met, the Greeks left offerings on moonless nights — honey-cakes and garlic and the dark meat of dogs, set out at the place where choices are made and paths diverge. What Hecate sees in the dark, no daylight god can know." },
    ],
    source: "Hesiod, Theogony."
  },
  erinyes: {
    story: "The Erinyes — the Furies — were born from blood and violence before the world had any law to answer them. When Cronus took up the jagged sickle and unmanned his father Uranus, the dark drops that fell upon the Earth quickened into three terrible daughters: Alecto the unceasing, Tisiphone the avenger of murder, and Megaera the jealous one. They are older than the Olympians, older than mercy, and they answer to no throne.\n\nSerpent-haired, black-winged, and weeping tears of blood, they rise from the dark whenever kindred blood is spilled or a sacred oath is broken. They do not judge — they pursue, with a patience that outlasts the turning of the world. No door can shut them out, no distance tire them; they follow the scent of guilt through the waking world and through dreams alike, and the man they hunt hears their whip-crack wings even in his sleep.\n\nOrestes, who slew his own mother Clytemnestra to avenge his murdered father, was hunted across Greece by their shrieking, sleepless wrath until Athena herself convened the first court of law in Athens to try his case. The jury of twelve Athenians split evenly, and it was Athena's own casting vote that acquitted him — the narrowest of margins between vengeance and justice.\n\nThere the Furies were persuaded — barely — to accept the verdict, and were given a new name: the Eumenides, the Kindly Ones, housed in a cavern beneath the Areopagus where they received offerings of dark wine and black sheep. But kindness is only the mask they agreed to wear. Beneath it they are still the oldest anger in the world, and what they hunt, they never stop hunting.",
    beats: [
      { label: "Born from Blood", weight: 0.9, figures: ['cronus', 'uranus'],
        text: "When Cronus took up the jagged sickle and unmanned his father Uranus, the dark drops that fell upon the Earth quickened into three terrible daughters: Alecto the unceasing, Tisiphone the avenger, and Megaera the jealous one. They are older than the Olympians, older than mercy." },
      { label: "The Sleepless Hunt", weight: 0.8,
        text: "Serpent-haired, black-winged, and weeping tears of blood, they rise from the dark whenever kindred blood is spilled or a sacred oath is broken. They do not judge — they pursue, with a patience that outlasts the turning of the world." },
      { label: "No Door Shuts Them Out", weight: 0.7,
        text: "No door can shut them out, no distance tire them; they follow the scent of guilt through the waking world and through dreams alike, and the man they hunt hears their whip-crack wings even in his sleep." },
      { label: "The Trial of Orestes", weight: 1, figures: ['athena'],
        text: "Orestes, who slew his own mother to avenge his murdered father, was hunted across Greece until Athena convened the first court of law in Athens. The jury split evenly, and it was Athena's own casting vote that acquitted him." },
      { label: "The Cavern Beneath Athens", weight: 0.65,
        text: "They were housed in a cavern beneath the Areopagus where they received offerings of dark wine and black sheep — ancient terrors given a home inside the walls of civilization." },
      { label: "The Kindly Ones", weight: 0.7,
        text: "They were given a new name: the Eumenides, the Kindly Ones. But kindness is only the mask they agreed to wear. Beneath it they are still the oldest anger in the world, and what they hunt, they never stop hunting." },
    ],
    source: "Hesiod, Theogony; Aeschylus, Eumenides."
  },

  // ---- MONSTERS ----
  typhon: {
    story: "Typhon is the last and most terrible child of the Earth — born of Gaia and the pit of Tartarus itself, the final desperate weapon hurled against the young order of heaven. He is chaos made monstrous flesh: a storm-giant so vast that his head scraped the dome of the stars and his outstretched arms touched the horizons east and west. A hundred serpent-heads burst from his shoulders, each hissing in the tongue of a different beast; fire streamed from his eyes; and when he roared, the whole sky flinched.\n\nGaia loosed him against the Olympians in her grief for the chained Titans, and when the gods first saw him coming they fled — every one of them — to Egypt, disguising themselves as animals in their terror. Only Zeus stood to meet him. Their first battle scorched the land and boiled the sea, but even the king of the gods was overmastered: Typhon pinned him, cut the sinews from his hands and feet, and hid the severed cords in a bearskin in a Cilician cave. It was Hermes the thief and goat-footed Pan who crept in and stole the sinews back, threading them into Zeus's limbs while the monster slept.\n\nRestored and raging, Zeus rose a second time. He drove Typhon across the sky with a storm of a hundred thunderbolts, each bolt a white scar on the dark, until the wounded giant staggered and fell. Zeus seized Mount Etna and hurled it down upon him like a lid slammed on a furnace. There Typhon lies pinned to this day, and his unspent fury still breaks from the mountain's peak in smoke and rivers of molten fire. Yet even in defeat he had seeded the world with terror, for with Echidna he fathered the brood of monsters that would haunt every hero's road — Cerberus, the Hydra, the Chimera, the Sphinx, and the Nemean Lion — chaos's children scattered across the earth like embers from a fire that refused to die.",
    beats: [
      { label: "Earth's Last Weapon", weight: 0.85, figures: ['gaia', 'tartarus'],
        text: "Gaia bore Typhon with Tartarus itself — the Earth's final desperate answer to the chaining of the Titans, a storm-giant vast enough to make heaven tremble." },
      { label: "A Hundred Serpent-Heads", weight: 0.7,
        text: "His head scraped the dome of the stars; a hundred serpent-heads burst from his shoulders, each hissing in the tongue of a different beast. Fire streamed from his eyes, and when he roared the whole sky flinched." },
      { label: "Zeus Overmastered", weight: 1.0, figures: ['zeus'],
        text: "Their first battle scorched the land and boiled the sea, but Typhon pinned the king of the gods, cut the sinews from his hands and feet, and hid the severed cords in a bearskin in a Cilician cave." },
      { label: "The Stolen Sinews", weight: 0.8, figures: ['hermes'],
        text: "It was Hermes the thief and goat-footed Pan who crept into the cave and stole the sinews back, threading them into Zeus's limbs while the monster slept." },
      { label: "A Hundred Thunderbolts", weight: 0.95, figures: ['zeus'],
        text: "Restored and raging, Zeus rose a second time and drove Typhon across the sky with a storm of a hundred thunderbolts, each bolt a white scar on the dark, until the wounded giant staggered and fell." },
      { label: "Beneath Mount Etna", weight: 0.75,
        text: "Zeus seized Mount Etna and hurled it down upon him like a lid slammed on a furnace. There Typhon lies pinned to this day, and his unspent fury still breaks from the peak in smoke and rivers of molten fire." },
      { label: "Father of Monsters", weight: 0.65, figures: ['echidna', 'cerberus', 'chimera', 'sphinx', 'nemean_lion'],
        text: "With Echidna he fathered the brood of monsters that would haunt every hero's road — Cerberus, the Hydra, the Chimera, the Sphinx, and the Nemean Lion — chaos's children scattered like embers from a fire that refused to die." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  echidna: {
    story: "Echidna is the Mother of Monsters — half a fair-cheeked woman with bright unblinking eyes, and half an enormous speckled serpent, coiling and glittering in a cavern deep beneath the earth. Deathless and ageless, she is the dark womb out of which nearly every great horror of the Greek world came crawling.\n\nDaughter of the ancient sea-gods Phorcys and Ceto, or in some tellings of Tartarus and Gaia themselves, she made her lair at the edge of the known world, in a cave where the light barely reached. The upper half of her — the woman's face, the quick bright eyes — could have passed for lovely; the lower half, the speckled serpent's coils, never let anyone forget what she was.\n\nIn her cave at the edge of things she took the storm-giant Typhon for her mate, and from that union came the whole brood the heroes were born to slay: the hound Cerberus that guards the gates of the dead, the many-headed Hydra of the marsh, the fire-breathing Chimera, the lion of Nemea, the riddling Sphinx, and the sleepless dragons that coil about the world's hidden treasures.\n\nSome say it was the hundred-eyed giant Argus Panoptes who finally found her sleeping and killed her — though she was called deathless, and deathless things do not die easily. She herself outlived them all in her lair, the patient source of the monsters — for however many of her children the heroes cut down, Echidna remained, waiting in the dark to bear more.",
    beats: [
      { label: "Woman and Serpent", weight: 0.8,
        text: "Echidna is the Mother of Monsters — half a fair-cheeked woman with bright unblinking eyes, and half an enormous speckled serpent, coiling and glittering in a cavern deep beneath the earth." },
      { label: "Daughter of the Deep", weight: 0.65, figures: ['phorcys', 'ceto'],
        text: "Daughter of the ancient sea-gods Phorcys and Ceto, she made her lair at the edge of the known world, in a cave where the light barely reached — the upper half lovely, the lower half serpent." },
      { label: "The Brood of Horrors", weight: 1.0, figures: ['typhon', 'cerberus', 'chimera', 'nemean_lion'],
        text: "She took the storm-giant Typhon for her mate, and from that union came the whole brood the heroes were born to slay: the hound Cerberus, the many-headed Hydra, the fire-breathing Chimera, the lion of Nemea, the riddling Sphinx." },
      { label: "Argus and the Deathless", weight: 0.7,
        text: "Some say it was the hundred-eyed giant Argus Panoptes who finally found her sleeping and killed her — though she was called deathless, and deathless things do not die easily." },
      { label: "The Patient Source", weight: 0.75,
        text: "She herself outlived them all in her lair, the patient source of the monsters — for however many of her children the heroes cut down, Echidna remained, waiting in the dark to bear more." },
    ],
    source: "Hesiod, Theogony."
  },
  medusa: {
    story: "Medusa was not always a monster. Before the serpents and the stone-turning gaze, she was a maiden of surpassing beauty — hair like dark water flowing, a face that drew suitors from every shore. Of the three Gorgon sisters she alone was mortal, and she alone had once been loved rather than feared.\n\nHer ruin began with Poseidon, who desired her and would not be refused. He took her by force in the marble temple of Athena, upon the cold floor before the goddess\'s own altar. Athena, outraged but unwilling to punish a fellow Olympian, turned her anger upon the girl instead — twisting Medusa\'s glorious hair into a nest of living serpents, hardening her face into a mask so terrible that any creature who met her eyes turned instantly to stone.\n\nDriven to the farthest rim of the world, past the country of the Graeae, Medusa dwelt on a desolate shore littered with the petrified shapes of men who had looked one moment too long. There she lived among her immortal sisters, a mortal exile in a kingdom of statues.\n\nIt was Perseus who was sent to end her. Armed by the gods — winged sandals from Hermes, a mirror-bright shield from Athena — he crept into the Gorgons\' lair while they slept and guided his blade by the reflection in polished bronze, never once meeting her eyes. As her head left her shoulders, two wonders sprang from the blood: the winged horse Pegasus, white and shining, and the golden warrior Chrysaor — beauty and valor leaping free of her ruin at the very last.\n\nEven in death her power did not fade. Perseus carried the head across the world, turning enemies to stone with a single unveiling, and at the last gave it to Athena, who set it upon her aegis. The face made monstrous as a punishment became the most terrible weapon in heaven\'s arsenal — and Medusa stares out from the center of Athena\'s armor still, powerful even in death.",
    beats: [
      { label: "The Beautiful Maiden", weight: 0.7, figures: ['gorgons'],
        text: "Before the serpents and the stone-turning gaze, Medusa was a maiden of surpassing beauty — hair like dark water flowing, a face that drew suitors from every shore. Of the three Gorgon sisters she alone was mortal." },
      { label: "Poseidon\'s Violation", weight: 0.85, figures: ['poseidon'],
        text: "The sea-god Poseidon desired her and would not be refused. He took her by force in the marble temple of Athena herself, coupling with her upon the cold floor before the goddess\'s own altar." },
      { label: "Athena\'s Curse", weight: 0.9, figures: ['athena'],
        text: "Athena turned her anger upon the girl. She twisted Medusa\'s glorious hair into a nest of living serpents and hardened her features into a mask of such terror that any creature who met her eyes was turned instantly to cold grey stone." },
      { label: "Exile at the World\'s Edge", weight: 0.65, figures: ['graeae'],
        text: "Driven to the farthest rim of the world, past the country of the Graeae, Medusa dwelt on a desolate shore littered with the petrified shapes of men who had looked one moment too long." },
      { label: "The Mirror Shield", weight: 1, figures: ['perseus', 'hermes', 'athena'],
        text: "Perseus crept into the Gorgons\' lair while they slept, guided his sword-stroke by the reflection in his polished bronze, never once meeting her eyes. The blade fell, and Medusa\'s long exile was over." },
      { label: "Pegasus and Chrysaor", weight: 0.8, figures: ['pegasus', 'chrysaor'],
        text: "As her head left her shoulders, two wonders sprang from the blood: the winged horse Pegasus, white and shining, and the golden warrior Chrysaor — beauty and valor leaping free of her ruin at the very last." },
      { label: "The Aegis of Athena", weight: 0.75, figures: ['athena'],
        text: "Perseus gave the head to Athena, who set it upon her aegis. The face that had been made monstrous as a punishment became the most terrible weapon in heaven\'s arsenal — powerful even in death, and perhaps more terrible than she ever was in life." },
    ],
    source: "Ovid, Metamorphoses IV; Apollodorus, Library. Further reading: Ted Hughes, Tales from Ovid."
  },
  scylla: {
    story: "Scylla is the six-headed terror of the narrow strait — a monster who haunts one cliff of a deadly channel and snatches sailors from the decks of passing ships, with six heads on long writhing necks, each mouth set with three rows of teeth, and a girdle of baying dogs about her waist. To pass beneath her is to lose six men and count yourself fortunate.\n\nBut she was not always so. Once Scylla was a lovely sea-nymph who bathed in a quiet cove, and her undoing came not from any fault of her own but from another's jealousy. The sea-god Glaucus loved her and was refused, and went to the sorceress Circe for a charm to win her — but Circe wanted Glaucus for herself, and turned her spite upon the girl instead. She poisoned the pool where Scylla bathed, and where the tainted water touched her the snarling dog-heads burst howling from her thighs.\n\nMaddened by the horror of her own body, the nymph became the monster of the rocks, devouring whatever the current carried close. When Odysseus threaded the narrow strait on Circe's own advice, he chose Scylla over the whirlpool Charybdis — knowing he would lose six men to her jaws rather than risk the whole ship — and she snatched them screaming from the deck, one per head, and ate them at the cliff's mouth while the rest rowed past in terror. It was the one stretch of his voyage where no cleverness could help: only the cold arithmetic of which loss was smaller.",
    beats: [
      { label: "The Lovely Nymph", weight: 0.7, figures: ['glaucus'],
        text: "Once Scylla was a lovely sea-nymph who bathed in a quiet cove. The sea-god Glaucus loved her and was refused, and went to the sorceress Circe for a charm to win her." },
      { label: "Circe's Poison", weight: 1.0, figures: ['circe'],
        text: "Circe wanted Glaucus for herself, and turned her spite upon the girl instead. She poisoned the pool where Scylla bathed, and where the tainted water touched her the snarling dog-heads burst howling from her thighs." },
      { label: "The Horror of Her Body", weight: 0.75,
        text: "Maddened by the horror of her own transformation, the nymph became the monster of the rocks — six heads on long writhing necks, each mouth set with three rows of teeth, and a girdle of baying dogs about her waist." },
      { label: "Odysseus's Cold Arithmetic", weight: 0.85, figures: ['odysseus', 'charybdis'],
        text: "When Odysseus threaded the strait on Circe's own advice, he chose Scylla over the whirlpool Charybdis — six men snatched screaming from the deck rather than the whole ship swallowed. The one stretch where no cleverness could help." },
      { label: "The Terror of the Strait", weight: 0.65, figures: ['charybdis'],
        text: "She haunts one cliff while Charybdis waits across the narrow water, so that the sailor who steers wide of the six-headed monster is swept toward the whirlpool, and there is no clean passage between them." },
    ],
    source: "Ovid, Metamorphoses XIII–XIV; Homer, Odyssey XII. Further reading: Ted Hughes, Tales from Ovid."
  },
  charybdis: {
    story: "Charybdis is the great devouring whirlpool that lurks across the narrow strait from Scylla — three times each day she swallows down the whole of the sea in a roaring black funnel, and three times she heaves it back up, and any ship caught above her throat is dragged down with it past all hope of saving.\n\nShe is appetite without restraint, given a permanent form. Some said she was once a daughter of Poseidon and Earth, so greedy that she stole the cattle of Heracles, and was struck by Zeus's thunderbolt into the sea to swallow and spew forever. Three times each day the water drains from the strait as though a plug has been pulled from the bottom of the world, and the bare seabed shows for a horrible instant before the ocean comes crashing back.\n\nHer especial terror is that she shares her strait with Scylla, so that the sailor who steers wide of the six-headed monster is swept toward the whirlpool, and there is no clean water between them. Odysseus survived her only by leaping for a wild fig-tree that overhung the vortex and clinging there while she sucked his raft down — then dropping back onto the timbers the moment she belched them up again. He hung from the tree, the poets say, like a bat, his arms aching, waiting for the sea to give back what it had swallowed — the loneliest moment in all the Odyssey.",
    beats: [
      { label: "Appetite Made Permanent", weight: 0.8, figures: ['zeus', 'poseidon'],
        text: "Some said she was once a daughter of Poseidon and Earth, so greedy that she stole the cattle of Heracles, and was struck by Zeus's thunderbolt into the sea to swallow and spew forever." },
      { label: "Three Times a Day", weight: 0.7,
        text: "Three times each day she swallows the whole sea in a roaring black funnel, and three times heaves it back — the bare seabed shows for a horrible instant before the ocean comes crashing back." },
      { label: "No Clean Water", weight: 0.75, figures: ['scylla'],
        text: "Her especial terror is that she shares her strait with Scylla, so that the sailor who steers wide of the six-headed monster is swept toward the whirlpool, and there is no clean water between them." },
      { label: "The Fig-Tree Above the Vortex", weight: 1.0, figures: ['odysseus'],
        text: "Odysseus survived by leaping for a wild fig-tree that overhung the vortex and clinging there while she sucked his raft down — then dropping back onto the timbers the moment she belched them up again." },
      { label: "Hanging Like a Bat", weight: 0.65,
        text: "He hung from the tree like a bat, his arms aching, waiting for the sea to give back what it had swallowed — the loneliest moment in all the Odyssey." },
    ],
    source: "Homer, Odyssey XII."
  },
  cerberus: {
    story: "Cerberus is the hound of Hades, the three-headed dog with a mane of serpents and a dragon's tail who keeps the gate of the underworld. He is the threshold turned monstrous — fawning and gentle upon the souls who come down to the dead, but tearing apart any who would climb back out toward the light.\n\nA child of Echidna and Typhon, brother to the Hydra and the Chimera, he was set to guard the one door that should only ever open inward. Hesiod gives him fifty heads; the poets who came later settled on three, but all agreed on the serpent mane that hissed and writhed about his necks, and the tail that was a living dragon.\n\nTo drag him up alive into the daylight was the last and most dreadful of the twelve labors laid upon Heracles. The hero went down into the country of the dead and found the beast, and Hades granted him the hound on one condition: that he master it with his bare hands and no weapon. So Heracles seized the three-throated dog and wrestled it into submission, hauled it up the long dark road for the living to see — and the sunlight, touching Cerberus for the first time, made him foam at the mouth; where the foam fell, the poets say, the poisonous plant aconite sprang up from the earth.\n\nThen, the labor done, Heracles led the bewildered guardian back down to its post at the gate of the dead. Others found gentler ways past him: the Sibyl who guided Aeneas tossed the hound a honey-cake drugged with poppy, and Orpheus lulled all three heads with his lyre. But the gate never went unguarded for long.",
    beats: [
      { label: "Guardian of the Gate", weight: 0.85, figures: ['echidna', 'typhon'],
        text: "A child of Echidna and Typhon, Cerberus is the three-headed hound with a mane of serpents who keeps the gate of the underworld — fawning upon the souls who come down, but tearing apart any who would climb back toward the light." },
      { label: "The Serpent Mane", weight: 0.65,
        text: "Hesiod gives him fifty heads; the later poets settled on three, but all agreed on the serpent mane hissing about his necks and the tail that was a living dragon." },
      { label: "Bare Hands Only", weight: 1.0, figures: ['heracles', 'hades'],
        text: "Hades granted Heracles the hound on one condition: that he master it with his bare hands and no weapon. So the hero seized the three-throated dog and wrestled it into submission." },
      { label: "Aconite from Foam", weight: 0.7,
        text: "The sunlight, touching Cerberus for the first time, made him foam at the mouth; where the foam fell, the poets say, the poisonous plant aconite sprang up from the earth." },
      { label: "Returned to His Post", weight: 0.6,
        text: "The labor done, Heracles led the bewildered guardian back down to its post. Others found gentler ways past him — the Sibyl tossed him a drugged honey-cake, Orpheus lulled all three heads with his lyre — but the gate never went unguarded for long." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library; Virgil, Aeneid VI."
  },
  lernaean_hydra: {
    story: "The Lernaean Hydra was a many-headed water-serpent that lurked in the bottomless swamps of Lerna, its body a nest of writhing necks with one head among them immortal — and its breath and blood so venomous that even its scent could kill. Worst of all was its terrible gift: for every head a sword struck off, two more grew at once from the stump, so that to fight it in the ordinary way was only to multiply it.\n\nA child of Typhon and Echidna, raised by Hera for the express purpose of destroying Heracles, it haunted the spring of Amymone near the lake at Lerna, a place where the bottomless swamp gave onto the very entrance to the underworld. Even the ground around its den was fatal — any creature that so much as breathed its breath or stepped in its tracks fell dead.\n\nIt was the hero's second labor. He learned its secret the hard way, watching the heads double back under his blade — until his nephew Iolaus caught up a torch, and the two worked as one: Heracles severing each neck, Iolaus searing the raw stump with fire before it could sprout anew. Hera sent a giant crab to pinch at the hero's feet while he fought, but he crushed it underfoot and kept on cutting.\n\nThe single immortal head he buried, still hissing, beneath a great rock; and in the Hydra's gall he dipped his arrows, making a poison so deadly that it would one day, by a long and winding fate, become the death of Heracles himself. But King Eurystheus refused to count the labor, since Heracles had needed help — the earliest known technicality, applied to the most desperate of fights.",
    beats: [
      { label: "The Multiplying Horror", weight: 0.85, figures: ['typhon', 'echidna'],
        text: "A child of Typhon and Echidna, the Hydra lurked in the bottomless swamps of Lerna — for every head a sword struck off, two more grew at once from the stump, so that to fight it was only to multiply it." },
      { label: "Hera's Design", weight: 0.7, figures: ['hera'],
        text: "Raised by Hera for the express purpose of destroying Heracles, it haunted the spring near the lake at Lerna, a place where the bottomless swamp gave onto the entrance to the underworld. Even the ground around its den was fatal." },
      { label: "Sword and Torch", weight: 1.0, figures: ['heracles'],
        text: "Heracles learned its secret the hard way — until his nephew Iolaus caught up a torch, and the two worked as one: severing each neck and searing the stump with fire before it could sprout anew." },
      { label: "The Crab Underfoot", weight: 0.6, figures: ['hera'],
        text: "Hera sent a giant crab to pinch at the hero's feet while he fought, but he crushed it underfoot and kept on cutting." },
      { label: "The Poisoned Arrows", weight: 0.75,
        text: "The immortal head he buried still hissing beneath a rock; and in the Hydra's gall he dipped his arrows, making a poison so deadly it would one day become the death of Heracles himself. Eurystheus refused to count the labor — the earliest known technicality." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  chimera: {
    story: "The Chimera is an impossibility given breath — a single beast made of three, with the head and forequarters of a lion, a second head of a goat rising from the middle of its back, and a serpent for a tail. From its lion's jaws it breathed living fire, and it ravaged the land of Lycia until nothing could stand against it.\n\nIt was one of the dread children of Echidna and Typhon, kin to the Hydra and the hound of hell. Homer calls it 'a thing of immortal make, not human' — something that should never have been able to exist, yet moved through the world with terrible speed, setting the hills ablaze and scattering whole armies. The king of Lycia sent warrior after warrior against it, and each one was burned before he could close.\n\nNo man on foot could come near its flames and live — until the hero Bellerophon was sent against it on the winged horse Pegasus. Riding high above the fire, he drove a lump of lead fixed to his spear-point into the creature's open mouth; the monster's own burning breath melted the metal, and the molten lead poured down its throat and put out its life from within. So the unkillable beast was undone at the last by the very fire that had made it terrible.\n\nThe Chimera's name outlived it. In every age since, anything impossible or fantastical is called chimerical — the beast that could not exist became the word for everything that cannot.",
    beats: [
      { label: "Three Beasts in One", weight: 0.8, figures: ['echidna', 'typhon'],
        text: "A child of Echidna and Typhon, the Chimera was an impossibility given breath — lion, goat, and serpent fused into a single beast that breathed living fire and ravaged the land of Lycia until nothing could stand against it." },
      { label: "Not Human", weight: 0.65,
        text: "Homer calls it 'a thing of immortal make, not human' — something that should never have existed, yet moved through the world with terrible speed, setting hills ablaze and scattering whole armies." },
      { label: "The Rider Above the Flames", weight: 1.0, figures: ['bellerophon', 'pegasus'],
        text: "No man on foot could come near its flames — until Bellerophon rode the winged horse Pegasus high above the fire and drove a lump of lead fixed to his spear-point into the creature's open mouth." },
      { label: "Undone by Its Own Fire", weight: 0.8,
        text: "The monster's own burning breath melted the metal, and the molten lead poured down its throat and put out its life from within — the unkillable beast undone by the very fire that had made it terrible." },
      { label: "The Name That Outlived It", weight: 0.55,
        text: "The Chimera's name outlived it. In every age since, anything impossible or fantastical is called chimerical — the beast that could not exist became the word for everything that cannot." },
    ],
    source: "Homer, Iliad VI; Hesiod, Theogony."
  },
  sphinx: {
    story: "The Sphinx is a riddling terror with the face and breast of a woman, the body of a lion, and the broad wings of an eagle — a monster of the threshold, who sits at the edge of the city and lets no traveler pass who cannot answer her. She is the question that kills.\n\nSome call her a daughter of Echidna and Typhon; others say Hera sent her as a punishment upon Thebes for an ancient sin. Either way she came and crouched upon a rock outside the gates and set to every passer-by the same riddle: what walks on four legs in the morning, two at noon, and three in the evening? All who failed she seized and devoured, until the road lay strewn with bones and the city starved behind its walls. The finest young men of Thebes went out against her one by one, and none returned.\n\nThen came Oedipus, who answered without faltering — it is man, who crawls as an infant, walks upright in his strength, and leans on a staff in his age. At the sound of the truth the Sphinx flung herself from her rock and was destroyed — the only monster in all the myths undone not by a sword or a bow but by a correct answer.\n\nAnd Oedipus walked on through the open gate, into a doom far darker than any monster could have devised. The riddle's answer was man, and Oedipus was the proof of it — the creature who walks upright but does not see where he is going.",
    beats: [
      { label: "The Monster at the Gate", weight: 0.7, figures: ['echidna', 'typhon'],
        text: "Some call her a daughter of Echidna and Typhon; others say Hera sent her as punishment upon Thebes. Either way she came and crouched upon a rock outside the gates, and the finest young men of the city went out against her and none returned." },
      { label: "The Question That Kills", weight: 0.85,
        text: "She set to every passer-by the same riddle: what walks on four legs in the morning, two at noon, and three in the evening? All who failed she seized and devoured, until the road lay strewn with bones and the city starved behind its walls." },
      { label: "The Answer", weight: 1.0, figures: ['oedipus'],
        text: "Then came Oedipus, who answered without faltering — it is man, who crawls as an infant, walks upright in his strength, and leans on a staff in his age. At the sound of the truth the Sphinx flung herself from her rock and was destroyed." },
      { label: "Undone by a Word", weight: 0.65,
        text: "She is the only monster in all the myths undone not by a sword or a bow but by a correct answer — knowledge, not force, was the blade that killed her." },
      { label: "Through the Open Gate", weight: 0.75,
        text: "Oedipus walked on through the open gate, into a doom far darker than any monster could have devised. The riddle's answer was man — and Oedipus was the proof of it." },
    ],
    source: "Apollodorus, Library; Sophocles."
  },
  gorgons: {
    story: "The Gorgons are three sisters who dwell at the very edge of the world, near the cold borders of Night — winged women with living serpents for hair, tusks like a boar's, and a glare so terrible that any creature which meets their eyes is turned upon the instant to stone. Stheno and Euryale, the elder two, are deathless; only Medusa, the youngest, could ever be slain.\n\nDaughters of the ancient sea-gods Phorcys and Ceto, they are the dread face of the deep made flesh, kin to the Grey Sisters and to the serpents that guard the world's hidden things. They lived on a desolate island at the western edge of the ocean, their lair littered with the stone shapes of men who had looked one moment too long — a garden of statues that no sculptor had carved.\n\nWhen the hero Perseus came for Medusa's head, he could strike at all only because she alone was mortal — and the moment the deed was done, her immortal sisters woke and rose shrieking into the air behind him. But he wore the cap of darkness and the winged sandals, and they could only wail across the sky as he vanished, robbed forever of vengeance for a sister who could not be brought back.\n\nThe Gorgon's face became the most powerful ward in the ancient world. Warriors painted it on their shields, temples carved it above their doors — the image that turns danger to stone, borrowed from the monsters for the protection of the very mortals who feared them.",
    beats: [
      { label: "The Dread Sisters", weight: 0.85, figures: ['phorcys', 'ceto'],
        text: "Daughters of Phorcys and Ceto, the three Gorgons dwell at the very edge of the world — winged women with living serpents for hair and a glare so terrible that any creature which meets their eyes is turned to stone." },
      { label: "The Garden of Statues", weight: 0.65,
        text: "They lived on a desolate island at the western edge of the ocean, their lair littered with the stone shapes of men who had looked one moment too long — a garden of statues that no sculptor had carved." },
      { label: "The Mortal One", weight: 1.0, figures: ['medusa', 'perseus'],
        text: "Only Medusa, the youngest, could ever be slain. When Perseus came for her head, he could strike only because she alone was mortal — and the moment the deed was done, her immortal sisters woke and rose shrieking into the air." },
      { label: "Robbed of Vengeance", weight: 0.75, figures: ['stheno', 'euryale'],
        text: "Stheno and Euryale could only wail across the sky as Perseus vanished in the cap of darkness and the winged sandals — robbed forever of vengeance for a sister who could not be brought back." },
      { label: "The Face on the Shield", weight: 0.6, figures: ['athena'],
        text: "The Gorgon's face became the most powerful ward in the ancient world. Warriors painted it on their shields, temples carved it above their doors — the image that turns danger to stone, borrowed from the monsters for the protection of mortals." },
    ],
    source: "Hesiod, Theogony."
  },
  graeae: {
    story: "The Graeae are the three Grey Sisters — Deino, Enyo, and Pemphredo — who were never young: they came into the world already old, grey-haired and withered from their very first moment, the ancient watchwomen of the road that leads to the Gorgons' lair. Between the three of them they possess but a single eye and a single tooth, passed from hand to hand as each takes her turn to see and to eat.\n\nDaughters of Phorcys and Ceto and sisters to the Gorgons, they lived in a twilight land near the borders of Night, where the path to the Gorgons' island begins. They are knowledge in its oldest and most grudging form — the kind that must be stolen, because it will never be freely given.\n\nWhen Perseus needed that secret, he watched and waited until the very moment the eye was being handed along — and snatched it out of the air between their groping fingers. Blind and helpless and able to do nothing but bargain, the old sisters were forced to tell him the way to Medusa before he would return their one eye. They told him also how to find the nymphs who kept the cap of darkness and the winged sandals — the tools without which the quest could not have been completed.\n\nSo the greatest of the hero-quests turned upon a single stolen instant of sight, and three old women who had been guarding a secret since before the heroes were born.",
    beats: [
      { label: "Born Already Old", weight: 0.75, figures: ['phorcys', 'ceto'],
        text: "Daughters of Phorcys and Ceto, the Graeae came into the world already old — grey-haired and withered from their very first moment, sharing between them a single eye and a single tooth, passed from hand to hand." },
      { label: "Guardians of the Way", weight: 0.65,
        text: "They lived in a twilight land near the borders of Night, where the path to the Gorgons' island begins — knowledge in its oldest and most grudging form, the kind that must be stolen because it will never be freely given." },
      { label: "The Stolen Eye", weight: 1.0, figures: ['perseus'],
        text: "Perseus watched and waited until the very moment the eye was being handed along — and snatched it out of the air between their groping fingers. Blind and helpless, the old sisters could do nothing but bargain." },
      { label: "The Tools of the Quest", weight: 0.7, figures: ['medusa'],
        text: "They told him how to find the nymphs who kept the cap of darkness and the winged sandals — the tools without which the quest to slay Medusa could not have been completed." },
      { label: "A Stolen Instant of Sight", weight: 0.6,
        text: "So the greatest of the hero-quests turned upon a single stolen instant of sight, and three old women who had been guarding a secret since before the heroes were born." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  ladon: {
    story: "Ladon is the sleepless dragon of the world's far west — a serpent of a hundred heads, the old stories say, each speaking in a different voice, coiled forever about the tree of golden apples in the garden of the Hesperides at the edge of the sunset. He never closed all his eyes at once, and so the precious fruit was never for an instant unguarded.\n\nA child of the ancient sea-powers — Phorcys and Ceto, or in some tellings of Gaia herself — he was set to keep the golden apples that Earth had given Hera as a wedding gift. The Hesperides, the nymphs of evening, tended the garden around him, but it was Ladon who kept the watch, his many voices murmuring through the leaves in a hundred different tongues, a lullaby that never once lulled itself.\n\nWhen the labors of Heracles brought the hero to the garden wall, that endless watch came to its end: by one account Heracles loosed a single arrow over the wall and felled the dragon, by another he sent Atlas to gather the apples while the beast slept its first and final sleep. The Argonauts, sailing past the garden the very next day, found his great body still draped about the tree, the flies already circling.\n\nIn sorrow for so faithful a guardian, the goddess set Ladon's coils among the stars, where he winds to this day as the constellation of the Dragon — the one serpent in all the myths rewarded for never having slept.",
    beats: [
      { label: "The Hundred-Headed Watch", weight: 0.85, figures: ['hera'],
        text: "Ladon was a serpent of a hundred heads, each speaking in a different voice, coiled forever about the tree of golden apples that Earth had given Hera as a wedding gift. He never closed all his eyes at once." },
      { label: "The Nymphs of Evening", weight: 0.6, figures: ['phorcys', 'ceto'],
        text: "A child of the ancient sea-powers, he watched while the Hesperides tended the garden around him, his many voices murmuring through the leaves in a hundred tongues — a lullaby that never once lulled itself." },
      { label: "The End of the Vigil", weight: 1.0, figures: ['heracles', 'atlas'],
        text: "When the labors of Heracles brought the hero to the garden wall, that endless watch came to its end — by one account a single arrow felled the dragon, by another Atlas gathered the apples while the beast slept its first and final sleep." },
      { label: "The Argonauts Pass", weight: 0.65, figures: ['jason'],
        text: "The Argonauts, sailing past the garden the very next day, found his great body still draped about the tree, the flies already circling — the faithful guardian ended." },
      { label: "Set Among the Stars", weight: 0.7,
        text: "In sorrow, the goddess set Ladon's coils among the stars, where he winds to this day as the constellation of the Dragon — the one serpent in all the myths rewarded for never having slept." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library; Apollonius of Rhodes, Argonautica."
  },
  orthrus: {
    story: "Orthrus is the two-headed hound of the far west, a child of the storm-giant Typhon and the serpent Echidna, and the lesser, earthbound brother of Cerberus who keeps the gate of the dead. Where his brother guards the threshold of the underworld, Orthrus guards only a herd of cattle — but he guards it with the same monstrous devotion.\n\nSome of the darker genealogies say he was more than a watchdog — that he lay with his own mother Echidna and sired the Sphinx and the Nemean Lion, so that the monsters the heroes were born to face were bred from a family that kept folding back upon itself, horror compounding horror.\n\nHe was set to watch over the red cattle of the three-bodied giant Geryon, on the island of Erytheia at the edge of the world where the sun goes down. When Heracles came on his tenth labor to drive that herd back to Greece, Orthrus was the first to rush him, both heads snarling at once — and the first to fall, beaten down by a single blow of the hero's great club before the giant himself had even reached the field.\n\nA short life, and a faithful one, spent guarding another's wealth at the end of the world. No one mourned him, and no goddess set him among the stars.",
    beats: [
      { label: "Brother of Cerberus", weight: 0.7, figures: ['typhon', 'echidna', 'cerberus'],
        text: "A child of Typhon and Echidna, Orthrus is the two-headed hound of the far west and the lesser, earthbound brother of Cerberus — guarding not the gate of the dead but a herd of cattle with the same monstrous devotion." },
      { label: "Dark Parentage", weight: 0.6, figures: ['echidna', 'sphinx', 'nemean_lion'],
        text: "Some darker genealogies say he lay with his own mother Echidna and sired the Sphinx and the Nemean Lion — horror compounding horror, the family folding back upon itself." },
      { label: "The Red Cattle", weight: 0.8, figures: ['geryon'],
        text: "He was set to watch over the red cattle of the three-bodied giant Geryon, on the island of Erytheia at the edge of the world where the sun goes down." },
      { label: "A Single Blow", weight: 1.0, figures: ['heracles'],
        text: "When Heracles came on his tenth labor, Orthrus was the first to rush him, both heads snarling — and the first to fall, beaten down by a single blow of the hero's great club." },
      { label: "No Stars for the Faithful", weight: 0.55,
        text: "A short life, and a faithful one, spent guarding another's wealth at the end of the world. No one mourned him, and no goddess set him among the stars." },
    ],
    source: "Hesiod, Theogony."
  },
  nemean_lion: {
    story: "The Nemean Lion was a beast no weapon could wound — an enormous lion whose tawny golden hide turned aside every arrow, spear, and blade, so that it ravaged the hills around Nemea wholly unafraid, and no hunter who went up against it ever came home to tell of it.\n\nA monstrous child of Typhon and Echidna — some said dropped to earth from the moon by Selene, or raised by Hera herself as the first trial set to break her stepson — it made its lair in a cave with two mouths, so that when hunters entered at one end, it circled around and came in behind them.\n\nIt was set as the first of the twelve labors of Heracles. When the hero found that his arrows simply glanced from its skin, he cast down his useless weapons, blocked one mouth of the cave with a great stone, and went in through the other. In the pitch dark, with no room for a sword and nothing that could pierce the hide, he cornered the lion and throttled it to death in the crook of his bare arm — the first labor won by strength alone, with no blade and no trick.\n\nThen, finding that no knife on earth could cut the pelt, he skinned the beast with its own razor claws — and wore that impenetrable hide ever after as cloak and helm, so that the terror of Nemea became the armor of the man who killed it. Zeus set the lion among the stars as the constellation Leo, the great beast shining overhead long after the hero's own apotheosis.",
    beats: [
      { label: "The Invulnerable Hide", weight: 0.85, figures: ['typhon', 'echidna'],
        text: "A child of Typhon and Echidna, the Nemean Lion was a beast no weapon could wound — its tawny golden hide turned aside every arrow, spear, and blade, and no hunter who went against it ever came home." },
      { label: "The Double-Mouthed Cave", weight: 0.65, figures: ['hera'],
        text: "Some said it was dropped to earth from the moon, or raised by Hera herself as the first trial set to break her stepson. It made its lair in a cave with two mouths, so that hunters who entered at one end found it coming in behind them." },
      { label: "Throttled in the Dark", weight: 1.0, figures: ['heracles'],
        text: "Heracles cast down his useless weapons, blocked one mouth of the cave with a great stone, and went in through the other. In the pitch dark he cornered the lion and throttled it to death in the crook of his bare arm." },
      { label: "The Monster Becomes Armor", weight: 0.8,
        text: "Finding that no knife on earth could cut the pelt, he skinned the beast with its own razor claws — and wore that impenetrable hide ever after, so that the terror of Nemea became the armor of the man who killed it." },
      { label: "The Constellation Leo", weight: 0.6, figures: ['zeus'],
        text: "Zeus set the lion among the stars as the constellation Leo — the great beast shining overhead long after the hero's own apotheosis." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  colchian_dragon: {
    story: "The Colchian Dragon is the unsleeping guardian of the Golden Fleece — an immense serpent coiled around the sacred oak in the grove of Ares at the far eastern edge of the world, who kept its watch without ever once closing its eyes, so that the Fleece glittered always just beyond the reach of any thief.\n\nA child of Typhon and Echidna, or in some tellings born of the earth of Colchis itself, it was set as the last and greatest barrier in the grove of Ares. Its scales were harder than bronze, its coils thick enough to crush a trireme, and the venom in its breath wilted the leaves of the sacred oak itself. No hero who approached on strength alone could have survived the first moment.\n\nIt was the final test between Jason and the prize his whole long voyage had been undertaken to win. No sword could pass it; the dragon would have devoured the hero where he stood. But Jason had Medea, the sorceress-princess of Colchis who loved him — and she came into the grove with her drugs and her low murmured charms and her sprinkled drops of sleep, and sang the great beast, for the first and only time in its life, into slumber.\n\nWhile its sleepless eyes at last fell shut, Jason lifted the shining Fleece from the tree and fled with it into the dark. The dragon that had never slept in all its long years slept on, and whether it woke again to find its charge gone the stories do not say.",
    beats: [
      { label: "The Unsleeping Watch", weight: 0.8, figures: ['typhon', 'echidna'],
        text: "A child of Typhon and Echidna, the Colchian Dragon coiled around the sacred oak in the grove of Ares, keeping its watch without ever once closing its eyes, so that the Golden Fleece glittered always just beyond reach." },
      { label: "Harder Than Bronze", weight: 0.65,
        text: "Its scales were harder than bronze, its coils thick enough to crush a trireme, and the venom in its breath wilted the leaves of the sacred oak itself. No hero who approached on strength alone could have survived the first moment." },
      { label: "Medea's Lullaby", weight: 1.0, figures: ['medea', 'jason'],
        text: "Medea came into the grove with her drugs and her low murmured charms and sang the great beast, for the first and only time in its life, into slumber." },
      { label: "The Fleece Taken", weight: 0.75,
        text: "While its sleepless eyes at last fell shut, Jason lifted the shining Fleece from the tree and fled with it into the dark." },
      { label: "The Waking", weight: 0.55,
        text: "The dragon that had never slept in all its long years slept on, and whether it woke again to find its charge gone the stories do not say." },
    ],
    source: "Apollonius of Rhodes, Argonautica."
  },
  caucasian_eagle: {
    story: "The Caucasian Eagle was the instrument of the cruelest punishment in all the myths — a vast bird of prey, born of Typhon and Echidna, sent by Zeus to a windswept crag at the end of the world to serve as the daily torment of the chained Titan Prometheus.\n\nIt was no ordinary eagle but a child of monsters, enormous and tireless, its wingspan wide enough to blot out the sun on the narrow cliff-face. Zeus had chosen the punishment with care: not death, for Prometheus was immortal and could not die, but an agony that would be renewed forever.\n\nEach day the eagle flew to the cliff where Prometheus hung in unbreakable bonds, tore open his side, and ate away his liver; and each night, because the deathless Titan could not die, the liver grew whole again — so that the agony began afresh with every dawn, without relief and without end. The eagle knew no other life; it was made for this single task, and it performed it without malice, only with hunger.\n\nFor long ages of the world it went on — thirty thousand years, some say — until Heracles, crossing that desolate place on his wanderings, lifted his great bow and shot the bird out of the sky, ending the torture and setting the friend of mankind free. Zeus allowed it, for by then his anger had cooled, and the eagle fell from the crag into the silence it had filled with screaming for so long.",
    beats: [
      { label: "Instrument of Cruelty", weight: 0.8, figures: ['zeus', 'prometheus'],
        text: "Born of Typhon and Echidna, the Caucasian Eagle was sent by Zeus to serve as the daily torment of the chained Titan Prometheus on a windswept crag at the end of the world." },
      { label: "Made for One Task", weight: 0.65, figures: ['typhon', 'echidna'],
        text: "It was no ordinary eagle but a child of monsters, enormous and tireless, its wingspan wide enough to blot out the sun. It knew no other life; it was made for this single task, and it performed it without malice, only with hunger." },
      { label: "The Unending Agony", weight: 1.0, figures: ['prometheus'],
        text: "Each day the eagle tore open his side and ate away his liver; each night the liver grew whole again — so that the agony began afresh with every dawn, without relief and without end." },
      { label: "Thirty Thousand Years", weight: 0.7,
        text: "For thirty thousand years, some say, it went on — the longest punishment in the myths, served by a bird that never tired and a liver that never stopped growing back." },
      { label: "Shot from the Sky", weight: 0.85, figures: ['heracles'],
        text: "Heracles lifted his great bow and shot the bird out of the sky. Zeus allowed it, for by then his anger had cooled, and the eagle fell from the crag into the silence it had filled with screaming for so long." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  geryon: {
    story: "Geryon is the three-bodied giant of the sunset lands — a mighty warrior grown from a single waist into three torsos, three heads, and six arms, sometimes winged, who reigned over the island of Erytheia at the western edge of the world and kept there a famous herd of red cattle.\n\nA grandson of Medusa, born of the golden warrior Chrysaor who sprang from her blood and the Oceanid Callirrhoe, he was among the strongest beings Heracles ever faced. To reach his island the hero had first to cross the whole width of the world and pass the limits of Ocean itself — and at the strait where the inner sea meets the outer, Heracles raised the two great pillars that bear his name, marking the boundary between the known and the unknown.\n\nFor his tenth labor the hero crossed the whole of the world to take the red cattle, killed the herdsman and the two-headed hound Orthrus that guarded them, and then met Geryon himself in arms. The giant's three bodies should have made him three times the foe — but a single arrow, dipped in the Hydra's venom, passed clean through all three at once, and the great cattle-king of the west went down.\n\nThe long drive home with the red cattle was itself an odyssey — through Spain and Italy and Sicily, the herd scattering at every turn, each waypoint becoming a place-name in the landscape of the western Mediterranean.",
    beats: [
      { label: "King of the Sunset Isle", weight: 0.8, figures: ['chrysaor', 'medusa'],
        text: "A grandson of Medusa, born of Chrysaor and the Oceanid Callirrhoe, Geryon was a three-bodied giant who reigned over the island of Erytheia at the western edge of the world." },
      { label: "The Pillars of Heracles", weight: 0.7, figures: ['heracles'],
        text: "To reach his island the hero had to cross the whole width of the world. At the strait where the inner sea meets the outer, Heracles raised the two great pillars that bear his name, marking the boundary between the known and the unknown." },
      { label: "Orthrus Falls First", weight: 0.75, figures: ['orthrus', 'heracles'],
        text: "Heracles killed the herdsman and the two-headed hound Orthrus before the giant himself reached the field." },
      { label: "One Arrow, Three Bodies", weight: 1.0, figures: ['heracles'],
        text: "The giant's three bodies should have made him three times the foe — but a single arrow, dipped in the Hydra's venom, passed clean through all three at once, and the great cattle-king of the west went down." },
      { label: "The Long Drive Home", weight: 0.6,
        text: "The drive home with the red cattle was itself an odyssey — through Spain and Italy and Sicily, the herd scattering at every turn, each waypoint becoming a place-name in the landscape of the western Mediterranean." },
    ],
    source: "Hesiod, Theogony; Apollodorus, Library."
  },
  chrysaor: {
    story: "Chrysaor — his name means 'he of the golden sword' — leapt fully grown and armed into the world at the very moment of Medusa's death, springing from her severed neck in the same instant as his brother, the winged horse Pegasus. Two children born together out of a single act of horror: one of them flight, and one of them a blade.\n\nHe was the child of Poseidon's violence upon Medusa — begotten in Athena's temple, carried unknowing in the Gorgon's monstrous body, and finally loosed into the world by Perseus's sword-stroke. His very birth was an act of liberation from an act of cruelty.\n\nWhere Pegasus rose into the sky and into the company of the gods, Chrysaor stayed earthbound and shadowed, and his own myth is brief — his importance lies in what came after him. Joining with the Oceanid Callirrhoe, he fathered the three-bodied giant Geryon, whom Heracles would one day cross the whole world to slay.\n\nSo from Medusa's ruin came not only beauty and a hero's mount, but a line of monsters reaching down the generations, like a golden sword drawn slowly from its sheath. He is the least-told of the great genealogies — a single link in a chain that reaches from Poseidon's crime to a hero's labor at the edge of the world.",
    beats: [
      { label: "Born from the Blood", weight: 0.85, figures: ['medusa', 'pegasus'],
        text: "Chrysaor leapt fully grown and armed into the world at the very moment of Medusa's death, springing from her severed neck in the same instant as his brother Pegasus — two children born of a single act of horror: one of them flight, and one of them a blade." },
      { label: "Child of Violence", weight: 0.7, figures: ['poseidon', 'athena'],
        text: "He was the child of Poseidon's violence upon Medusa — begotten in Athena's temple, carried unknowing in the Gorgon's monstrous body, and finally loosed into the world by Perseus's sword-stroke." },
      { label: "The Earthbound Sword", weight: 0.65, figures: ['callirrhoe'],
        text: "Where Pegasus rose into the sky, Chrysaor stayed earthbound and shadowed. Joining with the Oceanid Callirrhoe, his importance lies in what came after him." },
      { label: "Father of Geryon", weight: 1.0, figures: ['geryon'],
        text: "He fathered the three-bodied giant Geryon, whom Heracles would one day cross the whole world to slay — from Medusa's ruin came a line of monsters reaching down the generations." },
      { label: "The Least-Told Chain", weight: 0.55,
        text: "He is the least-told of the great genealogies — a single link in a chain that reaches from Poseidon's crime to a hero's labor at the edge of the world, like a golden sword drawn slowly from its sheath." },
    ],
    source: "Hesiod, Theogony."
  },
  pegasus: {
    story: "Pegasus is the winged horse of the heavens, white as a cloud and swift as the wind — the one shining and perfect thing to come out of an act of pure horror. He leaps into the stories at the very instant of a monster's death, beauty breaking free of blood.\n\nFor when Perseus struck the head from sleeping Medusa, it was out of the dark fountain of her severed neck that Pegasus burst forth full-grown, unfolding his great wings into the air. He was the child of Poseidon's union with Medusa, carried unknowing in the Gorgon's monstrous body and freed at the moment of her death — flight itself, liberated by a sword.\n\nHe flew to Mount Helicon, where a spring of the Muses opened where his hoof first struck the rock — the Hippocrene, the horse's fountain, from which poets have drawn their inspiration ever since. And the hero Bellerophon, taming him with a golden bridle that Athena gave, rode him up against the Chimera and killed the fire-breathing beast from the safety of the sky.\n\nBut when Bellerophon grew proud and tried to ride all the way up to Olympus, Pegasus threw his rider back down to earth and climbed on alone — and was received among the gods, to carry the thunderbolts of Zeus. The horse knew the difference between a hero's ride and a mortal's presumption, and chose the sky over the saddle.",
    beats: [
      { label: "Beauty from Blood", weight: 0.85, figures: ['medusa', 'perseus'],
        text: "When Perseus struck the head from sleeping Medusa, it was out of the dark fountain of her severed neck that Pegasus burst forth full-grown, unfolding his great wings into the air — beauty breaking free of blood." },
      { label: "Child of the Sea-God", weight: 0.65, figures: ['poseidon'],
        text: "He was the child of Poseidon's union with Medusa, carried unknowing in the Gorgon's monstrous body and freed at the moment of her death — flight itself, liberated by a sword." },
      { label: "The Poet's Fountain", weight: 0.7, figures: ['muses'],
        text: "He flew to Mount Helicon, where a spring of the Muses opened where his hoof first struck the rock — the Hippocrene, the horse's fountain, from which poets have drawn their inspiration ever since." },
      { label: "Tamed for the Chimera", weight: 1.0, figures: ['bellerophon', 'athena', 'chimera'],
        text: "Bellerophon tamed him with a golden bridle that Athena gave, and rode him up against the Chimera and killed the fire-breathing beast from the safety of the sky." },
      { label: "Received Among the Gods", weight: 0.75, figures: ['zeus'],
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
    story: "Perseus is the bright hero of the impossible errand — son of Zeus and the mortal princess Danaë, and one of the very few in all the myths to walk out of his story into a long and happy life. He was born in a locked bronze chamber: his grandfather, King Acrisius, had shut Danaë away to thwart a prophecy that her son would one day kill him. Yet Zeus came to her as a shower of golden light, slipping through the bronze like rain, and Perseus was born all the same.\n\nMother and child were cast adrift in a wooden chest and washed ashore on the island of Seriphos, where a fisherman drew them from the surf and raised the boy as his own. Perseus grew strong and quick, but the island's king, Polydectes, desired Danaë and wanted her son gone. He sent Perseus to fetch the head of Medusa — the Gorgon whose gaze turned the living to stone — a task designed as a death sentence.\n\nBut the gods armed him. Athena lent her polished shield to serve as a mirror, Hermes gave him winged sandals and an adamantine sickle, and from the nymphs of the north he received the cap of Hades, which renders its wearer invisible. First he sought the Graeae, the three grey sisters who shared a single eye between them; Perseus snatched it from their hands and would not give it back until they revealed the way to the Gorgons' lair.\n\nHe found Medusa sleeping among her stone garden of petrified men. Advancing backward, watching only the reflection in Athena's shield, he swung the sickle and took her head in a single stroke. From the stump of her neck sprang Pegasus the winged horse and golden Chrysaor. Fleeing with the head in his bag, Perseus came upon Andromeda chained to a sea-cliff, offered as sacrifice to a monster — he turned the beast to stone with the Gorgon's gaze and won the princess as his bride.\n\nEven the old prophecy came true in the end — but gently. Years later, at funeral games in a distant city, Perseus threw a discus that the wind caught and carried astray; it struck an old man in the crowd and killed him. The old man was Acrisius, his grandfather, who had wandered far from home trying to outrun the very fate he had set in motion. So destiny was fulfilled not by malice but by accident, long years and a whole life later.",
    beats: [
      { label: "The Bronze Chamber", weight: 0.7, figures: ['zeus', 'danae'],
        text: "His grandfather shut Danaë in a chamber of bronze to thwart a prophecy — yet Zeus came to her as a shower of golden light, slipping through the metal like rain, and Perseus was born all the same." },
      { label: "Cast Adrift", weight: 0.6,
        text: "Mother and child were sealed in a wooden chest and cast into the sea. They washed ashore on Seriphos, where a fisherman drew them from the surf and raised the boy as his own." },
      { label: "The Impossible Errand", weight: 0.75,
        text: "The island's king, desiring Danaë and wanting her son gone, sent Perseus to fetch the head of Medusa — the Gorgon whose gaze turned the living to stone — a task designed as a death sentence." },
      { label: "Gifts of the Gods", weight: 0.8, figures: ['athena', 'hermes'],
        text: "Athena lent her polished shield to serve as a mirror, Hermes gave him winged sandals and an adamantine sickle, and from the nymphs he received the cap of Hades, which renders its wearer invisible." },
      { label: "The Graeae's Eye", weight: 0.7, figures: ['graeae'],
        text: "He sought the three grey Graeae who shared a single eye between them; Perseus snatched it from their hands and would not give it back until they revealed the way to the Gorgons' lair." },
      { label: "The Gorgon's Head", weight: 1.0, figures: ['medusa', 'pegasus', 'chrysaor'],
        text: "Advancing backward, watching only the reflection in Athena's shield, he swung the sickle and took Medusa's head in a single stroke. From the stump of her neck sprang Pegasus the winged horse and golden Chrysaor." },
      { label: "Andromeda Unchained", weight: 0.85, figures: ['andromeda'],
        text: "He found Andromeda chained to a sea-cliff as sacrifice to a monster, turned the beast to stone with the Gorgon's gaze, and won the princess as his bride. Even the old prophecy came true in the end — gently, by the accident of a discus thrown astray, long years and a whole life later." },
    ],
    source: "Ovid, Metamorphoses IV–V; Apollodorus, Library. Further reading: Ted Hughes, Tales from Ovid."
  },
  heracles: {
    story: "Heracles is the greatest of all the Greek heroes — the strongest man who ever lived and the only mortal ever to win a seat among the gods. A son of Zeus by the mortal woman Alcmene, he drew Hera's jealousy from his first breath: even as an infant in his cradle she sent two monstrous serpents to kill him, and the child strangled them both in his small fists, laughing. His strength was a wonder, but it was matched at every turn by the suffering laid upon him, and his whole life is one long labor of that strength bent, again and again, to undoing harm.\n\nWhen he was grown and happy, with a wife and children of his own, Hera struck him with a madness so black that he killed them all with his bare hands and did not know what he had done until the fog lifted and their bodies lay at his feet. To purge that horror the oracle at Delphi bound him to the service of his cousin Eurystheus, a lesser king who set him twelve impossible labors. He strangled the Nemean Lion whose hide no blade could pierce, and wore its skin ever after. He cut down the Lernaean Hydra, burning each stump as he severed its heads so they could not grow back. He descended into the underworld itself and dragged the three-headed hound Cerberus up into the daylight, the last and most terrible of the twelve.\n\nBetween the labors and after them he walked the edges of the world. On the Caucasus he found Prometheus still chained to the rock where Zeus had bound him, the eagle still tearing at his liver each dawn; Heracles lifted his bow, shot the eagle from the sky, and broke the Titan's chains — the only man strong enough, and kind enough, to finish what the gods would not.\n\nBut his end came through love and treachery. The centaur Nessus, dying from one of Heracles' poisoned arrows, whispered to his wife Deianeira that his blood was a love-charm; years later, fearing she was losing her husband's heart, she soaked a robe in the centaur's blood and sent it to him. The venom ate into his flesh like fire the moment he put it on, and no force on earth could tear it free. In his agony Heracles built his own pyre on Mount Oeta and climbed upon it, begging any passerby to light the flame. The fire consumed only what was mortal in him. Zeus reached down through the smoke and lifted his son to Olympus, where Heracles was given ambrosia, reconciled at last with Hera, and wed to the goddess Hebe — eternal youth married to the man who had suffered his way through every sorrow the world could offer.",
    beats: [
      { label: "Serpents in the Cradle", weight: 0.7, figures: ['zeus', 'alcmene', 'hera'],
        text: "A son of Zeus by the mortal Alcmene, Heracles drew Hera's jealousy from his first breath. She sent two serpents to kill him in his cradle; the infant strangled them both in his small fists, laughing." },
      { label: "The Madness of Hera", weight: 0.85, figures: ['hera'],
        text: "When he was grown and happy, with a wife and children of his own, Hera struck him with a madness so black that he killed them all with his bare hands and did not know what he had done until the fog lifted and their bodies lay at his feet." },
      { label: "The Twelve Labors", weight: 1.0, figures: ['nemean_lion', 'lernaean_hydra', 'cerberus'],
        text: "Bound to twelve impossible labors, he strangled the Nemean Lion whose hide no blade could pierce, cut down the Lernaean Hydra burning each stump as he severed its heads, and descended into the underworld to drag the three-headed hound Cerberus up into the daylight." },
      { label: "Freeing Prometheus", weight: 0.75, figures: ['prometheus', 'caucasian_eagle'],
        text: "On the Caucasus he found Prometheus still chained to the rock, the eagle still tearing at his liver each dawn. Heracles shot the eagle from the sky and broke the Titan's chains — the only man strong enough, and kind enough, to finish what the gods would not." },
      { label: "The Blood of Nessus", weight: 0.8,
        text: "The centaur Nessus, dying from one of Heracles' poisoned arrows, whispered to his wife that his blood was a love-charm. Years later, fearing she was losing her husband's heart, she soaked a robe in the centaur's blood and sent it to him." },
      { label: "The Pyre on Oeta", weight: 0.9,
        text: "The venom ate into his flesh like fire the moment he put the robe on, and no force on earth could tear it free. In his agony Heracles built his own pyre on Mount Oeta and climbed upon it, begging any passerby to light the flame." },
      { label: "Apotheosis", weight: 0.85, figures: ['zeus'],
        text: "The fire consumed only what was mortal in him. Zeus reached down through the smoke and lifted his son to Olympus, where Heracles was reconciled with Hera and wed to the goddess Hebe — eternal youth married to the man who had suffered his way into heaven." },
    ],
    source: "Apollodorus, Library; Hesiod, Theogony; Sophocles, Trachiniae."
  },
  odysseus: {
    story: "Odysseus is the cleverest of all the Greek heroes — not the strongest spear nor the swiftest runner, but the subtlest mind, the man of many turns and many tricks who wins by wit what others cannot win by force. King of rocky Ithaca, husband of patient Penelope, he would have been content to stay among his olive groves; when the summons to Troy arrived he feigned madness, yoking a donkey to a plough and sowing salt, until they set his infant son before the blade and his hand swerved — and his cleverness betrayed him into a war that would swallow twenty years of his life.\n\nIt was Odysseus who devised the wooden horse that broke the towers of Troy after ten bitter years of siege, the hollow belly packed with soldiers and the gates flung wide to ruin. But the same cleverness that ended one war began another, for in his escape he blinded the Cyclops Polyphemus in his cave, driving a burning stake through the giant's single eye — and the Cyclops was a son of Poseidon. So the sea-god cursed him, and for ten more years hounded him across every water of the world.\n\nOn Circe's island his men were turned to swine by her enchantments, and Odysseus alone resisted — aided by Hermes and an herb called moly — until the sorceress yielded and became his host for a year of dangerous ease. At her urging he sailed to the very rim of the world and opened a trench into the land of the dead, pouring dark blood so the shades would rise and speak; there he heard Tiresias foretell his homecoming and saw his own mother's ghost, who had died of grief waiting for him. Threading the narrow strait between Scylla and Charybdis, he chose the lesser evil — six men snatched screaming from the deck by Scylla's six heads rather than the whole ship swallowed by the whirlpool — and sailed on diminished.\n\nAlone at the last, every ship lost, every companion dead, he washed ashore on Calypso's island and was held there seven years before the gods compelled his release. When he finally reached Ithaca he came as a beggar in rags, strung the great bow no suitor could bend, and sent his arrows through them all. Penelope, who had waited and woven and unravelled and waited, tested him with the secret of their marriage bed — and only then, when he knew what no stranger could know, did she let herself believe that the long way home was over.",
    beats: [
      { label: "The Reluctant Warrior", weight: 0.65,
        text: "King of rocky Ithaca, husband of patient Penelope, Odysseus feigned madness to avoid the war — yoking a donkey to a plough and sowing salt — until they set his infant son before the blade and his hand swerved, and his cleverness betrayed him into twenty years of wandering." },
      { label: "The Wooden Horse", weight: 0.85,
        text: "It was Odysseus who devised the wooden horse that broke the towers of Troy after ten bitter years, the hollow belly packed with soldiers and the gates flung wide to ruin." },
      { label: "The Cyclops's Eye", weight: 1.0, figures: ['polyphemus', 'poseidon'],
        text: "He blinded the Cyclops Polyphemus in his cave, driving a burning stake through the giant's single eye — and the Cyclops was a son of Poseidon. So the sea-god cursed him and hounded him across every water of the world." },
      { label: "Circe's Island", weight: 0.8, figures: ['circe', 'hermes'],
        text: "On Circe's island his men were turned to swine, and Odysseus alone resisted — aided by Hermes and an herb called moly — until the sorceress yielded and became his host for a year of dangerous ease." },
      { label: "The Land of the Dead", weight: 0.85,
        text: "At Circe's urging he sailed to the rim of the world and opened a trench into the land of the dead, pouring dark blood so the shades would rise and speak. There he saw his own mother's ghost, who had died of grief waiting for him." },
      { label: "Scylla and Charybdis", weight: 0.75, figures: ['scylla', 'charybdis'],
        text: "Threading the narrow strait, he chose the lesser evil — six men snatched screaming from the deck by Scylla's six heads rather than the whole ship swallowed by the whirlpool — and sailed on diminished." },
      { label: "The Bow and the Bed", weight: 0.9, figures: ['calypso'],
        text: "Alone at the last, held seven years on Calypso's island, he finally reached Ithaca as a beggar in rags, strung the great bow no suitor could bend, sent his arrows through them all — and Penelope tested him with the secret of their marriage bed before she let herself believe the long way home was over." },
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
    story: "Oedipus is the hero who answered the riddle and could not escape his own — the king of Thebes whose cleverness saved a city and whose fate destroyed him, the man who saw the truth of everyone but himself until it was far too late.\n\nIt was foretold at Delphi that the son of Laius and Jocasta would kill his father and marry his mother. To cheat the oracle, the infant was pinned at the ankles and given to a shepherd to be left on Mount Cithaeron to die. But the shepherd could not do it; he passed the child on, hand to hand, until a herdsman carried the boy to Corinth, where King Polybus and Queen Merope raised him as their own.\n\nOedipus grew up a prince, quick and proud, knowing nothing of his blood — until a taunt at a feast sent him to Delphi. Apollo pronounced the dreadful fate: you will kill your father and lie with your mother. Horrified, believing the Corinthian king and queen his parents, Oedipus turned his back on the only home he knew — and in doing so set his feet on the very road the prophecy required.\n\nAt a narrow crossroads where three ways met, he quarreled with an old man in a chariot and struck him dead — never knowing it was Laius, his true father. He came to Thebes, where the Sphinx strangled every traveler who could not answer her riddle. Oedipus answered it — \'Man\' — and the Sphinx hurled herself from the cliff. The grateful city gave him the crown and the widowed queen Jocasta, and for years he ruled well, never suspecting his wife was his mother.\n\nBut plague came, and the oracle declared it would not lift until the murderer of Laius was found. Oedipus tore the truth loose thread by thread — and when the last thread gave way, the whole fabric of his life collapsed. Jocasta hanged herself. Oedipus drove the golden pins from her brooches into his own eyes, choosing blindness over sight. Exiled, led by his daughter Antigone, he wandered until he reached the grove of Colonus near Athens, where the earth opened gently and took him in — granted at the end a passing more like grace than punishment.",
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

