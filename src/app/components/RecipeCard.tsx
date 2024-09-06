import Link from "next/link";

interface RecipeCardProps {
  title: string;
  author: string;
  id: string;
  calories: number;
}

const RecipeCard = ({ title, author, id, calories }: RecipeCardProps) => {
  return (
    <Link
      className="flex flex-col gap-2 p-3 border rounded-lg shadow-sm hover:bg-gray-100 transition-all cursor-pointer"
      href={`/recipes/${id}`}
    >
      <div>
        <h1 className="font-semibold capitalize">{title}</h1>
        <p className="font-light">Description</p>
      </div>
      <div className="flex gap-2 justify-between">
        <p className="text-sm text-gray-500">{author}</p>
        <p className="text-sm text-gray-500">{calories} kCal</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
