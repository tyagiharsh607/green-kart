import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../Components/Loader.jsx";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../Redux/Slices/usersApiSlice.js";
import { toast } from "react-toastify";

const UserListPage = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const deleteHandler = async (_id) => {
    const user = await deleteUser(_id).unwrap();
    if (user) {
      refetch();
      toast.success("User deleted successfully");
    } else {
      toast.error("User not deleted");
    }
  };
  return (
    <>
      <Container className="py-5">
        <h1>Users</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{error?.data?.message || error.error}</div>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {!user.isAdmin && (
                      <>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash style={{ color: "white" }} />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default UserListPage;
