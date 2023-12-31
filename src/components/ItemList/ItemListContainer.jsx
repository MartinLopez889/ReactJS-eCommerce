import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";

const ItemListContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();
  console.log(categoryId);

  useEffect(() => {
    setLoading(true);
    const coleccionProductos = categoryId
      ? query(collection(db, "Items"), where("category", "==", categoryId))
      : collection(db, "Items");
    getDocs(coleccionProductos)
      .then((res) => {
        const list = res.docs.map((item) => {
          return {
            id: item.id,
            ...item.data(),
          };
        });
        setItems(list);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const { greeting, titulo } = props;

  return (
    <div className="bg-info">
      <p className="fs-1 fw-bold">{greeting}</p>
      <p className="fs-2 fst-italic">{titulo}</p>
      <div>
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ItemList items={items} />
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
