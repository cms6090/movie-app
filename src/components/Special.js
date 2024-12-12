import "./Special.css";
import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseinit";

const Special = () => {
  const [speciallist, setSpeciallist] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "theater"));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            theater_url: docData.theater_url, // Firestore에서 받은 경로 그대로 사용
          };
        });
        setSpeciallist(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // listHeight 업데이트
  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.offsetHeight);
    }
  }, [speciallist]);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  return (
    <div style={{ margin: "3em 0" }}>
      <h2>특별관</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2em",
        }}
      >
        <div
          className="special-image-container"
          style={{ height: `${listHeight}px` }}
        >
          {hoverIndex !== null && speciallist[hoverIndex] && (
            <div style={{ height: "100%" }}>
              <img
                src={speciallist[hoverIndex].theater_url}
                alt={speciallist[hoverIndex].theater_title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="special-image-info">
                <h2>{speciallist[hoverIndex].theater_title}</h2>
                <h4>{speciallist[hoverIndex].theater_info}</h4>
              </div>
            </div>
          )}
        </div>

        <ul className="special-list" ref={listRef}>
          {speciallist.map((item, index) => (
            <li
              key={item.id}
              className={`special-contents ${
                hoverIndex === index ? "selected" : ""
              }`} // Add selected class when hoverIndex matches
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <div className="special-content">
                <div className="special-content-title">
                  {item.theater_title}
                </div>
                <div className="special-contents-info">{item.theater_info}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Special;
