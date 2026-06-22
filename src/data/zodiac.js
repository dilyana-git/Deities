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
    text:'When Phrixus and Helle fled a murderous stepmother, a ram with a fleece of gold bore them through the sky — and its hide, hung in a far grove, became the Fleece that Jason would one day seek.',
    b:[1], n:[[-64,24],[-28,10],[6,2],[34,-10],[50,-30],[44,-52]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5]] },

  { id:'taurus', name:'Taurus', symbol:'♉', figure:'Zeus & Europa',
    element:'Earth', dates:'Apr 20 – May 20', motion:'sweep',
    text:'To win Europa, Zeus took the shape of a gentle white bull and knelt until she climbed his back — then surged across the sea to Crete, and set the bull’s likeness among the stars.',
    b:[0], n:[[0,6],[-26,-6],[-50,-16],[-72,-34],[26,-4],[50,-12],[72,-28],[-14,26],[14,24]],
    e:[[0,1],[1,2],[2,3],[0,4],[4,5],[5,6],[0,7],[0,8]] },

  { id:'gemini', name:'Gemini', symbol:'♊', figure:'Castor & Polydeuces',
    element:'Air', dates:'May 21 – Jun 20', motion:'cradle',
    text:'Castor and Polydeuces were brothers who could not bear to part; when mortal Castor fell, his immortal twin begged to share his death — so they shine together, half their days above the earth and half below.',
    b:[0,1], n:[[-30,-46],[30,-46],[-26,-10],[26,-10],[-34,26],[-18,26],[34,26],[18,26],[-22,-28],[22,-28]],
    e:[[0,8],[8,2],[2,4],[2,5],[1,9],[9,3],[3,6],[3,7],[8,9]] },

  { id:'cancer', name:'Cancer', symbol:'♋', figure:'Karkinos the Crab',
    element:'Water', dates:'Jun 21 – Jul 22', motion:'pulse',
    text:'As Heracles battled the Hydra, jealous Hera sent a crab to bite his heel; he crushed it underfoot, and in reward for that small loyalty she fixed the creature forever in the sky.',
    b:[0], n:[[0,0],[0,-46],[-44,30],[44,30],[-22,-20],[22,-20]],
    e:[[0,1],[0,2],[0,3],[0,4],[0,5]] },

  { id:'leo', name:'Leo', symbol:'♌', figure:'The Nemean Lion',
    element:'Fire', dates:'Jul 23 – Aug 22', motion:'sweep',
    text:'The Nemean Lion, whose hide no blade could pierce, terrorised the hills until Heracles throttled it with his bare arms — the first of his twelve labours, and a beast lifted whole into the heavens.',
    b:[0,6], n:[[-44,-4],[-52,-26],[-40,-44],[-16,-50],[-2,-34],[18,-8],[48,6],[10,22]],
    e:[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,0]] },

  { id:'virgo', name:'Virgo', symbol:'♍', figure:'Astraea, Star of Justice',
    element:'Earth', dates:'Aug 23 – Sep 22', motion:'breathe',
    text:'Astraea, star-maiden of justice, dwelt among mortals in the Golden Age; when the world turned to cruelty and iron she alone lingered, then withdrew at last into the sky, her scales beside her.',
    b:[0], n:[[40,40],[16,18],[-6,2],[-30,-8],[-54,-20],[-12,-28],[18,-14]],
    e:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6]] },

  { id:'libra', name:'Libra', symbol:'♎', figure:'The Scales of Justice',
    element:'Air', dates:'Sep 23 – Oct 22', motion:'cradle',
    text:'Once the claws of the Scorpion, these stars were reforged as the scales of justice — the balance in Astraea’s hand, weighing the deeds of the living against the dead.',
    b:[0], n:[[0,-30],[-44,-30],[44,-30],[-44,4],[44,4],[-58,22],[-30,22],[58,22],[30,22]],
    e:[[1,0],[0,2],[1,3],[2,4],[3,5],[3,6],[5,6],[4,7],[4,8],[7,8]] },

  { id:'scorpio', name:'Scorpio', symbol:'♏', figure:'The Scorpion of Orion',
    element:'Water', dates:'Oct 23 – Nov 21', motion:'undulate',
    text:'When the hunter Orion boasted he could kill any creature alive, the Earth sent up a scorpion to humble him; it struck him dead, and both were set in the sky — forever fleeing one another.',
    b:[3], n:[[-58,-30],[-40,-24],[-20,-16],[0,-6],[18,4],[34,18],[44,34],[38,52],[22,58]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]] },

  { id:'sagittarius', name:'Sagittarius', symbol:'♐', figure:'The Centaur Archer',
    element:'Fire', dates:'Nov 22 – Dec 21', motion:'drift',
    text:'The archer is a centaur drawn at full tension, his arrow trained on the Scorpion’s heart — some name him wise Chiron, others wild Crotus, but his aim never wavers.',
    b:[6], n:[[-46,10],[-40,30],[-18,34],[22,34],[40,14],[16,-2],[-8,-14],[-30,-6]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[5,2]] },

  { id:'capricorn', name:'Capricorn', symbol:'♑', figure:'Pan, the Sea-Goat',
    element:'Earth', dates:'Dec 22 – Jan 19', motion:'drift',
    text:'When monstrous Typhon scattered the gods, Pan leapt into the Nile to escape; his upper half stayed a goat, his lower half became a fish — and Zeus honoured the strange shape among the stars.',
    b:[0], n:[[-60,-18],[60,-22],[44,30],[-6,40],[-40,20],[10,-6]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[5,2]] },

  { id:'aquarius', name:'Aquarius', symbol:'♒', figure:'Ganymede, Cup-Bearer',
    element:'Air', dates:'Jan 20 – Feb 18', motion:'undulate',
    text:'Ganymede, fairest of mortals, was carried to Olympus on an eagle’s wings to pour nectar for the gods; he stands eternal in the sky, tipping his jar to spill a long river of stars.',
    b:[0], n:[[-10,-34],[4,-30],[-4,-44],[14,-44],[-30,-10],[-50,8],[-34,26],[-54,40]],
    e:[[2,0],[3,0],[0,1],[0,4],[4,5],[5,6],[6,7]] },

  { id:'pisces', name:'Pisces', symbol:'♓', figure:'Aphrodite & Eros',
    element:'Water', dates:'Feb 19 – Mar 20', motion:'shimmer',
    text:'Fleeing Typhon, Aphrodite and her son Eros took the form of fish and bound their tails with a cord, so the current could never separate them — two fish forever joined.',
    b:[3], n:[[-64,-20],[-40,-14],[-16,-8],[6,2],[24,16],[40,34],[58,48],[-76,-34],[70,62]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[0,7],[6,8]] },
// Append U+FE0E (text-presentation selector) so the zodiac glyphs render as
// monochrome text we can colour — not the OS's purple emoji tiles.
].map(s => ({ ...s, symbol: s.symbol + String.fromCharCode(0xFE0E), accent: ELEMENT_ACCENT[s.element] }))
