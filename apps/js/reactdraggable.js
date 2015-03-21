var Draggable = React.createClass({
    render: function() {

    }
});

var SourceObject = React.createClass({
    dragData: function() {
        return {
            type: this.props.type,
            index: this.props.index
        }
    },
    render: function() {
        return (
            <Draggable
                className='dnd-source-object'
                children={this.props.children}
                onDragStart={this.props.onDragStart}
                onDragStop={this.props.onDragStop}
                dragData={this.dragData}/>
        )
    }
});

var SourceObjects = React.createClass({
    propTypes: {
        onDragStart: React.PropTypes.func.isRequired,
        onDragStop: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <div className='dnd-source-objects'>

            </div>
        )
    }
});

var DropTargets = React.createClass({
    render: function() {
        return <div />
    }
});

var Example = React.createClass({
    getInitialState: function() {
        return {
            currentDragItem: null
        };
    },
    render: function() {
        return (
            <div>
                <SourceObjects
                    onDragStart={this.onDragStart}
                    onDragStop={this.onDragStop} />
                <DropTargets
                    currentDragItem={this.state.currentDragItem}
                    onDrop={this.onDrop} />
            </div>
        )
    },
    onDragStart: function(details) {
    },
    onDragStop: function() {
    },
    onDrop: function() {
    }
});