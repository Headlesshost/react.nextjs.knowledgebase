import { Section } from "@/app/lib/types";
import { getAuthors } from "@/app/lib/api";
import Image from "next/image";

interface AuthorTableSection extends Section {
  content: {
    title: string;
  };
}

interface AuthorTableProps {
  section: AuthorTableSection;
  instanceId: string;
}

const AuthorTable: React.FC<AuthorTableProps> = async ({ section, instanceId }) => {
  if (!section) return null;
  const authors = await getAuthors(instanceId);

  return (
    <div className="overflow-x-auto mb-14">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Role
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {authors?.result.map((i) => (
              <tr key={i.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  <div className="flex space-x-4 items-center">
                    <div>{i?.content?.image?.url ? <Image className="rounded-full" src={i.content.image.url} alt={i.content.name || "Author"} width={40} height={40} /> : <Image className="rounded-full" src="/user.png" alt="Author" width={40} height={40} />}</div>
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{i?.content?.name}</div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{i.content.role}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{i.content.email}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{i.content.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorTable;
