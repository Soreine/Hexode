export default React.createClass({
    update: (e) => this.setState(e.value),
    getInitialState: () => "",
    render: () => (
        <input type="text" value=this.state onChange=this.update />
    )
});
