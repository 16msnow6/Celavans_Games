//Creates a Plyer class containing an ID, a Nickname, an Image, and a Score. 
//Each variable has their own getter. 
//Only score has a setter.
class Player{
  
  
  constructor(id, nickname, image){
      this.id_ = id;
      this.nickname_ = nickname;
      this.image_ = image;
      this.score_ = 0;
  }
  
  getId(){
      return this.id_;
    }
  
  getNickname(){
      return this.nickname_;
    }
  getImage(){
      return this.image_;
  }
  setImage(image){
	  this.image_=image;
  }
  getScore(){
      return this.score_;
  }
  
  setScore(score){
      this.score_ = score;
  }
}
