var PersonComponent = React.createClass({
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
            <div>
                <p>{ this.state.name } - { this.state.age } years old </p>
                <button onClick={this.incAge}>+</button>
                <button onClick={this.decAge}>-</button>
                <Widget txt={this.props.name} update={this.changeName} />
            </div>
        );
    }
});

var Widget = React.createClass({
    render: function() {
        return (
                <input type="text" onChange={this.props.update} placeholder="Name.." />
        )
    }
});


React.render(
    <PersonComponent name="Prakhar"/>,
    document.getElementById("personApp")
);
