
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
}

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
}

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
}


// jQuery put at the bottom
$(document).ready(()=> {

    var animals = JSON.parse(localStorage.getItem("savedAnimals"));
    var maxAnimalsLength = 5;
    if(animals===null)
    {
        for(var i; i<maxAnimalsLength; i++){
            animals = [];
            animals.push(generateRandomAnimal())
        };
    };

    else if(animals.constructor===Array)
    {
        {
            for(var i; i<maxAnimalsLength-animals.length; i++){
                animals.push(generateRandomAnimal())
        };

    };

    for(var i; i<animals.length;i++)
    {
        var animal = animals[i]
        $('#container').append(
            "<div class='animal'>" +
            "<h1 class='animal-name'>" +animal.name "</h1>" +
            "<img class='animal-img' src=" + animal.image +">" +
            "<h3 class='animal-age'>" + animal.age + "</h3>" +
            "<button class = 'save-button' type='button'>" + statusButtonText(animal) +"</button>" +
            "<p class = 'exp'>" + paragraphText(animal) + "</p>"
            "</div>"
        )
    };

    if($('.save-button').click(function(){
        var targetAnimal = findtargetAnimal($(this));
        if(hasAnimal(targetAnimal))
        {
            var animalIndex = findIndex(targetAnimal);
            var result = JSON.parse(localStorage.getItem("savedAnimals")).splice(animalIndex, 1);
            localStorage.setItem("savedAnimals", JSON.stringify(result));
        }
        else{
            var result = JSON.parse(localStorage.getItem("savedAnimals"));
            result.push(targetAnimal);
        }
            localStorage.setItem("savedAnimals", JSON.stringify(result));
    }));

function hasAnimal(animal){
    var storageAnimals = JSON.parse(localStorage.getItem("savedAnimals"));
    if(storageAnimals===null)
    {
        return false;
    }
    else
    {
        for(var i;i<storageAnimals.length;i++)
        {
            if(JSON.stringify(storageAnimals[i])===JSON.stringify(animal)){
                return true;
            }
        }
    }
    return false;
}

function findTargetAnimal($this){
    $animal = $this.parent();
    if($animal.)
}