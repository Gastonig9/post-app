class UserDTO {
    constructor(user) {
      this.email = user.email;
      this.lastName = user.lastName;
      this.profileImg = user.profileImg
      this.name = user.name;
      this.bio = user.bio
      this.friendRequests = user.friendRequests || [];
      this.friends = user.friends || [];
  
      if (user.role === "user") {
        this.role = "user";
        this._id = user._id;
      }
    }
  }
  
  export default UserDTO;
  