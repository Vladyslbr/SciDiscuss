import React from "react";
import debounce from "debounce";

import { useAppDispatch } from "../redux/store";
import { setUrlParams } from "../redux/filter/filterSlice";

export default function HeaderSearch() {
    const dispatch = useAppDispatch();
 
    const searchRef = React.useRef<HTMLInputElement>(null);
 
    const [searchInput, setSearchInput] = React.useState<string>("");
 
    const cleanResults = () => {
       (document.activeElement as HTMLElement).blur();
       dispatch(setUrlParams({ searchValue: "" }));
       setSearchInput("");
    };
    
 
    //eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearchValue = React.useCallback(
    debounce((val: string) => {
            dispatch(setUrlParams({ searchValue: val }));
        }, 250),
    [],);
 
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
       setSearchInput(event.target.value);
       debounceSearchValue(event.target.value);
    };

    React.useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            const isInputElement = (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable
            );
    
        if (event.key === "/" && !isInputElement) {
                event.preventDefault();
                searchRef.current?.focus();
            }
        };
    
        document.addEventListener("keydown", handleKeyPress);
    
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
      }, []);

   return (
        <button className="search">
            <div className="search-icon-search">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.02023 8.55951C5.02023 10.2619 5.6965 11.8945 6.90026 13.0983C8.10403 14.3021 9.73669 14.9783 11.4391 14.9783C13.1414 14.9783 14.7741 14.3021 15.9779 13.0983C17.1816 11.8945 17.8579 10.2619 17.8579 8.55951C17.8579 6.85713 17.1816 5.22447 15.9779 4.0207C14.7741 2.81694 13.1414 2.14067 11.4391 2.14067C9.73669 2.14067 8.10403 2.81694 6.90026 4.0207C5.6965 5.22447 5.02023 6.85713 5.02023 8.55951ZM6.19014 15.3222C7.91024 16.6576 10.0746 17.2872 12.2426 17.083C14.4106 16.8787 16.4193 15.8559 17.8597 14.2227C19.3001 12.5896 20.064 10.4689 19.9958 8.29235C19.9276 6.11582 19.0325 4.04707 17.4927 2.50727C15.9529 0.967473 13.8842 0.072375 11.7076 0.00420024C9.53111 -0.0639746 7.4104 0.699899 5.77725 2.14031C4.14411 3.58073 3.12129 5.5894 2.91704 7.7574C2.71278 9.92541 3.34243 12.0898 4.67782 13.8099L0.340572 18.1471C0.235443 18.2451 0.151119 18.3632 0.0926342 18.4945C0.0341511 18.6257 0.00270271 18.7674 0.000167847 18.9111C-0.00236702 19.0548 0.0240631 19.1975 0.0778809 19.3307C0.131697 19.4639 0.211802 19.585 0.313412 19.6866C0.41502 19.7882 0.536055 19.8683 0.669292 19.9221C0.802532 19.9759 0.945246 20.0024 1.08892 19.9998C1.2326 19.9973 1.37429 19.9658 1.50555 19.9074C1.63681 19.8489 1.75494 19.7646 1.8529 19.6594L6.19014 15.3222Z"
                    fill="#6A6A6A"
                    />
                </svg>
            </div>
            <input
                className="search-input"
                ref={searchRef}
                onChange={handleSearch}
                value={searchInput}
                name="search"
                placeholder="Search..."
            />
            <div className="search-icon-pressToSearch">
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                    x="0.5"
                    y="0.5"
                    width="19"
                    height="19"
                    rx="3.5"
                    stroke="#DDDDDD"
                    />
                    <path
                    d="M7.30234 15.32L11.5623 4.04H12.7023L8.44234 15.32H7.30234Z"
                    fill="#6A6A6A"
                    />
                </svg>
            </div>
            <div onClick={cleanResults} className="search-icon-closeSearch">
               <svg
                  width="11"
                  height="12"
                  viewBox="0 0 11 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M10.531 9.94855L6.91119 5.99999L10.531 2.05143C10.9218 1.62513 11.2523 1.35426 10.531 0.512516C9.75935 -0.387911 9.51101 0.0862159 9.12021 0.512516L5.50041 4.46108L1.88062 0.512516C1.48981 0.0862159 1.24147 -0.387903 0.469842 0.512516C-0.355612 1.35426 0.0790371 1.62513 0.469842 2.05143L4.08964 5.99999L0.469842 9.94855C0.0790371 10.3749 -0.355612 10.6458 0.469842 11.4875C1.2415 12.3879 1.48981 11.9138 1.88062 11.4875L5.50041 7.5389L9.12021 11.4875C9.51101 11.9138 9.75938 12.3879 10.531 11.4875C11.3565 10.6458 10.919 10.3718 10.531 9.94855Z"
                     fill="white"
                  />
               </svg>
            </div>
        </button>
   );
}
