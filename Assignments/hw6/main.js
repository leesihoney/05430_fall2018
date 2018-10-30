function Order(name, image, price, quantity_choice, glazing_choice) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.quantity_choice = quantity_choice;
    this.glazing_choice = glazing_choice;
}
$(document).ready(function()
{
    // keep footer at the bottom
    var docHeight = $(document).height();
    var footerHeight = $('footer').height();
    var footerTop = $('footer').position().top + footerHeight;

    if (footerTop < docHeight) {
        $('footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');
    }

    // product-detail page
    $('#cart-item').click(function(){
        // get cinnamon roll name
        var roll_name = $('#roll-title').text();
        // get cinnamon roll pic
        var picture = $('#main_pic');
        var roll_img = picture.attr('src');
        // get cinnamon roll price
        var roll_price = parseFloat($('#roll-price .price').text().replace('$',''));
        // get quantity and glazing
        var quantity = $('#dropdown-one').val();
        console.log(roll_price)
        var glazing = $('#dropdown-two').val();
        // JSON object
        var objToSave = new Order (roll_name, roll_img, roll_price, quantity, glazing);
        var orderArray = JSON.parse(localStorage.getItem("order"));

        // When there are orders in the storage already
        if(orderArray!=null && orderArray.constructor===Array && orderArray.length!=0)
        {
            console.log("Existed before");
            if(checkDuplicateOrder(objToSave, orderArray)){
                showDenial();
            }
            else{
                orderArray.push(objToSave);
                saveDataLocally(orderArray, objToSave);
            }
        }
        // When there is an empty cart
        else if(orderArray!=null && orderArray.constructor===Array && orderArray.length==0)
        {
            console.log("Empty Order Array");
            orderArray.push(objToSave);
            saveDataLocally(orderArray, objToSave);
        }
        // When it is first time for user putting an item to the cart
        else
        {
            console.log("First Time putting an order");
            newArray = [];
            newArray.push(objToSave);
            saveDataLocally(newArray, objToSave);
        }
    });

    // save a quantity value and glazing value to localStorage

    function saveDataLocally(arr, obj)
    {
        localStorage.setItem("order", JSON.stringify(arr));
        var gotArray = JSON.parse(localStorage.getItem("order"));
        if(JSON.stringify(gotArray[gotArray.length-1]) == JSON.stringify(obj))
        {
            showConfirmation();
        }
        else
        {
            showDenial();
        }
    };

    // shopping-cart page
    var orderList = JSON.parse(localStorage.getItem("order"));
    if(orderList!=null && orderList.constructor===Array)
    {
        if(orderList.length==0)
        {
            drawOutMessage();
        }
        else
        {
            let totalPrice = 0;
            for(var i = 0; i < orderList.length; i++)
            {
                var order = orderList[i];
                drawOutOrder(order);
                totalPrice += order.price*order.quantity_choice;
            }
            totalPrice = getPrice(totalPrice);
            $('#total-price-value').text(totalPrice);
        }
    }
    $('.trash-can-button').click(function(){
        if(confirm('Do you want to delete an order?'))
        {
            deleteOrder(orderList, $(this))
        };
    });
});

function checkDuplicateOrder(order, orderArray){
    let orderName = order.name;
    // loop through an order array
    for(let i; i<orderArray.length; i++)
    {
        if(orderArray[i]===orderName){
            return false;
        }
    }
    return true;
}
function deleteOrder(orderList, jThis)
{
    // find a target div
    let targetLi = findTargetLi(jThis,orderList);
    // find an order including this div
    let targetName = jThis.parent().parent().find("div")[3].innerText;
    let targetOrderIndex = findTargetOrderIndex(targetName, orderList);
    // remove an order from local storage
    if(targetOrderIndex!=null)
    {
        orderList.splice(targetOrderIndex, 1);
        // delete what has been in local storage and add a new orderlist
        localStorage.removeItem("order");
        localStorage.setItem("order", JSON.stringify(orderList));
        location.reload();

    }
    // error case
    else{
        console.log("did not find an order");
    }
};

function findTargetOrderIndex(targetName, arr){
    for(let i = 0; i<arr.length; i++)
    {
        let order = arr[i];
        console.log(order.name)
        if(order.name.trim() === targetName.trim())
        {
            return i;
        }
    }
    return null;
}

