var App = React.createClass({
    render: function() {
        return (
            <div>Hello React!</div>
        );
    }
});

$(function() {
    React.render(
        <App />,
        document.getElementById('app')
    );
})
