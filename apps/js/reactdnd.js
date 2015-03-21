var DRAG_DROP_CONTENT_TYPE = "custom_container_type",
    ALLOWED_DROP_EFFECT = "move",
    HOVER_KEY = -1,
    NO_HOVER  = -1,
    NONE_SELECTED = -1;

/* CSS styles */
var styles = {
    container: {
        maxWidth: 550,
        background: '#cdc',
        border: '1 px #777',
        listStyle: 'none',
        margin: 0,
        padding: 2
    },
    item: {
        backgroundColor: '#df90df',
        margin: 3,
        padding: 3
    }
};

var TextTemplate = React.createClass({
    propTypes: {
        item: React.PropTypes.any.isRequired
    },
    render: function() {
        return <span>{this.props.item}</span>
    }
});

var Container = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired,
        itemTemplate: React.PropTypes.func,
    },
    getDefaultProps: function() {
        return {
            items: [],
            itemTemplate: TextTemplate
        }
    },
    getInitialState: function() {
        return {
            items: this.props.items
        }
    },
    renderListElement: function(item, key) {
        return (
            <li key={key}
                style={styles.item}
                draggable={true}>{item}</li>
        )
    },
    onDragStart: function(e) {
        var selectedIndex = parseInt(e.currentTarget.dataset.key);
        e.dataTransfer.effectAllowed = ALLOWED_DROP_EFFECT;
        e.dataTransfer.setData(DRAG_DROP_CONTENT_TYPE,
            this.state.items[selectedIndex]
        );
        this.setState({selected: selectedIndex});
    },
    render: function() {
        var items = this.state.items.map(this.renderListElement);
        return (
            <ul ref="container" style={styles.container}>
                {items}
            </ul>
        )
    }
});

React.render(<Container />, document.getElementById('app'));