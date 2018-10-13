var express = require("express")
var app = express();
var bodyParser = require("body-parser")

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
var Checkout = coinbase.resources.Checkout;
var clientObj = Client.init('your api');
var json = require('./apiCall')


app.use(bodyParser.json())

var api = express.Router();

api.post('/basecoin', function (req, res) {
      //  console.log(req.body)
    var coin_Type = req.body.coinType
        setTimeout(function () {
            console.log("server started");
            var Charge = coinbase.resources.Charge;
            clientObj.setRequestTimeout(2000);
            var chargeObj = new Charge();

            chargeObj.name = 'The ';
            chargeObj.description = 'Mastering the Transition to the Information Age';
            chargeObj.local_price = {
                'amount': '2000.00',
                'currency': 'USD'
            };

            chargeObj.pricing_type = 'fixed_price';

            chargeObj.save(function (error, response) {
                console.log( error);

                if(error==null) {
                    var final = ""

                    if (coin_Type = "bitcoincash") {
                        final = response.addresses.bitcoincash
                    } else if (coin_Type = "ethereum") {
                        final = response.addresses.ethereum

                    }
                    else if (coin_Type = "bitcoin") {
                        final = response.addresses.bitcoin

                    } else if (coin_Type = "litecoin") {
                        final = response.addresses.litecoin
                    }
                    var my_response = {"address": final, "coin": coin_Type}
                    res.send(my_response)
                }
                else
                    res.sendStatus()
        });
    },
    4000
)
;


})



/*
var checkoutObj = new Checkout();


checkoutObj.name = 'The Sovereign Individual';
checkoutObj.description = 'Mastering the Transition to the Information Age';
checkoutObj.pricing_type = 'fixed_price';
checkoutObj.local_price = {
    'amount': '100.00',
    'currency': 'USD'
};
checkoutObj.requested_info = ['name', 'email'];

checkoutObj.save(function (error, callback) {
    console.log(error);
    console.log(callback);
});
*/
/*


/*
datajson.getData("opteions",function () {

})*/

app.use("/api", api)
app.listen(1234)