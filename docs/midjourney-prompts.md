# Midjourney Prompts — Theogony Portraits

Image-generation prompts for the figures of the celestial atlas, written for **Midjourney v6.1**.

## How to use these

The app resolves portraits purely by node `id` (see `CLAUDE.md` → *Node Glyphs & Portraits*). Drop the results into `public/portraits/` using the filename convention — no code changes needed:

| File | Where it shows | Suggested prompt / params |
|---|---|---|
| `{id}-head.webp` | Tight bust, clipped to the circular star on the graph | **Head** prompt · `--ar 1:1` |
| `{id}-full.webp` | Full-body hero image at the top of the DetailPanel | **Full** prompt · `--ar 2:3` |

`.png` variants are accepted as fallbacks. The fallback chain is `head.webp → head.png → full.webp → full.png`.

**Shared house style** (already baked into every prompt below, tweak once and reuse): *classical mythological figure, museum oil-painting meets cinematic concept art, dramatic chiaroscuro, painterly brushwork, weathered marble-and-bronze palette with gold leaf, deep celestial star-field behind, subtle constellation glow.* Every prompt ends with `--style raw --v 6.1`; the head prompts add `--ar 1:1`, the full prompts add `--ar 2:3`.

> Tip: for the circular graph node, keep the **head** framing tight (face centered, shoulders only) so nothing important is lost when the image is clipped to a circle.

---

## Requested figures

