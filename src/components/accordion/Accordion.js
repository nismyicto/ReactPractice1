import { createContext, useContext } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useToggle } from "../../hooks/useToggle";

//Create context API
const AccordionContext = createContext();
const { Provider } = AccordionContext;

const Accordion = (props) => {
  const { title, content } = props;
  const { status: expand, toggleStatus: toggleExpand } = useToggle();
  const value = {
    expand,
    toggleExpand
  };

  return (
    <Provider value={value}>
      <div className="accordion">
        <AccordionHeader>{title} </AccordionHeader>
        <AccordionContent>{content}</AccordionContent>
      </div>
    </Provider>
  );
};

//Header
const AccordionHeader = ({ children }) => {
  const { toggleExpand } = useContext(AccordionContext);

  return (
    <button onClick={toggleExpand}>
      {children}
      <AccordionIcon
        iconOpened={<FaChevronRight />}
        iconClosed={<FaChevronDown />}
      />
    </button>
  );
};

const AccordionContent = ({ children }) => {
  const { expand } = useContext(AccordionContext);
  return <>{expand && <div className="content">{children}</div>}</>;
};

const AccordionIcon = ({ iconOpened, iconClosed }) => {
  const { expand } = useContext(AccordionContext);
  return <span>{expand ? iconOpened : iconClosed}</span>;
};

export default Accordion;
