
    var picts= ["cat_one.jpg", "cat_two.jpg", "cat_three.jpg", "cat_four.jpg", "cat_five.jpeg"]
    var names = ["Mason", "Belle", "ChiChi", "Nabi", "Kokoro"]
    var ages = [2, 1, 5, 3, 4]



    class Cat {
        constructor(pic, name, age)
        {
            this.pict = pic
            this.name = name
            this.age= age
        }
    }

    function random(length)
    {
        return Math.floor(Math.random() * length);
    }


    // jQuery put at the bottom
    $(document).ready(()=> {
        console.log("ready")

        var cat = new Cat(picts[random(picts.length)], names[random(names.length)], ages[random(ages.length)])
        console.log(cat)
        console.log(cat.pict)
        console.log(cat.name)
        console.log(cat.age)

        $("#animal-img").attr("src", cat.pict)
        $("#animal-name").text(cat.name)
        $("#animal-age").text(cat.age + " years old")
    })