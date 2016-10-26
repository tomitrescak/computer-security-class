import initStore from './store';
import { query, mutation } from 'apollo-mantra';
import { UiUtils, RouterUtils, ClassUtils } from '../helpers/helpers_client';
import * as ReduxBinding from '../helpers/redux_binding';

import { mutationWithFeedback, addInsertData, addModificationData } from '../helpers/apollo_helpers';
import gql from 'graphql-tag';

// put it in the global scope for now
global['gql'] = gql;

// import classnames from 'classnames';
// import beautify from "js-beautify";
// import StringUtils from "../../common/utils/string_utils";

const binder: any = ReduxBinding.createBinder(initStore());
const Utils = {
  Ui: UiUtils,
  Router: RouterUtils,
  Class: ClassUtils,
  Binding: binder
  //  Css: classnames,
  //  String: StringUtils,
  //  Beautify: beautify
};

const Apollo = {
  query,
  mutation,
  mutationWithFeedback,
  addModificationData,
  addInsertData
};

let context: Cs.IContext;

export default function initContext() {
  if (!context) {
    context = {
      Store: initStore(),
      Utils,
      Apollo
    };
  }
  return context;
}

// global type defintions

declare global {
  namespace Cs {
    export interface IContext {
      Store?: IStore;
      Utils: typeof Utils;
      Apollo: typeof Apollo;
    }

    export interface IContainerContext {
      (): IContext;
    }

    export interface IComponentContext {
      context: IContext;
    }
  }
}
