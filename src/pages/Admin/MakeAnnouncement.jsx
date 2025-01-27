import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const axiosPublic = useAxiosPublic();
  const [form, setForm] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = form;

    if (!title || !description) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Both title and description are required.",
      });
      return;
    }

    try {
      const response = await axiosPublic.post("/announcements", { title, description });
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Announcement created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setForm({ title: "", description: "" });
      } else {
        throw new Error("Failed to create announcement.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create announcement.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Make an Announcement</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter the title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Enter the description"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
