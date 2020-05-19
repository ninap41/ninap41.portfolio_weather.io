
var utils = {
 
  APICALL: async () => {
    config.city = $(".cityInput").val();
    // config.state = $(".stateInput").val() || '';
    // config.country = $(".countryInput").val() || '';
    // ${ config.state ? ',' + config.state : ''}${   config.country ? ',' +   config.country : ''}
  

    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${config.city}&APPID=c49085f442f36176642c1522090df8c5`,
      function (data, error) {
        if (data) {
          config.count += 1;
          config.main = {
            ...data.main,
            temp: utils.CalConverter(data.main.temp),
          };
          config.country = data.sys.country;
          config.rain = data.rain || undefined;
          config.weather = data.weather[0];
          console.log(config, "config");
        }
      },
      "json"
    )
      .fail(function () {
        utils.nullState(config.city);
      })
      .done(() => {
        if (config.count > 5) {
          $(".Bottomhalf").append(
            "<BR><h3>" +
              "You've searched over " +
              config.count +
              " places. This is exhausting me." +
              `</h3>`
          );
          config.count = 0;
        } else {
            $(".loader").html(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>`);
            setTimeout(function(){ 
                $(".loader").hide();
                htmlRenderer.renderInfo();
                htmlRenderer.renderTempSnark();
                htmlRenderer.renderCountrySnark();
                htmlRenderer.renderWeatherSnark();
                $(".Bottomhalf").append(`<p>I bet you wonder about the weather elsewhere...</p>`).fadeIn(200);
                $(".Bottomhalf").append(`<p>Search and see!</p>`).fadeIn(200);
             }, 1000);
        }
      });
  },
  countryFormatter: (val) => {
      let countries = {
BD: "Bangladesh",
BE: "Belgium",
BF: "Burkina Faso",
BG: "Bulgaria",
BA: "Bosnia and Herzegovina",
BB: "Barbados",
WF: "Wallis and Futuna",
BL: "Saint Barthelemy",
BM: "Bermuda",
BN: "Brunei",
BO: "Bolivia",
BH: "Bahrain",
BI: "Burundi",
BJ: "Benin",
BT: "Bhutan",
JM: "Jamaica",
BV: "Bouvet Island",
BW: "Botswana",
WS: "Samoa",
BQ: "Bonaire, Saint Eustatius and Saba ",
BR: "Brazil",
BS: "Bahamas",
JE: "Jersey",
BY: "Belarus",
BZ: "Belize",
RU: "Russia",
RW: "Rwanda",
RS: "Serbia",
TL: "East Timor",
RE: "Reunion",
TM: "Turkmenistan",
TJ: "Tajikistan",
RO: "Romania",
TK: "Tokelau",
GW: "Guinea-Bissau",
GU: "Guam",
GT: "Guatemala",
GS: "South Georgia and the South Sandwich Islands",
GR: "Greece",
GQ: "Equatorial Guinea",
GP: "Guadeloupe",
JP: "Japan",
GY: "Guyana",
GG: "Guernsey",
GF: "French Guiana",
GE: "Georgia",
GD: "Grenada",
GB: "United Kingdom",
GA: "Gabon",
SV: "El Salvador",
GN: "Guinea",
GM: "Gambia",
GL: "Greenland",
GI: "Gibraltar",
GH: "Ghana",
OM: "Oman",
TN: "Tunisia",
JO: "Jordan",
HR: "Croatia",
HT: "Haiti",
HU: "Hungary",
HK: "Hong Kong",
HN: "Honduras",
HM: "Heard Island and McDonald Islands",
VE: "Venezuela",
PR: "Puerto Rico",
PS: "Palestinian Territory",
PW: "Palau",
PT: "Portugal",
SJ: "Svalbard and Jan Mayen",
PY: "Paraguay",
IQ: "Iraq",
PA: "Panama",
PF: "French Polynesia",
PG: "Papua New Guinea",
PE: "Peru",
PK: "Pakistan",
PH: "Philippines",
PN: "Pitcairn",
PL: "Poland",
PM: "Saint Pierre and Miquelon",
ZM: "Zambia",
EH: "Western Sahara",
EE: "Estonia",
EG: "Egypt",
ZA: "South Africa",
EC: "Ecuador",
IT: "Italy",
VN: "Vietnam",
SB: "Solomon Islands",
ET: "Ethiopia",
SO: "Somalia",
ZW: "Zimbabwe",
SA: "Saudi Arabia",
ES: "Spain",
ER: "Eritrea",
ME: "Montenegro",
MD: "Moldova",
MG: "Madagascar",
MF: "Saint Martin",
MA: "Morocco",
MC: "Monaco",
UZ: "Uzbekistan",
MM: "Myanmar",
ML: "Mali",
MO: "Macao",
MN: "Mongolia",
MH: "Marshall Islands",
MK: "Macedonia",
MU: "Mauritius",
MT: "Malta",
MW: "Malawi",
MV: "Maldives",
MQ: "Martinique",
MP: "Northern Mariana Islands",
MS: "Montserrat",
MR: "Mauritania",
IM: "Isle of Man",
UG: "Uganda",
TZ: "Tanzania",
MY: "Malaysia",
MX: "Mexico",
IL: "Israel",
FR: "France",
IO: "British Indian Ocean Territory",
SH: "Saint Helena",
FI: "Finland",
FJ: "Fiji",
FK: "Falkland Islands",
FM: "Micronesia",
FO: "Faroe Islands",
NI: "Nicaragua",
NL: "Netherlands",
NO: "Norway",
NA: "Namibia",
VU: "Vanuatu",
NC: "New Caledonia",
NE: "Niger",
NF: "Norfolk Island",
NG: "Nigeria",
NZ: "New Zealand",
NP: "Nepal",
NR: "Nauru",
NU: "Niue",
CK: "Cook Islands",
XK: "Kosovo",
CI: "Ivory Coast",
CH: "Switzerland",
CO: "Colombia",
CN: "China",
CM: "Cameroon",
CL: "Chile",
CC: "Cocos Islands",
CA: "Canada",
CG: "Republic of the Congo",
CF: "Central African Republic",
CD: "Democratic Republic of the Congo",
CZ: "Czech Republic",
CY: "Cyprus",
CX: "Christmas Island",
CR: "Costa Rica",
CW: "Curacao",
CV: "Cape Verde",
CU: "Cuba",
SZ: "Swaziland",
SY: "Syria",
SX: "Sint Maarten",
KG: "Kyrgyzstan",
KE: "Kenya",
SS: "South Sudan",
SR: "Suriname",
KI: "Kiribati",
KH: "Cambodia",
KN: "Saint Kitts and Nevis",
KM: "Comoros",
ST: "Sao Tome and Principe",
SK: "Slovakia",
KR: "South Korea",
SI: "Slovenia",
KP: "North Korea",
KW: "Kuwait",
SN: "Senegal",
SM: "San Marino",
SL: "Sierra Leone",
SC: "Seychelles",
KZ: "Kazakhstan",
KY: "Cayman Islands",
SG: "Singapore",
SE: "Sweden",
SD: "Sudan",
DO: "Dominican Republic",
DM: "Dominica",
DJ: "Djibouti",
DK: "Denmark",
VG: "British Virgin Islands",
DE: "Germany",
YE: "Yemen",
DZ: "Algeria",
US: "United States",
UY: "Uruguay",
YT: "Mayotte",
UM: "United States Minor Outlying Islands",
LB: "Lebanon",
LC: "Saint Lucia",
LA: "Laos",
TV: "Tuvalu",
TW: "Taiwan",
TT: "Trinidad and Tobago",
TR: "Turkey",
LK: "Sri Lanka",
LI: "Liechtenstein",
LV: "Latvia",
TO: "Tonga",
LT: "Lithuania",
LU: "Luxembourg",
LR: "Liberia",
LS: "Lesotho",
TH: "Thailand",
TF: "French Southern Territories",
TG: "Togo",
TD: "Chad",
TC: "Turks and Caicos Islands",
LY: "Libya",
VA: "Vatican",
VC: "Saint Vincent and the Grenadines",
AE: "United Arab Emirates",
AD: "Andorra",
AG: "Antigua and Barbuda",
AF: "Afghanistan",
AI: "Anguilla",
VI: "U.S. Virgin Islands",
IS: "Iceland",
IR: "Iran",
AM: "Armenia",
AL: "Albania",
AO: "Angola",
AQ: "Antarctica",
AS: "American Samoa",
AR: "Argentina",
AU: "Australia",
AT: "Austria",
AW: "Aruba",
IN: "India",
AX: "Aland Islands",
AZ: "Azerbaijan",
IE: "Ireland",
ID: "Indonesia",
UA: "Ukraine",
QA: "Qatar",
MZ: "Mozambique"
}
return countries[val];
  },
  CalConverter: (val) => {
    let f = Math.floor(val * (9 / 5) - 459.67);
    return f;
  },
  hpaToIn: (val) => {

  
    return val *  0.030 
  },
  openingState: () => {
    var feelingSomething = [
      "bad,",
      "good,",
      "hopeless,",
      "fiesty,",
      "snarky,",
      "dull,",
      "fun,",
      "adamant,",
      "not accomplishing anything and binge-watching something on netflix,",
      "much like burning the world down,",
      "like I see too much in this crooked world,",
      "dismayed that I have realized the meaning of life,",
      "pretty unsurprised to learn that our fates are not predetermined,",
      "unsurprised that I learned that the goverment controls the weather,",
    ];
    var openingState =
      "Hey There. How are you today? " +
      "I'm feeling " +
      feelingSomething[Math.floor(feelingSomething.length * Math.random())] +
      " but aren't we all?<BR> ";
    $(".hideme").append(
      openingState +
        "Would you like to know the weather today? <BR>How about my opinion of it?<BR>"
    );
  },
  nullState: (city) => {
    $(".Bottomhalf").html(`Sorry, no result for city: ${city} `).fadeIn(2000);
  },
};
var config = {
  route: "home" || "country",
  country: undefined,
  displayCountry: undefined,
  state: undefined,
  city: undefined,
  main: {
    feels_like: undefined,
    humidity: undefined,
    pressure: undefined,
    temp: undefined,
    temp_max: undefined,
    temp_min: undefined,
  },
  rain: undefined,
  weather: undefined,
  visits: 0,
  datagifs: undefined,
  wind: { speed: undefined, deg: undefined },
  openingState: () => utils.openingState(),
};

