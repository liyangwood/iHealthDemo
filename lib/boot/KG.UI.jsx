KG = {};

var ALL_CLASS = {};
var F = {
    defineComponent : function(name, opts, parent){
        if(ALL_CLASS[name]) return Meteor.Error(name +' component is exist');

        parent = parent ? ALL_CLASS[parent] : null;

        if(parent){
            opts = _.extend(opts, parent);
        }


        ALL_CLASS[name] = opts;


        var tmp = React.createClass(opts);
        if(Meteor.isClient){
            KG.UI[name] = tmp;
        }

        return tmp;
    },

    getAllClass : function(){
        return ALL_CLASS;
    }

};

KG.UI = F;


// base label
KG.UI.defineComponent('label', {
    getInitialState : function(){
        return {
            name : 'label',
            color : 'red'
        }
    },

    render : function(){
        return <b>{this.state.name}, {this.state.color}</b>;
    }
});

KG.UI.defineComponent('labelE', {

}, 'label');