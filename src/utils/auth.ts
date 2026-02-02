export const admins = {
  "Admin 1": "001",
  "Admin 2": "002",
  "Admin 3": "admin3",
  "Admin 4": "004",
  "Admin 5": "005"
};

export const validateAdmin = (username: string, password: string): boolean => {
  return admins[username as keyof typeof admins] === password;
};