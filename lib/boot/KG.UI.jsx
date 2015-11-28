
KUI = {};

var ALL_CLASS = {},
    ALL_REACT_CLASS = {};
var F = {
    define : function(name, opts, parentName){
        if(ALL_CLASS[name]) return (name +' component is exist');


        var base = {
            callParent : function(name, args){

                var tmp = this.getParent();
                if(tmp){
                    var par = tmp[name];
                    return _.isFunction(par) ? par.apply(tmp, args) : _.clone(par);
                }
            },
            getParent : function(){

                return ALL_CLASS[this._name]._parent || null;
            }
        };

        var setting = {};
        //if(!_.isArray(parent)){
        //    parent = [parent];
        //}
        //parent = _.map(function(one){
        //    var x = ALL_CLASS[one];
        //    if(!x) throw one +' is not defined';
        //
        //    return ALL_CLASS[one];
        //});
        //
        //parent.shift(base);
        //setting = _.extend.apply(_, parent);


        parent = parentName ? ALL_CLASS[parentName] : null;

        if(parent){
            setting = _.extend({}, parent, opts);

        }
        else{
            setting = _.extend({}, base, opts);
        }

        setting._parent = parent;
        setting._name = name;
        ALL_CLASS[name] = setting;

        var $obj = React.createClass(setting);
        ALL_REACT_CLASS[name] = $obj;

        return $obj;

    },

    getAllClass : function(){
        return ALL_CLASS;
    },

    get : function(name){
        var tmp = ALL_REACT_CLASS[name];

        return tmp || null;
    }

};

KUI.Class = F;
