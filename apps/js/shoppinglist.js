var Description = React.createClass({
    propTypes: {
        description: React.PropTypes.string
    },
    render: function() {
        return <div className="panel-body"> {this.props.description} </div>
    }
});

var ListItem = React.createClass({
    propTypes: {
        handleRemoveListItem: React.PropTypes.func.isRequired,
        item: React.PropTypes.object.isRequired
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.handleRemoveListItem(this.props.item.id);
    },
    render: function() {
        var item = this.props.item;
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    {item.quantity} x {item.name}
                </div>

                {item.description.length > 0 ? <Description description={item.description} /> : ''}
                <div classNamme="panel-footer">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <button type="submit" className="btn btn-default btn-xs">Remove</button>
                    </form>
                </div>
            </div>
        )
    }
});

var ListHeader = React.createClass({
    propTypes: {
        totalNumberOfListItems: React.PropTypes.number.isRequired,
        removeAllListItems: React.PropTypes.func.isRequired
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.removeAllListItems();
    },
    render: function() {
        var totalNumberOfListItems = this.props.totalNumberOfListItems;
        if (totalNumberOfListItems > 0) {
            return (
                <form onSubmit={this.handleSubmit} className="form-inline">
                    {this.props.totalNumberOfListItems} {totalNumberOfListItems === 1 ? "item" : "items"}
                    <button className="btn btn-xs btn-default" type="submit">Remove All</button>
                </form>
            )
        }
        return (<span> Shopping List</span>)
    }
});

var EmptyList = React.createClass({
    render: function() {
        return <div> There are no items in your list </div>
    }
});

var List = React.createClass({
    propTypes: {
        removeListItem: React.PropTypes.func.isRequired,
        removeAllListItems: React.PropTypes.func.isRequired,
        items: React.PropTypes.array.isRequired
    },
    getListOfItemIds: function (items) {
        return Object.keys(items);
    },
    getTotalNumberOfListItems: function(items) {
        var total = 0;
        var item;

        this.getListOfItemIds(items).forEach(function (itemId) {
            item = items[itemId];
            total = total + parseInt(item.quantity, 10);
        });
        return total;
    },
    generateListItem: function(item) {
        return (
            <ListItem item={item}
                handleRemoveListItem={this.props.removeListItem}
                key={item.id}
            />
        )
    },
    createListItemElements: function(items) {
        var item;
        return (
            this
            .getListOfItemIds(items)
            .map(function(itemId) {
                    item = items[itemId];
                    return this.generateListItem(item);
                }.bind(this))
        );
    },
    render: function() {
        var items = this.props.items;
        var listItemElements = this.createListItemElements(items);

        return (
            <div>
                <h3 className='page-header'>
                <ListHeader
                    totalNumberOfListItems = {this.getTotalNumberOfListItems(items)}
                    removeAllListItems = {this.props.removeAllListItems} />
                </h3>
                <ul> {listItemElements.length > 0 ? listItemElements : <EmptyList />} </ul>
            </div>
        )
    }
});


var AddListItem = React.createClass({
    getNewId: function() {
        return (Math.round(Math.random() * 10000)).toString();
    },
    render: function() {
        return <h1>hello</h1>
    }
});

/*  The key data structure in the master shopping list
    is an object and not an array (called list)
    items are indexed by uuids.
    Hence, iteration is done via object.keys()
 */
var ShoppingList = React.createClass({
    getInitialState: function() {
        return { list: {} }
    },
    addListItem: function(item) {
        var list = this.state.list;
        list[item.id] = item;
        this.updateList(list);
    },
    updateList: function(list) {
        this.setState({list: list});
    },
    removeListItem: function(itemId) {
        var list = this.state.list;
        delete list[itemId];
        this.updateList(list);
    },
    removeAllListItems: function() {
        this.updateList({});
    },
    render: function() {
        var items = this.state.list;
        return (
            <div className="row">
                <div className="col-sm-6">
                    <List items={items}
                        removeListItem={this.removeListItem}
                        removeAllListItems={this.removeAllListItems} />
                </div>
                <div className='col-sm-6'>
                    <AddListItem handleSubmit={this.addListItem} />
                </div>
            </div>
        )
    }
});

var items = [
    { id: 1, quantity: 10, name: "Milk Cartons", description: "Nadec milk - full fat" },
    { id: 2, quantity: 9, name: "Cartons", description: "Nadec fat" },
    { id: 3, quantity: 6, name: "MIlk", description: "Nadec full fat" },
    { id: 4, quantity: 2, name: "Tea", description: "Nadec milk full" }
];

var blank = function() {};

React.render(
    <List items={items} removeListItem={blank} removeAllListItems={blank} />,
    document.getElementById("app")
);
