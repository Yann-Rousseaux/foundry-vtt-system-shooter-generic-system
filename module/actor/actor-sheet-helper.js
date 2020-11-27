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
      case "add":
        ActorSheetHelper.openNewSpecialisationDialog(event, this.actor);
        // ActorSheetHelper.addSpecialisation(event, this);
        break;
      case "delete":
        ActorSheetHelper.deleteSpeciality(event, this);
        break;
    }
  }

  static async openNewSpecialisationDialog(event, anActor, app) {

    let dialogContent =
      '<div class="specialisations flexrow flex-group-left">'
    + '<input type="text" placeholder="Tir aveugle" id="spec-label" class="spec-label" minlength="2" maxlength="20" size="20" name="specLabel" value=""/>'
    + '<select id="spec-value" class="spec-value" name="specValue">'
    + '    <option value="1">1</option>'
    + '    <option value="2">2</option>'
    + '    <option value="3">3</option>'
    + '</select>'
    + '<select id="spec-parent" class="spec-parent" name="specParents">'
    + '    <option value="act">Agir</option>'
    + '    <option value="endure">Endurer</option>'
    + '    <option value="force">Forcer</option>'
    + '    <option value="perceive">Percevoir</option>'
    + '    <option value="obtrude">S\'imposer</option>'
    + '    <option value="expertise">Savoir-Faire</option>'
    + '    <option value="fight">Se battre</option>'
    + '    <option value="selfControl">Se contrôler</option>'
    + '    <option value="target"Viser</option>'
    + '</select>'
    + '</div>';

    new Dialog({
        title: "Nouvelle spécialité",
        content: dialogContent,
        buttons: {
            addValue: {
                label: "Ajouter",
                callback: async (html) => {
                  
                  let newSpeciality = {
                    "label": html.find("#spec-label")[0].value,
                    "value": html.find("#spec-value")[0].value,
                    "parent": html.find("#spec-parent")[0].value
                  };
                  
                  let key = ActorSheetHelper.stringToKey(newSpeciality.label);

                  anActor.data.data.specialisations[key] = newSpeciality;

                  anActor.update(anActor.data);
                }
            }
        }
    }).render(true);
  }

  static stringToKey(word) {
    let key = '';
    word.split(' ').forEach(element => {
      let formatedElement = element.trim().replace(/\s/g, '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      key = key.concat(formatedElement.charAt(0).toUpperCase() + formatedElement.slice(1));
    });
    return key.charAt(0).toLowerCase() + key.slice(1);
  }

  /**
   * Validate whether or not a group name can be used.
   * @param {string} groupName Groupname to validate
   * @returns {boolean}
   */
  static validateGroup(groupName, entity) {
    let groups = Object.keys(entity.object.data.data.groups);
    let attributes = Object.keys(entity.object.data.data.specialisations).filter(a => !groups.includes(a));

    // Check for duplicate group keys.
    if ( groups.includes(groupName) ) {
      ui.notifications.error(game.i18n.localize("SIMPLE.NotifyGroupDuplicate") + ` (${groupName})`);
      return false;
    }

    // Check for group keys that match attribute keys.
    if ( attributes.includes(groupName) ) {
      ui.notifications.error(game.i18n.localize("SIMPLE.NotifyGroupAttrDuplicate") + ` (${groupName})`);
      return false;
    }

    // Check for whitespace or periods.
    if ( groupName.match(/[\s|\.]/i) ) {
      ui.notifications.error(game.i18n.localize("SIMPLE.NotifyGroupAlphanumeric"));
      return false;
    }

    return true;
  }

/**
   * Create new attributes.
   * @param {MouseEvent} event    The originating left click event
   * @param {Object} app          The form application object.
   * @private
   */
  static async addSpecialisation(event, app) {
    const a = event.currentTarget;




    // const b = a.parentElement;
    // let label = b.children[0];
    // let value = b.children[1];
    // let parent = b.children[2];
    // const group = a.dataset.group;
    // let dtype = a.dataset.dtype;
    // const attrs = app.object.data.data.specialisations;
    // const groups = app.object.data.data.groups;
    // const form = app.form;

    // // Determine the new attribute key for ungrouped attributes.
    // let objKeys = Object.keys(attrs).filter(k => !Object.keys(groups).includes(k));
    // let nk = Object.keys(attrs).length + 1;
    // let newValue = `attr${nk}`;
    // let newKey = document.createElement("div");
    // while ( objKeys.includes(newValue) ) {
    //   ++nk;
    //   newValue = `attr${nk}`;
    // };

    // // Build options for construction HTML inputs.
    // let htmlItems = {
    //   key: {
    //     type: "text",
    //     value: newValue
    //   }
    // };

    // // Grouped attributes.
    // if ( group ) {
    //   objKeys = attrs[group] ? Object.keys(attrs[group]) : [];
    //   nk = objKeys.length + 1;
    //   newValue = `attr${nk}`;
    //   while ( objKeys.includes(newValue) ) {
    //     ++nk;
    //     newValue =  `attr${nk}`;
    //   }

    //   // Update the HTML options used to build the new input.
    //   htmlItems.key.value = newValue;
    //   htmlItems.group = {
    //     type: "hidden",
    //     value: group
    //   };
    //   htmlItems.dtype = {
    //     type: "hidden",
    //     value: dtype
    //   };
    // }
    // // Ungrouped attributes.
    // else {
    //   // Choose a default dtype based on the last attribute, fall back to "String".
    //   if (!dtype) {
    //     let lastAttr = document.querySelector('.attributes > .attributes-group .attribute:last-child .attribute-dtype')?.value;
    //     dtype = lastAttr ? lastAttr : "String";
    //     htmlItems.dtype = {
    //       type: "hidden",
    //       value: dtype
    //     };
    //   }
    // }

    // // Build the form elements used to create the new grouped attribute.
    // newKey.innerHTML = EntitySheetHelper.getAttributeHtml(htmlItems, nk, group);

    // // Append the form element and submit the form.
    // newKey = newKey.children[0];
    // form.appendChild(newKey);
    await app._onSubmit(event);
  }

    /**
   * Delete an attribute.
   * @param {MouseEvent} event    The originating left click event
   * @param {Object} app          The form application object.
   * @private
   */
  static async deleteSpeciality(event, app) {
    // const a = event.currentTarget;
    // const li = a.closest(".attribute");
    // if ( li ) {
    //   li.parentElement.removeChild(li);
    //   await app._onSubmit(event);
    // }
  }

/* ******************** *
 *  SPECIALITIES GROUPS *
 * ******************** *

  /**
   * Listen for click events and modify attribute groups.
   * @param {MouseEvent} event    The originating left click event
   */
  static async onClickSpecialisationGroupControl(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const action = a.dataset.action;

    switch ( action ) {
      case "create-group":
        ActorSheetHelper.createSpecialisationGroup(event, this);
        break;
      case "delete-group":
        // EntitySheetHelper.deleteAttributeGroup(event, this);
        break;
    }
  }

    /**
   * Create new attribute groups.
   * @param {MouseEvent} event    The originating left click event
   * @param {Object} app          The form application object.
   * @private
   */
  static async createSpecialisationGroup(event, app) {
    const a = event.currentTarget;
    const form = app.form;
    let newValue = $(a).siblings('.group-prefix').val();
    // Verify the new group key is valid, and use it to create the group.
    if ( newValue.length > 0 && ActorSheetHelper.validateGroup(newValue, app) ) {
      let newKey = document.createElement("div");
      newKey.innerHTML = `<input type="text" name="data.groups.${newValue}.key" value="${newValue}"/>`;
      // Append the form element and submit the form.
      newKey = newKey.children[0];
      form.appendChild(newKey);
      await app._onSubmit(event);
    }
  }




}