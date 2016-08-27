import { query, mutation, IQuery } from 'apollo-mantra';
import context from '../configs/context';

export function addModificationData(obj: any) {
  const user = context().Store.getState().accounts.user;
  if (!user) {
    throw new Error('Only user can perform updates!');
  }
  obj.updatedAt = new Date();
  obj.updatedById = user._id;
  obj.updatedBy = user.profile.name;
  return obj;
}

export function addInsertData(obj: any) {
  const user = context().Store.getState().accounts.user;
  if (!user) {
    throw new Error('Only user can perform updates!');
  }
  obj.createdAt = new Date();
  obj.createdById = user._id;
  obj.createdBy = user.profile.name;
  addModificationData(obj);
  return obj;
}

export function mutationWithFeedback(mut: IQuery, update = true) {
  // add visual error callback
  if (!mut.errorCallback) {
    mut.errorCallback = (errors: any) => {
      console.error(errors);
      context().Utils.Ui.alertError('saveError', JSON.stringify(errors));
    };
  }

  // add visual success callback
  if (!mut.thenCallback) {
    mut.thenCallback = () => {
      context().Utils.Ui.alert('saved');
    };
  }

  if (update) {
    for (let p in mut.variables) {
      addModificationData(mut.variables[p]);
    }
  }

  return mutation(mut);
}
