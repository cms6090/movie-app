import "./Theater.css";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Theater = () => {
  const theaterlist = useSelector((state) => state.theater.list);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.offsetHeight);
    }
  }, [theaterlist]);

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
          className="theater-image-container"
          style={{ height: `${listHeight}px` }}
        >
          {hoverIndex !== null && theaterlist[hoverIndex] && (
            <div style={{ height: "100%" }}>
              <img
                src={theaterlist[hoverIndex].theater_url}
                alt={theaterlist[hoverIndex].theater_title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="theater-image-info">
                <h2>{theaterlist[hoverIndex].theater_title}</h2>
                <h4>{theaterlist[hoverIndex].theater_info}</h4>
              </div>
            </div>
          )}
        </div>

        <ul className="theater-list" ref={listRef}>
          {theaterlist.map((item, index) => (
            <li
              key={item.id}
              className={`theater-contents ${
                hoverIndex === index ? "selected" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <div className="theater-content">
                <div className="theater-content-title">
                  {item.theater_title}
                </div>
                <div className="theater-contents-info">{item.theater_info}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Theater;
