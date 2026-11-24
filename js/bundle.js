/**
 * Flag Guess & Draw Replica - Standalone Universal Bundle
 * Compatible with file:// and http:// protocols across all browsers.
 * Built according to Swiss Graphic Design / International Typographic Style
 */

// --- FLAGS & TIERS DATASET ---
/**
 * Dataset completo de Banderas con soporte Bilingüe (Español / Inglés)
 * y dos Enfoques de Dificultad independientes:
 * - popTier: Por Popularidad y Conocimiento del país (1 = Más conocidas -> 4 = Micronaciones)
 * - designTier: Por Complejidad de Dibujo tomando como base el modo sin escudos (1 = Franjas/Bicolores -> 4 = Patrones intrincados)
 */

const TIER_META = {
  popularity: {
    1: { id: 1, name: { es: 'Tier 1: Países Famosos', en: 'Tier 1: Famous Countries' }, shortName: { es: 'Famosos', en: 'Famous' } },
    2: { id: 2, name: { es: 'Tier 2: Muy Conocidos', en: 'Tier 2: Well Known' }, shortName: { es: 'Conocidos', en: 'Known' } },
    3: { id: 3, name: { es: 'Tier 3: Menos Comunes', en: 'Tier 3: Less Common' }, shortName: { es: 'Menos comunes', en: 'Uncommon' } },
    4: { id: 4, name: { es: 'Tier 4: Raros / Micronaciones', en: 'Tier 4: Rare / Micronations' }, shortName: { es: 'Micronaciones', en: 'Rare' } }
  },
  design: {
    1: { id: 1, name: { es: 'Tier 1: Franjas Simples', en: 'Tier 1: Simple Stripes' }, shortName: { es: 'Simple', en: 'Simple' } },
    2: { id: 2, name: { es: 'Tier 2: Símbolo Básico', en: 'Tier 2: Basic Symbol' }, shortName: { es: 'Medio', en: 'Medium' } },
    3: { id: 3, name: { es: 'Tier 3: Patrón Complejo', en: 'Tier 3: Complex Pattern' }, shortName: { es: 'Complejo', en: 'Complex' } },
    4: { id: 4, name: { es: 'Tier 4: Muy Intrincadas', en: 'Tier 4: Intricate Pattern' }, shortName: { es: 'Intrincado', en: 'Intricate' } }
  }
};

