import { useParams } from "react-router-dom";

const Ticket = () => {
  const { id } = useParams();

  return <div>{id}예약 페이지</div>;
};

export default Ticket;
