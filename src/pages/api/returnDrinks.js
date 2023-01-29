const generateCode = async ({
  drinkIngredients
}) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Return every possible alcoholic recipe using only the ingredients ${drinkIngredients}, include step by step instructions for each recipe`,
          max_tokens: 300,
          temperature: 0.5,
        }),
      }
    );
    const data = await response.json();

    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req, res) {
  const { drinkIngredients } = req.body;

  const answer = await generateCode({
    drinkIngredients
  });

  res.status(200).json({
    answer,
  });
}
