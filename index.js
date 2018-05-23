import App from './App';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

App();

const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('rncourse', () => RNRedux);


