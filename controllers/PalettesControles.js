import { palettes, users } from "../database/models.js";
import { getUser } from "../controllers/UsersControllers.js";
export const getPalettes = async (req, res) => {
  const response = await palettes.find();
  res.json(response);
};
export const getOnePalette = async (req, res) => {
  const response = getPalette(req.params.name);
  res.json(response);
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

  if (!getPalette(req.body.name))
    return res
      .status(400)
      .send(`This name (${req.body.name}) is already taken.`);
  console.log("paso");
  const user = getUser(req.body.author.email, req.body.author.password);
  if (!user)
    return res.status(400).send(`Please login to create a new palette.`);

  const response = await palettes.create(req.body);
  res.json(response);
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

const getPalette = async (name) => {
  const response = await palettes.findOne({ name: name });
  return response;
};
