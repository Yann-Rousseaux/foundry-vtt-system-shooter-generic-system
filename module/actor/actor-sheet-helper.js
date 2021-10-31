export class ActorSheetHelper {
/* ************** *
 *  SPECIALITIES  *
 * ************** *

  /**
   * Listen for click events on an attribute control to modify the composition of attributes in the sheet
   * @param {MouseEvent} event The originating left click event
   * @private
   */
  static async onClickSpecialisationControl(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const action = a.dataset.action;

    // Perform create and delete actions.
    switch (action) {
      case "show":
        alert('cool');
        //ActorSheetHelper.openSpecialisationDialog(event, this.actor);
        break;
      case "add":
        ActorSheetHelper.openNewSpecialisationDialog(event, this.actor);
        break;
      case "remove":
        ActorSheetHelper.deleteSpecialisation(event, this);
        break;
    }
  }

  /**
   *
   * @param {*} event
   * @param {*} anActor
   * @param {*} app
   */
  static async openNewSpecialisationDialog(event, anActor, app) {
    let dialogContent =
      '<div class="specialisations flexrow flex-group-left">' +
      '<input type="text" placeholder="Tir aveugle" id="spec-label" class="spec-label" minlength="2" maxlength="20" size="20" name="specLabel" value=""/>' +
      '<select id="spec-value" class="spec-value" name="specValue">' +
      '    <option value="1">1</option>' +
      '    <option value="2">2</option>' +
      '    <option value="3">3</option>' +
      "</select>" +
      '<select id="spec-parent" class="spec-parent" name="specParents">' +
      '    <option value="act">Agir</option>' +
      '    <option value="know">Savoir</option>' +
      '    <option value="endure">Endurer</option>' +
      '    <option value="force">Forcer</option>' +
      '    <option value="perceive">Percevoir</option>' +
      '    <option value="obtrude">S\'imposer</option>' +
      '    <option value="expertise">Savoir-Faire</option>' +
      '    <option value="fight">Se battre</option>' +
      '    <option value="selfControl">Se contrôler</option>' +
      '    <option value="target">Viser</option>' +
      "</select>" +
      "</div>";

    new Dialog({
      title: "Nouvelle spécialité",
      content: dialogContent,
      buttons: {
        addValue: {
          label: "Ajouter",
          callback: async (html) => {
            let newSpeciality = {
              label: html.find("#spec-label")[0].value,
              value: html.find("#spec-value")[0].value,
              parent: html.find("#spec-parent")[0].value,
              parentValue: anActor.data.data.abilities[html.find("#spec-parent")[0].value].value,
              parentName: anActor.data.data.abilities[html.find("#spec-parent")[0].value].label
            };

            let datas = anActor.data.data;
            datas.specialisations.push(newSpeciality);
            anActor.update({"data.specialisations":datas.specialisations});
          },
        },
      },
    }).render(true);
  }

  static stringToKey(word) {
    let key = "";
    word.split(" ").forEach((element) => {
      let formatedElement = element
        .trim()
        .replace(/\s/g, "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      key = key.concat(
        formatedElement.charAt(0).toUpperCase() + formatedElement.slice(1)
      );
    });
    return key.charAt(0).toLowerCase() + key.slice(1);
  }

  /**
   * Validate whether or not a group name can be used.
   * @param {string} groupName Groupname to validate
   * @returns {boolean}
   */
  static validateSpecialisation(specName, entity) {
    let groups = Object.keys(entity.object.data.data.groups);
    let attributes = Object.keys(
      entity.object.data.data.specialisations
    ).filter((a) => !groups.includes(a));

    // Check for duplicate group keys.
    if (groups.includes(groupName)) {
      ui.notifications.error(
        game.i18n.localize("SIMPLE.NotifyGroupDuplicate") + ` (${groupName})`
      );
      return false;
    }

    // Check for group keys that match attribute keys.
    if (attributes.includes(groupName)) {
      ui.notifications.error(
        game.i18n.localize("SIMPLE.NotifyGroupAttrDuplicate") +
          ` (${groupName})`
      );
      return false;
    }

    // Check for whitespace or periods.
    if (groupName.match(/[\s|\.]/i)) {
      ui.notifications.error(
        game.i18n.localize("SIMPLE.NotifyGroupAlphanumeric")
      );
      return false;
    }

    return true;
  }

  /**
   * Delete an attribute.
   * @param {MouseEvent} event    The originating left click event
   * @param {Object} app          The form application object.
   * @private
   */
  static async deleteSpecialisation(event, app) {
    let key = event.currentTarget.dataset.key;
    let anActor = app.actor;
    let datas = anActor.data.data;
    datas.specialisations[key] = null;
    anActor.update({"data.specialisations":datas.specialisations});
  }

  /**
   *
   * @param {*} value
   */
  static async composeFormula(value) {
    let rollFormula = "";

    if (value > 0) {
      rollFormula += "{";

      for (let start = 0, end = value; start < end; start++) {
        rollFormula += "1d6";
        start < end - 1 ? (rollFormula += ",") : (rollFormula += "}");
      }

      rollFormula += "cs>3";
    }

    return rollFormula;
  }

  /**
   *
   * @param {*} event
   */
  static async onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let key = dataset.ability_key;
    let abilityValue = this.actor.data.data.abilities[key].value;
    let rollLabel = this.actor.data.data.abilities[key].label;

    let rollFormula = await ActorSheetHelper.composeFormula(abilityValue);
    let rollDatas = await ActorSheetHelper.getRollDatas(abilityValue, rollFormula, this.actor, false);

    if(rollDatas.failureCount > 0 && dataset.type == 'specialisation') {
      let specValue = dataset.spec_value;
      rollLabel = rollLabel.concat(': ').concat(dataset.spec_label);
      let numberOfReroll = specValue < rollDatas.failureCount ? specValue : rollDatas.failureCount;
      let rerollFormula = await ActorSheetHelper.composeFormula(numberOfReroll);
      let rerollDatas = await ActorSheetHelper.getRollDatas(specValue, rerollFormula, this.actor, true);

      rollDatas.successCount = rollDatas.successCount + rerollDatas.successCount;

      rollDatas.dices.forEach((d, index) => {
        if(!d.success && rerollDatas.dices.length > 0) {
          d.reroll = rerollDatas.dices.pop();
        }
      });
    }

    // TODO Eventuellement remplacer rollDatas.successCount
    let htmlData = {
      punchline: await ActorSheetHelper.getPunchline(key),
      resultMsg: await ActorSheetHelper.getResultMessage(rollDatas.successCount, key),
      dices: rollDatas.dices,
      actorImage: this.actor.data.token.img,
      actorName: this.actor.name,
      rollLabel: rollLabel
    };

    let html = await renderTemplate(
      CONFIG.GLOBALS.templates.diceRoll,
      htmlData
    );

    let chatData = {
      user: game.user._id,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: html,
    };

    ChatMessage.create(chatData);
  }

  static async getRollDatas(diceNumber, formula, anActor, reroll) {
    let roll = new Roll(formula, anActor.data.data).roll();
    let successCount = roll.result;
    let dicePool = roll.dice;
    let failureCount = diceNumber - successCount;
    let dices = [];

    dicePool.forEach((d) => {
      dices.push({
        value: d.values[0],
        success: d.values[0] > 3 ? true : false,
        reroll: reroll
      });
    });

    dices.sort(function (a, b) {
      return a.value - b.value;
    });

    return {
      "successCount": parseInt(successCount, 10),
      "failureCount": failureCount,
      "dices": dices
    };
  }
  /**
   * @param {*} key 
   */
  static async getPunchline(key) {
    let punchlineArray = CONFIG.GLOBALS.punchlines[key];
    let punchline = '';

    if(punchlineArray) {
      punchline = punchlineArray[Math.floor(Math.random() * punchlineArray.length)];

      if(punchline === undefined || punchline === null || !punchline) {
        punchline = '';
      }
    }

    return punchline;
  }

  /**
   * Obtenir le message de resultat
   * @param {*} result 
   * @param {*} key 
   */
  static async getResultMessage(result, key) {
    let resultMsg = "";

    if (result == 0 && (!key || key === '')) {
      resultMsg = `${CONFIG.GLOBALS.messages.failure} !`;
    } else if (result >= 1) {
      resultMsg = `${result} ${CONFIG.GLOBALS.messages.success} !`;
    }

    return resultMsg;
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  static async onClickItemControl(event) {
    event.preventDefault();
    const dataset = event.currentTarget.dataset;
    let item = null;

    switch ( dataset.action ) {
      case "create":
        let cls = getDocumentClass("Item");
        return cls.create({name: game.i18n.localize("SIMPLE.ItemNew"), type: "item"}, {parent: this.actor});
      case "show":
      case "edit":
        item = this.actor.items.get(dataset.itemId);
        return item.sheet.render(true);
      case "delete":
        item = this.actor.items.get(dataset.itemId);
        return item.delete();
      default :
        return;
    }
  }
}
