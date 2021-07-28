var dog,sadDog,happyDog,foodStock;
var addFood,feed,foodObj,food;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj= new Food();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  addFood=createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);

  foodObj.display();

  drawSprites();
}

//function to read food Stock
function readStock(data){
  food=data.val();
  foodObj.updateFoodStock(food);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
var foodStockValue=foodObj.getFoodStock();
if(foodStockValue <= 0){
    foodObj.updateFoodStock(foodStockValue*0);
}
else{
  foodObj.updateFoodStock(foodStockValue-1);
}
}


//function to add food in stock
function addFood(){
food+=1;
database.ref("/").update({
  Food:food
})
}
