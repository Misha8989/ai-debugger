import React, { useState } from "react";

export default function Dashboard() {
  const [drinkRecipes, setDrinkRecipes] = useState("");

  const [drinkIngredients, setDrinkIngredients] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(completedCode);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/returnDrinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        drinkIngredients
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setDrinkRecipes(data.answer);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>

            <div className="flex flex-col">
              <p>Ingredients that I have </p>
              <label htmlFor="ingredients" className="sr-only">
                Ingredients
              </label>
              <textarea
                rows={7}
                value={drinkIngredients}
                onChange={(e) => setDrinkIngredients(e.target.value)}
                name="Ingredients"
                id="Ingredients"
                placeholder="ie. Vodka, Cranberry, Sprite, ..."
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>

            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${isGenerating
                  ? "cursor-not-allowed opacity-50"
                  : ""
                }`}
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Drinks"}
            </button>

          </form>
        </div>

        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                drinkRecipes === ""
                  ? 7
                  : 100
              }
              name="output"
              value={drinkRecipes}
              onChange={(e) => setDrinkRecipes(e.target.value)}
              disabled={drinkRecipes === ""}
              id="output"
              placeholder="AI Generated Drinks"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={drinkRecipes === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
