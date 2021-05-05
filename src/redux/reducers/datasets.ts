import { DataSet } from '../../models/dataset';
import { DataSetState } from '../../models/reduxStore';
import { DatasetsActions, DataSetsActionTypes } from '../actions/datasets';

const initialState: DataSet[] = [];

export default function(
  state: DataSetState,
  action: DatasetsActions,
): DataSetState {
  switch (action.type) {
    case DataSetsActionTypes.CREATE_DATASET: {
      return [...state, action.payload];
    }
    case DataSetsActionTypes.UPDATE_DATASET: {
      const newState = [...state];
      const { id, images } = action.payload;
      newState[id].images = images;
      return newState;
    }
    case DataSetsActionTypes.ADD_IMAGES: {
      const newState = [...state];
      const { id, images } = action.payload;
      newState[id].images = [...newState[id].images, ...images];
      return newState;
    }
    case DataSetsActionTypes.RENAME_DATASET: {
      const { index, name } = action.payload;
      const newState = state.map((ds, i) => {
        if (i === index) {
          return {
            ...ds,
            name,
          };
        }
        return ds;
      });
      return newState;
    }
    case DataSetsActionTypes.DELETE_DATASET: {
      return [...state.filter((_, i) => i !== action.payload)];
    }
    default:
      return initialState;
  }
}
