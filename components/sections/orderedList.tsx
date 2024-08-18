import { Section } from "@/app/lib/types";
import Link from "next/link";

interface OrderedList extends Section {
  items: string[];
}

interface OrderedListProps {
  section: OrderedList;
}

const OrderedList: React.FC<OrderedListProps> = ({ section }) => {
  if (!section) return null;
  const { items } = section;

  return (
    <ol className="custom-steps">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ol>
  );
};

export default OrderedList;
