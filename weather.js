var utils = {
  APICALL: async () => {
    config.city = $(".Userinput").val();
    $.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        config.city +
        "&APPID=c49085f442f36176642c1522090df8c5",
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
        } else {
          htmlRenderer.renderInfo();
          htmlRenderer.renderTempSnark();
          htmlRenderer.renderCountrySnark();
          htmlRenderer.renderWeatherSnark();
          $(".Bottomhalf").append(
            "<p>" +
              "I bet you wonder about the weather elsewhere..." +
              "</p>" +
              "<p>" +
              "Search and See.." +
              `</p>`
          );
        }
      });
  },
  CalConverter: (val) => {
    let f = Math.floor(val * (9 / 5) - 459.67);
    return f;
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
            <h1>${config.city} | ${config.country}</h1>
            <h2>Temp:${config.main.temp}&#176;</h2>
            <h2>Humidity: ${config.main.humidity}%</h2>
            <h2>Outlook: ${config.weather.description}</h2>`
      )
      .fadeIn(2000);
    $(".Userinput").val("");
  },
  renderTempSnark: () => {
    if (config.main.temp > 49) {
      if (config.main.temp < 74) {
        if (config.main.temp < 74 && config.weather.main == "Thunderstorm") {
          $(".Bottomhalf")
            .append(
              "<BR><p>" +
                "It's a thunderous day in" +
                " " +
                config.city +
                "! </p>"
            )
            .fadeIn(2000);
        } else if (config.main.temp < 74 && config.weather.main == "Rain") {
          $(".Bottomhalf")
            .append(
              "<BR><p>" +
                "It's the perfect rainy day in" +
                " " +
                config.city +
                "! </p>"
            )
            .fadeIn(2000);
        } else {
          $(".Bottomhalf")
            .append(
              "<BR><p>" +
                "It's a beautiful day in" +
                " " +
                config.city +
                "! </p>"
            )
            .fadeIn(2000);
        }
      } else if (config.main.temp > 74) {
        $(".Bottomhalf")
          .append(
            "<BR><p>" + "It's a hot one today in" + " " + config.city + "! </p>"
          )
          .fadeIn(2000);
      }
    }
    if (config.main.temp < 49) {
      if (config.main.temp > 19) {
        $(".Bottomhalf")
          .append(
            "<BR><p>" +
              "It's a bit chilly today in" +
              " " +
              config.city +
              "! </p>"
          )
          .fadeIn(2000);
      } else if (config.main.temp < 19) {
        if (
          (config.main.temp < 19 && config.weather.main == "Rain") ||
          config.weather.main == "Thunderstorm"
        ) {
          $(".Bottomhalf")
            .append(
              "<BR><p>" +
                "It's Damp and cold in" +
                " " +
                config.city +
                "... Like my bleak emergence into this world</p>"
            )
            .fadeIn(2000);
        } else {
          $(".Bottomhalf")
            .append(
              "<BR><p>" +
                "It's really freezing in" +
                " " +
                config.city +
                "! Why are you there? Why am I here? Why are we all here?</p>"
            )
            .fadeIn(2000);
        }
      }
    }
    if (config.main.temp > 76 && config.main.temp > 297) {
      $(".Bottomhalf")
        .append(
          "<p>" +
            "It's so humid in" +
            " " +
            config.city +
            ", I'm suprised you aren't sticking to things." +
            `</p>`
        )
        .fadeIn(4000);
    } else if (config.main.temp < 40 && config.main.temp > 74) {
      $(".Bottomhalf")
        .append("<p>" + "It's so dry, I would not want to be there..." + `</p>`)
        .fadeIn(4000);
    }
  },
  renderCountrySnark: () => {
    if (config.country == "GB") {
      //UK
      $(".Bottomhalf")
        .append(
          "<p>" +
            "Cool clocks. Architecture. Pubs. Greenery. Manners. Comedy. But keep your damn tea.</p>"
        )
        .fadeIn(4000);
    } else if (config.country == "US") {
      //US
      $(".Bottomhalf")
        .append(
          "<p>" +
            "but the US? Do not EVEN get me started on your current political climate... </p>"
        )
        .fadeIn(4000);
    } else if (config.country == "RU") {
      //Russia
      $(".Bottomhalf")
        .append("<p>" + "I had vodka for breakfast too. </p>")
        .fadeIn(4000);
    } else if (config.country == "MX") {
      //china
      $(".Bottomhalf")
        .append(
          "<p>" +
            "Way to go leading the global economy, but not for using so much coal. Im a fucking weather app. You bet I go green. </p>"
        )
        .fadeIn(4000);
    } else if (config.country == "CN") {
      //china
      $(".Bottomhalf")
        .append(
          "<p>" +
            "Way to go leading the global economy, but not for using so much coal. Im a fucking weather app. You bet I go green. </p>"
        )
        .fadeIn(4000);
    } else if (config.country == "CA") {
      //canada
      $(".Bottomhalf").append("<p>Oh, Canada... eh?</p>").fadeIn(4000);
    } else if (config.country == "SE") {
      //sweden
      $(".Bottomhalf")
        .append(
          "<p>The climates pretty... Wait... why is everthing so glamorous here? This country is so beautiful its making me insecure. :() </p>"
        )
        .fadeIn(4000);
    } else if (config.country == "HK") {
      //China
      $(".Bottomhalf")
        .append(
          "<p>" +
            "Way to go leading the global economy, but not for using so much coal. Im a fucking weather app. You bet I go green. </p>"
        )
        .fadeIn(4000);
    } else if (config.country == "DE") {
      //Germany
      $(".Bottomhalf")
        .append(
          "<p>" + "Vat? Oktoberfest isnt allll year? ich hasse dich.  </p>"
        )
        .fadeIn(4000);
    } else if (config.country == "JP") {
      //Japan
      $(".Bottomhalf")
        .append("<p>" + "But anyways, Konichiwa!</p>")
        .fadeIn(4000);
    } else if (config.country == "FR") {
      //France
      $(".Bottomhalf")
        .append("<p>" + "hon hon hon... </p>")
        .fadeIn(4000);
    } else if (config.country == "IE") {
      //Ireland
      $(".Bottomhalf")
        .append("<p>" + "Go read 'Dubliners' or something. </p>")
        .fadeIn(4000);
    } else if (config.country == "IT") {
      //Italy
      $(".Bottomhalf")
        .append(
          "<p>" + "When the weather hits your eye like a big pizza pie... </p>"
        )
        .fadeIn(4000);
    } else if (config.country == "AU") {
      //Australia
      $(".Bottomhalf")
        .append("<p>" + "Oi Oi Aussie. How's it down under?</p>")
        .fadeIn(4000);
    } else if (config.country == "AU") {
      //Mexico
      $(".Bottomhalf")
        .append(
          "<p>" +
            "Lo único que entiendo es mi miseria ... Pero hola en México</p>"
        )
        .fadeIn(4000);
    } else if (config.country == "NO") {
      //Norway
      $(".Bottomhalf")
        .append(
          "<p>" +
            "Aw cool Norway, huh? NO WAY!</p><BR> Don't worry, I'm hyper-aware of how cringey I am."
        )
        .fadeIn(4000);
    } else if (config.country == "NZ") {
      //New Zealand
      $(".Bottomhalf")
        .append(
          "<p>" +
            "...but remember the fires of Mordor always loom over Middle-Earth. :/"
        )
        .fadeIn(4000);
    }
  },
  renderWeatherSnark: () => {
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
      console.log("rain");

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
        $(".Bottomhalf").append(
          "<p>" +
            "If the weather outside is frightful. At least the light snow is quite delightful!" +
            "</p>"
        );
      } else if (config.weather.description == "snow") {
        $(".Bottomhalf").append(
          "<p>" + "While it's a snowy winter wonderland, Enjoy it! " + "</p>"
        );
      } else if (config.weather.description == "Heavy Snow") {
        $(".Bottomhalf").append(
          "<p>" +
            "Careful out there! Its snowing quite heavily. Get out your snow boots!" +
            "</p>"
        );
      } else if (config.weather.description == "broken clouds") {
        $(".Bottomhalf").append("<p>" + "broken clouds present!" + "</p>");
      } else if (config.weather.description == "sleet") {
        $(".Bottomhalf").append(
          "<p>" + "No fun. Just sleet the whole day" + "</p>"
        );
      } else if (
        config.weather.description == "shower sleet" ||
        "light rain and snow" ||
        "rain and snow" ||
        "light shower snow" ||
        "shower snow" ||
        "heavy shower snow"
      ) {
        $(".Bottomhalf").append(
          "<p>" +
            "Snow or Rain? Dang weather, make up your mind! Careful out there" +
            config.city +
            "folks" +
            "</p>"
        );
      } else {
      }
    }

    if (config.weather.main == "thunderstorm") {
      $("body").css("background-image", 'url("./img/thunderstorm.gif")');
      $(".Bottomhalf")
        .append(
          "<p>" +
            "It WILL thunder today. Existence is bleak. Remember not to get struck by lightning. Unless, you know, thats the goal today. Then Godspeed...." +
            "</p>"
        )
        .fadeIn(4000);
    }

    if (config.weather.main == "Fog") {
      $("body").css("background-image", 'url("./img/fog.gif")');
      $(".Bottomhalf").append("<p>Pretty creepy out, huh?</p>");
    }

    if (config.weather.main == "Haze") {
      $("body").css("background-image", 'url("./img/haze.gif")');
      $(".Bottomhalf").append("<p>You look a little hazed and confused...</p>");
    }
    if (config.weather.main == "Mist") {
      $("body").css("background-image", 'url("./img/fog.gif")');
      $(".Bottomhalf").append(
        "<p>Ah Yes. Haunted by the subtle mists of self-doubt.</p>"
      );
    }

    if (config.weather.main == "extreme") {
      if (config.weather.description == "tornado") {
        $("body").css("background-image", 'url("./img/bettertornado.gif")');
      } else if (config.weather.description == "hurricane") {
        if (config.country == "US") {
          $("body").css(
            "background-image",
            'url("./img/hurricaneamerica.gif")'
          );
          $(".Bottomhalf")
            .append("<p> Please, do not be stupid and go out there.</p>")
            .fadeIn(4000);
        } else {
          $("body").css("background-image", 'url("./HURRICANE.gif")');
        }
      } else if (config.weather.description == "tropical storm") {
        $("body").css("background-image", 'url("./img/tropicalstorm.gif")');
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
  $(".Userinput").focus("");
  $(".button").click(function (click) {
    $(".hideme").slideUp(1000);
    utils.APICALL();
    return false;
  });
});
