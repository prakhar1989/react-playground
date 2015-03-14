var PersonComponent = React.createClass({displayName: "PersonComponent",
    getInitialState: function() {
        return {
            name: this.props.name,
            age: 10
        }
    },
    incAge: function() {
        this.setState({age: this.state.age + 1});
    },
    decAge: function() {
        this.setState({age: this.state.age - 1});
    },
    changeName: function(e) {
        if (e.target.value.length == 0) {
            this.setState({name: 'unnamed'});
        } else {
            this.setState({name: e.target.value});
        }
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("p", null,  this.state.name, " - ",  this.state.age, " years old "), 
                React.createElement("button", {onClick: this.incAge}, "+"), 
                React.createElement("button", {onClick: this.decAge}, "-"), 
                React.createElement(Widget, {txt: this.props.name, update: this.changeName})
            )
        );
    }
});

var Widget = React.createClass({displayName: "Widget",
    render: function() {
        return (
                React.createElement("input", {type: "text", onChange: this.props.update, placeholder: "Name.."})
        )
    }
});


React.render(
    React.createElement(PersonComponent, {name: "Prakhar"}),
    document.getElementById("personApp")
);
