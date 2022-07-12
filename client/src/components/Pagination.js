/*
Displays pagination 
This is a child of the UserList component 
*/
import { Pagination as BSPagination  } from "react-bootstrap";
import "../css/Pagination.css";

const Pagination = ({userCount, page, perPage, setPage}) => {

  return(
    <BSPagination className="justify-content-center pt-5">
      {[...Array(Math.ceil(userCount /perPage))].map((x, i) => {
        let humanIndex = i + 1;
        return (
          <BSPagination.Item
            key={i}
            active={i === page}
            onClick={(e) => {setPage(i)}}
          >
            {humanIndex}
          </BSPagination.Item>
        );
      })}
    </BSPagination>
  );
};

export default Pagination;
