
import { createApp } from 'apollo-mantra';

import initJss from './configs/jss';
import initContext from './configs/context';
import initAccounts from './configs/accounts';
import initSemantic from './configs/semantic-ui';

import Loading from './modules/core/components/loading_view';
import client from './configs/apollo';
import initRouter from './configs/router';

// import external styles
import 'sweetalert2/dist/sweetalert2.css';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

// init context
const context = initContext();

// create app and prepare context that will be injected in all other components
createApp(context, { loadingComponent: Loading, apolloClient: client, store: context.Store });

// init app
initJss();
initAccounts();
initSemantic();
initRouter(null, context);
