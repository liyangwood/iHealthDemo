


App.Layout.Main = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){


        return {};
    },
    componentWillMount() {
        document.addEventListener("keypress", this.closeCode)
    },
    componentWillUnmount() {
        document.removeEventListener("click", this.closeCode)
    },

    render : function(){
        let style = {
            background : KG.config.style.bgColor
        };

        return <RC.Body style={style}>
            <RC.AnimateWindow transitionName="from-top-slower">{this.props.headerTmpl}</RC.AnimateWindow>
            {this.props.bodyTmpl}
        </RC.Body>
    }
});
