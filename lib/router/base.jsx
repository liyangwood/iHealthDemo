/*
*
* router相关
* */
if(Meteor.isClient){

    let render = {};
    let routeHandler = function(param, opts){
        render = _.extend({
            metaTitle : Meteor.settings.public.AppName,
            metaDesc: Meteor.settings.public.AppDesc,

            // Route
            layout: App.Layout.Main,
            pageTitle: "DEMO",

            headerTmpl : <KG.Header />,
            bodyTmpl: null
        }, render, opts||{});

        document.title = render.metaTitle;
        document.description = render.metaDesc;

        ReactLayout.render(render.layout, render);
    };


    App.routeHandler = routeHandler;



    FlowRouter.route("/", {
        name : "list",
        action : function(p){
            routeHandler(p, {
                bodyTmpl: <KG.List />,
                metaTitle : 'List People'
            })
        }
    });

    FlowRouter.route('/add', {
        name : 'add',
        action : function(param){
            App.routeHandler(param, {
                metaTitle : 'Add People',
                bodyTmpl : <KG.AddPeople />
            });
        }
    });

    FlowRouter.route('/grid', {
        name : 'grid',
        action : function(param){
            App.routeHandler(param, {
                metaTitle : 'Grid People',
                bodyTmpl : <KG.Grid />
            });
        }
    });

}



