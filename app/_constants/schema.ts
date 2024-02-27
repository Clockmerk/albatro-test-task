import * as yup from "yup";

export const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!%_*?&]{6,}$/, "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    role: yup.string().required("Role is required").min(4).max(20),
  });