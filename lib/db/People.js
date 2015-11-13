
DB.People = new Mongo.Collection('People');

DB.People.Schema = new SimpleSchema({
    name : {
        type : String
    },
    description : {
        type : String,
        optional : true
    },
    sex : {
        type : String,
        label : '性别'
    },
    createTime : {
        type : Date
    }
});

DB.People.attachSchema(DB.People.Schema);

DB.People.allow({
    insert : function(){
        return true;
    }
});

_.extend(DB.People, {
    insertData : function(data, callback){

        //TODO 逻辑处理
        if(!data.name){
            callback('名字必须填写', null);
            return;
        }

        if(!data.sex){
            callback('请选择性别', null);
            return;
        }


        data.createTime = Date.now();
        DB.People.insert(data, function(err, uuid){

            callback(err, uuid);
        });
    }
});


if(Meteor.isServer){
    Meteor.publish('DB.People', function(){
        return DB.People.find({});
    });
}