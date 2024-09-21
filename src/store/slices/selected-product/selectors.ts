import { RootState } from "../../store";

export const getSelectedItem = (state: RootState) => {
  return state.selectedItem;
};
