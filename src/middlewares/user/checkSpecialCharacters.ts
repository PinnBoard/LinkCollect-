export const checkSpecialCharacters = (req: any, res: any, next: any) => {
  try {
    const username: any = req.query.username;
    const specialChars = username.match(/[^A-Za-z0-9\s.]/g);

    if (specialChars !== null) {
      return res.status(404).json({
        message: "Username contained special characters!",
        error: "Validation Error",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking special characters",
      data: {},
    });
  }
};

export default checkSpecialCharacters;
