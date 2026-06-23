/* ── Zodiac stories ───────────────────────────────────────────────────────
   The twelve constellations of the zodiac, each told through the Greek myth
   that set it among the stars. Unlike `tours.js` (which references real atlas
   node ids), these are self-contained: every sign carries its own hand-authored
   star pattern — an approximation of the true constellation figure — so the
   Zodiac view stands on its own, apart from the mythology graph.

   Coordinate space is the viewBox -100..100 (centred on 0,0), matching the
   ConstellationStage engine. spec fields: m = motion key · b = bright node
   indices · n = node [x,y] coords · e = edges as index pairs.

   Accents follow the four classical elements so each triad shares a hue:
     Fire → amber · Earth → green · Air → periwinkle · Water → teal           */

const ELEMENT_ACCENT = {
  Fire:  'oklch(0.71 0.10 55)',
  Earth: 'oklch(0.67 0.07 148)',
  Air:   'oklch(0.69 0.07 270)',
  Water: 'oklch(0.69 0.07 210)',
}

export const ZODIAC = [
  { id:'aries', name:'Aries', symbol:'♈', figure:'The Golden Ram',
    element:'Fire', dates:'Mar 21 – Apr 19', motion:'rock',
    text:'When Phrixus and Helle fled their murderous stepmother Ino, a ram with a fleece of hammered gold bore them up through the sky on the wings of the wind. Helle lost her grip over the strait that would bear her name, but Phrixus rode on to far Colchis, where he sacrificed the ram in thanks and hung its shining hide in a grove sacred to Ares. That fleece, guarded by a sleepless dragon, became the prize that drew Jason and the Argonauts across the world — and the ram that carried two frightened children out of danger was set among the stars as the first sign of spring.',
    b:[1], n:[[-64,24],[-28,10],[6,2],[34,-10],[50,-30],[44,-52]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5]] },

  { id:'taurus', name:'Taurus', symbol:'♉', figure:'Zeus & Europa',
    element:'Earth', dates:'Apr 20 – May 20', motion:'sweep',
    text:'To win the Phoenician princess Europa, Zeus took the shape of a snow-white bull so gentle and sweet-breathed that she dared to climb upon his back. The moment she settled between his horns he surged into the sea and carried her across the waves to Crete, where she bore him three sons and gave her name to a continent. Only the bull’s front half shines in the sky — as if it were still rising from the water, horns lowered, nostrils flaring with salt spray — and its brightest star, the red eye Aldebaran, burns like the god’s own disguised gaze.',
    b:[0], n:[[0,6],[-26,-6],[-50,-16],[-72,-34],[26,-4],[50,-12],[72,-28],[-14,26],[14,24]],
    e:[[0,1],[1,2],[2,3],[0,4],[4,5],[5,6],[0,7],[0,8]] },

  { id:'gemini', name:'Gemini', symbol:'♊', figure:'Castor & Polydeuces',
    element:'Air', dates:'May 21 – Jun 20', motion:'cradle',
    text:'Castor and Polydeuces were twin brothers born of the same mother Leda but of different fathers: one sired by mortal Tyndareus, the other by Zeus in the shape of a swan. When mortal Castor fell in battle, his divine brother begged Zeus to let him share his own immortality rather than live without his twin. Zeus set them both among the stars, side by side, spending half their days in the heavens and half beneath the earth — so that the brothers who could not bear to part would never have to, and their two bright heads shine together at the shoulder of the year.',
    b:[0,1], n:[[-30,-46],[30,-46],[-26,-10],[26,-10],[-34,26],[-18,26],[34,26],[18,26],[-22,-28],[22,-28]],
    e:[[0,8],[8,2],[2,4],[2,5],[1,9],[9,3],[3,6],[3,7],[8,9]] },

  { id:'cancer', name:'Cancer', symbol:'♋', figure:'Karkinos the Crab',
    element:'Water', dates:'Jun 21 – Jul 22', motion:'pulse',
    text:'As Heracles battled the monstrous Hydra in the swamps of Lerna, jealous Hera sent a giant crab called Karkinos scuttling from the marsh to bite the hero’s heel and tip the fight. Heracles barely noticed; he crushed the creature underfoot with a single stamp and fought on. But Hera, grateful for that brief and futile loyalty, lifted the broken crab into the sky. Cancer is the faintest of the zodiac constellations — a small, dim cluster of stars, as if even the heavens remember how slight the creature was, and how swiftly it was destroyed.',
    b:[0], n:[[0,0],[0,-46],[-44,30],[44,30],[-22,-20],[22,-20]],
    e:[[0,1],[0,2],[0,3],[0,4],[0,5]] },

  { id:'leo', name:'Leo', symbol:'♌', figure:'The Nemean Lion',
    element:'Fire', dates:'Jul 23 – Aug 22', motion:'sweep',
    text:'The Nemean Lion was a beast whose golden hide turned aside every blade and arrow — a terror of the hills that no weapon forged by men could harm. It fell to Heracles as the first of his twelve labours: finding sword and bow useless, he tracked the lion to its cave, blocked one entrance with a boulder, and throttled the creature with his bare hands. He skinned it with its own claws and wore the pelt as armour for the rest of his life. Zeus set the lion among the stars as a monument to the first and most desperate of his son’s trials, its bright heart Regulus blazing like the courage it took to face it.',
    b:[0,6], n:[[-44,-4],[-52,-26],[-40,-44],[-16,-50],[-2,-34],[18,-8],[48,6],[10,22]],
    e:[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,0]] },

  { id:'virgo', name:'Virgo', symbol:'♍', figure:'Astraea, Star of Justice',
    element:'Earth', dates:'Aug 23 – Sep 22', motion:'breathe',
    text:'Astraea, star-maiden of justice, was the last of the immortals to dwell among mortals. Through the Golden Age she walked the earth freely, teaching men fairness and right measure; through the Silver and the Bronze she lingered on, growing quieter as the world grew crueller. But when the Iron Age came and men took up the sword against one another, even Astraea could bear no more. She withdrew into the sky and became Virgo, the largest constellation of the zodiac, her brightest star Spica gleaming like a single sheaf of wheat held up against the dark — a reminder of the world’s lost innocence, and the hope that justice might one day return.',
    b:[0], n:[[40,40],[16,18],[-6,2],[-30,-8],[-54,-20],[-12,-28],[18,-14]],
    e:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6]] },

  { id:'libra', name:'Libra', symbol:'♎', figure:'The Scales of Justice',
    element:'Air', dates:'Sep 23 – Oct 22', motion:'cradle',
    text:'Libra is the only sign of the zodiac that is not a living thing. The Romans reforged these stars from the claws of the Scorpion into the Scales of Justice — the balance that Astraea carried when she was the last goddess among men. Poised at the autumn equinox, where day and night hang in perfect equilibrium, the Scales weigh the deeds of the living against the silence of the dead. They tip for no one and steady themselves for no prayer. In a sky crowded with beasts and heroes and gods, Libra alone is an instrument — as if the heavens needed one still, unfeeling thing to remind us that fairness has no face.',
    b:[0], n:[[0,-30],[-44,-30],[44,-30],[-44,4],[44,4],[-58,22],[-30,22],[58,22],[30,22]],
    e:[[1,0],[0,2],[1,3],[2,4],[3,5],[3,6],[5,6],[4,7],[4,8],[7,8]] },

  { id:'scorpio', name:'Scorpio', symbol:'♏', figure:'The Scorpion of Orion',
    element:'Water', dates:'Oct 23 – Nov 21', motion:'undulate',
    text:'When the great hunter Orion boasted that no creature alive could stand against him, the Earth herself answered. She sent up from the ground a scorpion — low, armored, and venomous — that stung the boastful giant and laid him dead. The gods set both hunter and scorpion in the sky but placed them at opposite ends of the heavens, so that as Scorpio rises in the east, Orion flees below the western horizon, and the two can never meet again. The scorpion’s red heart-star Antares, whose name means "rival of Ares," pulses like a warning: even the mightiest may be undone by the smallest thing the earth sends up from underfoot.',
    b:[3], n:[[-58,-30],[-40,-24],[-20,-16],[0,-6],[18,4],[34,18],[44,34],[38,52],[22,58]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]] },

  { id:'sagittarius', name:'Sagittarius', symbol:'♐', figure:'The Centaur Archer',
    element:'Fire', dates:'Nov 22 – Dec 21', motion:'drift',
    text:'The archer is a centaur drawn at full tension, his arrow aimed forever at the Scorpion’s heart. Some name him the wise Chiron, tutor of heroes, who was struck by one of Heracles’ poisoned arrows and chose death over eternal pain, giving up his immortality so that Prometheus might be freed. Others call him Crotus, the satyr son of Pan, a skilled horseman and hunter whom the Muses loved. His bow never wavers and his arrow never flies — he is the eternal moment of aim, poised at the brightest, thickest part of the Milky Way, where the center of our galaxy burns behind him like a bowstring drawn in light.',
    b:[6], n:[[-46,10],[-40,30],[-18,34],[22,34],[40,14],[16,-2],[-8,-14],[-30,-6]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[5,2]] },

  { id:'capricorn', name:'Capricorn', symbol:'♑', figure:'Pan, the Sea-Goat',
    element:'Earth', dates:'Dec 22 – Jan 19', motion:'drift',
    text:'When monstrous Typhon rose against the gods and scattered them in panic, the goat-footed god Pan leapt into the Nile to escape. In his terror his shape split between two natures: the half above the water stayed a shaggy goat, but the half below turned to the tail of a fish. Zeus, who saw the absurd and desperate transformation, honoured the strange shape by setting it among the stars — the Sea-Goat, half wild mountain creature and half cold ocean thing, swimming forever at the lowest, darkest reach of the zodiac where the winter sun sinks to its nadir before beginning the long climb back toward spring.',
    b:[0], n:[[-60,-18],[60,-22],[44,30],[-6,40],[-40,20],[10,-6]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[5,2]] },

  { id:'aquarius', name:'Aquarius', symbol:'♒', figure:'Ganymede, Cup-Bearer',
    element:'Air', dates:'Jan 20 – Feb 18', motion:'undulate',
    text:'Ganymede, a young Trojan prince said to be the fairest of all mortals, was snatched from the slopes of Mount Ida by Zeus in the form of a great eagle and carried up to Olympus to serve as cup-bearer to the gods. His grieving father was given a pair of divine horses in compensation — cold comfort for a stolen son. In the sky Ganymede tips his jar eternally, pouring out a long river of faint stars that the ancients saw as the rains of late winter. Aquarius is the Water-Bearer, the boy who pours the heavens’ own drink down upon the thirsty earth, halfway between the cold of Capricorn and the approaching thaw of Pisces.',
    b:[0], n:[[-10,-34],[4,-30],[-4,-44],[14,-44],[-30,-10],[-50,8],[-34,26],[-54,40]],
    e:[[2,0],[3,0],[0,1],[0,4],[4,5],[5,6],[6,7]] },

  { id:'pisces', name:'Pisces', symbol:'♓', figure:'Aphrodite & Eros',
    element:'Water', dates:'Feb 19 – Mar 20', motion:'shimmer',
    text:'When Typhon came roaring down upon the gods at a feast by the Euphrates, Aphrodite and her young son Eros threw themselves into the river and took the form of two fish to escape. They tied their tails together with a cord of starlight so the current could never pull them apart — mother and child bound fast even in the depths. The two fish swim in opposite directions in the sky, yet the cord between them holds, the last sign of the zodiac before the wheel turns back to Aries and the year begins again. Pisces is the sign of endings that loop into beginnings, of bonds that hold even when the world is falling apart.',
    b:[3], n:[[-64,-20],[-40,-14],[-16,-8],[6,2],[24,16],[40,34],[58,48],[-76,-34],[70,62]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[0,7],[6,8]] },
// Append U+FE0E (text-presentation selector) so the zodiac glyphs render as
// monochrome text we can colour — not the OS's purple emoji tiles.
].map(s => ({ ...s, symbol: s.symbol + String.fromCharCode(0xFE0E), accent: ELEMENT_ACCENT[s.element] }))
