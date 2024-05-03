import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Loader from "../../Components/Loader.jsx";
import { toast } from "react-toastify";
import {
  useUpdateGroceryMutation,
  useGetGroceryByIdQuery,
} from "../../Redux/Slices/groceriesApiSlice.js";

const GroceryEditPage = () => {
  const { id } = useParams();
  const {
    data: grocery,
    isLoading: isLoadingGrocery,
    refetch,
    isLoading,
  } = useGetGroceryByIdQuery(id);
  const [updateGrocery, { isLoading: loadingUpdate, error }] =
    useUpdateGroceryMutation();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStockInKgs, setCountInStockInKgs] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (grocery) {
      setName(grocery.name);
      setPrice(grocery.price);
      setImage(grocery.image);
      setCountInStockInKgs(grocery.countInStockInKgs);
      setDescription(grocery.description);
    }
  }, [grocery]);

  // Remove these

  const [loadingUpload, setLoadingUpload] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(grocery);
    const updatedGrocery = await updateGrocery({
      name,
      price,
      image,
      countInStockInKgs,
      description,
      id,
    }).unwrap();
    if (updatedGrocery) {
      refetch();
      toast.success("Grocery updated successfully");
      navigate("/admin/grocerylist");
    } else {
      toast.error("Grocery not updated");
    }
  };

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "jsziq7di");
    let data = "";

    try {
      setLoadingUpload(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlxmlegln/image/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImage(data.secure_url);
          setLoadingUpload(false);
        });
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Container className="p-3">
        <Link to="/admin/grocerylist" className="btn btn-light  my-3">
          Go Back
        </Link>
        <Container>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>{error.data.message}</div>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => {
                    console.log(e.target.value);
                    console.log("grf");
                    setImage(e.target.value);
                  }}
                ></Form.Control>

                <Form.Control
                  label="Choose File"
                  onChange={uploadFileHandler}
                  type="file"
                ></Form.Control>

                {loadingUpload && <Loader />}
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter countInStock"
                  value={countInStockInKgs}
                  onChange={(e) => setCountInStockInKgs(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {uploading && <Loader />}
              <Button
                disabled={uploading}
                type="submit"
                variant="primary"
                style={{ marginTop: "1rem" }}
              >
                Update
              </Button>
            </Form>
          )}
        </Container>
      </Container>
    </>
  );
};

export default GroceryEditPage;
