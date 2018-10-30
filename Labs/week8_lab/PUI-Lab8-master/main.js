
function Cat(name, age){
    this.name = name;
    this.age = age;
    this.type = "Cat";
    this.image = "cat_one.jpg";
};

function Tiger(name, age){
    this.name = name;
    this.age = age;
    this.type = "Tiger";
    this.image = "tiger.jpg";
};

function Penguin(name, age){
    this.name= name;
    this.age = age;
    this.type = "Penguin";
    this.image = "penguin.jpg";
};

var animals = [new Cat(), new Tiger(), new Penguin()];
var names = ["Tom", "Titi", "Choo", "Nancy"];

function generateRandomIndex(maxIndex){
    return Math.floor(Math.random()*maxIndex)
};

function generateRandomName(){
    var randomIndex = generateRandomIndex(names.length);
    return names[randomIndex];
};

function generateRandomAge(){
    var randomAge = generateRandomIndex(15);
    return randomAge;
};

function generateRandomAnimal(){
    var randomIndex = generateRandomIndex(animals.length);
    var randomAnimal = animals[randomIndex];
    if(randomAnimal instanceof Cat)
    {
        return new Cat(generateRandomName(), generateRandomAge());
    }
    else if(randomAnimal instanceof Tiger)
    {
        return new Tiger(generateRandomName(), generateRandomAge());
    }
    else if(randomAnimal instanceof Penguin)
    {
        return new Penguin(generateRandomName(), generateRandomAge());
    }
};


// jQuery put at the bottom
$(document).ready(()=> {

    var animal = JSON.parse(localStorage.getItem("savedAnimal"));
    var isSaved = false;
    if(animal===null)
    {
        $("#save-button").text("Save");
        animal = generateRandomAnimal();
    }

    else
    {
        $("#save-button").text("Clear");
        isSaved = true;
    };

    $("#animal-name").text(animal.name)
    $("#animal-age").text(animal.age + " years old");
    $("#animal-img").attr("src", animal.image);

    $('#save-button').click(function(){
        if(isSaved)
        {
            localStorage.removeItem("savedAnimal");
            $("#save-button").css("display", "none");
            $("#exp").text("Cleared an animal!");
            $("#exp").css("display", "block");
        }
        else
        {
            localStorage.setItem("savedAnimal", JSON.stringify(animal));

            $("#save-button").css("display", "none");
            $("#exp").text("Saved an animal!");
            $("#exp").css("display", "block");

        }
    });
});