const FLAGS = [
  { id: "us", name: {"en": "United States", "es": "Estados Unidos"}, popTier: 1, designTier: 3, url: "assets/flags/us.svg", hasShield: false, shield: null },
  { id: "gb", name: {"en": "United Kingdom", "es": "Reino Unido"}, popTier: 1, designTier: 3, url: "assets/flags/gb.svg", hasShield: false, shield: null },
  { id: "fr", name: {"en": "France", "es": "Francia"}, popTier: 1, designTier: 1, url: "assets/flags/fr.svg", hasShield: false, shield: null },
  { id: "de", name: {"en": "Germany", "es": "Alemania"}, popTier: 1, designTier: 1, url: "assets/flags/de.svg", hasShield: false, shield: null },
  { id: "it", name: {"en": "Italy", "es": "Italia"}, popTier: 1, designTier: 1, url: "assets/flags/it.svg", hasShield: false, shield: null },
  { id: "es", name: {"en": "Spain", "es": "España"}, popTier: 1, designTier: 1, url: "assets/flags/es.svg", hasShield: true, shield: {"x": [50, 115], "y": [70, 135], "fill": "#FFD100"} },
  { id: "jp", name: {"en": "Japan", "es": "Japón"}, popTier: 1, designTier: 2, url: "assets/flags/jp.svg", hasShield: false, shield: null },
  { id: "br", name: {"en": "Brazil", "es": "Brasil"}, popTier: 1, designTier: 4, url: "assets/flags/br.svg", hasShield: false, shield: null },
  { id: "ar", name: {"en": "Argentina", "es": "Argentina"}, popTier: 1, designTier: 2, url: "assets/flags/ar.svg", hasShield: true, shield: {"x": [120, 180], "y": [75, 125], "fill": "#FFFFFF"} },
  { id: "mx", name: {"en": "Mexico", "es": "México"}, popTier: 1, designTier: 1, url: "assets/flags/mx.svg", hasShield: true, shield: {"x": [115, 185], "y": [65, 135], "fill": "#FFFFFF"} },
  { id: "ca", name: {"en": "Canada", "es": "Canadá"}, popTier: 1, designTier: 2, url: "assets/flags/ca.svg", hasShield: false, shield: null },
  { id: "cn", name: {"en": "China", "es": "China"}, popTier: 1, designTier: 2, url: "assets/flags/cn.svg", hasShield: false, shield: null },
  { id: "ru", name: {"en": "Russia", "es": "Rusia"}, popTier: 1, designTier: 1, url: "assets/flags/ru.svg", hasShield: false, shield: null },
  { id: "au", name: {"en": "Australia", "es": "Australia"}, popTier: 1, designTier: 3, url: "assets/flags/au.svg", hasShield: false, shield: null },
  { id: "co", name: {"en": "Colombia", "es": "Colombia"}, popTier: 1, designTier: 1, url: "assets/flags/co.svg", hasShield: false, shield: null },
  { id: "cl", name: {"en": "Chile", "es": "Chile"}, popTier: 1, designTier: 2, url: "assets/flags/cl.svg", hasShield: false, shield: null },
  { id: "pe", name: {"en": "Peru", "es": "Perú"}, popTier: 1, designTier: 1, url: "assets/flags/pe.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 130], "fill": "#FFFFFF"} },
  { id: "pt", name: {"en": "Portugal", "es": "Portugal"}, popTier: 1, designTier: 1, url: "assets/flags/pt.svg", hasShield: true, shield: {"x": [85, 155], "y": [65, 135], "fill": "#009A44"} },
  { id: "nl", name: {"en": "Netherlands", "es": "Países Bajos"}, popTier: 1, designTier: 1, url: "assets/flags/nl.svg", hasShield: false, shield: null },
  { id: "ch", name: {"en": "Switzerland", "es": "Suiza"}, popTier: 1, designTier: 2, url: "assets/flags/ch.svg", hasShield: false, shield: null },
  { id: "se", name: {"en": "Sweden", "es": "Suecia"}, popTier: 1, designTier: 2, url: "assets/flags/se.svg", hasShield: false, shield: null },
  { id: "kr", name: {"en": "South Korea", "es": "Corea del Sur"}, popTier: 1, designTier: 3, url: "assets/flags/kr.svg", hasShield: false, shield: null },
  { id: "tr", name: {"en": "Turkey", "es": "Turquía"}, popTier: 1, designTier: 2, url: "assets/flags/tr.svg", hasShield: false, shield: null },
  { id: "gr", name: {"en": "Greece", "es": "Grecia"}, popTier: 1, designTier: 3, url: "assets/flags/gr.svg", hasShield: false, shield: null },
  { id: "in", name: {"en": "India", "es": "India"}, popTier: 1, designTier: 2, url: "assets/flags/in.svg", hasShield: false, shield: null },
  { id: "eg", name: {"en": "Egypt", "es": "Egipto"}, popTier: 1, designTier: 1, url: "assets/flags/eg.svg", hasShield: true, shield: {"x": [120, 180], "y": [75, 125], "fill": "#FFFFFF"} },
  { id: "cu", name: {"en": "Cuba", "es": "Cuba"}, popTier: 1, designTier: 3, url: "assets/flags/cu.svg", hasShield: false, shield: null },
  { id: "uy", name: {"en": "Uruguay", "es": "Uruguay"}, popTier: 1, designTier: 3, url: "assets/flags/uy.svg", hasShield: true, shield: {"x": [0, 95], "y": [0, 90], "fill": "#FFFFFF"} },
  { id: "be", name: {"en": "Belgium", "es": "Bélgica"}, popTier: 1, designTier: 1, url: "assets/flags/be.svg", hasShield: false, shield: null },
  { id: "ie", name: {"en": "Ireland", "es": "Irlanda"}, popTier: 1, designTier: 1, url: "assets/flags/ie.svg", hasShield: false, shield: null },
  { id: "dk", name: {"en": "Denmark", "es": "Dinamarca"}, popTier: 1, designTier: 2, url: "assets/flags/dk.svg", hasShield: false, shield: null },
  { id: "pl", name: {"en": "Poland", "es": "Polonia"}, popTier: 1, designTier: 1, url: "assets/flags/pl.svg", hasShield: false, shield: null },
  { id: "at", name: {"en": "Austria", "es": "Austria"}, popTier: 1, designTier: 1, url: "assets/flags/at.svg", hasShield: false, shield: null },
  { id: "za", name: {"en": "South Africa", "es": "Sudáfrica"}, popTier: 1, designTier: 3, url: "assets/flags/za.svg", hasShield: false, shield: null },
  { id: "no", name: {"en": "Norway", "es": "Noruega"}, popTier: 1, designTier: 3, url: "assets/flags/no.svg", hasShield: false, shield: null },
  { id: "ua", name: {"en": "Ukraine", "es": "Ucrania"}, popTier: 2, designTier: 1, url: "assets/flags/ua.svg", hasShield: false, shield: null },
  { id: "id", name: {"en": "Indonesia", "es": "Indonesia"}, popTier: 2, designTier: 1, url: "assets/flags/id.svg", hasShield: false, shield: null },
  { id: "fi", name: {"en": "Finland", "es": "Finlandia"}, popTier: 2, designTier: 2, url: "assets/flags/fi.svg", hasShield: false, shield: null },
  { id: "nz", name: {"en": "New Zealand", "es": "Nueva Zelanda"}, popTier: 2, designTier: 3, url: "assets/flags/nz.svg", hasShield: false, shield: null },
  { id: "jm", name: {"en": "Jamaica", "es": "Jamaica"}, popTier: 2, designTier: 3, url: "assets/flags/jm.svg", hasShield: false, shield: null },
  { id: "ve", name: {"en": "Venezuela", "es": "Venezuela"}, popTier: 2, designTier: 2, url: "assets/flags/ve.svg", hasShield: false, shield: null },
  { id: "cr", name: {"en": "Costa Rica", "es": "Costa Rica"}, popTier: 2, designTier: 1, url: "assets/flags/cr.svg", hasShield: true, shield: {"x": [50, 105], "y": [75, 125], "fill": "#CE1126"} },
  { id: "sa", name: {"en": "Saudi Arabia", "es": "Arabia Saudita"}, popTier: 2, designTier: 4, url: "assets/flags/sa.svg", hasShield: false, shield: null },
  { id: "ma", name: {"en": "Morocco", "es": "Marruecos"}, popTier: 2, designTier: 2, url: "assets/flags/ma.svg", hasShield: false, shield: null },
  { id: "th", name: {"en": "Thailand", "es": "Tailandia"}, popTier: 2, designTier: 2, url: "assets/flags/th.svg", hasShield: false, shield: null },
  { id: "ph", name: {"en": "Philippines", "es": "Filipinas"}, popTier: 2, designTier: 3, url: "assets/flags/ph.svg", hasShield: false, shield: null },
  { id: "il", name: {"en": "Israel", "es": "Israel"}, popTier: 2, designTier: 2, url: "assets/flags/il.svg", hasShield: false, shield: null },
  { id: "cz", name: {"en": "Czechia", "es": "Chequia"}, popTier: 2, designTier: 2, url: "assets/flags/cz.svg", hasShield: false, shield: null },
  { id: "hu", name: {"en": "Hungary", "es": "Hungría"}, popTier: 2, designTier: 1, url: "assets/flags/hu.svg", hasShield: false, shield: null },
  { id: "ro", name: {"en": "Romania", "es": "Rumania"}, popTier: 2, designTier: 1, url: "assets/flags/ro.svg", hasShield: false, shield: null },
  { id: "ng", name: {"en": "Nigeria", "es": "Nigeria"}, popTier: 2, designTier: 1, url: "assets/flags/ng.svg", hasShield: false, shield: null },
  { id: "vn", name: {"en": "Vietnam", "es": "Vietnam"}, popTier: 2, designTier: 2, url: "assets/flags/vn.svg", hasShield: false, shield: null },
  { id: "pa", name: {"en": "Panama", "es": "Panamá"}, popTier: 2, designTier: 3, url: "assets/flags/pa.svg", hasShield: false, shield: null },
  { id: "ec", name: {"en": "Ecuador", "es": "Ecuador"}, popTier: 2, designTier: 1, url: "assets/flags/ec.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 135], "fill": "#002654"} },
  { id: "bo", name: {"en": "Bolivia", "es": "Bolivia"}, popTier: 2, designTier: 1, url: "assets/flags/bo.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 130], "fill": "#FFD100"} },
  { id: "pk", name: {"en": "Pakistan", "es": "Pakistán"}, popTier: 2, designTier: 2, url: "assets/flags/pk.svg", hasShield: false, shield: null },
  { id: "sg", name: {"en": "Singapore", "es": "Singapur"}, popTier: 2, designTier: 2, url: "assets/flags/sg.svg", hasShield: false, shield: null },
  { id: "is", name: {"en": "Iceland", "es": "Islandia"}, popTier: 2, designTier: 3, url: "assets/flags/is.svg", hasShield: false, shield: null },
  { id: "hr", name: {"en": "Croatia", "es": "Croacia"}, popTier: 2, designTier: 1, url: "assets/flags/hr.svg", hasShield: true, shield: {"x": [115, 185], "y": [55, 145], "fill": "#FFFFFF"} },
  { id: "ae", name: {"en": "United Arab Emirates", "es": "Emiratos Árabes Unidos"}, popTier: 2, designTier: 2, url: "assets/flags/ae.svg", hasShield: false, shield: null },
  { id: "qa", name: {"en": "Qatar", "es": "Catar"}, popTier: 2, designTier: 2, url: "assets/flags/qa.svg", hasShield: false, shield: null },
  { id: "ke", name: {"en": "Kenya", "es": "Kenia"}, popTier: 2, designTier: 3, url: "assets/flags/ke.svg", hasShield: false, shield: null },
  { id: "lb", name: {"en": "Lebanon", "es": "Líbano"}, popTier: 2, designTier: 2, url: "assets/flags/lb.svg", hasShield: false, shield: null },
  { id: "mc", name: {"en": "Monaco", "es": "Mónaco"}, popTier: 2, designTier: 1, url: "assets/flags/mc.svg", hasShield: false, shield: null },
  { id: "do", name: {"en": "Dominican Republic", "es": "República Dominicana"}, popTier: 2, designTier: 2, url: "assets/flags/do.svg", hasShield: true, shield: {"x": [125, 175], "y": [75, 125], "fill": "#FFFFFF"} },
  { id: "gt", name: {"en": "Guatemala", "es": "Guatemala"}, popTier: 2, designTier: 1, url: "assets/flags/gt.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 130], "fill": "#FFFFFF"} },
  { id: "py", name: {"en": "Paraguay", "es": "Paraguay"}, popTier: 2, designTier: 1, url: "assets/flags/py.svg", hasShield: true, shield: {"x": [120, 180], "y": [75, 125], "fill": "#FFFFFF"} },
  { id: "sk", name: {"en": "Slovakia", "es": "Eslovaquia"}, popTier: 2, designTier: 1, url: "assets/flags/sk.svg", hasShield: true, shield: {"x": [45, 115], "y": [40, 140], "fill": "#002654"} },
  { id: "rs", name: {"en": "Serbia", "es": "Serbia"}, popTier: 2, designTier: 1, url: "assets/flags/rs.svg", hasShield: true, shield: {"x": [60, 125], "y": [50, 150], "fill": "#002654"} },
  { id: "bg", name: {"en": "Bulgaria", "es": "Bulgaria"}, popTier: 2, designTier: 1, url: "assets/flags/bg.svg", hasShield: false, shield: null },
  { id: "gh", name: {"en": "Ghana", "es": "Ghana"}, popTier: 2, designTier: 2, url: "assets/flags/gh.svg", hasShield: false, shield: null },
  { id: "ee", name: {"en": "Estonia", "es": "Estonia"}, popTier: 3, designTier: 1, url: "assets/flags/ee.svg", hasShield: false, shield: null },
  { id: "lt", name: {"en": "Lithuania", "es": "Lituania"}, popTier: 3, designTier: 1, url: "assets/flags/lt.svg", hasShield: false, shield: null },
  { id: "lv", name: {"en": "Latvia", "es": "Letonia"}, popTier: 3, designTier: 1, url: "assets/flags/lv.svg", hasShield: false, shield: null },
  { id: "si", name: {"en": "Slovenia", "es": "Eslovenia"}, popTier: 3, designTier: 1, url: "assets/flags/si.svg", hasShield: true, shield: {"x": [50, 105], "y": [30, 90], "fill": "#FFFFFF"} },
  { id: "al", name: {"en": "Albania", "es": "Albania"}, popTier: 3, designTier: 3, url: "assets/flags/al.svg", hasShield: false, shield: null },
  { id: "cy", name: {"en": "Cyprus", "es": "Chipre"}, popTier: 3, designTier: 4, url: "assets/flags/cy.svg", hasShield: false, shield: null },
  { id: "ge", name: {"en": "Georgia", "es": "Georgia"}, popTier: 3, designTier: 3, url: "assets/flags/ge.svg", hasShield: false, shield: null },
  { id: "kz", name: {"en": "Kazakhstan", "es": "Kazajistán"}, popTier: 3, designTier: 4, url: "assets/flags/kz.svg", hasShield: false, shield: null },
  { id: "np", name: {"en": "Nepal", "es": "Nepal"}, popTier: 3, designTier: 4, url: "assets/flags/np.svg", hasShield: false, shield: null },
  { id: "lk", name: {"en": "Sri Lanka", "es": "Sri Lanka"}, popTier: 3, designTier: 4, url: "assets/flags/lk.svg", hasShield: false, shield: null },
  { id: "my", name: {"en": "Malaysia", "es": "Malasia"}, popTier: 3, designTier: 3, url: "assets/flags/my.svg", hasShield: false, shield: null },
  { id: "jo", name: {"en": "Jordan", "es": "Jordania"}, popTier: 3, designTier: 2, url: "assets/flags/jo.svg", hasShield: false, shield: null },
  { id: "kw", name: {"en": "Kuwait", "es": "Kuwait"}, popTier: 3, designTier: 2, url: "assets/flags/kw.svg", hasShield: false, shield: null },
  { id: "ba", name: {"en": "Bosnia and Herzegovina", "es": "Bosnia y Herzegovina"}, popTier: 3, designTier: 3, url: "assets/flags/ba.svg", hasShield: false, shield: null },
  { id: "mk", name: {"en": "North Macedonia", "es": "Macedonia del Norte"}, popTier: 3, designTier: 3, url: "assets/flags/mk.svg", hasShield: false, shield: null },
  { id: "tz", name: {"en": "Tanzania", "es": "Tanzania"}, popTier: 3, designTier: 3, url: "assets/flags/tz.svg", hasShield: false, shield: null },
  { id: "ug", name: {"en": "Uganda", "es": "Uganda"}, popTier: 3, designTier: 3, url: "assets/flags/ug.svg", hasShield: false, shield: null },
  { id: "ci", name: {"en": "Ivory Coast", "es": "Costa de Marfil"}, popTier: 3, designTier: 1, url: "assets/flags/ci.svg", hasShield: false, shield: null },
  { id: "zw", name: {"en": "Zimbabwe", "es": "Zimbabue"}, popTier: 3, designTier: 3, url: "assets/flags/zw.svg", hasShield: false, shield: null },
  { id: "tt", name: {"en": "Trinidad and Tobago", "es": "Trinidad y Tobago"}, popTier: 3, designTier: 2, url: "assets/flags/tt.svg", hasShield: false, shield: null },
  { id: "bs", name: {"en": "Bahamas", "es": "Bahamas"}, popTier: 3, designTier: 2, url: "assets/flags/bs.svg", hasShield: false, shield: null },
  { id: "gy", name: {"en": "Guyana", "es": "Guyana"}, popTier: 3, designTier: 3, url: "assets/flags/gy.svg", hasShield: false, shield: null },
  { id: "sr", name: {"en": "Suriname", "es": "Surinam"}, popTier: 3, designTier: 2, url: "assets/flags/sr.svg", hasShield: false, shield: null },
  { id: "bb", name: {"en": "Barbados", "es": "Barbados"}, popTier: 3, designTier: 2, url: "assets/flags/bb.svg", hasShield: false, shield: null },
  { id: "ag", name: {"en": "Antigua and Barbuda", "es": "Antigua y Barbuda"}, popTier: 3, designTier: 3, url: "assets/flags/ag.svg", hasShield: false, shield: null },
  { id: "bh", name: {"en": "Bahrain", "es": "Baréin"}, popTier: 3, designTier: 2, url: "assets/flags/bh.svg", hasShield: false, shield: null },
  { id: "mz", name: {"en": "Mozambique", "es": "Mozambique"}, popTier: 3, designTier: 4, url: "assets/flags/mz.svg", hasShield: false, shield: null },
  { id: "lu", name: {"en": "Luxembourg", "es": "Luxemburgo"}, popTier: 3, designTier: 1, url: "assets/flags/lu.svg", hasShield: false, shield: null },
  { id: "mt", name: {"en": "Malta", "es": "Malta"}, popTier: 3, designTier: 2, url: "assets/flags/mt.svg", hasShield: false, shield: null },
  { id: "sc", name: {"en": "Seychelles", "es": "Seychelles"}, popTier: 3, designTier: 3, url: "assets/flags/sc.svg", hasShield: false, shield: null },
  { id: "pg", name: {"en": "Papua New Guinea", "es": "Papúa Nueva Guinea"}, popTier: 3, designTier: 4, url: "assets/flags/pg.svg", hasShield: false, shield: null },
  { id: "mn", name: {"en": "Mongolia", "es": "Mongolia"}, popTier: 3, designTier: 3, url: "assets/flags/mn.svg", hasShield: false, shield: null },
  { id: "ye", name: {"en": "Yemen", "es": "Yemen"}, popTier: 3, designTier: 1, url: "assets/flags/ye.svg", hasShield: false, shield: null },
  { id: "td", name: {"en": "Chad", "es": "Chad"}, popTier: 3, designTier: 1, url: "assets/flags/td.svg", hasShield: false, shield: null },
  { id: "gn", name: {"en": "Guinea", "es": "Guinea"}, popTier: 3, designTier: 1, url: "assets/flags/gn.svg", hasShield: false, shield: null },
  { id: "ml", name: {"en": "Mali", "es": "Malí"}, popTier: 3, designTier: 1, url: "assets/flags/ml.svg", hasShield: false, shield: null },
  { id: "ad", name: {"en": "Andorra", "es": "Andorra"}, popTier: 4, designTier: 1, url: "assets/flags/ad.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 130], "fill": "#FFD100"} },
  { id: "sm", name: {"en": "San Marino", "es": "San Marino"}, popTier: 4, designTier: 1, url: "assets/flags/sm.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 130], "fill": "#FFFFFF"} },
  { id: "va", name: {"en": "Vatican City", "es": "Ciudad del Vaticano"}, popTier: 4, designTier: 4, url: "assets/flags/va.svg", hasShield: true, shield: {"x": [170, 260], "y": [60, 140], "fill": "#FFFFFF"} },
  { id: "li", name: {"en": "Liechtenstein", "es": "Liechtenstein"}, popTier: 4, designTier: 2, url: "assets/flags/li.svg", hasShield: false, shield: null },
  { id: "tv", name: {"en": "Tuvalu", "es": "Tuvalu"}, popTier: 4, designTier: 3, url: "assets/flags/tv.svg", hasShield: false, shield: null },
  { id: "nr", name: {"en": "Nauru", "es": "Nauru"}, popTier: 4, designTier: 2, url: "assets/flags/nr.svg", hasShield: false, shield: null },
  { id: "ki", name: {"en": "Kiribati", "es": "Kiribati"}, popTier: 4, designTier: 4, url: "assets/flags/ki.svg", hasShield: false, shield: null },
  { id: "pw", name: {"en": "Palau", "es": "Palaos"}, popTier: 4, designTier: 2, url: "assets/flags/pw.svg", hasShield: false, shield: null },
  { id: "mh", name: {"en": "Marshall Islands", "es": "Islas Marshall"}, popTier: 4, designTier: 3, url: "assets/flags/mh.svg", hasShield: false, shield: null },
  { id: "fm", name: {"en": "Micronesia", "es": "Micronesia"}, popTier: 4, designTier: 2, url: "assets/flags/fm.svg", hasShield: false, shield: null },
  { id: "ws", name: {"en": "Samoa", "es": "Samoa"}, popTier: 4, designTier: 3, url: "assets/flags/ws.svg", hasShield: false, shield: null },
  { id: "to", name: {"en": "Tonga", "es": "Tonga"}, popTier: 4, designTier: 2, url: "assets/flags/to.svg", hasShield: false, shield: null },
  { id: "vu", name: {"en": "Vanuatu", "es": "Vanuatu"}, popTier: 4, designTier: 4, url: "assets/flags/vu.svg", hasShield: false, shield: null },
  { id: "fj", name: {"en": "Fiji", "es": "Fiyi"}, popTier: 4, designTier: 3, url: "assets/flags/fj.svg", hasShield: true, shield: {"x": [170, 260], "y": [70, 130], "fill": "#75AADB"} },
  { id: "sb", name: {"en": "Solomon Islands", "es": "Islas Salomón"}, popTier: 4, designTier: 3, url: "assets/flags/sb.svg", hasShield: false, shield: null },
  { id: "bt", name: {"en": "Bhutan", "es": "Bután"}, popTier: 4, designTier: 4, url: "assets/flags/bt.svg", hasShield: false, shield: null },
  { id: "tm", name: {"en": "Turkmenistan", "es": "Turkmenistán"}, popTier: 4, designTier: 4, url: "assets/flags/tm.svg", hasShield: false, shield: null },
  { id: "kg", name: {"en": "Kyrgyzstan", "es": "Kirguistán"}, popTier: 4, designTier: 3, url: "assets/flags/kg.svg", hasShield: false, shield: null },
  { id: "tj", name: {"en": "Tajikistan", "es": "Tayikistán"}, popTier: 4, designTier: 2, url: "assets/flags/tj.svg", hasShield: false, shield: null },
  { id: "uz", name: {"en": "Uzbekistan", "es": "Uzbekistán"}, popTier: 4, designTier: 3, url: "assets/flags/uz.svg", hasShield: false, shield: null },
  { id: "sz", name: {"en": "Eswatini", "es": "Esuatini"}, popTier: 4, designTier: 4, url: "assets/flags/sz.svg", hasShield: false, shield: null },
  { id: "ls", name: {"en": "Lesotho", "es": "Lesoto"}, popTier: 4, designTier: 3, url: "assets/flags/ls.svg", hasShield: false, shield: null },
  { id: "dj", name: {"en": "Djibouti", "es": "Yibuti"}, popTier: 4, designTier: 2, url: "assets/flags/dj.svg", hasShield: false, shield: null },
  { id: "km", name: {"en": "Comoros", "es": "Comoras"}, popTier: 4, designTier: 3, url: "assets/flags/km.svg", hasShield: false, shield: null },
  { id: "st", name: {"en": "Sao Tome and Principe", "es": "Santo Tomé y Príncipe"}, popTier: 4, designTier: 3, url: "assets/flags/st.svg", hasShield: false, shield: null },
  { id: "cv", name: {"en": "Cabo Verde", "es": "Cabo Verde"}, popTier: 4, designTier: 3, url: "assets/flags/cv.svg", hasShield: false, shield: null },
  { id: "mu", name: {"en": "Mauritius", "es": "Mauricio"}, popTier: 4, designTier: 1, url: "assets/flags/mu.svg", hasShield: false, shield: null },
  { id: "bn", name: {"en": "Brunei", "es": "Brunéi"}, popTier: 4, designTier: 3, url: "assets/flags/bn.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 130], "fill": "#FFD100"} },
  { id: "tl", name: {"en": "Timor-Leste", "es": "Timor Oriental"}, popTier: 4, designTier: 3, url: "assets/flags/tl.svg", hasShield: false, shield: null },
  { id: "gd", name: {"en": "Grenada", "es": "Granada"}, popTier: 4, designTier: 4, url: "assets/flags/gd.svg", hasShield: false, shield: null },
  { id: "lc", name: {"en": "Saint Lucia", "es": "Santa Lucía"}, popTier: 4, designTier: 2, url: "assets/flags/lc.svg", hasShield: false, shield: null },
  { id: "vc", name: {"en": "Saint Vincent", "es": "San Vicente y las Granadinas"}, popTier: 4, designTier: 3, url: "assets/flags/vc.svg", hasShield: false, shield: null },
  { id: "dm", name: {"en": "Dominica", "es": "Dominica"}, popTier: 4, designTier: 4, url: "assets/flags/dm.svg", hasShield: false, shield: null },
  { id: "me", name: {"en": "Montenegro", "es": "Montenegro"}, popTier: 4, designTier: 2, url: "assets/flags/me.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 130], "fill": "#CE1126"} },
  { id: "md", name: {"en": "Moldova", "es": "Moldavia"}, popTier: 4, designTier: 1, url: "assets/flags/md.svg", hasShield: true, shield: {"x": [115, 185], "y": [70, 130], "fill": "#FFD100"} },
  { id: "ga", name: {"en": "Gabon", "es": "Gabón"}, popTier: 4, designTier: 1, url: "assets/flags/ga.svg", hasShield: false, shield: null },
];


// --- COMPARATOR & COLOR ENGINE ---
/**
 * Algoritmo de contraste y scoring pixel a pixel
 * Soporta Modo Normal (con perdón/máscara de escudos) y Modo Experto (con escudo obligatorio).
 */

const DEFAULT_THRESHOLD = 42; // Umbral de tolerancia cromática (35 - 45)

/**
 * Devuelve la calificación cualitativa, medalla y mensaje de retroalimentación
 * según el porcentaje obtenido.
 */
function getGradeInfo(score) {
  if (score >= 90) {
    return {
      grade: 'S',
      badge: 'Grade S',
      color: '#10b981', // Emerald green
      feedback: 'Perfect! Spot on.',
      isPass: true
    };
  } else if (score >= 70) {
    return {
      grade: 'B',
      badge: 'Grade B',
      color: '#3b82f6', // Blue
      feedback: 'Clearly recognisable, one element is off.',
      isPass: true
    };
  } else if (score >= 40) {
    return {
      grade: 'C',
      badge: 'Grade C',
      color: '#f59e0b', // Amber
      feedback: 'Good effort, but needs work.',
      isPass: false
    };
  } else {
    return {
      grade: 'F',
      badge: 'Grade F',
      color: '#ef4444', // Red
      feedback: 'Not quite, try practicing this one.',
      isPass: false
    };
  }
}

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Carga una imagen de bandera en un lienzo fuera de pantalla (Offscreen Canvas)
 * normalizado a la resolución estándar (300 x 200).
 */
function renderTargetFlag(flagUrl, width = 300, height = 200) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    if (window.location && window.location.protocol.startsWith('http')) {
      img.crossOrigin = 'Anonymous';
    }

    img.onload = () => {
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
      const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

      // Fondo blanco por defecto para normalizar transparencias
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Dibujar la imagen escalada al lienzo
      ctx.drawImage(img, 0, 0, width, height);
      resolve(offscreenCanvas);
    };

    img.onerror = () => {
      // Fallback sin crossOrigin
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(fallbackImg, 0, 0, width, height);
        resolve(offscreenCanvas);
      };
      fallbackImg.onerror = (err) => {
        reject(new Error(`No se pudo cargar la bandera desde ${flagUrl}`));
      };
      fallbackImg.src = flagUrl;
    };

    img.src = flagUrl;
  });
}

/**
 * Compara pixel a pixel la ilustración del usuario con la bandera original.
 * 
 * Si options.ignoreShield es true y la bandera tiene metadatos de escudo (options.shield):
 * Los píxeles dentro del área del escudo se computan como acierto si coinciden con el
 * escudo original O con el color base de la franja de fondo (shield.fill).
 * 
 * @param {HTMLCanvasElement} userCanvas
 * @param {HTMLCanvasElement} targetCanvas
 * @param {Object} options { threshold, ignoreShield, shield }
 */
function compareCanvases(userCanvas, targetCanvas, options = {}) {
  const width = userCanvas.width;
  const height = userCanvas.height;
  const threshold = options.threshold || DEFAULT_THRESHOLD;
  const ignoreShield = Boolean(options.ignoreShield);
  const shield = options.shield || null;

  const userCtx = userCanvas.getContext('2d', { willReadFrequently: true });
  const targetCtx = targetCanvas.getContext('2d', { willReadFrequently: true });

  const userData = userCtx.getImageData(0, 0, width, height).data;
  const targetData = targetCtx.getImageData(0, 0, width, height).data;

  const totalPixels = width * height;
  let matches = 0;
  const thresholdSq = threshold * threshold;

  // Si hay escudo que perdonar, parseamos el color base de fondo
  let shieldFillRgb = null;
  let sX1 = 0, sX2 = 0, sY1 = 0, sY2 = 0;
  if (ignoreShield && shield && shield.x && shield.y && shield.fill) {
    shieldFillRgb = hexToRgb(shield.fill);
    sX1 = shield.x[0];
    sX2 = shield.x[1];
    sY1 = shield.y[0];
    sY2 = shield.y[1];
  }

  // Canvas para visualizar las diferencias (Diff map)
  const diffCanvas = document.createElement('canvas');
  diffCanvas.width = width;
  diffCanvas.height = height;
  const diffCtx = diffCanvas.getContext('2d');
  const diffImageData = diffCtx.createImageData(width, height);
  const diffData = diffImageData.data;

  const t0 = performance.now();
  for (let i = 0; i < userData.length; i += 4) {
    const pixelIndex = i / 4;
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);

    const uR = userData[i];
    const uG = userData[i + 1];
    const uB = userData[i + 2];

    const tR = targetData[i];
    const tG = targetData[i + 1];
    const tB = targetData[i + 2];

    // Distancia cromática contra la bandera original
    const dr = uR - tR;
    const dg = uG - tG;
    const db = uB - tB;
    const distSq = dr * dr + dg * dg + db * db;

    let isMatch = distSq <= thresholdSq;

    // Si no coincide directamente, pero estamos en modo perdonar escudo y cae en la zona del escudo:
    if (!isMatch && shieldFillRgb && x >= sX1 && x <= sX2 && y >= sY1 && y <= sY2) {
      const dFillR = uR - shieldFillRgb.r;
      const dFillG = uG - shieldFillRgb.g;
      const dFillB = uB - shieldFillRgb.b;
      const distFillSq = dFillR * dFillR + dFillG * dFillG + dFillB * dFillB;

      if (distFillSq <= thresholdSq) {
        isMatch = true; // El usuario dibujó la franja base limpia del escudo
      }
    }

    if (isMatch) {
      matches++;
      // Píxel coincidente: teñir verde en diff map
      diffData[i] = Math.round(uR * 0.7);
      diffData[i + 1] = Math.min(255, Math.round(uG * 0.7 + 70));
      diffData[i + 2] = Math.round(uB * 0.7);
      diffData[i + 3] = 255;
    } else {
      // Píxel discordante: resaltar en rojo
      diffData[i] = Math.min(255, Math.round(uR * 0.6 + 120));
      diffData[i + 1] = Math.round(uG * 0.5);
      diffData[i + 2] = Math.round(uB * 0.5);
      diffData[i + 3] = 255;
    }
  }
  const calcTime = performance.now() - t0;
  diffCtx.putImageData(diffImageData, 0, 0);

  const rawScore = (matches / totalPixels) * 100;
  const score = Math.round(rawScore);
  const gradeInfo = getGradeInfo(score);

  return {
    score,
    rawScore: rawScore.toFixed(1),
    matches,
    totalPixels,
    calcTimeMs: calcTime.toFixed(2),
    diffCanvas,
    ...gradeInfo
  };
}


// --- CANVAS MANAGER ---
/**
 * Motor de dibujo (Canvas)
 * Soporta Pincel, Línea Recta, Relleno por inundación (Flood Fill), Rectángulo, Círculo,
 * Modo Espejo (Simetría Vertical/Horizontal), Deshacer y Limpiar.
 * Optimizado para PointerEvents (ratón y táctil mobile-first).
 */

class CanvasManager {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    this.width = options.width || 300;
    this.height = options.height || 200;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Overlay opcional para guías (Modo Espejo)
    this.overlayCanvas = options.overlayCanvas || null;
    this.overlayCtx = this.overlayCanvas ? this.overlayCanvas.getContext('2d') : null;
    if (this.overlayCanvas) {
      this.overlayCanvas.width = this.width;
      this.overlayCanvas.height = this.height;
    }

    // Configuración inicial de herramientas
    this.currentTool = 'brush'; // 'brush' | 'line' | 'fill' | 'rectangle' | 'circle'
    this.isLineToolActive = false;
    this.mirrorMode = null; // null | 'vertical' | 'horizontal'
    this.currentColor = '#CE1126'; // Rojo carmesí por defecto
    this.brushSize = 10;
    this.shapeMode = 'fill';

    // Historial para Undo (Límite de 25 estados)
    this.undoStack = [];
    this.maxUndo = 25;

    // Estado del cursor/puntero
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.startX = 0;
    this.startY = 0;
    this.dragSnapshot = null;

    // Callbacks
    this.onStateChange = options.onStateChange || null;

    this.initCanvas();
    this.attachEvents();
  }

  initCanvas() {
    // Fondo blanco normalizado
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.saveState();
    this.renderMirrorGuide();
  }

  saveState() {
    try {
      const state = this.ctx.getImageData(0, 0, this.width, this.height);
      this.undoStack.push(state);
      if (this.undoStack.length > this.maxUndo) {
        this.undoStack.shift();
      }
      this.notifyStateChange();
    } catch (e) {
      console.warn('No se pudo guardar el estado de deshacer:', e);
    }
  }

  undo() {
    if (this.undoStack.length > 1) {
      this.undoStack.pop(); // Quitar estado actual
      const prevState = this.undoStack[this.undoStack.length - 1];
      this.ctx.putImageData(prevState, 0, 0);
      this.notifyStateChange();
      return true;
    }
    return false;
  }

  canUndo() {
    return this.undoStack.length > 1;
  }

  clear() {
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.saveState();
  }

  setTool(tool) {
    this.currentTool = tool;
    this.isLineToolActive = (tool === 'line');
    this.notifyStateChange();
  }

  setColor(color) {
    this.currentColor = color;
    this.notifyStateChange();
  }

  setSize(size) {
    this.brushSize = Math.max(2, Math.min(40, size));
    this.notifyStateChange();
  }

  /**
   * Alterna cíclicamente el Modo Espejo: Off -> Vertical -> Horizontal -> Off
   */
  cycleMirrorMode() {
    if (this.mirrorMode === null) {
      this.setMirrorMode('vertical');
    } else if (this.mirrorMode === 'vertical') {
      this.setMirrorMode('horizontal');
    } else {
      this.setMirrorMode(null);
    }
    return this.mirrorMode;
  }

  setMirrorMode(mode) {
    this.mirrorMode = mode;
    this.renderMirrorGuide();
    this.notifyStateChange();
  }

  /**
   * Lógica Matemática de Reflejo:
   * Eje Vertical (Reflejo en X): x' = width - 1 - x, y' = y
   * Eje Horizontal (Reflejo en Y): x' = x, y' = height - 1 - y
   */
  applySymmetry(x, y) {
    if (this.mirrorMode === 'vertical') {
      return { x: this.width - 1 - x, y };
    } else if (this.mirrorMode === 'horizontal') {
      return { x, y: this.height - 1 - y };
    }
    return null;
  }

  /**
   * Dibuja o limpia la línea guía punteada del modo espejo en el canvas overlay
   */
  renderMirrorGuide() {
    if (!this.overlayCtx) return;
    this.overlayCtx.clearRect(0, 0, this.width, this.height);

    if (!this.mirrorMode) return;

    this.overlayCtx.save();
    this.overlayCtx.setLineDash([4, 4]);
    this.overlayCtx.lineWidth = 1.5;
    this.overlayCtx.strokeStyle = 'rgba(59, 130, 246, 0.75)';

    if (this.mirrorMode === 'vertical') {
      const midX = Math.floor(this.width / 2);
      this.overlayCtx.beginPath();
      this.overlayCtx.moveTo(midX, 0);
      this.overlayCtx.lineTo(midX, this.height);
      this.overlayCtx.stroke();
    } else if (this.mirrorMode === 'horizontal') {
      const midY = Math.floor(this.height / 2);
      this.overlayCtx.beginPath();
      this.overlayCtx.moveTo(0, midY);
      this.overlayCtx.lineTo(this.width, midY);
      this.overlayCtx.stroke();
    }

    this.overlayCtx.restore();
  }

  notifyStateChange() {
    if (typeof this.onStateChange === 'function') {
      this.onStateChange({
        canUndo: this.canUndo(),
        tool: this.currentTool,
        color: this.currentColor,
        size: this.brushSize,
        mirrorMode: this.mirrorMode,
        isLineToolActive: this.isLineToolActive
      });
    }
  }

  getCanvasCoords(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.width / rect.width;
    const scaleY = this.height / rect.height;

    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY)
    };
  }

  attachEvents() {
    this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    this.canvas.addEventListener('pointerup', (e) => this.handlePointerUp(e));
    this.canvas.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  handlePointerDown(e) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch (_) {}

    const coords = this.getCanvasCoords(e);
    this.isDrawing = true;
    this.startX = coords.x;
    this.startY = coords.y;
    this.lastX = coords.x;
    this.lastY = coords.y;

    if (this.currentTool === 'fill') {
      this.floodFill(coords.x, coords.y, this.currentColor);
      // Relleno simétrico si está activo el modo espejo
      if (this.mirrorMode) {
        const sym = this.applySymmetry(coords.x, coords.y);
        if (sym) {
          this.floodFill(sym.x, sym.y, this.currentColor);
        }
      }
      this.saveState();
      this.isDrawing = false;
    } else if (this.currentTool === 'brush') {
      // Punto inicial principal
      this.drawDot(coords.x, coords.y);
      // Punto inicial simétrico
      if (this.mirrorMode) {
        const sym = this.applySymmetry(coords.x, coords.y);
        if (sym) {
          this.drawDot(sym.x, sym.y);
        }
      }
    } else if (
      this.currentTool === 'line' ||
      this.currentTool === 'rectangle' ||
      this.currentTool === 'circle'
    ) {
      // Capturar imagen para vista previa mientras arrastra
      this.dragSnapshot = this.ctx.getImageData(0, 0, this.width, this.height);
    }
  }

  handlePointerMove(e) {
    if (!this.isDrawing) return;
    const coords = this.getCanvasCoords(e);

    if (this.currentTool === 'brush') {
      // Trazo principal
      this.drawLine(this.lastX, this.lastY, coords.x, coords.y);

      // Trazo reflejado
      if (this.mirrorMode) {
        const s0 = this.applySymmetry(this.lastX, this.lastY);
        const s1 = this.applySymmetry(coords.x, coords.y);
        if (s0 && s1) {
          this.drawLine(s0.x, s0.y, s1.x, s1.y);
        }
      }

      this.lastX = coords.x;
      this.lastY = coords.y;
    } else if (this.currentTool === 'line') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawLine(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawLine(s0.x, s0.y, s1.x, s1.y);
          }
        }
      }
    } else if (this.currentTool === 'rectangle') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawRectangle(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawRectangle(s0.x, s0.y, s1.x, s1.y);
          }
        }
      }
    } else if (this.currentTool === 'circle') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawCircle(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawCircle(s0.x, s0.y, s1.x, s1.y);
          }
        }
      }
    }
  }

  handlePointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch (_) {}

    const coords = this.getCanvasCoords(e);

    if (this.currentTool === 'line') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawLine(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawLine(s0.x, s0.y, s1.x, s1.y);
          }
        }
        this.dragSnapshot = null;
        this.saveState();
      }
    } else if (this.currentTool === 'rectangle') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawRectangle(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawRectangle(s0.x, s0.y, s1.x, s1.y);
          }
        }
        this.dragSnapshot = null;
        this.saveState();
      }
    } else if (this.currentTool === 'circle') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawCircle(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawCircle(s0.x, s0.y, s1.x, s1.y);
          }
        }
        this.dragSnapshot = null;
        this.saveState();
      }
    } else if (this.currentTool === 'brush') {
      this.saveState();
    }
  }

  drawDot(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.currentColor;
    this.ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawRectangle(x1, y1, x2, y2) {
    const rx = Math.min(x1, x2);
    const ry = Math.min(y1, y2);
    const rw = Math.abs(x2 - x1);
    const rh = Math.abs(y2 - y1);

    this.ctx.fillStyle = this.currentColor;
    this.ctx.fillRect(rx, ry, rw, rh);
  }

  drawCircle(x1, y1, x2, y2) {
    const rx = Math.abs(x2 - x1) / 2;
    const ry = Math.abs(y2 - y1) / 2;
    const cx = Math.min(x1, x2) + rx;
    const cy = Math.min(y1, y2) + ry;

    if (rx <= 0 || ry <= 0) return;

    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = this.currentColor;
    this.ctx.fill();
  }

  hexToRgba(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) {
      c = c.split('').map((char) => char + char).join('');
    }
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
      a: 255
    };
  }

  /**
   * Algoritmo iterativo de Flood Fill (relleno por inundación)
   * con tolerancia de color para antialiasing de trazos.
   */
  floodFill(startX, startY, hexColor, tolerance = 32) {
    if (startX < 0 || startX >= this.width || startY < 0 || startY >= this.height) return;

    const imgData = this.ctx.getImageData(0, 0, this.width, this.height);
    const data = imgData.data;

    const targetIdx = (startY * this.width + startX) * 4;
    const tr = data[targetIdx];
    const tg = data[targetIdx + 1];
    const tb = data[targetIdx + 2];
    const ta = data[targetIdx + 3];

    const fill = this.hexToRgba(hexColor);

    // Evitar bucle si ya es el mismo color
    const initDiffSq = (tr - fill.r) ** 2 + (tg - fill.g) ** 2 + (tb - fill.b) ** 2;
    if (initDiffSq <= 9 && Math.abs(ta - fill.a) < 5) return;

    const tolSq = tolerance * tolerance;
    const visited = new Uint8Array(this.width * this.height);
    const stack = [startX, startY];

    while (stack.length > 0) {
      const y = stack.pop();
      const x = stack.pop();
      const pos = y * this.width + x;

      if (visited[pos]) continue;
      visited[pos] = 1;

      const idx = pos * 4;
      const dr = data[idx] - tr;
      const dg = data[idx + 1] - tg;
      const db = data[idx + 2] - tb;
      const diffSq = dr * dr + dg * dg + db * db;

      if (diffSq <= tolSq) {
        data[idx] = fill.r;
        data[idx + 1] = fill.g;
        data[idx + 2] = fill.b;
        data[idx + 3] = fill.a;

        if (x > 0 && !visited[pos - 1]) {
          stack.push(x - 1, y);
        }
        if (x < this.width - 1 && !visited[pos + 1]) {
          stack.push(x + 1, y);
        }
        if (y > 0 && !visited[pos - this.width]) {
          stack.push(x, y - 1);
        }
        if (y < this.height - 1 && !visited[pos + this.width]) {
          stack.push(x, y + 1);
        }
      }
    }

    this.ctx.putImageData(imgData, 0, 0);
  }
}


