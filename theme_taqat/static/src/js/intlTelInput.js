/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.intlTelInput = publicWidget.Widget.extend({
  selector: "form:has(input[name='phone']), form:has(input[name='mobile'])",
  disabledInEditableMode: false,
  events: {
    "input input[data-original-name='phone']": "_onInputChange",
    "input input[data-original-name='mobile']": "_onInputChange",
  },
  start: function (editable_mode) {
    let self = this;
    let form = self.$target;
    if (!self.editableMode) {
      let inputs = form.find("input[name='phone'],input[name='mobile']");
      inputs.each(function () {
        let $input = $(this);
        $input.removeAttr("data-fill-with");
        if (!$input.attr("data-original-name")) {
          $input.attr("data-original-name", $input.attr("name"));
        }
        $input.attr("name", "");
        const iti = window.intlTelInput(this, {
          initialCountry: "qa",
          autoPlaceholder: "aggressive",
          separateDialCode: true,
          nationalMode: false,
          formatOnDisplay: false,
          fixDropdownWidth: false,
          strictMode: true,
          countrySearch: false,
          hiddenInput: (telInputName) => ({
            phone: $input.attr("data-original-name"),
          }),
        });
        $input.data("itiInstance", iti);
      });
    } else {
      let inputs = form.find(
        "input[data-original-name='phone'],input[data-original-name='mobile']"
      );
      inputs.each(function () {
        let $input = $(this);
        $input.attr("name", $input.attr("data-original-name"));
        form
          .find(
            "input[name='phone'][type='hidden'], input[name='mobile'][type='hidden']"
          )
          .remove();
      });
    }
  },

  _onInputChange: function (ev) {
    let self = this;
    let CurrentTarget = self.$(ev.currentTarget);
    let itiInstance = CurrentTarget.data("itiInstance");
    let realInputContainer = CurrentTarget.closest(".iti");
    let realInput = realInputContainer.find(
      `input[name='${CurrentTarget.attr("data-original-name")}'][type='hidden']`
    );
    if (itiInstance) {
      let fullNumber = itiInstance.getNumber();
      realInput.val(fullNumber);
    }
  },
});
