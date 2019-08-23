async function checkJWT(e) {
  e.preventDefault();
  let response = await fetch('https://api.c0x0.com/hc', {
    method: "GET",
    headers: {
      Authorization: "Bearer " + document.querySelector("#jwt").value
    }
  });
  let statusmsg = await response.statusText;
  if (statusmsg == "OK") {
    document.getElementById("status").innerHTML = "Access Token is Correct.<br>Settings Saved";
    saveOptions();
  } else {
    document.getElementById("status").innerHTML = "Invalid Access Token!";
    console.log("Trying to save invalid JWT Token");
  }
}

function saveOptions() {
  browser.storage.sync.set({
      jwt: document.querySelector("#jwt").value
    });
  console.log("Settings Saved");
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#jwt").value = result.jwt || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get("jwt");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", checkJWT);