// --- APP & GAME LOGIC ---

// Constantes de almacenamiento local
const STORAGE_KEYS = {
  STREAK: 'flag_drawer_streak',
  BEST: 'flag_drawer_best',
  PLAYED: 'flag_drawer_played',
  SELECTED_TIERS: 'flag_drawer_selected_tiers',
  DIFF_APPROACH: 'flag_drawer_diff_approach',
  LANG: 'flag_drawer_lang',
  THEME: 'flag_drawer_theme',
  SHIELD_MODE: 'flag_drawer_shield_mode'
};

// Diccionario de traducción para interfaz bilingüe
const I18N = {
  es: {
    appTitle: 'FLAG DRAWER',
    streak: 'RACHA',
    best: 'RÉCORD',
    played: 'JUGADAS',
    difficulty: 'Dificultad',
    allTiers: 'Todas',
    fameApproachTag: 'Fama',
    designApproachTag: 'Diseño',
    drawFlagOf: 'Dibuja la bandera de',
    loading: 'Cargando...',
    skipFlag: 'Saltar',
    checkFlag: 'Evaluar Bandera',
    comparing: 'Comparando...',
    brush: 'Pincel',
    line: 'Línea',
    fill: 'Relleno',
    rect: 'Rect',
    circle: 'Círculo',
    mirror: 'Espejo',
    undo: 'Deshacer',
    clear: 'Limpiar',
    thickness: 'Grosor',
    shieldOptional: 'Escudo opcional',
    shieldRequired: 'Escudo obligatorio',
    noShield: 'Sin escudo',
    shieldForgiven: 'Escudo perdonado',
    yourDrawing: 'Tu dibujo',
    realFlag: 'Bandera real',
    showDiff: 'Ver diferencias',
    hideDiff: 'Ocultar diferencias',
    shareResult: 'Compartir',
    nextFlag: 'Siguiente bandera',
    // Settings
    settingsTitle: 'Configuración',
    diffApproach: 'Criterio de Dificultad',
    descDiffApproach: 'Define cómo se clasifican los 4 niveles de dificultad.',
    popApproachBtn: 'Por Fama',
    designApproachBtn: 'Por Complejidad',
    popExpl: 'Modo Fama: Banderas de países más conocidos (EE. UU., Brasil, Francia) son Tier 1, sin importar su complejidad de diseño.',
    designExpl: 'Modo Diseño: Banderas de franjas y bicolores simples son Tier 1 (España, Francia, etc.). Escudos y estrellas son niveles más altos.',
    language: 'Idioma / Language',
    theme: 'Tema Visual / Theme',
    themeDark: 'Oscuro',
    themeLight: 'Claro',
    shieldSetting: 'Evaluación de Escudos',
    descShieldSetting: 'Perdonar o exigir escudos e insignias heráldicas complejas.',
    shieldIgnoreOpt: 'Perdonar (Casual)',
    shieldRequireOpt: 'Exigir (Experto)',
    saveSettings: 'Guardar y Continuar',
    // Toasts
    copiedToast: 'Resultado copiado al portapapeles',
    copyFail: 'No se pudo copiar el resultado.',
    mirrorToastV: 'Espejo: Vertical (Izquierda / Derecha)',
    mirrorToastH: 'Espejo: Horizontal (Arriba / Abajo)',
    mirrorToastOff: 'Espejo: Desactivado',
    settingsSaved: 'Configuración guardada'
  },
  en: {
    appTitle: 'FLAG DRAWER',
    streak: 'STREAK',
    best: 'BEST',
    played: 'PLAYED',
    difficulty: 'Difficulty',
    allTiers: 'All',
    fameApproachTag: 'Fame',
    designApproachTag: 'Design',
    drawFlagOf: 'Draw the flag of',
    loading: 'Loading...',
    skipFlag: 'Skip',
    checkFlag: 'Check Flag',
    comparing: 'Comparing...',
    brush: 'Brush',
    line: 'Line',
    fill: 'Fill',
    rect: 'Rect',
    circle: 'Circle',
    mirror: 'Mirror',
    undo: 'Undo',
    clear: 'Clear',
    thickness: 'Thickness',
    shieldOptional: 'Shield optional',
    shieldRequired: 'Shield required',
    noShield: 'No shield',
    shieldForgiven: 'Shield forgiven',
    yourDrawing: 'Your Drawing',
    realFlag: 'The Real Flag',
    showDiff: 'Show Pixel Diff',
    hideDiff: 'Hide Pixel Diff',
    shareResult: 'Share',
    nextFlag: 'Next Flag',
    // Settings
    settingsTitle: 'Settings',
    diffApproach: 'Difficulty Criteria',
    descDiffApproach: 'Determines what makes a flag easy or difficult.',
    popApproachBtn: 'By Fame',
    designApproachBtn: 'By Complexity',
    popExpl: 'Fame Mode: Globally famous countries (USA, Brazil, France) are Tier 1, regardless of their design complexity.',
    designExpl: 'Design Mode: Simple stripes and bicolors are Tier 1 (Spain, France, etc.). Intricate coats of arms and stars are higher tiers.',
    language: 'Language',
    theme: 'Visual Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    shieldSetting: 'Shields & Heraldry',
    descShieldSetting: 'Forgive or require complex heraldic coats of arms.',
    shieldIgnoreOpt: 'Forgive (Casual)',
    shieldRequireOpt: 'Require (Expert)',
    saveSettings: 'Done',
    // Toasts
    copiedToast: 'Result copied to clipboard',
    copyFail: 'Could not copy result.',
    mirrorToastV: 'Mirror: Vertical (Left / Right)',
    mirrorToastH: 'Mirror: Horizontal (Top / Bottom)',
    mirrorToastOff: 'Mirror: Off',
    settingsSaved: 'Settings saved'
  }
};

