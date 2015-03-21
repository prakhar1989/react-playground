var React = require('react');

var HelloComponent = React.createClass({
    render: function() {
        return (
            <h1>Helo man</h1>
        );
    }
});

React.render(<HelloComponent />, document.body);
