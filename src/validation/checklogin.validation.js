export const checklogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render("home", { er: "Not logged in", reg: false });
  }
};
