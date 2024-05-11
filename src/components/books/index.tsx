import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const BooksCard = ({
  name,
  cover,
  pages,
  isbn,
  published,
  deleteBook,
  id,
  btnId,
  btnLoading,
  editBook,
}: any) => {
  return (
    <Fragment>
      <div className="book-card bg-white shadow-lg rounded-lg p-5 w-full md:w-[333px] cursor-pointer relative">
        <h3 className="font-semibold text-[#151515] mb-2">{name}</h3>
        <p className="text-[#333333] text-sm ">
          Cover:{" "}
          <Link className="text-blue-400" to={cover}>
            {cover.slice(0, 40)}...
          </Link>{" "}
        </p>
        <p className="text-[#333333] text-sm ">
          Pages: <span>{pages}</span>
        </p>
        <p className="text-[#333333] text-sm ">
          Published: <span className="">{published}</span>
        </p>
        <p className="text-[#333333] text-sm ">
          Isbn: <span>{isbn}</span>
        </p>
        <p className="text-[#333333] text-sm mt-4">Eben Upton / {published}</p>
        <div className="actions top-5 right-0 absolute">
          <div
            onClick={() => deleteBook(id)}
            className="bg-[#ff4d4f] rounded-lg p-3 w-10 mb-1"
          >
            {btnLoading && btnId === id ? (
              <CircularProgress style={{ width: "20px", height: "20px" }} />
            ) : (
              <img src="/delete.svg" alt="" />
            )}
          </div>
          <div
            onClick={() => editBook(id)}
            className="bg-[#6200ee] rounded-lg p-3 w-10"
          >
            <img src="/edit.svg" alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BooksCard;
