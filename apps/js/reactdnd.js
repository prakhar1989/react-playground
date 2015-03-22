var ItemTypes = {
    ITEM: 'item'
};

// ITEM Component
var Item = React.createClass({
    mixins: [ReactDND.DragDropMixin],
    statics: {
        configureDragDrop: function(register) {
            register(ItemTypes.ITEM, {
                dragSource: {
                    beginDrag: function(component) {
                        return {
                            item: {
                                name: component.props.name
                            }
                        };
                    }
                }
            });
        }
    },
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    render: function() {
        var style = {
            border: '1px dashed gray',
            backgroundColor: 'white',
            padding: '0.5rem',
            margin: '0.5rem',
            maxWidth: 80
        };

        //var isDragging = this.getDragState(ItemTypes.ITEM).isDragging;
        var isDragging = this.getDragState(ItemTypes.ITEM).isDragging;
        style.opacity = isDragging ? 0.4 : 1;

        return (
            <div {...this.dragSourceFor(ItemTypes.ITEM)}
                style={style}>
            {this.props.name}
            </div>
        )
    }
});

// DUSTBIN component
var Dustbin = React.createClass({
    mixins: [ReactDND.DragDropMixin],
    statics: {
        configureDragDrop: function(register) {
            register(ItemTypes.ITEM, {
                dropTarget: {
                    acceptDrop: function(component, item) {
                        window.alert('You dropped ' + item.name + '!');
                    }
                }
            })
        }
    },
    render: function() {
        var style = {
            height: '12rem',
            width: '12rem',
            color: 'white',
            padding: '2rem',
            textAlign: 'center'
        };

        var dropState = this.getDropState(ItemTypes.ITEM),
            backgroundColor = '#222';

        if (dropState.isHovering) {
            backgroundColor = 'darkgreen';
        } else if (dropState.isDragging) {
            backgroundColor = 'darkkhaki';
        }
        style.backgroundColor = backgroundColor;

        return (
            <div {...this.dropTargetFor(ItemTypes.ITEM)}
                style={style}>
            {dropState.isHovering ? 'Release to drop' : 'Drag item here'}
            </div>
        )
    }
});

var Container = React.createClass({
    render: function() {
        return (
            <div>
                <Dustbin />
                <div>
                    <Item name='Glass' />
                    <Item name='Paper' />
                    <Item name='Banana' />
                </div>
            </div>
        )
    }
});

React.render(
    <Container />,
    document.getElementById('app')
);

