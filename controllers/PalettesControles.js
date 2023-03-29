import { palettes } from "../database/models.js";
import { getUser, CreatePalette } from "../controllers/UsersControllers.js";
export const getPalettes = async (req, res) => {
  console.log("entro a getAll");
  if (!req.body.min || !req.body.max) {
    return res.status(400).send("Please enter a min and a max");
  }
  const response = await palettes.find().skip(req.body.min).limit(req.body.max);

  res.json(response);
};
export const getOnePalette = async (req, res) => {
  const response = getPalette(req.params.name);
  res.json(response);
};
export const getPalettesByUsers = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send("insufficient credentials.");
  const user = await getUser(req.body.email, req.body.password);
  if (!user)
    return res.status(400).send(`Please login to create a new palette.`);
  const response = await palettes.find({ author: user._id });
  if (!response)
    return res.status(400).json({ message: "No palettes to show." });
  return res.json(response);
};
export const createPalettes = async (req, res) => {
  if (!req.body.name)
    return res.status(400).send(`Please enter a name for the palette.`);
  if (!req.body.author)
    return res.status(400).send(`Please enter a author for the palette.`);
  if (!req.body.colors)
    return res
      .status(400)
      .send(`Please enter a list of colors for the palette.`);

  const palettefounded = await getPalette(req.body.name);

  if (palettefounded)
    return res
      .status(400)
      .send(`This name (${req.body.name}) is already taken.`);
  const user = await getUser(req.body.author.email, req.body.author.password);
  if (!user)
    return res.status(400).send(`Please login to create a new palette.`);
  await palettes.create(req.body);
  await CreatePalette(user.email, user.password, req.body.name);

  res.send("Palette created");
};
export const updatePalettes = async (req, res) => {
  if (!req.body.name) return res.status(400).send("Please enter a name.");
  const palette = await getPalette(req.body.name);
  if (!palette)
    return res.status(400).send(`Palette (${req.body.name}) not found.`);
  const response = await palettes.updateOne({ ...req.body, ...palette });

  if (response.modifiedCount > 0) return res.send("palette has been updated.");
  return res.status(400).send("palette has not been updated.");
};
export const deletePalettes = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send("insufficient credentials.");
  if (!req.body.name)
    return res.status(400).send("Please enter a palette name.");
  const user = await getUser(req.body.email, req.body.password);
  if (!user) return res.status(400).send("the credentials are not correct.");
  const palette = await getPalette(req.body.name);
  if (!palette)
    return res.status(404).send(`Palette ${req.body.name} not found.`);
  if (palette.author !== user.userName)
    return res
      .status(400)
      .send(
        `You do not have the necessary authorization to delete this palette.`
      );
  const response = await palettes.deleteOne({ name: req.body.name });

  if (response.deletedCount > 0) return res.send("Palette deleted");

  return res.status(400).send("the palette was not deleted");
};
export const getSavedPalettes = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send("insufficient credentials.");
  const user = await getUser(req.body.email, req.body.password);
  if (!user)
    return res.status(400).send(`Please login to create a new palette.`);
  const response = await getArrayOfPalettes(user.savedPalettes);
  if (!response)
    return res.status(400).json({ message: "No palettes to show." });
  return res.json(response);
};

export const getPalette = async (name) => {
  return await palettes.findOne({ name: name });
};

export const getArrayOfPalettes = async (list) => {
  const response = Promise.all(
    list.map((id) => {
      return palettes.findOne({ _id: id });
    })
  );
  return response;
};

export const getTotalPalettes = async (req, res) =>
  res.json(await palettes.find());

export const searchPalette = async (req, res) => {
  if (!req.body.text) {
    res.status(400).send("Please enter a name or a tag to search a palette.");
  }
  const text = req.body.text.toLowerCase();
  const response = await palettes.find();
  const searched = response.filter((palette) => {
    if (palette.name.toLowerCase().includes(text)) {
      return palette;
    }
  });
  res.json(searched);
};
