var List = React.createClass({
    render: function() {
        return (
            <ul>
            {
                this.props.items.map(function(item) {
                    return <li key={item}>{item}</li>
                })
            }
            </ul>
        )
    }
});

var Filterable = React.createClass({
    getInitialState: function() {
        return { items: [] }
    },
    componentWillMount: function() {
        this.setState({items: this.props.items});
    },
    filter: function(e) {
        var query = e.target.value;
        if (query.length > 0) {
            var items = this.state.items.filter(function(item) {
                return (item.toLowerCase()).search(query) !== -1;
            });
            this.setState({items: items});
        } else {
            this.setState({items: this.props.items});
        }
    },
    render: function() {
        return (
            <div>
                <input type="text" onChange={this.filter} placeholder="search..." />
                <List items={this.state.items} />
            </div>
        );
    }
});

var items = [
    "Hash Brown",
    "Potato Muffin",
    "Bread sandwich",
    "Bagel and Eggs",
    "Vanilla Ice Cream",
    "Chicken Wings"
];
React.render(<Filterable items={items}/>, document.getElementById("app"));