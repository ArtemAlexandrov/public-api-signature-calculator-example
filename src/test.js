const { ThreeCommasApiClient } = require("3commas-api-client");

const client = new ThreeCommasApiClient({ key: '25c1dc4f7efe4f5bb542190aa6fd8be33177a3edac6242d8b5e7372e3a8c202d',
    secret: '30bac589c5b0f93d9a7782ba659ac0abe3b497332cb54a48a5547a8be3fe11f6afe595fbf3e24368ff81ecc0d7c2a0fd3c7144aad19a2b59f4c04197bba389721a5d17c3fe436ba0e231442d39b98a49f93b9f7122e2a6756d3077d4a21e27d969841f87'});


(async () => {
try {
    const data = await client.fetch('account.rename','post',{
        account_id: 30973258
    },{
        name: 'valery'
    });
    console.log(data);
}
catch (e) {
    console.log(e,'e');
}
})()

// client.subscribe("DealsChannel", (data) => {
//     console.log(data);
// })