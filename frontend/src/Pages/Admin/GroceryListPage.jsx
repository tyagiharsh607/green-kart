import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader.jsx";
import {
  useGetGroceriesQuery,
  useDeleteGroceryMutation,
  useAddGroceryMutation,
} from "../../Redux/Slices/groceriesApiSlice.js";
import { toast } from "react-toastify";

const GroceryListPage = () => {
  const { data: groceries, isLoading, error, refetch } = useGetGroceriesQuery();
  const [deleteGrocery, { isLoading: isDeleting }] = useDeleteGroceryMutation();
  const [addGrocery, { isLoading: isAdding }] = useAddGroceryMutation();

  const addGroceryHandler = async () => {
    const grocery = {
      name: "Sample name",
      description: "Sample description",
      price: 0,
      image: "/images/sample.jpg",
      countInStockInKgs: 0,
    };
    const addedGrocery = await addGrocery(grocery).unwrap();
    if (addedGrocery) {
      refetch();
      toast.success("Grocery added successfully");
    } else {
      toast.error("Grocery not added");
    }
  };
  const deleteHandler = async (_id) => {
    const deletedGrocery = await deleteGrocery(_id).unwrap();
    console.log(deletedGrocery);
    if (deletedGrocery) {
      refetch();
      toast.success("Grocery deleted successfully");
    } else {
      toast.error("Grocery not deleted");
    }
  };
  return (
    <>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col>
            <h1>Groceries</h1>
          </Col>
          <Col className="text-end">
            <Button className="my-3" onClick={addGroceryHandler}>
              <FaPlus />
              Add Grocery
            </Button>
          </Col>
        </Row>

        {/* {loadingCreate && <Loader />}
      {loadingDelete && <Loader />} */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{error?.data?.message}</div>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>Count In Stock In Kgs</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {groceries.map((grocery) => (
                  <tr key={grocery._id}>
                    <td>{grocery._id}</td>
                    <td>{grocery.name}</td>
                    <td>${grocery.price}</td>
                    <td>{grocery.countInStockInKgs}</td>
                    <td>
                      <LinkContainer to={`/admin/grocery/${grocery._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(grocery._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
};

export default GroceryListPage;
