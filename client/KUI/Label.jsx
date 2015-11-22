
let labelWidth = 100;
let PAD = 8;

KUI.Label = KUI.Class.define('ui.Label', {

    getInitialState : function(){
        return {
            label : 'ui.label'
        };
    },

    propTypes : function(){
        return {
            id : React.PropTypes.string,
            form: React.PropTypes.string,
            name: React.PropTypes.string,
            className: React.PropTypes.string
        };
    },

    baseStyles(np,ns) {

        if (typeof this.bgColorHover === "undefined" || np.bgColorHover!=this.props.bgColorHover)
            this.bgColorHover = np.bgColorHover
                ? h.getRealColor(np.bgColorHover, "brand1", null, true)
                : RC.Theme.color.brand1

        if (typeof this.colorHover === "undefined" || np.colorHover!=this.props.colorHover)
            this.colorHover = np.colorHover
                ? h.getRealColor(np.colorHover, "onBrand1", null, true)
                : RC.Theme.color.onBrand1

        let buttonColor = ns.isHover && ns.isActive ? this.bgColorHover : this.color.hex
        let textColor = ns.isHover && ns.isActive ? this.colorHover : this.color.textColor
        let buttonPAD = 10

        return {
            area: h.assignClone( RC.cssMixins.clean(), {
                position: "relative", width: "100%", minHeight: 36,
                zIndex: ns.isHover && ns.isActive ? 2 : 1,
                transition: "all .2s ease",
                padding: (buttonPAD-2)+"px "+buttonPAD+"px "+(buttonPAD-1)+"px",
                margin: RC.Theme.size.paddingPx+"px 0",
                color: textColor,
                cursor: ns.isActive ? "pointer" : "auto",
                backgroundColor: buttonColor,
                // border: "solid 1px "+RC.Theme.color.edgesLighter,
            }),
        }
    },
    themeStyles(np,ns) {
        let cPAD = RC.Theme.size.paddingPx - PAD // This must be here to allow dynamic changes
        return {
            inline: {
                area: {
                    display: "inline-block", width: "auto", margin: "10px 5px 10px 0"
                },
            },
            // overlay: {
            //   area: {
            //     border: "none",
            //   }
            // },
            circle: {
                area: {
                    borderRadius: "50%",
                    width: 78, height: 78, margin: "0 auto"
                }
            },
            // "no-borders": {
            //   area: {
            //     border: "none"
            //   }
            // }
        }
    },

    render : function(){
        return <label>{JSON.stringify(this.state)}</label>;
    }
}, 'ui.Widget');


KUI.Button = KUI.Class.define('ui.Button', {

    displayName: "Button",

    propTypes: function(){

        return _.extend(this.callParent('propTypes'), {
            theme: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.array
            ]),
            type: React.PropTypes.string
        });
    },
    getInitialState() {
        var par = this.callParent('getInitialState');
        return _.extend(par, {
            isHover: false,
            isActive: true
        });
    },
    onHoverStart(e){
        this.setState({ isHover: true })
        if (_.isFunction(this.props.onMouseOver))
            this.props.onMouseOver(e)
        if (_.isFunction(this.props.onTouchStart))
            this.props.onTouchStart(e)
    },
    onHoverStop(e){
        this.setState({ isHover: false })
        if (_.isFunction(this.props.onMouseOut))
            this.props.onMouseOut(e)
        if (_.isFunction(this.props.onTouchEnd))
            this.props.onTouchEnd(e)
    },
    renderIcon(){
        if (!this.props.uiClass) return null
        return <RC.uiIcon
            {... _.pick(this.props, _.without(RC.uiKeys,"uiBgColor"))}
            uiColor={this.props.uiColor || (this.state.isHover ? this.colorHover : this.color.textColor)}
            itemStyle={{margin: "3px 5px 0 0", verticalAlign: "top"}}
            theme="inline-block-left" uiSize={14} />
    },
    rightClick : function(e){
        e.preventDefault();
        alert(JSON.stringify(this.state));
    },
    render() {
        let styles = this.css.styles

        return <button
            {... _.omit(this.props,RC.uiKeys)} style={styles.area}
                                               onMouseOver={this.onHoverStart} onTouchStart={this.onHoverStart}
                                               onMouseOut={this.onHoverStop} onTouchEnd={this.onHoverStop}
                                               onContextMenu={this.rightClick}
            >
            {this.renderIcon()}
            {this.props.children}
        </button>
    },
    // @@@@
    // @@@@
    // Styles
    // @@@@
    // @@@@
    defBgColor: "fog",
    watchProps: ["bgColorHover","colorHover"],
    watchStates: ["isHover","isActive"]

}, 'ui.Label');