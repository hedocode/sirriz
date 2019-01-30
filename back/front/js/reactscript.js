var ReactDOM = require('react-dom');

class ShoppingList extends React.Component {
    render() {
      return (
        <div className="shopping-list">
          <h1>500</h1>
          <p>{this.props.error}</p>
        </div>
      );
    }
}

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <div><h1>500</h1><Welcome name="Sara" /><p>{err}</p><a href="./">If you want us to bring you back home click here.</a></div>;


ReactDOM.render(element, document.getElementById('root'));

