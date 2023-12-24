import Father from "./father";
import Mother from "./mother";
import Emma from "./emma";
import Anna from "./anna";

const cards = {
  Rodrick: Father,
  Cathy: Mother,
  Emma: Emma,
  Anna: Anna,
};

const Card = ({ name }: { name: string }) => {
  const cardName = (name.charAt(0).toUpperCase() +
    name.slice(1)) as keyof typeof cards;

  const Card = cards[cardName];

  return <Card />;
};

export default Card;
