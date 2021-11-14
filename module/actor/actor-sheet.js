import { ActorSheetHelper } from "./actor-sheet-helper.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class shootergenericsystemActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    let sideBarWidth = 800;
    let sheetHeight = window.innerHeight > sideBarWidth ? sideBarWidth : window.innerHeight;
    let sheetWidth = 550;
    let sheetLeftPostion = 0;
    let sheetTopPostion = 0;

    return mergeObject(super.defaultOptions, {
      classes: ["shootergenericsystem", "sheet", "actor"],
      template: CONFIG.GLOBALS.templates.actorSheet,
      width: sheetWidth,
      height: sheetHeight,
      left: sheetLeftPostion,
      top: sheetTopPostion,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "abilities" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.dtypes = ["String", "Number", "Boolean"];
    /* Récupération du jeu pour afficher les bon onglets */
    let selectedGame = game.settings.get('gameSelectorModule', 'gameChoices');
    data.data.world_option = selectedGame;
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable){
      return;
    }

    /* SPECIALISATIONS */
      // ADD or REMOVE specialisation.
      html.find('.spec-action').click(ActorSheetHelper.onClickSpecialisationControl.bind(this));

    /* ITEMS */
      html.find('.item-control').click(ActorSheetHelper.onClickItemControl.bind(this));

      html.find('.roll-ability').click(ActorSheetHelper.onRoll.bind(this));
      html.find('.roll-spec').click(ActorSheetHelper.onRoll.bind(this));
  }

  /* -------------------------------------------- */



  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data).roll();
      let dices = [];

      roll.dice.forEach( d=> {
        dices.push({
          "value": d.values[0],
          "class": d.values[0] > 3 ? CONFIG.GLOBALS.classes.diceShapeSuccess : CONFIG.GLOBALS.classes.diceShapeFailure
        });
      });

      dices.sort(function(a, b){
        return a.value-b.value
      })

      let result = roll.result;
      let resultMsg = "";
      if(result == 0) {
        resultMsg = `${CONFIG.GLOBALS.messages.failure} !`;
      } else if(result >= 1) {
        resultMsg = `${result} ${CONFIG.GLOBALS.messages.success} !`;
      }

      let actorName = this.actor.name;
      let actorImage = this.actor.img;

      let punchlineArray = CONFIG.GLOBALS.punchlines[dataset.key];
      let punchline = punchlineArray[Math.floor(Math.random() * punchlineArray.length)];

      let htmlData = {
        "punchline": punchline,
        "dices": dices,
        "resultMsg": resultMsg,
        "actorImage": actorImage,
        "actorName": actorName,
        "rollLabel": dataset.label.toUpperCase()
      };

      let html = await renderTemplate(CONFIG.GLOBALS.templates.diceRoll, htmlData);

      let chatData = {
        user: game.user._id,
        type: CONST.CHAT_MESSAGE_TYPES.OTHER,
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        content: html
      };
  
      ChatMessage.create(chatData);
    }
  }

}
