

KG.AddPeople = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){

        return {};
    },
    componentWillMount() {

    },
    componentWillUnmount() {

    },

    submit : function(e){
        e.preventDefault();
        let data = this.refs.form.getFormData();
        console.log(data);

        alert(JSON.stringify(data));

        return false;

        DB.People.insertData({
            name : data.name,
            sex : data.sex,
            description : data.desc
        }, function(err, uuid){
            if(err){
                alert(err);
                return;
            }
            alert('add success');
            FlowRouter.go('/');
        });
    },

    nameInputRender : function(){
        let prop = {
            value : '',
            label : 'Name',
            placeholder : 'input people name',
            labelColor : '#009bba',
            name : 'name',
            errorHandler : function(val){
                return !val;
            }
        };

        return <RC.Input {... prop} />;
    },

    descInputRender : function(){
        let prop = {
            placeholder : 'type people description',
            label : 'Description',
            value : '',
            name : 'desc',
            style : {
                paddingTop : '20px'
            },
            labelStyle : {
                color : '#009bba'
            },
            bgColor : ''
        };

        return <RC.Textarea {... prop} />;
    },

    sexInputRender : function(){
        let options = ['男', '女'];


        return <RC.Select name="sex" labelColor="#009bba" options={options} value="女" label="Sex" />;
    },

    render : function(){
        let formStyle = {
            padding : '0 15px',
            width : '100%',
            float : 'left'
        };

        let buttonStyle = {
            float : 'right'
        };

        return <RC.Form bgColor="#ffffff" style={formStyle} ref='form' onSubmit={this.submit}>
            {this.nameInputRender()}
            {this.sexInputRender()}
            {this.descInputRender()}

            <KUI.Button style={buttonStyle} theme="inline" bgColor="brand1">Add People</KUI.Button>
            <KUI.Button style={buttonStyle} theme="inline" type="reset">Reset</KUI.Button>
            <KUI.Label />
            </RC.Form>;
    }
});