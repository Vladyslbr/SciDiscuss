import { SortItemType } from "../types";

type MakeUrlType = {
   sort?: SortItemType;
   searchValue?: string | null;
};

export const makeUrl = ({sort, searchValue}: MakeUrlType) => {
   let newURL;
   newURL = `_`;
   newURL = sort ? newURL + `sort=${sort.sortProp1}&_order=${sort.sortProp2}` : newURL;
   newURL = searchValue ? 
   (sort 
      ? newURL + `&text_like=${searchValue.toLowerCase()}` 
      : newURL + `text_like=${searchValue.toLowerCase()}`
   )
   : newURL;

   newURL = (!sort && ! searchValue) ? "" : newURL;

   return newURL;
};