import "./Special.css";
import { useState, useEffect, useRef } from "react";

const Special = () => {
  const speciallist = [
    { title: "IMAX", info: "# 궁극의 몰입감", url: "/assets/IMAX.jpg" },
    { title: "4DX", info: "# 모션 시트 # 오감 체험", url: "/assets/4DX.jpg" },
    { title: "SCREENX", info: "# 3면 확장 스크린", url: "/assets/SCREENX.jpg" },
    {
      title: "CINE & LIVINGROOM",
      info: "# 신개념 소셜 상영관",
      url: "/assets/CINE & LIVINGROOM.jpg",
    },
  ];

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
          {hoverIndex !== null && (
            <div style={{ height: "100%" }}>
              <img
                src={speciallist[hoverIndex].url}
                alt={speciallist[hoverIndex].title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="special-image-info">
                <h2>{speciallist[hoverIndex].title}</h2>
                <h4>{speciallist[hoverIndex].info}</h4>
              </div>
            </div>
          )}
        </div>

        <ul className="special-list" ref={listRef}>
          {speciallist.map((item, index) => (
            <li
              key={index}
              className={`special-contents ${
                hoverIndex === index ? "selected" : ""
              }`} // Add selected class when hoverIndex matches
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <div className="special-content">
                <div className="special-content-title">{item.title}</div>
                <div className="special-contents-info">{item.info}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Special;
