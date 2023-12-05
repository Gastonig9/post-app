class UserDTO {
    constructor(user) {
      this._id = user._id;
      this.email = user.email;
      this.lastName = user.lastName;
      this.profileImg = user.profileImg
      this.name = user.name;
      this.bio = user.bio
      this.role = "user";
      this.friendRequests = user.friendRequests || [];
      this.friends = user.friends || [];
    }
  }
  
  export default UserDTO;
  