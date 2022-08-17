import ReactDOM from 'react-dom';

import App from './components/App';

function Root() {
    return (
        <App />
    );
}
const elemento = document.querySelector(".root");
ReactDOM.render(<Root />, elemento);