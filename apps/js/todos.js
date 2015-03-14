var TodoItem = React.createClass({
    getInitialState: function() {
        return { done: false }
    },
    onChange: function() {
        this.setState({
            done: !this.state.done
        });
    },
    render: function() {
        var labelStyle = {
            textDecoration: this.state.done ? 'line-through' : 'none',
            marginLeft: '10px'
        };
        return (
            <li>
                <input type="checkbox" onChange={this.onChange}/>
                <span style={labelStyle}>{this.props.text}</span>
            </li>
        )
    }
});

var TodoList = React.createClass({
    render: function() {
        var createItem = function(txt) {
            return <TodoItem text={txt} />
        };
        return <ul>{this.props.items.map(createItem)}</ul>;
    }
});

var TodoApp = React.createClass({
    getInitialState: function () {
        return { items: [], done: 0, text: ''}
    },
    onChange: function (e) {
        this.setState({text: e.target.value});
    },
    addItem: function (e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([this.state.text]);
        this.setState({
            items: nextItems,
            text: ''
        });
    },
    onToggle: function(){
        console.log("toggling complete");
    },
    render: function() {
        return (
            <div>
                <h5>Todos</h5>
                <form onSubmit={this.addItem}>
                    <input type="text" placeholder="What to do next?"
                           onChange={this.onChange} value={this.state.text} />
                    <input type="submit" value="Add" />
                </form>
                <TodoList items={this.state.items} onToggle={this.onToggle}/>
            </div>
        )

    }
});

React.render(<TodoApp />, document.getElementById("app"));