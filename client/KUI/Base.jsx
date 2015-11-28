


KUI.Class.define('ui.Base', {


    mixins : [RC.Mixins.PureRender, RC.Mixins.CSS],

    getInitialState : function(){
      return {};
    },

    render : function(){}
});


KUI.Class.define('ui.Widget', {



}, 'ui.Base');
