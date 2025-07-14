import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data);
    } catch {
      toast.error("Failed to fetch student data");
    }
  };

  // Calculate pagination data
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = students.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered mt-3">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Year</th>
              <th>Enrolled Clubs & Categories</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={student._id}>
                <td>{startIndex + index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>
                  {student.enrolledClubs.length > 0 ? (
                    <ul className="mb-0 ps-3">
                      {student.enrolledClubs.map((enrolled, idx) => (
                        <li key={`${enrolled.club?._id}-${idx}`}>
                          <strong>
                            {enrolled.club?.name || "Unknown Club"}
                          </strong>
                          <br />
                          <small className="text-muted">
                            Category: {enrolled.category || "N/A"}
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted">None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &laquo; Previous
        </button>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next &raquo;
        </button>
      </div>
    </>
  );
};

export default ManageStudents;
