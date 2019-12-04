module.exports = function Cart(initCart){
    this.items = initCart.items || {};
    this.totalQty = initCart.totalQty || 0;
    this.totalPrice = initCart.totalPrice || 0;
    this.rstrntId = initCart.rstrntId || 0;

    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0}
        }
        if(this.rstrntId != storedItem.item.Rstrnt_id) {
            this.clear();
            this.rstrntId = storedItem.item.Rstrnt_id;
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.Price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.Price;
    };

    this.clear = function() {
        this.items = {};
        this.totalQty = 0;
        this.totalPrice = 0;
    }

    this.increaseByOne = function(id) {
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.Price;
        this.totalQty++;
        this.totalPrice += this.items[id].item.Price;
    };

    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.Price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.Price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].Price;
        delete this.items[id];
    };

    this.generateArray = function(){
        var arr = []
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};