const htmlRenderer = {
  renderInfo: () => {
    $(".Bottomhalf")
      .hide()
      .html(
        `
            <h1>${config.city}, ${utils.countryFormatter(config.country)}</h1>
            <h2>Temp:${config.main.temp}&#176;</h2>
            <h2>Pressure: ${utils.hpaToIn(config.main.pressure)}in</h2>
            <h2>Humidity: ${config.main.humidity}%</h2>
            <h2>Outlook: ${config.weather.description}</h2>`
      )
      .fadeIn(2000);
    $(".cityInput").val("");
  },
  renderTempSnark: () => {
    let display = (val) => $(".Bottomhalf")
            .append( `<p> ${val} </p>`)
            .hide()
            .fadeIn(400);
    //hotter
    if (config.main.temp > 49) {
      if (config.main.temp < 74) {
        if (config.main.temp < 74 && config.weather.main == "Thunderstorm")  display(`It's a thunderous day in ${config.city}`);
        else if (config.main.temp < 74 && config.weather.main == "Rain")  display(` It's the perfect rainy day in ${config.city}`) ;
        else  display(`It's beautiful day in ${config.city}`)
      } 
      //really hot
      if (config.main.temp > 74 ) {
        display(`It's a hot one today in  ${config.city}`)
     } 
      if (config.main.temp > 74 && config.main.temp > 101) {
        display(`You're in a burning hell, and hell is real.`)
     } 
    }

    // colder
    if (config.main.temp < 49) {
      if (config.main.temp > 19) {
          display(`It's a bit chilly today in ${config.city}`)
      }
       else if (config.main.temp < 19) {
        if (
          (config.main.temp < 19 && config.weather.main == "Rain") ||
          config.weather.main == "Thunderstorm"
        ) {
           display(`"It's Damp and cold in ${config.city}... Like my bleak emergence into this world`)
        } else {
            display(`"It's really freezing in ${config.city}! Why are you there? Why am I here? Why are we all here?`)
        }
      }
    }

    // humid
    if (config.main.humidity > 76 && config.main.temp > 74) {
         display(`"It's so humid in ${config.city}, I'm suprised you aren't sticking to things.`)
    } else if (config.main.humidity < 40 && config.main.temp > 74) {
       display(`"It's so dry, I would not want to be there...`)
    }
  },

  renderCountrySnark: () => {
      let display = (val) => $(".Bottomhalf")
            .append( `<p> ${val} </p>`)
            .fadeIn(400);
    if (config.country == "GB") {
      //UK
      display(`Cool clocks. Architecture. Pubs. Greenery. Manners. Comedy. But keep your damn tea.`)
    } else if (config.country == "US") {
      //US
       display(`"but the US? Do not EVEN get me started on your current political climate...`)
    } else if (config.country == "RU") {
      //Russia
             display(`I had vodka for breakfast too. `)
    } else if (config.country == "MX" || config.country == "CN" || config.country == "HK") {
      //china
       display(`Way to go leading the global economy, but not for using so much coal. Im a fucking weather app. You bet I go green.`)
    } else if (config.country == "CA") {
       display(`Oh, Canada... eh?`)
    } else if (config.country == "SE") {
      //sweden
        display(`The climates pretty... Wait... why is everthing so glamorous here? This country is so beautiful its making me insecure. `)
        display(`Can't think of a bad thing to say about Sweden `)
        display(`Oh wait... don't you all have suicide clinics? `)


    } else if (config.country == "DE") {
      //Germany
    display(`Vat? Oktoberfest isnt allll year? ich hasse dich.  `)

    } else if (config.country == "JP") {
      //Japan
    display(`But anyways, Konichiwa! `)

    } else if (config.country == "FR") {
      //France
       display(`High class & the best skramz.`)
    } else if (config.country == "IE") {
      //Ireland
      display(`I'm gonna go read dubliners or something`)

    } else if (config.country == "IT") {
      //Italy
       display(`When the weather hits your eye like a big pizza pie...`)
    } else if (config.country == "AU") {
      //Australia
       display(`Oi Oi Aussie. How's it down under?`)
     
    } else if (config.country == "AU") {
      //Mexico
        display(`Lo único que entiendo es mi miseria ... Pero hola en México`)

    } else if (config.country == "NO") {
      //Norway
    display(`Aw cool Norway, huh? NO WAY!</p><BR> Don't worry, I'm hyper-aware of how cringey I am.`)

    } else if (config.country == "NZ") {
      //New Zealand
          display(`...but remember the fires of Mordor always loom over Middle-Earth. :/`)
    }
  },
  renderWeatherSnark: () => {
      let display = (img, val) => {
          
            $("body").css("background-image", `url("./img/${img}")`);
            $(".Bottomhalf")
            .append( `<p> ${val} </p>`)
            .fadeIn(400);
      }
    if (config.weather.main == "Rain") {
      if (config.weather.description == "moderate rain") {
        $("body").css("background-image", 'url("./img/heavyrain.gif")');
        $(".Bottomhalf")
          .append("<p>" + "Hope you brought a dang raincoat, though! </p>")
          .fadeIn(4000);
      } else if (config.weather.description == "light rain") {
        $("body").css("background-image", 'url("./img/lightrain.gif")');
        $(".Bottomhalf").append(
          "<p> Bring an umbrella out for a light drizzle... There's enough rain for your artsy fartsy moody instagram pics. </p>"
        );
      } else if (
        config.weather.description == "heavy intensity rain" ||
        "very heavy rain"
      ) {
        $("body").css("background-image", 'url("./img/heavyrain.gif")');

        $(".Bottomhalf")
          .append("<p>" + "Woof. It's raining cats and dogs..." + "</p>")
          .fadeIn(4000);
      } else if (config.weather.description == "extreme rain") {
        $(".Bottomhalf")
          .append(
            "<p> Extreme rain... Flooding the streets like are hearts with a deep pool of depression </p>"
          )
          .fadeIn(4000);
      } else if (config.weather.description == "freezing rain") {
        $(".Bottomhalf")
          .append("<p> Ice rinks in the street! Woooo! </p>")
          .fadeIn(4000);
      } else if (config.weather.description == "light intensity shower rain") {
        $("body").css("background-image", 'url("./img/lightrain.gif")');

        $(".Bottomhalf")
          .append("<p> Just a brief shower today. Grab a raincoat. </p>")
          .fadeIn(4000);
      } else if (
        config.weather.description == "light intensity shower rain" ||
        "heavy intensity shower rain" ||
        "shower rain" ||
        "ragged shower rain"
      ) {
        $("body").css("background-image", 'url("./img/lightrain.gif")');

        $(".Bottomhalf")
          .append(
            "<p> Showers Showers Showers. I forget sometimes to shower...</p>"
          )
          .fadeIn(4000);
      }
    }

    // //thunderstorm

    if (config.weather.main == "Thunderstorm" || "Rain") {
      if (config.weather.description == "moderate rain") {
        $("body").css("background-image", 'url("./img/heavyrain.gif")');
        $(".Bottomhalf")
          .append("<p>" + "Hope you brought a dang raincoat, though! </p>")
          .fadeIn(4000);
      } else if (config.weather.description == "light rain") {
        $("body").css("background-image", 'url("./img/lightrain.gif")');
        //   $('.Bottomhalf').append("<p> Bring an umbrella out for a light drizzle... There's enough rain for your artsy fartsy moody instagram pics. </p>"   )
      } else if (config.weather.description == "thunderstorm") {
        $("body").css("background-image", 'url("./img/thunderstorm.gif")');
        $(".Bottomhalf")
          .append(
            "<p>" +
              "It WILL thunder today. Existence is bleak. Remember not to get struck by lightning. Unless, you know, thats the goal today. Then Godspeed...." +
              "</p>"
          )
          .fadeIn(4000);
      }
    }
    if (config.weather.main == "Clear") {
      $("body").css("background-image", 'url("./img/clearsky.gif")');
      $(".Bottomhalf").append(
        "<p> Ah yes... The sky. Clear as my purposeless future.</p>"
      );
    }
    if (config.weather.main == "Clouds") {
      $("body").css("background-image", 'url("./img/clouds.gif")');
      if (config.weather.description == "overcast clouds") {
        $(".Bottomhalf").append(
          "<p>" +
            "These clouds are overcast and ready to throw some savage shade." +
            "</p>"
        );
      } else if (config.weather.description == "few clouds") {
        $(".Bottomhalf").append(
          "<p>" + "Just enough clouds in the sky to ruin your day." + "</p>"
        );
      } else if (config.weather.description == "scattered clouds") {
        $(".Bottomhalf").append(
          "<p>" + "Clouds as scattered as your sense of self..." + "</p>"
        );
      } else if (config.weather.description == "broken clouds") {
        $(".Bottomhalf").append(
          "<p>" +
            "Hahaha, these clouds are JUST like you. Completely Broken." +
            "</p>"
        );
      }
    }

    if (config.weather.main == "Snow") {
      $("body").css("background-image", 'url("./img/snow.gif")');
      if (config.weather.description == "light snow") {
          display('snow.gif',"If the weather outside is frightful. At least the light snow is quite delightful!")
      
      } else if (config.weather.description == "snow") {
            display('snow.gif',"While it's a snowy winter wonderland, Enjoy it!")

    
      } else if (config.weather.description == "Heavy Snow") {
          display('snow.gif',"Careful out there! Its snowing quite heavily. Get out your snow boots!")

       
      } else if (config.weather.description == "broken clouds") {
         display('snow.gif', "broken clouds present!")

      } else if (config.weather.description == "sleet") {
                   display('snow.gif',"No fun. Just sleet the whole day")

       
      } else if (
        config.weather.description == "shower sleet" ||
        "light rain and snow" ||
        "rain and snow" ||
        "light shower snow" ||
        "shower snow" ||
        "heavy shower snow"
      ) {
        display('snow.gif',"Snow or Rain? Dang weather, make up your mind! Careful out there")
      } else {
      }
    }

    if (config.weather.main == "thunderstorm") {
     display('thunderstorm.gif',"It WILL thunder today. Existence is bleak. Remember not to get struck by lightning. Unless, you know, thats the goal today. Then Godspeed....")
    }

    if (config.weather.main == "Fog") {
    display('fog.gif',"Pretty creepy out, huh")
    }

    if (config.weather.main == "Haze") {
      display('haze.gif',"You look a little hazed and confused...")
    }
    if (config.weather.main == "Mist") {
       display('fog.gif',"Ah Yes. Haunted by the subtle mists of self-doubt.")
    }

    if (config.weather.main == "extreme") {
      if (config.weather.description == "tornado") {
                 display('bettertornado.gif',"Um... hide?")

      } else if (config.weather.description == "hurricane") {
        if (config.country == "US") {
             display('hurricaneamerica.gif',"Please, do not be stupid and go out there.")

         
        } else {
          display('HURRICANE.gif',"I'm not gonna crack a joke here. Stay safe.")
        }
      } else if (config.weather.description == "tropical storm") {
        display('tropicalstorm.gif',"I'm not gonna crack a joke here. Stay safe.")

      } else if (config.weather.description == "cold") {
      } else if (config.weather.description == "hot") {
      } else if (config.weather.description == "windy") {
      }
    }
  },
};

$(document).ready(function () {
  config.openingState();
  $("form").hide().fadeIn(3000);
  $(".cityInput").focus("");
  $(".button").click(function (click) {
    $(".hideme").slideUp(1000);
    utils.APICALL();
    return false;
  });
});
