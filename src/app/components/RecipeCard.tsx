interface RecipeCardProps {
  title: string;
  author: string;
}

const RecipeCard = ({ title, author }: RecipeCardProps) => {
  return (
    <div className="flex flex-col gap-2 p-3 border rounded-lg shadow-sm hover:bg-gray-100 transition-all cursor-pointer">
      <div>
        <h1 className="font-semibold capitalize">{title}</h1>
        <p className="font-light">Description</p>
      </div>
      <div className="flex gap-2 justify-between">
        <p className="text-sm text-gray-500">{author}</p>
        <p className="text-sm text-gray-500">550 kCal</p>
      </div>
    </div>
  );
};

export default RecipeCard;
