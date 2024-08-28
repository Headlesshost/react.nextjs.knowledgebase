import { Section } from "@/app/lib/types";

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
    <ol className="custom-steps mb-14">
      {items.map((i) => (
        <li className="text-md text-slate-600" key={i}>
          {i}
        </li>
      ))}
    </ol>
  );
};

export default OrderedList;
