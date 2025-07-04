import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageClubDetails = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");
  const [clubDetail, setClubDetail] = useState({
    description: "",
    logo: "",
    images: "",
    coordinator: "",
  });
  const [enrolledMembers, setEnrolledMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchClubs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClubs(res.data);
    } catch (err) {
      console.error("[FETCH CLUBS ERROR]", err);
      toast.error("Failed to fetch clubs");
    }
  };

  const fetchClubDetail = async (clubId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/club-details/${clubId}`
      );
      const { admin, members } = res.data;
      setClubDetail({
        description: admin?.description || "",
        logo: admin?.logo || "",
        images: admin?.images?.join(", ") || "",
        coordinator: admin?.coordinator?._id || "",
      });
      setEnrolledMembers(members || []);
    } catch {
      console.error("[FETCH CLUB DETAIL ERROR]", err);
      setClubDetail({ description: "", logo: "", images: "", coordinator: "" });
      setEnrolledMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleEditClick = (clubId) => {
    setSelectedClub(clubId);
    fetchClubDetail(clubId);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/club-details/${selectedClub}`,
        {
          description: clubDetail.description,
          logo: clubDetail.logo,
          images: clubDetail.images.split(",").map((img) => img.trim()),
          coordinator: clubDetail.coordinator,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Club details saved");
      setShowModal(false);
    } catch (err) {
      console.error("[SAVE CLUB DETAIL ERROR]", err);
      toast.error("Failed to save club details");
    }
  };

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th>Club Name</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club._id}>
                <td>{club.name}</td>
                <td>{club.categories.join(", ")}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditClick(club._id)}
                  >
                    Manage Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Manage Details for {clubs.find((c) => c._id === selectedClub)?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="d-flex justify-content-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>New Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={clubDetail.description}
                  onChange={(e) =>
                    setClubDetail({
                      ...clubDetail,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter club description"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Logo URL</Form.Label>
                <Form.Control
                  type="text"
                  value={clubDetail.logo}
                  onChange={(e) =>
                    setClubDetail({ ...clubDetail, logo: e.target.value })
                  }
                  placeholder="Enter logo URL"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gallery Images (comma-separated URLs)</Form.Label>
                <Form.Control
                  type="text"
                  value={clubDetail.images}
                  onChange={(e) =>
                    setClubDetail({ ...clubDetail, images: e.target.value })
                  }
                  placeholder="Enter image URLs separated by commas"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Select Coordinator
                </Form.Label>
                <Form.Select
                  value={clubDetail.coordinator}
                  onChange={(e) =>
                    setClubDetail({
                      ...clubDetail,
                      coordinator: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select Coordinator --</option>
                  {enrolledMembers.length > 0 ? (
                    enrolledMembers.map((member) => (
                      <option
                        key={member.student._id}
                        value={member.student._id}
                      >
                        {member.student.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No enrolled members available</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageClubDetails;
