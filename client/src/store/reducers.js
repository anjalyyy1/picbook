//reducers
import loginReducer from "pages/login/ducks/reducer";
import postReducer from "components/PostCreation/ducks/reducer";
import postListReducer from "pages/home/ducks/reducer";
import mypostListReducer from "pages/profile/ducks/reducer";

const allReducers = {
  ...loginReducer,
  ...postReducer,
  ...postListReducer,
  ...mypostListReducer
};

export default allReducers;
