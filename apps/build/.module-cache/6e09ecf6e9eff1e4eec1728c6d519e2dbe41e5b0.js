/* A React Component for a simple color picker */

var NumInput = React.createClass({displayName: "NumInput",
    propTypes: {
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        step: React.PropTypes.number,
        val: React.PropTypes.number,
        update: React.PropTypes.func.isRequired,
        type: React.PropTypes.oneOf(['number', 'range'])
    },
    getDefaultProps: function() {
        return {
            min: null,
            max: null,
            step: 1,
            val: 0,
            type: 'range'
        }
    },
    render: function() {
        return (
            React.createElement("input", {
                type: this.props.type, 
                min: this.props.min, 
                max: this.props.max, 
                step: this.props.step, 
                defaultValue: this.props.val, 
                onChange: this.props.update}
            )
        )
    }
});

var ColorWidget = React.createClass({displayName: "ColorWidget",
    getInitialState: function() {
        return {
            red: 0, green: 0, blue: 0
        }
    },
    rgbToHex: function() {
        var colors = ['red', 'green', 'blue'].map(function (c) {
            var hex = (parseInt(this.state[c], 10)).toString(16);
            if (hex.length < 2)  return "0" + hex;
            return hex;
        }, this);
        return '#' + colors.join('')
    },
    update: function() {
        this.setState({
            red: this.refs.red.getDOMNode().value,
            green: this.refs.green.getDOMNode().value,
            blue: this.refs.blue.getDOMNode().value
        })
    },
    render: function() {
        var bgColor = {
            background: this.rgbToHex(),
            width: '100px',
            height: '30px'
        };
        return (
            React.createElement("div", null, 
                React.createElement("h5", null, this.rgbToHex()), 
                React.createElement("div", {style: bgColor}), 
                React.createElement("table", null, 
                    React.createElement("thead", null, 
                        React.createElement("tr", null, " ", React.createElement("th", null, "Color"), " ", React.createElement("th", null, "Value"), " ", React.createElement("th", null, "Slider"), " ")
                    ), 
                    React.createElement("tbody", null, 
                        React.createElement("tr", null, 
                            React.createElement("td", null, "Red"), 
                            React.createElement("td", null, this.state.red), 
                            React.createElement("td", null, React.createElement(NumInput, {val: this.state.red, ref: "red", min: 0, max: 255, update: this.update}))
                        ), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, "Green"), 
                            React.createElement("td", null, this.state.green), 
                            React.createElement("td", null, React.createElement(NumInput, {val: this.state.green, ref: "green", min: 0, max: 255, update: this.update}))
                        ), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, "Blue"), 
                            React.createElement("td", null, this.state.blue), 
                            React.createElement("td", null, React.createElement(NumInput, {val: this.state.blue, ref: "blue", min: 0, max: 255, update: this.update}))
                        )
                    )
                )
            )
        )
    }
});

// loading it for now
React.render(
    React.createElement(ColorWidget, null), document.getElementById("colorApp")
);
