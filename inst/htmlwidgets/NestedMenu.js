HTMLWidgets.widget({
  name: "NestedMenu",

  type: "output",

  factory: function (el, width, height) {

    return {
      renderValue: function (x) {

        var selector = ".NestedMenu span.NM-" + el.id;
        var $button = $(selector);
        $button.addClass("btn-" + x.style);
        if(x.size !== null){
          $button.addClass("btn-" + x.size);
        }

        if (x.icon) {
          text = '<i class="fa-regular ' + x.icon + '"></i> &nbsp;' + x.label;
        } else {
          text = x.label;
        }

        if (x.zIndex) {
          zIndex = x.zIndex;
        } else {
          zIndex = 1;
        }
        
        $button.html(text);
        
        // Destroy any existing contextMenu
        $.contextMenu('destroy', selector);

        // Render the new contextMenu
        $.contextMenu({
          selector: selector,
          trigger: x.trigger,
          callback: function (key, options) {
            if(HTMLWidgets.shinyMode){
              Shiny.setInputValue(el.id, key, {priority: "event"});
            }
          },
          zIndex: zIndex,
          items: x.items
        });
      },

      resize: function (width, height) {
        // TODO: code to re-render the widget with a new size
      }
    };
  }
});
