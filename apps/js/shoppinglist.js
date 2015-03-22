/* React components for Shopping list Item */
var Description = React.createClass({
    render: function () {
        return <div className="panel-body">{this.props.text}</div>
    }
});

var ListItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        handleRemoveListItem: React.PropTypes.func.isRequired
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
                {item.description.length > 0 ? <Description text={item.description} /> : ''}
                <div className="panel-footer">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <button className="btn btn-xs btn-default" type="submit">Remove</button>
                    </form>
                </div>
            </div>
        )
    }
});

/* React component for the list header */
var ListHeader = React.createClass({
    propTypes: {
        totalNumberOfItems: React.PropTypes.number.isRequired,
        removeAllListItems: React.PropTypes.func.isRequired
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.removeAllListItems();
    },
    render: function() {
        var totalItems = this.props.totalNumberOfItems;
        if (totalItems > 0) {
            return (
                <form onSubmit={this.handleSubmit} className="form-inline">
                {totalItems} {totalItems > 1 ? "items" : "item"}
                {' '}
                    <button type="submit" className="btn btn-xs btn-default">Remove All</button>
                </form>
            );
        }
        return ( <span>Shopping List</span> );
    }
});

/* React component for the empty list */
var EmptyList = React.createClass({
    render: function() {
        return <div>There are no items in your list</div>
    }
});

/**
 * React Component for the list
 * Note: items is an object and *NOT* an array
**/
var List = React.createClass({
    propTypes: {
        itemsObj: React.PropTypes.object.isRequired,
        removeListItem: React.PropTypes.func.isRequired,
        removeAllListItems: React.PropTypes.func.isRequired
    },
    getListOfItemIds: function() {
        return Object.keys(this.props.itemsObj);
    },
    totalItemCount: function() {
        var count = 0;
        var itemsObj = this.props.itemsObj;
        this.getListOfItemIds().forEach(function(itemId) {
            var item = itemsObj[itemId];
            count += parseInt(item.quantity, 10);
        });
        return count;
    },
    createListItems: function() {
        var itemsObj = this.props.itemsObj;
        return (
            this
                .getListOfItemIds()
                .map(function(itemId){
                    var item = itemsObj[itemId];
                    return (
                        <ListItem item={item}
                        key={item.id}
                        handleRemoveListItem={this.props.removeListItem}/>
                    );
                }.bind(this))
        );
    },
    render: function() {
        var listItemElements = this.createListItems();
        return (
            <div>
                <h3 className="page-header">
                    <ListHeader
                        totalNumberOfItems={this.totalItemCount()}
                        removeAllListItems={this.props.removeAllListItems} />
                </h3>
                <ul>{listItemElements.length > 0 ? listItemElements : <EmptyList />}</ul>
            </div>
        );
    }
});

/* React Component for the form */
var AddListItem = React.createClass({
    propTypes: {
        handleAddListItem: React.PropTypes.func
    },
    getRandomID: function() {
        return (
            Math.round(Math.random() * 100000)
        ).toString();
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var item = {
            id: this.getRandomID(),
            name: this.refs.name.getDOMNode().value.trim(),
            description: this.refs.description.getDOMNode().value.trim(),
            quantity: this.refs.quantity.getDOMNode().value
        };
        this.props.handleAddListItem(item);
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3 className="page-header">Add New Item</h3>

                <div className="form-group">
                    <label htmlFor="listItemName">Name</label>
                    <input type="text" className="form-control"
                        id="listItemName" placeholder="Enter name" required ref="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="listItemDescription">Description</label>
                    <input type="text" className="form-control"
                        id="listItemDescription" placeholder="Enter description" required ref="description" />
                </div>

                <div className="form-group">
                    <label htmlFor="listItemQuantity">Quantity</label>
                    <div className="row">
                        <div className="col-xs-5 col-sm-6 col-md-4">
                            <input type="number" min="1" max="9999" step="1" defaultValue="1"
                                className="form-control" id="listItemQuantity" required ref="quantity" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Add to list</button>
                <button type="reset" className='btn btn-default'>Cancel</button>
            </form>
        );
    }
});

/* Top Level Component for Shopping List */
var ShoppingList = React.createClass({
    getInitialState: function() {
        return { list: {} };
    },
    updateList: function(list) {
        this.setState({list: list});
    },
    updateListItem: function(item) {
        var list = this.state.list;
        list[item.id] = item;
        this.updateList(list);
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
        var itemsObj = this.state.list;
        return (
            <div className="row">
                <div className="col-sm-6">
                    <List
                        itemsObj={itemsObj}
                        removeListitem={this.removeListItem}
                        removeAllListItems={this.removeAllListItems} />
                </div>
                <div className="col-sm-6">
                    <AddListItem handleAddListItem={this.updateListItem} />
                </div>
            </div>
        )
    }
});

React.render(
    <ShoppingList />,
    document.getElementById("app")
);
