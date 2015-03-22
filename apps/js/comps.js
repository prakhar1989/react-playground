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

var ButtonComponent = React.createClass({
    mixins:  [ReactMixin],
    render: function() {
        return <button
                    className="button"
                    onClick={this.incCount}>
                    {this.props.txt} {this.state.count} times
                </button>
        }
    });

var InputComponent = React.createClass({
    mixins: [ReactMixin],
    render: function() {
        return  (
            <div>
                <label>{this.state.count}</label>
                <input type="text" placeholder={this.props.txt} onChange={this.incCount} />
            </div>
        )
    }
});

var Widget = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Hello</h1>
                <ButtonComponent txt='Clicked' />
                <InputComponent txt="Write here" />
            </div>
        )
    }
});

React.render(<Widget />, document.getElementById("app"));

