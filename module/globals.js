// Namespace GLOBAL Configuration Values
export const GLOBALS = {};

/* ******** *
 * KEYWORDS *
 * ******** */

const SEP = `/`;
const KEY_BASE = `systems`;
const KEY_SYSTEM_NAME = `shootergenericsystem`;
const KEY_TEMPLATES = `templates`;
const KEY_ACTOR = `actor`;
const KEY_ITEM = `item`;
const KEY_DICE = `dice`;

const MSG_SUCCESS = `SUCCÉS`;
const MSG_FAILURE = `LAMENTABLE ÉCHEC`;
GLOBALS.messages = Object.freeze({
    "success" : `${MSG_SUCCESS}`,
    "failure" : `${MSG_FAILURE}`
});

/* ***** *
 * FILES *
 * ***** */

const FILE_ACTOR_SHEET = `actor-sheet.html`;
const FILE_ITEM_SHEET = `item-sheet.html`;
const FILE_DICE_ROLL = `dice-roll.html`;

/* ******* *
 * CLASSES *
 * ******* */

const DICE_SHAPE_D6 = `d-shape-d6`;
const DICE_SHAPE_SUCCESS = `d-success`;
const DICE_SHAPE_FAILURE = `d-failure`;
GLOBALS.classes = Object.freeze({
    "diceShapeSuccess" : `${DICE_SHAPE_D6} ${DICE_SHAPE_SUCCESS}`,
    "diceShapeFailure" : `${DICE_SHAPE_D6} ${DICE_SHAPE_FAILURE}`
});

/* ******************* *
 * TEMPLATES AND PATHS *
 * ******************* */

const PATH_TEMPLATES = `${KEY_BASE}${SEP}${KEY_SYSTEM_NAME}${SEP}${KEY_TEMPLATES}${SEP}`;

GLOBALS.templates = Object.freeze({
    "actorSheet" : `${PATH_TEMPLATES}${KEY_ACTOR}${SEP}${FILE_ACTOR_SHEET}`,
    "itemSheet" : `${PATH_TEMPLATES}${KEY_ITEM}${SEP}${FILE_ITEM_SHEET}`,
    "diceRoll" : `${PATH_TEMPLATES}${KEY_DICE}${SEP}${FILE_DICE_ROLL}`
});

/* ********** *
 * PUNCHLINES *
 * ********** */

GLOBALS.punchlines = Object.freeze({
    "act" : [
        "va t'il/elle prendre les choses en main ou se laisser aller ?",
        "va t'il/elle agir ou rester planté comme une moule ?"
    ],
    "know" : [
        "va t'il/elle fouiller dans sa mémoire avec succés ?",
        "va t'il/elle trouver ce qu'il/elle a sur le bout de la langue ?"
    ],
    "endure" : [
        "va t'il/elle encaisser comme un/une dur(e) ?",
        "saura t'il/elle serrer les dents comme un/une grand(e) ?"
    ],
    "force" : [
        "va t'il/elle y parvenir en forçant comme une mule ?",
        "a t'il/elle assez de muscles ?"
    ],
    "perceive" : [
        "a t'il/elle les sens suffisamment affutées ?",
        "se rendra t'il/elle compte de quelque chose ?"
    ],
    "obtrude" : [
        "saura t'il/elle faire péter le charisme ?",
        "saura t'il/elle imposer le respect ?"
    ],
    "expertise" : [
        "sait-il/elle ce qu'il/elle fait ?",
        "est-il/elle dans son domaine ?"
    ],
    "selfControl" : [
        "va t'il/elle garder ses nerfs ?",
        "va t'il/elle péter un plomb ?"
    ],
    "target" : [
        "a t'il/elle des yeux de lynx ?",
        "va t'il/elle toucher la cible ?"
    ],
});