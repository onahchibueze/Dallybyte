import React, { useContext, useState } from "react";
import FoodInfo from "../store/FoodContext";
import styles from "../components/addPage.module.css";

const AddPage = () => {
  const { addItem } = useContext(FoodInfo);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    ingredients: "",
  });
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImage(file);
    setSelected(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (image) formData.append("image", image);

    try {
      const res = await addItem(formData);
      console.log(res);
    } catch (error) {
      console.error("Add item failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Food Item</h2>
      <form onSubmit={handleSubmit}>
        {selected && (
          <div className={styles.imagePreview}>
            <img src={selected} alt="Preview" />
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Name of your food</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            required
            placeholder="E.g., Milky Doughnut"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Price</label>
          <input
            name="price"
            type="text"
            onChange={handleChange}
            required
            placeholder="E.g., 4.99"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <input
            name="category"
            type="text"
            onChange={handleChange}
            required
            placeholder="E.g., Pastry"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            required
            placeholder="Include features, taste, packaging, etc."
          />
        </div>

        <div className={styles.formGroup}>
          <label>Ingredients</label>
          <textarea
            name="ingredients"
            onChange={handleChange}
            required
            placeholder="Include what makes up the food"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddPage;
