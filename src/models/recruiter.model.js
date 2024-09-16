const recruiters = [
  {
    name: "abhay",
    email: "dhumneabhay@gmail.com",
    password: "asd",
  },
];
export class Register {
  static addUser(user) {
    recruiters.push(user);
    console.log(recruiters);
  }

  static checkuser(user) {
    let found = recruiters.find(
      (ur) => ur.email === user.email && ur.password === user.password,
    );
    if (found) {
      return true;
    }
  }
}
