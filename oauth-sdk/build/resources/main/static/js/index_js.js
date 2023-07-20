$(document).ready(function() {

    $("#jwsSignatureDiv").hide();
    $("#jwtTokenDiv").hide();
    $("#businessListDiv").hide();

    $("#generate_jws").click(function() {
        generateJws();
    });
    $("#copyJwsButton").click(function() {
        copyText('copyJwsLabel');
    });

    $("#jwt").click(function() {
        getJwt();
    });
    $("#copyJwtButton").click(function() {
        copyText('copyJwtLabel');
    });

    $("#verifyJwt").click(function() {
        getBusinessList();
    });
});

function generateJws() {

    var clientId = $("input[name*='clientId']").val();
    var clientSecret = $("input[name*='secretKey']").val();
    var userToken = $("input[name*='userToken']").val();

    var isValid = false;
    if(isValidString(clientId)) {
        if(isValidString(clientSecret)) {
            if(isValidString(userToken)) {
                isValid = true;
            } else {
                $("input[name*='userToken']").focus();
            }
        } else {
            $("input[name*='secretKey']").focus();
        }
    } else {
        $("input[name*='clientId']").focus();
    }

    if(isValid){
        var request = {
            clientId: $("input[name*='clientId']").val(),
            clientSecret: $("input[name*='secretKey']").val(),
            userToken: $("input[name*='userToken']").val()
        };

        $.ajax({
            url: generateJwsEndPoint,
            type: 'POST',
            data: JSON.stringify(request),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('#copyJwsLabel').text(data);
                $('#jwsSignatureDiv').show();
                window.location.hash = 'jwsSignatureDiv';
            },
            error: function (err) {
                console.log(JSON.stringify(err));
            }
        });
    }

}

function getJwt() {

    $('#getJwtProgressBar').show();
    $("#businessListDiv").hide();

    var jwsToken = $("#copyJwsLabel").text();
    if(isValidString(jwsToken)){
        var request = { jwsToken: $("#copyJwsLabel").text() };
        $.ajax({
            url: getJwtEndPoint,
            type: 'POST',
            data: JSON.stringify(request),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $('#getJwtProgressBar').hide();
                var code = response.code;
                if(is200(code)) {
                    var accessToken = response.data.accessToken;
                    $('#copyJwtLabel').text(accessToken);
                    $('#jwtTokenDiv').show();
                    window.location.hash = 'jwtTokenDiv';
                } else {
                    console.log("Something wrong!");
                }
            },
            error: function (err) {
                console.log(JSON.stringify(err));
            }
        });
    } else {
        alert("JWS required!");
    }

}

function getBusinessList() {

    $("#verifyJwtProgressBar").show();

    var request = { jwtToken: $("#copyJwtLabel").text() }

    $.ajax({
        url: businessListEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#verifyJwtProgressBar").hide();
            var code = response.code;
            if(is200(code)) {
                var data = response.data.businesses;
                var trHTML = '';
                $.each(data, function(index, value) {
                    trHTML += '<tr><td>' + value['businessId']+'</td><td>' + value['businessNm'] +'</td><td style="word-break: break-all">' + value['email'] + '</td></tr>';
                });
                $('#businessTableBody').html(trHTML);
                $("#businessListDiv").show();
                window.location.hash = 'businessListDiv';
            } else if(is404(code)){
                createBusiness()
            } else{
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}


function createBusiness() {

    var request = {
          jwtToken: $("#copyJwtLabel").text(),
          BusinessId: null,
          BusinessNm: "Java Test Business",
          EINorSSN: "493588930",
          IsEIN: true,
          BusinessType: "ESTE",
          ContactNm: "John Doe",
          Email: "javaemployer@company.com",
          Fax: "1234567890",
          TradeNm: "Kodak",
          IsBusinessTerminated: false,
          Phone: "1234566890",
          PhoneExtn: "12345",
          IsForeign: false,
          USAddress: {
              Address1: "Address Line 1",
              City: "Rockhill",
              State: "SC",
              ZipCd: "29730"
          },
          SigningAuthority: {
              BusinessMemberType: "ADMINISTRATOR",
              Phone: "1234564390",
              Name: "John"
          },
          KindOfEmployer: "FEDERALGOVT",
          KindOfPayer: "REGULAR941",
          ForeignAddress: null
    }

    $.ajax({
        url: createBusinessEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var code = data.code;
            if(is200(code)){
                getBusinessList();
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

function copyText(id) {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert("Copied to ClipBoard");
    } catch (err) {
        console.log('Unable to copy!');
    }
}
