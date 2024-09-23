import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar"> {/* Adicione a classe aqui */}
      <h2>Menu</h2> {/* Adicione um título para a navbar */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {Array.from({ length: 16 }, (_, index) => (
          <li key={index}>
            <Link to={`/exercise${index + 1}`}>Exercise {index + 1}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
