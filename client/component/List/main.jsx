

KG.List = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        Meteor.subscribe('DB.People');

        let sort = {
            'createTime' : -1
        };

        let data = DB.People.find({}, {sort : sort}).fetch();

        return _.map(data, function(item){
            return {
                title : item.name,
                subtitle : item.description
            };
        });
    },


    render : function(){

        let itemList = _.map(this.data, function(item, index){
            _.extend(item, {
                theme : 'body',
                uiClass : 'chevron-right',
                uiColor : 'gray'
            });

            return <RC.Item {... item} key={index} />
        });


        return <RC.List>

            <RC.Item theme="divider">List</RC.Item>
            {itemList}
        </RC.List>
    }
});