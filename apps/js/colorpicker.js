/* A React Component for a simple color picker */

var NumInput = React.createClass({
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
            <input
                type={this.props.type}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                defaultValue={this.props.val}
                onChange={this.props.update}
            />
        )
    }
});

var ColorWidget = React.createClass({
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
            <div>
                <h5>{this.rgbToHex()}</h5>
                <div style={bgColor}></div>
                <table>
                    <thead>
                        <tr> <th>Color</th> <th>Value</th> <th>Slider</th> </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Red</td>
                            <td>{this.state.red}</td>
                            <td><NumInput val={this.state.red} ref="red" min={0} max={255} update={this.update} /></td>
                        </tr>
                        <tr>
                            <td>Green</td>
                            <td>{this.state.green}</td>
                            <td><NumInput val={this.state.green} ref="green" min={0} max={255} update={this.update} /></td>
                        </tr>
                        <tr>
                            <td>Blue</td>
                            <td>{this.state.blue}</td>
                            <td><NumInput val={this.state.blue} ref="blue" min={0} max={255} update={this.update} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
});

// loading it for now
React.render(
    <ColorWidget />, document.getElementById("colorApp")
);
