import { combineReducers } from 'redux';
import locationReducer from './location';
import initTabProgressReducer from 'components-common/step-tab/modules'
import agencyAuditStatusReducer from 'components-common/agency-status/modules'
import agencyCirculationLogReducer from 'components-common/circulation-log/modules'
import agencyAuditBaseInfoReducer from 'components-common/set-audit-base-info/modules'
import { AuditPopover } from 'zcy-common'

export const makeRootReducer = asyncReducers => combineReducers({
  location: locationReducer,
  tabProgress: initTabProgressReducer,
  agencyAuditStatus: agencyAuditStatusReducer,
  agencyCirculationLog: agencyCirculationLogReducer,
  agencyAuditInfo: AuditPopover.agencyAuditInfoReducer,
  agencyAuditBaseInfo: agencyAuditBaseInfoReducer,
  ...asyncReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