### hemera — The Bright Day (primordial)
- **Head:** `Hemera, goddess of day, head-and-shoulders portrait, face centered, serene luminous young woman with dawn-gold light breaking across her features from below, faint torch-glow at her throat, pale rose and gold, first light dissolving the last of night, museum oil painting, chiaroscuro, weathered marble-and-gold palette, deep starfield behind --ar 1:1 --style raw --v 6.1`
- **Full:** `Hemera, goddess of the bright day, full-body figure in flowing white and gold robes stepping forward as dawn breaks the darkness, a torch in one hand, radiant light spilling from her, her brother Aether fading behind, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### maia — Eldest of the Pleiades (nymph)
- **Head:** `Maia, eldest of the Pleiades, head-and-shoulders portrait, face centered, gentle modest mountain nymph with downcast starlit eyes, seven faint stars haloing her dark hair, soft grey-blue and silver, quiet and maternal, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield behind --ar 1:1 --style raw --v 6.1`
- **Full:** `Maia, mountain nymph and mother of Hermes, full-body figure seated in a shadowed Arcadian cave nursing an infant, seven stars of the Pleiades glimmering above the cave mouth, soft silver light, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### leto — Mother of the Twins (titan)
- **Head:** `Leto, gentle Titaness, head-and-shoulders portrait, face centered, weary compassionate mother with dark veiled hair, a faint sun and crescent moon glowing at either shoulder for her twin children, warm gold and deep blue, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield behind --ar 1:1 --style raw --v 6.1`
- **Full:** `Leto, mother of Apollo and Artemis, full-body figure wandering a barren shore in dark robes, heavy with child and driven on by a serpent's shadow, the floating island of Delos rising ahead, palm tree, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### epimetheus — The Afterthought (titan)
- **Head:** `Epimetheus, the Titan of afterthought, head-and-shoulders portrait, face centered, kindly rueful bearded man realizing a mistake too late, an open empty jar implied at his shoulder, earth tones and dull bronze, regret in his eyes, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield behind --ar 1:1 --style raw --v 6.1`
- **Full:** `Epimetheus, brother of Prometheus, full-body figure standing beside Pandora as she lifts the lid of the great jar, ills and shadows streaming out into the air around them, dread dawning on his face, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### semele — Mother of the Twice-Born (mortal)
- **Head:** `Semele, Theban princess, head-and-shoulders portrait, face centered, caught in the instant of being consumed by divine fire, an expression between ecstasy and terror, pale marble cracking into ember and gold light, scorched and doomed, museum oil painting, chiaroscuro, deep starfield behind --ar 1:1 --style raw --v 6.1`
- **Full:** `Semele, mortal lover of Zeus, full-body figure recoiling as Zeus reveals his true form in a storm of lightning, her body haloed and dissolving into fire and ash, ivy at her feet, the unborn Dionysus saved from the flames, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### danae — The Golden Rain (mortal)
- **Head:** `Danae, princess of Argos, head-and-shoulders portrait, face centered, beautiful young woman gazing upward in wonder as a shower of golden light falls over her, gold flecks in her dark hair, bronze walls behind, awe and destiny, museum oil painting, chiaroscuro, marble-and-gold palette, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Danae imprisoned in the bronze tower, full-body figure reclining as a shower of gold pours down from a high slit window, the metal room glowing, destiny descending upon her, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### alcmene — Strength of the Moon (mortal)
- **Head:** `Alcmene, wise and beautiful mortal woman, head-and-shoulders portrait, face centered, noble features touched with wariness, a crescent moon glowing softly behind her veiled hair, silver and warm ivory, virtue and quiet fear, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Alcmene, mother of Heracles, full-body figure fleeing across moonlit ground with a torch, glancing back over her shoulder at an unseen divine wrath, robes streaming, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### andromeda — Chained to the Rock (mortal)
- **Head:** `Andromeda, Ethiopian princess, head-and-shoulders portrait, face centered, beautiful young woman with tear-bright eyes and wind-blown hair, a broken iron chain across one bare shoulder, sea-spray and stars, sacrifice and hope, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Andromeda chained to a coastal rock, full-body figure bound at the wrists against dark stone as a vast sea-monster rises from the churning waves below, storm light, her constellation faint in the sky above, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### ariadne — Mistress of the Labyrinth (mortal)
- **Head:** `Ariadne, princess of Crete, head-and-shoulders portrait, face centered, a quiet knowing expression, a fine thread wound through her fingers at her shoulder, a crown of seven stars glowing at her brow, pale marble with faint gilding, gentle and luminous, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Ariadne on the shore of Naxos, full-body figure standing at the water's edge with a ball of red thread in one hand, a distant black-sailed ship departing, a crown of seven stars kindling above her head as Dionysus approaches, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### daedalus — Maker of the Labyrinth (mortal)
- **Head:** `Daedalus, master craftsman, head-and-shoulders portrait, face centered, an aged inventor with keen sorrowful eyes, great feathered wings strapped at his shoulders, tools and a coil of waxed cord at his collar, weathered marble and aged bronze, ingenious and grief-marked, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Daedalus in flight, full-body figure gliding on enormous feather-and-wax wings above a wine-dark sea, reaching in vain toward his falling son, the labyrinth-crowned island of Crete far below, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### adonis — Beloved of Two Goddesses (mortal)
- **Head:** `Adonis, youth of surpassing beauty, head-and-shoulders portrait, face centered, an exquisitely beautiful young man with a faint wound at his throat blooming into red anemones, serene and already fading, pale rose marble with crimson veining, mortal perfection touched by death, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Adonis the hunter, full-body figure sinking to the forest floor with a hunting spear, gored, dying in a spreading pool of red anemones as Aphrodite kneels to catch him, a boar retreating into shadow, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### phaethon — Driver of the Sun (mortal)
- **Head:** `Phaethon, son of the Sun, head-and-shoulders portrait, face centered, a youth in the moment of his fall, hair streaming with fire, eyes wide in terror, scorched bronze and molten gold streaking past him, falling against a burning sky, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Phaethon losing control of the sun-chariot, full-body figure flung from a golden chariot as four wild fire-maned horses scatter across a scorched sky, the earth burning far below, Zeus's thunderbolt streaking toward him, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### narcissus — Lover of His Own Reflection (mortal)
- **Head:** `Narcissus, beautiful cold youth, head-and-shoulders portrait, face centered, gazing downward as if into water, his own faint reflection rising toward him, pale marble flecked with gold, narcissus flowers at his shoulder, self-enclosed, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Narcissus at the pool, full-body figure kneeling over a perfectly still forest spring, transfixed by his own reflection, white-and-gold narcissus flowers springing up around him, the nymph Echo fading into the rocks behind, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### salmacis — Nymph of the Still Pool (nymph)
- **Head:** `Salmacis, water nymph, head-and-shoulders portrait, face centered, a languid nymph emerging from still water with longing in her gaze, her form beginning to dissolve into another, pale marble and teal-green water, soft and possessive, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Salmacis in her enchanted spring, full-body figure rising from a glassy teal pool with clinging arms outstretched toward a bathing youth, reeds and still water, desire and fusion, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### hermaphroditus — The Fused Being (nymph)
- **Head:** `Hermaphroditus, the fused being, head-and-shoulders portrait, face centered, a serene androgynous beauty whose features hold both man and woman at once, faint suggestion of a second face merged with the first, pale marble rising from water, ambiguous and complete, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Hermaphroditus by the pool, full-body androgynous figure half-risen from a still spring, two forms fused into one graceful body, teal water and pale stone, union made flesh, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### tiresias — The Blind Seer of Both Sexes (mortal)
- **Head:** `Tiresias, blind prophet, head-and-shoulders portrait, face centered, an ancient seer with clouded eyes and a face holding both masculine and feminine features, two carved serpents entwined at the shoulder, weathered grey marble veined with silver, prophetic stillness, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Tiresias the seer, full-body figure leaning on a tall staff before two coupling serpents on a forest path, blind eyes lifted, robes half-shifting between man and woman, silver prophetic light, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### oedipus — He Who Knows His Foot (hero)
- **Head:** `Oedipus, tragic king of Thebes, head-and-shoulders portrait, face centered, a haunted man with blood at his eyes and a crown askew, anguish and terrible knowledge in his ruined gaze, dark bronze and shadow, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Oedipus at the crossroads, full-body figure standing where three roads meet before the crouching winged Sphinx, staff in hand, dust and fate, the walls of Thebes distant, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### jason — Leader of the Argonauts (hero)
- **Head:** `Jason, hero of the Argonauts, head-and-shoulders portrait, face centered, a handsome ambitious young leader, the golden fleece draped over one shoulder catching the light, a shadow of coming betrayal in his eyes, warm gold and bronze, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Jason seizing the Golden Fleece, full-body figure reaching for the glowing golden ram's fleece hung in a dark sacred oak, the drugged serpent coiled below, the ship Argo waiting at the shore, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### medea — The Sorceress of Colchis (sorceress)
- **Head:** `Medea, sorceress of Colchis, head-and-shoulders portrait, face centered, a cold dangerous intelligence in her eyes, holding a small potion-cup, herbs and a coiled serpent at her shoulder, weathered marble darkened with bronze and verdigris and a faint green glow, beautiful and ruinous, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Medea in her fury, full-body figure standing in a dragon-drawn chariot rising into a storm sky, robes billowing, a potion-cup in one hand and herbs scattering, green sorcerous fire around her, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### geryon — The Three-Bodied Giant (monster)
- **Head:** `Geryon, three-bodied giant, head-and-shoulders portrait, three fused warrior heads and torsos sharing one broad frame, six eyes, grim and monstrous, red-tinged bronze skin, dusk light of the western isles, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Geryon the western giant, full-body three-bodied winged warrior standing among a vast herd of red cattle on a wind-blown island at sunset, three shields and three spears, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### polyphemus — The One-Eyed Giant (monster)
- **Head:** `Polyphemus the Cyclops, head-and-shoulders portrait, face centered, a massive one-eyed giant with matted hair and beard, a single great eye above a broad brutish face, cave-shadow and firelight, wild and menacing, museum oil painting, chiaroscuro, marble-and-bronze palette, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Polyphemus in his cave, full-body one-eyed giant shepherd rearing back as a burning sharpened stake is driven toward his single eye, sheep scattering, firelight and stone, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### euryale — The Wide-Roaming (Gorgon)
- **Head:** `Euryale, immortal Gorgon sister, head-and-shoulders portrait, face centered, a terrible beautiful face crowned with living serpents, bronze wings edging the frame, a mouth open mid-wail, green-bronze and shadow, dread and grief, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Euryale the Gorgon, full-body winged figure with a mane of hissing snakes and bronze claws, wings spread, roaring her grief across a desolate rocky shore for her slain sister Medusa, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### humanity — The Clay-Born (mortal)
- **Head:** `Humanity, the clay-born, head-and-shoulders portrait, face centered, an androgynous first human of living clay looking upward toward the stars with dawning awareness, a small ember of stolen fire glowing at the throat, earth-brown and gold, wonder and mortality, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Humanity awakening, full-body figures of clay rising from the earth and taking their first breath as divine fire is placed in their hands, looking up at a vast star-filled sky, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

---

## New figures — The Iliad

### achilles — The Best of the Achaeans (hero)
- **Head:** `Achilles, best of the Achaeans, head-and-shoulders portrait, face centered, a beautiful terrible young warrior in a horsehair-crested bronze helm, jaw set in grief-hardened rage, weathered gold-bronze streaked with blood-red oxide, glorious and doomed, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Achilles in wrath, full-body armored warrior standing over the Trojan plain with an ash-wood spear, dragging Hector's body behind his chariot in the dust beneath the walls of Troy, dawn fires, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### patroclus — Dearest to Achilles (hero)
- **Head:** `Patroclus, dearest companion of Achilles, head-and-shoulders portrait, face centered, a gentle-eyed warrior wearing the borrowed armor of Achilles a size too large, tenderness and courage mingled, pale marble and dimmed bronze with a faint shadow of death, noble and sacrificial, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Patroclus in borrowed armor, full-body figure rallying the Greeks in Achilles' bright panoply beside the burning ships, spear raised, Trojans falling back, a divine hand loosening the helmet from his head, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### hector — Bulwark of Troy (hero)
- **Head:** `Hector, bulwark of Troy, head-and-shoulders portrait, face centered, a noble bearded warrior in a horsehair-crested helm, sorrow and resolve in his eyes as if looking back at his city, weathered bronze and sandstone dusted with the plain, dutiful and tragic, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Hector's farewell, full-body armored warrior at the Scaean Gate reaching for his infant son who recoils from the plume of his helmet, his wife Andromache pleading, the towers of Troy behind, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### ajax — The Tower of the Greeks (hero)
- **Head:** `Ajax the Great, tower of the Greeks, head-and-shoulders portrait, face centered, an immense grim-jawed warrior half-shadowed by the rim of a vast tower shield, brute strength edged with the first darkness of madness, iron-grey and heavy bronze, monumental and brooding, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Ajax with the great shield, full-body colossal warrior planted on the decks of the Greek ships holding off Trojan firebrands with a long pike behind a seven-layered tower shield, smoke and flame, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### diomedes — He Who Wounded Gods (hero)
- **Head:** `Diomedes, tamer of horses, head-and-shoulders portrait, face centered, a fierce clear-eyed young warrior lit by the grey gleam of Athena's favor, spear-scarred and fearless, cool silver-grey marble with bright bronze, martial and blessed, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Diomedes wounding the gods, full-body warrior driving a spear that wounds a shining goddess on the battlefield as she recoils in golden blood, grey divine light of Athena around him, Trojan ranks scattering, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### agamemnon — Lord of Men (king)
- **Head:** `Agamemnon, lord of men, head-and-shoulders portrait, face centered, a proud imperious king wearing a beaten golden funerary mask, hard commanding eyes, a scepter's head at his shoulder, aged gold and dark bronze, majestic and doomed, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Agamemnon the high king, full-body figure in a rich war-cloak holding a great scepter before the assembled Greek host and beached ships, imperious and proud, a faint shadow of an axe over him, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### menelaus — King of Sparta (king)
- **Head:** `Menelaus, king of Sparta, head-and-shoulders portrait, face centered, a red-haired battle-worn king with a jaw clenched over an old grievance, a spear and Spartan crest implied, weathered bronze and iron-red, wronged and relentless, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Menelaus and Paris, full-body Spartan warrior dragging the Trojan prince Paris by the helmet-strap across the dueling ground between two armies, spear raised for the kill, dust and banners, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### priam — The Last King of Troy (king)
- **Head:** `Priam, last king of Troy, head-and-shoulders portrait, face centered, an ancient grief-stricken king with a long white beard and hollow eyes, hands rising in supplication at the edge of the frame, pale cracked marble veined with ash and faded gold, sorrowful and dignified, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `The ransom of Hector, full-body aged king kneeling in Achilles' firelit tent, kissing the hands of the man who killed his son, begging for the body, both figures caught in shared grief, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### paris — Bearer of the Golden Apple (prince)
- **Head:** `Paris, prince of Troy, head-and-shoulders portrait, face centered, a beautiful careless youth holding a single golden apple near his shoulder, a bow slung behind, soft rose-gold marble with warm bronze, alluring and ruinous, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `The Judgment of Paris, full-body young shepherd-prince on Mount Ida offering a golden apple to one of three radiant goddesses before him, sheep and pastoral hills, fateful choice, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### helen — The Face That Launched a Thousand Ships (mortal)
- **Head:** `Helen of Troy, head-and-shoulders portrait, face centered, a woman of unbearable beauty with a distant sorrowful gaze, faint reflections of burning ships in her eyes, luminous pale marble with fine gilding, exquisite and blamed, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Helen on the walls of Troy, full-body figure in shining robes standing at a high rampart looking down over two vast armies on the plain, a veil lifting in the wind, distant ships and firelight, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### andromache — Wife of Hector (mortal)
- **Head:** `Andromache, wife of Hector, head-and-shoulders portrait, face centered, a tender grieving woman with a small infant's hand implied at her shoulder and a veil half-drawn, an expression of enduring loss, soft grey-white marble with muted bronze, devoted and bereaved, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Andromache's farewell, full-body figure holding her frightened infant son at the Scaean Gate, reaching toward her armored husband Hector as he turns to battle, the towers of Troy behind, tender and doomed, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### briseis — The War-Prize (mortal)
- **Head:** `Briseis, war-prize of Achilles, head-and-shoulders portrait, face centered, a beautiful captive woman with downcast tear-bright eyes and a broken bridal wreath at her shoulder, pale marble dimmed with grey and faint bronze, sorrowful and unfree, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Briseis led away, full-body captive woman in plain robes being led from Achilles' tent between two heralds, looking back over her shoulder, the divided Greek camp and beached ships behind, sorrow and injustice, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

---

## New figures — The Odyssey

### penelope — The Faithful Weaver (queen)
- **Head:** `Penelope, faithful weaver of Ithaca, head-and-shoulders portrait, face centered, a patient clear-eyed queen with fine threads of an unfinished web drifting from her fingers at her shoulder, quiet unbreakable resolve, warm ivory marble with soft gold, steadfast and wise, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Penelope at the loom, full-body figure by candlelight secretly unravelling the great burial shroud she wove by day, a sleeping palace behind her, threads glowing, patient cunning, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### telemachus — The Son Who Sought His Father (prince)
- **Head:** `Telemachus, son of Odysseus, head-and-shoulders portrait, face centered, an earnest young man on the edge of manhood in a traveler's cloak with a spear implied, searching hopeful eyes, pale marble and fresh bronze, youthful and resolute, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Telemachus setting out, full-body young man boarding a small ship at dawn with a spear and cloak, the goddess Athena in the guise of an old mentor at his side, Ithaca's harbor behind, a hero's first voyage, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`

### nausicaa — Princess of the Phaeacians (princess)
- **Head:** `Nausicaa, princess of the Phaeacians, head-and-shoulders portrait, face centered, a bright kind young princess with sea-wind in her hair and a folded white garment at her shoulder, an open generous gaze, pale marble washed with sea-green and warm gold, gracious and luminous, museum oil painting, chiaroscuro, deep starfield --ar 1:1 --style raw --v 6.1`
- **Full:** `Nausicaa on the shore, full-body princess standing bravely with an offered white garment as the shipwrecked stranger emerges from the bushes, her handmaids fleeing behind, laundry drying on the riverbank, sea light, cinematic mythological oil painting, chiaroscuro, celestial star-field, gold leaf --ar 2:3 --style raw --v 6.1`
