var ToolBox = React.createClass({
    render: function() {
        return (
            <div className='toolbox'>
                <h2>Toolbox</h2>
                <Block />
            </div>
        )
    }
});

var Block = React.createClass({
    getInitialState: function() {
        return {
            id: 0
        }
    },
    render: function() {
        return (
            <div draggable={true} className='block'>
                <span>Block</span>
                <h4>id {this.state.id}</h4>
            </div>
        )
    }
});

var DropZone = React.createClass({
    render: function() {
        return (
            <div>DropZone</div>
        )
    }
});


var Pallet = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Pallet</h1>
                <DropZone />
            </div>
        )
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="eight columns">
                    <Pallet />
                </div>
                <div className="four columns">
                    <ToolBox />
                </div>
            </div>
        )
    }
});

React.render(<App />, document.getElementById('app'));
