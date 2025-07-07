import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

const UploadGalleryImage = () => {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!images) return toast.error("Please select an image!");

    setLoading(true);

    const formData = new FormData();
    formData.append("caption", caption);
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const token = localStorage.getItem("token"); // if admin auth required
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gallery/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setCaption("");
      setImages(null);
    } catch (err) {
      console.error("[UPLOAD IMAGE ERROR]", err);
      toast.error(err.response?.data?.error || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-primary mb-4">Upload Gallery Image</h2>
      <Form onSubmit={handleUpload}>
        <Form.Group className="mb-3">
          <Form.Label>Image Caption (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Select Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            required
            name="images"
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Upload Image"}
        </Button>
      </Form>
    </div>
  );
};

export default UploadGalleryImage;