function showConfirmation()
{
    $('#flash').html("Successfully carted item!");
    $('#flash').css("border-color", "#004400");
    $('#flash').css("background-color", "#A2D890");
    $('#flash').css("color", "#004400");
    $('#flash').css("visibility", "visible");
    $('#flash').show().delay( 1000 ).fadeOut();
};

function showDenial()
{
    $('#flash').html("Already have the item in the cart!");
    $('#flash').css("border-color", "#4F0010");
    $('#flash').css("background-color", "#ED9EAE");
    $('#flash').css("color", "#4F0010");
    $('#flash').css("visibility", "visible");

    $('#flash').show().delay( 1000 ).fadeOut();
};

function findTargetLi(parent, arr){
    let targetLi = parent.parent().parent().parent().parent().html();
    return targetLi;
}

function drawOutOrder(order){
    var $liItem = $("<li>", {"class": "orders-element"});
    var $orderBox = $("<div>",{"class": "order-box"});

    var $orderImage = $("<div>", {"class": "order-image"});
    $orderBox.append([
        drawOutImage($orderImage, order["image"]),
        drawOutProductBox($("<div>",{"class": "order-box-part"}), order["name"]),
        drawOutQuantityDropdown($("<div>",{"class": "order-box-part"}), order["quantity_choice"]),
        drawOutGlazingDropdown($("<div>",{"class": "order-box-part"}), order["glazing_choice"]),
        drawOutPrice($("<div>",{"class": "order-box-part"}), order["price"], order["quantity_choice"]),
        drawOutTrashCan($("<div>",{"class": "order-box-part"}))
        ]);
    $liItem.append($orderBox);
    $('#orders').append($liItem);
}

function drawOutMessage(){
    var $liItem = $("<li>", {"class": "orders-element"});
    $liItem.append($("<span>", {"id": "no-orders-message"}).text("No items in shopping cart!"));
    $('#orders').append($liItem);
    $('#total-price-value').text('$0.00');
}
function drawOutImage(orderImage, imageUrl){
    $imgTag = $("<img>").attr('src', imageUrl);
    orderImage.append($imgTag);
    return orderImage;
}

function drawOutProductBox(orderBoxPart, name){
    let $label = $('<div>', {"class": "order-box-label"}).text("Product");
    let $value = $('<div>', {"class": "order-box-value product"}).text(name);
    let $status = $('<div>', {"class": "order-box-status"}).text("Currently In Stock");

    orderBoxPart.append([$label, $value, $status]);
    return orderBoxPart;
}

function drawOutQuantityDropdown(orderBoxPart, quantity){
    // check options
    let $label = $('<div>', {"class": "order-box-label"}).text("Quantity");
    let $value = $('<div>', {"class": "order-box-value quantity"}).text(quantity);

    orderBoxPart.append([$label, $value]);
    return orderBoxPart;
};

function drawOutGlazingDropdown(orderBoxPart, glazing){
    // check options
    let $label = $('<div>', {"class": "order-box-label"}).text("Glazing");
    let $value = $('<div>', {"class": "order-box-value glazing"}).text(glazing);

    orderBoxPart.append([$label, $value]);

    return orderBoxPart;
};

function drawOutPrice(orderBoxPart, price, quantity){
    let priceNotation = getPrice(price*quantity);
    let $label = $('<div>', {"class": "order-box-label"}).text("Price");
    let $value = $('<div>', {"class": "order-box-value price"}).text(priceNotation);

    orderBoxPart.append([$label, $value]);
    return orderBoxPart;
};

function getPrice(price){
    let priceNotation;
    if((price*100)%100!=0){
        if(String(price).split(".")[1].length==1){
            priceNotation = '$'+String(price)+'0'
        }
        else{
            priceNotation = '$'+String(price);
        }
    }
    else{
        priceNotation =  '$'+String(price)+'.00';
    }
    return priceNotation;
};

function drawOutTrashCan(orderBoxPart, imageUrl){
    $buttonTag = $("<button>", {class: "trash-can-button"});
    $imgTag = $("<img>", {class: "trash-can"}).attr('src', "images/garbage.svg");
    $buttonTag.append($imgTag);
    orderBoxPart.append($buttonTag);
    return orderBoxPart;
};





