import Validator from "validatorjs";

const validator = async (
  body: any,
  rules: Validator.Rules,
  customMessages: Validator.ErrorMessages | undefined,
  callback: {
    (err: any, status: any): void;
    (arg0: Validator.Errors | null, arg1: boolean): any;
  }
) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const schoolAnnouncementValidation = async (req: any, res: any, next: any) => {
  if (!Array.isArray(req.body)) {
    return res.status(412).send({
      success: false,
      message: "Validation failed: Missing fields",
    });
  }

  for (const announcement of req.body) {
    if (
      typeof announcement.id !== "string" ||
      typeof announcement.message !== "string" ||
      typeof announcement.sender !== "string"
    ) {
      return res.status(412).send({
        success: false,
        message: "Validation failed: Missing fields",
      });
    }
  }

  return next(); // Array is valid
};

export default schoolAnnouncementValidation;
