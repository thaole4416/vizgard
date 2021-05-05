import { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import DatasetsView from '../views/Datasets';
import DatasetView from '../views/Dataset';
import HomeView from '../views/Home';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function AppRouter(): ReactElement {
    return (
      <Router>
        <Header/>
        <Switch>
          <Route path="/datasets" component={DatasetsView}/>
          <Route path="/dataset" component={DatasetView}/>
          <Route path="/" component={HomeView}/>
          <Redirect to="/"/>
        </Switch>
        <Footer/>
      </Router>
    );
}