class FlagGame {
  constructor() {
    this.flags = FLAGS;
    this.tierMeta = TIER_META;
    this.currentFlag = null;
    this.lastResult = null;

    // Ajustes del juego
    this.diffApproach = 'popularity'; // 'popularity' | 'design'
    this.selectedTiers = [1, 2, 3, 4]; // Selección múltiple de niveles
    this.currentLang = 'es'; // 'es' | 'en'
    this.currentTheme = 'dark'; // 'dark' | 'light'
    this.shieldMode = 'ignore'; // 'ignore' | 'require'

    // Estadísticas
    this.stats = {
      streak: 0,
      best: 0,
      played: 0
    };

    this.initElements();
    this.initCanvas();
    this.loadStats();
    this.loadSettings();
    this.attachEventListeners();

    // Iniciar con una bandera aleatoria según los filtros
    this.pickNextFlag();
  }

  initElements() {
    // Header & Stats
    this.appTitleEl = document.getElementById('app-title');
    this.statStreakEl = document.getElementById('stat-streak');
    this.statBestEl = document.getElementById('stat-best');
    this.statPlayedEl = document.getElementById('stat-played');
    this.lblStatStreak = document.getElementById('lbl-stat-streak');
    this.lblStatBest = document.getElementById('lbl-stat-best');
    this.lblStatPlayed = document.getElementById('lbl-stat-played');
    this.btnSettings = document.getElementById('btn-settings');

    // Multi-select Difficulty Chips
    this.lblDifficulty = document.getElementById('lbl-difficulty');
    this.activeApproachTag = document.getElementById('active-approach-tag');
    this.tierCounterBadge = document.getElementById('tier-counter-badge');
    this.chipAll = document.getElementById('chip-all');
    this.txtChipAll = document.getElementById('txt-chip-all');
    this.tierChips = document.querySelectorAll('.tier-chip[data-tier]');

    // Desafío
    this.lblDrawPrompt = document.getElementById('lbl-draw-prompt');
    this.countryTargetEl = document.getElementById('country-target');
    this.targetTierBadge = document.getElementById('target-tier-badge');
    this.targetShieldBadge = document.getElementById('target-shield-badge');
    this.skipBtn = document.getElementById('skip-btn');
    this.lblSkipBtn = document.getElementById('lbl-skip-btn');

    // Canvas principal y overlay
    this.drawingCanvas = document.getElementById('drawing-canvas');
    this.overlayCanvas = document.getElementById('overlay-canvas');

    // Herramientas
    this.toolButtons = document.querySelectorAll('.tool-btn[data-tool]');
    this.toolMirror = document.getElementById('tool-mirror');
    this.mirrorBadge = document.getElementById('mirror-badge');
    this.mirrorIcon = document.getElementById('mirror-icon');
    this.undoBtn = document.getElementById('btn-undo');
    this.clearBtn = document.getElementById('btn-clear');

    // Nombres de herramientas (I18N)
    this.toolNameBrush = document.getElementById('tool-name-brush');
    this.toolNameLine = document.getElementById('tool-name-line');
    this.toolNameFill = document.getElementById('tool-name-fill');
    this.toolNameRect = document.getElementById('tool-name-rect');
    this.toolNameCircle = document.getElementById('tool-name-circle');
    this.toolNameMirror = document.getElementById('tool-name-mirror');
    this.toolNameUndo = document.getElementById('tool-name-undo');
    this.toolNameClear = document.getElementById('tool-name-clear');

    // Grosor
    this.lblThickness = document.getElementById('lbl-thickness');
    this.brushSlider = document.getElementById('brush-size');
    this.brushSizeVal = document.getElementById('brush-size-val');
    this.brushDot = document.getElementById('brush-dot');

    // Paleta y círculo cromático
    this.colorSwatches = document.querySelectorAll('.color-swatch[data-color]');
    this.activeColorSwatch = document.getElementById('active-color-swatch');
    this.colorWheelBtn = document.getElementById('color-wheel-btn');
    this.customColorPicker = document.getElementById('custom-color-picker');

    // Botón de evaluar
    this.submitBtn = document.getElementById('submit-btn');
    this.lblSubmitBtn = document.getElementById('lbl-submit-btn');

    // Modal de resultados
    this.resultsModal = document.getElementById('results-modal');
    this.modalCountryName = document.getElementById('modal-country-name');
    this.modalTierBadge = document.getElementById('modal-tier-badge');
    this.modalShieldBadge = document.getElementById('modal-shield-badge');
    this.gradeBadgeEl = document.getElementById('grade-badge');
    this.modalScoreEl = document.getElementById('modal-score');
    this.modalFeedbackEl = document.getElementById('modal-feedback');
    this.lblYourDrawing = document.getElementById('lbl-your-drawing');
    this.lblRealFlag = document.getElementById('lbl-real-flag');
    this.resultUserCanvas = document.getElementById('result-user-canvas');
    this.resultTargetCanvas = document.getElementById('result-target-canvas');
    this.resultDiffCanvas = document.getElementById('result-diff-canvas');

    // Modal stats & botones
    this.modalStatStreak = document.getElementById('modal-stat-streak');
    this.modalStatBest = document.getElementById('modal-stat-best');
    this.modalStatPlayed = document.getElementById('modal-stat-played');
    this.lblModalStreak = document.getElementById('lbl-modal-streak');
    this.lblModalBest = document.getElementById('lbl-modal-best');
    this.lblModalPlayed = document.getElementById('lbl-modal-played');
    this.nextFlagBtn = document.getElementById('next-flag-btn');
    this.lblNextFlag = document.getElementById('lbl-next-flag');
    this.shareBtn = document.getElementById('share-btn');
    this.shareTextEl = document.getElementById('share-text');
    this.toggleDiffBtn = document.getElementById('toggle-diff-btn');
    this.diffContainer = document.getElementById('diff-view-container');

    // Modal de configuraciones
    this.settingsModal = document.getElementById('settings-modal');
    this.btnCloseSettings = document.getElementById('btn-close-settings');
    this.btnSaveSettings = document.getElementById('btn-save-settings');
    this.approachExplanation = document.getElementById('approach-explanation');

    // Botones segmentados de configuración
    this.btnApproachPop = document.getElementById('btn-approach-pop');
    this.btnApproachDesign = document.getElementById('btn-approach-design');
    this.btnLangEs = document.getElementById('btn-lang-es');
    this.btnLangEn = document.getElementById('btn-lang-en');
    this.btnThemeDark = document.getElementById('btn-theme-dark');
    this.btnThemeLight = document.getElementById('btn-theme-light');
    this.btnShieldIgnore = document.getElementById('btn-shield-ignore');
    this.btnShieldRequire = document.getElementById('btn-shield-require');
    this.txtThemeDark = document.getElementById('txt-theme-dark');
    this.txtThemeLight = document.getElementById('txt-theme-light');
    this.txtShieldIgnore = document.getElementById('txt-shield-ignore');
    this.txtShieldRequire = document.getElementById('txt-shield-require');

    // Textos de configuración (I18N)
    this.settingsTitle = document.getElementById('settings-title');
    this.lblDiffApproach = document.getElementById('lbl-diff-approach');
    this.descDiffApproach = document.getElementById('desc-diff-approach');
    this.lblPopApproach = document.getElementById('lbl-pop-approach');
    this.lblDesignApproach = document.getElementById('lbl-design-approach');
    this.lblLanguage = document.getElementById('lbl-language');
    this.lblTheme = document.getElementById('lbl-theme');
    this.lblShieldSetting = document.getElementById('lbl-shield-setting');
    this.descShieldSetting = document.getElementById('desc-shield-setting');
    this.lblSaveSettings = document.getElementById('lbl-save-settings');

    // Toast
    this.toastEl = document.getElementById('toast');
    this.toastTimeout = null;
  }

