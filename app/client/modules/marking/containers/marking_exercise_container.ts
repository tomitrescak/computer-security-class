import { reduxForm } from 'redux-form';
import MarkingExerciseView from '../components/marking_exercise_view';

const ExerciseMarkingForm = reduxForm({
  form: 'exerciseMarkingForm',
  enableReinitialize: true
})(<any> MarkingExerciseView);

export default ExerciseMarkingForm;
