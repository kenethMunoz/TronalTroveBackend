import { users, palettes } from "../database/models.js";

export const getUsers = async (req, res) => {
  const response = await users.find();
  res.json(response);
};
export const getPublicUser = async (req, res) => {
  const response = await users.findOne(req.params);

  if (response) return res.json(response);

  return res.status(404).send("User not found");
};
export const createUsers = async (req, res) => {
  if (!req.body.userName || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .send("Please enter a email, username and a password");
  }

  if (await users.findOne({ email: req.body.email }))
    return res
      .status(400)
      .json({ message: `this email (${req.body.email}) is already used` });

  if (await users.findOne({ userName: req.body.userName }))
    return res.status(400).json({
      message: `this username (${req.body.userName}) is already used`,
    });

  await users.create(req.body);
  res.status(201).send("User created");
};
export const updateUsers = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Please enter your email and password");
  }

  const user = getUser(req.body.email, req.body.password);

  if (!user) return res.status(404).send("User not found");
  const response = await users.updateOne(
    {
      email: req.body.email,
      password: req.body.password,
    },
    { ...req.body, user }
  );
  if (response.modifiedCount > 0) {
    return res.send("User updated");
  } else {
    return res.send("User is already updated");
  }
};
export const deleteUsers = async (req, res) => {
  if (!req.body.userName || !req.body.email || !req.body.password) {
    return res.status(404).send("insufficient credentials");
  }
  const response = await users.deleteOne(req.body);
  if (response.deletedCount) return res.send("User deleted");

  return res.status(404).send("User not found");
};
//palettes methods
export const CreatePalette = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.paletteName) {
    return res
      .status(400)
      .send("Please enter your email, password and a palette name");
  }
  const user = getUser(req.body.email, req.body.password);
  const palette = await palettes.getPalette(req.body.paletteName);
  if (!user) return res.status(404).send("User not found");

  if (!palette) return res.status(404).send("Palette not found");

  const response = await users.updateOne(user, {
    palettesCreated: user.palettesCreated.push(palette._id),
    ...user,
  });
  if (response.modifiedCount > 0) {
    return res.status(200).send("Palette created");
  }
  return res.status(400).send("Error: Palette has been not created");
};
export const removePalette = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.paletteName) {
    return res
      .status(400)
      .send("Please enter your email, password and a palette name");
  }
  const user = getUser(req.body.email, req.body.password);
  const palette = await palettes.getPalette(req.body.paletteName);
  if (!user) return res.status(404).send("User not found");

  if (!palette) return res.status(404).send("Palette not found");

  const response = await users.updateOne(user, {
    palettesCreated: user.palettesCreated.filter(
      (p) => p.name !== palette.name
    ),
    ...user,
  });
  if (response.modifiedCount > 0) {
    return res.status(200).send("Palette deleted");
  }
  return res.status(400).send("Error: Palette has been not deleted");
};

export const savePalettes = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.paletteName) {
    return res
      .status(400)
      .send("Please enter your email, password and a palette name");
  }
  const user = getUser(req.body.email, req.body.password);
  const palette = await palettes.getPalette(req.body.paletteName);
  if (!user) return res.status(404).send("User not found");

  if (!palette) return res.status(404).send("Palette not found");

  const response = await users.updateOne(user, {
    palettesSaved: user.palettesSaved.push(palette._id),
    ...user,
  });
  if (response.modifiedCount > 0) {
    return res.status(200).send("Palette saved");
  }
  return res.status(400).send("Error: Palette has been not saved");
};
export const unsavePalettes = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.paletteName) {
    return res
      .status(400)
      .send("Please enter your email, password and a palette name");
  }
  const user = getUser(req.body.email, req.body.password);
  const palette = await palettes.getPalette(req.body.paletteName);
  if (!user) return res.status(404).send("User not found");

  if (!palette) return res.status(404).send("Palette not found");

  const response = await users.updateOne(user, {
    palettesSaved: user.palettesSaved.filter((p) => p.name !== palette.name),
    ...user,
  });
  if (response.modifiedCount > 0) {
    return res.status(200).send("Palette unsaved");
  }
  return res.status(400).send("Error: Palette has been not unsaved");
};

export const getUser = async (email, password) => {
  if (!email || !password) return null;
  const user = await users.findOne({ email, password });
  if (!user) return null;
  return user;
};