  initCanvas() {
    this.canvasManager = new CanvasManager(this.drawingCanvas, {
      overlayCanvas: this.overlayCanvas,
      width: 300,
      height: 200,
      onStateChange: (state) => {
        this.undoBtn.disabled = !state.canUndo;
        this.updateMirrorUI(state.mirrorMode);
      }
    });

    this.updateColor('#CE1126');
    this.updateBrushSize(10);
  }

  loadStats() {
    try {
      this.stats.streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK), 10) || 0;
      this.stats.best = parseInt(localStorage.getItem(STORAGE_KEYS.BEST), 10) || 0;
      this.stats.played = parseInt(localStorage.getItem(STORAGE_KEYS.PLAYED), 10) || 0;
    } catch (_) {
      this.stats = { streak: 0, best: 0, played: 0 };
    }
    this.renderStats();
  }

  saveStats() {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, this.stats.streak.toString());
      localStorage.setItem(STORAGE_KEYS.BEST, this.stats.best.toString());
      localStorage.setItem(STORAGE_KEYS.PLAYED, this.stats.played.toString());
    } catch (_) {}
    this.renderStats();
  }

  renderStats() {
    this.statStreakEl.textContent = this.stats.streak;
    this.statBestEl.textContent = `${this.stats.best}%`;
    this.statPlayedEl.textContent = this.stats.played;

    if (this.modalStatStreak) this.modalStatStreak.textContent = this.stats.streak;
    if (this.modalStatBest) this.modalStatBest.textContent = `${this.stats.best}%`;
    if (this.modalStatPlayed) this.modalStatPlayed.textContent = this.stats.played;
  }

  loadSettings() {
    try {
      // Idioma
      const savedLang = localStorage.getItem(STORAGE_KEYS.LANG);
      if (savedLang && ['es', 'en'].includes(savedLang)) {
        this.currentLang = savedLang;
      }

      // Tema
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
        this.currentTheme = savedTheme;
      }

      // Criterio de dificultad
      const savedApproach = localStorage.getItem(STORAGE_KEYS.DIFF_APPROACH);
      if (savedApproach && ['popularity', 'design'].includes(savedApproach)) {
        this.diffApproach = savedApproach;
      }

      // Niveles seleccionados (multi-select)
      const savedTiers = localStorage.getItem(STORAGE_KEYS.SELECTED_TIERS);
      if (savedTiers) {
        const parsed = JSON.parse(savedTiers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.selectedTiers = parsed.map((n) => parseInt(n, 10));
        }
      }

      // Modo escudos
      const savedShieldMode = localStorage.getItem(STORAGE_KEYS.SHIELD_MODE);
      if (savedShieldMode && ['ignore', 'require'].includes(savedShieldMode)) {
        this.shieldMode = savedShieldMode;
      }
    } catch (_) {}

    // Aplicar configuraciones al DOM
    this.applyTheme(this.currentTheme);
    this.applyTranslations();
    this.updateChipsUI();
    this.updateSettingsModalUI();
  }

  saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, this.currentLang);
      localStorage.setItem(STORAGE_KEYS.THEME, this.currentTheme);
      localStorage.setItem(STORAGE_KEYS.DIFF_APPROACH, this.diffApproach);
      localStorage.setItem(STORAGE_KEYS.SELECTED_TIERS, JSON.stringify(this.selectedTiers));
      localStorage.setItem(STORAGE_KEYS.SHIELD_MODE, this.shieldMode);
    } catch (_) {}
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  applyTranslations() {
    const t = I18N[this.currentLang] || I18N.es;
    document.documentElement.lang = this.currentLang;

    // Header & stats
    this.lblStatStreak.textContent = t.streak;
    this.lblStatBest.textContent = t.best;
    this.lblStatPlayed.textContent = t.played;

    // Controls bar
    this.lblDifficulty.textContent = t.difficulty;
    this.txtChipAll.textContent = t.allTiers;
    this.activeApproachTag.textContent = (this.diffApproach === 'popularity') ? t.fameApproachTag : t.designApproachTag;

    // Update chip labels for T1..T4
    for (let i = 1; i <= 4; i++) {
      const chipTxt = document.getElementById(`txt-chip-${i}`);
      if (chipTxt) {
        const meta = this.tierMeta[this.diffApproach][i];
        const shortName = meta.shortName[this.currentLang];
        chipTxt.textContent = `T${i}: ${shortName}`;
      }
    }

    // Prompt & buttons
    this.lblDrawPrompt.textContent = t.drawFlagOf;
    this.lblSkipBtn.textContent = t.skipFlag;
    this.lblSubmitBtn.textContent = t.checkFlag;

    // Tools
    this.toolNameBrush.textContent = t.brush;
    this.toolNameLine.textContent = t.line;
    this.toolNameFill.textContent = t.fill;
    this.toolNameRect.textContent = t.rect;
    this.toolNameCircle.textContent = t.circle;
    this.toolNameMirror.textContent = t.mirror;
    this.toolNameUndo.textContent = t.undo;
    this.toolNameClear.textContent = t.clear;
    this.lblThickness.textContent = t.thickness;

    // Modal resultados
    this.lblYourDrawing.textContent = t.yourDrawing;
    this.lblRealFlag.textContent = t.realFlag;
    this.shareTextEl.textContent = t.shareResult;
    this.lblNextFlag.textContent = t.nextFlag;
    if (this.lblModalStreak) this.lblModalStreak.textContent = t.streak;
    if (this.lblModalBest) this.lblModalBest.textContent = t.best;
    if (this.lblModalPlayed) this.lblModalPlayed.textContent = t.played;

    // Modal settings
    this.settingsTitle.textContent = t.settingsTitle;
    this.lblDiffApproach.textContent = t.diffApproach;
    this.descDiffApproach.textContent = t.descDiffApproach;
    this.lblPopApproach.textContent = t.popApproachBtn;
    this.lblDesignApproach.textContent = t.designApproachBtn;
    this.approachExplanation.textContent = (this.diffApproach === 'popularity') ? t.popExpl : t.designExpl;
    this.lblLanguage.textContent = t.language;
    this.lblTheme.textContent = t.theme;
    this.lblShieldSetting.textContent = t.shieldSetting;
    this.descShieldSetting.textContent = t.descShieldSetting;
    this.lblSaveSettings.textContent = t.saveSettings;
    if (this.txtThemeDark) this.txtThemeDark.textContent = t.themeDark;
    if (this.txtThemeLight) this.txtThemeLight.textContent = t.themeLight;
    if (this.txtShieldIgnore) this.txtShieldIgnore.textContent = t.shieldIgnoreOpt;
    if (this.txtShieldRequire) this.txtShieldRequire.textContent = t.shieldRequireOpt;

    // Actualizar nombre del país actual si ya hay bandera activa
    if (this.currentFlag) {
      this.countryTargetEl.textContent = this.currentFlag.name[this.currentLang];
      this.updateFlagShieldBadge();
    }
  }

  updateSettingsModalUI() {
    // 1. Enfoque de dificultad
    this.btnApproachPop.classList.toggle('active', this.diffApproach === 'popularity');
    this.btnApproachDesign.classList.toggle('active', this.diffApproach === 'design');
    const t = I18N[this.currentLang] || I18N.es;
    this.approachExplanation.textContent = (this.diffApproach === 'popularity') ? t.popExpl : t.designExpl;

    // 2. Idioma
    this.btnLangEs.classList.toggle('active', this.currentLang === 'es');
    this.btnLangEn.classList.toggle('active', this.currentLang === 'en');

    // 3. Tema
    this.btnThemeDark.classList.toggle('active', this.currentTheme === 'dark');
    this.btnThemeLight.classList.toggle('active', this.currentTheme === 'light');

    // 4. Modo escudos
    this.btnShieldIgnore.classList.toggle('active', this.shieldMode === 'ignore');
    this.btnShieldRequire.classList.toggle('active', this.shieldMode === 'require');
  }

  /**
   * Gestión de Selección Múltiple de Niveles de Dificultad
   */
  toggleTier(tierArg) {
    if (tierArg === 'all') {
      // Si ya estaban todos seleccionados, no hacer nada o alternar
      if (this.selectedTiers.length === 4) {
        // Mantener al menos Tier 1
        this.selectedTiers = [1];
      } else {
        this.selectedTiers = [1, 2, 3, 4];
      }
    } else {
      const num = parseInt(tierArg, 10);
      const idx = this.selectedTiers.indexOf(num);
      if (idx !== -1) {
        // Deseleccionar: solo si queda al menos uno activo
        if (this.selectedTiers.length > 1) {
          this.selectedTiers.splice(idx, 1);
        } else {
          // Si era el único, re-activar todos
          this.selectedTiers = [1, 2, 3, 4];
        }
      } else {
        // Agregar nivel
        this.selectedTiers.push(num);
        this.selectedTiers.sort((a, b) => a - b);
      }
    }

    this.saveSettings();
    this.updateChipsUI();
    this.pickNextFlag();
  }

  updateChipsUI() {
    const isAll = this.selectedTiers.length === 4;
    this.chipAll.classList.toggle('active', isAll);

    for (let i = 1; i <= 4; i++) {
      const chip = document.getElementById(`chip-${i}`);
      if (chip) {
        chip.classList.toggle('active', this.selectedTiers.includes(i));
      }
    }

    // Actualizar contador de banderas disponibles
    const count = this.getFilteredFlags().length;
    const t = I18N[this.currentLang] || I18N.es;
    this.tierCounterBadge.textContent = `${count} ${this.currentLang === 'es' ? 'banderas' : 'flags'}`;
  }

  getFilteredFlags() {
    const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';
    const filtered = this.flags.filter((f) => this.selectedTiers.includes(f[tierProp]));
    return (filtered.length > 0) ? filtered : this.flags;
  }

  updateFlagShieldBadge() {
    if (!this.targetShieldBadge) return;
    const t = I18N[this.currentLang] || I18N.es;

    if (this.currentFlag && this.currentFlag.hasShield) {
      this.targetShieldBadge.classList.remove('hidden');
      const isIgnore = (this.shieldMode === 'ignore');
      const shieldLabel = isIgnore ? t.shieldOptional : t.shieldRequired;
      this.targetShieldBadge.className = isIgnore ? 'shield-pill' : 'shield-pill active-shield';
      this.targetShieldBadge.innerHTML = `<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><span>${shieldLabel}</span>`;
    } else {
      this.targetShieldBadge.classList.add('hidden');
    }
  }

  pickNextFlag() {
    const available = this.getFilteredFlags();
    if (available.length === 0) return;

    let pool = available;
    if (this.currentFlag && available.length > 1) {
      pool = available.filter((f) => f.id !== this.currentFlag.id);
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    this.currentFlag = pool[randomIndex];

    // Nombre en el idioma activo
    this.countryTargetEl.textContent = this.currentFlag.name[this.currentLang] || this.currentFlag.name.es;

    // Nivel del país según el criterio activo
    const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';
    const tierNum = this.currentFlag[tierProp];
    const meta = this.tierMeta[this.diffApproach][tierNum];
    const shortName = meta ? meta.shortName[this.currentLang] : `T${tierNum}`;

    this.targetTierBadge.textContent = `T${tierNum}: ${shortName}`;
    this.targetTierBadge.className = `tier-pill tier-${tierNum}`;

    // Actualizar badge de escudo
    this.updateFlagShieldBadge();

    // Limpiar canvas
    this.canvasManager.clear();
  }

  attachEventListeners() {
    // Abrir modal de configuración
    this.btnSettings.addEventListener('click', () => {
      this.openSettingsModal();
    });

    this.activeApproachTag.addEventListener('click', () => {
      this.openSettingsModal();
    });

    this.btnCloseSettings.addEventListener('click', () => {
      this.closeSettingsModal();
    });

    this.btnSaveSettings.addEventListener('click', () => {
      this.closeSettingsModal();
      this.showToast(I18N[this.currentLang].settingsSaved);
    });

    // Segmented: Criterio de dificultad
    this.btnApproachPop.addEventListener('click', () => {
      this.setDiffApproach('popularity');
    });

    this.btnApproachDesign.addEventListener('click', () => {
      this.setDiffApproach('design');
    });

    // Segmented: Idioma
    this.btnLangEs.addEventListener('click', () => {
      this.setLanguage('es');
    });

    this.btnLangEn.addEventListener('click', () => {
      this.setLanguage('en');
    });

    // Segmented: Tema
    this.btnThemeDark.addEventListener('click', () => {
      this.setTheme('dark');
    });

    this.btnThemeLight.addEventListener('click', () => {
      this.setTheme('light');
    });

    // Segmented: Modo Escudos
    this.btnShieldIgnore.addEventListener('click', () => {
      this.setShieldMode('ignore');
    });

    this.btnShieldRequire.addEventListener('click', () => {
      this.setShieldMode('require');
    });

    // Chips de selección múltiple de dificultad
    this.tierChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const tier = chip.dataset.tier;
        this.toggleTier(tier);
      });
    });

    // Saltar bandera
    this.skipBtn.addEventListener('click', () => {
      this.pickNextFlag();
    });

    // Selección de herramientas (Brush, Line, Fill, Rect, Circle)
    this.toolButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        this.canvasManager.setTool(tool);

        this.toolButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Modo Espejo: ciclo de 3 estados
    if (this.toolMirror) {
      this.toolMirror.addEventListener('click', () => {
        const mode = this.canvasManager.cycleMirrorMode();
        const t = I18N[this.currentLang];
        if (mode === 'vertical') {
          this.showToast(t.mirrorToastV);
        } else if (mode === 'horizontal') {
          this.showToast(t.mirrorToastH);
        } else {
          this.showToast(t.mirrorToastOff);
        }
      });
    }

    // Deshacer y Limpiar
    this.undoBtn.addEventListener('click', () => this.canvasManager.undo());
    this.clearBtn.addEventListener('click', () => this.canvasManager.clear());

    // Control de grosor del trazo
    this.brushSlider.addEventListener('input', (e) => {
      const size = parseInt(e.target.value, 10);
      this.updateBrushSize(size);
    });

    // Paleta de colores predefinidos
    this.colorSwatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;
        this.updateColor(color);
      });
    });

    // Disparador del selector cromático
    if (this.colorWheelBtn && this.customColorPicker) {
      this.colorWheelBtn.addEventListener('click', (e) => {
        if (e.target !== this.customColorPicker) {
          this.customColorPicker.click();
        }
      });

      const handlePickerChange = (e) => {
        const color = e.target.value;
        this.updateColor(color);
      };

      this.customColorPicker.addEventListener('input', handlePickerChange);
      this.customColorPicker.addEventListener('change', handlePickerChange);
    }

    // Evaluar / Submit
    this.submitBtn.addEventListener('click', () => {
      this.evaluateDrawing();
    });

    // Siguiente bandera desde modal
    this.nextFlagBtn.addEventListener('click', () => {
      this.closeModal();
      this.pickNextFlag();
    });

    // Compartir resultado
    this.shareBtn.addEventListener('click', () => {
      this.shareResult();
    });

    // Toggle de Diff heatmap
    this.toggleDiffBtn.addEventListener('click', () => {
      const isHidden = this.diffContainer.classList.toggle('hidden');
      const t = I18N[this.currentLang];
      this.toggleDiffBtn.textContent = isHidden ? t.showDiff : t.hideDiff;
    });

    // Atajos de teclado útiles
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        this.canvasManager.undo();
      }
    });
  }

  setDiffApproach(approach) {
    this.diffApproach = approach;
    this.saveSettings();
    this.applyTranslations();
    this.updateChipsUI();
    this.updateSettingsModalUI();
    this.pickNextFlag();
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.saveSettings();
    this.applyTranslations();
    this.updateChipsUI();
    this.updateSettingsModalUI();
  }

  setTheme(theme) {
    this.applyTheme(theme);
    this.saveSettings();
    this.updateSettingsModalUI();
  }

  setShieldMode(mode) {
    this.shieldMode = mode;
    this.saveSettings();
    this.updateSettingsModalUI();
    this.updateFlagShieldBadge();
  }

  openSettingsModal() {
    this.updateSettingsModalUI();
    this.settingsModal.classList.remove('hidden');
  }

  closeSettingsModal() {
    this.settingsModal.classList.add('hidden');
  }

  updateBrushSize(size) {
    this.canvasManager.setSize(size);
    this.brushSizeVal.textContent = `${size}px`;
    const dotSize = Math.max(4, Math.min(22, size * 0.75));
    this.brushDot.style.width = `${dotSize}px`;
    this.brushDot.style.height = `${dotSize}px`;
  }

  updateColor(color) {
    this.canvasManager.setColor(color);
    this.brushDot.style.backgroundColor = color;

    if (this.customColorPicker) {
      this.customColorPicker.value = color;
    }

    if (this.activeColorSwatch) {
      this.activeColorSwatch.style.setProperty('--swatch-color', color);
    }

    let foundMatch = false;
    const normalizedColor = color.toUpperCase();
    this.colorSwatches.forEach((swatch) => {
      if (swatch.dataset.color.toUpperCase() === normalizedColor) {
        swatch.classList.add('active');
        foundMatch = true;
      } else {
        swatch.classList.remove('active');
      }
    });

    if (!foundMatch && this.activeColorSwatch) {
      this.activeColorSwatch.classList.add('active-custom');
    } else if (this.activeColorSwatch) {
      this.activeColorSwatch.classList.remove('active-custom');
    }
  }

  updateMirrorUI(mode) {
    if (!this.toolMirror || !this.mirrorBadge) return;

    if (mode === 'vertical') {
      this.toolMirror.classList.add('active');
      this.mirrorBadge.textContent = 'M-V';
      this.mirrorBadge.className = 'mirror-indicator mode-v';
      if (this.mirrorIcon) {
        this.mirrorIcon.innerHTML = `
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-dasharray="3 3"></line>
          <path d="M7 6l-4 6 4 6" stroke="currentColor"></path>
          <path d="M17 6l4 6-4 6" stroke="currentColor"></path>
        `;
      }
    } else if (mode === 'horizontal') {
      this.toolMirror.classList.add('active');
      this.mirrorBadge.textContent = 'M-H';
      this.mirrorBadge.className = 'mirror-indicator mode-h';
      if (this.mirrorIcon) {
        this.mirrorIcon.innerHTML = `
          <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-dasharray="3 3"></line>
          <path d="M6 7l6-4 6 4" stroke="currentColor"></path>
          <path d="M6 17l6 4 6-4" stroke="currentColor"></path>
        `;
      }
    } else {
      this.toolMirror.classList.remove('active');
      this.mirrorBadge.textContent = 'Off';
      this.mirrorBadge.className = 'mirror-indicator';
      if (this.mirrorIcon) {
        this.mirrorIcon.innerHTML = `
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-dasharray="3 3"></line>
          <path d="M7 6l-4 6 4 6"></path>
          <path d="M17 6l4 6-4 6"></path>
        `;
      }
    }
  }

  async evaluateDrawing() {
    if (!this.currentFlag) return;

    const t = I18N[this.currentLang];
    this.submitBtn.disabled = true;
    if (this.lblSubmitBtn) {
      this.lblSubmitBtn.textContent = t.comparing;
    }

    try {
      const targetCanvas = await renderTargetFlag(this.currentFlag.url, 300, 200);

      const comparisonOptions = {
        ignoreShield: (this.shieldMode === 'ignore'),
        shield: this.currentFlag.shield
      };

      const result = compareCanvases(this.canvasManager.canvas, targetCanvas, comparisonOptions);
      this.lastResult = result;

      this.stats.played += 1;
      if (result.score >= 60) {
        this.stats.streak += 1;
      } else {
        this.stats.streak = 0;
      }

      if (result.score > this.stats.best) {
        this.stats.best = result.score;
      }

      this.saveStats();
      this.renderResultsModal(targetCanvas, result);
      this.openModal();
    } catch (error) {
      console.error('Error al evaluar dibujo:', error);
      this.showToast('Error al evaluar bandera');
    } finally {
      this.submitBtn.disabled = false;
      if (this.lblSubmitBtn) {
        this.lblSubmitBtn.textContent = t.checkFlag;
      }
    }
  }

  renderResultsModal(targetCanvas, result) {
    const t = I18N[this.currentLang];
    this.modalCountryName.textContent = this.currentFlag.name[this.currentLang] || this.currentFlag.name.es;

    const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';
    const tierNum = this.currentFlag[tierProp];
    const meta = this.tierMeta[this.diffApproach][tierNum];
    const shortName = meta ? meta.shortName[this.currentLang] : `T${tierNum}`;

    this.modalTierBadge.textContent = `T${tierNum}: ${shortName}`;
    this.modalTierBadge.className = `tier-pill tier-${tierNum}`;

    if (this.currentFlag.hasShield) {
      const isIgnore = (this.shieldMode === 'ignore');
      const shieldLabel = isIgnore ? t.shieldForgiven : t.shieldRequired;
      this.modalShieldBadge.className = isIgnore ? 'shield-pill' : 'shield-pill active-shield';
      this.modalShieldBadge.innerHTML = `<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><span>${shieldLabel}</span>`;
      this.modalShieldBadge.classList.remove('hidden');
    } else {
      this.modalShieldBadge.textContent = t.noShield;
      this.modalShieldBadge.className = 'shield-pill';
      this.modalShieldBadge.classList.remove('hidden');
    }

    this.modalScoreEl.textContent = `${result.score}%`;
    this.modalScoreEl.style.color = result.color;

    this.gradeBadgeEl.textContent = result.badge;
    this.gradeBadgeEl.style.backgroundColor = result.color;
    this.modalFeedbackEl.textContent = result.feedback;

    const userResultCtx = this.resultUserCanvas.getContext('2d');
    userResultCtx.clearRect(0, 0, 300, 200);
    userResultCtx.drawImage(this.canvasManager.canvas, 0, 0, 300, 200);

    const targetResultCtx = this.resultTargetCanvas.getContext('2d');
    targetResultCtx.clearRect(0, 0, 300, 200);
    targetResultCtx.drawImage(targetCanvas, 0, 0, 300, 200);

    const diffResultCtx = this.resultDiffCanvas.getContext('2d');
    diffResultCtx.clearRect(0, 0, 300, 200);
    diffResultCtx.drawImage(result.diffCanvas, 0, 0, 300, 200);

    this.diffContainer.classList.add('hidden');
    this.toggleDiffBtn.textContent = t.showDiff;
  }

  openModal() {
    this.resultsModal.classList.remove('hidden');
  }

  closeModal() {
    this.resultsModal.classList.add('hidden');
  }

  async shareResult() {
    if (!this.lastResult || !this.currentFlag) return;

    const t = I18N[this.currentLang];
    const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';
    const tierNum = this.currentFlag[tierProp];
    const meta = this.tierMeta[this.diffApproach][tierNum];
    const tierName = meta ? meta.shortName[this.currentLang] : `T${tierNum}`;

    const shieldText = this.currentFlag.hasShield
      ? (this.shieldMode === 'ignore' ? t.shieldOptional : t.shieldRequired)
      : t.noShield;

    const countryName = this.currentFlag.name[this.currentLang] || this.currentFlag.name.es;
    const shareText = `FLAG DRAWER — ${countryName.toUpperCase()} (T${tierNum}: ${tierName})\nScore: ${this.lastResult.score}% (${this.lastResult.badge}) | ${shieldText}\nStreak: ${this.stats.streak} | Record: ${this.stats.best}%\n#FlagDrawer`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Flag Guess & Draw Result',
          text: shareText
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('navigator.share falló:', err);
        }
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        this.showToast(t.copiedToast);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = shareText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        this.showToast(t.copiedToast);
      }
    } catch (err) {
      this.showToast(t.copyFail);
    }
  }

  showToast(message) {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastEl.textContent = message;
    this.toastEl.classList.remove('hidden');

    this.toastTimeout = setTimeout(() => {
      this.toastEl.classList.add('hidden');
      this.toastTimeout = null;
    }, 2400);
  }
}

// Inicialización universal
function startFlagGame() {
  try {
    window.flagGame = new FlagGame();
  } catch (err) {
    console.error('Fatal initialization error in FlagGame:', err);
    const target = document.getElementById('country-target');
    if (target) {
      target.textContent = 'Error: ' + err.message;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startFlagGame);
} else {
  startFlagGame();
}
