import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Skeleton,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import BooksCard from "../../components/books";
import { useCallback, useEffect, useState } from "react";
import request from "../../server";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "7px",
  boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.5)",
  p: 4,
};

type Inputs = {
  name: string;
  cover: string;
  isbn: string;
  published: number;
  pages: number;
};

const BooksPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [btnId, setBtnId] = useState<string | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [addBtnLoading, setAddBtnLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [selected, setSelected] = useState<null | string>(null);
  const [search, setSearch] = useState("");

  // const [currentPage, setCurrentPage] = useState(1);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  // const pageSize = Math.ceil(data.length / 10);

  const handleOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = (event: any, reason: any) => {
    if (reason !== "backdropClick") {
      console.log(event);
      reset();
    }
    setSelected(null);
  };

  const closeModal = () => {
    setOpen(false);
    reset();
    setSelected(null);
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request.get("");
      setData(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const deleteBook = async (id: string) => {
    setBtnId(id);
    try {
      setBtnLoading(true);
      const { data } = await request.delete(`/${id}`);
      getData();
      toast.success(`${data?.name} delete`);
    } finally {
      setBtnLoading(false);
    }
  };

  const addBook: SubmitHandler<Inputs> = async (data) => {
    if (selected) {
      try {
        setAddBtnLoading(true);
        const {
          data: { name },
        } = await request.put(`${selected}`, data);
        toast.success(`Success edit:${name}`);
        getData();
        closeModal();
        window.location.reload();
      } finally {
        setAddBtnLoading(false);
      }
    } else {
      try {
        setAddBtnLoading(true);
        const {
          data: { name },
        } = await request.post("", data);
        toast.success(`Success added:${name}`);
        getData();
        closeModal();
        window.location.reload();
      } finally {
        setAddBtnLoading(false);
      }
    }
  };

  const editBook = async (id: string) => {
    setSelected(id);
    try {
      setEditLoading(true);
      const { data } = await request.get(`/${id}`);
      handleOpen();
      reset(data);
    } finally {
      setEditLoading(false);
    }
  };

  // const handlePageChange = (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ) => {
  //   setCurrentPage(value);
  // };

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    getData();
  };

  return (
    <Fragment>
      {editLoading && (
        <div className="w-full h-full fixed top-0 left-0 bg-black opacity-75 z-50">
          <div className="flex justify-center items-center mt-[50vh]">
            <div className="fas fa-circle-notch fa-spin fa-5x text-violet-600">
              <CircularProgress />
            </div>
          </div>
        </div>
      )}
      <div className="books">
        <div className="container">
          <div className="flex justify-center md:justify-between pt-5">
            <div className="flex-wrap md:flex items-center gap-10">
              <Link to="/">
                <img src="/logo.svg" alt="" />
              </Link>
              <div className="mt-5 w-full md:m-0 relative md:w-auto">
                <input
                  onChange={handleSearch}
                  value={search}
                  type="search"
                  className=" py-2 pl-12 pr-5 bg-white outline-none rounded-md"
                  placeholder="Search books..."
                />
                <img
                  src="/search-refraction.svg"
                  alt=""
                  className="absolute left-3 top-2"
                />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-5">
              <img
                width={30}
                className="cursor-pointer"
                src="/Frame 1.svg"
                alt=""
              />
              <img
                width={30}
                className="cursor-pointer"
                src="/user-image.svg"
                alt=""
              />
            </div>
          </div>
          <div className="book-title flex justify-between items-center  mt-10">
            <h1 className="text-3xl font-extrabold text-white">
              You’ve got{" "}
              <span className="text-[#6200ee]">
                {loading ? "..." : data.length} book
              </span>{" "}
            </h1>
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{ bgcolor: "#6200ee" }}
            >
              <span className="pr-2 text-xl">+</span> Create book
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10 mt-10 mr-16 md:m-5">
            {loading ? (
              <Fragment>
                <Box sx={{ width: 333 }}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton animation={false} />
                </Box>
                <Box sx={{ width: 333 }}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton animation={false} />
                </Box>
                <Box sx={{ width: 333 }}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton animation={false} />
                </Box>
                <Box sx={{ width: 333 }}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton animation={false} />
                </Box>
                <Box sx={{ width: 333 }}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton animation={false} />
                </Box>
                <Box sx={{ width: 333 }}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton animation={false} />
                </Box>
              </Fragment>
            ) : (
              data
                .filter((el: any) => {
                  return search.toLowerCase() === ""
                    ? el
                    : el.name.toLowerCase().includes(search);
                })
                .map((el: any) => (
                  <Fragment key={el.id}>
                    <BooksCard
                      btnLoading={btnLoading}
                      btnId={btnId}
                      deleteBook={deleteBook}
                      editBook={editBook}
                      {...el}
                    />
                  </Fragment>
                ))
            )}
          </div>
          {/* <div className="w-full m-auto flex justify-center">
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              count={pageSize}
              color="primary"
              size="large"
            />
          </div> */}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg ">Create book</h3>
            <img
              className="cursor-pointer"
              onClick={() => closeModal()}
              src="/close.svg"
              alt=""
            />
          </div>
          <form onSubmit={handleSubmit(addBook)}>
            <div className="mb-3">
              <TextField
                {...register("name")}
                className="w-full mb-3"
                label="Name"
                variant="outlined"
                required
              />
            </div>
            <div className="mb-3">
              <TextField
                className="w-full mb-3"
                label="Cover"
                {...register("cover")}
                variant="outlined"
                required
              />
            </div>
            <div className="mb-3">
              <TextField
                {...register("pages")}
                className="w-full mb-3"
                label="Pages"
                type="number"
                variant="outlined"
                required
              />
            </div>
            <div className="mb-3">
              <TextField
                {...register("published")}
                className="w-full mb-3"
                type="number"
                label="Published"
                variant="outlined"
                required
              />
            </div>
            <div className="mb-3">
              <TextField
                {...register("isbn")}
                className="w-full mb-3"
                label="Isbn"
                variant="outlined"
                required
              />
            </div>
            <LoadingButton
              sx={{ bgcolor: "#6200ee", width: "100%", mt: "10px" }}
              variant="contained"
              type="submit"
              loading={addBtnLoading}
            >
              {selected ? "Edit book" : "Add book"}
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default BooksPage;
