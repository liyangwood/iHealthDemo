

KG.Header = React.createClass({
    mixins : [],

    renderButton : function(){
        return <RC.URL href="/add">Add People</RC.URL>;
    },

    render : function(){


        return <RC.Tabs theme="big">
                <RC.URL href="/add">Add People</RC.URL>
                <RC.URL href="/">List People</RC.URL>
                <RC.URL href="/grid">Grid People</RC.URL>
            </RC.Tabs>;
    }
});