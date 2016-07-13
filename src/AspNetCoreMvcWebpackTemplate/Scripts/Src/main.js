require("babel-polyfill");
var $ = require("jquery");

var port= window.location.port &&
    ((window.location.protocol.toLowerCase()=="http:"&&window.location.port!=80)
    ||
    (window.location.protocol.toLowerCase()=="https:"&&window.location.port!=443))
?`:${window.location.port}`:"";
    
var origin = `${window.location.protocol}//${window.location.hostname}${port}`;

var req=async ()=>{
    var tokenData = await Promise.resolve($.ajax({
        type: "POST",
        url: "/connect/token",
        data: {
            "grant_type": "password",
            username: "user@test.com",
            password: "P2ssw0rd!",
            scope: "profile email roles",
            "resource": `${origin}/`
        },
        dataType: "json"
    }));
    var accessToken=tokenData.access_token;
    var values = await Promise.resolve($.ajax({
        type: "GET",
        url: "/api/Values",
        dataType: "json",
        headers: { "Authorization": `Bearer ${accessToken}` }
    }));
    console.log(values);
    var userinfo = await Promise.resolve($.ajax({
        type: "GET",
        url: "/connect/userinfo",
        dataType: "json",
        headers: { "Authorization": `Bearer ${accessToken}` }
    }));
    console.log(userinfo);
};




req();