import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ManageEvents.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); 
  const [formData, setFormData] = useState({ name: "", date: "" });
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error("[FETCH EVENTS ERROR]", err);
      setLoading(false);
    }
  };

  const handleCreateOrUpdateEvent = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingEvent) {
        // update existing event
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/events/${editingEvent._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Event updated successfully!");
      } else {
        // create new event
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/events`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Event created successfully!");
      }
      setShowModal(false);
      setFormData({ name: "", date: "" });
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      console.error("[SAVE EVENT ERROR]", err);
      toast.error("Failed to save event!");
    }
    setSaving(false);
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error("[DELETE EVENT ERROR]", err);
      toast.error("Failed to delete event!");
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({ name: event.name, date: event.date.slice(0, 10) }); 
    setShowModal(true);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container py-4 manage-events">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary">Manage Upcoming Events</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Event
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner />
        </div>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <Table bordered hover responsive className="bg-white shadow-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleCreateOrUpdateEvent}>
          <Modal.Header closeButton>
            <Modal.Title>{editingEvent ? "Edit Event" : "Add Upcoming Event"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setEditingEvent(null);
                setFormData({ name: "", date: "" });
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving..." : editingEvent ? "Update Event" : "Save Event"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageEvents;
