import * as React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './layouts/containers/main_layout_container';

// Components
import HomePage from './home/containers/home_container';

import Practical from './practicals/practical_container';
import Exercise from './exercise/containers/exercise_container';
import ExerciseAdmin from './exercise/containers/exercise_edit_container';
import Marking from './marking/containers/marking_container';
import Marks from './marking/containers/marks_container';

const AppRoutes = ({ history }: any) => {
  // const MainLayoutCtx = injectDeps(MainLayout);
  return (
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomePage} />
        <Route path="practical/:name/:practicalId/:semesterId" component={Practical} />
        <Route path="exercise/:name/:exerciseId/:practicalId/:semesterId" component={Exercise} />
        <Route path="admin/exercise/:name/:exerciseId/:semesterId" component={ExerciseAdmin} />
        <Route path="marking/practical/:name/:practicalId/:semesterId" component={Marking} />
        <Route path="marking/:practicalName/:userName/:userId/:exerciseId/:practicalId/:semesterId" component={Marking} />
        <Route path="marks/:semesterName/:semesterId" component={Marks} />
      </Route>
    </Router>
  );
};

console.log('loading routes ...');

export default AppRoutes;
