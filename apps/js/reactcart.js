function formatPrice(price) {
    return "$ " + price.toFixed(2);
}

var Product = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        handleDragStart: React.PropTypes.func.isRequired
    },
    render: function() {
        var item = this.props.item;
        return (
            <li className='product'
                data-item={item.id}
                draggable="true"
                onDragStart={this.props.handleDragStart}>
                <p>{item.title}</p>
                <span>$ {item.price} </span>
            </li>
        )
    }
});

var DropZone = React.createClass({
    propTypes: {
        handleDrop: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            borderWidth: 1
        }
    },
    handleDragEnter: function(e) {
        this.setState({ borderWidth: 2 });
    },
    handleDragLeave: function(e) {
        this.setState({ borderWidth: 1 });
    },
    handleDragOver: function(e) {
        if (e.preventDefault) {
            e.preventDefault(); // allows us to drop
        }
        e.dataTransfer.dropEffect = 'copy';
    },
    render: function() {
        var style = {
            width: "100%",
            height: "80",
            border: this.state.borderWidth + "px dashed black"
        };
        return <div style={style}
            onDragOver={this.handleDragOver}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDrop={this.props.handleDrop}></div>
    }
});

var CartItem = React.createClass({
    render: function() {
        var item = this.props.item;
        return <tr>
            <td>{item.title}</td>
            <td>{item.qty}</td>
            <td>{formatPrice(item.price)}</td>
        </tr>
    }
});

var Cart = React.createClass({
    propTypes: {
        handleAddToCart: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            items: []
        }
    },
    getInitialState: function() {
        return {
            items: this.props.items,
        }
    },
    showBlankMessage: function() {
        return <p>No items in cart</p>
    },
    getCartTotal: function() {
        var total = _.reduce(this.props.items, function(accum, item) {
            return accum + (item.qty * item.price);
        }, 0);

        return formatPrice(total);
    },
    renderItems: function() {
        var items = this.state.items;
        return (
            <div>
                <h5>Total {this.getCartTotal()} </h5>
                <table className='u-full-width'>
                    <thead>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                    </tbody>
                {items.map(function(item) {
                    return <CartItem key={item.id} item={item} />
                })}
                </table>
            </div>
        )
    },
    render: function() {
        var items = this.state.items,
            createItems = this.renderItems();
        return (
            <div>
                <h3>Cart</h3>
            { items.length > 0 ? createItems : this.showBlankMessage() }
            </div>
        )
    }
});

var App = React.createClass({
    propTypes: {
        products: React.PropTypes.array
    },
    getInitialState: function() {
        return {
            itemsInCart: []
        }
    },
    updateCart: function(items) {
        this.setState({ itemsInCart: items });
    },
    addItemToCart: function(item) {
        var items = this.state.itemsInCart;
        var existingItem = _.find(items, function(i) {
            return i.id == item.id;
        });

        if (existingItem) {                 // item already exists
            existingItem.qty = existingItem.qty + 1
        } else {                            // push new item
            items.push({
                title: item.title,
                qty: 1,
                price: item.price,
                id: item.id
            })
        }
        this.updateCart(items);
    },
    handleDrop: function(e) {
        // unhighlight the dropzone
        e.target.style.borderWidth = "1px";
        e.stopPropagation();

        var products = this.props.products,
            item = null,
            itemId = e.dataTransfer.getData('text/plain');

        // retrieve the item
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == itemId) {
                item = products[i];
            }
        }
        this.addItemToCart(item);
    },
    handleDragStart: function(e) {
        var target = e.target;
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', target.dataset.item);
    },
    render: function() {
        var items = this.props.products;
        return (
            <div className="row">
                <div className="seven columns">
                    <h5>Products</h5>
                    <ul>{items.map(function(item) {
                                return <Product key={item.id}
                                    item={item}
                                    handleDragStart={this.handleDragStart}
                                />}.bind(this))}</ul>
                </div>
                <div className="five columns">
                    <small>Drag an element to add to cart</small>
                    <DropZone handleDrop={this.handleDrop}/>
                    <Cart items={this.state.itemsInCart}/>
                </div>
            </div>
        )
    }
});

React.render(
    <App products={products} />,
    document.getElementById('app')
);