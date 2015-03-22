// components

var ReactMixin = {
    componentWillMount: function() {
        console.log("i've been mounted");
    },
    getInitialState: function() {
        return {count: 0}
    },
    incCount: function() {
        this.setState({count: this.state.count + 1})
    }
};

var ButtonComponent = React.createClass({displayName: "ButtonComponent",
    mixins:  [ReactMixin],
    render: function() {
        return React.createElement("button", {
                    className: "button", 
                    onClick: this.incCount}, 
                    this.props.txt, " ", this.state.count, " times"
                )
        }
    });

var InputComponent = React.createClass({displayName: "InputComponent",
    mixins: [ReactMixin],
    render: function() {
        return  (
            React.createElement("div", null, 
                React.createElement("label", null, this.state.count), 
                React.createElement("input", {type: "text", placeholder: this.props.txt, onChange: this.incCount})
            )
        )
    }
});

var Widget = React.createClass({displayName: "Widget",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "Hello"), 
                React.createElement(ButtonComponent, {txt: "Clicked"}), 
                React.createElement(InputComponent, {txt: "Write here"})
            )
        )
    }
});

React.render(React.createElement(Widget, null), document.getElementById("app"));

