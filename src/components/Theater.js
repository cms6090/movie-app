import "./Theater.css";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Theater = () => {
  const speciallist = useSelector((state) => state.theater.list); // Redux 상태에서 데이터 가져오기
  const [hoverIndex, setHoverIndex] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const listRef = useRef(null);

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
      <h2>상영관</h2>
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
              }`}
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

export default Theater;
