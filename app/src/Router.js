import { Route, Switch } from "react-router-dom";
import sendPost from "./pages/sendPost";
import postOverview from "./pages/postOverview";

function Router() {
  return (
    <div className='Router'>
      <header className='App-header'>
        <h1>Nav</h1>
      </header>
      <main>
        <Switch>
          <Route path='/send' component={sendPost} />
          <Route path='/' component={postOverview} />
        </Switch>
      </main>
    </div>
  );
}

export default Router;
